import type { APIRoute } from 'astro';
import { getMasalStories, storyPath } from '../data/stories';
import {
  ageLabel,
  durationBucketForMinutes,
  storyCategoryLabel,
} from '../data/taxonomy';

export const prerender = true;

/**
 * Lightweight client-side discovery index.
 * Deliberately exposes card metadata only—never the Markdown story bodies.
 */
export const GET: APIRoute = async () => {
  const stories = await getMasalStories();
  const items = stories.map((story) => ({
    id: story.id,
    href: storyPath(story),
    section: story.data.section,
    title: story.data.title,
    shortDescription: story.data.shortDescription,
    coverEmoji: story.data.coverEmoji,
    coverColor: story.data.coverColor,
    coverImage: story.data.coverImage,
    altText: story.data.altText ?? story.data.title,
    ageGroups: story.data.ageGroups,
    ageLabel: story.data.audienceLabel ?? (story.data.ageGroups[0] ? ageLabel(story.data.ageGroups[0]) : ''),
    readingTime: story.data.readingTime,
    duration: durationBucketForMinutes(story.data.readingTime),
    categories: story.data.categories,
    themes: story.data.themes,
    characters: story.data.characters,
    seoKeywords: story.data.seoKeywords,
    categoryLabel: story.data.categories[0]
      ? storyCategoryLabel(story.data.categories[0])
      : 'Çocuk Masalı',
    hasAudio: Boolean(story.data.audioUrl),
  }));

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=60',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
