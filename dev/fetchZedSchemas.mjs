import { $, cd, fs } from 'zx';

const themes = [];
const dir = '.tmp/zed-extensions';

// Fetch repo, pull latest summodules
if (!fs.existsSync(dir)) {
  await $`git clone git@github.com:zed-industries/extensions.git ${dir}`;
}
cd(dir);
await $`git pull`;
await $`git submodule update --init --recursive`;

cd('./extensions');
const cmd = await $`echo *`.quiet();
const folders = (await cmd.stdout).trim().split(' ');
for (const folder of folders) {
  try {
    const cmd = await $`cat ./${folder}/themes/${folder}.json`.quiet();
    const theme = JSON.parse(await cmd.stdout);
    console.log(`Adding ${folder} theme`);
    themes.push({
      id: folder.toLowerCase(),
      name: theme.name,
      author: theme.author,
      themes: theme.themes,
    });
  } catch (e) {
    // ignore
  }
}

cd('../../../');
fs.writeJsonSync('./themes.json', themes);
