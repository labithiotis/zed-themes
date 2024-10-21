/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { ActionFunctionArgs, AppLoadContext, EntryContext, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { RemixServer, isRouteErrorResponse } from '@remix-run/react';
import * as Sentry from '@sentry/remix';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

Sentry.init({
  dsn: 'https://ad00c9a48ec1d40d8ee464869fe3a993@o4508006947356672.ingest.de.sentry.io/4508009341452368',
  enabled: process.env.NODE_ENV !== 'development',
  sampleRate: 1,
  tracesSampleRate: 0.5, // 50%
  autoInstrumentRemix: true,
  initialScope: { tags: { server: true } },
  integrations: [Sentry.extraErrorDataIntegration()],
});

export function handleError(error: unknown, { request }: LoaderFunctionArgs | ActionFunctionArgs) {
  if (!request.signal.aborted) {
    if (isRouteErrorResponse(error) && error.status === 404) return;
    console.error(error);
    Sentry.captureException(error);
  }
}

export default async function handleRequest(
  request: Request,
  code: number,
  headers: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) {
  let status = code;
  const body = await renderToReadableStream(<RemixServer context={remixContext} url={request.url} />, {
    signal: request.signal,
    onError(error: unknown) {
      status = 500;
      console.error(error);
      if (!request.signal.aborted) {
        Sentry.captureException(error);
      }
    },
  });

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady;
  }

  headers.set('Content-Type', 'text/html');
  return new Response(body, {
    headers,
    status,
  });
}
