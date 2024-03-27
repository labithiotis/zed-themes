import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '../build/server';
import { getLoadContext } from '../load-context';

// Build param is not exported from worderd.d.ts, so we need to extract it
type Build = Parameters<typeof createPagesFunctionHandler>['0']['build'];

export const onRequest = createPagesFunctionHandler({
  build: build as unknown as Build,
  getLoadContext,
});
