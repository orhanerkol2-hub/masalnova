export interface StoryMetadata {
  id: string;
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
  categoryLabel: string;
  hasAudio: boolean;
}

let storyIndexPromise: Promise<StoryMetadata[]> | undefined;

export function loadStoryIndex(): Promise<StoryMetadata[]> {
  storyIndexPromise ??= fetch('/story-index.json', {
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
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll('ı', 'i');
}

export function storySearchText(story: StoryMetadata): string {
  return normalizeStorySearch([
    story.title,
    story.shortDescription,
    story.categories.join(' '),
    story.categoryLabel,
    story.ageGroups.join(' '),
  ].join(' '));
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
  const card = element('a', 'story-result-card');
  card.href = `/masallar/${encodeURIComponent(story.id)}/`;
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
  body.append(element('span', 'story-result-eyebrow', 'MasalNova seçkisi'));
  body.append(element('span', 'story-result-title', story.title));

  const meta = element('span', 'story-result-meta');
  meta.append(element('span', undefined, `${story.readingTime} dk okuma`));
  if (story.ageLabel) meta.append(element('span', undefined, story.ageLabel));
  if (story.hasAudio) meta.append(element('span', undefined, 'Sesli masal'));
  body.append(meta);
  body.append(element('span', 'story-result-description', story.shortDescription));
  body.append(element('span', 'story-result-link', 'Masalı oku'));

  card.append(media, body);
  return card;
}
