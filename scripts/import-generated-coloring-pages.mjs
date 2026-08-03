import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const pairs = process.argv.slice(2);

if (pairs.length === 0) {
  throw new Error('Usage: node scripts/import-generated-coloring-pages.mjs <slug>=<source.png> [...]');
}

const printDir = path.join(process.cwd(), 'public', 'boyama', 'print');
await mkdir(printDir, { recursive: true });

for (const pair of pairs) {
  const separator = pair.indexOf('=');
  const slug = separator > 0 ? pair.slice(0, separator) : '';
  const source = separator > 0 ? pair.slice(separator + 1) : '';

  if (!/^[a-z0-9-]+$/.test(slug) || !source) {
    throw new Error(`Invalid coloring-page mapping: ${pair}`);
  }

  await sharp(path.resolve(source))
    .greyscale()
    .resize(2480, 3508, { fit: 'contain', background: '#ffffff', kernel: sharp.kernel.lanczos3 })
    .threshold(224)
    .png({ compressionLevel: 9, palette: true, colours: 2 })
    .withMetadata({ density: 300 })
    .toFile(path.join(printDir, `${slug}.png`));
}

console.log(`Imported ${pairs.length} generated A4 coloring pages.`);
