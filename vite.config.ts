import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "QuickRouteTomTom",
      // the proper extensions will be added
      fileName: "main",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true, // adds "types" field in package.json automatically
      outDir: "dist",
    }),
  ],
});
