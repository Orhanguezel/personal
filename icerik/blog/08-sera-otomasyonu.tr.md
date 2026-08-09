---
title: "Sera Otomasyonu Yazılımı: İklim, Sulama ve Verimi Tek Panelde Yönetmek"
slug: sera-otomasyonu-yazilimi
meta_description: "Sera otomasyonu yazılımı iklim, sulama ve kayıtları tek panelde toplar. Hangi seviyede neye ihtiyaç var, yatırım neyi geri öder — üretici gözüyle rehber." # 156 karakter
excerpt: "Sera otomasyonu yalnızca sensör takmak değil; iklim, sulama-gübreleme ve üretim kayıtlarını tek panelde birleştirip kararları veriye dayandırmaktır. Bu rehber, hangi seviyede neye ihtiyaç olduğunu anlatır."
primary_keyword: "sera otomasyonu"
suggested_image: "Modern bir cam serada, sıra sıra domates bitkileri arasında tablet tutan üretici; tablette sıcaklık-nem grafikli bir yönetim paneli ekranı."
---

> TASLAK — yayın öncesi Orhan onayı gereklidir.

# Sera Otomasyonu Yazılımı: İklim, Sulama ve Verimi Tek Panelde Yönetmek

**Sera otomasyonu yazılımı**, seradaki üç ayrı işi — iklim kontrolü, sulama-gübreleme ve üretim kayıtları — tek bir panelde birleştiren sistemdir. Sensörlerden gelen sıcaklık, nem ve toprak verisi anlık izlenir; belirlediğiniz eşikler aşıldığında havalandırma, ısıtma veya vana gibi ekipmanlar otomatik devreye girer ya da telefonunuza uyarı düşer. Sonuç: geceleri serayı kontrol etmek için kalkmak yerine, panele bakarak karar veren bir işletme. Küçük bir serada bile izleme + uyarı katmanı, tek bir donma gecesinin zararını önleyerek kendini amorti edebilir.

## Seranın üç kontrol alanı

Sera yönetimini yazılım gözüyle üç katmana ayırıyoruz:

| Katman | Ne yapar | Elle yönetimin riski |
|---|---|---|
| **İklim** | Sıcaklık, nem, CO₂, ışık takibi; havalandırma/ısıtma/perde kontrolü | Gece donması, gündüz aşırı ısınma — fark edildiğinde iş işten geçmiş olur |
| **Sulama & gübreleme** | Zamanlanmış veya toprak nemine bağlı vana kontrolü, EC/pH takibi | Fazla/eksik sulama, gübre oranı tutarsızlığı, su israfı |
| **Kayıt & izlenebilirlik** | Ekim-hasat kayıtları, ilaçlama günlüğü, parti/parsel takibi, verim raporu | Defter/Excel dağınıklığı; "geçen sezon ne yapmıştık?" sorusunun cevabının kaybolması |

Otomasyon denince akla çoğunlukla birinci katman gelir; oysa işletmeye para kazandıran çoğu karar üçüncü katmandan — kayıtlardan — çıkar. Hangi parselde hangi fide, hangi sulama programıyla ne verim verdi sorusuna veriyle cevap veremeyen işletme, her sezon aynı denemeleri tekrarlar.

## "Tek panel" yaklaşımı ne demek?

Piyasada iklim bilgisayarı ayrı, sulama kontrolörü ayrı, kayıtlar Excel'de ayrı yaşar. Tek panel yaklaşımında bu üç kaynak aynı web panelinde buluşur:

1. **Sensör verisi tek ekranda** — seradaki tüm ölçümler zaman grafiğiyle; geçmişe dönük karşılaştırma.
2. **Kural ve alarm motoru** — "sıcaklık 5 °C altına inerse SMS/Telegram uyarısı gönder", "toprak nemi eşiğin altındaysa vanayı 10 dakika aç" gibi işletmeye özel kurallar.
3. **Üretim kayıtları** — ekim, ilaçlama, hasat ve satış kayıtlarının parsel bazında tutulması; sezon sonu verim raporu.
4. **Raporlama** — dönemsel özetler: enerji/su tüketimi, alarm geçmişi, parsel karşılaştırması.

Bu yapı büyük kurumsal iklim bilgisayarlarının yerini almaz; onların pahalı geldiği **küçük ve orta ölçekli seralarda**, mevcut ekipmanla veriye dayalı yönetimi mümkün kılar.

## Tarım tarafındaki deneyimimiz

GZL Teknoloji olarak tarım sektörüne yazılım geliştiriyoruz: tohum ve fide üreticileriyle çalışıyoruz — [Bereket Fide kurumsal sitesi ve ürün kataloğu](/portfolyo/bereket-fide-kurumsal-web-sitesi-urun-katalogu) canlı projelerimizden biri; tohum sektöründe VistaSeeds gibi üretici siteleri de portföyümüzde. Bu işlerde öğrendiğimiz şey şu: üreticinin yazılımdan beklentisi "havalı ekranlar" değil, **sabah beş dakikada durumu görmek ve sorun çıkmadan haber almak**.

Sera otomasyon panelleri, [firmaya özel yazılım](/hizmetler/firmaya-ozel-erp-yazilimi) kapsamında ele aldığımız bir alan: sensör/ekipman entegrasyonu işletmedeki mevcut donanıma göre projelendirilir, panel ve kural motoru ihtiyaca göre geliştirilir. Tahmine dayalı katman (ör. verim ve iklim verisinden sezon projeksiyonu) için [AI/ML veri tahmin platformu](/hizmetler/ai-ml-veri-tahmin-platformu) hizmetimizdeki yaklaşımı kullanıyoruz. {{DOGRULA: yayına kadar tamamlanmış sera otomasyon kurulumu varsa buraya somut örnek eklenecek; yoksa bu bölüm mevcut haliyle kalır}}

