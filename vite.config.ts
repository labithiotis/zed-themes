import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from "@remix-run/dev";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

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
      ignoredRouteFiles: ["**/*.css", "**/*.{json,css}", "**/components/**", "**/*.spec.{ts,tsx}"],
    }),
  ],
});
