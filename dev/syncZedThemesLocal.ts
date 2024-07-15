#!/usr/bin/env zx

import { $ } from 'zx';

$.verbose = false;

const list = await $`npx --yes wrangler kv key list --binding=zed_themes --preview=false`;
for (const { name, metadata } of JSON.parse(list.stdout).slice(0, process.env.SYNC_LIMIT || -1)) {
  const cmd = await $`npx --yes wrangler kv key get ${name} --binding=zed_themes --preview=false`;
  await $`npx --yes wrangler kv key put ${name} ${cmd.stdout} --metadata=${JSON.stringify(metadata)} --binding=zed_themes --preview=false --local=true`;
  await $`npx --yes wrangler kv key put ${name} --local=true ${cmd.stdout} --metadata=${JSON.stringify(metadata)} --binding=zed_themes --preview=true --local=true`;
  console.log(`Synced ${name} from production to local`);
}
