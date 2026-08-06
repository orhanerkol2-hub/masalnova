import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const builtHomepage = join(
  projectRoot,
  process.env.MASALNOVA_HOMEPAGE_SOURCE_DIR?.trim() || 'docs',
  'index.html',
);
const storyCoverDirectory = join(projectRoot, 'public/covers/stories');
const outputDirectory = join(projectRoot, 'public/covers/home');
const navTileDirectory = join(projectRoot, 'public/nav-tiles');

if (!existsSync(builtHomepage)) {
  throw new Error('Die gebaute Startseite fehlt. Bitte zuerst `npm run build` ausführen.');
}

const homepageHtml = readFileSync(builtHomepage, 'utf8');
const originalCoverPaths = new Set(
  [...homepageHtml.matchAll(/\/covers\/stories\/[^"'<>\\\s]+?\.(?:avif|jpe?g|png|webp)/gi)]
    .map((match) => match[0]),
);

// Include already optimized-only markup, such as the desktop resume thumbnail.
for (const match of homepageHtml.matchAll(/\/covers\/home\/([^"'<>\\\s]+?)-(?:360|720)\.webp/gi)) {
  const stem = match[1];
  for (const extension of ['.webp', '.png', '.jpg', '.jpeg', '.avif']) {
    const candidate = `/covers/stories/${stem}${extension}`;
    if (existsSync(join(projectRoot, 'public', candidate))) {
      originalCoverPaths.add(candidate);
      break;
    }
  }
}

if (!originalCoverPaths.size) {
  throw new Error('Keine Startseiten-Cover in der gebauten Startseite gefunden.');
}

mkdirSync(outputDirectory, { recursive: true });

for (const coverPath of [...originalCoverPaths].sort()) {
  const sourcePath = join(projectRoot, 'public', coverPath);
  const stem = basename(coverPath, extname(coverPath));

  for (const width of [360, 720]) {
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width === 360 ? 76 : 78, effort: 6 })
      .toFile(join(outputDirectory, `${stem}-${width}.webp`));
  }
}

await sharp(join(navTileDirectory, 'games-mobile-backdrop.png'))
  .webp({ quality: 78, effort: 6 })
  .toFile(join(navTileDirectory, 'games-mobile-backdrop.webp'));

console.log(
  `Startseitenbilder optimiert: ${originalCoverPaths.size * 2} Cover-Varianten und 1 Navigation-Hintergrund.`,
);
