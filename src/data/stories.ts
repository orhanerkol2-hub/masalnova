import { getCollection, type CollectionEntry } from 'astro:content';
import { durationBucketForMinutes } from './taxonomy';
import { isStoryContentSubstantial } from '../lib/story-quality.mjs';

export type Story = CollectionEntry<'stories'>;

export const ISLAMIC_STORY_SECTION = 'islami-hikayeler' as const;

export function isIslamicStory(story: Story): boolean {
  return story.data.section === ISLAMIC_STORY_SECTION;
}

export function storyPath(story: Story): string {
  return isIslamicStory(story)
    ? `/islami-hikayeler/${story.id}/`
    : `/masallar/${story.id}/`;
}

/** Every story, including editorial drafts, newest first. */
export async function getAllStories(): Promise<Story[]> {
  const all = await getCollection('stories');
  return all.sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt));
}

/**
 * Only approved and sufficiently complete stories for public collections.
 * Short archive pages remain reachable, but stay out of discovery until revised.
 */
export async function getStories(): Promise<Story[]> {
  const all = await getAllStories();
  return all.filter((story) => story.data.editorialStatus === 'approved'
    && isStoryContentSubstantial(story.body, story.data));
}

/** Approved stories that belong to the Masallar catalogue. */
export async function getMasalStories(): Promise<Story[]> {
  const all = await getStories();
  return all.filter((story) => !isIslamicStory(story));
}

/** Approved stories in the standalone İslami Hikâyeler section. */
export async function getIslamicStories(): Promise<Story[]> {
  const all = await getStories();
  return all.filter(isIslamicStory);
}

export function storyById(stories: Story[], id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function storiesByCategory(stories: Story[], key?: string | null): Story[] {
  if (!key) return stories;
  return stories.filter((s) => s.data.categories.includes(key));
}

export function popularStories(stories: Story[], n = 6): Story[] {
  const pop = stories.filter((s) => s.data.isPopular);
  return (pop.length ? pop : stories).slice(0, n);
}

export function newStories(stories: Story[], n = 6): Story[] {
  const fresh = stories.filter((s) => s.data.isNew);
  return (fresh.length ? fresh : stories).slice(0, n);
}

export function todayStory(stories: Story[]): Story | undefined {
  return stories.find((s) => s.data.isTodayStory) ?? stories[0];
}

export function storyCount(stories: Story[], key: string): number {
  return stories.filter((s) => s.data.categories.includes(key)).length;
}

export type StoryFilter = { yas?: string; sure?: string; tur?: string };

/** Matches the client-side filter logic; used only for SSG counts if needed. */
export function filterStories(stories: Story[], f: StoryFilter): Story[] {
  return stories.filter((s) => {
    if (f.tur && !s.data.categories.includes(f.tur)) return false;
    if (f.yas && !s.data.ageGroups.includes(f.yas)) return false;
    if (f.sure && durationBucketForMinutes(s.data.readingTime) !== f.sure) return false;
    return true;
  });
}
