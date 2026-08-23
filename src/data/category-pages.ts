export const CATEGORY_PAGE_SIZE = 24;

export type CategoryFaq = { question: string; answer: string };

export type CategorySeoCopy = {
  title: string;
  heading: string;
  description: string;
  intro: string;
  minimumIndexableStories?: number;
  guide?: {
    title: string;
    paragraphs: string[];
    checklist?: string[];
  };
  faqs?: CategoryFaq[];
};

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
    description: 'Uyku masalları oku: Yaşa, süreye ve anlatım tonuna göre seçilmiş sakin, ücretsiz Türkçe çocuk hikâyelerini keşfedin ve birlikte okumaya başlayın.',
    intro: 'Uyku öncesi birlikte geçirilen zamanı sakin bir aile ritüeline dönüştürün. Bu seçkide yalnızca yayıma uygunluğu kontrol edilmiş, yumuşak anlatımlı gece masalları yer alır; kartlardaki yaş ve okuma süresi bilgileri o akşama uygun hikâyeyi seçmenize yardım eder.',
    minimumIndexableStories: 12,
    guide: {
      title: 'Uyku öncesi masal nasıl seçilir?',
      paragraphs: [
        'Önce çocuğun yaşından çok o akşamki enerji düzeyine bakın. Hareketli bir günün ardından tanıdık kahramanları ve düşük gerilimli bir olay örgüsünü seçmek, yeni ve yoğun bir maceradan daha rahat takip edilebilir olabilir. Karttaki süre, birlikte okuma için yaklaşık bir plan sunar; masalı hızlı bitirmek zorunda değilsiniz.',
        'Masal uyumayı garanti eden bir yöntem değildir. Asıl amaç, günün hızını azaltan öngörülebilir bir geçiş kurmaktır. Aynı saatte ışığı yumuşatmak, çocuğa iki masal arasından seçim hakkı vermek ve okuma sonrasında yeni bir etkinlik başlatmamak bu geçişi sade tutar.',
        'Çocuk aynı hikâyeyi tekrar isterse değiştirmek gerekmez. Tekrar, olayların sırada ne geleceğini bilmesini sağlar ve birlikte okuma anını daha güvenli hissettirebilir. Çocuk huzursuz olduğunda metni kısaltabilir, bir sonraki gece kaldığınız yerden devam edebilirsiniz.',
      ],
      checklist: [
        'Yaş etiketini ve yaklaşık okuma süresini birlikte kontrol edin.',
        'O gece için sakin, tanıdık ve düşük gerilimli bir konu seçin.',
        'Okuma sonunda tek bir kısa soru sorun; sohbeti sınava çevirmeyin.',
        'Çocuk yorulduysa masalı bitirmek yerine doğal bir yerde durun.',
      ],
    },
    faqs: [
      {
        question: 'Uyku masalı kaç dakika sürmeli?',
        answer: 'Tek bir ideal süre yoktur. Küçük çocuklar veya yorgun akşamlar için kısa bir masal, daha sakin ve dikkatli akşamlarda ise birkaç bölümden oluşan daha uzun bir hikâye seçilebilir. Kartlardaki yaklaşık okuma süresini başlangıç noktası olarak kullanın.',
      },
      {
        question: 'Her gece aynı uyku masalını okumak uygun mu?',
        answer: 'Evet. Çocuğun sevdiği bir hikâyeyi tekrar istemesi olağandır. Tanıdık olay sırası, çocuğun anlatıya katılmasını ve masal saatinin öngörülebilir olmasını kolaylaştırabilir. Zaman zaman iki tanıdık masal arasından seçim sunabilirsiniz.',
      },
      {
        question: 'Uyku masalında hangi konulardan kaçınmak gerekir?',
        answer: 'Çocuğu o anda yoğun biçimde heyecanlandıran, korkutan veya uzun açıklamalar gerektiren konuları başka bir saate bırakmak daha iyi olabilir. Yaş etiketinin yanında çocuğun kişisel hassasiyetini ve o gün yaşadıklarını da dikkate alın.',
      },
      {
        question: 'Çocuk masal bitmeden uyumazsa ne yapılmalı?',
        answer: 'Masalı bir uyku testi gibi kullanmayın. Hikâye bittiğinde kısa bir iyi geceler cümlesiyle rutini tamamlayabilirsiniz. Sürekli uyku güçlüğü veya aileyi zorlayan bir durum varsa masal seçiminin ötesinde, uygun bir sağlık uzmanından destek almak gerekir.',
      },
    ],
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
  'islami-hikayeler': {
    title: 'Dini Hikâyeler – Çocuklar İçin İslami Kıssalar | MasalNova',
    heading: 'İslami Hikâyeler',
    description: "Çocuklar için kaynaklı dini hikâyeler ve İslami kıssalar: Kur'an-ı Kerim, güvenilir hadis ve siyer kaynaklarına dayanan yaşa uygun anlatıları okuyun.",
    intro: "Çocuklar için dini hikâyeler arayan ailelere; merhamet, sabır, şükür ve Allah'a güven gibi değerleri kaynaklı İslami kıssalarla anlatan özenli bir seçki. Metinler çocukların yaşına göre sadeleştirildi; kaynakta bulunmayan ayrıntılar ayıklandı ve kutsal kişiler görsellerde tasvir edilmedi.",
  },
};

export function categoryPagePath(category: string, page: number): string {
  if (category === 'islami-hikayeler') {
    return page <= 1 ? '/islami-hikayeler/' : `/islami-hikayeler/sayfa/${page}/`;
  }
  return page <= 1
    ? `/masallar/kategori/${category}/`
    : `/masallar/kategori/${category}/sayfa/${page}/`;
}

/** Preferred destination for internal category links and canonical hints. */
export function categoryPreferredPath(category: string): string {
  return category === 'kisa'
    ? '/masallar/sure/kisa/'
    : categoryPagePath(category, 1);
}
