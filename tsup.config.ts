import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/ui/*.tsx",
    "src/lib/utils.ts",
    "src/utils/layoutTokens.ts",
    "src/utils/colors.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
});
