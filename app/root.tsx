import { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { LoaderFunction, json } from '@remix-run/server-runtime';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { uiThemeSession } from './components/uiTheme.server.ts';
import { UiTheme, UiThemeLoader, uiTheme } from './components/UiThemeToggle.tsx';

import './root.css';
import styles from './tailwind.css?url';

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Zed themes' },
  { viewport: 'width=device-width,initial-scale=1' },
  { description: 'Preview & edit zed themes in your browser' },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/firacode@latest/distr/fira_code.min.css' },
];

export type RootData = {
  uiTheme?: UiTheme;
  shareUrl?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await uiThemeSession(request);
  return json({ uiTheme: session.getUiTheme() });
};

export default function Root() {
  console.debug('Render root');

  const loaderData = useLoaderData<RootData>();

  uiTheme.value = loaderData.uiTheme;

  return (
    <html lang="en" className={uiTheme.value}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-300 dark:bg-stone-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <UiThemeLoader />
      </body>
    </html>
  );
}
