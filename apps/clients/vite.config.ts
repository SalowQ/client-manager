// apps/clientes/vite.config.ts
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";
import type { InlineConfig } from "vitest/node";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "clients",
      filename: "remoteEntry.js",
      exposes: {
        "./ClientsApp": "./src/App.tsx",
      },
      remotes: {
        ui: "http://localhost:3003/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
      test: {
        globals: true,
      },
    } as UserConfig & {
      test: InlineConfig;
    }),
    {
      name: "vite-plugin-notify-host-on-rebuild",
      apply(config, { command }) {
        return Boolean(command === "build" && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch("http://localhost:3000/__fullReload");
          } catch (e) {
            console.log(e);
          }
        }
      },
    },
  ],
  server: {
    port: 3002,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
