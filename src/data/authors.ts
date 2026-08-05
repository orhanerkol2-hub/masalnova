export const STORY_AUTHOR_IDS = ['aylin-karabektas', 'muhammet-karayigit'] as const;

export type StoryAuthorId = (typeof STORY_AUTHOR_IDS)[number];

export type StoryAuthor = {
  id: StoryAuthorId;
  name: string;
  role: string;
  shortBio: string;
  bio: string[];
  profilePath: string;
};

export const storyAuthors: Record<StoryAuthorId, StoryAuthor> = {
  'aylin-karabektas': {
    id: 'aylin-karabektas',
    name: 'Aylin Karabektaş',
    role: 'Yazar ve editör',
    shortBio: 'İstanbul’da yaşayan, Germanistik (Alman Dili ve Edebiyatı) okuyan yazar ve editör.',
    bio: [
      'Aylin Karabektaş İstanbul’da yaşıyor ve Germanistik (Alman Dili ve Edebiyatı) okuyor. Zaman zaman masal yazımı projelerinde çalışıyor.',
      'MasalNova’da masal hazırlıyor ve yayımlanan hikâyelerin editoryal incelemesinde Muhammet Karayiğit ile birlikte görev alıyor.',
    ],
    profilePath: '/yazarlar/aylin-karabektas/',
  },
  'muhammet-karayigit': {
    id: 'muhammet-karayigit',
    name: 'Muhammet Karayiğit',
    role: 'Yazar ve editör',
    shortBio: 'MasalNova yazarı; dil, anlatım bütünlüğü, yaş ve süre etiketlerini inceleyen editör.',
    bio: [
      'Muhammet Karayiğit, MasalNova’da yazar ve editör olarak görev alıyor.',
      'Yayımlanan her masalı Aylin Karabektaş ile birlikte; dil, anlatım bütünlüğü, yaş ve süre etiketleri ile metin-kapak uyumu açısından gözden geçiriyor.',
    ],
    profilePath: '/yazarlar/muhammet-karayigit/',
  },
};

export const storyReviewers = STORY_AUTHOR_IDS.map((id) => storyAuthors[id]);

export function getStoryAuthor(id: StoryAuthorId): StoryAuthor {
  return storyAuthors[id];
}
