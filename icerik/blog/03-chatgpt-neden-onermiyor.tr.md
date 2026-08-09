---
title: "ChatGPT ve Perplexity Sizi Neden Önermiyor? (ve Nasıl Düzeltilir)"
slug: "03-chatgpt-neden-onermiyor"
meta_description: "ChatGPT'de çıkmak için 5 engel: AI botları engelli, alıntılanabilir içerik ve marka bahsi yok. Her nedenin kontrolü ve düzeltmesi bu rehberde."
excerpt: "Müşteriniz ChatGPT'ye sordu, rakibiniz çıktı, siz çıkmadınız. Bu bir şans meselesi değil: AI motorlarının sizi önermemesinin 5 teknik nedeni var ve hepsi kontrol edilip düzeltilebilir."
primary_keyword: "chatgpt'de çıkmak"
suggested_image: "AI arama sonucu ekranında rakip markanın önerildiği, kendi markasının görünmediği karşılaştırma illüstrasyonu (blog kapak, 1200x630)"
---

# ChatGPT ve Perplexity Sizi Neden Önermiyor? (ve Nasıl Düzeltilir)

ChatGPT'de çıkmak için sitenizin üç şartı aynı anda sağlaması gerekir: AI tarayıcılarının sitenize **erişebilmesi**, içeriğinizin **alıntılanabilir** formatta olması ve markanızın web genelinde **doğrulanabilir bahislerle** tanınması. Bu üçünden biri eksikse, ChatGPT ve Perplexity cevap üretirken sizi atlar ve bu şartları sağlayan rakibinizi önerir. İyi haber: bu bir kara kutu değildir. Aşağıda beş somut nedeni, her birinin kontrol yöntemini ve düzeltmesini sırasıyla açıklıyoruz.

## Belirti: "ChatGPT'ye sordum, rakip çıktı, biz çıkmadık"

Bu cümleyi son aylarda giderek daha sık duyuyoruz. Senaryo hep aynı: potansiyel müşteri artık Google'a değil ChatGPT'ye, Perplexity'ye veya Gemini'ye soruyor — *"Bursa'da e-ticaret sitesi yapan firma öner"*, *"bayi takip yazılımı hangisi iyi"* gibi. AI motoru 10 mavi link göstermez; birkaç kaynaktan sentezlediği **tek bir cevap** üretir ve o cevapta 2-3 marka anar. O 2-3 markadan biri değilseniz, o müşteri için hiç var olmamışsınız demektir.

Klasik SEO'da 4. sırada olmak hâlâ tıklama getirir. AI aramada "4. sıra" diye bir şey yoktur: ya cevabın içindesinizdir ya da yoksunuzdur. Bu yüzden sorunun kaynağını bulmak, sıradan bir SEO iyileştirmesinden daha acildir. (GEO kavramının tamamı için: [GEO Nedir?](/blog/01-geo-nedir))

## AI motorları bir markayı nasıl önerir?

ChatGPT (arama açıkken), Perplexity ve Gemini cevap üretirken kabaca üç şey yapar:

1. **Tarar:** Kendi botlarıyla (GPTBot, PerplexityBot, ClaudeBot...) web'i gezer veya arama indeksinden sonuç çeker.
2. **Seçer:** Soruya en doğrudan, en spesifik, en güncel cevabı veren pasajları ayıklar.
3. **Sentezler:** Bu pasajlardan tek bir cevap kurar ve kaynak/marka olarak en güvenilir bulduklarını anar.

Sizi önermemesinin nedeni, bu üç aşamadan en az birinde elenmenizdir. Şimdi beş somut nedene bakalım.

## Sizi önermemesinin 5 nedeni

### 1. AI tarayıcıları sitenize giremiyor

En yaygın ve en görünmez neden. Birçok site, hosting firmasının varsayılan ayarı, bir güvenlik eklentisi veya eski bir `robots.txt` kuralı yüzünden GPTBot, PerplexityBot ve ClaudeBot'u farkında olmadan engelliyor. Bot içeri giremiyorsa içeriğiniz ne kadar iyi olursa olsun cevaba giremez.

### 2. İçeriğiniz alıntılanabilir formatta değil

AI motorları **kendi kendine yeten, spesifik pasajları** alıntılar. "Kaliteli hizmet anlayışımızla yanınızdayız" cümlesi hiçbir soruya cevap değildir. Buna karşılık *"Kurumsal web sitesi projesi ortalama 2-4 haftada teslim edilir ve fiyatı sayfa sayısı ile entegrasyonlara göre belirlenir"* cümlesi bağlamsız alıntılanabilir. Cevabı gömen, süslü ve muğlak metinler AI için görünmezdir.

### 3. Markanızdan web'de kimse bahsetmiyor

