---
title: "İş Süreçlerini Otomatikleştirmek: Elle Yapılan 5 İşi Bota Devretmek"
slug: "is-otomasyonu-elle-yapilan-5-is"
meta_description: "İş otomasyonu nereden başlar? Veri girişi, rakip takibi, sosyal medya, raporlama ve fiyat güncellemeyi bota devretmenin pratik, deneyime dayalı rehberi."
excerpt: "Ekibinizin her hafta saatlerini alan tekrarlı işlerin çoğu yazılıma devredilebilir. Elle yapılan 5 iş arketipini, botun her birinde tam olarak ne yaptığını ve kendi lead bulma panelimizden gerçek bir vakayı anlatıyoruz."
primary_keyword: "iş otomasyonu"
suggested_image: "Bölünmüş ekran görseli: solda Excel'e elle veri giren yorgun bir çalışan, sağda aynı verinin otomatik aktığı modern bir web paneli (kanban kolonları ve skor rozetleriyle). Kendi lead panelimizin ekran görüntüsü tercih edilir, stok görsel kullanılmaz."
---

# İş Süreçlerini Otomatikleştirmek: Elle Yapılan 5 İşi Bota Devretmek

İş otomasyonu, kuralları belli ve tekrar eden işlerin insan yerine yazılım tarafından yürütülmesidir. Bir işin otomasyona uygun olup olmadığını üç soru belirler: İş düzenli olarak tekrar ediyor mu, adımları yazıya dökülebiliyor mu ve veri dijital bir kaynaktan alınabiliyor mu? Üçüne de "evet" diyorsanız, o iş büyük olasılıkla bota devredilebilir. Deneyimimizde işletmelerde en çok zaman tüketen beş aday şunlardır: verileri Excel'e elle geçirmek, rakip ve piyasa verisini elle toplamak, sosyal medya paylaşımlarını elle yapmak, müşteriye durum raporunu elle hazırlamak ve fiyat/stok bilgisini sistemler arasında elle taşımak. Bu yazıda her biri için botun tam olarak ne yaptığını ve nereden başlamanız gerektiğini anlatıyoruz.

## Elle yapılan 5 iş ve botun her birinde yaptığı

| # | Elle yapılan iş | Bot ne yapar | Tipik kazanım |
|---|---|---|---|
| 1 | Sipariş ve lead'leri Excel'e elle geçirmek | Form, e-posta ve kanal verilerini tek veritabanına otomatik yazar; mükerrer kaydı ayıklar | Haftada saatler süren veri girişi biter; kopyala-yapıştır hataları ortadan kalkar |
| 2 | Rakip ve piyasa verisini elle toplamak | Hedef siteleri ve dizinleri düzenli tarar; değişiklik olunca bildirir | Sürekli "siteye bakma" mesaisi biter; değişikliği gün içinde öğrenirsiniz |
| 3 | Sosyal medya paylaşımını elle yapmak | Takvimden zamanlanmış içeriği ilgili platformlarda otomatik yayınlar | Paylaşım saati başında bekleme biter; yayın düzeni tutarlı hale gelir |
| 4 | Müşteriye durum maili / raporu elle hazırlamak | Sistemdeki güncel veriden PDF rapor üretir, planlanan saatte gönderir | Rapor günü panik biter; her müşteri aynı kalitede rapor alır |
| 5 | Fiyat ve stok güncellemesini elle taşımak | Kaynak sistemdeki değişikliği API ile diğer kanallara anında yansıtır | Kanallar arası tutarsız fiyat/stok riski ortadan kalkar |

Kazanım sütununda bilinçli olarak yüzde veya kesin saat vermiyoruz; kazanç işlem hacminize bağlıdır. Ölçülebilir olan şudur: bu beş işin her biri, yapan kişinin takviminde düzenli olarak yer kaplar ve otomasyonla bu blok tamamen ya da büyük ölçüde boşalır.

### 1. Sipariş ve lead'leri Excel'e elle geçirmek

Web formundan gelen talep, WhatsApp'tan gelen sipariş, fuarda toplanan kartvizit... Hepsi bir Excel dosyasında buluşuyorsa, o dosya hem işletmenin hafızası hem de en kırılgan noktasıdır. Bot bu akışta veri toplayıcı görevi görür: form gönderimlerini doğrudan veritabanına yazar, e-posta eklerini ayrıştırır, aynı müşterinin ikinci kaydını mükerrer olarak işaretler. Veri tek yerde ve sorgulanabilir olduğunda, "geçen ay kaç talep geldi?" sorusunun cevabı dosya aramakla değil tek ekranla bulunur.

### 2. Rakip ve piyasa verisini elle toplamak

