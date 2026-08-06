import { getCollection, type CollectionEntry } from 'astro:content';

export type ParentGuide = CollectionEntry<'guides'>;

export function parentGuidePath(guide: ParentGuide): string {
  return `/ebeveyn-rehberi/${guide.id}/`;
}

export async function getAllParentGuides(): Promise<ParentGuide[]> {
  const guides = await getCollection('guides');
  return guides.sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt)
    || a.data.title.localeCompare(b.data.title, 'tr'));
}

export async function getParentGuides(): Promise<ParentGuide[]> {
  const guides = await getAllParentGuides();
  return guides.filter((guide) => guide.data.editorialStatus === 'approved'
    && Boolean(guide.data.reviewedBy));
}
