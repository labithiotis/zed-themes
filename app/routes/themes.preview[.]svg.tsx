import type { LoaderFunction } from '@remix-run/cloudflare';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema.js';
import { renderThemePreview } from '~/utils/themePreview.js';
import { useCache } from '~/utils/useCache.js';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);
  const themeId = url.searchParams.get('id');
  const themeName = url.searchParams.get('name');

  if (!themeId) throw new Response('Missing theme id', { status: 400 });

  const theme = await useCache('theme-preview', args.request.url, undefined, async () => {
    const db = drizzle(args.context.env.db, { schema });
    const themeFamily = await db
      .select({ theme: schema.themes.theme })
      .from(schema.themes)
      .where(sql`${schema.themes.id} = ${themeId}`);

    const themes = themeFamily.at(0)?.theme?.themes;
    return themes?.find((t) => t.name === themeName) ?? themes?.at(0);
  });

  if (!theme) throw new Response('Unable to find a theme', { status: 400 });

  return new Response(renderThemePreview(theme), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Security-Policy': "default-src 'none'",
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800',
    },
  });
};
