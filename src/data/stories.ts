import { getCollection, type CollectionEntry } from 'astro:content';
import { durationBucketForMinutes } from './taxonomy';
import {
  isStoryContentSubstantial,
  isStoryDiscoveryEligible,
  isStoryIndexingEligible,
  storyWordCount,
} from '../lib/story-quality.mjs';

export type Story = CollectionEntry<'stories'>;

export const ISLAMIC_STORY_SECTION = 'islami-hikayeler' as const;
const QUALITY_CORE_RELEASED = import.meta.env.PUBLIC_QUALITY_CORE_REVIEWED === 'true';

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
 * Only approved and sufficiently complete stories for search-engine-indexable
 * collections. Internal discovery has a separate, deliberately broader feed.
 */
export async function getStories(): Promise<Story[]> {
  const all = await getAllStories();
  return all.filter((story) => {
    const substantial = isStoryContentSubstantial(story.body, story.data);
    return isStoryIndexingEligible({
      status: story.data.editorialStatus,
      substantial,
      qualityCoreReleased: QUALITY_CORE_RELEASED,
      words: storyWordCount(story.body),
      ...story.data,
    });
  });
}

/**
 * Approved stories that may be shown in MasalNova's internal discovery UI.
 * This does not make a story SEO-indexable or eligible for advertising.
 */
export async function getDiscoverableStories(): Promise<Story[]> {
  const all = await getAllStories();
  return all.filter((story) => {
    const substantial = isStoryContentSubstantial(story.body, story.data);
    return isStoryDiscoveryEligible({
      status: story.data.editorialStatus,
      substantial,
      words: storyWordCount(story.body),
      ...story.data,
    });
  });
}

/** Approved stories that belong to the Masallar catalogue. */
export async function getMasalStories(): Promise<Story[]> {
  const all = await getStories();
  return all.filter((story) => !isIslamicStory(story));
}

/** Internally discoverable stories in the Masallar catalogue. */
export async function getDiscoverableMasalStories(): Promise<Story[]> {
  const all = await getDiscoverableStories();
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
