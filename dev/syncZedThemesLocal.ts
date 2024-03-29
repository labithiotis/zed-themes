#!/usr/bin/env zx

import { $ } from 'zx';

$.verbose = false;

const list = await $`npx --yes wrangler kv:key list --binding=themes --preview=false`;
for (const { name, metadata } of JSON.parse(list.stdout).slice(0, process.env.SYNC_LIMIT || -1)) {
  const cmd = await $`npx --yes wrangler kv:key get ${name} --binding=themes --preview=false`;
  await $`npx --yes wrangler kv:key put ${name} ${cmd.stdout} --metadata=${JSON.stringify(metadata)} --binding=themes --preview=true --local=true`;
  await $`npx --yes wrangler kv:key put ${name} ${cmd.stdout} --metadata=${JSON.stringify(metadata)} --binding=themes --preview=false --local=true`;
  console.log(`Synced ${name} from production to local`);
}
