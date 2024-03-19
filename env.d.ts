// <reference types="vite/client" />
// <reference types="@remix-run/cloudflare" />
// <reference types="@cloudflare/workers-types" />

import type { AppLoadContext as OriginalAppLoadContext } from '@remix-run/cloudflare';

export interface KVEnv {
  THEMES?: KVNamespace;
  SHARES?: KVNamespace;
}

declare module '@remix-run/cloudflare' {
  export interface AppLoadContext extends OriginalAppLoadContext {
    // `env` is injected in global by
    // - "app/miniflare.ts" for development
    // - "app/server.mjs" on production
    env?: KVEnv;
  }
}

// https://github.com/rakkasjs/rakkasjs/blob/65481844280a936601c3eb73a00dbb1c8362ea14/packages/rakkasjs/src/types.d.ts#L12-L15
declare module 'react-dom/server.browser' {
  export * from 'react-dom/server';
}
