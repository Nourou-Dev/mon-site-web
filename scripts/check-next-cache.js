const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const isDevelopment = process.argv.includes("--dev");
const nextDirectory = path.join(projectRoot, isDevelopment ? ".next-dev" : ".next");
const serverDirectory = path.join(nextDirectory, "server");

function collectJavaScriptFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? collectJavaScriptFiles(entryPath)
      : entry.name.endsWith(".js")
        ? [entryPath]
        : [];
  });
}

function findMissingServerChunks() {
  const missingChunks = new Set();
  const requirePattern = /require\(["']\.\/([0-9]+)\.js["']\)/g;

  for (const filePath of collectJavaScriptFiles(serverDirectory)) {
    const source = fs.readFileSync(filePath, "utf8");
    let match;

    while ((match = requirePattern.exec(source)) !== null) {
      const chunkPath = path.join(path.dirname(filePath), `${match[1]}.js`);
      if (!fs.existsSync(chunkPath)) missingChunks.add(chunkPath);
    }
  }

  return [...missingChunks];
}

function findMissingManifestAssets() {
  const manifestPath = path.join(nextDirectory, "app-build-manifest.json");
  if (!fs.existsSync(manifestPath)) return [];

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const assets = Object.values(manifest.pages ?? {}).flat();

  return assets
    .filter((asset) => typeof asset === "string")
    .map((asset) => path.join(nextDirectory, asset))
    .filter((assetPath) => !fs.existsSync(assetPath));
}

if (!fs.existsSync(nextDirectory)) {
  process.exit(0);
}

let missingChunks = [];
let missingManifestAssets = [];

try {
  missingChunks = findMissingServerChunks();
  missingManifestAssets = findMissingManifestAssets();
} catch (error) {
  console.warn(`Next.js cache check: invalid cache metadata, clearing ${nextDirectory}`);
  fs.rmSync(nextDirectory, { recursive: true, force: true });
  process.exit(0);
}
const missingAssets = [...missingChunks, ...missingManifestAssets];

if (missingAssets.length === 0) {
  console.log("Next.js cache check: OK");
  process.exit(0);
}

console.warn("Next.js cache check: stale cache detected, clearing .next");
fs.rmSync(nextDirectory, { recursive: true, force: true });