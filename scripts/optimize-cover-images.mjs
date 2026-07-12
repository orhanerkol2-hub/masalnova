// Converts generated story cover PNG/JPEG files into lightweight WebP assets.
//
// Examples:
//   node scripts/optimize-cover-images.mjs
//   node scripts/optimize-cover-images.mjs --width=1200 --quality=82
import { access, readdir, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COVER_DIR = join(ROOT, 'public', 'covers', 'stories');
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

function parseArgs() {
  const raw = Object.fromEntries(
    process.argv.slice(2).map((s) => {
      const [key, ...rest] = s.replace(/^--/, '').split('=');
      return [key, rest.length ? rest.join('=') : true];
    })
  );
  return {
    width: raw.width ? parseInt(raw.width, 10) : 1200,
    quality: raw.quality ? parseInt(raw.quality, 10) : 82,
  };
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function shouldWrite(source, target) {
  if (!(await fileExists(target))) return true;
  const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
  return sourceStat.mtimeMs > targetStat.mtimeMs;
}

async function main() {
  const opts = parseArgs();
  const files = (await readdir(COVER_DIR)).sort();
  let written = 0;
  let skipped = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!SOURCE_EXTENSIONS.has(ext)) continue;

    const slug = basename(file, ext);
    const source = join(COVER_DIR, file);
    const target = join(COVER_DIR, `${slug}.webp`);
    if (!(await shouldWrite(source, target))) {
      skipped++;
      continue;
    }

    await sharp(source)
      .resize({ width: opts.width, withoutEnlargement: true })
      .webp({ quality: opts.quality, smartSubsample: true })
      .toFile(target);
    written++;
  }

  console.log(`optimized: ${written} WebP files written, ${skipped} already current`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
