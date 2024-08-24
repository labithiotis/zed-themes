import {
  type Faro,
  ReactIntegration,
  createReactRouterV6DataOptions,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import * as react from '@remix-run/react';
import { useEffect, useRef } from 'react';

export function useFaro() {
  const faroRef = useRef<Faro | null>(null);

  useEffect(() => {
    if (!faroRef.current) {
      faroRef.current = initializeFaro({
        url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/648223654c78bcf617c4f4fce25db931',
        app: { name: 'zed-themes' },
        instrumentations: [
          // Mandatory, omits default instrumentations otherwise.
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
          // React integration for React applications.
          new ReactIntegration({
            router: createReactRouterV6DataOptions({
              matchRoutes: react.matchRoutes,
            }),
          }),
        ],
      });
    }
  }, []);
}
