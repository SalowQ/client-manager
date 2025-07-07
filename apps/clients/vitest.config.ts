import react from "@vitejs/plugin-react";
import { crossOrigin } from "happy-dom/lib/PropertySymbol.js";
import path, { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "remote-entries",
      resolveId(id) {
        console.log(id);
        // if (id === "micro_frontend_remote/FeatureOne")
        //   return path.resolve(
        //     "src/micro-frontends/micro_frontend_remote/FeatureOne.d.ts"
        //   );

        // Resolver importações da UI da libs
        if (id === "ui/components") {
          return path.resolve("src/decl.d.ts");
        }
      },
    },
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  test: {
    globals: true,
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        settings: {
          fetch: {
            disableSameOriginPolicy: true,
          },
        },
      },
    },
    setupFiles: ["./test/setup.ts"],
  },
});
