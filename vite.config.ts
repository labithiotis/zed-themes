import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
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
    remix({
      ssr: true,
      serverModuleFormat: 'esm',
      ignoredRouteFiles: ['**/*.css', '**/*.{json,svg,png,css}', '**/components/**', '**/*.spec.{ts,tsx}'],
    }),
  ],
});
