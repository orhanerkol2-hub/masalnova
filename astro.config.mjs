// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import {
  isStoryContentSubstantial,
  isStoryDiscoveryEligible,
  isStoryIndexingEligible,
  markdownBodyFromSource,
  storyWordCount,
  storyQualityContextFromSource,
} from './src/lib/story-quality.mjs';

const storyContentDirectory = new URL('./src/content/stories/', import.meta.url);
const guideContentDirectory = new URL('./src/content/guides/', import.meta.url);
const qualityCoreReleased = process.env.PUBLIC_QUALITY_CORE_REVIEWED === 'true';

/** @param {string} source @param {string} key */
function sourceValue(source, key) {
  return source.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1] ?? '';
}

/**
 * Only explicit content dates are used; a deploy/build timestamp is not a content change.
 * @param {string} source
 */
function reliableContentDate(source) {
  const value = sourceValue(source, 'modifiedAt') || sourceValue(source, 'publishedAt');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.getTime() > Date.now()) return undefined;
  return parsed.toISOString();
}

/** @param {{ lastmod?: string }[]} records */
function latestContentDate(records) {
  return records.map(({ lastmod }) => lastmod).filter(Boolean).sort().at(-1);
}

const storySources = readdirSync(storyContentDirectory)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const source = readFileSync(new URL(name, storyContentDirectory), 'utf8');
    const status = source.match(/^editorialStatus:\s*["']?([^\s"']+)/m)?.[1] ?? 'draft';
    const body = markdownBodyFromSource(source);
    const context = storyQualityContextFromSource(source);
    const substantial = isStoryContentSubstantial(body, context);
    const words = storyWordCount(body);
    const isIndexable = isStoryIndexingEligible({
      status,
      substantial,
      qualityCoreReleased,
      words,
      ...context,
    });
    const isDiscoverable = isStoryDiscoveryEligible({
      status,
      substantial,
      words,
      ...context,
    });
    const basePath = context.section === 'islami-hikayeler' ? '/islami-hikayeler/' : '/masallar/';
    return {
      name,
      source,
      status,
      context,
      substantial,
      isIndexable,
      isDiscoverable,
      url: `https://masalnova.com${basePath}${name.replace(/\.md$/, '')}/`,
      lastmod: reliableContentDate(source),
    };
  });

const nonIndexableStoryPaths = new Set(storySources
  .filter(({ isIndexable }) => !isIndexable)
  .map(({ url }) => url));
const guideSources = readdirSync(guideContentDirectory)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const source = readFileSync(new URL(name, guideContentDirectory), 'utf8');
    return {
      name,
      source,
      lastmod: reliableContentDate(source),
      url: `https://masalnova.com/ebeveyn-rehberi/${name.replace(/\.md$/, '')}/`,
    };
  });
const approvedGuideSources = guideSources.filter(({ source }) => {
  const status = source.match(/^editorialStatus:\s*["']?([^\s"']+)/m)?.[1] ?? 'draft';
  return status === 'approved' && /^reviewedBy:\s*\[/m.test(source);
});
const guideHubIndexable = approvedGuideSources.length >= 8;
const nonIndexableGuidePaths = new Set(guideSources
  .filter(({ source }) => {
    const status = source.match(/^editorialStatus:\s*["']?([^\s"']+)/m)?.[1] ?? 'draft';
    return status !== 'approved' || !/^reviewedBy:\s*\[/m.test(source);
  })
  .map(({ name }) => `https://masalnova.com/ebeveyn-rehberi/${name.replace(/\.md$/, '')}/`));

/** @type {Map<string, string>} */
const sitemapLastModifiedByUrl = new Map();
for (const { url, lastmod } of [...storySources, ...guideSources]) {
  if (lastmod) sitemapLastModifiedByUrl.set(url, lastmod);
}

/** @param {string} path @param {{ lastmod?: string }[]} records */
function setCollectionLastmod(path, records) {
  const lastmod = latestContentDate(records);
  if (lastmod) sitemapLastModifiedByUrl.set(`https://masalnova.com${path}`, lastmod);
}

const indexableMasalSources = storySources.filter(({ isIndexable, context }) =>
  isIndexable && context.section !== 'islami-hikayeler');
const discoverableUykuSources = storySources.filter(({ isDiscoverable, context }) =>
  isDiscoverable
  && context.section !== 'islami-hikayeler'
  && context.categories.includes('uyku'));
const curatedShortSources = storySources.filter(({ status, substantial, context, source }) =>
  status === 'approved'
  && substantial
  && context.section !== 'islami-hikayeler'
  && context.readingTime <= 2
  && context.qualityTier !== 'review'
  && context.qualityTier !== 'retire'
  && Boolean(sourceValue(source, 'modifiedAt')));

setCollectionLastmod('/masallar/', indexableMasalSources);
setCollectionLastmod('/masallar/kategori/uyku/', discoverableUykuSources);
setCollectionLastmod('/masallar/sure/kisa/', curatedShortSources);
setCollectionLastmod('/islami-hikayeler/', storySources.filter(({ isIndexable, context }) =>
  isIndexable && context.section === 'islami-hikayeler'));
setCollectionLastmod('/ebeveyn-rehberi/', approvedGuideSources);

for (const category of ['keloglan', 'egitici', 'hayvan']) {
  setCollectionLastmod(`/masallar/kategori/${category}/`, indexableMasalSources.filter(({ context }) =>
    context.categories.includes(category)));
}
for (const duration of [
  { key: 'orta', minimum: 3, maximum: 5 },
  { key: 'uzun', minimum: 6, maximum: Infinity },
]) {
  setCollectionLastmod(`/masallar/sure/${duration.key}/`, indexableMasalSources.filter(({ context }) =>
    context.readingTime >= duration.minimum && context.readingTime <= duration.maximum));
}

// https://astro.build
export default defineConfig({
  site: 'https://masalnova.com',
  // GitHub Pages serves this folder (main branch /docs)
  outDir: process.env.MASALNOVA_OUT_DIR?.trim() || './docs',
  // clean URLs: /masallar/ -> masallar/index.html, /videolar/slug -> videolar/slug/index.html
  build: { format: 'directory' },
  image: { service: passthroughImageService() },
  integrations: [sitemap({
    filter: (page) =>
      page !== 'https://masalnova.com/story-index.json' &&
      (guideHubIndexable || page !== 'https://masalnova.com/ebeveyn-rehberi/') &&
      page !== 'https://masalnova.com/oyna/masal-ipleri/' &&
      !page.startsWith('https://masalnova.com/ara/') &&
      !page.startsWith('https://masalnova.com/kitapligim/') &&
      !page.startsWith('https://masalnova.com/masallar/kategori/kisa/') &&
      !page.startsWith('https://masalnova.com/masallar/sayfa/') &&
      !page.startsWith('https://masalnova.com/islami-hikayeler/sayfa/') &&
      !/^https:\/\/masalnova\.com\/masallar\/kategori\/[^/]+\/sayfa\//.test(page) &&
      !/^https:\/\/masalnova\.com\/videolar\/[^/]+\/$/.test(page) &&
      !/^https:\/\/masalnova\.com\/boyama\/[^/]+\/boya\/$/.test(page) &&
      !page.startsWith('https://masalnova.com/games/') &&
      !nonIndexableGuidePaths.has(page) &&
      !nonIndexableStoryPaths.has(page),
    serialize: (item) => {
      const lastmod = sitemapLastModifiedByUrl.get(item.url);
      return lastmod ? { ...item, lastmod } : item;
    },
  })],
});
