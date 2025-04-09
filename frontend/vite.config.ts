import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: "yersultan",
      project: "javascript-react",
    }),
    sitemap({
      hostname: "https://bs-stats.pages.dev",
    }),
  ],

  build: {
    sourcemap: true,
  },
});
