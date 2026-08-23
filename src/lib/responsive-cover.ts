import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

interface ResponsiveCover {
  sourceWidth: number;
  srcset?: string;
}

const publicDirectory = resolve(process.cwd(), 'public');
const coverCache = new Map<string, Promise<ResponsiveCover>>();

function publicFilePath(pathname: string) {
  return join(publicDirectory, pathname.replace(/^\//, ''));
}

async function inspectCover(image: string): Promise<ResponsiveCover> {
  const pathname = image.split(/[?#]/, 1)[0];
  const isLocalStoryCover = pathname.startsWith('/covers/stories/');
  if (!isLocalStoryCover || !/\.(?:avif|jpe?g|png|webp)$/i.test(pathname)) {
    return { sourceWidth: 1200 };
  }

  const sourceFile = publicFilePath(pathname);
  let sourceWidth = 1200;
  try {
    sourceWidth = (await sharp(sourceFile).metadata()).width ?? sourceWidth;
  } catch {
    return { sourceWidth };
  }

  const responsiveCandidates = [360, 720]
    .map((width) => ({
      width,
      url: pathname
        .replace('/covers/stories/', '/covers/home/')
        .replace(/\.[^.]+$/, `-${width}.webp`),
    }))
    .filter(({ url }) => existsSync(publicFilePath(url)));

  if (!responsiveCandidates.length) return { sourceWidth };

  const candidates = [
    ...responsiveCandidates.filter(({ width }) => width < sourceWidth),
    { width: sourceWidth, url: image },
  ].filter((candidate, index, list) => (
    list.findIndex(({ width }) => width === candidate.width) === index
  ));

  return {
    sourceWidth,
    srcset: candidates.map(({ url, width }) => `${url} ${width}w`).join(', '),
  };
}

export function responsiveCoverFor(image: string) {
  const cached = coverCache.get(image);
  if (cached) return cached;

  const result = inspectCover(image);
  coverCache.set(image, result);
  return result;
}
