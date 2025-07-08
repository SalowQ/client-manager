import { NativeFederationTestsHost } from "@module-federation/native-federation-tests/vite";
import { NativeFederationTypeScriptHost } from "@module-federation/native-federation-typescript/vite";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";
import type { InlineConfig } from "vitest/node";

declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

const moduleFederationConfig = {
  name: "auth",
  filename: "remoteEntry.js",
  exposes: {
    "./AuthApp": "./src/App.tsx",
  },
  remotes: {
    ui:
      process.env.NODE_ENV === "production"
        ? "https://ui-client-manager.vercel.app/assets/remoteEntry.js"
        : "http://localhost:3003/assets/remoteEntry.js",
  },
  shared: ["react", "react-dom", "react-router-dom"],
  test: {
    globals: true,
  },
} as UserConfig & {
  test: InlineConfig;
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    NativeFederationTestsHost({
      moduleFederationConfig,
    }),
    NativeFederationTypeScriptHost({
      moduleFederationConfig,
    }),
    react(),
    federation(moduleFederationConfig),
  ],
  server: {
    port: 3001,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: process.env.NODE_ENV === "production",
    cssCodeSplit: false,
  },
});
