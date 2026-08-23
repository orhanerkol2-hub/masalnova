const DEFAULT_TITLE_LIMIT = 68;
const DEFAULT_DESCRIPTION_LIMIT = 155;
const STORY_TITLE_LIMIT = 60;
const SITE_TITLE_SUFFIX = ' | MasalNova';

interface StorySeoTitleOptions {
  ageRange?: string;
  islamic?: boolean;
}

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

function truncateTitleAtTokenBoundary(value: string, limit: number): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;

  let result = '';
  for (const token of clean.split(' ')) {
    const candidate = result ? `${result} ${token}` : token;
    if (candidate.length > limit) break;
    result = candidate;
  }

  // If truncation lands inside a parenthetical, drop the whole incomplete
  // group instead of exposing a title such as "(5-7 | MasalNova".
  const openingParentheses: number[] = [];
  for (let index = 0; index < result.length; index += 1) {
    if (result[index] === '(') openingParentheses.push(index);
    if (result[index] === ')') openingParentheses.pop();
  }
  if (openingParentheses.length) result = result.slice(0, openingParentheses[0]);

  return result.replace(/[\s,;:–—-]+$/u, '').trim() || clean;
}

export function storySeoTitle(title: string, options: StorySeoTitleOptions = {}): string {
  const cleanTitle = title.replace(/\s+/g, ' ').trim();
  const cleanAgeRange = options.ageRange
    ?.replace(/^\((.*)\)$/u, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/(?<!\p{L})yaş(?!\p{L})/giu, 'Yaş');
  const ageToken = cleanAgeRange ? ` (${cleanAgeRange})` : '';
  const hasStoryIntent = /(?<![\p{L}\p{N}])(?:masal(?:ı|i)?|hikâye|hikaye)(?![\p{L}\p{N}])/iu.test(cleanTitle);
  const intentTitle = options.islamic
    ? `${cleanTitle} – İslami Hikâye`
    : hasStoryIntent ? cleanTitle : `${cleanTitle} Masalı`;
  const candidates = options.islamic
    ? [`${intentTitle}${SITE_TITLE_SUFFIX}`, `${cleanTitle}${SITE_TITLE_SUFFIX}`]
    : [
        `${intentTitle}${ageToken}${SITE_TITLE_SUFFIX}`,
        `${intentTitle}${SITE_TITLE_SUFFIX}`,
        `${cleanTitle}${ageToken}${SITE_TITLE_SUFFIX}`,
        `${cleanTitle}${SITE_TITLE_SUFFIX}`,
      ];

  const completeCandidate = candidates.find((candidate) => candidate.length <= STORY_TITLE_LIMIT);
  if (completeCandidate) return completeCandidate;

  const compactTitle = truncateTitleAtTokenBoundary(
    cleanTitle,
    STORY_TITLE_LIMIT - SITE_TITLE_SUFFIX.length,
  );
  return `${compactTitle}${SITE_TITLE_SUFFIX}`;
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
