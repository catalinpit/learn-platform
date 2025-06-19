import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
  // build: {
  //   rollupOptions: {
  //     external: (id) => id.startsWith("@server"),
  //   },
  // },
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "development"
            ? "http://localhost:9999"
            : "https://learn.self-host.tech",
        changeOrigin: true,
      },
    },
  },
});
