import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputZipPath = path.join(rootDir, 'public', 'camrose_care_concept_a_audit_package.zip');

const ROOT_FILES = [
  '.env.example',
  'index.html',
  'metadata.json',
  'package.json',
  'README.md',
  'tsconfig.json',
  'vite.config.ts',
  'bun.lock'
];

const INCLUDE_DIRS = ['src', 'public', 'scripts'];

const EXCLUDED_PUBLIC_FILES = new Set([
  'camrose_care_concept_a_audit_package.zip',
  'concept_a_readable_audit.html',
  'concept_a_standalone.html'
]);

const STORE_ONLY_EXTS = new Set(['.webp', '.mp3', '.pdf', '.png', '.jpg', '.jpeg', '.woff2', '.zip']);

function collectDirFiles(dirRel, entries) {
  const fullDir = path.join(rootDir, dirRel);
  if (!fs.existsSync(fullDir)) return;

  const items = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const item of items) {
    if (item.name.startsWith('.DS_Store')) continue;
    const relPath = path.posix.join(dirRel.replace(/\\/g, '/'), item.name);
    const fullPath = path.join(rootDir, relPath);

    if (item.isDirectory()) {
      collectDirFiles(relPath, entries);
    } else if (item.isFile()) {
      if (dirRel === 'public' && EXCLUDED_PUBLIC_FILES.has(item.name)) {
        continue;
      }
      const ext = path.extname(item.name).toLowerCase();
      const data = new Uint8Array(fs.readFileSync(fullPath));
      entries[relPath] = [data, { level: STORE_ONLY_EXTS.has(ext) ? 0 : 6 }];
    }
  }
}

const zipEntries = {};

for (const fileName of ROOT_FILES) {
  const fullPath = path.join(rootDir, fileName);
  if (fs.existsSync(fullPath)) {
    const data = new Uint8Array(fs.readFileSync(fullPath));
    zipEntries[fileName] = [data, { level: 6 }];
  }
}

for (const dirName of INCLUDE_DIRS) {
  collectDirFiles(dirName, zipEntries);
}

const zipped = zipSync(zipEntries);
fs.mkdirSync(path.dirname(outputZipPath), { recursive: true });
fs.writeFileSync(outputZipPath, zipped);

const fileCount = Object.keys(zipEntries).length;
const sizeMb = (zipped.byteLength / (1024 * 1024)).toFixed(2);
console.log(`Generated ${path.relative(rootDir, outputZipPath)} (${fileCount} files, ${sizeMb} MB)`);
