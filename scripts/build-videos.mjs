// Fetches the YouTube RSS feed and writes public/videos.json.
// Runs server-side (GitHub Actions), so no CORS proxy is needed.
// After this runs, the Astro site must be rebuilt for changes to appear.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const CHANNEL_ID = 'UCNPq9m9ctBeaGXZeSUVRiLA';
const MAX = 12;
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUT = fileURLToPath(new URL('../public/videos.json', import.meta.url));

function decode(s) {
  return (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

const res = await fetch(FEED, { headers: { 'user-agent': 'Mozilla/5.0 (MasalNova build bot)' } });
if (!res.ok) throw new Error('Feed HTTP ' + res.status);
const xml = await res.text();

const videos = [];
for (const chunk of xml.split('<entry>').slice(1)) {
  const id = (chunk.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
  const title = decode((chunk.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const published = (chunk.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
  if (!id) continue;
  videos.push({ id, title, published });
  if (videos.length >= MAX) break;
}

if (!videos.length) throw new Error('Keine Video-Einträge im Feed gefunden');

await writeFile(OUT, JSON.stringify(videos, null, 2) + '\n');
console.log('public/videos.json geschrieben:', videos.length, 'Videos');
