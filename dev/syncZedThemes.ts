#!/usr/bin/env zx

import { $, cd, fs, within } from 'zx';
import { ThemeContent } from '~/themeFamily';
import { ThemesMetaData } from '~/types';

$.verbose = false;

const dir = '/tmp/zed-extensions';
let folders: string[] = [];

await within(async () => {
  // Fetch repo, pull latest submodules
  if (!(await fs.exists(dir))) {
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

for (const folder of folders) {
  try {
    const cmd = await $`cat ${dir}/extensions/${folder}/themes/${folder}.json`.quiet();
    const hash = await $`(cd ${dir}/extensions/${folder} && git rev-parse --short HEAD)`.quiet();
    const theme = JSON.parse(await cmd.stdout);
    const id = folder.toLowerCase();
    const value = JSON.stringify({ id, ...theme });
    const metaData = JSON.stringify({
      name: theme.name,
      author: theme.author,
      updatedDate: new Date().toISOString(),
      versionHash: hash.stdout.trim(),
      bundled: true,
      themes: theme.themes.map(({ name, appearance }: ThemeContent) => ({ name, appearance })),
    } satisfies ThemesMetaData);

    console.log(`Adding ${id} theme...`);

    await $`npx --yes wrangler kv:key put ${id} ${value} --metadata=${metaData} --binding=themes --preview=true`;
    await $`npx --yes wrangler kv:key put ${id} ${value} --metadata=${metaData} --binding=themes --preview=false`;
  } catch (e) {
    // ignore
  }
}
