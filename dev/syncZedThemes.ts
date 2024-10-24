#!/usr/bin/env zx
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import json5 from 'json5';
import { fs, path, $, argv, cd, within } from 'zx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

$.verbose = false;

const dir = process.env.CI ? '.tmp/zed-extensions' : '/tmp/zed-extensions';
let folders: string[] = [];

await within(async () => {
  // Fetch repo, pull latest submodules
  if (!process.env.CI && !(await fs.exists(dir))) {
    console.log('Cloning extensions repo...');
    await $`git clone git@github.com:zed-industries/extensions.git ${dir}`;
  }

  cd(dir);

  console.log("Pull latest's submodules...");

  await $`git pull`;
  await $`git -c submodule.extensions/meson.update=none submodule update --init --recursive`;

  cd('./extensions');
  const cmd = await $`echo *`.quiet();
  folders = (await cmd.stdout).trim().split(' ');
});

if (argv.local) {
  console.log('Adding themes to local db.');
} else {
  console.log('Adding themes to remote db.');
}

// Fetch the latest Zed Ext API Info
const zedApi = 'https://api.zed.dev/extensions?max_schema_version=1';
const zedApiCmd = await $`curl ${zedApi}`.quiet();
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
let extInfo: Map<string, ExtInfo> = new Map();
try {
  const data: ExtInfo[] = json5.parse(zedApiCmd.stdout).data;
  extInfo = new Map(data.map((e) => [e.id, e]));
} catch (e) {
  console.warn('Failed to parse zed extensions info from api', e);
}

let count = 0;
const dbSeedThemes = [];
for (const folder of folders) {
  if (folder === 'meson') continue;

  try {
    const id = folder.toLowerCase();
    const file = (await $`ls ${dir}/extensions/${folder}/themes | head -1`.nothrow().quiet()).stdout.trim();

    if (!file) {
      console.log(`⏩ [${folder}] Skipping because it has no themes`);
      continue;
    }

    const cmd = await $`cat ${dir}/extensions/${folder}/themes/${file}`.quiet();
    const hash = await $`(cd ${dir}/extensions/${folder} && git rev-parse --short HEAD)`.quiet();
    const repoDate = await $`(cd ${dir}/extensions/${folder} && git --no-pager log -1 --format="%ct")`.quiet();
    const data = json5.parse(cmd.stdout);
    const origin = await $`cd ${dir}/extensions/${folder} && git remote get-url origin`.quiet();
    const repoUrl = origin.stdout?.trim();
    const repoPath = repoUrl.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');
    const repoInfo =
      await $`curl -s --header "Authorization: Bearer ${process.env.GITHUB_TOKEN}" https://api.github.com/repos/${repoPath}`.quiet();
    const installCount = extInfo.get(id)?.download_count;
    const updatedDateTs = new Date(extInfo.get(id)?.published_at ?? +repoDate.stdout.trim() * 1000).getTime();

    if (!repoInfo.stdout?.match(/stargazers_count/)) {
      if (repoInfo.stdout.match(/not found/i)) {
        console.log(`! [${folder}] Unable to get GH repo info`);
      } else {
        console.log(repoInfo.stdout);
      }
    }

    const repoStars = Number(repoInfo.stdout?.match(/stargazers_count"\s?:\s?(\d+)/)?.at(-1) ?? '0');

    const theme = {
      id,
      name: data.name,
      author: data.author,
      updatedDate: Number.isNaN(updatedDateTs) ? Date.now() : updatedDateTs,
      versionHash: hash.stdout.trim(),
      bundled: true,
      repoUrl,
      repoStars,
      theme: data,
      userId: null,
      installCount,
    };
    if (dbSeedThemes.length <= 3) {
      dbSeedThemes.push(theme);
    }

    const addInstallCount = typeof installCount === 'number';
    const sql = `
      INSERT INTO themes (id, name, author, updatedDate, versionHash, bundled, repoUrl, repoStars, userId, theme ${addInstallCount ? ', installCount' : ''})
      VALUES ('${theme.id}', '${theme.name}', '${theme.author}', ${theme.updatedDate}, '${theme.versionHash}', ${theme.bundled}, '${theme.repoUrl}', ${theme.repoStars}, NULL, '${JSON.stringify(theme.theme)}' ${addInstallCount ? `, ${theme.installCount}` : ''})
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
        await $`pnpm wrangler d1 execute zed_themes --command=${sql} --local`;
      } else {
        await $`pnpm wrangler d1 execute zed_themes --command=${sql} --remote`;
        await $`pnpm wrangler d1 execute --env preview zed_themes_preview --command=${sql} --remote`;
      }
      console.log(`✅ [${folder}] Added theme [stars=${theme.repoStars}][author=${theme.author}][name=${theme.name}]`);
    } catch (e) {
      console.error(`❌ [${folder}] ${e instanceof Error ? e.message : e}`);
    }

    if (argv.limit && ++count >= argv.limit) break;
  } catch (e) {
    console.error(`❌ [${folder}] ${e instanceof Error ? e.message : e}`);
  }
}

fs.writeFileSync(path.resolve(__dirname, 'dbSeedThemes.json'), JSON.stringify(dbSeedThemes, null, 2));
