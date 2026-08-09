import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import {
  hasIndividualParentGuide,
  hasParentGuideContent,
  isStoryContentSubstantial,
  isStoryIndexingEligible,
  isStoryMonetizationEligible,
  markdownBodyFromSource,
  MIN_INDIVIDUAL_PARENT_GUIDE_WORDS,
  minimumStoryWordCount,
  parentGuideWordCount,
  storyWordCount,
} from '../src/lib/story-quality.mjs';
import {
  QUALITY_CORE_CANDIDATE_GROUPS,
  QUALITY_CORE_CANDIDATE_IDS,
} from '../src/data/quality-core-candidates.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const storiesDirectory = join(root, 'src', 'content', 'stories');
const guidesDirectory = join(root, 'src', 'content', 'guides');
const approvedAuthors = new Set(['aylin-karabektas', 'muhammet-karayigit']);
const expectedReviewers = ['aylin-karabektas', 'muhammet-karayigit'];
const emotionalIntensityValues = new Set(['sakin', 'yumusak', 'orta', 'yuksek']);
const candidateGroupSize = 20;
const candidateCount = 60;
const parentSectionMinimumWords = Object.freeze({
  parentAgeGuidance: 28,
  parentEmotionalNotes: 28,
  parentMessage: 28,
  parentEverydayUse: 24,
  activity: 24,
});
const anchorStopwords = new Set([
  'acaba', 'ardından', 'aslında', 'bahçesi', 'başka', 'beyaz', 'bunun', 'çocuk',
  'çocuklar', 'daha', 'denizin', 'düşünce', 'günün', 'hikaye', 'hikâye', 'için',
  'ışığı', 'karar', 'kararı', 'keloğlan', 'keloğlanın', 'keloğlan\'ın', 'küçük',
  'masal', 'masalda', 'minik', 'neden', 'nasıl', 'sonra', 'sence', 'sırrı',
  'verdiği', 'yıldız', 'zaman',
]);
const unsupportedPromisePattern = /\b(?:garanti\s+(?:eder|sunar)|tedavi\s+eder|(?:çocuğu|çocuğun|çocukları|çocukların).{0,40}(?:iyileştirir|davranışını\s+düzeltir|korkusunu\s+bitirir))\b/iu;
const playableGameSlugs = [
  'ay-isigi-bahcesi',
  'bulut-firini',
  'dino-buz-cicekleri',
  'horozumu-kacirdilar',
  'keloglan-masal-hafizasi',
  'keloglan-masal-yolu',
  'keloglan-on-kapili-saray',
  'keloglan-ucan-tohumlar',
  'keloglan-yildiz-pesinde',
  'kristal-saray',
  'nasrettin-hoca-pizza',
];
const hardErrors = [];
const warnings = [];
const verifyBuiltOutput = process.argv.includes('--built');
const publisherTagExpected = process.env.PUBLIC_ADSENSE_TAG_ENABLED === 'true'
  && process.env.PUBLIC_GOOGLE_CMP_PUBLISHED === 'true'
  && process.env.PUBLIC_ADSENSE_MANUAL_ONLY === 'true';
const qualityCoreReleased = process.env.PUBLIC_QUALITY_CORE_REVIEWED === 'true';
const adUnitsRequested = process.env.PUBLIC_ADSENSE_ENABLED === 'true';
const adUnitsEnabled = adUnitsRequested && qualityCoreReleased;
const publisherAssertions = [
  process.env.PUBLIC_ADSENSE_TAG_ENABLED === 'true',
  process.env.PUBLIC_GOOGLE_CMP_PUBLISHED === 'true',
  process.env.PUBLIC_ADSENSE_MANUAL_ONLY === 'true',
];
const manualSlotVariables = [
  'PUBLIC_ADSENSE_HOME_FEED_SLOT',
  'PUBLIC_ADSENSE_HOME_CONTENT_SLOT',
  'PUBLIC_ADSENSE_BOYAMA_INDEX_SLOT',
  'PUBLIC_ADSENSE_BOYAMA_DETAIL_SLOT',
  'PUBLIC_ADSENSE_STORY_GUIDE_SLOT',
];
if (publisherAssertions.some(Boolean) && !publisherAssertions.every(Boolean)) {
  hardErrors.push('Unvollständige Publisher-Konfiguration: Tag, veröffentlichte CMP und Manual-only müssen gemeinsam gesetzt sein.');
}
if (adUnitsRequested && !publisherTagExpected) {
  hardErrors.push('Anzeigenfreigabe ist aktiv, obwohl Publisher-Tag, CMP oder Manual-only nicht vollständig bestätigt sind.');
}
if (adUnitsRequested && !qualityCoreReleased) {
  warnings.push('Anzeigenfreigabe wurde angefordert, bleibt aber bis zur bestätigten Qualitätskern-Prüfung technisch gesperrt.');
}
if (adUnitsRequested) {
  const configuredSlotIds = [];
  for (const variable of manualSlotVariables) {
    const slotId = process.env[variable] ?? '';
    configuredSlotIds.push(slotId);
    if (!/^\d{6,20}$/.test(slotId)) {
      hardErrors.push(`${variable}: gültige numerische AdSense-Slot-ID fehlt.`);
    }
  }
  if (new Set(configuredSlotIds).size !== manualSlotVariables.length) {
    hardErrors.push('Die fünf manuellen Anzeigenplätze benötigen fünf unterschiedliche Slot-IDs.');
  }
}
const todayInIstanbul = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Istanbul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

function frontmatterFromSource(source) {
  return source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1] ?? '';
}

function parseFrontmatter(frontmatter, file) {
  try {
    const parsed = yaml.load(frontmatter);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      hardErrors.push(`${file}: Frontmatter ist kein YAML-Objekt.`);
      return {};
    }
    return parsed;
  } catch (error) {
    hardErrors.push(`${file}: Frontmatter ist kein gültiges YAML (${error.message}).`);
    return {};
  }
}

