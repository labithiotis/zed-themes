import { getPlatformProxy } from 'wrangler';

Object.assign(globalThis, await getPlatformProxy());

/*

test bindings via repl

$ pnpm repl
> await env.kv.list()
{
  keys: [ { name: 'counter' } ],
  list_complete: true,
  cacheStatus: null
}
> await env.kv.get("counter")
'4'

*/
