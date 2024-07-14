import { LinksFunction, LoaderFunction, MetaFunction, json } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { Toaster } from './components/ui/toaster';
import { ColorScheme, ColorSchemeProvider } from './providers/colorScheme';
import { ThemeProvider } from './providers/theme';
import { colorSchemeSession } from './utils/colorScheme.server';

import './root.css';
import './tailwind.css';

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Zed themes' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  { name: 'description', content: 'Preview & edit zed themes in your browser' },
  { name: 'theme-color', content: '#1e93ff' },
  { property: 'og:title', content: 'Zed themes' },
];

export const links: LinksFunction = () => [{ rel: 'manifest', href: '/manifest.json' }];

export type RootData = {
  colorScheme?: ColorScheme;
  shareUrl?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await colorSchemeSession(request);
  return json({ colorScheme: session.getColorScheme() });
};

export default function Root() {
  const loaderData = useLoaderData<RootData>();

  return (
    <html lang="en" className={loaderData.colorScheme}>
      <head>
        <Meta />
        <Links />
        <meta name="color-scheme" content={loaderData.colorScheme === 'light' ? 'light dark' : 'dark light'} />
      </head>
      <body className="bg-stone-300 dark:bg-stone-900">
        <ColorSchemeProvider colorScheme={loaderData.colorScheme}>
          <ThemeProvider>
            <Outlet />
          </ThemeProvider>
        </ColorSchemeProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}