function textValue(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

function arrayValue(value) {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

function hasAdSenseArtifacts(source) {
  return [
    'google-adsense-account',
    'google_tag_for_age_treatment',
    'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    'class="adsbygoogle"',
    'data-ad-client="ca-pub-',
  ].some((signal) => source.includes(signal));
}

function groupBy(items, keyFor) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFor(item);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return groups;
}

function normalizedTurkish(value) {
  return String(value ?? '')
    .toLocaleLowerCase('tr')
    .replace(/[–—]/g, '-')
    .replace(/[’']/g, '')
    .replace(/[^a-zçğıöşü0-9\s-]/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function distinctiveAnchors(story) {
  const properNouns = [...story.body.matchAll(/(?:^|[\s“"—])([A-ZÇĞİÖŞÜ][a-zçğıöşü]{2,})/gu)]
    .map((match) => match[1]);
  const source = [story.title, ...story.characters, ...properNouns].join(' ');
  return normalizedTurkish(source)
    .split(/[\s-]+/)
    .map((token) => token.replace(/(?:nin|nın|nun|nün|in|ın|un|ün|si|sı|su|sü)$/u, ''))
    .filter((token) => token.length >= 4 && !anchorStopwords.has(token));
}

function questionHasStoryAnchor(question, anchors) {
  const normalizedQuestion = normalizedTurkish(question);
  return anchors.some((anchor) => normalizedQuestion.includes(anchor.slice(0, Math.min(anchor.length, 6))));
}

function wordShingles(value, size = 5) {
  const words = normalizedTurkish(value).split(' ').filter(Boolean);
  const shingles = new Set();
  for (let index = 0; index <= words.length - size; index++) {
    shingles.add(words.slice(index, index + size).join(' '));
  }
  return shingles;
}

function jaccardSimilarity(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection++;
  return intersection / (left.size + right.size - intersection);
}

function combinedParentGuide(story) {
  return [
    story.parentAgeGuidance,
    story.parentEmotionalNotes,
    story.parentMessage,
    story.parentEverydayUse,
    ...story.discussionQuestions,
    story.activity,
  ].join(' ');
}

async function textFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await textFiles(path));
    else if (['.astro', '.html', '.js', '.mjs', '.ts', '.tsx', '.md', '.json'].includes(extname(entry.name))) files.push(path);
  }
  return files;
}

const files = (await readdir(storiesDirectory)).filter((name) => name.endsWith('.md')).sort();
const stories = [];
const guides = [];

for (const file of files) {
  const source = await readFile(join(storiesDirectory, file), 'utf8');
  const frontmatter = frontmatterFromSource(source);
  const body = markdownBodyFromSource(source);
  if (!frontmatter || !body.trim()) {
    hardErrors.push(`${file}: Frontmatter oder Geschichte fehlt.`);
    continue;
  }

  const data = parseFrontmatter(frontmatter, file);
  const qualityContext = {
    section: textValue(data.section, 'masallar'),
    categories: arrayValue(data.categories),
    sourceCitation: textValue(data.sourceCitation),
    sourceUrl: textValue(data.sourceUrl),
  };
  const story = {
    file,
    title: textValue(data.title),
    author: textValue(data.author),
    reviewers: arrayValue(data.reviewedBy),
    status: textValue(data.editorialStatus, 'draft'),
    ageGroups: arrayValue(data.ageGroups),
    themes: arrayValue(data.themes),
    characters: arrayValue(data.characters),
    ...qualityContext,
    coverImage: textValue(data.coverImage),
    publishedAt: textValue(data.publishedAt),
    modifiedAt: textValue(data.modifiedAt),
    readingTime: Number(data.readingTime ?? 0),
    qualityTier: textValue(data.qualityTier),
    emotionalIntensity: textValue(data.emotionalIntensity),
    parentAgeGuidance: textValue(data.parentAgeGuidance),
    parentEmotionalNotes: textValue(data.parentEmotionalNotes),
    parentMessage: textValue(data.parentMessage),
    parentEverydayUse: textValue(data.parentEverydayUse),
    discussionQuestions: arrayValue(data.discussionQuestions),
    activity: textValue(data.activity),
    qualityReviewedAt: textValue(data.qualityReviewedAt),
    body,
    words: storyWordCount(body),
    minimumWords: minimumStoryWordCount(qualityContext),
    substantial: isStoryContentSubstantial(body, qualityContext),
  };
  story.indexable = isStoryIndexingEligible({ ...story, qualityCoreReleased });
  story.parentGuideDraft = hasParentGuideContent(story);
  story.individualParentGuide = hasIndividualParentGuide(story);
  story.parentGuideWords = parentGuideWordCount(story);
  stories.push(story);

  if (!story.title) hardErrors.push(`${file}: Titel fehlt.`);
  if (!approvedAuthors.has(story.author)) hardErrors.push(`${file}: Ungültiger oder fehlender Autor.`);
  if (JSON.stringify(story.reviewers) !== JSON.stringify(expectedReviewers)) {
    hardErrors.push(`${file}: Redaktionelle Prüfung muss Aylin Karabektaş und Muhammet Karayiğit enthalten.`);
  }
  if (!['approved', 'needs_review', 'draft'].includes(story.status)) hardErrors.push(`${file}: Ungültiger Redaktionsstatus.`);
  if (story.qualityTier && !['core', 'review', 'retire'].includes(story.qualityTier)) {
    hardErrors.push(`${file}: Ungültige Qualitätsklassifizierung.`);
  }
  if (story.qualityTier === 'core' && !story.individualParentGuide) {
    hardErrors.push(`${file}: Core-Klassifizierung ohne vollständigen, tatsächlich geprüften Elternbereich.`);
  }
  if (story.qualityReviewedAt && !isCalendarDate(story.qualityReviewedAt)) {
    hardErrors.push(`${file}: Qualitätsprüfdatum ist kein echter Kalendertag im Format YYYY-MM-DD.`);
  } else if (story.qualityReviewedAt && story.qualityReviewedAt > todayInIstanbul) {
    hardErrors.push(`${file}: Qualitätsprüfdatum ${story.qualityReviewedAt} liegt in der Zukunft.`);
  }
  if (!isCalendarDate(story.publishedAt)) {
    hardErrors.push(`${file}: Veröffentlichungsdatum fehlt oder ist kein echter Kalendertag im Format YYYY-MM-DD.`);
  } else if (story.publishedAt > todayInIstanbul) {
    hardErrors.push(`${file}: Veröffentlichungsdatum ${story.publishedAt} liegt in der Zukunft.`);
  }
  if (story.modifiedAt && !isCalendarDate(story.modifiedAt)) {
    hardErrors.push(`${file}: Änderungsdatum ist kein echter Kalendertag im Format YYYY-MM-DD.`);
  } else if (story.modifiedAt && story.modifiedAt < story.publishedAt) {
    hardErrors.push(`${file}: Änderungsdatum liegt vor dem Veröffentlichungsdatum.`);
  } else if (story.modifiedAt && story.modifiedAt > todayInIstanbul) {
    hardErrors.push(`${file}: Änderungsdatum ${story.modifiedAt} liegt in der Zukunft.`);
  }
  if (story.section === 'islami-hikayeler' && (!story.sourceCitation || !story.sourceUrl)) {
    hardErrors.push(`${file}: Quellenangabe oder Quellenlink für İslami Hikâye fehlt.`);
  }
  if (!story.coverImage?.startsWith('/')) {
    hardErrors.push(`${file}: Titelbild fehlt.`);
  } else {
    try {
      await access(join(root, 'public', story.coverImage.slice(1)));
    } catch {
      hardErrors.push(`${file}: Titelbild ${story.coverImage} existiert nicht.`);
    }
  }
}

const guideFiles = (await readdir(guidesDirectory)).filter((name) => name.endsWith('.md')).sort();
for (const file of guideFiles) {
  const source = await readFile(join(guidesDirectory, file), 'utf8');
  const frontmatter = frontmatterFromSource(source);
  const body = markdownBodyFromSource(source);
  const data = parseFrontmatter(frontmatter, file);
  const sourceUrls = Array.isArray(data.sources)
    ? data.sources.map((sourceEntry) => textValue(sourceEntry?.url)).filter(Boolean)
    : [];
  const guide = {
    file,
    title: textValue(data.title),
    author: textValue(data.author),
    reviewers: arrayValue(data.reviewedBy),
    status: textValue(data.editorialStatus, 'draft'),
    publishedAt: textValue(data.publishedAt),
    modifiedAt: textValue(data.modifiedAt),
    words: storyWordCount(body),
    sourceUrls,
  };
  guides.push(guide);

  if (!guide.title) hardErrors.push(`${file}: Ratgeber-Titel fehlt.`);
  if (!['aylin-karabektas', 'muhammet-karayigit', 'masalnova-redaksiyonu'].includes(guide.author)) {
    hardErrors.push(`${file}: Ungültige Ratgeber-Urheberschaft.`);
  }
  if (!['approved', 'needs_review', 'draft'].includes(guide.status)) {
    hardErrors.push(`${file}: Ungültiger Ratgeber-Redaktionsstatus.`);
  }
  if (guide.words < 650) hardErrors.push(`${file}: Ratgeber-Entwurf ist mit ${guide.words} Wörtern noch nicht substanziell genug.`);
  if (guide.sourceUrls.length < 2) hardErrors.push(`${file}: Mindestens zwei sichtbare Quellen fehlen.`);
  for (const url of guide.sourceUrls) {
    try { new URL(url); } catch { hardErrors.push(`${file}: Ungültige Quellen-URL ${url}.`); }
  }
  if (!isCalendarDate(guide.publishedAt) || (guide.modifiedAt && !isCalendarDate(guide.modifiedAt))) {
    hardErrors.push(`${file}: Ratgeber-Datum fehlt oder ist ungültig.`);
  }
  if (guide.status === 'approved') {
    if (!approvedAuthors.has(guide.author)) hardErrors.push(`${file}: Freigegebener Ratgeber benötigt einen realen namentlichen Autor.`);
    if (JSON.stringify(guide.reviewers) !== JSON.stringify(expectedReviewers)) {
      hardErrors.push(`${file}: Freigegebener Ratgeber benötigt die dokumentierte tatsächliche Doppelprüfung.`);
    }
  }
}

const titleGroups = groupBy(stories, (story) => story.title.toLocaleLowerCase('tr'));
for (const [title, group] of titleGroups) {
  if (title && group.length > 1) hardErrors.push(`Doppelter Titel „${group[0].title}“: ${group.map(({ file }) => file).join(', ')}`);
}

const uniqueCandidateIds = new Set(QUALITY_CORE_CANDIDATE_IDS);
if (QUALITY_CORE_CANDIDATE_IDS.length !== candidateCount || uniqueCandidateIds.size !== candidateCount) {
  hardErrors.push(`Der Qualitätskern-Kandidatenplan benötigt ${candidateCount} eindeutige Story-IDs; gefunden: ${QUALITY_CORE_CANDIDATE_IDS.length}/${uniqueCandidateIds.size}.`);
}
for (const [category, ids] of Object.entries(QUALITY_CORE_CANDIDATE_GROUPS)) {
  if (ids.length !== candidateGroupSize) {
    hardErrors.push(`Kandidatengruppe ${category} benötigt ${candidateGroupSize} Stories; gefunden: ${ids.length}.`);
  }
}

const storyBySlug = new Map(stories.map((story) => [story.file.replace(/\.md$/, ''), story]));
const qualityCoreCandidates = [];
for (const [expectedCategory, ids] of Object.entries(QUALITY_CORE_CANDIDATE_GROUPS)) {
  for (const id of ids) {
    const story = storyBySlug.get(id);
    if (!story) {
      hardErrors.push(`Qualitätskern-Kandidat fehlt: ${id}.`);
      continue;
    }
    qualityCoreCandidates.push(story);
    if (story.section !== 'masallar') hardErrors.push(`${story.file}: Qualitätskern-Kandidat liegt im falschen Bereich.`);
    if (story.status !== 'approved') hardErrors.push(`${story.file}: zugrunde liegende Geschichte ist nicht redaktionell freigegeben.`);
    if (story.categories[0] !== expectedCategory) {
      hardErrors.push(`${story.file}: Kandidatengruppe ${expectedCategory} passt nicht zur Hauptkategorie ${story.categories[0] || 'leer'}.`);
    }
    if (!story.parentGuideDraft) {
      hardErrors.push(`${story.file}: vollständiger handlungsspezifischer Elternbereich fehlt (${story.parentGuideWords}/${MIN_INDIVIDUAL_PARENT_GUIDE_WORDS} Wörter).`);
    }
    if (!emotionalIntensityValues.has(story.emotionalIntensity)) {
      hardErrors.push(`${story.file}: manuell beurteilte emotionale Intensität fehlt.`);
    }
    for (const [field, minimum] of Object.entries(parentSectionMinimumWords)) {
      const words = storyWordCount(story[field]);
      if (words < minimum) hardErrors.push(`${story.file}: ${field} ist mit ${words}/${minimum} Wörtern nicht substanziell genug.`);
    }
    if (story.discussionQuestions.length !== 3) {
      hardErrors.push(`${story.file}: genau drei Gesprächsfragen erforderlich; gefunden: ${story.discussionQuestions.length}.`);
    }
    story.discussionQuestions.forEach((question, index) => {
      if (storyWordCount(question) < 7) {
        hardErrors.push(`${story.file}: Gesprächsfrage ${index + 1} ist zu allgemein oder zu kurz.`);
      }
    });
    const anchors = distinctiveAnchors(story);
    const anchoredQuestions = story.discussionQuestions.filter((question) => questionHasStoryAnchor(question, anchors));
    if (anchoredQuestions.length < 2) {
      hardErrors.push(`${story.file}: mindestens zwei Fragen müssen erkennbare Figuren oder Gegenstände dieser Geschichte nennen.`);
    }
    const normalizedAgeGuidance = normalizedTurkish(story.parentAgeGuidance);
    if (!story.ageGroups.some((ageGroup) => normalizedAgeGuidance.includes(ageGroup))) {
      hardErrors.push(`${story.file}: Altersbegründung nennt die ausgewiesene Altersgruppe ${story.ageGroups.join('/') || 'nicht'}.`);
    }
    const parentGuideText = [
      story.parentAgeGuidance,
      story.parentEmotionalNotes,
      story.parentMessage,
      story.parentEverydayUse,
      story.activity,
      ...story.discussionQuestions,
    ].join(' ');
    if (unsupportedPromisePattern.test(parentGuideText)) {
      hardErrors.push(`${story.file}: Elternbereich enthält ein unbelegtes pädagogisches oder therapeutisches Wirkversprechen.`);
    }
    if (!story.modifiedAt) hardErrors.push(`${story.file}: echtes Überarbeitungsdatum für den Elternbereich fehlt.`);
  }
}

for (const field of ['parentAgeGuidance', 'parentEmotionalNotes', 'parentMessage', 'parentEverydayUse', 'activity']) {
  const duplicates = groupBy(qualityCoreCandidates, (story) => normalizedTurkish(story[field]));
  for (const [value, group] of duplicates) {
    if (value && group.length > 1) {
      hardErrors.push(`Doppelter Kandidatentext in ${field}: ${group.map(({ file }) => file).join(', ')}.`);
    }
  }
}
const candidateQuestions = qualityCoreCandidates.flatMap((story) => story.discussionQuestions.map((question) => ({ story, question })));
for (const [value, group] of groupBy(candidateQuestions, ({ question }) => normalizedTurkish(question))) {
  if (value && group.length > 1) {
    hardErrors.push(`Doppelte Kandidatenfrage: ${group.map(({ story }) => story.file).join(', ')}.`);
  }
}
for (let leftIndex = 0; leftIndex < qualityCoreCandidates.length; leftIndex++) {
  const left = qualityCoreCandidates[leftIndex];
  if (!left.parentGuideDraft) continue;
  const leftGuideShingles = wordShingles(combinedParentGuide(left));
  const leftStoryShingles = wordShingles(left.body);
  for (let rightIndex = leftIndex + 1; rightIndex < qualityCoreCandidates.length; rightIndex++) {
    const right = qualityCoreCandidates[rightIndex];
    if (!right.parentGuideDraft) continue;
    const guideSimilarity = jaccardSimilarity(leftGuideShingles, wordShingles(combinedParentGuide(right)));
    if (guideSimilarity >= 0.18) {
      hardErrors.push(`Zu ähnliche Elternbereiche (${guideSimilarity.toFixed(2)}): ${left.file}, ${right.file}.`);
    }
    const storySimilarity = jaccardSimilarity(leftStoryShingles, wordShingles(right.body));
    if (storySimilarity >= 0.28) {
      hardErrors.push(`Zu ähnliche Kernhandlungen (${storySimilarity.toFixed(2)}): ${left.file}, ${right.file}.`);
    }
  }
}

const trustPages = [
  'src/pages/hakkimizda/index.astro',
  'src/pages/yayin-ilkeleri/index.astro',
  'src/pages/iletisim/index.astro',
  'src/pages/impressum/index.astro',
  'src/pages/datenschutz/index.astro',
  'src/pages/kullanim-kosullari/index.astro',
  'src/pages/yazarlar/[slug].astro',
];
for (const page of trustPages) {
  try { await access(join(root, page)); } catch { hardErrors.push(`Vertrauensseite fehlt: ${page}`); }
}

for (const directory of ['src', 'public']) {
  for (const file of await textFiles(join(root, directory))) {
    const source = await readFile(file, 'utf8');
    if (/gamepix/iu.test(source)) hardErrors.push(`Externe GamePix-Referenz gefunden: ${file.slice(root.length + 1)}`);
  }
}

for (const [file, requiredSignals] of [
  ['src/components/AdSenseLoader.astro', [
    'PUBLIC_ADSENSE_TAG_ENABLED',
    'PUBLIC_GOOGLE_CMP_PUBLISHED',
    'PUBLIC_ADSENSE_MANUAL_ONLY',
  ]],
  ['src/components/AdSlot.astro', [
    'PUBLIC_ADSENSE_ENABLED',
    'PUBLIC_QUALITY_CORE_REVIEWED',
    'PUBLIC_ADSENSE_TAG_ENABLED',
    'PUBLIC_GOOGLE_CMP_PUBLISHED',
    'PUBLIC_ADSENSE_MANUAL_ONLY',
  ]],
]) {
  const source = await readFile(join(root, file), 'utf8');
  for (const requiredSignal of requiredSignals) {
    if (!source.includes(requiredSignal)) {
      hardErrors.push(`${file}: Schutzsignal ${requiredSignal} fehlt.`);
    }
  }
}

const loaderSource = await readFile(join(root, 'src/components/AdSenseLoader.astro'), 'utf8');
if (loaderSource.includes('import.meta.env.PUBLIC_ADSENSE_ENABLED')) {
  hardErrors.push('src/components/AdSenseLoader.astro: CMP-Tag ist fälschlich an die Anzeigenfreigabe gekoppelt.');
}

const consentSource = await readFile(join(root, 'src/components/Consent.astro'), 'utf8');
const analyticsConsentGuard = [
  "window['ga-disable-G-YZYEN24W6J'] = true",
  "analytics_storage: 'denied'",
  'function startAnalytics()',
  'onAccept: startAnalytics',
  "gtag('consent', 'update', { analytics_storage: 'granted' })",
  "script.src = 'https://www.googletagmanager.com/gtag/js?id='",
].every((signal) => consentSource.includes(signal));
if (!analyticsConsentGuard) {
  hardErrors.push('src/components/Consent.astro: Analytics muss bis zur freiwilligen Einwilligung deaktiviert bleiben und darf erst danach geladen werden.');
}
for (const requiredSignal of [
  'ga-disable-G-YZYEN24W6J',
  'CONSENT_API_READY',
  'showRevocationMessage',
  "ad_storage: 'denied'",
  "ad_user_data: 'denied'",
  "ad_personalization: 'denied'",
  "analytics_storage: 'denied'",
  "gtag('set', 'ads_data_redaction', true)",
]) {
  if (!consentSource.includes(requiredSignal)) {
    hardErrors.push(`src/components/Consent.astro: CMP-/Analytics-Schutzsignal ${requiredSignal} fehlt.`);
  }
}

const publicationBatches = groupBy(stories, (story) => story.publishedAt);
for (const [date, group] of publicationBatches) {
  if (date && group.length >= 50) warnings.push(`${group.length} Geschichten teilen das Veröffentlichungsdatum ${date}; historische Daten unverändert lassen und modifiedAt ausschließlich nach einer echten Überarbeitung ergänzen.`);
}

const approved = stories.filter(({ status }) => status === 'approved');
const publicStories = stories.filter(({ indexable }) => indexable);
const qualityCoreStories = stories.filter(({ qualityTier }) => qualityTier === 'core');
const parentGuideDraftStories = stories.filter(({ parentGuideDraft }) => parentGuideDraft);
const completeCoreStories = qualityCoreStories.filter(({ individualParentGuide }) => individualParentGuide);
const monetizableStories = stories.filter((story) => isStoryMonetizationEligible(story));
const controlledShortStories = approved.filter(({ indexable }) => !indexable);
const controlledEditorialStories = stories.filter(({ status }) => status !== 'approved');
const islamic = stories.filter(({ section }) => section === 'islami-hikayeler');
const approvedGuides = guides.filter(({ status }) => status === 'approved');
const completedQualityCandidates = qualityCoreCandidates.filter(({ parentGuideDraft, emotionalIntensity }) =>
  parentGuideDraft && emotionalIntensityValues.has(emotionalIntensity));
const humanReviewedQualityCandidates = qualityCoreCandidates.filter(({ individualParentGuide, qualityTier }) =>
  individualParentGuide && qualityTier === 'core');

if (qualityCoreReleased && (qualityCoreStories.length < 60 || qualityCoreStories.length > 100)) {
  hardErrors.push(`Qualitätskern-Freigabe verlangt 60–100 manuell klassifizierte Core-Stories; gefunden: ${qualityCoreStories.length}.`);
}
if (qualityCoreReleased && completeCoreStories.length !== qualityCoreStories.length) {
  hardErrors.push(`Qualitätskern-Freigabe verlangt einen individuellen Elternbereich für jede Core-Story; vollständig: ${completeCoreStories.length}/${qualityCoreStories.length}.`);
}
if (qualityCoreReleased && approvedGuides.length < 8) {
  hardErrors.push(`Qualitätskern-Freigabe verlangt mindestens 8 tatsächlich geprüfte Elternratgeber; gefunden: ${approvedGuides.length}.`);
}
if (qualityCoreReleased && humanReviewedQualityCandidates.length !== candidateCount) {
  hardErrors.push(`Qualitätskern-Freigabe verlangt die echte Einzelprüfung aller ${candidateCount} geplanten Kandidaten; gefunden: ${humanReviewedQualityCandidates.length}.`);
}
if (!qualityCoreReleased && qualityCoreStories.length < 60) {
  warnings.push(`Qualitätskern noch nicht freigegeben: ${qualityCoreStories.length}/60 erforderliche Core-Stories klassifiziert.`);
}
if (approvedGuides.length < 8) {
  warnings.push(`Ebeveyn Rehberi noch nicht freigegeben: ${approvedGuides.length}/8 Ratgeber tatsächlich geprüft.`);
}

let builtHtmlFiles = 0;
let builtInternalReferences = 0;
let verifiedGameGuides = 0;
if (verifyBuiltOutput) {
  const outputDirectory = join(root, process.env.MASALNOVA_AUDIT_OUTPUT_DIR?.trim() || 'docs');
  const sitemapPath = join(outputDirectory, 'sitemap-0.xml');
  let sitemap = '';
  try {
    sitemap = await readFile(sitemapPath, 'utf8');
  } catch {
    hardErrors.push('Build-Ausgabe oder docs/sitemap-0.xml fehlt. Zuerst npm run build ausführen.');
  }

  for (const story of stories) {
    const sectionPath = story.section === 'islami-hikayeler' ? 'islami-hikayeler' : 'masallar';
    const slug = story.file.replace(/\.md$/, '');
    const route = `/${sectionPath}/${slug}/`;
    let html = '';
    try {
      html = await readFile(join(outputDirectory, sectionPath, slug, 'index.html'), 'utf8');
    } catch {
      hardErrors.push(`${route}: erzeugte HTML-Datei fehlt.`);
      continue;
    }

    const shouldBePublic = story.indexable;
    const shouldAllowAds = isStoryMonetizationEligible(story);
    const isInSitemap = sitemap.includes(`https://masalnova.com${route}</loc>`);
    const hasAdSenseMetadata = html.includes('google-adsense-account');
    const hasChildAgeTreatment = html.includes('google_tag_for_age_treatment = 1');
    const hasNoindex = html.includes('content="noindex, follow"');
    const hasArticleData = html.includes('"@type":"Article"');
    const hasPublicDate = html.includes('"datePublished"')
      || html.includes('"dateModified"')
      || html.includes('property="article:published_time"')
      || html.includes('property="article:modified_time"')
      || html.includes('Yayınlandı:')
      || html.includes('Güncellendi:');

    if (shouldBePublic && (!isInSitemap || hasNoindex || !hasArticleData || hasPublicDate)) {
      hardErrors.push(`${route}: öffentliche Story ist in HTML/Sitemap nicht konsistent.`);
    }
    if (shouldAllowAds !== hasAdSenseMetadata || shouldAllowAds !== hasChildAgeTreatment) {
      hardErrors.push(`${route}: Anzeigenfreigabe und Alterskennzeichnung sind nicht konsistent.`);
    }
    if (!shouldBePublic && (isInSitemap || !hasNoindex || hasArticleData)) {
      hardErrors.push(`${route}: kontrollierte Story ist nicht vollständig noindex/werbefrei.`);
    }
    if (uniqueCandidateIds.has(slug)) {
      if (!html.includes('data-parent-guide="individual"')) {
        hardErrors.push(`${route}: individueller Elternbereich fehlt in der gebauten Seite.`);
      }
      const expectedGuideStatus = story.individualParentGuide ? 'reviewed' : 'needs-review';
      if (!html.includes(`data-parent-guide-status="${expectedGuideStatus}"`)) {
        hardErrors.push(`${route}: sichtbarer Prüfstatus des Elternbereichs ist nicht korrekt.`);
      }
      if (!html.includes(`data-emotional-intensity="${story.emotionalIntensity}"`)) {
        hardErrors.push(`${route}: manuelle emotionale Intensität fehlt in der gebauten Seite.`);
      }
    }
  }

  for (const guide of guides) {
    const slug = guide.file.replace(/\.md$/, '');
    const route = `/ebeveyn-rehberi/${slug}/`;
    let html = '';
    try {
      html = await readFile(join(outputDirectory, 'ebeveyn-rehberi', slug, 'index.html'), 'utf8');
    } catch {
      hardErrors.push(`${route}: erzeugte Ratgeber-HTML-Datei fehlt.`);
      continue;
    }
    const shouldBePublic = guide.status === 'approved';
    const isInSitemap = sitemap.includes(`https://masalnova.com${route}</loc>`);
    const hasNoindex = html.includes('content="noindex, follow"');
    const hasArticleData = html.includes('"@type":"Article"');
    if (shouldBePublic && (!isInSitemap || hasNoindex || !hasArticleData)) {
      hardErrors.push(`${route}: freigegebener Ratgeber ist in HTML/Sitemap nicht konsistent.`);
    }
    if (!shouldBePublic && (isInSitemap || !hasNoindex || hasArticleData || hasAdSenseArtifacts(html))) {
      hardErrors.push(`${route}: Ratgeber-Entwurf ist nicht vollständig noindex/werbefrei.`);
    }
  }

  try {
    const islamicIndex = await readFile(join(outputDirectory, 'islami-hikayeler', 'index.html'), 'utf8');
    if (hasAdSenseArtifacts(islamicIndex)) {
      hardErrors.push('/islami-hikayeler/: sensibler Themenbereich ist nicht vollständig werbefrei.');
    }
  } catch {
    hardErrors.push('/islami-hikayeler/: erzeugte HTML-Datei fehlt.');
  }

  const storyByOutputPath = new Map(stories.map((story) => {
    const sectionPath = story.section === 'islami-hikayeler' ? 'islami-hikayeler' : 'masallar';
    const slug = story.file.replace(/\.md$/, '');
    return [`${sectionPath}/${slug}/index.html`, story];
  }));

  for (const slug of playableGameSlugs) {
    const route = `/oyna/${slug}/`;
    let html = '';
    try {
      html = await readFile(join(outputDirectory, 'oyna', slug, 'index.html'), 'utf8');
    } catch {
      hardErrors.push(`${route}: erzeugte Spieleseite fehlt.`);
      continue;
    }
    const page = html.match(/<section class="game-page"[\s\S]*?<\/main>/)?.[0] ?? '';
    const visibleText = page
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = visibleText ? visibleText.split(' ').length : 0;
    if (!html.includes(`data-game-editorial="${slug}"`)) {
      hardErrors.push(`${route}: individueller redaktioneller Spielleitfaden fehlt.`);
    }
    if (wordCount < 200) {
      hardErrors.push(`${route}: sichtbarer redaktioneller Umfang ${wordCount} Wörter; erwartet sind mindestens 200.`);
    } else {
      verifiedGameGuides++;
    }
    const editorialWordCount = Number(html.match(/data-editorial-word-count="(\d+)"/)?.[1] ?? 0);
    const editorialMinimum = Number(html.match(/data-editorial-minimum="(\d+)"/)?.[1] ?? 0);
    if (editorialMinimum > 0 && editorialWordCount < editorialMinimum) {
      hardErrors.push(`${route}: Spielbeschreibung ${editorialWordCount}/${editorialMinimum} Wörter.`);
    }
  }
  const generatedHtml = (await textFiles(outputDirectory)).filter((file) => extname(file) === '.html');
  builtHtmlFiles = generatedHtml.length;
  for (const file of generatedHtml) {
    const source = await readFile(file, 'utf8');
    const outputPath = file.slice(outputDirectory.length + 1);
    const storyForOutput = storyByOutputPath.get(outputPath);
    const isMonetizableStory = Boolean(storyForOutput
      && isStoryMonetizationEligible(storyForOutput));
    const isPublisherSurface = outputPath === 'index.html'
      || outputPath === 'boyama/index.html'
      || /^boyama\/[^/]+\/index\.html$/.test(outputPath)
      || isMonetizableStory;
    const hasPublisherMetadata = source.includes('google-adsense-account');
    const hasPublisherTag = source.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    const hasChildAgeTreatment = source.includes('google_tag_for_age_treatment = 1');
    const manualAdUnitCount = (source.match(/class="adsbygoogle"/g) ?? []).length;
    const childRequestCount = (source.match(/data-tag-for-age-treatment="1"/g) ?? []).length;
    const hasManualAdUnit = manualAdUnitCount > 0;
    const expectedManualAdUnits = outputPath === 'index.html'
      ? 2
      : isMonetizableStory ? 1
      : isPublisherSurface ? 1 : 0;
    const expectedPlacements = outputPath === 'index.html'
      ? [
          ['home-after-latest', process.env.PUBLIC_ADSENSE_HOME_FEED_SLOT],
          ['home-before-guide', process.env.PUBLIC_ADSENSE_HOME_CONTENT_SLOT],
        ]
      : outputPath === 'boyama/index.html'
        ? [['boyama-index-after-content', process.env.PUBLIC_ADSENSE_BOYAMA_INDEX_SLOT]]
        : isMonetizableStory
          ? [['story-after-parent-guide', process.env.PUBLIC_ADSENSE_STORY_GUIDE_SLOT]]
        : isPublisherSurface
          ? [['boyama-detail-after-parent-guide', process.env.PUBLIC_ADSENSE_BOYAMA_DETAIL_SLOT]]
          : [];
    const isProtectedFromAds = source.includes('content="noindex')
      || (/^masallar\//.test(outputPath) && !isMonetizableStory)
      || [
      /^islami-hikayeler\//,
      /^boyama\/[^/]+\/boya\/index\.html$/,
      /^games\//,
      /^oyna\//,
      /^videolar\//,
      /^(?:ara|kitapligim|masal-bul|oyunlar|hakkimizda|yayin-ilkeleri|iletisim|impressum|datenschutz|kullanim-kosullari|yazarlar)\//,
      ].some((pattern) => pattern.test(outputPath));
    if (isProtectedFromAds && hasAdSenseArtifacts(source)) {
      hardErrors.push(`${outputPath}: geschützte Seite enthält AdSense-Code oder Freigabesignale.`);
    }
    if (isPublisherSurface && (!hasPublisherMetadata || !hasChildAgeTreatment)) {
      hardErrors.push(`${outputPath}: freigegebene CMP-Oberfläche hat keine Publisher-/TFAT-Kennzeichnung.`);
    }
    if (!isPublisherSurface && (hasPublisherMetadata || hasPublisherTag || hasChildAgeTreatment || hasManualAdUnit)) {
      hardErrors.push(`${outputPath}: AdSense-Artefakt außerhalb der freigegebenen Seitentypen gefunden.`);
    }
    if (isPublisherSurface && hasPublisherTag !== publisherTagExpected) {
      hardErrors.push(`${outputPath}: Publisher-Tag entspricht nicht dem geprüften Deployment-Zustand.`);
    }
    if (!adUnitsEnabled && hasManualAdUnit) {
      hardErrors.push(`${outputPath}: manuelle Anzeige trotz deaktivierter Anzeigenfreigabe gefunden.`);
    }
    if (adUnitsEnabled && manualAdUnitCount !== expectedManualAdUnits) {
      hardErrors.push(`${outputPath}: ${manualAdUnitCount} statt ${expectedManualAdUnits} erwarteten manuellen Anzeigen gefunden.`);
    }
    if (adUnitsEnabled) {
      const renderedPlacements = [...source.matchAll(/data-ad-placement="([^"]+)"/g)].map((match) => match[1]);
      if (renderedPlacements.length !== expectedPlacements.length) {
        hardErrors.push(`${outputPath}: Anzahl der benannten Anzeigenplätze ist nicht korrekt.`);
      }
      for (const [placement, slotId] of expectedPlacements) {
        const placementPosition = source.indexOf(`data-ad-placement="${placement}"`);
        const placementEnd = placementPosition >= 0 ? source.indexOf('</aside>', placementPosition) : -1;
        const placementMarkup = placementPosition >= 0
          ? source.slice(placementPosition, placementEnd >= 0 ? placementEnd : undefined)
          : '';
        if (renderedPlacements.filter((value) => value === placement).length !== 1
          || !placementMarkup.includes(`data-ad-slot="${slotId}"`)) {
          hardErrors.push(`${outputPath}: Platz ${placement} fehlt, ist doppelt oder nutzt die falsche Slot-ID.`);
        }
      }
      if (isMonetizableStory) {
        const placementPosition = source.indexOf('data-ad-placement="story-after-parent-guide"');
        const articleStart = source.indexOf('data-reader-article');
        const articleEnd = articleStart >= 0 ? source.indexOf('</article>', articleStart) : -1;
        const guideStart = source.indexOf('class="story-guide"');
        const guideEnd = guideStart >= 0 ? source.indexOf('</section>', guideStart) : -1;
        const followingContentPositions = [
          source.indexOf('class="themes"'),
          source.indexOf('class="watch"'),
          source.indexOf('class="more"'),
        ].filter((position) => position >= 0);
        const firstFollowingContent = followingContentPositions.length
          ? Math.min(...followingContentPositions)
          : -1;
        if (placementPosition < 0
          || articleEnd < 0
          || guideEnd < 0
          || placementPosition <= articleEnd
          || placementPosition <= guideEnd
          || (firstFollowingContent >= 0 && placementPosition >= firstFollowingContent)) {
          hardErrors.push(`${outputPath}: Story-Anzeige steht nicht sicher nach Artikel und Eltern-Guide oder vor den Empfehlungen.`);
        }
      }
    }
    if (manualAdUnitCount !== childRequestCount) {
      hardErrors.push(`${outputPath}: manuelle Anzeige ohne vollständige TFAT-Kennzeichnung gefunden.`);
    }
    if (hasPublisherTag) {
      const publisherTagPosition = source.indexOf('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      const ageTreatmentPosition = source.indexOf('google_tag_for_age_treatment = 1');
      const deniedConsentPosition = source.indexOf("ad_storage: 'denied'");
      if (ageTreatmentPosition < 0 || deniedConsentPosition < 0
        || ageTreatmentPosition > publisherTagPosition || deniedConsentPosition > publisherTagPosition) {
        hardErrors.push(`${outputPath}: TFAT oder verweigerte Consent-Defaults stehen nicht vor dem Publisher-Tag.`);
      }
    }
    for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
      let reference = match[1];
      if (!reference.startsWith('/') || reference.startsWith('//') || /[${}]/.test(reference)) continue;
      builtInternalReferences++;
      reference = reference.split('#')[0].split('?')[0];
      if (!reference) continue;
      let target = join(outputDirectory, decodeURIComponent(reference));
      if (reference.endsWith('/')) target = join(target, 'index.html');
      try {
        await access(target);
      } catch {
        hardErrors.push(`${file.slice(root.length + 1)}: internes Ziel fehlt: ${reference}`);
      }
    }
  }
}

console.log('MasalNova Publishing Audit');
console.log(`Geschichten gesamt: ${stories.length}`);
console.log(`Öffentlich indexierbar/empfohlen: ${publicStories.length}`);
console.log(`Manuell klassifizierter Qualitätskern: ${qualityCoreStories.length} (mit individuellem Elternbereich: ${completeCoreStories.length})`);
console.log(`Story-spezifische Elternbereiche ausgearbeitet: ${parentGuideDraftStories.length}`);
console.log(`Qualitätskern-Kandidaten inhaltlich ausgearbeitet: ${completedQualityCandidates.length}/${candidateCount} (menschlich final geprüft: ${humanReviewedQualityCandidates.length})`);
console.log(`Kontrolliert monetarisierbare Stories: ${monetizableStories.length}`);
console.log(`Kontrolliert noindex + werbefrei (Qualitäts-/Formatgate): ${controlledShortStories.length}`);
console.log(`Kontrolliert noindex + werbefrei (Redaktionsprüfung offen): ${controlledEditorialStories.length}`);
console.log(`İslami Hikâyeler mit Quellenprüfung: ${islamic.length}`);
console.log(`Ebeveyn-Rehberi-Entwürfe: ${guides.length} (freigegeben: ${approvedGuides.length})`);
console.log(`Autorenverteilung: Aylin ${stories.filter(({ author }) => author === 'aylin-karabektas').length}, Muhammet ${stories.filter(({ author }) => author === 'muhammet-karayigit').length}`);
if (verifyBuiltOutput) {
  console.log(`Erzeugte HTML-Dateien geprüft: ${builtHtmlFiles}`);
  console.log(`Interne Referenzen geprüft: ${builtInternalReferences}`);
  console.log(`Spieleseiten mit mindestens 200 Wörtern geprüft: ${verifiedGameGuides}`);
}

if (warnings.length) {
  console.log('\nHinweise:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (hardErrors.length) {
  console.error('\nBlockierende Fehler:');
  for (const error of hardErrors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nErgebnis: keine blockierenden Publishing-Risiken gefunden.');
}
