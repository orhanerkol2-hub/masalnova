import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isStoryContentSubstantial,
  isStoryMonetizationEligible,
  markdownBodyFromSource,
  minimumStoryWordCount,
  storyWordCount,
} from '../src/lib/story-quality.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const storiesDirectory = join(root, 'src', 'content', 'stories');
const approvedAuthors = new Set(['aylin-karabektas', 'muhammet-karayigit']);
const expectedReviewers = ['aylin-karabektas', 'muhammet-karayigit'];
const playableGameSlugs = [
  'ay-isigi-bahcesi',
  'bulut-firini',
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
const adUnitsEnabled = process.env.PUBLIC_ADSENSE_ENABLED === 'true';
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
if (adUnitsEnabled && !publisherTagExpected) {
  hardErrors.push('Anzeigenfreigabe ist aktiv, obwohl Publisher-Tag, CMP oder Manual-only nicht vollständig bestätigt sind.');
}
if (adUnitsEnabled) {
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

function scalar(frontmatter, key, fallback = '') {
  const value = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))?.[1];
  if (!value) return fallback;
  return value.replace(/^['"]|['"]$/g, '');
}

function list(frontmatter, key) {
  const value = scalar(frontmatter, key, '[]');
  try {
    return JSON.parse(value.replace(/'/g, '"'));
  } catch {
    return [];
  }
}

function frontmatterFromSource(source) {
  return source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1] ?? '';
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

for (const file of files) {
  const source = await readFile(join(storiesDirectory, file), 'utf8');
  const frontmatter = frontmatterFromSource(source);
  const body = markdownBodyFromSource(source);
  if (!frontmatter || !body.trim()) {
    hardErrors.push(`${file}: Frontmatter oder Geschichte fehlt.`);
    continue;
  }

  const qualityContext = {
    section: scalar(frontmatter, 'section', 'masallar'),
    categories: list(frontmatter, 'categories'),
    sourceCitation: scalar(frontmatter, 'sourceCitation'),
    sourceUrl: scalar(frontmatter, 'sourceUrl'),
  };
  const story = {
    file,
    title: scalar(frontmatter, 'title'),
    author: scalar(frontmatter, 'author'),
    reviewers: list(frontmatter, 'reviewedBy'),
    status: scalar(frontmatter, 'editorialStatus', 'draft'),
    ...qualityContext,
    coverImage: scalar(frontmatter, 'coverImage'),
    publishedAt: scalar(frontmatter, 'publishedAt'),
    modifiedAt: scalar(frontmatter, 'modifiedAt'),
    readingTime: Number(scalar(frontmatter, 'readingTime', '0')),
    words: storyWordCount(body),
    minimumWords: minimumStoryWordCount(qualityContext),
    substantial: isStoryContentSubstantial(body, qualityContext),
  };
  stories.push(story);

  if (!story.title) hardErrors.push(`${file}: Titel fehlt.`);
  if (!approvedAuthors.has(story.author)) hardErrors.push(`${file}: Ungültiger oder fehlender Autor.`);
  if (JSON.stringify(story.reviewers) !== JSON.stringify(expectedReviewers)) {
    hardErrors.push(`${file}: Redaktionelle Prüfung muss Aylin Karabektaş und Muhammet Karayiğit enthalten.`);
  }
  if (!['approved', 'needs_review', 'draft'].includes(story.status)) hardErrors.push(`${file}: Ungültiger Redaktionsstatus.`);
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

const titleGroups = groupBy(stories, (story) => story.title.toLocaleLowerCase('tr'));
for (const [title, group] of titleGroups) {
  if (title && group.length > 1) hardErrors.push(`Doppelter Titel „${group[0].title}“: ${group.map(({ file }) => file).join(', ')}`);
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
if (consentSource.includes('googletagmanager.com/gtag/js') || consentSource.includes('analytics_storage: \'granted\'')) {
  hardErrors.push('src/components/Consent.astro: eigenständiges Analytics-Tracking ist noch aktiv.');
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
const publicStories = approved.filter(({ substantial }) => substantial);
const monetizableStories = stories.filter((story) => isStoryMonetizationEligible(story));
const controlledShortStories = approved.filter(({ substantial }) => !substantial);
const controlledEditorialStories = stories.filter(({ status }) => status !== 'approved');
const islamic = stories.filter(({ section }) => section === 'islami-hikayeler');

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

    const shouldBePublic = story.status === 'approved' && story.substantial;
    const shouldAllowAds = isStoryMonetizationEligible(story);
    const isInSitemap = sitemap.includes(`https://masalnova.com${route}</loc>`);
    const hasAdSenseMetadata = html.includes('google-adsense-account');
    const hasChildAgeTreatment = html.includes('google_tag_for_age_treatment = 1');
    const hasNoindex = html.includes('content="noindex, follow"');
    const hasArticleData = html.includes('"@type":"Article"');
    const hasExactPublishedData = html.includes(`"datePublished":"${story.publishedAt}"`)
      && html.includes(`property="article:published_time" content="${story.publishedAt}"`)
      && html.includes(`<time datetime="${story.publishedAt}"`);
    const hasSyntheticPublishedTime = html.includes(`"datePublished":"${story.publishedAt}T`)
      || html.includes(`property="article:published_time" content="${story.publishedAt}T`);
    const hasModifiedData = html.includes('"dateModified"')
      || html.includes('property="article:modified_time"')
      || html.includes('Güncellendi:');
    const hasExactModifiedData = story.modifiedAt
      ? html.includes(`"dateModified":"${story.modifiedAt}"`)
        && html.includes(`property="article:modified_time" content="${story.modifiedAt}"`)
        && html.includes(`<time datetime="${story.modifiedAt}"`)
      : !hasModifiedData;

    if (shouldBePublic && (!isInSitemap || hasNoindex || !hasArticleData || !hasExactPublishedData || hasSyntheticPublishedTime || !hasExactModifiedData)) {
      hardErrors.push(`${route}: öffentliche Story ist in HTML/Sitemap nicht konsistent.`);
    }
    if (shouldAllowAds !== hasAdSenseMetadata || shouldAllowAds !== hasChildAgeTreatment) {
      hardErrors.push(`${route}: Anzeigenfreigabe und Alterskennzeichnung sind nicht konsistent.`);
    }
    if (!shouldBePublic && (isInSitemap || !hasNoindex || hasArticleData)) {
      hardErrors.push(`${route}: kontrollierte Story ist nicht vollständig noindex/werbefrei.`);
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
    if (wordCount < 200 || wordCount > 300) {
      hardErrors.push(`${route}: sichtbarer redaktioneller Umfang ${wordCount} Wörter; erwartet sind 200–300.`);
    } else {
      verifiedGameGuides++;
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
console.log(`Kontrolliert monetarisierbare Stories: ${monetizableStories.length}`);
console.log(`Kontrolliert noindex + werbefrei (unter Formatgrenze): ${controlledShortStories.length}`);
console.log(`Kontrolliert noindex + werbefrei (Redaktionsprüfung offen): ${controlledEditorialStories.length}`);
console.log(`İslami Hikâyeler mit Quellenprüfung: ${islamic.length}`);
console.log(`Autorenverteilung: Aylin ${stories.filter(({ author }) => author === 'aylin-karabektas').length}, Muhammet ${stories.filter(({ author }) => author === 'muhammet-karayigit').length}`);
if (verifyBuiltOutput) {
  console.log(`Erzeugte HTML-Dateien geprüft: ${builtHtmlFiles}`);
  console.log(`Interne Referenzen geprüft: ${builtInternalReferences}`);
  console.log(`Spieleseiten mit 200–300 Wörtern geprüft: ${verifiedGameGuides}`);
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
