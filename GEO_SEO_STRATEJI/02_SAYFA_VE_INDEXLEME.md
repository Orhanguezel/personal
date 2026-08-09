# Sayfa Envanteri, İndexleme & Teknik Temel

**Amaç:** Google'ın (ve AI tarayıcılarının) hangi sayfayı görmesi, index'lemesi ve önceliklendirmesi gerektiğini net kurala bağlamak. "Her şeyi index'le" yanlıştır — ince/tekrar eden sayfa tüm siteyi zayıflatır.

---

## 1. Sayfa envanteri & indexleme kararı

| Sayfa | URL kalıbı | Index? | Öncelik (sitemap) | Not |
|---|---|---|---|---|
| Ana sayfa | `/[locale]/` | ✅ Index | 1.0 | Hero + 4 satış kanalı; marka + ana kelimeler |
| Hizmetler (liste) | `/[locale]/hizmetler` | ✅ Index | 0.9 | Kategori pillar |
| Hizmet detay | `/[locale]/hizmetler/[slug]` | ✅ Index | 0.8 | Para sayfası — 3 paket + SSS |
| Paketler (liste) | `/[locale]/paketler` | ✅ Index | 0.9 | Abonelik pillar |
| Paket detay | `/[locale]/paketler/[slug]` | ✅ Index | 0.8 | Para sayfası (e-ticaret, sosyal medya) |
| Ürünler (SaaS liste) | `/[locale]/urunler` | ✅ Index | 0.8 | Ürün kataloğu |
| Ürün detay | `/[locale]/urunler/[slug]` | ✅ Index | 0.7 | Demo iste CTA |
| Portfolyo (liste) | `/[locale]/portfolyo` | ✅ Index | 0.7 | E-E-A-T |
| Portfolyo detay / vaka | `/[locale]/portfolyo/[slug]` | ✅ Index | 0.6 | Case study — atıf yemi |
| Blog (liste) | `/[locale]/blog` | ✅ Index | 0.7 | İçerik hub |
| Blog yazı | `/[locale]/blog/[slug]` | ✅ Index | 0.6 | Bilgilendirici, iç link |
| Hakkımızda | `/[locale]/hakkimizda` | ✅ Index | 0.6 | E-E-A-T + LocalBusiness |
| İletişim | `/[locale]/iletisim` | ✅ Index | 0.5 | NAP + yerel sinyal |
| Teklif al | `/[locale]/teklif-al` | ⚠️ Index (ince değilse) | 0.4 | Form; içerik zayıfsa `noindex` |
| Hukuki metinler | `/[locale]/{kvkk,gizlilik,...}` | 🚫 noindex, follow | — | Index'e gerek yok, link akışı kalsın |
| Arama sonuç / filtre | `?q=`, `?filter=` | 🚫 noindex | — | Tekrar/ince; canonical ana listeye |
| Etiket/pagination 2+ | `/blog?page=2` | ✅ index (self-canonical) | — | `rel=prev/next` mantığı, canonical kendine |
| 404 / offline | — | 🚫 noindex | — | — |

**Kural:** Ticari değeri veya bilgi değeri olan sayfa index'lenir; form/filtre/yasal/teknik sayfa index'lenmez ama `follow` kalır (link gücü akmaya devam eder).

---

## 2. Çok dillilik (TR/EN) — hreflang

Site TR (varsayılan) + EN. Kannibalizasyon ve yanlış-dil sıralaması riskini hreflang çözer.

- Her sayfada karşı dil için `<link rel="alternate" hreflang="tr" href="...">` ve `hreflang="en"`.
- `x-default` → TR sürümü.
- **TR ve EN aynı URL'de değil**; `/tr/...` ve `/en/...` ayrı. Canonical her dil kendi URL'ine.
- EN içeriği makine çevirisi kokmamalı (bkz. içerik brief) — zayıf EN, EN sıralamasını düşürür.

---

## 3. Meta title / description şablonları

Kısa, kelime-önde, benzersiz. Title ≤ 60 karakter, description ≤ 155.

**Para sayfası (hizmet/paket):**
```
Title:  {Hizmet} Fiyatları ve Paketleri | GZL Teknoloji
Desc:   {Hizmet} için Temel/Standart/Pro paketler, şeffaf fiyat ve teslim süresi.
        20+ canlı projeyle Gemlik/Bursa merkezli GZL Teknoloji. Teklif alın.
```
Örnek:
```
Title:  E-Ticaret Sitesi Yaptırma Fiyatları | Hazır Paketler — GZL Teknoloji
Desc:   Next.js altyapılı hazır e-ticaret sitesi paketleri: ödeme, kargo,
        panel dahil. Şeffaf fiyat, hızlı teslim. Ücretsiz teklif alın.
```

