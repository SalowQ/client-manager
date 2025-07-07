import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "remote-entries",
      resolveId(id) {
        console.log(id);
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
    setupFiles: ["./test/setup.ts"],
  },
});
