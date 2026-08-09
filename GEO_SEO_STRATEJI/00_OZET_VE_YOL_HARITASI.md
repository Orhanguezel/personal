# GZL Teknoloji — GEO/SEO Strateji Özeti & Yol Haritası

**Hazırlık:** 2026-07-10 · **Pazar:** Türkiye (gzlteknoloji.com) · **Kaynak konum:** Gemlik/Bursa
**Hedef:** Google Search Console'da (GSC) kendi kategorimizde görünürlüğü sıfırdan kurmak ve hem klasik aramada hem de yapay zekâ aramasında (ChatGPT, Perplexity, Gemini, Google AI Overviews) **atıf alınan** kaynak olmak.

> Bu klasör bir düşünce değil, bir işletim planıdır. Her dosya tek bir işi yapar; sırayla okunur, sırayla uygulanır.

---

## Neden biz kazanabiliriz — dürüst durum tespiti

Çoğu web/yazılım ajansı SEO'yu "meta title yazdık, bitti" sanıyor. Bizim elimizde üç gerçek avantaj var, strateji bunların üzerine kurulu:

1. **GEO/SEO'yu satıyoruz, o hâlde kanıtı sitenin kendisi olmalı.** llms.txt, JSON-LD şema, atıf-dostu içerik — rakiplerin çoğu bunları duymadı bile. Kendi sitemiz vitrin olacak: "GEO hizmeti veren firmanın sitesi AI aramada çıkmıyorsa" kimse almaz.
2. **Birinci-el deneyim (E-E-A-T'nin "E"si).** 15 yıl mühendislik → yazılım/AI geçişi, 20+ canlı proje (MarketPulse, e-ticaret platformları, tarım ekosistemi, sosyal medya paneli). Bu doğrulanabilir sinyaller hem Google hem AI için atıf gerekçesidir. Uydurma "sektör lideri" iddiası yok; isim ve sayı var.
3. **Niş derinlik.** Tarım/AgriTech dijitalleşmesi ve CRM+pazarlama otomasyonu gibi rakibin ince geçtiği alanlarda gerçek proje deneyimimiz var → düşük rekabetli, yüksek niyetli kelimelerde otorite kurabiliriz.

---

## Kuzey Yıldızı metrik ve alt hedefler

**Kuzey Yıldızı:** GSC'de *organik tıklama* + *ortalama pozisyon* (para sayfalarında ilk sayfa).

90 günlük ölçülebilir hedefler:

| Hedef | 30 gün | 60 gün | 90 gün |
|---|---|---|---|
| GSC'de index'li sayfa | Tüm para + hizmet sayfaları | + ilk 6 blog | + 12 blog |
| Impression (gösterim) | Taban ölçüm | 3× taban | 8× taban |
| İlk sayfada (top 10) kelime | 3–5 (marka + uzun kuyruk) | 10–15 | 25–40 |
| AI atıfı (ChatGPT/Perplexity'de marka veya içerik geçmesi) | Altyapı hazır | İlk atıflar | Düzenli atıf |
| Lead formu (organikten) | — | İlk lead'ler | Aylık düzenli |

> Kesin arama hacmi rakamları bu belgede **iddia edilmez** — canlı doğrulama GSC + Google Keyword Planner + (varsa) Ahrefs/Semrush ile yapılır. Buradaki talep/rekabet etiketleri (Yüksek/Orta/Düşük) kategori bilgisine dayalı tahmindir; ilk 30 günde GSC verisiyle kalibre edilecek (bkz. `05_OLCUM_GSC.md`).

---

## Önceliklendirme çerçevesi (her kelime/içerik bununla puanlanır)

Beş eksen, her biri 1–5:

- **İş Değeri** — satışa ne kadar yakın? (teklif formu doldurtur mu?)
- **Talep** — aranıyor mu?
- **Rekabet (ters)** — ne kadar boş? (düşük rekabet = yüksek puan)
- **Otorite Uyumu** — Orhan'ın gerçek kanıtı/deneyimi var mı?
- **Efor (ters)** — ne kadar çabuk üretilir/sıralanır?

**Öncelik = (İş Değeri×2) + Talep + Rekabet + Otorite×2 + Efor**

Bandlar:
- **P0 (hemen):** para sayfaları + Orhan'ın uzmanlığının en güçlü olduğu düşük-rekabet kelimeler (özellikle GEO).
- **P1 (0–60 gün):** yüksek talepli hizmet/paket kelimeleri, ana blog kümeleri.
- **P2 (60–120 gün):** geniş bilgilendirici içerik, sektörel niş, yerel genişleme.

---

## 90 günlük yol haritası (özet)

### Ay 1 — Temel & Teknik (P0)
- Teknik GEO/SEO tabanı: sitemap.xml, robots.txt, **llms.txt**, canonical, hreflang (TR/EN), JSON-LD (Organization, LocalBusiness, Service, BreadcrumbList). Ayrıntı: `02_SAYFA_VE_INDEXLEME.md`.
- Tüm para + hizmet + paket + ürün sayfalarına özgün meta title/description (şablon: dosya 02).
- GSC + Bing Webmaster + GA4 kurulumu, sitemap gönderimi, ilk index talebi.
- İlk 2 P0 blog yazısı (GEO kümesi — en yüksek otorite/en düşük rekabet).

### Ay 2 — İçerik İvmesi (P1)
- Hizmet/paket sayfalarının içeriğini "atıf-dostu" yapıya çevir (dosya 04: net tanım, tablo, SSS, fiyat sinyali).
- Haftada 1–2 blog (Web/E-ticaret + Sosyal Medya + CRM kümeleri).
- İç linkleme mimarisi: küme → para sayfası (topic cluster / pillar-cluster modeli).
- İlk portfolyo vaka çalışmaları (case study) — E-E-A-T + atıf yemi.

### Ay 3 — Otorite & Ölçüm (P1→P2)
- GSC verisiyle kelime kalibrasyonu; kazanan sayfaları güçlendir (içerik güncelleme > yeni içerik).
- Sektörel niş içerik (tarım/AgriTech), yerel SEO (Bursa/Gemlik) + Google Business Profile.
- AI atıf takibi: ChatGPT/Perplexity/Gemini'de kendi konu sorgularımızı test et, boşlukları içerikle kapat.

---

## Klasör haritası

| Dosya | İçerik |
|---|---|
| `00_OZET_VE_YOL_HARITASI.md` | Bu dosya — strateji, hedef, öncelik çerçevesi, 90 gün |
| `01_ANAHTAR_KELIME_HARITASI.md` | Kelime evreni (8 küme), niyet, talep/rekabet, hedef sayfa eşlemesi |
| `02_SAYFA_VE_INDEXLEME.md` | Index/noindex kararları, meta şablonları, teknik SEO/GEO checklist, şema |
| `03_BLOG_ICERIK_TAKVIMI.md` | 40+ makale konusu, başlık, hedef kelime, öncelik, 12 haftalık takvim |
| `04_GEO_ATIF_STRATEJISI.md` | AI aramada atıf alma: citability, llms.txt, şema, E-E-A-T |
| `05_OLCUM_GSC.md` | GSC/GA4 kurulumu, KPI, aylık ritim, kalibrasyon |

**Uygulama sırası:** 02 (teknik) → 01+03 (içerik) → 04 (GEO katmanı) → 05 (ölçüm, sürekli).
