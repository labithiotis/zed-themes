import { ClerkApp } from '@clerk/remix';
import { getAuth, rootAuthLoader } from '@clerk/remix/ssr.server';
import {
  type ActionFunction,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { captureRemixErrorBoundaryError } from '@sentry/remix';
import type { ReactNode } from 'react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { type ColorScheme, ColorSchemeProvider } from './providers/colorScheme';
import { type Language, LanguageProvider } from './providers/language';
import { usePosthog, usePosthogIdentify } from './providers/posthog';
import { ThemeProvider } from './providers/theme';
import tailwindStylesheet from './tailwind.css?url';
import { colorSchemeSession } from './utils/colorScheme.server';
import { languageSession } from './utils/language.server';

import './root.css';
import { NotFoundResponse } from './utils/helpers';

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Zed themes' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  { name: 'description', content: 'Preview & edit zed themes in your browser' },
  { name: 'theme-color', content: '#1e93ff' },
  { property: 'og:title', content: 'Zed themes' },
];

export const links: LinksFunction = () => [
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'stylesheet', href: tailwindStylesheet },
];

export type RootData = {
  colorScheme?: ColorScheme;
  language?: Language;
  shareUrl?: string;
  userId?: string;
};

export const loader: LoaderFunction = async (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { userId } = await getAuth(args);
    const _colorSchemeSession = await colorSchemeSession(request);
    const _languageSession = await languageSession(request);

    return json({
      userId,
      colorScheme: _colorSchemeSession.getColorScheme(),
      language: _languageSession.getLanguage(),
    });
  });
};

export const action: ActionFunction = async () => {
  throw NotFoundResponse;
};

function Document(props: { children: ReactNode; title?: string; colorScheme?: ColorScheme }) {
  const colorScheme = props.colorScheme === 'dark' ? 'dark' : 'light';
  return (
    <html lang="en" className={colorScheme}>
      <head>
        {props.title ? <title>{props.title}</title> : null}
        <Meta />
        <Links />
        <meta name="theme-color" content={colorScheme} />
        <meta name="color-scheme" content={colorScheme} />
      </head>
      <body className="bg-stone-300 dark:bg-stone-900">
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}

function Root() {
  usePosthog();
  usePosthogIdentify();
  const loaderData = useLoaderData<RootData>();

  return (
    <Document colorScheme={loaderData.colorScheme}>
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
      <Toaster />
    </Document>
  );
}

export default ClerkApp(Root);

export function ErrorBoundary() {
  usePosthog();
  const error = useRouteError();

  let content = <></>;

  if (isRouteErrorResponse(error)) {
    if (error.status !== 404) {
      captureRemixErrorBoundaryError(error);
    }
    content = (
      <>
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          {error.status}
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Something's missing
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          {error?.data ?? 'Something went wrong'}
        </p>
      </>
    );
  } else {
    captureRemixErrorBoundaryError(error);
    content = (
      <>
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          Oops!
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Something unexpected happened
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          {error instanceof Error ? error?.message : 'Unknown error'}
        </p>
        <pre className="mb-4 text-xs font-light text-gray-500 dark:text-gray-400 overflow-y-auto max-h-24">
          {error instanceof Error ? error?.stack : ''}
        </pre>
      </>
    );
  }

  return (
    <Document>
      <section className="flex content-center items-center justify-center h-screen w-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            {content}
            <Button>
              <Link to="/">Return to home</Link>
            </Button>
          </div>
        </div>
      </section>
    </Document>
  );
}
