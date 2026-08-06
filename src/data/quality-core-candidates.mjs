/**
 * Editorial candidate set for the first MasalNova quality core.
 *
 * Inclusion here means that a story receives a complete, story-specific
 * parent guide and a pedagogical review draft. It does not mean that the
 * story has passed the final human quality review. That release still
 * requires `qualityTier: core` and a real `qualityReviewedAt` value in the
 * story frontmatter.
 */
export const QUALITY_CORE_CANDIDATE_GROUPS = Object.freeze({
  egitici: Object.freeze([
    'kirk-kilitli-sandik',
    'zumruduankanin-uc-tuyu',
    'hansel-ile-gretel',
    'sedef-kiz-ile-denizin-bahcesi',
    'yedi-kardesler',
    'pinokyo',
    'alice',
    'pamuk-prenses-ve-yedi-cuceler',
    'uyuyan-guzel',
    'kulkedisi',
    'kirmizi-baslikli-kiz',
    'minik-cerenin-cesaret-koprusu',
    'deniz-midyesi-ve-berrinin-sirri',
    'terazi-dede-ve-iki-balikci',
    'onurun-seftalili-sepeti',
    'fistikin-emanet-fidani',
    'elmasin-bozuk-para-kavanozu',
    'dede-hikmetin-yagmurlu-kapisi',
    'nine-ferahatin-kislik-sandigi',
    'nisanin-kapali-kapisi',
  ]),
  hayvan: Object.freeze([
    'duman-ile-fiskenin-tohum-ambari',
    'firinci-kedi-ile-soz-veren-kuzu',
    'degirmendeki-renkli-konuk',
    'tilki-zeynonun-sabirli-hasadi',
    'batu-ile-civinin-deniz-kiyisi-solen',
    'iki-baykusun-bekleme-oyunu',
    'minik-bastankara-ile-sukur-magarasi',
    'bal-arisi-bibi-ile-kedi-pamukun-adil-payi',
    'ayi-bruno-ile-kopek-minnosun-ay-isigi-yolculugu',
    'sincap-fistik-ile-kaplumbaga-toprakin-bahce-gorevi',
    'caliskan-karinca',
    'pamuk-kedi-ile-minik-kuzunun-tirmanisi',
    'fildost-turnanin-deniz-kiyisi-atolyesi',
    'filos-ile-zipzipin-meyve-bahcesi',
    'yavas-kaplumbaga-ile-korkusuz-kedi',
    'kaplumbaga-tombul-ile-ari-zerrenin-pinar-senligi',
    'horoz-kirmizibey-ile-kedi-pamukun-adil-yarisi',
    'turuncu-tilki-ile-beyaz-kuzunun-semsiyesi',
    'merakci-baykus-pufun-karli-gecesi',
    'bal-arisi-sirmanin-nazik-sozu',
  ]),
  keloglan: Object.freeze([
    'keloglan-dev',
    'keloglanin-kaybolan-golgesi',
    'keloglan-ile-uc-altinlik-akil',
    'keloglan-ile-kosemenin-bereket-bahcesi',
    'keloglan-ile-dogruluk-degirmeni',
    'keloglan-ile-gulmeyen-sultan',
    'keloglan-ile-konusmayan-kuyu',
    'keloglanin-terlemez-kulahi',
    'keloglanin-ormandaki-yedi-dostu',
    'keloglanin-karli-yurekli-devi',
    'keloglanin-genis-cayirdaki-ekini',
    'keloglan-ve-yesil-ormanin-adalet-kusu',
    'keloglan-ve-terazinin-adil-sesi',
    'keloglanin-bekleyen-degirmen-tasi',
    'keloglanin-altin-basakli-sirri',
    'keloglanin-kirik-aynasi',
    'keloglanin-sabirli-bahcesi',
    'keloglan-ve-dagin-alcakgonullu-devi',
    'keloglanin-yedi-renkli-carsisi',
    'keloglanin-mis-kokulu-firin-sirri',
  ]),
});

export const QUALITY_CORE_CANDIDATE_IDS = Object.freeze(
  Object.values(QUALITY_CORE_CANDIDATE_GROUPS).flat(),
);
