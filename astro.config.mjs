// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import {
  isStoryContentSubstantial,
  markdownBodyFromSource,
  storyQualityContextFromSource,
} from './src/lib/story-quality.mjs';

const storyContentDirectory = new URL('./src/content/stories/', import.meta.url);
const nonIndexableStoryPaths = new Set(
  readdirSync(storyContentDirectory)
    .filter((name) => name.endsWith('.md'))
    .flatMap((name) => {
      const source = readFileSync(new URL(name, storyContentDirectory), 'utf8');
      const status = source.match(/^editorialStatus:\s*["']?([^\s"']+)/m)?.[1] ?? 'draft';
      const section = source.match(/^section:\s*["']?([^\s"']+)/m)?.[1] ?? 'masallar';
      const basePath = section === 'islami-hikayeler' ? '/islami-hikayeler/' : '/masallar/';
      const isIndexable = status === 'approved'
        && isStoryContentSubstantial(
          markdownBodyFromSource(source),
          storyQualityContextFromSource(source),
        );
      return isIndexable ? [] : [`https://masalnova.com${basePath}${name.replace(/\.md$/, '')}/`];
    }),
);

// https://astro.build
export default defineConfig({
  site: 'https://masalnova.com',
  // GitHub Pages serves this folder (main branch /docs)
  outDir: './docs',
  // clean URLs: /masallar/ -> masallar/index.html, /videolar/slug -> videolar/slug/index.html
  build: { format: 'directory' },
  image: { service: passthroughImageService() },
  integrations: [sitemap({
    filter: (page) =>
      page !== 'https://masalnova.com/story-index.json' &&
      page !== 'https://masalnova.com/oyna/masal-ipleri/' &&
      !page.startsWith('https://masalnova.com/ara/') &&
      !page.startsWith('https://masalnova.com/kitapligim/') &&
      !page.startsWith('https://masalnova.com/masallar/kategori/kisa/') &&
      !page.startsWith('https://masalnova.com/masallar/sayfa/') &&
      !/^https:\/\/masalnova\.com\/masallar\/kategori\/[^/]+\/sayfa\//.test(page) &&
      !/^https:\/\/masalnova\.com\/videolar\/[^/]+\/$/.test(page) &&
      !/^https:\/\/masalnova\.com\/boyama\/[^/]+\/boya\/$/.test(page) &&
      !page.startsWith('https://masalnova.com/games/') &&
      !nonIndexableStoryPaths.has(page),
  })],
});
