import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Written Turkish fairy tales. The Markdown body is the story text.
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    coverEmoji: z.string().default('📖'),
    coverColor: z.string().default('#2f74e8'),
    coverImage: z.string().optional(),
    altText: z.string().optional(),
    ageGroups: z.array(z.string()).default([]),
    readingTime: z.number().default(2),
    categories: z.array(z.string()).default([]),
    themes: z.array(z.string()).default([]),
    characters: z.array(z.string()).default([]),
    audioUrl: z.string().optional(),
    relatedVideoIds: z.array(z.string()).default([]),
    isFeatured: z.boolean().default(false),
    isPopular: z.boolean().default(false),
    isNew: z.boolean().default(false),
    isTodayStory: z.boolean().default(false),
    publishedAt: z.string(),
  }),
});

export const collections = { stories };
