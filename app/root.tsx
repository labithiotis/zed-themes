import { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { themeSession } from './components/uiTheme.server.ts';
import { UITheme, uiTheme } from './components/UIThemeToggle.tsx';

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
  theme: UITheme;
};

export const loader: LoaderFunction = async ({ request }): Promise<RootData> => {
  const session = await themeSession(request);
  return {
    theme: session.getTheme() ?? 'light',
  };
};

export const action: ActionFunction = async ({ request }) => {
  const session = await themeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (theme === 'dark' || theme === 'light') {
    session.setTheme(theme);
    return json({ success: true }, { headers: { 'Set-Cookie': await session.commit() } });
  }
};

export default function App() {
  const { theme } = useLoaderData<RootData>();

  uiTheme.value = theme;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={`${theme} bg-stone-300 dark:bg-stone-900 `}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