**Ürün (SaaS):**
```
Title:  {Ürün} — {tek cümle fayda} | GZL Teknoloji
Desc:   {Ürün} ne yapar (somut), kime uygun, demo talebi.
```

**Blog:**
```
Title:  {Ana Kelime}: {merak uyandıran alt vaat} ({yıl})
Desc:   Yazının cevapladığı soru + somut çıktı. İlk 155 karakterde ana kelime.
```

---

## 4. Yapılandırılmış veri (JSON-LD şema) — zorunlu set

Şema hem klasik zengin sonuç hem AI atıfı için **kritik**. Sitede DB'den beslenen dinamik JSON-LD üretilecek:

| Şema tipi | Nerede | Neden |
|---|---|---|
| `Organization` | Tüm sayfalar (head) | Marka varlığı, logo, sameAs (GitHub, Bionluk, LinkedIn, sosyal) |
| `LocalBusiness` | Ana sayfa + İletişim + Hakkımızda | Gemlik/Bursa yerel sinyal (adres, coğrafi, saat) |
| `Service` | Her hizmet/paket detay | Sunulan hizmet + `areaServed` (Türkiye) + `offers` |
| `Product` + `Offer` | SaaS ürün detay | Ürün + fiyat/demo |
| `BreadcrumbList` | Tüm derin sayfalar | Gezinme + zengin sonuç |
| `FAQPage` | SSS bloğu olan sayfalar | AI motorları SSS'i atıf için sever |
| `Article` + `author` | Blog yazıları | E-E-A-T; yazar = Orhan (Person şeması, gerçek deneyim) |
| `Person` | Hakkımızda + blog yazar | 15 yıl mühendislik→yazılım anlatısı, `knowsAbout` |

`sameAs` (Organization/Person) örnek:
```json
"sameAs": [
  "https://github.com/Orhanguezel",
  "https://bionluk.com/<kullanıcı>",
  "https://www.linkedin.com/in/<...>",
  "https://guezelwebdesign.de"
]
```

---

## 5. Teknik SEO/GEO checklist (Faz 1 çıkışında hepsi ✅ olmalı)

**Erişilebilirlik & tarama**
- [ ] `robots.txt` — tüm AI tarayıcılarına izin (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot dahil — bkz. dosya 04) + `Sitemap:` satırı
- [ ] `sitemap.xml` — dinamik, sadece index'li sayfalar, `lastmod` gerçek
- [ ] `llms.txt` (kök) — site özeti + ana sayfaların AI için haritası (dosya 04)
- [ ] Canonical her sayfada, kendine (veya doğru hedefe)
- [ ] hreflang TR/EN + x-default

**Render & performans (Core Web Vitals)**
- [ ] SSR/SSG — içerik ilk HTML'de (JS'e bağımlı içerik AI için görünmez)
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 (Next.js image, font-display, kod bölme)
- [ ] Mobil öncelikli; tüm para sayfaları mobilde kusursuz

**Sayfa içi**
- [ ] Her sayfada tek `<h1>`, mantıklı H2/H3 hiyerarşisi
- [ ] Görsellerde açıklayıcı `alt`
- [ ] İç linkleme: küme → pillar → para sayfası
- [ ] OpenGraph + Twitter Card (paylaşım + bazı AI önizleme)

**Güven**
- [ ] HTTPS, HSTS
- [ ] NAP (isim/adres/telefon) tutarlı: site + GBP + şema
- [ ] Yasal metinler yayında (KVKK, gizlilik) — güven sinyali

---

## 6. gzltek.tech durumu

Şu an gzlteknoloji.com'a 301. **Doğru karar** — SEO gücü tek domainde toplanır, bölünmez. SaaS demoları `<urun>.gzltek.tech` subdomain'e taşındığında:
- Subdomain'ler `noindex` **değil**; ama ana pazarlama içeriği hep gzlteknoloji.com'da kalır.
- Demo subdomain'lerinden ana ürün sayfasına canonical/■link ver.

---

## 7. İlk index'leme aksiyonu (yayın günü)

1. GSC + Bing Webmaster'a domaini ekle, doğrula.
2. `sitemap.xml`'i GSC'ye gönder.
3. En önemli 10 sayfa için "URL Inspection → Request Indexing".
4. GA4 + GTM bağla, dönüşüm olayı: teklif formu submit.
5. İlk hafta günlük GSC "Coverage" kontrolü — hata varsa düzelt (bkz. `05`).
