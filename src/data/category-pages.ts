export const CATEGORY_PAGE_SIZE = 24;

export type CategorySeoCopy = { title: string; heading: string; description: string; intro: string };

export const categorySeoCopy: Record<string, CategorySeoCopy> = {
  keloglan: {
    title: 'Keloğlan Masalları Oku – En Güzel Türk Masalları | MasalNova',
    heading: 'Keloğlan Masalları',
    description: 'Keloğlan masalları oku: Çocuklar için eğlenceli, öğretici ve ücretsiz Keloğlan hikâyelerini yaşa ve okuma süresine göre keşfedin.',
    intro: 'Keloğlan’ın zekâsı, iyi kalbi ve eğlenceli maceralarıyla tanışın. Bu seçkide çocukların hem keyifle okuyacağı hem de güzel değerler keşfedeceği Türkçe Keloğlan masalları bulunur.',
  },
  uyku: {
    title: 'Uyku Masalları Oku – Sakin Çocuk Hikâyeleri | MasalNova',
    heading: 'Uyku Masalları',
    description: 'Uyku masalları oku: Çocukların gece sakinleşmesine eşlik eden kısa, huzurlu ve ücretsiz uyku öncesi masalları keşfedin.',
    intro: 'Uyku öncesi birlikte geçirilen zamanı sakin bir aile ritüeline dönüştürün. Yumuşak anlatımlı gece masalları, çocukların hayal gücünü beslerken günü huzurlu biçimde tamamlamasına eşlik eder.',
  },
  kisa: {
    title: 'Kısa Masallar – MasalNova Kategori Arşivi',
    heading: 'Kısa Masal Kategorisi',
    description: 'MasalNova kısa masal kategorisindeki ücretsiz Türkçe çocuk hikâyelerini keşfedin. Süreye göre ana kısa masal seçkisine ulaşın.',
    intro: 'Bu kategori, kısa olarak etiketlenen hikâyeleri içerir. Gerçek okuma süresine göre hazırlanmış ana seçki için 1–2 dakikalık Kısa Masallar sayfasını kullanabilirsiniz.',
  },
  egitici: {
    title: 'Eğitici Masallar Oku – Değerler Eğitimi Hikâyeleri | MasalNova',
    heading: 'Eğitici Masallar',
    description: 'Eğitici masallar oku: Paylaşma, dürüstlük, sabır, dostluk ve sorumluluk temalı ücretsiz çocuk hikâyelerini keşfedin.',
    intro: 'Paylaşma, dürüstlük, sabır, dostluk ve sorumluluk gibi değerleri hikâyelerle keşfedin. Eğitici masallar doğrudan öğüt vermek yerine kahramanların seçimleri üzerinden düşünme alanı açar.',
  },
  hayvan: {
    title: 'Hayvan Masalları Oku – Eğitici Çocuk Hikâyeleri | MasalNova',
    heading: 'Hayvan Masalları',
    description: 'Hayvan masalları oku: Sevimli hayvan kahramanlarla dolu ücretsiz, eğlenceli ve öğretici Türkçe çocuk hikâyelerini keşfedin.',
    intro: 'Konuşan hayvanlar, renkli ormanlar ve sıcak dostluklarla dolu bir dünyaya adım atın. Hayvan masalları empati, yardımlaşma ve doğa sevgisi üzerine konuşmak için alan açar.',
  },
};

export function categoryPagePath(category: string, page: number): string {
  return page <= 1
    ? `/masallar/kategori/${category}/`
    : `/masallar/kategori/${category}/sayfa/${page}/`;
}
