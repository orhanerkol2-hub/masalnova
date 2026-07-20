const DEFAULT_TITLE_LIMIT = 68;
const DEFAULT_DESCRIPTION_LIMIT = 155;

function truncateAtWord(value: string, limit: number): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const clipped = clean.slice(0, limit + 1);
  const lastSpace = clipped.lastIndexOf(' ');
  const safe = lastSpace > Math.floor(limit * 0.65) ? clipped.slice(0, lastSpace) : clean.slice(0, limit);
  return safe.replace(/[\s,;:–—-]+$/u, '').trim();
}

export function compactDescription(value: string, limit = DEFAULT_DESCRIPTION_LIMIT): string {
  const compact = truncateAtWord(value, limit - 1);
  return compact.length < value.replace(/\s+/g, ' ').trim().length ? `${compact}…` : compact;
}

export function storySeoTitle(title: string): string {
  const suffix = ' | MasalNova';
  const hasStoryIntent = /\b(masal|masalı|masali|hikâye|hikaye)\b/iu.test(title);
  const candidate = `${title}${hasStoryIntent ? ' Oku' : ' Masalı Oku'}${suffix}`;
  if (candidate.length <= DEFAULT_TITLE_LIMIT) return candidate;
  return `${truncateAtWord(title, DEFAULT_TITLE_LIMIT - suffix.length)}${suffix}`;
}

export function videoSeoTitle(title: string): string {
  const cleanTitle = title
    .replace(/[|｜].*$/u, '')
    .replace(/\s+/g, ' ')
    .trim();
  const suffix = ' | MasalNova Video';
  return `${truncateAtWord(cleanTitle, DEFAULT_TITLE_LIMIT - suffix.length)}${suffix}`;
}

export function formatTurkishDate(value: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

export function durationToIso(value?: string): string | undefined {
  if (!value) return undefined;
  const parts = value.split(':').map((part) => Number(part));
  if (parts.some((part) => !Number.isFinite(part) || part < 0)) return undefined;
  if (parts.length === 2) return `PT${parts[0]}M${parts[1]}S`;
  if (parts.length === 3) return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  return undefined;
}
