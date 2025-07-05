// apps/host/vite.config.ts
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "host",
      remotes: {
        auth: "http://localhost:3001/assets/remoteEntry.js",
        clients: "http://localhost:3002/assets/remoteEntry.js",
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
    minify: false,
    cssCodeSplit: false,
  },
});
