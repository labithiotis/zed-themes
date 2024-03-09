import { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { LoaderFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { themeSession } from './components/uiTheme.server.ts';
import { UiTheme, UiThemeLoader } from './components/UiThemeToggle.tsx';

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
  theme?: UiTheme;
};

export const loader: LoaderFunction = async ({ request }): Promise<RootData> => {
  const session = await themeSession(request);
  return {
    theme: session.getTheme(),
  };
};

export default function App() {
  const loaderData = useLoaderData<RootData>();

  return (
    <html lang="en" className={loaderData.theme}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-300 dark:bg-stone-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <UiThemeLoader theme={loaderData.theme} />
      </body>
    </html>
  );
}