Rakibin fiyat sayfasını haftada bir açıp bakmak hem zaman alır hem de değişikliği geç fark ettirir. Web scraping botu bu işi düzenli aralıklarla yapar: hedef sayfaları tarar, önceki taramayla karşılaştırır ve yalnızca değişiklik olduğunda haber verir. Biz bu tür sistemleri Python, Playwright ve iş kuyruğu (job queue) mimarisiyle kuruyoruz; Google Maps işletme verisi, B2B dizinleri ve e-ticaret fiyat takibi en sık çalıştığımız senaryolar. Önemli bir sınır: yalnızca herkese açık ve toplanmasına hakkınız olan verilerle, ilgili sitenin şartlarına uygun çalışılır.

### 3. Sosyal medya paylaşımını elle yapmak

Her paylaşım saati telefona uzanmak, aynı içeriği üç platforma ayrı ayrı yüklemek küçük ama sürekli bir kesintidir. Otomasyon panelinde içerik önceden hazırlanır, takvime yerleştirilir ve platformların resmî API bağlantılarıyla zamanında yayınlanır. Kendi geliştirdiğimiz sosyal medya otomasyon panellerinde içerik takvimi, tek içeriği platforma göre uyarlama, yayın öncesi önizleme ve temel performans raporu birlikte çalışır. Böylece elle kalan tek iş, asıl değerli olan kısımdır: içeriğin kendisine karar vermek.

### 4. Müşteriye durum mailini / raporu elle hazırlamak

"Bu ay neler yapıldı?" maili çoğu ajansta ve serviste ay sonunun en sevilmeyen işidir, çünkü veriler farklı yerlerden elle derlenir. Otomatik raporlamada bot, sistemde zaten biriken veriden (görev durumu, ölçüm sonuçları, sipariş özeti) şablona uygun bir PDF üretir ve planlanan günde gönderir. İnsan yalnızca yoruma değer bulguları ekler. Rapor kalitesi kişiye ve o günkü yoğunluğa bağlı olmaktan çıkar.

### 5. Fiyat ve stok güncellemesini elle taşımak

Fiyat listesi ERP'de güncellenir, ama web sitesine ve pazaryeri hesabına elle taşınır — ve bir kanal her zaman unutulur. Entegrasyon botu, kaynak sistemi tek doğruluk noktası kabul eder ve değişikliği API üzerinden diğer kanallara yansıtır. Bu, otomasyonun en hızlı geri dönüş veren biçimlerinden biridir çünkü elle taşımadaki hata doğrudan para kaybettirir: yanlış fiyatla satış ya da olmayan stokla sipariş.

## Gerçek bir vaka: kendi lead bulma ve rakip takip panelimiz

Bu beş arketipten birkaçını tek üründe birleştiren bir sistemi uçtan uca geliştirdik: firmalara özel kurduğumuz B2B lead bulma ve pazar takip paneli. Sistem, satış ekibinin elle yaptığı "müşteri adayı arama + rakip kollama + Excel'de liste tutma" üçlüsünü tek panele taşır. Gerçek kapsamı şu bileşenlerden oluşur:

- **Lead Machine:** Amazon satıcı verileri, B2B dizinleri (Europages, Kompass, Google Maps) ve fuar katılımcı listelerinin taranmasıyla otomatik potansiyel müşteri üretimi
- **ICP eşleştirme ve skorlama:** Her lead, tanımlanan ideal müşteri profiline göre 0–100 arası puanlanır; ekip önce en yüksek skora döner
- **Lead pipeline:** Kanban panel (Yeni → Görüşmede → Teklif → Dönüştürüldü) ile takip, Excel'deki durum sütununun yerini alır
- **Pazar sinyalleri:** Rakip site ve fiyat değişiklikleri ile sosyal aktivite, scraper ile otomatik izlenir
- **Churn risk skoru:** Sinyal, aktivite ve sipariş verisinden mevcut müşterilerin kayıp riski otomatik hesaplanır
- **E-posta bulma ve taslak:** Karar verici e-postası zenginleştirme (enrichment) ile bulunur, yapay zekâ destekli outreach taslağı hazırlanır
- **Haftalık PDF raporu:** Panel verisinden otomatik üretilir ve e-posta ile gönderilir

Teknik taraf: Next.js 16, React 19, TypeScript, Fastify, MySQL ve Python scraper altyapısı; her müşteri için ayrı ve bağımsız kurulum yapılır, veri müşteride kalır. Portföyümüzdeki MarketPulse, bu mimarinin canlı çalışan örneğidir. Bu vakanın öğrettiği en önemli ders şu: otomasyon tek bir "sihirli bot" değil, veri toplama → skorlama → takip → raporlama zincirinin her halkasının ayrı ayrı otomatikleştirilmesidir.

## Nereden başlamalı: karar çerçevesi

