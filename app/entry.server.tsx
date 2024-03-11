import { EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { platformProxy } from './miniflare';

// force "browser" export on node (typing is from env.d.ts)
import { renderToReadableStream } from 'react-dom/server.browser';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext & { env: any }
) {
  // initialize miniflare to mimic cloudflare workers runtime on vite server
  if (import.meta.env.DEV) {
    remixContext.env = platformProxy.env;
  }

  const body = await renderToReadableStream(<RemixServer context={remixContext} url={request.url} />, {
    signal: request.signal,
    onError(error: unknown) {
      // Log streaming rendering errors from inside the shell
      console.error(error);
      responseStatusCode = 500;
    },
  });

  if (isbot(request.headers.get('user-agent') ?? '')) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
