import { LinksFunction, LoaderFunction, MetaFunction, json } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { UiThemeLoader } from './components/UiThemeToggle';
import { uiThemeSession } from './components/uiTheme.server';
import { UiTheme, UiThemeProvider } from './providers/uiTheme';

import { ThemeProvider } from './providers/theme';
import './root.css';
import styles from './tailwind.css?url';

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Zed themes' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  { name: 'description', content: 'Preview & edit zed themes in your browser' },
  { property: 'og:title', content: 'Zed themes' },
];

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export type RootData = {
  uiTheme?: UiTheme;
  shareUrl?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await uiThemeSession(request);
  return json({ uiTheme: session.getUiTheme() });
};

export default function Root() {
  const loaderData = useLoaderData<RootData>();

  return (
    <html lang="en" className={loaderData.uiTheme}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-300 dark:bg-stone-900">
        <UiThemeProvider uiTheme={loaderData.uiTheme}>
          <ThemeProvider>
            <Outlet />
          </ThemeProvider>
        </UiThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <UiThemeLoader />
      </body>
    </html>
  );
}
