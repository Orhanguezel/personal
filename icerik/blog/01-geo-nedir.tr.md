---
title: "GEO Nedir? Yapay Zekâ Aramasında Çıkmanın Yeni Kuralları"
slug: geo-nedir
meta_description: "GEO (Generative Engine Optimization) nedir? ChatGPT, Perplexity ve Google AI Overviews'da kaynak gösterilmenin 6 katmanlı yöntemi — kendi sitemizden örneklerle."
# meta_description karakter sayısı: 159
excerpt: "GEO, içeriğinizin yapay zekâ aramalarında kaynak gösterilmesini sağlama disiplinidir. Klasik SEO'dan farkını ve kendi sitemizde uyguladığımız 6 katmanlı yöntemi anlatıyoruz."
primary_keyword: "geo nedir"
suggested_image: "Bir arama çubuğundan ayrılan iki yol: solda klasik 10 mavi link listesi, sağda tek bir yapay zekâ cevabı ve cevabın içinde kaynak rozetleri. Sade, düz renkli illüstrasyon; GZL marka renkleri."
---

**Güncelleme: Temmuz 2026**

**GEO (Generative Engine Optimization), içeriğinizin ChatGPT, Perplexity, Gemini ve Google AI Overviews gibi yapay zekâ arama motorlarının ürettiği cevaplarda kaynak olarak gösterilmesini sağlama disiplinidir.** Klasik SEO sonuç listesinde **sıralanmak** içindir; GEO ise yapay zekânın ürettiği tek cevabın içinde **alıntılanmak** içindir. AI motoru 10 mavi link göstermez — birkaç kaynaktan bir cevap sentezler ve genellikle 2–5 kaynağa atıf verir. GEO'nun amacı, o birkaç kaynaktan biri olmaktır. Bu yazıda GEO'nun klasik SEO'dan farkını, AI motorlarının kaynak seçme mantığını ve kendi sitemiz gzlteknoloji.com'da uyguladığımız 6 katmanlı yöntemi adım adım anlatıyoruz.

## GEO nedir? (kısa tanım)

GEO'nun açılımı **Generative Engine Optimization**, Türkçesiyle "üretken motor optimizasyonu"dur. Terim, akademik literatüre 2023'te Princeton öncülüğündeki bir araştırma ekibinin aynı adlı makalesiyle girdi; makale, içerikte yapılan belirli düzenlemelerin (kaynak gösterme, istatistik ekleme, alıntı kullanma) üretken motorlardaki görünürlüğü **%40'a varan oranda artırabildiğini** gösterdi.

Buradaki "üretken motor" (generative engine), kullanıcının sorusuna hazır bir cevap üreten sistemlerdir:

- **ChatGPT** (web araması açıkken) ve arkasındaki OAI-SearchBot
- **Perplexity** — cevabın her cümlesine kaynak numarası veren "cevap motoru"
- **Google AI Overviews** — klasik sonuçların üstünde beliren AI özeti
- **Gemini** ve **Bing Copilot**

Kullanıcı davranışı da buna göre değişiyor: soru soran kullanıcı artık her zaman bir siteye tıklamıyor; cevabı doğrudan AI'dan alıyor. Sitenizin o cevabın **içinde** olması, yeni tür bir görünürlük kanalıdır — ve bu kanal şu anda Türkçe içerikte neredeyse boş.

## GEO ile klasik SEO arasındaki fark

İkisi rakip değil, üst üste binen iki katmandır. Sağlam bir klasik SEO temeli olmadan GEO da çalışmaz; ama sadece klasik SEO yapan bir site, AI cevaplarında görünmeyi şansa bırakmış olur.

| Boyut | Klasik SEO | GEO |
|---|---|---|
| Hedef | Sonuç listesinde üst sıra | AI cevabının içinde atıf |
| Çıktı birimi | Sayfa (URL) | Pasaj (paragraf, tablo, liste) |
| Kazanma ölçütü | Tıklama (CTR) | Alıntılanma / marka bahsi |
| İçerik yapısı | Anahtar kelime + kapsam | Kendi kendine yeten, spesifik, doğrulanabilir pasajlar |
| Teknik temel | Tarama, indeksleme, hız | + AI botlarına erişim izni, llms.txt, zengin şema |
| Otorite sinyali | Backlink | + Web genelinde tutarlı marka bahsi, birinci el deneyim |
| Ölçüm | Sıra takibi, GSC | AI motorlarına düzenli soru sorup atıf kaydı tutma |

