import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Written Turkish stories. The Markdown body is the story text.
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    seoTitle: z.string().optional(),
    seoKeywords: z.array(z.string()).default([]),
    coverEmoji: z.string().default('📖'),
    coverColor: z.string().default('#2f74e8'),
    coverImage: z.string().optional(),
    altText: z.string().optional(),
    ageGroups: z.array(z.string()).default([]),
    audienceLabel: z.string().optional(),
    readingTime: z.number().default(2),
    section: z.enum(['masallar', 'islami-hikayeler']).default('masallar'),
    categories: z.array(z.string()).default([]),
    themes: z.array(z.string()).default([]),
    characters: z.array(z.string()).default([]),
    sourceType: z.enum(['quran', 'hadith', 'sira']).optional(),
    sourceCitation: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    audioUrl: z.string().optional(),
    relatedVideoIds: z.array(z.string()).default([]),
    isFeatured: z.boolean().default(false),
    isPopular: z.boolean().default(false),
    isNew: z.boolean().default(false),
    isTodayStory: z.boolean().default(false),
    author: z.enum(['aylin-karabektas', 'muhammet-karayigit']),
    reviewedBy: z.tuple([
      z.literal('aylin-karabektas'),
      z.literal('muhammet-karayigit'),
    ]),
    editorialStatus: z.enum(['draft', 'needs_review', 'approved']).default('draft'),
    publishedAt: z.string(),
    modifiedAt: z.string().optional(),
  }),
});

export const collections = { stories };
