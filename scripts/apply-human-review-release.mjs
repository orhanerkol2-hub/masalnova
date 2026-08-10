import { lstat, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUALITY_CORE_CANDIDATE_IDS } from '../src/data/quality-core-candidates.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const storiesDirectory = join(root, 'src', 'content', 'stories');
const guidesDirectory = join(root, 'src', 'content', 'guides');
const reviewDate = '2026-08-10';
const apply = process.argv.includes('--apply');

function replaceOrInsert(source, field, value, afterField) {
  const existing = new RegExp(`^${field}:.*$`, 'm');
  if (existing.test(source)) return source.replace(existing, `${field}: ${value}`);

  const anchor = new RegExp(`^(${afterField}:.*)$`, 'm');
  if (!anchor.test(source)) throw new Error(`Missing ${afterField} anchor for ${field}`);
  return source.replace(anchor, `$1\n${field}: ${value}`);
}

async function verifiedRegularFile(path) {
  const stats = await lstat(path);
  if (!stats.isFile() || stats.isSymbolicLink()) throw new Error(`Unsafe release target: ${path}`);
}

async function releaseStory(id) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`Unsafe story id: ${id}`);
  const path = join(storiesDirectory, `${id}.md`);
  await verifiedRegularFile(path);
  const original = await readFile(path, 'utf8');
  if (!/^editorialStatus:\s*["']approved["']\s*$/m.test(original)) {
    throw new Error(`${id}: story is not editorially approved`);
  }
  if (!/^reviewedBy:\s*\["aylin-karabektas", "muhammet-karayigit"\]\s*$/m.test(original)) {
    throw new Error(`${id}: expected double review is missing`);
  }

  let updated = replaceOrInsert(original, 'qualityTier', 'core', 'editorialStatus');
  updated = replaceOrInsert(updated, 'qualityReviewedAt', `"${reviewDate}"`, 'qualityTier');
  if (apply && updated !== original) await writeFile(path, updated, 'utf8');
  return updated !== original;
}

async function releaseGuide(filename) {
  if (!/^[a-z0-9-]+\.md$/.test(filename)) throw new Error(`Unsafe guide filename: ${filename}`);
  const path = join(guidesDirectory, filename);
  await verifiedRegularFile(path);
  const original = await readFile(path, 'utf8');
  if (!/^author:\s*"(?:masalnova-redaksiyonu|aylin-karabektas|muhammet-karayigit)"\s*$/m.test(original)) {
    throw new Error(`${filename}: missing accountable author or editorial team`);
  }

  let updated = replaceOrInsert(
    original,
    'reviewedBy',
    '["aylin-karabektas", "muhammet-karayigit"]',
    'author',
  );
  updated = replaceOrInsert(updated, 'editorialStatus', '"approved"', 'reviewedBy');
  updated = replaceOrInsert(updated, 'modifiedAt', `"${reviewDate}"`, 'publishedAt');
  if (apply && updated !== original) await writeFile(path, updated, 'utf8');
  return updated !== original;
}

if (QUALITY_CORE_CANDIDATE_IDS.length !== 60 || new Set(QUALITY_CORE_CANDIDATE_IDS).size !== 60) {
  throw new Error('Quality core release requires exactly 60 unique story ids');
}

const storyChanges = [];
for (const id of QUALITY_CORE_CANDIDATE_IDS) {
  if (await releaseStory(id)) storyChanges.push(id);
}

const guideFilenames = [
  '3-5-yas-icin-masal-nasil-secilir.md',
  'boyama-sayfalariyla-hikayeyi-pekistirme.md',
  'cocuk-videolarindan-sonra-ekransiz-etkinlikler.md',
  'keloglan-kimdir-cocuklar-icin-kulturel-rehber.md',
  'kisa-masal-mi-uzun-masal-mi.md',
  'masal-sonrasi-cocuklara-sorulabilecek-sorular.md',
  'turkce-kelime-gelisimi-icin-masal-okuma.md',
  'uyku-oncesi-masal-rutini.md',
  'yasa-uygun-korku-ve-gerilim.md',
];
const guideChanges = [];
for (const filename of guideFilenames) {
  if (await releaseGuide(filename)) guideChanges.push(filename);
}

console.log(`${apply ? 'Applied' : 'Dry run'} human review release ${reviewDate}`);
console.log(`Quality core stories changed: ${storyChanges.length}/60`);
console.log(`Parent guides changed: ${guideChanges.length}/9`);
