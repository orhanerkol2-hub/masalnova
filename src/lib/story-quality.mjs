/**
 * Internal, format-aware publishing thresholds. A sourced preschool retelling,
 * a deliberately short tale and a regular story should not be padded to the
 * same arbitrary length. These are MasalNova controls, not Google rules.
 */
export const STORY_MINIMUM_WORDS = Object.freeze({
  sourcedRetelling: 80,
  shortStory: 150,
  bedtimeStory: 250,
  educationalStory: 320,
  animalStory: 300,
  keloglanStory: 400,
  regularStory: 250,
});

export const MIN_INDEXABLE_STORY_WORDS = STORY_MINIMUM_WORDS.regularStory;

export function markdownBodyFromSource(source) {
  const match = String(source ?? '').match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return match?.[1] ?? '';
}

export function storyWordCount(body) {
  return String(body ?? '').trim().split(/\s+/).filter(Boolean).length;
}

export function storyQualityContextFromSource(source) {
  const value = (key) => String(source ?? '')
    .match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1]
    ?.replace(/["']$/, '') ?? '';
  let categories = [];
  try {
    categories = JSON.parse(value('categories').replace(/'/g, '"'));
  } catch {
    categories = [];
  }
  return {
    section: value('section') || 'masallar',
    categories,
    sourceCitation: value('sourceCitation'),
    sourceUrl: value('sourceUrl'),
  };
}

export function minimumStoryWordCount(context = {}) {
  const categories = Array.isArray(context.categories) ? context.categories : [];
  const isSourcedRetelling = context.section === 'islami-hikayeler'
    && Boolean(context.sourceCitation)
    && Boolean(context.sourceUrl);
  if (isSourcedRetelling) return STORY_MINIMUM_WORDS.sourcedRetelling;
  const primaryCategory = categories[0];
  if (primaryCategory === 'kisa') return STORY_MINIMUM_WORDS.shortStory;
  if (primaryCategory === 'uyku') return STORY_MINIMUM_WORDS.bedtimeStory;
  if (primaryCategory === 'egitici') return STORY_MINIMUM_WORDS.educationalStory;
  if (primaryCategory === 'hayvan') return STORY_MINIMUM_WORDS.animalStory;
  if (primaryCategory === 'keloglan') return STORY_MINIMUM_WORDS.keloglanStory;
  return STORY_MINIMUM_WORDS.regularStory;
}

export function isStoryContentSubstantial(body, context = {}) {
  return storyWordCount(body) >= minimumStoryWordCount(context);
}
