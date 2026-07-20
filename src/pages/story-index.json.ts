import type { APIRoute } from 'astro';
import { getStories } from '../data/stories';
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
  const stories = await getStories();
  const items = stories.map(({ id, data }) => ({
    id,
    title: data.title,
    shortDescription: data.shortDescription,
    coverEmoji: data.coverEmoji,
    coverColor: data.coverColor,
    coverImage: data.coverImage,
    altText: data.altText ?? data.title,
    ageGroups: data.ageGroups,
    ageLabel: data.ageGroups[0] ? ageLabel(data.ageGroups[0]) : '',
    readingTime: data.readingTime,
    duration: durationBucketForMinutes(data.readingTime),
    categories: data.categories,
    categoryLabel: data.categories[0]
      ? storyCategoryLabel(data.categories[0])
      : 'Çocuk Masalı',
    hasAudio: Boolean(data.audioUrl),
  }));

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
