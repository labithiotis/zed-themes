import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3005,
  },
  plugins: [
    svgrPlugin({ svgrOptions: { icon: true } }),
    tsconfigPaths(),
    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),
    remix({
      ssr: true,
      serverModuleFormat: 'esm',
      ignoredRouteFiles: ['**/*.css', '**/*.{json,css}', '**/components/**', '**/*.spec.{ts,tsx}'],
    }),
  ],
});
