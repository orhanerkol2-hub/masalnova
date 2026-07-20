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

type RawVideo = { id: string; title: string; published?: string; slug?: string };

// Optional manual metadata per YouTube id (duration/category/related story).
// Fill in as you like — anything omitted is inferred from the title.
const overrides: Record<string, Partial<Video>> = {
  zDgIJ31YASk: {
    categories: ['sarkilar', 'masal'],
    shortDescription: 'Alice kaybolan gölgesinin peşinden renkli bir maceraya çıkıyor. Çocuklar için neşeli müzik, hikâye ve animasyonu birleştiren Türkçe MasalNova videosu.',
  },
  Ugd4Pfgln30: {
    categories: ['sarkilar', 'keloglan'],
    relatedStoryIds: ['keloglan-degirmen'],
    shortDescription: 'Aykız’ın uyanışıyla başlayan Keloğlan temalı neşeli çocuk şarkısı. Renkli animasyon ve kolay eşlik edilen Türkçe sözlerle birlikte izleyin.',
  },
  Yrt45W_743A: {
    categories: ['sarkilar', 'keloglan'],
    relatedStoryIds: ['keloglan-tohum'],
    shortDescription: 'Keloğlan’ın iyimserliğini ve vazgeçmeyen ruhunu anlatan hareketli çocuk şarkısı. 3D animasyonlu Türkçe müzik klibi MasalNova’da.',
  },
  maMMAF1oWPg: {
    categories: ['sarkilar', 'keloglan'],
    shortDescription: 'Keloğlan’ın yaylalardaki neşeli yolculuğuna eşlik eden ritmik Türkçe çocuk şarkısı. Doğa, müzik ve animasyonla dolu eğlenceli bir video.',
  },
  _BCOsqAVfIU: {
    categories: ['sarkilar', 'keloglan', 'masal'],
    relatedStoryIds: ['keloglan-dev'],
    shortDescription: 'Keloğlan ile herkesin korktuğu ama aslında dost arayan sevimli devin hikâyesini şarkı ve animasyonla izleyin. Cesaret ve önyargı üzerine sıcak bir video.',
  },
  otPg1Pe39VM: {
    categories: ['sarkilar', 'masal'],
    relatedStoryIds: ['alice'],
    shortDescription: 'Alice’in harikalarla dolu dünyasını neşeli bir masal şarkısı ve renkli animasyonla keşfedin. Merak duygusunu canlandıran Türkçe çocuk videosu.',
  },
  s7l67b0kNiU: {
    categories: ['sarkilar', 'egitici'],
    shortDescription: 'Yusuf ve sevimli ayının korku karşısında güven bulduğu, Bismillah sözünü çocuklara müzikle anlatan sakin ve eğitici Türkçe ilahi.',
  },
  PrYelmKYf_I: {
    categories: ['sarkilar', 'hayvan'],
    shortDescription: 'Sevimli eşek karakteriyle arkadaşlık ve birlikte eğlenme temasını işleyen animasyonlu Türkçe çocuk şarkısı. Ailece izlenebilecek neşeli bir klip.',
  },
  h1eKIahPNvI: {
    categories: ['sarkilar', 'keloglan'],
    shortDescription: 'Keloğlan’la yaylada hoplayıp dans etmeye çağıran enerjik çizgi film müzik videosu. Hareketli ritmiyle çocukların eşlik edebileceği Türkçe şarkı.',
  },
  '9XbDS-hgkeE': {
    categories: ['sarkilar', 'egitici'],
    shortDescription: 'Uçan halıyla başlayan hayal dolu bir yolculuğu salavat ve çizgi film anlatımıyla birleştiren Türkçe çocuk ilahisi.',
  },
  eq1X_tggww8: {
    categories: ['sarkilar', 'egitici'],
    shortDescription: 'Altın zeplinle Türkiye’yi gezerken kalem ve öğrenme sevgisini anlatan eğlenceli çocuk şarkısı. Renkli animasyonla hazırlanan öğretici bir yolculuk.',
  },
  Ig0y4OR9vzA: {
    categories: ['sarkilar', 'keloglan'],
    shortDescription: 'Keloğlan’ın dış görünüşten daha önemli olan iyi kalbini anlatan sıcak ve neşeli Türkçe çocuk şarkısı. Kabul ve özgüven temasını animasyonla işler.',
  },
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
function uniqueSlug(title: string, id: string, persistedSlug?: string): string {
  let s = persistedSlug || slugify(title) || id.toLowerCase();
  if (used.has(s)) s = `${s}-${id.slice(0, 4).toLowerCase()}`;
  used.add(s);
  return s;
}

export const videos: Video[] = (raw as RawVideo[]).map((v, i) => {
  const base: Video = {
    id: v.id,
    slug: uniqueSlug(v.title, v.id, v.slug),
    title: v.title,
    youtubeVideoId: v.id,
    thumbnailUrl: `/covers/videos/${v.id}.jpg`,
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
