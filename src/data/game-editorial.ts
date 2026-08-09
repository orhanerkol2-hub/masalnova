export type GameEditorial = {
  overview: string;
  play: string;
  tips: string[];
  parent: string;
};

export const gameEditorial: Record<string, GameEditorial> = {
  'dino-buz-cicekleri': {
    overview: 'Dino Ateşi: Üç Dünya, aynı hareketi tekrarlamak yerine üç farklı beceriyi sırayla kullanan kısa bir macera oyunudur. Güneş Vadisi nişan almayı öğretir, Kristal Orman beş konumluk bir ışık sırasını hatırlatır, Volkan Tapınağı ise hareketli göstergede doğru anı yakalamayı ister. Pofi’nin ateşi her dünyada zarar vermek yerine çiçekleri, kristalleri ve dinozor yumurtalarını uyandırır.',
    play: 'Hedefe dokun ve beyaz yolu kontrol et. İlk dünyada ÜFLE düğmesi seçili çiçeği açar. İkinci dünyada kristallerin parladığı sırayı izle ve onları aynı sırayla YAK. Finalde beyaz çizgi yeşil alana ulaştığında ISIT düğmesine bas. Üç ateş enerjisi bitse bile tamamlanan hedefler silinmez; kısa bir dinlenmeden sonra haklar yenilenir.',
    tips: ['Kristal sırasını tek tek değil, yukarı–aşağı veya sağ–sol gibi küçük bir rota olarak hatırla.', 'Volkan dünyasında düğmeye göstergenin yeşile gireceğini tahmin ederek dokun; tam ortayı beklemek zorunda değilsin.', 'Ok tuşları hedef değiştirir, Enter veya boşluk ateşi kullanır ve R dünyayı yeniler.'],
    parent: 'Oyun yaklaşık 6–7 yaş için okunabilir kısa yönergeler, görsel tekrar ve affedici denemeler sunar. Yanlış hamle enerji azaltır ama kazanılmış ilerlemeyi geri almaz. Böylece hafıza ve zamanlama gerçekten devreye girerken başarısızlık duygusu büyümez; reklam, satın alma, sohbet veya kişisel veri toplama yoktur.',
  },
  'ay-isigi-bahcesi': {
    overview: 'Ay Işığı Bahçesi, ipleri doğru zamanda kesmeye dayanan üç bölümlük sakin bir fizik bulmacasıdır. Amaç, ay damlasını Mimo’nun beklediği çiçeğe ulaştırırken bölümdeki üç yıldızı da toplamaktır. Her bölüm yeni bir düzen kurar; bu yüzden yalnızca hızlı davranmak değil, damlanın izleyeceği yolu önceden düşünmek gerekir.',
    play: 'Fareyi ya da parmağını ipin üzerinden geçirerek ipi kes. Damla salınırken yönünü, rüzgârı ve zıplama yüzeylerini izle. Yanlış bir hamlede bölüm hemen yeniden denenebilir. Önce yıldızların konumuna bakmak, ardından hangi ipin ilk kesileceğine karar vermek en güvenli yöntemdir.',
    tips: ['İpleri art arda kesmeden önce damlanın salınımını bekle.', 'Üç yıldızı tek denemede almak zorunda değilsin; önce çıkışı öğren.', 'Küçük ekranda daha kontrollü bir kesiş için parmağını kısa ve düz hareket ettir.'],
    parent: 'Oyun süre baskısı kurmaz ve okuma gerektirmeden neden-sonuç ilişkisini gösterir. Bir yetişkin, çözümü söylemek yerine “Damla şimdi hangi yöne gider?” diye sorarak çocuğun tahmin yürütmesine eşlik edebilir.',
  },
  'bulut-firini': {
    overview: 'Bulut Fırını, yıldız çöreğini Pofur’un hasır sepetine indirmeyi amaçlayan üç aşamalı bir fizik oyunudur. Çörek iplere bağlı olarak sallanır; sıcak hava akımları, hareketli parçalar ve un yıldızları her bölümde farklı bir rota oluşturur. Başarılı olmak için hareketi izlemek ve kesme sırasını planlamak gerekir.',
    play: 'İpi kesmek için fareyi veya parmağını ipin üzerinden kaydır. Çöreğin sepet yönüne dönmesini bekle, sonra bir sonraki bağı serbest bırak. Yolda bulunan üç un yıldızı isteğe bağlı ek hedeftir. Çörek hedefi kaçırırsa bölümü yeniden başlatabilir ve başka bir sıra deneyebilirsin.',
    tips: ['İlk hamleden önce bütün ipleri ve sepetin yerini incele.', 'Sallanan çöreği en uç noktada bırakmak daha geniş bir hareket sağlar.', 'Bir yıldız zor görünüyorsa önce bölümü tamamlayıp rotayı öğren.'],
    parent: 'Kısa bölümler, deneme-yanılma ve sıralama becerisini destekleyen ortak oyun anları sunar. Yetişkinler çocuğun yerine kesmek yerine hangi hareketin çöreği yükselteceğini veya yavaşlatacağını birlikte konuşabilir.',
  },
  'kristal-saray': {
    overview: 'Kristal Saray’da Kurbağa Prens Mirza’nın kuruyan çeşmesini yeniden çalıştırmak için su incisini üç saray bulmacasından geçirmek gerekir. Büyülü asmalar, kristal yıldızlar ve hareketli yüzeyler her aşamada farklı davranır. Oyun refleks kadar gözlem ister; incinin düşeceği noktayı önceden kestirmek çözümün önemli parçasıdır.',
    play: 'Asmayı kesmek için parmağını ya da fareyi ipin üzerinde sürükle. İnci sallanırken hemen ikinci hamleyi yapmak yerine yönünün değişmesini bekle. Üç yıldızı topladıktan sonra inciyi çeşmeye ulaştır. Başarısız denemeler ceza vermez; aynı bölümü farklı bir kesme sırasıyla yeniden çözebilirsin.',
    tips: ['Çeşmenin konumunu bulup rotayı sondan başa doğru düşün.', 'Hareketli yüzeyin uygun konuma gelmesini beklemek bazen en iyi hamledir.', 'İnci hızlandıysa yeni bir ip kesmeden önce hareketini takip et.'],
    parent: 'Reklamsız ve süre sınırı olmayan yapı, çocuğun kendi hızında düşünmesine uygundur. Birlikte oynarken “Önce hangisini denemek istersin?” gibi açık sorular, tek doğruyu doğrudan göstermekten daha yararlıdır.',
  },
  'keloglan-yildiz-pesinde': {
    overview: 'Keloğlan: Yıldız Peşinde, Anadolu köy yolunda ilerleyen sonsuz koşu oyunudur. Keloğlan otomatik koşar; oyuncu testilerden kaçmak, farklı yüksekliklerdeki yıldızları toplamak ve üç canı mümkün olduğunca uzun korumak için zıplamaları yönetir. Yol uzadıkça tempo artar ve engeller daha dikkatli zamanlama ister.',
    play: 'Ekrana dokun, fareyle tıkla veya boşluk tuşuna basarak zıpla. Havada üç ek sıçrama yapılabildiği için yüksek yıldız dizilerine ulaşabilir ya da geç fark edilen bir engeli aşabilirsin. Her yıldız 10 puan kazandırır. Üç can bittiğinde tur sona erer ve yeni bir rekor denenebilir.',
    tips: ['Bütün sıçramaları hemen kullanma; inişi düzeltmek için birini sakla.', 'Yıldız uğruna testiye yaklaşmak yerine güvenli hattı seç.', 'Hız arttığında Keloğlan’a değil, ekranın sağındaki yaklaşan engellere bak.'],
    parent: 'Oyun kısa turlarla el-göz koordinasyonu ve zamanlama pratiği sağlar. Puan yalnızca kullanılan cihazda saklanır; hesap açma, sohbet veya oyun içi satın alma bulunmaz. Yorulma başladığında tur arası vermek daha sağlıklı bir deneyim sağlar.',
  },
  'horozumu-kacirdilar': {
    overview: 'Horozumu Kaçırdılar, köy damlarının üzerinde geçen hızlı bir takip oyunudur. Oyuncu Nine’yi yönlendirerek kaçan horozun peşinden gider, mısırları toplar ve bacalara çarpmadan mesafeyi uzatır. Yol giderek hızlandığı için doğru anda zıplamak ve turbo enerjisini uygun yerde kullanmak önem kazanır.',
    play: 'Dokunma, fare tıklaması veya boşluk tuşu Nine’yi zıplatır; havadayken ikinci kez basmak çift zıplama yapar. Shift tuşu ya da ekrandaki Hızlan düğmesi dolu turbo göstergesini kullanır. Mısırlar puan kazandırır, engelle çarpışmak ise can kaybettirir. Tur bitince hemen yeniden başlanabilir.',
    tips: ['Çift zıplamayı uzun baca dizileri için sakla.', 'Turbo sırasında engeller daha hızlı yaklaşır; yolu gördüğün anda kullan.', 'Her mısırı toplamak yerine canı koruyan güvenli sıçramaya öncelik ver.'],
    parent: 'Kısa ve tekrarlanabilir turlar refleks çalıştırırken başarısızlığı büyütmeden yeniden deneme fırsatı verir. Yetişkinler yüksek puan baskısı kurmak yerine çocuğun kendi gelişimini fark etmesine yardımcı olabilir. Oyun hesap, sohbet ve satın alma içermez.',
  },
  'keloglan-masal-hafizasi': {
    overview: 'Keloğlan Masal Hafızası, kapalı kartların altındaki aynı masal kahramanlarını eşleştirmeye dayanan bir hafıza oyunudur. Bölüm başlangıcında kartlar kısa süre görünür; ardından oyuncu konumları hatırlayarak çiftleri açar. İlerleyen bölümlerde kart sayısı artar ve görsel belleği daha planlı kullanmak gerekir.',
    play: 'Bir kartı açmak için dokun veya tıkla, ardından eşini düşündüğün ikinci kartı seç. Görseller aynıysa çift açık kalır; farklıysa kısa süre sonra kapanır. Her bölümde bir kez kullanılabilen ipucu kartları yeniden gösterir. Amaç, mümkün olduğunca az denemeyle bütün çiftleri bulmaktır.',
    tips: ['Kartlar ilk gösterildiğinde tek tek değil, köşeler ve sıralar halinde hatırla.', 'Yeni açılan görselin eşini bilmiyorsan konumunu sesli olarak adlandır.', 'İpucunu hemen değil, birkaç bilinmeyen çift kaldığında kullan.'],
    parent: 'Okuma zorunluluğu olmayan oyun, görsel dikkat ve çalışma belleği için sakin bir alıştırmadır. Bir yetişkin kartların yerini söylemeden karakterleri adlandırabilir veya çocuğun kullandığı hatırlama yöntemini anlatmasını isteyebilir. Kişisel veri ya da çevrim içi skor tablosu kullanılmaz.',
  },
  'keloglan-masal-yolu': {
    overview: 'Keloğlan Masal Yolu, Keloğlan ile Karakaçan’ın üç boyutlu bir Anadolu yolunda ilerlediği macera oyunudur. Oyuncu sağa sola geçerek engellerden kaçınır, zıplar ve yol üzerindeki masal öğelerini toplar. Değişen yol düzeni, ileriyi izlemeyi ve doğru şeridi zamanında seçmeyi gerektirir.',
    play: 'Bilgisayarda yön tuşları veya A ve D ile şerit değiştir, boşlukla zıpla. Telefonda ekrandaki yön ve zıplama düğmelerini kullan. Hareket komutunu engelin hemen yanında değil biraz önceden vermek daha güvenlidir. Tam ekran düğmesi, özellikle telefonda oyun alanını daha rahat görmeyi sağlar.',
    tips: ['Bakışını karakterde değil yolun ilerleyen bölümünde tut.', 'Arka arkaya gelen engellerde gereksiz şerit değişiminden kaçın.', 'Mobilde önce tam ekranı açıp cihazı rahat tuttuğundan emin ol.'],
    parent: 'Oyun yön bulma, tepki verme ve mekânsal takip becerilerini bir araya getirir. Küçük çocuklar ilk turda kontrolleri bir yetişkinle deneyebilir. Oyun içinde reklam, sohbet, hesap oluşturma veya satın alma yoktur; ara verme zamanını aile belirleyebilir.',
  },
  'keloglan-on-kapili-saray': {
    overview: 'Keloğlan: On Kapılı Saray, birbirinden farklı on kapının ardında kısa mantık ve dikkat görevleri sunan hikâyeli bir bulmaca oyunudur. Sembol dizileri, hafıza denemeleri, desenler ve kilim labirenti gibi görevler aynı beceriyi tekrarlamak yerine oyuncudan yeni kuralları okuyup uygulamasını ister.',
    play: 'Her kapıda önce ekrandaki masal ipucunu oku, sonra sembollere veya hareket alanına dokun. Bazı görevlerde doğru sırayı hatırlamak, bazılarında yolu planlamak gerekir. Çözülen kapılar mühür kazandırır ve yeni bölümü açar. Acele etmek yerine görevin kuralını anlamak en etkili başlangıçtır.',
    tips: ['Gösterilen diziyi renk, şekil veya konuma göre küçük gruplara ayır.', 'Labirentte hareket etmeden önce çıkışa giden yolu gözünle takip et.', 'Yanlış denemede rastgele seçim yapmak yerine değişen ipucunu yeniden oku.'],
    parent: 'Farklı görev türleri dikkat, kısa süreli hafıza ve problem çözmeyi sırayla çalıştırır. Okumaya yeni başlayan çocuklarda yetişkin yalnızca yönergeyi seslendirebilir; çözümü çocuğun bulmasına alan bırakmak oyunun asıl yararını korur.',
  },
  'keloglan-ucan-tohumlar': {
    overview: 'Keloğlan: Uçan Tohumlar, tohum toplarını sapanla doğru saksılara göndermeyi amaçlayan bir nişan ve fizik oyunudur. Üç Anadolu bahçesinde mesafe, açı ve engeller değişir. Beyaz noktalı tahmin çizgisi ilk yönü gösterse de topun düşüşünü hesaba katmak ve atışı buna göre ayarlamak gerekir.',
    play: 'Tohum topunu parmakla ya da fareyle geriye çek; yön çizgisini saksıya çevirdikten sonra bırak. Çok güçlü atış hedefi aşabilir, zayıf atış ise engelin önünde kalabilir. Her bölümde deneme yaparak uygun açı ve gücü bul. Başarılı atışlar bahçedeki saksıları çiçeklendirir.',
    tips: ['İlk atışı ölçüm olarak kullan ve ikinci atışta küçük düzeltme yap.', 'Yakın saksılarda topu fazla geriye çekme.', 'Engelin üzerinden aşarken yalnız yatay yönü değil yayın yüksekliğini de izle.'],
    parent: 'Oyun, sonuçların kuvvet ve açıyla nasıl değiştiğini görsel olarak deneyimletir; bir fizik dersi yerine merak uyandıran kısa bir etkinlik olarak düşünülebilir. “Daha güçlü atarsak ne değişir?” sorusu çocuğun tahmin kurmasına yardımcı olur.',
  },
  'nasrettin-hoca-pizza': {
    overview: 'Nasrettin Hoca Pizza, köy fırınına gelen siparişleri doğru malzemelerle hazırlamaya dayanan zaman yönetimi oyunudur. Her müşteri farklı bir pizza ister; oyuncu fişi okuyup malzemeleri seçer, pizzayı fırına verir ve yeni siparişe geçer. Doğru ve art arda tamamlanan siparişler kombo puanını büyütür.',
    play: 'Önce müşteri fişindeki malzemeleri dikkatle incele. Malzemeye dokun veya onu hamurun üzerine sürükle; gerekenlerin tamamı yerleşince pizzayı fırına gönder. Yanlış seçim zaman kaybettirebilir. Sipariş süresi dolmadan doğru pizzayı teslim etmek puan ve zaman bonusu kazandırır.',
    tips: ['Malzemeleri seçmeden önce fişi bir kez baştan sona kontrol et.', 'Benzer görünen siparişlerde eksik malzemeyi özellikle karşılaştır.', 'Hızlanmadan önce doğruluğa odaklan; doğru seriler daha değerli kombo oluşturur.'],
    parent: 'Oyun görsel eşleştirme, sıralı işlem ve zaman içinde karar verme pratiği sunar. Küçük oyuncularda ilk siparişleri birlikte okumak yeterlidir; sonrasında kontrolü çocuğa bırakmak bağımsız denemeyi destekler. Gerçek para, satın alma veya dış bağlantı bulunmaz.',
  },
};
