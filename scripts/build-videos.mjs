// Fetches the YouTube RSS feed and writes public/videos.json.
// Runs server-side (GitHub Actions), so no CORS proxy is needed.
// After this runs, the Astro site must be rebuilt for changes to appear.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const CHANNEL_ID = 'UCNPq9m9ctBeaGXZeSUVRiLA';
const FEED_MAX = 15;
const CATALOG_MAX = 100;
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUT = fileURLToPath(new URL('../public/videos.json', import.meta.url));
const THUMB_DIR = fileURLToPath(new URL('../public/covers/videos/', import.meta.url));

let previousVideos = [];
try {
  previousVideos = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
  previousVideos = [];
}
const previousById = new Map(previousVideos.map((video) => [video.id, video]));

function slugify(input) {
  const map = { ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u', â: 'a', î: 'i', û: 'u' };
  return (input || '')
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (character) => map[character] || character)
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

function decode(s) {
  return (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

const res = await fetch(FEED, { headers: { 'user-agent': 'Mozilla/5.0 (MasalNova build bot)' } });
if (!res.ok) throw new Error('Feed HTTP ' + res.status);
const xml = await res.text();

const feedVideos = [];
for (const chunk of xml.split('<entry>').slice(1)) {
  const id = (chunk.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
  const title = decode((chunk.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const published = (chunk.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
  if (!id) continue;
  const previous = previousById.get(id);
  feedVideos.push({ id, title, published, slug: previous?.slug || slugify(title) || id.toLowerCase() });
  if (feedVideos.length >= FEED_MAX) break;
}

if (!feedVideos.length) throw new Error('Keine Video-Einträge im Feed gefunden');

const feedIds = new Set(feedVideos.map((video) => video.id));
const videos = [
  ...feedVideos,
  ...previousVideos.filter((video) => !feedIds.has(video.id)),
].slice(0, CATALOG_MAX);

await writeFile(OUT, JSON.stringify(videos, null, 2) + '\n');
await mkdir(THUMB_DIR, { recursive: true });
await Promise.all(videos.map(async ({ id }) => {
  const thumb = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
  if (!thumb.ok) throw new Error(`Thumbnail ${id}: HTTP ${thumb.status}`);
  await writeFile(`${THUMB_DIR}${id}.jpg`, Buffer.from(await thumb.arrayBuffer()));
}));
console.log('public/videos.json geschrieben:', videos.length, 'Videos');