Tek cümlelik özet: **klasik SEO sıralanmak, GEO alıntılanmak içindir.**

## Yapay zekâ motorları kaynakları nasıl seçiyor?

Deneyimimizde ve yayımlanmış araştırmalarda öne çıkan seçim mantığı şu:

1. **Erişebildiği kaynaklar arasından seçer.** GPTBot'u veya PerplexityBot'u robots.txt'te engelleyen bir site, daha yarışma başlamadan elenir. Birçok site bunu farkında olmadan yapıyor — genel bir bot engelleme kuralı AI tarayıcıları da kapsıyor.
2. **Pasaj bazında değerlendirir.** AI motoru sayfanın tamamını değil, sorunun cevabını içeren pasajı arar. Cevabı 800 kelimelik girişin ardına gömen sayfa, cevabı ilk paragrafta veren sayfaya kaybeder.
3. **Spesifik ve doğrulanabilir olanı önceler.** Sayı, tarih, isim, teknoloji adı içeren pasajlar ("20+ canlı proje", "Next.js + Fastify", "Gemlik/Bursa, 2026") muğlak övgü cümlelerinden ("sektörün lider firması") daha çok atıf alır.
4. **Güncelliğe bakar.** Görünür güncelleme tarihi ve şemadaki `dateModified` alanı, AI'ın "bu bilgi hâlâ geçerli" kararını besler.
5. **Markayı web genelinde tanır.** AI motorları atıf kararında yalnızca sitenize değil, markanızın başka yerlerdeki (GitHub, dizinler, pazaryerleri, sosyal profiller) tutarlı varlığına da bakar.

## GEO'nun 6 katmanı — bizim yöntemimiz

GZL Teknoloji olarak GEO çalışmasını 6 katmanlı bir kontrol listesi olarak uyguluyoruz. Aynı listeyi hem kendi sitemizde hem müşteri projelerinde kullanıyoruz.

### Katman 1 — Erişim: AI tarayıcılarını içeri alın

robots.txt dosyanızda AI tarayıcılarına **açıkça izin verin**. Kendi robots.txt dosyamızda şu botların tamamı ayrı ayrı tanımlı ve içerik sayfalarına erişimleri açık: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, CCBot ve Bingbot. Panel, API gibi hassas yollar (`/admin/`, `/api/`) ise tüm botlara kapalı. İzin vermek atıf şansı demektir; kural basit: **AI sizi okuyamıyorsa sizi öneremez.**

### Katman 2 — llms.txt: siteyi AI'a haritalayın

`llms.txt`, sitenin kökünde duran ve AI sistemlerine "bu site kimdir, hangi sayfada ne var" bilgisini sade markdown formatında veren yeni bir standarttır. gzlteknoloji.com'u yayına alırken llms.txt'yi statik bir dosya olarak değil, **dinamik bir Next.js route'u** olarak kurduk: dosya her istekte hizmet, paket ve ürün kayıtlarını doğrudan veritabanından çekip markdown'a çevirir ve saatlik yenilenir. Böylece yeni bir hizmet eklendiğinde llms.txt kendiliğinden güncel kalır — elle bakım gerektiren statik dosyaların en büyük zaafı olan "bayatlama" sorunu ortadan kalkar.

### Katman 3 — Alıntılanabilirlik: AI'ın kopyalayabileceği pasajlar yazın

AI motoru **kendi kendine yeten** pasajları alıntılar. Pratik kurallarımız:

- Cevabı ilk 100 kelimede verin; hikâyeyi sonra anlatın.
- "Bu yöntem", "yukarıda değindiğimiz gibi" yerine bağlamsız da anlaşılan tam cümleler kurun.
- Her önemli konuda en az bir tablo veya madde listesi bulundurun — AI için kopyalanabilir hakikat birimi bunlardır.
- H2 başlıklarını kullanıcının gerçek sorusuyla birebir eşleştirin: "GEO nedir?", "llms.txt zorunlu mu?"
- Yazıya görünür güncelleme tarihi koyun.

### Katman 4 — Şema (JSON-LD): içeriğe makine okunur yapı verin

Sayfalarımızda `Article` (yazar, `dateModified` ve `speakable` özellikleriyle), `FAQPage`, `Organization` ve `Service`/`Product` şemalarını JSON-LD olarak basıyoruz. Bunlardan AI atıfı açısından en kritik ikisi `FAQPage` (AI, cevap üretirken SSS bloklarını doğrudan çeker) ve `Article` + `dateModified` (güncellik kanıtı) kombinasyonudur.

