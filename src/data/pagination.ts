export const STORY_ARCHIVE_PAGE_SIZE = 30;

export function storyArchivePath(page: number): string {
  return page <= 1 ? '/masallar/' : `/masallar/sayfa/${page}/`;
}
