#!/usr/bin/env zx

import { $ } from "zx";

$.verbose = false;

const id = "37c594b8926644dc9527f00a22982c52";

const list = await $`npx --yes wrangler kv key list --namespace-id=${id} --preview=false`;
for (const { name, metadata } of JSON.parse(list.stdout).slice(0, process.env.SYNC_LIMIT || -1)) {
  const cmd = await $`npx --yes wrangler kv key get ${name} --namespace-id=${id} --preview=false`;
  await $`npx --yes wrangler kv key put ${name} ${cmd.stdout} --metadata=${JSON.stringify(metadata)} --binding=zed_shares --preview=true`;
  await $`npx --yes wrangler kv key put ${name} ${cmd.stdout} --metadata=${JSON.stringify(metadata)} --binding=zed_shares --preview=false`;
  console.log(`Migrated ${name}`);
}
