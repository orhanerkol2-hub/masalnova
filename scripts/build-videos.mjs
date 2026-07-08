// Holt den YouTube-RSS-Feed und schreibt eine statische videos.json.
// Läuft in GitHub Actions (server-seitig, kein CORS-Proxy nötig).
import { writeFile } from 'node:fs/promises';

const CHANNEL_ID = 'UCNPq9m9ctBeaGXZeSUVRiLA';
const MAX = 6;
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

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

await writeFile('videos.json', JSON.stringify(videos, null, 2) + '\n');
console.log('videos.json geschrieben:', videos.length, 'Videos');