Her işi aynı anda otomatikleştirmeye çalışmak projelerin en sık battığı noktadır. Önerdiğimiz sıralama ölçütü üç sorudan oluşur:

1. **Sıklık × süre:** İş ne kadar sık yapılıyor ve her seferinde ne kadar sürüyor? Haftada beş kez yarım saat alan iş, ayda bir kez iki saat alan işten önce gelir.
2. **Hata maliyeti:** Elle yapılırken hata olursa ne kaybediliyor? Fiyat taşıma gibi hatası doğrudan para kaybettiren işler öne alınır.
3. **Kural netliği ve veri erişimi:** İşin adımları yazıya dökülebiliyor mu, veri API veya düzenli bir kaynaktan alınabiliyor mu? Kuralı belirsiz işler otomasyondan önce standartlaştırılır.

İlk projeyi bu üç ölçütte en yüksek puanı alan tek bir işten seçin, dar kapsamla canlıya alın, ölçün ve genişletin. Bizim müşteri projelerinde izlediğimiz sıra da budur: ihtiyaç görüşmesi → demo ve kapsam onayı → geliştirme → test, eğitim ve canlıya alma.

## Sıkça Sorulan Sorular

**İş otomasyonu için mutlaka özel yazılım mı gerekir?**
Hayır. Kuralları basit işler için hazır otomasyon araçları yeterli olabilir. Özel yazılım; skorlama, scraper, ERP entegrasyonu gibi işletmeye özgü mantık gerektiğinde veya verinin kendi sunucunuzda kalması istendiğinde devreye girer.

**Otomasyon projesi ne kadar sürer?**
Kapsama bağlıdır. Tek kaynaklı bir veri çekme botu günler mertebesinde teslim edilebilirken, skorlama ve entegrasyon içeren tam bir panel haftalar süren bir projedir. Net süre, kapsam onayında birlikte belirlenir.

**Botlar mevcut ERP veya CRM sistemimizle çalışır mı?**
Evet, entegrasyon otomasyonun doğal parçasıdır. Kendi lead panelimizde mevcut ERP/CRM ile entegrasyon standart kapsam maddesidir; veri iki yönde de API ile akar.

**Web'den veri toplamak (scraping) yasal mı?**
Herkese açık verilerle, ilgili sitenin kullanım şartlarına ve KVKK gibi mevzuata uygun çalışmak esastır. Biz projelerde yalnızca toplanmasına hakkınız olan verilerle çalışıyoruz; sınır durumlarda kapsamı birlikte netleştiriyoruz.

**Otomasyon çalışanların işini elinden alır mı?**
Deneyimimizde otomasyon, kişilerin işini değil işlerinin en sıkıcı bölümünü alır. Veri girişinden kurtulan satış ekibi görüşmeye, rapor derlemekten kurtulan uzman analize zaman ayırır.

---

Elle yürüyen süreçlerinizi birlikte listeleyip nereden başlanacağını çıkaralım: [teklif alın](/teklif-al). İlgili hizmetlerimiz: [lead bulma ve rakip takip paneli](/hizmetler/lead-bulma-rakip-takip-paneli), [Google Maps ve sitelerden veri çekme botu](/hizmetler/google-maps-veri-cekme-botu), [sosyal medya otomasyon paneli](/hizmetler/sosyal-medya-otomasyon-paneli). Tarım tarafındaki otomasyon deneyimimiz için: [Sera otomasyonu yazılımı: iklim, sulama ve verimi tek panelde yönetmek](/blog/sera-otomasyonu-yazilimi).

## Kaynak / dayanak

- Lead bulma ve rakip takip paneli kapsamı: `docs/bionluk/gigs-raw.json` ilan #861468 (Lead Machine, ICP 0–100 skorlama, kanban pipeline, churn risk skoru, pazar sinyalleri, enrichment, haftalık PDF rapor, ERP/CRM entegrasyonu; teknolojiler ve çalışma adımları birebir ilan metninden)
- Veri çekme botu kapsamı ve yasal sınır notu: `docs/bionluk/gigs-raw.json` ilan #861536
- Sosyal medya otomasyon paneli kapsamı: `docs/bionluk/gigs-raw.json` ilan #861494
- MarketPulse referansı: `docs/bionluk/bionluk-icerik.md` portfolyo listesi (madde 7) ve ilan #861468 metni
- Hizmet sayfası slug'ları: `backend/src/db/seed/sql/027_bionluk_services_seed.sql` + `docs/bionluk/slug-redirects.json`
- Yazı anatomisi ve birincil kelime: `GEO_SEO_STRATEJI/03_BLOG_ICERIK_TAKVIMI.md` (#19, P0)
- Kazanım ifadelerinde yüzde/saat verilmedi; tüm nicel iddialar temkinli tutuldu (takvim/uygulama kuralı: uydurulmuş istatistik yok)
