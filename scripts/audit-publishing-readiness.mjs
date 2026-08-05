import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isStoryContentSubstantial,
  markdownBodyFromSource,
  minimumStoryWordCount,
  storyWordCount,
} from '../src/lib/story-quality.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const storiesDirectory = join(root, 'src', 'content', 'stories');
const approvedAuthors = new Set(['aylin-karabektas', 'muhammet-karayigit']);
const expectedReviewers = ['aylin-karabektas', 'muhammet-karayigit'];
const hardErrors = [];
const warnings = [];
const verifyBuiltOutput = process.argv.includes('--built');

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
  if (!story.publishedAt) hardErrors.push(`${file}: Veröffentlichungsdatum fehlt.`);
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

const publicationBatches = groupBy(stories, (story) => story.publishedAt);
for (const [date, group] of publicationBatches) {
  if (date && group.length >= 50) warnings.push(`${group.length} Geschichten teilen das Veröffentlichungsdatum ${date}; Datum nicht künstlich ändern, sondern bei echten Überarbeitungen modifiedAt pflegen.`);
}

const approved = stories.filter(({ status }) => status === 'approved');
const publicStories = approved.filter(({ substantial }) => substantial);
const controlledShortStories = approved.filter(({ substantial }) => !substantial);
const controlledEditorialStories = stories.filter(({ status }) => status !== 'approved');
const islamic = stories.filter(({ section }) => section === 'islami-hikayeler');

let builtHtmlFiles = 0;
let builtInternalReferences = 0;
if (verifyBuiltOutput) {
  const outputDirectory = join(root, 'docs');
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
    const isInSitemap = sitemap.includes(`https://masalnova.com${route}</loc>`);
    const hasAdSenseMetadata = html.includes('google-adsense-account');
    const hasNoindex = html.includes('content="noindex, follow"');
    const hasArticleData = html.includes('"@type":"Article"');

    if (shouldBePublic && (!isInSitemap || !hasAdSenseMetadata || hasNoindex || !hasArticleData)) {
      hardErrors.push(`${route}: öffentliche Story ist in HTML/Sitemap nicht konsistent.`);
    }
    if (!shouldBePublic && (isInSitemap || hasAdSenseMetadata || !hasNoindex || hasArticleData)) {
      hardErrors.push(`${route}: kontrollierte Story ist nicht vollständig noindex/werbefrei.`);
    }
  }

  const generatedHtml = (await textFiles(outputDirectory)).filter((file) => extname(file) === '.html');
  builtHtmlFiles = generatedHtml.length;
  for (const file of generatedHtml) {
    const source = await readFile(file, 'utf8');
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
console.log(`Kontrolliert noindex + werbefrei (unter Formatgrenze): ${controlledShortStories.length}`);
console.log(`Kontrolliert noindex + werbefrei (Redaktionsprüfung offen): ${controlledEditorialStories.length}`);
console.log(`İslami Hikâyeler mit Quellenprüfung: ${islamic.length}`);
console.log(`Autorenverteilung: Aylin ${stories.filter(({ author }) => author === 'aylin-karabektas').length}, Muhammet ${stories.filter(({ author }) => author === 'muhammet-karayigit').length}`);
if (verifyBuiltOutput) {
  console.log(`Erzeugte HTML-Dateien geprüft: ${builtHtmlFiles}`);
  console.log(`Interne Referenzen geprüft: ${builtInternalReferences}`);
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
