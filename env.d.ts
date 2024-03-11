/// <reference types="vite/client" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />
import type { AppLoadContext as OriginalAppLoadContext } from '@remix-run/server-runtime';

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext extends OriginalAppLoadContext {
    // `env` is injected in global by
    // - "app/miniflare.ts" for development
    // - "app/server.mjs" on production
    env: {
      themes: KVNamespace;
      shares: KVNamespace;
    };
  }
}
