import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const DIRECTIVE = '"use client";\n';
const distDir = new URL("../dist", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

function injectDirective(filePath) {
  const content = readFileSync(filePath, "utf8");
  if (!content.startsWith('"use client"')) {
    writeFileSync(filePath, DIRECTIVE + content);
  }
}

// Inject into dist/index.js and dist/index.cjs
injectDirective(join(distDir, "index.js"));
injectDirective(join(distDir, "index.cjs"));

// Inject into all component files
const uiDir = join(distDir, "components", "ui");
for (const file of readdirSync(uiDir)) {
  if (file.endsWith(".js") || file.endsWith(".cjs")) {
    injectDirective(join(uiDir, file));
  }
}

console.log("✓ Injected \"use client\" into dist bundles");
