import faroUploader from '@grafana/faro-rollup-plugin';
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from '@remix-run/dev';
import { type PluginOption, defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getLoadContext } from './load-context';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remixCloudflareDevProxy({ getLoadContext }),
    tsconfigPaths(),
    svgrPlugin({ svgrOptions: { icon: true } }),
    remix({
      ignoredRouteFiles: ['**/*.css', '**/*.{json,css}', '**/components/**', '**/*.spec.{ts,tsx}'],
    }),
    faroUploader({
      appName: 'zed-frontend-source-maps',
      endpoint: 'https://faro-api-prod-eu-west-2.grafana.net/faro/api/v1',
      appId: '4ee25a91-565e-4640-8b7a-43bc44af6c10',
      stackId: '1014205',
      apiKey: process.env.GRAFANA_SOURCE_MAP_API_KEY ?? '',
      gzipContents: true,
    }) as PluginOption,
  ],
});
