import type { LoaderFunction } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';

const ts = '2024-03-20T00:00:00+00:00';

export const loader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);
  const db = drizzle(args.context.env.db, { schema });

  const records = await db.select().from(schema.themes).all();

  const themeUrls = records?.map(
    (theme) =>
      `<url><loc>${url.origin}/themes/${theme.id}</loc><lastmod>${theme.updatedDate}</lastmod><priority>0.8</priority></url>`,
  );

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${url.origin}</loc>
        <lastmod>${ts}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${url.origin}/themes</loc>
        <lastmod>${ts}</lastmod>
        <priority>1.0</priority>
      </url>
      ${themeUrls.join('\n')}
    </urlset>
    `;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
