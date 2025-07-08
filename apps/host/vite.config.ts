// apps/host/vite.config.ts
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "host",
      remotes: {
        auth:
          process.env.NODE_ENV === "production"
            ? "https://client-manager-eosin.vercel.app/auth/assets/remoteEntry.js"
            : "http://localhost:3001/assets/remoteEntry.js",
        clients:
          process.env.NODE_ENV === "production"
            ? "https://client-manager-eosin.vercel.app/clients/assets/remoteEntry.js"
            : "http://localhost:3002/assets/remoteEntry.js",
        ui:
          process.env.NODE_ENV === "production"
            ? "https://client-manager-eosin.vercel.app/ui/assets/remoteEntry.js"
            : "http://localhost:3003/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
    {
      name: "vite-plugin-reload-endpoint",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.originalUrl === "/__fullReload") {
            server.hot.send({ type: "full-reload" });

            res.end("Full reload triggered");
          } else {
            next();
          }
        });
      },
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: process.env.NODE_ENV === "production",
    cssCodeSplit: false,
  },
});
