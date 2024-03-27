import { LoaderFunction } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const robotText = `
    User-agent: *
    Allow: /

    Sitemap: ${url.origin}/sitemap.xml
    `;

  return new Response(robotText, { status: 200, headers: { 'Content-Type': 'text/plain' } });
};
