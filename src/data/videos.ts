// Single source of truth for videos = the EXISTING public/videos.json
// (auto-updated from the YouTube feed). We only enrich metadata here;
// YouTube IDs are never changed. Story & video data stay separate.
import raw from '../../public/videos.json';
import { slugify } from '../lib/slug';

export type Video = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  youtubeVideoId: string;
  thumbnailUrl: string;
  categories: string[];
  ageGroups?: string[];
  duration?: string;
  relatedStoryIds?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  publishedAt?: string;
};

type RawVideo = { id: string; title: string; published?: string };

// Optional manual metadata per YouTube id (duration/category/related story).
// Fill in as you like — anything omitted is inferred from the title.
const overrides: Record<string, Partial<Video>> = {
  Ugd4Pfgln30: { categories: ['sarkilar', 'keloglan'], relatedStoryIds: ['keloglan-degirmen'] },
  Yrt45W_743A: { categories: ['sarkilar', 'keloglan'], relatedStoryIds: ['keloglan-tohum'] },
  maMMAF1oWPg: { categories: ['sarkilar', 'keloglan'] },
  _BCOsqAVfIU: { categories: ['sarkilar', 'keloglan', 'masal'], relatedStoryIds: ['keloglan-dev'] },
  otPg1Pe39VM: { categories: ['sarkilar', 'masal'], relatedStoryIds: ['alice'] },
  s7l67b0kNiU: { categories: ['sarkilar', 'egitici'] },
};

function categorize(title: string): string[] {
  const t = (title || '').toLocaleLowerCase('tr');
  const cats = new Set<string>();
  if (/(şarkı|sarki|müzik|muzik|ninni|klip|ilahi)/.test(t)) cats.add('sarkilar');
  if (/(masal|hikaye|hikâye)/.test(t)) cats.add('masal');
  if (/(keloğlan|keloglan)/.test(t)) cats.add('keloglan');
  if (/(hayvan|tavşan|tavsan|aslan|ayı|ayi|kedi|köpek|kopek|kuş|kus|eşek|esek|dev)/.test(t)) cats.add('hayvan');
  if (/(öğretici|ogretici|eğitici|egitici|sayı|sayilar|renk|alfabe|harf|bismillah)/.test(t)) cats.add('egitici');
  if (cats.size === 0) cats.add('sarkilar');
  return [...cats];
}

const used = new Set<string>();
function uniqueSlug(title: string, id: string): string {
  let s = slugify(title) || id.toLowerCase();
  if (used.has(s)) s = `${s}-${id.slice(0, 4).toLowerCase()}`;
  used.add(s);
  return s;
}

export const videos: Video[] = (raw as RawVideo[]).map((v, i) => {
  const base: Video = {
    id: v.id,
    slug: uniqueSlug(v.title, v.id),
    title: v.title,
    youtubeVideoId: v.id,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    categories: categorize(v.title),
    publishedAt: v.published,
    isNew: i < 4,
    isFeatured: i < 6,
    isPopular: i < 6,
  };
  const ov = overrides[v.id];
  return ov ? { ...base, ...ov, categories: ov.categories ?? base.categories } : base;
});

export function videoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}
export function videoById(id: string): Video | undefined {
  return videos.find((v) => v.youtubeVideoId === id);
}
export function videosByCategory(key?: string | null): Video[] {
  if (!key) return videos;
  return videos.filter((v) => v.categories.includes(key));
}
export function featuredVideos(n = 6): Video[] {
  return videos.slice(0, n);
}
export function newestVideos(n = 4): Video[] {
  return [...videos]
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
    .slice(0, n);
}
