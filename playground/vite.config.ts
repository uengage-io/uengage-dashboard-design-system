import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Serve the library's shared static assets (Figtree font, etc.) at the dev server root
  publicDir: path.resolve(__dirname, "../src/public"),
  resolve: {
    alias: {
      // `@/...` inside the library src points at `../src/...`
      "@": path.resolve(__dirname, "../src"),
      // Allow importing the library as `@your-org/ui` from the playground
      "@uengage/ui": path.resolve(__dirname, "../src/index.ts"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
