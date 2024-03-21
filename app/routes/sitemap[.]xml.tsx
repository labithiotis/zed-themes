import { LoaderFunction } from '@remix-run/cloudflare';
import { ThemesMetaData } from '../types';

const ts = '2024-03-20T00:00:00+00:00';

export const loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const list = await context.env.themes?.list<ThemesMetaData>();

  const themeUrls = list?.keys.map(
    (key) =>
      `<url><loc>${url.origin}/themes/${key.name}</loc><lastmod>${key.metadata?.updatedDate}</lastmod><priority>0.8</priority></url>`
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
