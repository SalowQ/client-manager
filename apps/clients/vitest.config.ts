import react from "@vitejs/plugin-react";
import path from "path";
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
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup.ts"],
  },
});
