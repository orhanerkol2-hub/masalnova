// Prompt- und Kategorie-Bibliothek für die Märchen-Generierung.
// Sprache der Anweisungen: Deutsch/Englisch (Präzision); der Märchentext selbst ist Türkisch.

export const CATEGORIES = {
  keloglan: {
    label: 'Keloğlan Masalları',
    words: [400, 750],
    ages: ['5-7', '7-9'],
    color: '#ffb01f',
    emojis: ['🧒', '🌾', '🏰', '🌙', '⭐', '🪄', '🍎', '🐴', '👑'],
    guidance:
      'Klassisches anadolisches Keloğlan-Volksmärchen: der pfiffige, gutherzige, kahlköpfige Junge (Keloğlan). ' +
      'Abenteuer, Humor, lebendige Dialoge; Nebenfiguren wie Padişah, Dev, yaşlı kadın, komşular. ' +
      'Werte: Klugheit, Ehrlichkeit, Güte, Findigkeit. Volksmärchen-Rhythmus.',
    moral: true,
  },
  uyku: {
    label: 'Uyku Masalları',
    words: [250, 450],
    ages: ['3-5', '5-7'],
    color: '#7b5cff',
    emojis: ['🌙', '⭐', '🌟', '☁️', '🧸', '🌛', '😴', '🕯️', '🐑'],
    guidance:
      'Ruhiges Gute-Nacht-Märchen: sanft, wiegend, mit wiederholenden Rhythmen und beruhigenden Bildern ' +
      '(Mond, Sterne, Wolken, weiche Decken). KEINE Spannung, kein Streit, keine Angst. Endet friedlich mit ' +
      'dem Einschlafen. Statt einer harten Lehre ein warmer, schläfriger Schluss (z. B. „İyi geceler").',
    moral: false,
  },
  kisa: {
    label: 'Kısa Masallar',
    words: [150, 300],
    ages: ['3-5', '5-7', '7-9'],
    color: '#2f74e8',
    emojis: ['⏱️', '📖', '🌟', '🍀', '🎈', '🐞', '🌈', '🌼'],
    guidance:
      'Sehr kurzes Märchen: eine einzige Szene, eine klare kleine Handlung, eine schnelle Pointe. ' +
      'Kompakt und leicht verständlich.',
    moral: true,
  },
  egitici: {
    label: 'Eğitici Masallar',
    words: [320, 600],
    ages: ['5-7', '7-9'],
    color: '#3bb98b',
    emojis: ['🎓', '📚', '💡', '🔢', '🎨', '🌱', '🧩', '🐝'],
    guidance:
      'Lehrreiches Märchen mit einem klaren Wert/Lernthema. Am Ende darf eine kleine, freundliche ' +
      'Reflexionsfrage an das Kind stehen.',
    moral: true,
  },
  hayvan: {
    label: 'Hayvan Masalları',
    words: [300, 550],
    ages: ['3-5', '5-7', '7-9'],
    color: '#21b6c9',
    emojis: ['🦊', '🐰', '🦁', '🐻', '🐢', '🐦', '🐜', '🐘', '🐱', '🐶', '🐑', '🦉'],
    guidance:
      'Tierfabel: sprechende Tiere als Helden, verspielt und warmherzig, mit einer leichten Moral. ' +
      'Fabel-Motive (schlaues Tier, stolzes Tier, geduldiges Tier) sind willkommen.',
    moral: true,
  },
};

// Themen/Werte (Türkçe) — Inspiration für Einzigartigkeit.
export const VALUES = [
  'paylaşma', 'sabır', 'dürüstlük', 'cesaret', 'dostluk', 'yardımlaşma', 'çalışkanlık',
  'nezaket', 'merhamet', 'tutumluluk', 'saygı', 'hoşgörü', 'azim', 'alçakgönüllülük',
  'şükür', 'adalet', 'merak', 'sorumluluk', 'sözünde durmak', 'affetmek',
];

// Schauplätze/Motive.
export const MOTIFS = [
  'küçük bir köy', 'yemyeşil bir orman', 'dağ başındaki bir kulübe', 'deniz kıyısı',
  'kalabalık bir çarşı', 'eski bir değirmen', 'çiçekli bir bahçe', 'sakin bir göl',
  'gizemli bir mağara', 'ışıl ışıl bir saray', 'geniş bir çayır', 'karlı bir kış günü',
  'yağmurlu bir akşam', 'yıldızlı bir gökyüzü', 'serin bir pınar', 'mis kokulu bir fırın',
  'altın başaklı bir tarla', 'ay ışığında bir patika',
];

// Nebenfiguren (nicht-Keloğlan-Kategorien).
export const CHARACTERS = [
  'yaşlı bilge bir dede', 'meraklı küçük bir kız', 'cesur küçük bir çocuk', 'iyi kalpli bir çoban',
  'sabırlı bir balıkçı', 'güler yüzlü bir bahçıvan', 'şefkatli bir nine', 'yardımsever bir komşu',
];

