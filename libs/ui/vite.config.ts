import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const moduleFederationConfig = {
  name: "ui",
  filename: "remoteEntry.js",
  exposes: {
    "./UiApp": "./src/App.tsx",
    "./components": "./src/index.ts",
  },
  shared: ["react", "react-dom"],
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation(moduleFederationConfig),
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
    port: 3003,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
