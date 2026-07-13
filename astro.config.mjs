// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://masalnova.com',
  // GitHub Pages serves this folder (main branch /docs)
  outDir: './docs',
  // clean URLs: /masallar/ -> masallar/index.html, /videolar/slug -> videolar/slug/index.html
  build: { format: 'directory' },
  image: { service: passthroughImageService() },
  integrations: [sitemap({
    filter: (page) => ![
      'https://masalnova.com/datenschutz/',
      'https://masalnova.com/impressum/',
    ].includes(page),
  })],
});
