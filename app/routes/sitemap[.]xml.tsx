import type { LoaderFunction } from "@remix-run/cloudflare";
import { fetchAllThemesFromKV } from "./themes._index";

const ts = "2024-03-20T00:00:00+00:00";

export const loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const list = await fetchAllThemesFromKV(context);

  const themeUrls = list?.map(
    (theme) =>
      `<url><loc>${url.origin}/themes/${theme.name}</loc><lastmod>${theme.updatedDate}</lastmod><priority>0.8</priority></url>`,
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
      ${themeUrls.join("\n")}
    </urlset>
    `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