## Nereden başlamalı: üç seviye

Her seranın tam otomasyona ihtiyacı yok. Sağlıklı sıra şöyle:

| Seviye | Kapsam | Kim için |
|---|---|---|
| 1 — İzleme + uyarı | Sensörler + panel + alarm (müdahale elle) | İlk adım; en düşük maliyet, en hızlı getiri |
| 2 — Kısmi otomasyon | Kritik ekipmanın (vana, fan) kurala bağlanması | Ölçüm alışkanlığı oturmuş işletmeler |
| 3 — Tam entegrasyon | İklim + sulama + kayıt + raporun tek panelde | Birden çok sera/parsel yöneten üreticiler |

Birinci seviye atlanıp üçüncüden başlandığında iki tipik sorun görüyoruz: kurallar gerçek işletme verisine değil varsayıma dayanır ve ekip paneli benimsemeden sistem "kenarda" kalır. Önce ölçün, sonra otomatikleştirin.

## Yatırımın karşılığı

Kesin bir "X ayda amorti" rakamı vermek doğru olmaz; getiri seranın ölçeğine, ürüne ve enerji giderine bağlıdır. Deneyimimizdeki temkinli çerçeve şu:

- **Kayıp önleme** — donma/aşırı ısınma kaynaklı tek bir ürün kaybının maliyeti, çoğu zaman izleme katmanının tamamından pahalıdır.
- **Girdi tasarrufu** — neme bağlı sulama, sabit zamanlı sulamaya göre su ve gübre tüketimini görünür biçimde azaltır (oran işletmeye göre değişir).
- **Karar kalitesi** — parsel bazlı verim kaydı, ertesi sezonun çeşit ve program seçimini tahminden veriye taşır.

## Sık sorulan sorular

**Sera otomasyonu için interneti zayıf bir bölgedeyim, çalışır mı?**
Çalışır. Kural motoru sahada (yerel kontrolör üzerinde) çalışacak şekilde kurgulanır; internet yalnızca uzaktan izleme ve bildirim için gerekir. Bağlantı koptuğunda otomasyon durmaz, veriler bağlantı gelince panele aktarılır.

**Mevcut iklim bilgisayarım/ekipmanım varken panel ne katıyor?**
İklim bilgisayarı kendi işini yapmaya devam eder; panel, onun verisini sulama ve üretim kayıtlarıyla aynı ekranda birleştirir, geçmişe dönük rapor ve alarm katmanı ekler. Amaç ekipmanı değiştirmek değil, veriyi tek yerde toplamaktır.

**Küçük bir sera için bu yatırım abartı değil mi?**
Üç seviyeli yaklaşımın amacı tam da bu: küçük sera için 1. seviye (izleme + uyarı) yeterlidir ve maliyeti sınırlıdır. Ölçek büyüdükçe sistem aynı panel üzerinde genişler.

**Hangi sensörler gerekir?**
Asgari set: hava sıcaklığı + nem. Ürüne göre toprak nemi, EC/pH ve ışık sensörleri eklenir. Sensör seçimi projelendirme aşamasında serada yetiştirilen ürüne göre yapılır — herkese aynı liste önerilmez.

**Verilerim nerede tutuluyor?**
Tercihe göre: kendi sunucunuzda (VPS) veya yönettiğimiz altyapıda. Her iki durumda da veri işletmeye aittir; panelden dışa aktarım (Excel/CSV) her zaman açıktır.

## Serayı panelden yönetmeye hazır mısınız?

Seranızın mevcut ekipmanını, ölçeğini ve önceliğinizi konuşalım; hangi seviyeden başlamanın mantıklı olduğunu birlikte çıkaralım. **[Teklif alın →](/teklif-al)**

İlgili yazılar: [İş Süreçlerini Otomatikleştirmek](/blog/05-is-otomasyonu) · [Distribütör ve Bayi Takibi: Excel'den CRM'e](/blog/06-bayi-takibi-excel-crm)

---

## Kaynak / dayanak

- Tarım sektörü deneyimi: Bereket Fide projesi — `backend/src/db/seed/sql/030_portfolio_projects_seed.sql` (`bereket-fide-kurumsal-web-sitesi-urun-katalogu`) ve `docs/bionluk/bionluk-icerik.md` portfolyo #11; VistaSeeds — workspace canlı projeler tablosu.
- Hizmet sayfası slug'ları: `027_bionluk_services_seed.sql` (`firmaya-ozel-erp-yazilimi`, `ai-ml-veri-tahmin-platformu`).
- GeoSerra bilinçli olarak KULLANILMADI: `029_saas_products_seed.sql`'de GeoSerra "GEO ve SEO platformu" olarak tanımlı — sera ürünü değil (strateji dosyasındaki eski eşleme düzeltilmeli).
- Nicel iddialar (amorti süresi, tasarruf yüzdesi) bilinçli olarak verilmedi; tek somut örnek ihtiyacı `{{DOGRULA}}` ile işaretlendi.
- Yazı anatomisi: `GEO_SEO_STRATEJI/03_BLOG_ICERIK_TAKVIMI.md` (#33, P0).
