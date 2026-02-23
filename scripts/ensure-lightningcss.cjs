const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const target = path.join(root, "node_modules", "lightningcss", "lightningcss.win32-x64-msvc.node");
const source = path.join(root, "node_modules", "lightningcss-win32-x64-msvc", "lightningcss.win32-x64-msvc.node");

if (process.platform !== "win32" || process.arch !== "x64") {
  process.exit(0);
}

if (fs.existsSync(target)) {
  process.exit(0);
}

if (!fs.existsSync(source)) {
  console.error("[ensure-lightningcss] Missing native binary.");
  console.error("[ensure-lightningcss] Expected one of:");
  console.error(`  - ${target}`);
  console.error(`  - ${source}`);
  console.error("[ensure-lightningcss] Reinstall dependencies and ensure optional packages are enabled.");
  process.exit(1);
}

fs.copyFileSync(source, target);
console.log("[ensure-lightningcss] Restored lightningcss.win32-x64-msvc.node");
