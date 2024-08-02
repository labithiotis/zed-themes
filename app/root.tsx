import { ClerkApp } from '@clerk/remix';
import { getAuth, rootAuthLoader } from '@clerk/remix/ssr.server';
import { type LinksFunction, type LoaderFunction, type MetaFunction, json } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { Toaster } from './components/ui/toaster';
import { type ColorScheme, ColorSchemeProvider } from './providers/colorScheme';
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
  userId?: string;
};

export const loader: LoaderFunction = async (args) =>
  rootAuthLoader(args, async ({ request }) => {
    const session = await colorSchemeSession(request);
    const { userId } = await getAuth(args);
    return json({ colorScheme: session.getColorScheme(), userId });
  });

function Root() {
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

export default ClerkApp(Root);
