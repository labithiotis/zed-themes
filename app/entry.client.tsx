import { RemixBrowser, useLocation, useMatches } from '@remix-run/react';
import * as Sentry from '@sentry/remix';
import { StrictMode, startTransition, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';

Sentry.init({
  dsn: 'https://ad00c9a48ec1d40d8ee464869fe3a993@o4508006947356672.ingest.de.sentry.io/4508009341452368',
  enabled: process.env.NODE_ENV !== 'development',
  sampleRate: 1,
  tracesSampleRate: 0.5, // 50%
  initialScope: { tags: { server: false } },
  integrations: [
    Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches,
    }),
    Sentry.extraErrorDataIntegration(),
    Sentry.feedbackIntegration({
      autoInject: false,
      colorScheme: 'system',
      showBranding: false,
      showName: false,
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  replaysSessionSampleRate: 0.001, // 0.1% of sessions
  replaysOnErrorSampleRate: 0.01, // 1% of errors
});

hydrateRoot(document, <RemixBrowser />);
