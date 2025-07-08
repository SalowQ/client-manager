import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

const moduleFederationConfig = {
  name: "ui",
  filename: "remoteEntry.js",
  exposes: {
    "./components": "./src/test.ts",
  },
  shared: ["react", "react-dom"],
};

export default defineConfig({
  plugins: [tailwindcss(), react(), federation(moduleFederationConfig)],
  server: {
    port: 3003,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: process.env.NODE_ENV === "production",
    cssCodeSplit: false,
  },
});
