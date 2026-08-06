// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import {
  isStoryContentSubstantial,
  isStoryIndexingEligible,
  markdownBodyFromSource,
  storyWordCount,
  storyQualityContextFromSource,
} from './src/lib/story-quality.mjs';

const storyContentDirectory = new URL('./src/content/stories/', import.meta.url);
const guideContentDirectory = new URL('./src/content/guides/', import.meta.url);
const qualityCoreReleased = process.env.PUBLIC_QUALITY_CORE_REVIEWED === 'true';
const nonIndexableStoryPaths = new Set(
  readdirSync(storyContentDirectory)
    .filter((name) => name.endsWith('.md'))
    .flatMap((name) => {
      const source = readFileSync(new URL(name, storyContentDirectory), 'utf8');
      const status = source.match(/^editorialStatus:\s*["']?([^\s"']+)/m)?.[1] ?? 'draft';
      const section = source.match(/^section:\s*["']?([^\s"']+)/m)?.[1] ?? 'masallar';
      const basePath = section === 'islami-hikayeler' ? '/islami-hikayeler/' : '/masallar/';
      const body = markdownBodyFromSource(source);
      const context = storyQualityContextFromSource(source);
      const substantial = isStoryContentSubstantial(body, context);
      const isIndexable = isStoryIndexingEligible({
        status,
        substantial,
        qualityCoreReleased,
        words: storyWordCount(body),
        ...context,
      });
      return isIndexable ? [] : [`https://masalnova.com${basePath}${name.replace(/\.md$/, '')}/`];
    }),
);
const guideSources = readdirSync(guideContentDirectory)
  .filter((name) => name.endsWith('.md'))
  .map((name) => ({ name, source: readFileSync(new URL(name, guideContentDirectory), 'utf8') }));
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
      !page.startsWith('https://masalnova.com/masallar/kategori/uyku/') &&
      page !== 'https://masalnova.com/masallar/sure/kisa/' &&
      !page.startsWith('https://masalnova.com/masallar/sayfa/') &&
      !page.startsWith('https://masalnova.com/islami-hikayeler/sayfa/') &&
      !/^https:\/\/masalnova\.com\/masallar\/kategori\/[^/]+\/sayfa\//.test(page) &&
      !/^https:\/\/masalnova\.com\/videolar\/[^/]+\/$/.test(page) &&
      !/^https:\/\/masalnova\.com\/boyama\/[^/]+\/boya\/$/.test(page) &&
      !page.startsWith('https://masalnova.com/games/') &&
      !nonIndexableGuidePaths.has(page) &&
      !nonIndexableStoryPaths.has(page),
  })],
});