AI motorları bir markayı önerirken sadece kendi sitenize bakmaz; web genelindeki **marka bahislerini** (GitHub, LinkedIn, sektörel dizinler, pazaryeri profilleri, müşteri yorumları) sinyal olarak kullanır. Sadece kendi sitenizde var olan bir marka, AI'ın gözünde doğrulanmamış bir iddiadır.

### 4. Yapılandırılmış veri (schema) eksik

`Organization`, `Service`, `FAQPage`, `Article` gibi JSON-LD şemaları, AI'a "bu sayfa ne, kim yazdı, ne zaman güncellendi, hangi hizmeti kim veriyor" bilgisini makine diliyle verir. Şema olmadan AI sayfanızı yorumlamak zorunda kalır; şemayla doğrudan okur. Özellikle SSS (FAQPage) blokları, AI cevaplarına en sık kopyalanan birimdir.

### 5. İçerik cevap formatında değil, tanıtım formatında

Kullanıcı AI'a **soru** sorar; AI da soruya birebir karşılık gelen başlık ve pasaj arar. Sayfalarınız "Hizmetlerimiz" gibi genel başlıklarla kuruluysa, "bayi takip yazılımı nedir?" sorusuna eşleşecek hiçbir yüzeyiniz yoktur. Soru-başlıklı H2'ler, tanım → tablo/liste → SSS yapısı ve görünür güncelleme tarihi, cevap formatının asgari şartlarıdır.

## Kontrol ve düzeltme tablosu

| # | Neden | Nasıl kontrol edersiniz | Düzeltme |
|---|-------|------------------------|----------|
| 1 | AI botları engelli | `siteniz.com/robots.txt` dosyasını açın; GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended için `Disallow` var mı bakın. Sunucu loglarında bu bot isimlerini arayın | robots.txt'ye ilgili botlar için `Allow: /` ekleyin; güvenlik katmanında (WAF/CDN) bot engellemelerini gözden geçirin |
| 2 | Alıntılanabilir içerik yok | Herhangi bir sayfanızdan tek bir paragrafı kopyalayıp bağlamsız okuyun: tek başına bir soruya cevap veriyor mu? | Her sayfayı net cevapla açın; muğlak övgüyü sayı, süre, fiyat aralığı gibi spesifik verilerle değiştirin |
| 3 | Marka bahsi yok | Markanızı ChatGPT ve Perplexity'e doğrudan sorun: "X firması nedir?" Tutarlı, doğru bilgi dönüyor mu? | GitHub, LinkedIn, sektörel dizinler ve pazaryeri profillerini aynı isim + aynı tanımla doldurun; müşteri yorumlarını görünür kılın |
| 4 | Şema eksik | Google Rich Results Test'e veya schema.org validator'a URL'nizi verin | Organization + sameAs, Service, FAQPage, Article + dateModified şemalarını JSON-LD olarak ekleyin |
| 5 | Cevap formatı yok | Sayfa başlıklarınızı listeleyin: kaçı gerçek bir kullanıcı sorusuyla birebir eşleşiyor? | Soru-başlıklı H2'ler kurun, her bölümü tanım → liste/tablo → SSS düzenine geçirin, görünür güncelleme tarihi ekleyin |

Beş kontrolün tamamı, teknik bilgisi olan biri için yarım günlük iştir. Düzeltmelerin etkisi ise haftalar içinde ölçülebilir.

## Somut örnek: Wiribu.de'de neyi değiştirdik, ne oldu?

Almanya'da yayın yapan PHP tabanlı haber portalı Wiribu.de için yürüttüğümüz GEO + SEO çalışmasında yukarıdaki listenin neredeyse tamamını uyguladık: AI tarayıcı erişimini %95'e çıkardık, `llms.txt` dosyası ekledik, JSON-LD NewsArticle şemasını kurduk, IndexNow entegrasyonu yaptık ve görsellere sistematik alt metin kazandırdık. Sonuç: sitenin GEO skoru **35'ten 74'e** yükseldi ve Lighthouse denetiminde 4 kategoride 100/100 alındı. Yani bu liste teori değil; sahada uyguladığımız ve ölçtüğümüz bir yöntem.

## Kendi sitemizde uyguladığımız kontrol listesi

GEO hizmeti satan bir firmanın kendi sitesi AI'da görünmüyorsa satış argümanı çöker. Bu yüzden gzlteknoloji.com'u kendi referans vakamız olarak kuruyoruz ve şu listeyi uyguluyoruz:

