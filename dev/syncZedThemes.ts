#!/usr/bin/env zx
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
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
  await $`git submodule update --init --recursive`;

  cd('./extensions');
  const cmd = await $`echo *`.quiet();
  folders = (await cmd.stdout).trim().split(' ');
});

if (argv.local) {
  console.log('Adding themes to local db.');
} else {
  console.log('Adding themes to remote db.');
}

let count = 0;
const dbSeedThemes = [];
for (const folder of folders) {
  try {
    const id = folder.toLowerCase();
    const cmd = await $`cat ${dir}/extensions/${folder}/themes/${folder}.json`.quiet();
    const hash = await $`(cd ${dir}/extensions/${folder} && git rev-parse --short HEAD)`.quiet();
    const data = JSON.parse(cmd.stdout);
    const origin = await $`cd ${dir}/extensions/${folder} && git remote get-url origin`.quiet();
    const repoUrl = origin.stdout?.trim();
    const repoPath = repoUrl.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');
    const repoInfo =
      await $`curl -s --header "Authorization: Bearer ${process.env.GITHUB_TOKEN}" https://api.github.com/repos/${repoPath}`.quiet();

    if (!repoInfo.stdout?.match(/stargazers_count/)) {
      console.log(repoInfo.stdout);
    }

    const repoStars = Number(repoInfo.stdout?.match(/stargazers_count"\s?:\s?(\d+)/)?.at(-1) ?? '0');

    const theme = {
      id,
      name: data.name,
      author: data.author,
      updatedDate: new Date().getTime(),
      versionHash: hash.stdout.trim(),
      bundled: true,
      repoUrl,
      repoStars,
      theme: data,
      userId: null,
    };
    if (dbSeedThemes.length <= 3) {
      dbSeedThemes.push(theme);
    }
    const sql = `
      INSERT INTO themes (id, name, author, updatedDate, versionHash, bundled, repoUrl, repoStars, userId, theme)
      VALUES ('${theme.id}', '${theme.name}', '${theme.author}', ${theme.updatedDate}, '${theme.versionHash}', ${theme.bundled}, '${theme.repoUrl}', ${theme.repoStars}, NULL, '${JSON.stringify(theme.theme)}')
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          author = EXCLUDED.author,
          updatedDate = EXCLUDED.updatedDate,
          versionHash = EXCLUDED.versionHash,
          bundled = EXCLUDED.bundled,
          repoUrl = EXCLUDED.repoUrl,
          repoStars = EXCLUDED.repoStars,
          userId = EXCLUDED.userId,
          theme = EXCLUDED.theme;
    `;

    console.log(`Adding theme [id=${theme.id}][stars=${theme.repoStars}][author=${theme.author}][name=${theme.name}]`);

    try {
      if (argv.local) {
        await $`pnpm wrangler d1 execute zed_themes --command=${sql} --local`;
      } else {
        await $`pnpm wrangler d1 execute zed_themes --command=${sql} --remote`;
        await $`pnpm wrangler d1 execute --env preview zed_themes_preview --command=${sql} --remote`;
      }
    } catch (e) {
      console.error(e);
    }

    if (argv.limit && ++count >= argv.limit) break;
  } catch (e) {
    // ignore
  }
}

fs.writeFileSync(path.resolve(__dirname, 'dbSeedThemes.json'), JSON.stringify(dbSeedThemes, null, 2));
