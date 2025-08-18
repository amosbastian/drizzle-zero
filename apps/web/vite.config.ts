import { resolve } from "node:path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    target: "es2022",
  },
  plugins: [
    tanstackStart({
      customViteReactPlugin: true,
      tsr: {
        srcDirectory: "src",
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
