export interface StoryMetadata {
  id: string;
  href: string;
  section: 'masallar' | 'islami-hikayeler';
  title: string;
  shortDescription: string;
  coverEmoji: string;
  coverColor: string;
  coverImage?: string;
  altText: string;
  ageGroups: string[];
  ageLabel: string;
  readingTime: number;
  duration: string;
  categories: string[];
  themes: string[];
  characters: string[];
  seoKeywords: string[];
  publishedAt: string;
  categoryLabel: string;
  hasAudio: boolean;
}

let storyIndexPromise: Promise<StoryMetadata[]> | undefined;

export function loadStoryIndex(): Promise<StoryMetadata[]> {
  storyIndexPromise ??= fetch('/story-index.json?v=3', {
    headers: { Accept: 'application/json' },
  }).then(async (response) => {
    if (!response.ok) throw new Error(`Story index could not be loaded (${response.status})`);
    return response.json() as Promise<StoryMetadata[]>;
  });

  return storyIndexPromise;
}

/** Forgiving Turkish search that also matches unaccented keyboard input. */
export function normalizeStorySearch(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll('ı', 'i')
    .replace(/['’`´]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function storySearchText(story: StoryMetadata): string {
  return normalizeStorySearch([
    story.title,
    story.shortDescription,
    (story.categories ?? []).join(' '),
    story.categoryLabel,
    (story.ageGroups ?? []).join(' '),
    (story.themes ?? []).join(' '),
    (story.characters ?? []).join(' '),
    (story.seoKeywords ?? []).join(' '),
  ].join(' '));
}

type SearchField = {
  value: string;
  weight: number;
};

const SEARCH_STOP_WORDS = new Set([
  'bir',
  'bu',
  'icin',
  'ile',
  'masal',
  'masali',
  've',
]);

function queryTokens(value: string): string[] {
  const all = normalizeStorySearch(value).split(' ').filter(Boolean);
  const meaningful = all.filter((token) => !SEARCH_STOP_WORDS.has(token));
  return meaningful.length ? meaningful : all;
}

function editDistance(a: string, b: string, limit: number): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let row = 1; row <= a.length; row += 1) {
    const current = [row];
    let rowMinimum = current[0];

    for (let column = 1; column <= b.length; column += 1) {
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + cost,
      );
      rowMinimum = Math.min(rowMinimum, current[column]);
    }

    if (rowMinimum > limit) return limit + 1;
    previous = current;
  }

  return previous[b.length];
}

function tokenSimilarity(queryToken: string, candidateToken: string): number {
  if (queryToken === candidateToken) return 1;

  const shorterLength = Math.min(queryToken.length, candidateToken.length);
  if (shorterLength >= 3 && (
    candidateToken.startsWith(queryToken)
    || queryToken.startsWith(candidateToken)
  )) {
    return 0.82;
  }

  // Four-letter words such as "kedi" are too short for safe edit-distance
  // matching ("yedi", "kendi" and "keçi" would otherwise become false hits).
  const limit = queryToken.length >= 7 ? 2 : queryToken.length >= 5 ? 1 : 0;
  if (!limit) return 0;

  const distance = editDistance(queryToken, candidateToken, limit);
  if (distance > limit) return 0;
  return distance === 1 ? 0.72 : 0.58;
}

/**
 * Scores a query against weighted fields. Every meaningful query word must
 * match so multi-word searches stay precise while tolerating small typos.
 */
export function scoreSearchFields(fields: SearchField[], query: string): number {
  const normalizedQuery = normalizeStorySearch(query);
  const tokens = queryTokens(query);
  if (!normalizedQuery || !tokens.length) return 0;

  const prepared = fields
    .map((field) => ({
      normalized: normalizeStorySearch(field.value),
      weight: field.weight,
    }))
    .filter((field) => field.normalized);

  let score = 0;

  for (const token of tokens) {
    let bestTokenScore = 0;

    for (const field of prepared) {
      const words = field.normalized.split(' ');
      let bestSimilarity = 0;

      for (const word of words) {
        bestSimilarity = Math.max(bestSimilarity, tokenSimilarity(token, word));
        if (bestSimilarity === 1) break;
      }

      bestTokenScore = Math.max(bestTokenScore, bestSimilarity * field.weight * 100);
    }

    if (bestTokenScore === 0) return 0;
    score += bestTokenScore;
  }

  for (const field of prepared) {
    if (field.normalized === normalizedQuery) score += field.weight * 240;
    else if (field.normalized.startsWith(normalizedQuery)) score += field.weight * 140;
    else if (field.normalized.includes(normalizedQuery)) score += field.weight * 90;
  }

  return Math.round(score);
}

