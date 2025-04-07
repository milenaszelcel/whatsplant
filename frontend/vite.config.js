import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    server: {
      host: true,
      port: 3000,

      hmr: {
        clientPort: 3000,
      },
    },

    plugins: [react(), eslint()],
    resolve: {
      alias: {
        "@greenmate/contract": path.resolve("../contract"),
      },
    },
  };
});