### Katman 5 — E-E-A-T: neden size güvensinler?

Google'ın Deneyim–Uzmanlık–Otorite–Güven çerçevesi, AI atıf kararlarında da belirleyici. Doğrulanamayan iddia ("Türkiye'nin lideri") atıf getirmez, hatta zarar verir; doğrulanabilir spesifik ifade ("bu platformu sıfırdan kurup canlıya aldık, kaynak kodu GitHub'da") atıf getirir. Birinci el deneyim anlatısı — "biz şunu yaptık, sonuç şu oldu" — hem okura hem AI'a en güçlü güven sinyalidir.

### Katman 6 — Marka bahsi: site dışı varlık

AI motorları markanızı web genelinde arar. GitHub profili ve açıklamalı repo README'leri, pazaryeri profilleri ve müşteri değerlendirmeleri, sektörel dizin kayıtları, LinkedIn şirket sayfası — hepsi atıf kararını besler. Kritik kural: **isim ve tanım her yerde aynı olmalı.** Markanız bir yerde "GZL Teknoloji", başka yerde farklı bir tanımla geçiyorsa AI bunları tek varlık olarak birleştirmekte zorlanır.

## Kendi sitemiz: canlı bir GEO uygulaması

GEO hizmeti veren bir firmanın en dürüst referansı kendi sitesidir; gzlteknoloji.com'u bu yüzden baştan GEO-uyumlu kurduk:

- **robots.txt** — yukarıda saydığımız 10 AI tarayıcısına açık izin, hassas yollara kapalı.
- **Dinamik llms.txt** — veritabanından beslenen, saatlik yenilenen Next.js route'u.
- **JSON-LD seti** — `Article` + `speakable` + `dateModified`, `FAQPage`, `Organization`, `Service`.
- **İçerik anatomisi** — bu yazı dahil her blog yazısı aynı iskeleti izler: net cevap ilk 100 kelimede → tanım + tablo → gerçek örnek → SSS → ilgili hizmet sayfası.

