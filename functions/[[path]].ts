import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import { getLoadContext } from '../load-context';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as build from '../build/server';

// Build param is not exported from worderd.d.ts, so we need to extract it
type Build = Parameters<typeof createPagesFunctionHandler>['0']['build'];

export const onRequest = createPagesFunctionHandler({
  build: build as unknown as Build,
  getLoadContext,
});
