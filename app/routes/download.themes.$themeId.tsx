import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import invariant from 'tiny-invariant';

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const themesKv = context.env?.zed_themes;

  invariant(params.themeId);

  const theme = await themesKv?.get(params.themeId);

  if (!theme) {
    throw new Response(null, { status: 404, statusText: 'Not Found' });
  }

  return new Response(JSON.stringify(JSON.parse(theme), null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${params.themeId}.json"`,
    },
  });
};