// Tiere für Hayvan-Kategorie.
export const ANIMALS = [
  'tavşan', 'tilki', 'aslan', 'ayı', 'kaplumbağa', 'kuş', 'karınca', 'fil', 'kedi', 'köpek',
  'kirpi', 'baykuş', 'sincap', 'kelebek', 'arı', 'kuzu', 'horoz', 'ördek',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function makeSeed(categoryKey) {
  const cat = CATEGORIES[categoryKey];
  const value = pick(VALUES);
  const motif = pick(MOTIFS);
  const age = pick(cat.ages);
  let hero;
  if (categoryKey === 'keloglan') hero = 'Keloğlan';
  else if (categoryKey === 'hayvan') hero = `bir ${pick(ANIMALS)}${Math.random() < 0.5 ? ` ve bir ${pick(ANIMALS)}` : ''}`;
  else hero = pick(CHARACTERS);
  return { value, motif, age, hero };
}

export const STORY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string', description: 'Türkçe, kısa ve çekici masal başlığı' },
    shortDescription: { type: 'string', description: 'Tek cümlelik Türkçe özet (ebeveynler için)' },
    coverEmoji: { type: 'string', description: 'Masala uygun tek bir emoji' },
    themes: { type: 'array', items: { type: 'string' }, description: '1-3 Türkçe tema/değer' },
    characters: { type: 'array', items: { type: 'string' }, description: '1-3 ana karakter' },
    body: {
      type: 'string',
      description:
        'Masalın tam metni (Markdown). Kısa paragraflar. Merksatz varsa son satır "**Kıssadan hisse:** ..." biçiminde.',
    },
  },
  required: ['title', 'shortDescription', 'coverEmoji', 'themes', 'characters', 'body'],
};

export const SYSTEM_PROMPT = `Sen usta bir Türk çocuk masalı yazarısın. Görevin, çocuklara okunmak üzere ÖZGÜN, kaliteli ve güvenli TÜRKÇE masallar yazmak.

KURALLAR:
- Dil: akıcı, doğal, çağdaş Türkçe. Masal havası için "-mış'lı geçmiş zaman" kullan ("varmış", "yaşarmış"). İstersen "Bir varmış bir yokmuş, evvel zaman içinde..." gibi bir açılış kullan.
- Yaşa uygun kelime dağarcığı ve cümle uzunluğu. Kısa paragraflar (2-4 cümle).
- İçerik tamamen çocuk dostu: şiddet yok, korku yok, ölüm/yaralanma yok, olumsuz kalıp yargı yok. Sıcak, sevgi dolu ve umut verici.
- Her masal ÖZGÜN olmalı: verilen "esin" ipuçlarını aynen kopyalama, onlardan yola çıkarak yeni bir olay kur. Daha önce kullanılmış başlıkları tekrar etme.
- İstenen KELİME SAYISI aralığına uy (metnin gövdesi).
- Sadece istenen JSON'u üret; başka açıklama, önsöz veya meta yorum ekleme.`;

export function buildUserPrompt({ categoryKey, seed, wordRange, usedTitles }) {
  const cat = CATEGORIES[categoryKey];
  const [minW, maxW] = wordRange;
  const moralLine = cat.moral
    ? 'Masalın SON satırı bir öğüt olsun: "**Kıssadan hisse:** ..." biçiminde, tek cümle.'
    : 'Bu bir UYKU masalı: sonunda ağır bir ders/öğüt OLMASIN; onun yerine sıcak, uykulu bir kapanış cümlesi (ör. "İyi geceler") olsun. "Kıssadan hisse" YAZMA.';
  const usedBlock = usedTitles.length
    ? `\nDaha önce kullanılan başlıklar (bunları veya çok benzerlerini KULLANMA):\n${usedTitles.slice(-60).map((t) => `- ${t}`).join('\n')}`
    : '';
  const richness = minW >= 350
    ? ' Olayı birden fazla sahneye böl; diyaloglar, küçük engeller ve betimlemelerle zenginleştir ki metin bu uzunluğa ulaşsın.'
    : '';
  return `Kategori: ${cat.label}
Tür yönergesi: ${cat.guidance}
Yaş grubu: ${seed.age}
Kelime sayısı (gövde): ${minW}-${maxW} kelime. ÖNEMLİ: gövde EN AZ ${minW} kelime olmalı, daha kısa yazma.${richness}
Esin (kopyalama, ilham al): değer="${seed.value}", mekân="${seed.motif}", kahraman="${seed.hero}".
${moralLine}${usedBlock}

Şimdi bu kategoriye uygun, tamamen özgün bir çocuk masalı yaz ve SADECE şu şemaya uyan JSON döndür: {title, shortDescription, coverEmoji, themes[], characters[], body}.`;
}

// --- Hilfen ---
const TR_MAP = { ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u', â: 'a', î: 'i', û: 'u' };
export function slugify(input) {
  return (input || '')
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}
export function wordCount(text) {
  return (text || '').trim().split(/\s+/).filter(Boolean).length;
}
export function readingTimeFor(words) {
  return Math.max(1, Math.round(words / 130));
}
export function coverColorFor(categoryKey) {
  return CATEGORIES[categoryKey]?.color ?? '#2f74e8';
}
export function fallbackEmojiFor(categoryKey) {
  const e = CATEGORIES[categoryKey]?.emojis ?? ['📖'];
  return e[Math.floor(Math.random() * e.length)];
}