- **robots.txt:** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot ve CCBot'a açık izin.
- **llms.txt:** Sitenin hizmet, paket ve ürün haritasını AI'a sade markdown ile anlatan kök dosya.
- **Şema seti:** Organization + sameAs, Service, FAQPage ve Article + dateModified JSON-LD blokları.
- **Cevap formatı:** Her hizmet sayfası ve blog yazısı ilk 100 kelimede net cevap verir; soru-başlıklı H2 ve SSS bloğu içerir.
- **Marka bahsi:** GitHub'da açık repolar, Bionluk profili ve doğrulanmış müşteri değerlendirmeleri, LinkedIn şirket sayfası — hepsinde aynı isim ve tanım.
- **Aylık ölçüm:** Hedef sorguları her ay ChatGPT, Perplexity ve Gemini'ye sorup atıf alıp almadığımızı tabloya işliyoruz; almıyorsak hangi kaynakların gösterildiğine bakıp boşluğu kapatıyoruz.

Aynı ölçüm rutinini müşterilerimize de kuruyoruz — çünkü GEO'da düzeltmenin işe yarayıp yaramadığını ancak düzenli test söyler.

## Sık Sorulan Sorular

### ChatGPT'de çıkmak için para ödemek gerekiyor mu?

Hayır. ChatGPT, Perplexity ve Gemini'nin organik cevaplarında marka önerileri satın alınamaz. Görünürlük; bot erişimi, içerik kalitesi, yapılandırılmış veri ve marka sinyallerinden oluşan teknik bir çalışmayla kazanılır. Bu da satın alma değil, optimizasyon (GEO) işidir.

### Düzeltmelerden sonra sonuç ne kadar sürede görülür?

Bot erişimi ve şema düzeltmeleri birkaç gün ile birkaç hafta içinde taranır; içerik ve marka bahsi sinyallerinin cevaplara yansıması ise genelde 1-3 ay alır. Bu yüzden aylık ölçüm rutini şarttır: hangi sorguda göründüğünüzü ay ay kaydetmeden ilerlemeyi yönetemezsiniz.

### Klasik SEO'm iyiyse ChatGPT'de de otomatik çıkar mıyım?

Kısmen. İyi SEO temeli (hız, indekslenme, kaliteli içerik) GEO'nun ön şartıdır ama yeterli değildir. AI motorları ek olarak bot erişim izni, alıntılanabilir pasaj yapısı ve web genelinde marka doğrulaması arar. Google'da 1. sırada olup AI cevaplarında hiç anılmayan çok sayıda site vardır.

### AI botlarına izin vermek güvenlik riski oluşturur mu?

İçerik sayfalarını açmak risk oluşturmaz; zaten herkese açık olan sayfaların AI tarafından okunmasına izin vermiş olursunuz. Yönetim paneli, üyelik ve yasal olarak korunması gereken sayfalar `Disallow` ile kapalı tutulur. Doğru kurgu "her şeye izin" değil, "içeriğe izin, panele kilit"tir.

### Sitemin AI görünürlüğünü kendim test edebilir miyim?

Evet. Hedef müşterinizin soracağı 5-10 soruyu ChatGPT (arama açık), Perplexity ve Gemini'ye sorun; markanız geçiyor mu, kaynak gösteriliyor mu not edin. Ardından robots.txt ve şema kontrollerini yukarıdaki tabloyla yapın. Derinlemesine analiz ve düzeltme için [SEO + GEO hizmetimize](/hizmetler/seo-geo) göz atabilirsiniz.

---

Rakibiniz AI cevaplarında anılırken siz anılmıyorsanız, nedeni bu beş maddeden en az biridir — ve beşi de düzeltilebilir. Siteniz için AI görünürlük analizi ve düzeltme planı isterseniz [teklif alın](/teklif-al); mevcut durumunuzu ölçüp önceliklendirilmiş bir yol haritası çıkaralım.

**İlgili yazılar:** [GEO Nedir?](/blog/01-geo-nedir) · [İş Süreçlerini Otomatikleştirmek](/blog/05-is-otomasyonu) · [Bayi Takibi: Excel'den CRM'e](/blog/06-bayi-takibi-excel-crm)

## Kaynak / dayanak

- Wiribu.de GEO + SEO çalışması: GEO skoru 35→74, Lighthouse 4 kategoride 100/100, llms.txt, IndexNow, %95 AI tarayıcı erişimi — kendi portfolyo vakamız.
- gzlteknoloji.com GEO uygulama seti: robots.txt AI bot izinleri, llms.txt, JSON-LD şema seti, aylık AI atıf ölçüm rutini — kendi sitemizde canlı uygulama.
- Bionluk'ta yayınlanan "Sitenizi ChatGPT ve AI aramaları için optimize ederim" ve "GEO + SEO + Lighthouse analizi" hizmetlerimiz kapsamında yürütülen müşteri analizleri (11 değerlendirme, 4.50/5).
