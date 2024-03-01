import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    tsconfigPaths(),
    svgrPlugin({ svgrOptions: { icon: true } }),
  ],
});
