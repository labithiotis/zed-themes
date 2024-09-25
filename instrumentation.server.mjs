import * as Sentry from '@sentry/remix';

Sentry.init({
  dsn: 'https://ad00c9a48ec1d40d8ee464869fe3a993@o4508006947356672.ingest.de.sentry.io/4508009341452368',
  tracesSampleRate: 1,
  autoInstrumentRemix: true,
});
