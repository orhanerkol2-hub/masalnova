import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { coloringPages } from '../src/data/coloring-pages.mjs';

const root = process.cwd();
const printDir = path.join(root, 'public', 'boyama', 'print');
const previewDir = path.join(root, 'public', 'boyama', 'preview');
const canvasDir = path.join(root, 'public', 'boyama', 'canvas');
const qaOutput = process.env.BOYAMA_QA_OUTPUT
  ? path.resolve(process.env.BOYAMA_QA_OUTPUT)
  : path.join(root, 'design-qa-boyama-contact-sheet.png');

const pages = coloringPages.map((page) => page.slug);

await Promise.all([
  mkdir(printDir, { recursive: true }),
  mkdir(previewDir, { recursive: true }),
  mkdir(canvasDir, { recursive: true }),
]);

for (const slug of pages) {
  const source = path.join(printDir, `${slug}.png`);
  const metadata = await sharp(source).metadata();
  if (metadata.width !== 2480 || metadata.height !== 3508) {
    throw new Error(`${slug} must be an A4 portrait PNG at 2480x3508 pixels.`);
  }

  await sharp(source)
    .resize(760, 1075, { fit: 'contain', background: '#ffffff' })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(previewDir, `${slug}.webp`));

  await sharp(source)
    .resize(760, 1075, { fit: 'contain', background: '#ffffff' })
    .threshold(224)
    .png({ compressionLevel: 9, palette: true, colours: 2 })
    .toFile(path.join(canvasDir, `${slug}.png`));
}

const thumbs = await Promise.all(pages.map(async (slug, index) => ({
  input: await sharp(path.join(previewDir, `${slug}.webp`))
    .resize(260, 368, { fit: 'contain', background: '#ffffff' })
    .extend({ top: 8, bottom: 8, left: 8, right: 8, background: '#dce7ff' })
    .png()
    .toBuffer(),
  left: (index % 5) * 276,
  top: Math.floor(index / 5) * 384,
})));

await sharp({
  create: {
    width: 1380,
    height: Math.ceil(pages.length / 5) * 384,
    channels: 3,
    background: '#eef3ff',
  },
})
  .composite(thumbs)
  .png()
  .toFile(qaOutput);

console.log(`Verified ${pages.length} A4 coloring pages and rebuilt their previews and canvas files.`);
