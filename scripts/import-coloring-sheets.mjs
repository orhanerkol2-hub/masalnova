import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [firstSheet, secondSheet] = process.argv.slice(2);

if (!firstSheet || !secondSheet) {
  throw new Error('Usage: node scripts/import-coloring-sheets.mjs <sheet-1.jpg> <sheet-2.jpg>');
}

const root = process.cwd();
const printDir = path.join(root, 'public', 'boyama', 'print');
const pageWidth = 2480;
const pageHeight = 3508;
const artworkWidth = 2100;

const sheets = [
  {
    source: path.resolve(firstSheet),
    slugs: [
      'keloglan-el-salliyor',
      'keloglan-yolculuga-cikiyor',
      'keloglan-ve-sevimli-esek',
      'keloglan-ekmegini-paylasiyor',
      'keloglan-ve-bilge-dede',
      'keloglan-ve-sicrayan-balik',
      'keloglan-esekle-yolculuk',
      'keloglan-sevgiyle-alkisliyor',
      'keloglan-koy-yolunda-fener',
      'keloglan-bayrak-tasiyor',
    ],
  },
  {
    source: path.resolve(secondSheet),
    slugs: [
      'keloglan-cicekleri-suluyor',
      'keloglan-elma-agacinda-kitap',
      'keloglan-ve-zurafa',
      'keloglan-ormanda-odun-topluyor',
      'keloglan-golde-kurek-cekiyor',
      'keloglan-ucurtmasiyla-oynuyor',
      'keloglan-kardan-adam-yapiyor',
      'keloglan-nineye-yardim-ediyor',
      'keloglan-hayvan-dostlarini-dusluyor',
      'keloglan-ekmek-sepetini-paylasiyor',
    ],
  },
];

await mkdir(printDir, { recursive: true });

for (const sheet of sheets) {
  const metadata = await sharp(sheet.source).metadata();
  if (metadata.width !== 1024 || metadata.height !== 559) {
    throw new Error(`${sheet.source} must be a 1024x559 contact sheet.`);
  }

  for (const [index, slug] of sheet.slugs.entries()) {
    const crop = {
      left: 11 + (index % 5) * 202,
      top: 7 + Math.floor(index / 5) * 276,
      width: 194,
      height: 268,
    };
    const artworkHeight = Math.round(artworkWidth * crop.height / crop.width);
    const artwork = await sharp(sheet.source)
      .extract(crop)
      .greyscale()
      .resize({ width: artworkWidth, height: artworkHeight, kernel: sharp.kernel.lanczos3 })
      .threshold(224)
      .png({ compressionLevel: 9, palette: true, colours: 2 })
      .toBuffer();

    await sharp({
      create: {
        width: pageWidth,
        height: pageHeight,
        channels: 3,
        background: '#ffffff',
      },
    })
      .composite([{ input: artwork, gravity: 'centre' }])
      .png({ compressionLevel: 9, palette: true, colours: 2 })
      .withMetadata({ density: 300 })
      .toFile(path.join(printDir, `${slug}.png`));
  }
}

console.log(`Imported ${sheets.reduce((total, sheet) => total + sheet.slugs.length, 0)} individual A4 coloring pages.`);
