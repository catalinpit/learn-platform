import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
  build: {
    rollupOptions: {
      external: (id) => id.startsWith("@server"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://sf.catalins.tech",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
