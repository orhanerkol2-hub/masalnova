// Shared labels for stories & videos (kept simple & flat on purpose).

export const storyCategories = [
  { key: 'uyku', label: 'Uyku Masalları', emoji: '🌙', desc: 'Uyku öncesi sakin masallar' },
  { key: 'kisa', label: 'Kısa Masallar', emoji: '⏱️', desc: 'Birkaç dakikada biten masallar' },
  { key: 'egitici', label: 'Eğitici Masallar', emoji: '🎓', desc: 'Güzel bir ders veren masallar' },
  { key: 'hayvan', label: 'Hayvan Masalları', emoji: '🦊', desc: 'Sevimli hayvan kahramanlar' },
] as const;

export const ageGroups = [
  { key: '3-5', label: '3-5 yaş' },
  { key: '5-7', label: '5-7 yaş' },
  { key: '7-9', label: '7-9 yaş' },
] as const;

export const durationBuckets = [
  { key: 'kisa', label: '2 dk ve altı', max: 2 },
  { key: 'orta', label: '3-5 dk', max: 5 },
  { key: 'uzun', label: '5 dk üzeri', max: Infinity },
] as const;

export const videoCategories = [
  { key: 'sarkilar', label: 'Çocuk Şarkıları', emoji: '🎵' },
  { key: 'masal', label: 'Masal Videoları', emoji: '📖' },
  { key: 'egitici', label: 'Eğitici Videolar', emoji: '🎓' },
  { key: 'keloglan', label: 'Keloğlan Videoları', emoji: '🧒' },
  { key: 'hayvan', label: 'Hayvan Videoları', emoji: '🐾' },
] as const;

export function storyCategoryLabel(key: string): string {
  return storyCategories.find((c) => c.key === key)?.label ?? key;
}
export function videoCategoryLabel(key: string): string {
  return videoCategories.find((c) => c.key === key)?.label ?? key;
}
export function ageLabel(key: string): string {
  return ageGroups.find((a) => a.key === key)?.label ?? key;
}
export function durationBucketForMinutes(min: number): string {
  if (min <= 2) return 'kisa';
  if (min <= 5) return 'orta';
  return 'uzun';
}
