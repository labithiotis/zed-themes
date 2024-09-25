import * as Sentry from '@sentry/cloudflare';

export const onRequest = [
  Sentry.sentryPagesPlugin((context) => ({
    dsn: 'https://ad00c9a48ec1d40d8ee464869fe3a993@o4508006947356672.ingest.de.sentry.io/4508009341452368',
    sampleRate: 1,
    tracesSampleRate: 1.0,
  })),
];
