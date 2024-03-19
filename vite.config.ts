import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from '@remix-run/dev';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getLoadContext } from './load-context';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3005,
  },
  plugins: [
    remixCloudflareDevProxy({ getLoadContext }),
    svgrPlugin({ svgrOptions: { icon: true } }),
    tsconfigPaths(),
    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),
    remix({
      serverModuleFormat: 'esm',
      ignoredRouteFiles: ['**/*.css', '**/*.{json,css}', '**/components/**', '**/*.spec.{ts,tsx}'],
    }),
  ],
});