export function scoreStorySearch(story: StoryMetadata, query: string): number {
  const ageSearchTerms = (story.ageGroups ?? []).flatMap((group) => {
    const [minimum, maximum = minimum] = group.split('-').map(Number);
    if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return [group];
    return Array.from(
      { length: Math.max(0, maximum - minimum + 1) },
      (_, index) => `${minimum + index} yaş`,
    );
  });

  return scoreSearchFields([
    { value: story.title, weight: 8 },
    { value: (story.characters ?? []).join(' '), weight: 5 },
    { value: (story.themes ?? []).join(' '), weight: 4 },
    { value: (story.seoKeywords ?? []).join(' '), weight: 3.5 },
    { value: story.categoryLabel, weight: 3 },
    { value: (story.categories ?? []).join(' '), weight: 3 },
    { value: `${story.ageLabel} ${ageSearchTerms.join(' ')}`, weight: 2.5 },
    { value: `${story.readingTime} dakika ${story.readingTime} dk ${story.duration}`, weight: 2.5 },
    { value: story.shortDescription, weight: 2 },
  ], query);
}

export function searchStories(stories: StoryMetadata[], query: string): StoryMetadata[] {
  return stories
    .map((story) => ({ story, score: scoreStorySearch(story, query) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => (
      b.score - a.score
      || (b.story.publishedAt ?? '').localeCompare(a.story.publishedAt ?? '')
      || a.story.title.localeCompare(b.story.title, 'tr-TR')
    ))
    .map((result) => result.story);
}

export interface StoryDiscoveryFilters {
  age?: string | null;
  duration?: string | null;
  topic?: string | null;
}

function ageRangeIncludes(group: string, requestedAge: number): boolean {
  const [minimum, maximum = minimum] = group.split('-').map(Number);
  return Number.isFinite(minimum)
    && Number.isFinite(maximum)
    && requestedAge >= minimum
    && requestedAge <= maximum;
}

function ageRangesOverlap(left: string, right: string): boolean {
  const [leftMinimum, leftMaximum = leftMinimum] = left.split('-').map(Number);
  const [rightMinimum, rightMaximum = rightMinimum] = right.split('-').map(Number);
  return Number.isFinite(leftMinimum)
    && Number.isFinite(leftMaximum)
    && Number.isFinite(rightMinimum)
    && Number.isFinite(rightMaximum)
    && leftMinimum <= rightMaximum
    && rightMinimum <= leftMaximum;
}

export function storyMatchesAge(story: StoryMetadata, value?: string | null): boolean {
  if (!value) return true;

  const requestedAge = Number(value);
  if (Number.isInteger(requestedAge)) {
    return (story.ageGroups ?? []).some((group) => ageRangeIncludes(group, requestedAge));
  }

  return (story.ageGroups ?? []).some((group) => ageRangesOverlap(group, value));
}

export function storyMatchesDuration(story: StoryMetadata, value?: string | null): boolean {
  if (!value) return true;
  if (value === 'kisa') return story.readingTime <= 2;
  if (value === 'orta') return story.readingTime <= 5;
  if (value === 'uzun') return story.readingTime <= 10;
  if (value === 'cok_uzun') return story.readingTime > 10;
  return story.duration === value;
}

export function storyMood(story: StoryMetadata): 'sakin' | 'neseli' | 'macera' {
  const signals = normalizeStorySearch([
    ...(story.categories ?? []),
    ...(story.themes ?? []),
  ].join(' '));

  if (/(^| )(uyku|sakin|huzur|sabir|sefkat)( |$)/.test(signals)) return 'sakin';
  if (/(^| )(macera|cesaret|kesif|kahraman)( |$)/.test(signals)) return 'macera';
  return 'neseli';
}

export function storyMatchesTopic(story: StoryMetadata, value?: string | null): boolean {
  if (!value) return true;
  if (value === 'sakin' || value === 'neseli' || value === 'macera') {
    return storyMood(story) === value;
  }

  const separator = value.indexOf('_');
  if (separator < 1) return false;
  const kind = value.slice(0, separator);
  const key = value.slice(separator + 1);

  if (kind === 'mood') {
    return storyMood(story) === key;
  }

  if (kind === 'category') {
    return (story.categories ?? []).some((category) => normalizeStorySearch(category) === key);
  }

  if (kind === 'theme') {
    return (story.themes ?? []).some((theme) => {
      const normalizedTheme = normalizeStorySearch(theme);
      return normalizedTheme === key || normalizedTheme.split(' ').includes(key);
    });
  }

  return false;
}

export function filterStories(
  stories: StoryMetadata[],
  filters: StoryDiscoveryFilters = {},
): StoryMetadata[] {
  return stories.filter((story) => (
    storyMatchesAge(story, filters.age)
    && storyMatchesDuration(story, filters.duration)
    && storyMatchesTopic(story, filters.topic)
  ));
}

function preferenceScore(story: StoryMetadata, filters: StoryDiscoveryFilters): number {
  let score = 0;
  if (filters.age && storyMatchesAge(story, filters.age)) score += 6;
  if (filters.duration && storyMatchesDuration(story, filters.duration)) score += 3;
  if (filters.topic && storyMatchesTopic(story, filters.topic)) score += 2;
  return score;
}

function bestPreferenceMatch(
  stories: StoryMetadata[],
  filters: StoryDiscoveryFilters,
): StoryMetadata | undefined {
  return stories
    .map((story, index) => ({ story, index, score: preferenceScore(story, filters) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.story;
}

/**
 * Returns one deterministic recommendation when strict query + filters have
 * no result. Age is preserved whenever the catalogue contains an age match.
 */
export function findStoryAlternative(
  stories: StoryMetadata[],
  query: string,
  filters: StoryDiscoveryFilters = {},
): StoryMetadata | undefined {
  if (!stories.length) return undefined;

  const queryMatches = normalizeStorySearch(query) ? searchStories(stories, query) : stories;
  const queryAndAgeMatches = filters.age
    ? queryMatches.filter((story) => storyMatchesAge(story, filters.age))
    : queryMatches;
  const strictPreferenceMatches = filterStories(stories, filters);
  const ageMatches = filters.age
    ? stories.filter((story) => storyMatchesAge(story, filters.age))
    : stories;

  for (const candidates of [
    queryAndAgeMatches,
    strictPreferenceMatches,
    ageMatches,
    queryMatches,
    stories,
  ]) {
    const match = bestPreferenceMatch(candidates, filters);
    if (match) return match;
  }

  return stories[0];
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/** Build a safe, compact story card from trusted metadata (no HTML injection). */
export function createStoryResultCard(story: StoryMetadata): HTMLAnchorElement {
  const isIslamic = story.section === 'islami-hikayeler';
  const card = element('a', 'story-result-card');
  card.href = story.href;
  card.style.setProperty('--card-accent', story.coverColor);

  const media = element('span', 'story-result-media');
  if (story.coverImage) {
    const image = element('img');
    image.src = story.coverImage;
    image.alt = story.altText;
    image.width = 1200;
    image.height = 900;
    image.loading = 'lazy';
    image.decoding = 'async';
    media.append(image);
  } else {
    const placeholder = element('span', 'story-result-placeholder', story.coverEmoji || '📖');
    placeholder.setAttribute('aria-hidden', 'true');
    media.append(placeholder);
  }

  media.append(element('span', 'story-result-badge', story.categoryLabel));
  if (story.hasAudio) media.append(element('span', 'story-result-audio', 'Sesli'));

  const body = element('span', 'story-result-body');
  body.append(element('span', 'story-result-eyebrow', isIslamic ? 'Kaynaklı İslami hikâye' : 'MasalNova seçkisi'));
  body.append(element('span', 'story-result-title', story.title));

  const meta = element('span', 'story-result-meta');
  meta.append(element('span', undefined, `${story.readingTime} dk okuma`));
  if (story.ageLabel) meta.append(element('span', undefined, story.ageLabel));
  if (story.hasAudio) meta.append(element('span', undefined, 'Sesli masal'));
  body.append(meta);
  body.append(element('span', 'story-result-description', story.shortDescription));
  body.append(element('span', 'story-result-link', isIslamic ? 'Hikâyeyi oku' : 'Masalı oku'));

  card.append(media, body);
  return card;
}
