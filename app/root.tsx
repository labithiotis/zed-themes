import { ClerkApp } from '@clerk/remix';
import { getAuth, rootAuthLoader } from '@clerk/remix/ssr.server';
import { type LinksFunction, type LoaderFunction, type MetaFunction, json } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteError } from '@remix-run/react';
import { captureRemixErrorBoundaryError, withSentry } from '@sentry/remix';
import { Toaster } from './components/ui/toaster';
import { type ColorScheme, ColorSchemeProvider } from './providers/colorScheme';
import { usePosthog } from './providers/posthog';
import { ThemeProvider } from './providers/theme';
import { colorSchemeSession } from './utils/colorScheme.server';
import { languageSession } from './utils/language.server';

import { TooltipProvider } from './components/ui/tooltip';
import { type Language, LanguageProvider } from './providers/language';
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
  language?: Language;
  shareUrl?: string;
  userId?: string;
};

export const loader: LoaderFunction = async (args) =>
  rootAuthLoader(args, async ({ request }) => {
    const { userId } = await getAuth(args);
    const _colorSchemeSession = await colorSchemeSession(request);
    const _languageSession = await languageSession(request);

    return json({
      userId,
      colorScheme: _colorSchemeSession.getColorScheme(),
      language: _languageSession.getLanguage(),
    });
  });

function Root() {
  usePosthog();
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
          <LanguageProvider language={loaderData.language}>
            <ThemeProvider>
              <TooltipProvider>
                <Outlet />
              </TooltipProvider>
            </ThemeProvider>
          </LanguageProvider>
        </ColorSchemeProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  captureRemixErrorBoundaryError(error);

  return (
    <div>
      <h1>Themes Error</h1>
      <p>{error instanceof Error ? error?.message : 'Something went wrong'}</p>
      <pre>{error instanceof Error ? error?.stack : ''}</pre>
    </div>
  );
}

export default ClerkApp(Root);
