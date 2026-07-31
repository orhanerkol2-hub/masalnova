export const gamepixPublisherSid = '58EIS';

export const games = [
  {
    slug: 'kobadoo-sekiller',
    sourceSlug: 'kobadoo-shapes',
    title: 'Kobadoo Şekiller',
    category: 'Hafıza',
    age: 'Öneri: 7+',
    image: '/games/kobadoo-sekiller.jpg',
    imageAlt: 'Kobadoo Şekiller hafıza oyunu kapak görseli',
    shortDescription: 'Şekilleri aklında tut, doğru sırayı bul ve hafızanı adım adım güçlendir.',
    description:
      'Kısa süre gösterilen şekilleri dikkatle incele ve kaybolduklarında doğru sırayla seç. Bölümler ilerledikçe hatırlanacak şekil sayısı artar. Yazı okumaya dayanmayan yapısıyla farklı cihazlarda kolayca oynanabilir.',
    controls: 'Bilgisayarda fareyle, telefon ve tablette dokunarak oynanır.',
    skills: ['Görsel hafıza', 'Dikkat', 'Sıralama'],
  },
  {
    slug: 'kobadoo-sayilar',
    sourceSlug: 'kobadoo-numbers',
    title: 'Kobadoo Sayılar',
    category: 'Hafıza',
    age: 'Öneri: 7+',
    image: '/games/kobadoo-sayilar.jpg',
    imageAlt: 'Kobadoo Sayılar hafıza oyunu kapak görseli',
    shortDescription: 'Sayı dizilerini hatırla, doğru sırayla seç ve her turda yeni bir adım ekle.',
    description:
      'Ekranda görünen sayı dizisini aklında tut ve sayılar gizlendikten sonra doğru sırayı yeniden kur. Kısa turlar, odaklanma ve çalışma belleğini eğlenceli biçimde çalıştırır.',
    controls: 'Bilgisayarda fareyle, telefon ve tablette dokunarak oynanır.',
    skills: ['Sayılar', 'Çalışma belleği', 'Odaklanma'],
  },
  {
    slug: 'robot-grubu-farklari-bul',
    sourceSlug: 'robot-band-find-the-differences',
    title: 'Robot Grubu: Farkları Bul',
    category: 'Dikkat',
    age: 'Öneri: 6+',
    image: '/games/robot-grubu-farklari-bul.jpg',
    imageAlt: 'Robot Grubu Farkları Bul oyunu kapak görseli',
    shortDescription: 'Sevimli robotların sahnelerini karşılaştır ve küçük farkları zamanında yakala.',
    description:
      'İki robot sahnesini yan yana karşılaştır, renklerde ve nesnelerde saklanan farkları bul. Sakin tempolu görsel bulmaca; ayrıntı fark etme ve dikkat becerilerini destekler.',
    controls: 'Bulduğun farka fareyle tıkla veya ekrana dokun.',
    skills: ['Görsel dikkat', 'Karşılaştırma', 'Ayrıntı fark etme'],
  },
  {
    slug: 'sokoballs',
    sourceSlug: 'sokoballs',
    title: 'Sokoballs',
    category: 'Bulmaca',
    age: 'Öneri: 8+',
    image: '/games/sokoballs.jpg',
    imageAlt: 'Sokoballs mantık oyunu kapak görseli',
    shortDescription: 'Topları doğru hedeflere taşı; hamlelerini önceden düşünüp yolu açık bırak.',
    description:
      'Klasik itme bulmacalarından esinlenen Sokoballs oyununda topları hedef alanlara ulaştır. Bir topu yanlış köşeye sıkıştırmamak için her hamleyi önceden planlamak gerekir.',
    controls: 'Yön tuşlarıyla veya ekrandaki dokunmatik kontrollerle hareket et.',
    skills: ['Mantık', 'Planlama', 'Problem çözme'],
  },
  {
    slug: 'pota-ve-meyveler',
    sourceSlug: 'hoops-fruits',
    title: 'Pota ve Meyveler',
    category: 'Beceri',
    age: 'Öneri: 7+',
    image: '/games/pota-ve-meyveler.jpg',
    imageAlt: 'Pota ve Meyveler beceri oyunu kapak görseli',
    shortDescription: 'Meyveleri potadan geçir, doğru zamanı yakala ve seri atışlarla puanını yükselt.',
    description:
      'Renkli meyveleri doğru açı ve zamanlamayla potadan geçirmeye çalış. Kısa ve hareketli turlar el-göz koordinasyonu ile zamanlama becerisini çalıştırır.',
    controls: 'Atış yapmak için fareyi veya dokunmatik ekranı kullan.',
    skills: ['Zamanlama', 'El-göz koordinasyonu', 'Odaklanma'],
  },
];

export function gameEmbedUrl(game, sid = gamepixPublisherSid) {
  return `https://play.gamepix.com/${game.sourceSlug}/embed?sid=${encodeURIComponent(sid)}`;
}

export function getGame(slug) {
  return games.find((game) => game.slug === slug);
}