Aynı disiplini müşteri projelerinde de uyguluyoruz: bir kurumsal müşterimizin çok dilli B2B sitesinde ve wiribu.de projesinde GEO + SEO + Lighthouse optimizasyonunu birlikte yürüttük; wiribu.de'de Lighthouse'ta 100/100 skoruna ulaştık. Ayrıca bu denetim sürecini ürünleştirdiğimiz **GeoSerra** platformunu geliştiriyoruz: sitelerin AI aramalarındaki görünürlüğünü analiz eden GEO + SEO odaklı SaaS aracımız. {{DOGRULA: GeoSerra'nın güncel durum/kapsam ifadesi — canlı ürün mü, geliştirme aşamasında mı, ürün sayfasındaki tanımla birebir uyumlu yazılmalı}}

## GEO çalışıyor mu? Ölçüm rutini

GEO'nun ölçümü klasik sıra takibinden farklıdır; biz aylık şu rutini uyguluyoruz:

1. Hedef soruları ChatGPT (arama açık), Perplexity ve Gemini'ye sorun — örneğin "geo nedir", "e-ticaret sitesi paketi öner", kendi sektörünüzün soruları.
2. Cevapta markanız geçiyor mu, siteniz kaynak gösteriliyor mu → tarih ve motor bazında kaydedin.
3. Geçmiyorsa hangi kaynaklar gösteriliyor, o içeriklerde hangi boşluk var → boşluğu daha spesifik, daha güncel, daha yapılı içerikle kapatın.
4. Ay ay ilerlemeyi tek tabloda izleyin.

Bu rutinin ayrıntısını ve 15 dakikalık hızlı görünürlük testini ayrı yazılarda ele alıyoruz; Google tarafı için [AI Overviews'a girme taktiklerimize](/blog/ai-overviews), ChatGPT/Perplexity tarafı için ["ChatGPT sizi neden önermiyor?"](/blog/chatgpt-onermiyor) yazısına bakabilirsiniz.

## GEO kimin için öncelikli?

Herkes için değil. GEO yatırımının en hızlı geri döndüğü profiller:

- **Düşük rekabetli, yükselen konularda içerik üretebilenler** — AI motorları bu boşluklarda az sayıda kaynağa mahkûm; erken giren atıfı kapar.
- **B2B hizmet ve SaaS firmaları** — "X yapan firma/araç öner" tipi sorgular doğrudan AI'a soruluyor.
- **Uzmanlığı gerçek olan ama backlink profili zayıf siteler** — GEO'da birinci el deneyim ve yapı, ham otorite kadar iş görür.
- **Yerel işletmeler** — tutarlı künye (ad, adres, hizmet tanımı) AI'ın yerel önerilerinde belirleyici.

## Sık sorulan sorular

### GEO, SEO'nun yerini mi alıyor?

Hayır. GEO, klasik SEO'nun üzerine kurulan bir katmandır. AI motorları da büyük ölçüde klasik aramanın indeksinden ve sinyallerinden besleniyor; taranamayan, yavaş, yapısız bir site GEO ile kurtarılamaz. Doğru sıra: sağlam teknik SEO → üstüne GEO katmanları.

### GEO sonuç vermeye ne zaman başlar?

Erişim ve şema düzeltmeleri (katman 1, 2, 4) yayına alındıktan sonra AI motorlarının siteyi yeniden değerlendirmesi haftalar alabilir; içerik ve marka bahsi katmanları aylar içinde birikir. Bu yüzden ölçümü tek seferlik değil aylık rutin olarak yapıyoruz. Kesin bir "X günde atıf" garantisi veren varsa şüpheyle yaklaşın — motorların seçim süreci deterministik değildir.

### llms.txt zorunlu mu?

Zorunlu değil; resmî bir standart organı da yok, topluluk kaynaklı yükselen bir konvansiyon. Ancak maliyeti düşük, riski sıfır ve AI sistemlerine sitenizi tek sayfada özetleme fırsatı veriyor. Biz hem kendi sitemizde kullanıyor hem müşteri kurulumlarına dahil ediyoruz.

### AI botlarına izin vermek içeriğimin çalınması anlamına gelmez mi?

Bir denge kararı. İzin verdiğinizde içeriğiniz AI cevaplarında kaynak olarak kullanılabilir — markanız görünür, atıf ve trafik şansı doğar. Engellediğinizde içeriğiniz korunmaz, sadece siz cevabın dışında kalırsınız; rakibinizin içeriği alıntılanır. Ticari içerik üreten bir işletme için görünürlük tarafı deneyimimizde ağır basıyor; hassas sayfaları (panel, API, üyelik) zaten ayrıca kapatıyorsunuz.

### GEO çalışması neleri kapsar, nereden başlanır?

Tipik sıra: mevcut durum denetimi (bot erişimi, şema, içerik yapısı, marka bahsi) → teknik düzeltmeler (robots.txt, llms.txt, JSON-LD) → içerik planı (soru bazlı, alıntılanabilir yapıda) → aylık atıf ölçümü. [SEO + GEO hizmet sayfamızda](/hizmetler/seo-geo) kapsamı ayrıntılı anlattık.

---

**Sitenizin yapay zekâ aramalarındaki görünürlüğünü merak mı ediyorsunuz?** Denetimden uygulamaya bu işi sizin için yapalım → [Teklif alın](/teklif-al)

## Kaynak / dayanak

- GEO teriminin akademik kökeni ve %40'a varan görünürlük artışı bulgusu: Aggarwal ve ark., "GEO: Generative Engine Optimization" (2023, Princeton öncülüğünde; KDD 2024'te yayımlandı).
- 6 katmanlı yöntem: GZL Teknoloji iç GEO stratejisi (`GEO_SEO_STRATEJI/04_GEO_ATIF_STRATEJISI.md`).
- robots.txt bot listesi: gzlteknoloji.com canlı robots.txt dosyası (frontend/public/robots.txt — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, CCBot, Bingbot).
- Dinamik llms.txt uygulaması: frontend/src/app/llms.txt/route.ts (veritabanından hizmet/paket/ürün çeken, saatlik revalidate'li Next.js route).
- JSON-LD seti: frontend/src/seo/jsonld.ts (Article + speakable + dateModified, FAQPage, Organization, Service).
- Wiribu.de Lighthouse 100/100 ve çok dilli B2B GEO+SEO işleri: Bionluk portfolyo kayıtları (docs/bionluk/bionluk-icerik.md, portfolyo #1, #9).
- GeoSerra: Bionluk portfolyo #3 ("GeoSerra — Yapay Zekâ Aramaları İçin GEO + SEO Platformu") — güncel ürün tanımı yayın öncesi doğrulanacak (yukarıdaki DOGRULA işareti).
