#!/usr/bin/env zx
import type { DBTheme } from 'drizzle/schema';
import json5 from 'json5';
import { $, argv } from 'zx';

$.verbose = false;

const syncStartTime = Date.now();
let syncedThemesCount = 0;
let syncError: string | undefined;

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN environment variable is not defined (https://github.com/settings/tokens)');
}

if (argv.local) {
  console.log('Adding themes to local db');
} else {
  console.log('Adding themes to remote db');
}

type ExtInfo = {
  id: string;
  name: string;
  version: string;
  description: string;
  authors: string[];
  repository: string;
  schema_version: number;
  wasm_api_version: number;
  published_at: string;
  download_count: number;
};

let extInfo: ExtInfo[] = [];
try {
  const res: { data: ExtInfo[] } = await fetch('https://api.zed.dev/extensions?max_schema_version=1').then((res) =>
    res.json(),
  );
  extInfo = res.data;
} catch (e) {
  const message = e instanceof Error ? e.message : e;
  throw new Error(`Failed to parse zed extensions info from api: ${message}`);
}

console.log(`Fetched ${extInfo.length} extensions from Zed API`);

let count = 0;

const chunkSize = +(process.env.CHUNK_SIZE ?? 25);
const chunks = Array.from({ length: Math.ceil(extInfo.length / chunkSize) }, (_, i) =>
  extInfo.slice(i * chunkSize, i * chunkSize + chunkSize),
);

try {
  for (const chunk of chunks) {
    await Promise.all(chunk.map(processExtension));
  }
} catch (e) {
  syncError = e instanceof Error ? e.message : String(e);
  console.error(`Sync failed: ${syncError}`);
}

// Record sync stats
await recordSyncStats(extInfo.length);

/**
 * Process a single extension: fetch its theme and repository metadata and upsert a theme record into the database.
 *
 * If the extension has no theme file, the function skips it. The function respects a global processing limit (argv.limit),
 * chooses a local or remote database target based on argv.local, increments the global `syncedThemesCount` after a successful
 * upsert, and logs success or error information.
 *
 * @param ext - Extension metadata from the Zed API (includes at least `id`, `name`, `version`, `authors`, `repository`, `published_at`, and `download_count`)
 */
async function processExtension(ext: ExtInfo) {
  if (argv.limit && ++count >= argv.limit) return;

  try {
    const repoUrl = ext.repository;
    const repoPath = repoUrl.replaceAll(/.*github\.com\/|\.git$/g, '');

    const themeFile = await getThemeFile(repoPath);

    if (!themeFile) {
      console.log(`⏩ [${ext.id}] Skipping because it has no themes`);
      return;
    }

    const repoInfo = await getRepoInfo(repoPath);
    const installCount = ext.download_count;
    const updatedDateTs = new Date(ext.published_at);

    if (!repoInfo) {
      console.warn(`⚠️  [${ext.id}] Unable to get GH repo info`);
    }

    const theme: DBTheme = {
      id: ext.id,
      name: ext.name.replace(/\btheme\b/i, '').trim(),
      author: ext.authors.map((s) => s.replaceAll(/<[^>]+>/g, '').trim()).join(', '),
      updatedDate: Number.isNaN(updatedDateTs.getTime()) ? new Date() : updatedDateTs,
      versionHash: ext.version,
      bundled: true,
      repoUrl,
      repoStars: repoInfo?.stargazers_count ?? 0,
      theme: themeFile,
      userId: null,
      installCount,
    };

    const addInstallCount = typeof installCount === 'number';
    const sqlCmd = `
      INSERT INTO themes (id, name, author, updatedDate, versionHash, bundled, repoUrl, repoStars, userId, theme ${
        addInstallCount ? ', installCount' : ''
      })
      VALUES ('${theme.id}', '${sqlSafe(theme.name)}', '${
        theme.author
      }', ${theme.updatedDate.getTime()}, '${theme.versionHash}', ${
        theme.bundled
      }, '${theme.repoUrl}', ${theme.repoStars}, NULL, '${JSON.stringify(
        theme.theme,
      )}' ${addInstallCount ? `, ${theme.installCount}` : ''})
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          author = EXCLUDED.author,
          updatedDate = EXCLUDED.updatedDate,
          versionHash = EXCLUDED.versionHash,
          bundled = EXCLUDED.bundled,
          repoUrl = EXCLUDED.repoUrl,
          repoStars = EXCLUDED.repoStars,
          userId = EXCLUDED.userId,
          theme = EXCLUDED.theme
          ${addInstallCount ? ', installCount = EXCLUDED.installCount;' : ';'}
    `;

    try {
      if (argv.local) {
        await $`pnpm wrangler d1 execute zed_themes --command=${sqlCmd} --local`;
      } else {
        await $`pnpm wrangler d1 execute zed_themes --command=${sqlCmd} --remote`;
        await $`pnpm wrangler d1 execute --env preview zed_themes_preview --command=${sqlCmd} --remote`;
      }
      syncedThemesCount++;
      console.log(
        `✅ [${ext.id}] Added theme [install=${theme.installCount}][stars=${theme.repoStars}][author=${theme.author}][name=${theme.name}]`,
      );
    } catch (e) {
      console.error(`❌ [${ext.id}] ${e instanceof Error ? e.message : e}`);
    }
  } catch (e) {
    console.error(`❌ [${ext.id}] ${e instanceof Error ? e.message : e}`);
  }
}

type GHContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

async function getThemeFile(repoPath: string) {
  try {
    const res: GHContent[] = await fetch(`https://api.github.com/repos/${repoPath}/contents/themes`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }).then((res) => res.json());
    const files = res.filter((file) => file.name.endsWith('.json'));
    if (files.length > 1) {
      console.log(`❓ [${repoPath}] Has more than one theme json file found, using the first one`);
    }
    const url = files[0]?.download_url;
    if (url) {
      return fetch(url).then(async (res) => {
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }
        return json5.parse(await res.text());
      });
    }
  } catch (e) {
    return undefined;
  }
}

type GHRepoInfo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  network_count: number;
  subscribers_count: number;
};

async function getRepoInfo(repoPath: string): Promise<GHRepoInfo | undefined> {
  try {
    return await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
      }
      return json5.parse(await res.text());
    });
  } catch (e) {
    return undefined;
  }
}

/**
 * Escapes control characters and SQL-sensitive characters so a string can be safely embedded in SQL statements.
 *
 * @param str - The input string to sanitize for SQL insertion
 * @returns The sanitized string with control characters, quotes, backslashes, and percent signs escaped
 */
function sqlSafe(str: string) {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: required for sqlSafe
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0':
        return '\\0';
      case '\x08':
        return '\\b';
      case '\x09':
        return '\\t';
      case '\x1a':
        return '\\z';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%':
        return `\\${char}`; // prepends a backslash to backslash, percent and double/single quotes
      default:
        return char;
    }
  });
}

/**
 * Inserts a sync_stats record summarizing the most recent sync (counts, duration, status, and error if any).
 *
 * Writes a row to the D1 `sync_stats` table (local or remote depending on argv.local) containing:
 * syncedAt timestamp, number of themes successfully synced, the provided extensions count, duration in ms,
 * a `success` or `failed` status, and a sanitized error message when a sync error occurred.
 *
 * @param extensionsCount - Total number of extensions that were processed during this sync
 */
async function recordSyncStats(extensionsCount: number) {
  const durationMs = Date.now() - syncStartTime;
  const status = syncError ? 'failed' : 'success';
  const syncedAt = new Date().getTime();

  const sqlCmd = `
    INSERT INTO sync_stats (syncedAt, themesCount, extensionsCount, durationMs, status, errorMessage)
    VALUES (${syncedAt}, ${syncedThemesCount}, ${extensionsCount}, ${durationMs}, '${status}', ${
      syncError ? `'${sqlSafe(syncError)}'` : 'NULL'
    });
  `;

  try {
    if (argv.local) {
      await $`pnpm wrangler d1 execute zed_themes --command=${sqlCmd} --local`;
    } else {
      await $`pnpm wrangler d1 execute zed_themes --command=${sqlCmd} --remote`;
      await $`pnpm wrangler d1 execute --env preview zed_themes_preview --command=${sqlCmd} --remote`;
    }
    console.log(
      `📊 Sync stats recorded: ${syncedThemesCount} themes synced from ${extensionsCount} extensions in ${(
        durationMs / 1000
      ).toFixed(1)}s [${status}]`,
    );
  } catch (e) {
    console.error(`❌ Failed to record sync stats: ${e instanceof Error ? e.message : e}`);
  }
}