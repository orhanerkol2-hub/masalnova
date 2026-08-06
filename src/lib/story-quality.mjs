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
export const STORY_AD_MINIMUM_WORDS = 320;
export const STORY_AD_MINIMUM_READING_MINUTES = 3;
export const STORY_AD_EXCLUDED_CATEGORIES = Object.freeze(['kisa', 'uyku']);
export const STORY_QUALITY_TIERS = Object.freeze(['core', 'review', 'retire']);
export const MIN_INDIVIDUAL_PARENT_GUIDE_WORDS = 180;

const GENERIC_DISCUSSION_QUESTIONS = Object.freeze([
  'kahramanın yerinde olsaydın',
  'kahramanin yerinde olsaydin',
  'en çok hangi bölümünü sevdin',
  'en cok hangi bolumunu sevdin',
  'neden önemliydi',
  'neden onemliydi',
]);

function normalizedText(value) {
  return String(value ?? '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
}

export function isSourcedRetelling(context = {}) {
  return context.section === 'islami-hikayeler'
    && Boolean(context.sourceCitation)
    && Boolean(context.sourceUrl);
}

export function parentGuideWordCount(context = {}) {
  return [
    context.parentAgeGuidance,
    context.parentEmotionalNotes,
    context.parentMessage,
    context.parentEverydayUse,
    context.activity,
    ...(Array.isArray(context.discussionQuestions) ? context.discussionQuestions : []),
  ].reduce((total, value) => total + storyWordCount(value), 0);
}

/**
 * A monetised story needs page-specific parent value. Two questions must avoid
 * the site's old generic templates. This is an internal release control, not a
 * Google word-count requirement.
 */
export function hasParentGuideContent(context = {}) {
  const questions = Array.isArray(context.discussionQuestions)
    ? context.discussionQuestions.filter((question) => String(question).trim())
    : [];
  const specificQuestions = questions.filter((question) => {
    const normalized = normalizedText(question);
    return !GENERIC_DISCUSSION_QUESTIONS.some((generic) => normalized.includes(generic));
  });
  return Boolean(
    String(context.parentAgeGuidance ?? '').trim()
    && String(context.parentEmotionalNotes ?? '').trim()
    && String(context.parentMessage ?? '').trim()
    && String(context.parentEverydayUse ?? '').trim()
    && String(context.activity ?? '').trim()
    && questions.length === 3
    && specificQuestions.length >= 2
    && parentGuideWordCount(context) >= MIN_INDIVIDUAL_PARENT_GUIDE_WORDS
  );
}

export function hasIndividualParentGuide(context = {}) {
  return hasParentGuideContent(context)
    && Boolean(String(context.qualityReviewedAt ?? '').trim());
}

/**
 * Interim site-wide quality gate. Explicit review/retire decisions always
 * remove a story from discovery. Explicit core decisions restore discovery
 * after the ordinary editorial and format checks. Until every URL is manually
 * classified, only substantial 3+ minute regular stories and sourced
 * retellings remain indexable; short and bedtime inventory is held back.
 */
export function isStoryIndexingEligible({
  status,
  substantial = false,
  qualityCoreReleased = false,
  qualityTier,
  qualityReviewedAt,
  section = 'masallar',
  categories = [],
  words = 0,
  readingTime = 0,
  sourceCitation,
  sourceUrl,
} = {}) {
  if (status !== 'approved' || !substantial) return false;
  if (qualityTier === 'review' || qualityTier === 'retire') return false;
  if (isSourcedRetelling({ section, sourceCitation, sourceUrl })) return true;
  const isReviewedCore = qualityTier === 'core'
    && Boolean(String(qualityReviewedAt ?? '').trim());
  if (qualityCoreReleased) return isReviewedCore;
  if (qualityTier === 'core') return isReviewedCore;
  return Number(words) >= STORY_AD_MINIMUM_WORDS
    && Number(readingTime) >= STORY_AD_MINIMUM_READING_MINUTES
    && !categories.some((category) => STORY_AD_EXCLUDED_CATEGORIES.includes(category));
}

/**
 * Keep initial story monetisation away from short, bedtime and sensitive
 * reading surfaces. This is an internal rollout rule, not a Google threshold.
 */
export function isStoryMonetizationEligible({
  status,
  substantial = false,
  indexable = false,
  qualityTier,
  section = 'masallar',
  categories = [],
  words = 0,
  readingTime = 0,
  ...guideContext
} = {}) {
  return status === 'approved'
    && substantial
    && indexable
    && qualityTier === 'core'
    && hasIndividualParentGuide(guideContext)
    && section !== 'islami-hikayeler'
    && Number(words) >= STORY_AD_MINIMUM_WORDS
    && Number(readingTime) >= STORY_AD_MINIMUM_READING_MINUTES
    && !categories.some((category) => STORY_AD_EXCLUDED_CATEGORIES.includes(category));
}

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
    qualityTier: value('qualityTier'),
    qualityReviewedAt: value('qualityReviewedAt'),
    sourceCitation: value('sourceCitation'),
    sourceUrl: value('sourceUrl'),
    readingTime: Number(value('readingTime') || 0),
  };
}

export function minimumStoryWordCount(context = {}) {
  const categories = Array.isArray(context.categories) ? context.categories : [];
  if (isSourcedRetelling(context)) return STORY_MINIMUM_WORDS.sourcedRetelling;
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
