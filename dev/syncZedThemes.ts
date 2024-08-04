#!/usr/bin/env zx

import type { DBTheme } from 'drizzle/schema';
import { fs, $, argv, cd, within } from 'zx';

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
for (const folder of folders) {
  try {
    const id = folder.toLowerCase();
    const cmd = await $`cat ${dir}/extensions/${folder}/themes/${folder}.json`.quiet();
    const hash = await $`(cd ${dir}/extensions/${folder} && git rev-parse --short HEAD)`.quiet();
    const data = JSON.parse(cmd.stdout);
    const theme: DBTheme = {
      id,
      name: data.name,
      author: data.author,
      updatedDate: new Date(),
      versionHash: hash.stdout.trim(),
      bundled: true,
      theme: data,
      userId: null,
    };
    const sql = `
      INSERT INTO themes (id, name, author, updatedDate, versionHash, bundled, userId, theme)
      VALUES ("${theme.id}", "${theme.name}", "${theme.author}", ${theme.updatedDate.getTime()}, "${theme.versionHash}", ${theme.bundled}, null, '${JSON.stringify(theme.theme)}')
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          author = EXCLUDED.author,
          updatedDate = EXCLUDED.updatedDate,
          versionHash = EXCLUDED.versionHash,
          bundled = EXCLUDED.bundled,
          userId = EXCLUDED.userId,
          theme = EXCLUDED.theme;
    `;

    console.log(`Adding ${id} theme...`);
    if (argv.local) {
      await $`pnpm wrangler d1 execute zed_themes --command=${sql} --local`;
    } else {
      await $`pnpm wrangler d1 execute zed_themes --command=${sql} --remote`;
      await $`pnpm wrangler d1 execute --env preview zed_themes_preview --command=${sql} --remote`;
    }

    if (argv.limit && ++count >= argv.limit) break;
  } catch (e) {
    // ignore
  }
}
