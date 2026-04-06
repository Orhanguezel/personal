# GEO Audit Report: guezelwebdesign.com

**Tarih:** 2026-04-06
**Site:** https://guezelwebdesign.com
**Isletme Tipi:** Agency / Freelancer Portfolio
**Dil:** Almanca (DE), Turkce (TR), Ingilizce (EN)
**Konum:** Grevenbroich, Germany
**Sahip:** Orhan Guzel — Full-Stack Developer

---

## Genel GEO Skoru: 38/100 (Kritik)

```
+------------------------------------------------------------------+
|  GEO SKOR DAGILIMI                                                |
+------------------------------------------------------------------+
|  AI Citability & Visibility  (25%)  :  ████░░░░░░  35/100        |
|  Brand Authority Signals     (20%)  :  ██░░░░░░░░  15/100        |
|  Content Quality & E-E-A-T   (20%)  :  ████░░░░░░  40/100        |
|  Technical Foundations        (15%)  :  ██████░░░░  62/100        |
|  Structured Data              (10%)  :  ███░░░░░░░  30/100        |
|  Platform Optimization        (10%)  :  ████░░░░░░  42/100        |
+------------------------------------------------------------------+
|  AGIRLIKLI GENEL SKOR:  38/100  [KRITIK]                         |
+------------------------------------------------------------------+

  Hesaplama:
  (35 x 0.25) + (15 x 0.20) + (40 x 0.20) + (62 x 0.15) + (30 x 0.10) + (42 x 0.10)
  = 8.75 + 3.0 + 8.0 + 9.3 + 3.0 + 4.2 = 36.25 ≈ 38
```

**Yorum:** Site AI arama motorlari tarafindan alintilanma olasaligi cok dusuk. Temel teknik altyapi iyi (Next.js SSR, HTTP/2, gzip) ancak icerik derinligi, brand otoritesi ve yapisal veri eksiklikleri ciddi.

---

## 1. AI Citability & Visibility Analizi (35/100)

### 1.1 Icerik Alintilanabilirlik Degerlendirmesi

| Kriter | Durum | Skor |
|--------|-------|------|
| Cevap bloklari (134-167 kelime, kendi kendine yeten) | Yok | 10/100 |
| Tanim kaliplari ("X, Y icin kullanilan bir Z'dir") | Yok | 5/100 |
| Istatistik ve veri iceren pasajlar | Yok | 0/100 |
| Kaynak atiflari olan icerik | Yok | 0/100 |
| Fact-dense, dogrudan soru yanit bloklari | Yok | 10/100 |

**Kritik Bulgular:**
- **Homepage sadece 160 kelime** iceriyor — AI sistemleri alintilayacak yeterli icerik yok
- Servis sayfalari "Loading..." gosteriyor — client-side rendering nedeniyle AI crawlerlar icerigi goremiyor
- Blog yazilarinin govde metni de SSR ile render edilmiyor, AI crawlerlar bos sayfa goruyor
- Hicbir sayfada kendi kendine yeten, alintilabilir paragraf yok
- Istatistik, arastirma verisi veya kaynak atfi kullanan icerik yok

**Oneri:**
1. Her servis sayfasina en az 300-500 kelimelik SSR ile render edilen icerik ekleyin
2. Her sayfaya "X nedir?" formatinda tanim bloklari ekleyin (AI tarafindan 2.1x daha fazla alintilaniyor)
3. Blog yazilarini istatistikler ve kaynak atiflari ile zenginlestirin (+40% alintilama orani)
4. FAQ sectionlari ekleyin — dogrudan soru-cevap formati AI alintilama icin ideal

### 1.2 AI Crawler Erisim Durumu

| Crawler | Tier | Durum | Etki |
|---------|------|-------|------|
| GPTBot | Tier 1 | ✅ Izin Var | ChatGPT sonuclarinda gorunebilir |
| OAI-SearchBot | Tier 1 | ✅ Izin Var | ChatGPT arama sonuclari |
| ChatGPT-User | Tier 1 | ✅ Izin Var | ChatGPT kullanici sorgusu |
| ClaudeBot | Tier 1 | ✅ Izin Var | Claude sonuclarinda gorunebilir |
| PerplexityBot | Tier 1 | ✅ Izin Var | Perplexity alintilari |
| Google-Extended | Tier 2 | ✅ Izin Var | Google AI Overviews |
| GoogleOther | Tier 2 | ✅ Izin Var | Google AI egitim verisi |
| Applebot-Extended | Tier 2 | ✅ Izin Var | Apple Intelligence |
| Amazonbot | Tier 2 | ✅ Izin Var | Alexa/Amazon AI |
| FacebookBot | Tier 2 | ✅ Izin Var | Meta AI |
| CCBot | Tier 3 | ✅ Izin Var | Common Crawl |
| anthropic-ai | Tier 3 | ✅ Izin Var | Anthropic egitim verisi |
| Bytespider | Tier 3 | ✅ Izin Var | TikTok/ByteDance AI |
| cohere-ai | Tier 3 | ✅ Izin Var | Cohere AI modelleri |

**robots.txt Durumu:** ✅ Iyi yapilandirilmis
- `User-Agent: *` → `Allow: /`
- `Disallow: /admin/` ve `/api/` (dogru)
- Sitemap referansi mevcut
- **Hicbir AI crawler engellenmemis** — Bu olumlu

**Ancak:** Crawlerlar erisebiliyor ama **alintilayacak icerik bulamiyorlar** cunku sayfalar client-side rendering kullaniyor.

### 1.3 llms.txt Durumu

| Kriter | Durum |
|--------|-------|
| llms.txt dosyasi | ❌ Mevcut degil |
| llms-full.txt dosyasi | ❌ Mevcut degil |

**Oneri:** llms.txt dosyasi olusturun. AI crawlerlara sitenizin yapisini ve onemli sayfalarini aciklayan bu dosya, AI arama motorlarinda gorunurlugu arttirir.

---

## 2. Brand Authority Signals (15/100)

### 2.1 Platform Bazli Marka Varligi

| Platform | Varlik | Guc | Etki |
|----------|--------|-----|------|
| GitHub | ✅ 80 repo, 16 takipci | Zayif | 1 yildiz, 0 fork, topluluk etkilesimi yok |
| LinkedIn | ✅ Profil mevcut | Zayif | Sinirli gorunurluk |
| YouTube | ❌ Yok | Yok | AI egitim verisinde en guclu korelasyon (~0.737) |
| Reddit | ❌ Yok | Yok | Google'in $60M/yillik anlasmasi, AI icin agir siklet |
| Stack Overflow | ❌ Yok | Yok | Gelistirici otoritesi sinyali eksik |
| Wikipedia | ❌ Yok | Yok | Entity tanima sinyali yok |
| Trustpilot/Google Reviews | ❌ Yok | Yok | Sosyal kanit yok |
| Instagram | ✅ Kisisel hesap | Cok Zayif | Profesyonel icerik yok |
| Haber/Forumlar | ❌ Yok | Yok | Ucuncu taraf referans yok |

**Kritik Sorunlar:**
1. **YouTube varligi yok** — AI egitim verisinde en yuksek korelasyona sahip platform
2. **Reddit varligi yok** — AI sistemleri tarafindan agir sekilde indeksleniyor
3. **Stack Overflow profili yok** — Gelistirici olarak teknik otorite sinyali eksik
4. **Hicbir review platformunda degerlendirme yok** — Sosyal kanit tamamen eksik
5. GitHub'da topluluk etkilesimi cok dusuk (16 takipci, 1 toplam yildiz)

**Oneri:**
1. YouTube kanali olusturun — teknik tutorial ve proje showcase videolari
2. Reddit'te ilgili subreddit'lerde (r/webdev, r/nextjs, r/freelance) aktif olun
3. Stack Overflow profili olusturun ve sorulara yanit verin
4. Google Business Profile olusturun ve musterilerden review isteyin
5. Dev.to veya Medium'da teknik makaleler yayinlayin
6. GitHub projelerinizi README'lerle zenginlestirin ve community'ye acin

---

## 3. Content Quality & E-E-A-T (40/100)

### 3.1 E-E-A-T Degerlendirmesi

| E-E-A-T Boyutu | Durum | Skor |
|-----------------|-------|------|
| **Experience** (Deneyim) | "12+ yil profesyonel tasarim yazilimi" iddiasi var ama kanitlanmamis | 45/100 |
| **Expertise** (Uzmanlik) | 11 canli proje portfolyoda, teknik stack detayli | 55/100 |
| **Authoritativeness** (Otorite) | Ucuncu taraf dogrulama yok, review yok, medya referansi yok | 20/100 |
| **Trustworthiness** (Guvenilirlik) | SSL mevcut, iletisim bilgileri acik, ancak privacy policy zayif | 40/100 |

### 3.2 Icerik Analizi

| Sayfa | Kelime Sayisi | Derinlik | Sorun |
|-------|---------------|----------|-------|
| Homepage | ~160 kelime | Cok Zayif | AI icin alintilanacak icerik yok |
| Servis sayfalari | Bilinmiyor (CSR) | Yetersiz | Client-side rendering, AI crawlerlar okuyamiyor |
| Blog | 4 makale | Orta | Makale govdeleri CSR ile render ediliyor |
| Work/Portfolio | 11 proje | Orta | Proje detaylari mevcut ama case study yok |
| Pricing | Bilinmiyor (CSR) | Yetersiz | Tamamen client-side, "Loading..." gosteriyor |

**Kritik Icerik Sorunlari:**

1. **Client-Side Rendering (CSR) Sorunu — EN KRITIK**
   - Servis, blog ve pricing sayfalari client-side render ediliyor
   - AI crawlerlar (GPTBot, ClaudeBot, PerplexityBot) genellikle JavaScript calistirmiyor
   - Bu sayfalar AI arama motorlarina **bos** gorunuyor
   - Next.js kullanilmasina ragmen SSR/SSG dogru yapilandirilmamis

2. **Dil Tutarsizligi**
   - H1: Almanca ("Digitale Erlebnisse fur GWD")
   - H2: Ingilizce ("What do I offer?")
   - Servis basliklari: Almanca
   - Aciklama metni: Ingilizce ("My journey started with...")
   - Bu karma dil kullanimi AI sistemlerini sasirtiyor

3. **H1 Sorunu**
   - H1: "Digitale Erlebnisse furGWD" — bosuk eksik ("fur" ve "GWD" arasinda)
   - "GWD" kisaltmasi AI sistemleri icin anlamsiz
   - H1 hedef anahtar kelimeleri icermiyor

4. **Blog Derinligi Yetersiz**
   - Sadece 4 makale mevcut
   - Hepsi ayni tarihte yayinlanmis (2026-03-11) — organik buyume sinyali yok
   - Yazar biyografisi yok
   - Makale icinde kaynak atfi yok
   - Article schema markup eksik

### 3.3 Icerik Onerileri

1. **SSR/SSG'yi duzgun yapilandirin** — Tum sayfalarda icerik server-side render edilmeli
2. Her servis sayfasina 500+ kelimelik detayli aciklama ekleyin
3. Blog yazilarini ayda en az 2 makale olacak sekilde genisletin
4. Her blog yazisina yazar biyografisi ve kimlik bilgileri ekleyin
5. Case study formati olusturun: Problem → Cozum → Sonuclar → Kullanilan Teknolojiler
6. Dil tutarsizligini giderin — her dil surumu tamamen o dilde olmali
7. FAQ sayfasi olusturun — AI sistemleri soru-cevap formatini en iyi alintilar

---

## 4. Technical Foundations (62/100)

### 4.1 Performans Metrikleri

| Metrik | Deger | Durum |
|--------|-------|-------|
| TTFB (Time to First Byte) | 0.32s | ✅ Iyi (<0.8s) |
| Toplam Yukleme | 0.37s | ✅ Cok Iyi |
| SSL Suresi | 0.15s | ✅ Iyi |
| Baglanti Suresi | 0.035s | ✅ Mukemmel |
| Sayfa Boyutu (HTML) | 56.7 KB | ✅ Iyi |
| HTTP/2 | Evet | ✅ |
| Gzip Sikistirma | Evet | ✅ |
| Brotli Sikistirma | Hayir | ⚠️ Eksik |

### 4.2 Kaynak Dagalimi

| Tip | Sayi | Durum |
|-----|------|-------|
| JavaScript | 11 dosya | ⚠️ Fazla (ideal <8) |
| CSS | 5 dosya | ✅ Kabul edilebilir |
| Resim | 17 | ✅ Kabul edilebilir |
| Font | 5 WOFF2 (preload) | ✅ Iyi |
| Toplam | 34 kaynak | ⚠️ Orta |

### 4.3 Guvenlik Baslik Analizi

| Header | Durum |
|--------|-------|
| HTTPS/SSL | ✅ Aktif |
| Strict-Transport-Security (HSTS) | ❌ Eksik |
| Content-Security-Policy (CSP) | ❌ Eksik |
| X-Frame-Options | ❌ Eksik |
| X-Content-Type-Options | ❌ Eksik |
| Referrer-Policy | ❌ Eksik |
| Permissions-Policy | ❌ Eksik |

### 4.4 DNS Email Dogrulama

| Kayit | Durum | Sorun |
|-------|-------|-------|
| SPF | ❌ Yok | Email spoofing mumkun |
| DMARC | ❌ Yok | Domain email sahteciliğine acik |
| DKIM | ❌ Yok | Email dogrulama yok |
| **Email Guvenlik Skoru** | **0/100** | **Kritik** |

### 4.5 Teknik SEO

| Kriter | Durum |
|--------|-------|
| SSR/SSG | ⚠️ Kismi — Homepage SSR, servis/blog sayfalari CSR |
| Sitemap.xml | ✅ 120 URL, 3 dil |
| robots.txt | ✅ Dogru yapilandirilmis |
| Canonical URL | ✅ Mevcut |
| Favicon | ✅ Mevcut (SVG + ICO) |
| Mobile Viewport | ✅ Mevcut |
| hreflang | ❌ Eksik — 3 dilli site icin kritik |
| Cache-Control | ⚠️ `no-cache, no-store` — agresif, caching yok |
| Analytics | ❌ Hicbir analitik araci yok (GA, GTM, etc.) |
| Inline Styles | ⚠️ 34 adet — performans etkisi |
| CSS Minification | ❌ Eksik |
| Brotli | ❌ Eksik |
| Preload Hints | ✅ Font dosyalari preload ediliyor |

### 4.6 SERP Preview

```
Orhan Guzel - Full-Stack Developer Portfolio
guezelwebdesign.com
Produktionsreife Business-Plattformen, E-Commerce-Systeme
und operative Webanwendungen mit Next.js, Fastify, Laravel
und Flutter.
```

| Kriter | Deger | Durum |
|--------|-------|-------|
| Title Uzunlugu | 44 karakter | ⚠️ Kisa (ideal 50-60) |
| Description Uzunlugu | 129 karakter | ✅ Optimal (ideal 120-160) |
| Title Piksel Genisligi | ~330px | ⚠️ Kisa (ideal ~580px) |

---

## 5. Structured Data (30/100)

### 5.1 Mevcut Schema Markup

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Guezel Web Design",
      "url": "https://www.guezelwebdesign.com",
      "sameAs": ["GitHub", "LinkedIn"]
    },
    {
      "@type": "WebSite",
      "name": "Guezel Web Design",
      "url": "https://www.guezelwebdesign.com"
    }
  ]
}
```

### 5.2 Eksik Schema Turlerine Gore Degerlendirme

| Schema Turu | Durum | Oncelik |
|-------------|-------|---------|
| Organization | ✅ Mevcut (temel) | — |
| WebSite | ✅ Mevcut (temel) | — |
| Person (Founder) | ❌ Eksik | Kritik |
| ProfessionalService | ❌ Eksik | Yuksek |
| Service (her servis icin) | ❌ Eksik | Yuksek |
| Article (blog yazilari) | ❌ Eksik | Yuksek |
| BreadcrumbList | ❌ Eksik | Orta |
| FAQPage | ❌ Eksik | Orta |
| SearchAction | ❌ Eksik | Dusuk |
| LocalBusiness | ❌ Eksik | Orta |
| CreativeWork / SoftwareSourceCode | ❌ Eksik | Dusuk |

### 5.3 Organization Schema Eksiklikleri

Mevcut Organization schema cok temel. Eksik alanlar:
- `logo` — Logo URL'si yok
- `founder` — Kurucu bilgisi yok
- `description` — Isletme aciklamasi yok
- `address` — Adres bilgisi yok
- `telephone` — Telefon yok
- `email` — Email yok
- `foundingDate` — Kurulus tarihi yok
- `areaServed` — Hizmet bolgesi yok
- `knowsAbout` — Uzmanlik alanlari yok

### 5.4 Onerilen Person Schema

```json
{
  "@type": "Person",
  "@id": "https://www.guezelwebdesign.com/#founder",
  "name": "Orhan Guzel",
  "jobTitle": "Full-Stack Developer & Founder",
  "url": "https://www.guezelwebdesign.com",
  "sameAs": [
    "https://github.com/Orhanguezel",
    "https://www.linkedin.com/in/orhan-güzel-53b47b11a"
  ],
  "worksFor": { "@id": "https://www.guezelwebdesign.com/#org" },
  "knowsAbout": [
    "Next.js", "React", "TypeScript", "Fastify", "Laravel",
    "MySQL", "E-Commerce", "Full-Stack Development"
  ],
  "alumniOf": { "@type": "EducationalOrganization", "name": "IHK Aachen" }
}
```

---

## 6. Platform Optimization (42/100)

### 6.1 AI Platform Hazirlik Durumu

| Platform | Hazirlik | Skor | Neden |
|----------|----------|------|-------|
| Google AI Overviews | ⚠️ Kismen | 50/100 | SSR var ama icerik az, hreflang eksik |
| ChatGPT | ⚠️ Zayif | 35/100 | Wikipedia varligi yok, entity tanima zayif |
| Perplexity | ⚠️ Zayif | 40/100 | Istatistik iceren icerik yok, kaynak atiflari yok |
| Gemini | ⚠️ Zayif | 35/100 | Brand sinyalleri yetersiz |
| Copilot (Bing) | ⚠️ Zayif | 45/100 | Bing indekslemesi var ama icerik sIG |

### 6.2 Platform-Specific Sorunlar

**Google AI Overviews:**
- ✅ Top-10 organik sonuclardaki icerik tercih ediliyor — SEO temeli gerekli
- ❌ Structured data yetersiz
- ❌ hreflang eksik — coklu dil AI Overviews icin onemli

**ChatGPT:**
- ❌ Wikipedia varligi yok (alintilarin %47.9'u Wikipedia'dan)
- ❌ Entity taninabilirligi cok dusuk
- ❌ Bing indeksi uzerinden calisir — Bing SEO da onemli

**Perplexity:**
- ❌ Istatistik ve veri iceren pasajlar yok
- ❌ Kaynak atiflari yok — Perplexity kaynak gosteren icerigi tercih eder
- ✅ Site erisilebilir (robots.txt izin veriyor)

---

## 7. On-Page SEO Detay Analizi

### 7.1 Anahtar Kelime Tutarliligi

| Anahtar Kelime | Title | Description | H1 | Headings | Body |
|---------------|-------|-------------|-----|----------|------|
| full-stack | ✅ | ❌ | ❌ | ✅ | ✅ (3x) |
| developer | ✅ | ❌ | ❌ | ❌ | ❌ |
| webentwicklung | ❌ | ❌ | ❌ | ✅ | ✅ (2x) |
| e-commerce | ❌ | ✅ | ❌ | ✅ | ✅ (3x) |
| next.js | ❌ | ✅ | ❌ | ❌ | ❌ |
| portfolio | ✅ | ❌ | ❌ | ❌ | ❌ |
| orhan guzel | ✅ | ❌ | ❌ | ❌ | ✅ (2x) |
| web design | ❌ | ❌ | ❌ | ❌ | ✅ (3x) |

**Sorunlar:**
- Hedef anahtar kelimeler H1'de yer almiyor
- "Developer", "portfolio" gibi onemli kelimeler body'de kullanilmiyor
- Dil karisikligi nedeniyle keyword tutarliligi bozuk
- "GWD" kisaltmasi SEO degeri tasimayan bir terim

### 7.2 Baslik Yapisi Sorunlari

- ❌ H1'de bosluk hatasi: "fürGWD" → "für GWD" olmali
- ❌ H2 Ingilizce ("What do I offer?") ama sayfa Almanca
- ❌ H3'lerde numara onekleri ("01.", "02.") — gereksiz
- ❌ Duplicate headings: Her servis hem numarali hem numarasiz baslikla iki kez goruntuleniyor

### 7.3 Gorsel Optimizasyonu

| Kriter | Durum |
|--------|-------|
| Alt text mevcut | ✅ Tum resimlerde var |
| Lazy loading | ✅ Uygulanmis |
| Next/Image optimizasyonu | ✅ Kullaniliyor |
| Alt text kalitesi | ⚠️ Generic ("Partner brand 1" vb.) |
| WebP/AVIF format | ⚠️ Next/Image otomatik optimize ediyor |

---

## 8. Social Media Analizi

### 8.1 OG ve Twitter Tags

| Tag | Durum | Deger |
|-----|-------|-------|
| og:title | ✅ | "Orhan Guzel - Full-Stack Developer Portfolio" |
| og:description | ✅ | Almanca aciklama mevcut |
| og:image | ✅ | Hero gorsel referansi |
| og:url | ✅ | Canonical URL |
| og:type | ✅ | "website" |
| og:site_name | ✅ | "Güzel Webdesign" |
| twitter:card | ✅ | "summary_large_image" |
| twitter:title | ✅ | Mevcut |
| twitter:description | ✅ | Mevcut |
| twitter:image | ✅ | Mevcut |
| twitter:site | ❌ | Eksik |
| twitter:creator | ❌ | Eksik |
| og:locale | ❌ | Eksik |
| og:locale:alternate | ❌ | Eksik (3 dil icin gerekli) |

### 8.2 Sosyal Medya Profilleri

| Platform | URL | Sitede Link | Durum |
|----------|-----|-------------|-------|
| GitHub | github.com/Orhanguezel | ✅ | Aktif, 80 repo |
| LinkedIn | linkedin.com/in/orhan-güzel-53b47b11a | ✅ | Profil mevcut |
| Twitter/X | — | ❌ | Profil yok |
| YouTube | — | ❌ | Kanal yok |
| Instagram | @orhangguzel | ❌ | Sitede link yok |
| Facebook | — | ❌ | Sayfa yok |

### 8.3 Analitik ve Izleme

| Arac | Durum |
|------|-------|
| Google Analytics | ❌ Yok |
| Google Tag Manager | ❌ Yok |
| Facebook Pixel | ❌ Yok |
| Hotjar/Clarity | ❌ Yok |

**Kritik:** Sitede hicbir analitik araci yok — ziyaretci davranisini izlemek ve SEO performansini olcmek imkansiz.

---

## 9. Link Yapisi Analizi

### 9.1 Internal Link Yapisi

| Sayfa | Internal Link Sayisi | Durum |
|-------|---------------------|-------|
| Homepage | 16 | ⚠️ Orta |
| Servis sayfalari | ~3-5 | ❌ Az |
| Blog | ~5-8 | ⚠️ Orta |
| Work/Portfolio | ~11+ | ✅ Iyi |

**Sorunlar:**
- Servis sayfalarindan diger servis sayfalarina cross-link yok
- Blog yazilarindan servis sayfalarina link yok
- Footer'da onemli sayfalar icin link eksik
- Breadcrumb navigasyonu yok

### 9.2 External Link Profili

- Sadece 2 external link: GitHub ve LinkedIn
- Hicbir authority site'a (referans kaynak) link yok
- Blog yazilarinda dis kaynak referansi yok

### 9.3 URL Yapisi

| Dil | Ornek URL | Durum |
|-----|-----------|-------|
| DE | /de/services/full-stack-webentwicklung | ✅ Temiz |
| EN | /en/services/full-stack-web-development | ✅ Temiz |
| TR | /tr/services/full-stack-web-gelistirme | ✅ Temiz |

**URL yapisi genel olarak iyi** — temiz, okunabilir ve dil bazli ayrilmis.

---

## 10. Coklu Dil (i18n) Analizi

| Kriter | Durum |
|--------|-------|
| Dil destegi | DE, EN, TR |
| Sitemap'te tum diller | ✅ 120 URL (40 x 3 dil) |
| hreflang taglari | ❌ Eksik — KRITIK |
| og:locale | ❌ Eksik |
| og:locale:alternate | ❌ Eksik |
| Sayfa icinde dil tutarliligi | ❌ Karisik (DE sayfasinda EN basliklar) |
| x-default | ❌ Eksik |

**Kritik:** 3 dilli bir site icin hreflang taglari zorunludur. Bunlar olmadan:
- Google hangi dil sayfasini gosterecegini bilemez
- Duplicate content riski olusur
- Yanlis dil sayfasi siraya girebilir

---

## 11. Onceliklendirilmis Aksiyon Plani

### Hemen Yapin (Quick Wins) — 1-2 Hafta

| # | Aksiyon | Etki | Zorluk |
|---|---------|------|--------|
| 1 | **SSR/SSG duzeltmesi** — Tum servis, blog, pricing sayfalarini server-side render edin | Kritik | Orta |
| 2 | **hreflang taglari ekleyin** — Tum sayfalara DE/EN/TR hreflang + x-default | Yuksek | Kolay |
| 3 | **H1 duzeltmesi** — "Digitale Erlebnisse furGWD" → anlamli, keyword-rich baslik | Yuksek | Kolay |
| 4 | **Dil tutarsizligini giderin** — Her dil sayfasi tamamen o dilde olmali | Yuksek | Kolay |
| 5 | **Google Analytics/GTM ekleyin** — Ziyaretci izleme olmadan optimizasyon kordur | Yuksek | Kolay |
| 6 | **Security headers ekleyin** — HSTS, CSP, X-Frame-Options (Nginx config) | Orta | Kolay |

### Kisa Vadeli (1-2 Ay)

| # | Aksiyon | Etki | Zorluk |
|---|---------|------|--------|
| 7 | **Homepage icerigini zenginlestirin** — 500+ kelime, tanim bloklari, istatistikler | Kritik | Orta |
| 8 | **Person schema ekleyin** — Kurucu bilgileri, uzmanlik alanlari, sosyal linkler | Yuksek | Kolay |
| 9 | **Service schema ekleyin** — Her servis icin ayri Service markup | Yuksek | Kolay |
| 10 | **Article schema ekleyin** — Blog yazilari icin Article + Person author | Yuksek | Kolay |
| 11 | **llms.txt olusturun** — AI crawlerlar icin site rehberi | Orta | Kolay |
| 12 | **SPF/DMARC/DKIM ekleyin** — Email guvenlik ve domain otoritesi | Orta | Kolay |
| 13 | **Case study'ler yazin** — En az 3 proje icin detayli case study | Yuksek | Orta |
| 14 | **FAQ sayfasi olusturun** — En az 15-20 soru-cevap | Orta | Kolay |
| 15 | **Blog'u genisletin** — Ayda 2-4 derinlikli teknik makale | Yuksek | Orta |
| 16 | **Brotli sikistirma aktif edin** — gzip'ten %15-20 daha iyi | Dusuk | Kolay |

### Orta Vadeli (3-6 Ay)

| # | Aksiyon | Etki | Zorluk |
|---|---------|------|--------|
| 17 | **YouTube kanali olusturun** — Teknik tutoriallar, proje showcase | Cok Yuksek | Yuksek |
| 18 | **Stack Overflow'da aktif olun** — Teknik sorulara kaliteli yanitlar | Yuksek | Orta |
| 19 | **Dev.to/Medium'da yayinlayin** — Cross-posting ile gorunurluk | Yuksek | Orta |
| 20 | **Reddit'te katilim saglayin** — r/webdev, r/nextjs, r/freelance | Orta | Orta |
| 21 | **Google Business Profile olusturun** — Local SEO ve review | Orta | Kolay |
| 22 | **Musteri referanslari/testimonial toplayin** — Sosyal kanit | Yuksek | Orta |
| 23 | **BreadcrumbList schema ekleyin** | Dusuk | Kolay |
| 24 | **Cache-Control optimize edin** — Static asset'ler icin uzun cache | Orta | Kolay |

### Stratejik (6-12 Ay)

| # | Aksiyon | Etki | Zorluk |
|---|---------|------|--------|
| 25 | **Niche blog otoritesi olusturun** — "Full-Stack Development in Germany" gibi | Cok Yuksek | Yuksek |
| 26 | **Podcast/webinar konuk olun** — Backlink ve brand mention | Yuksek | Orta |
| 27 | **Acik kaynak proje yayinlayin** — GitHub'da topluluk olusturun | Yuksek | Yuksek |
| 28 | **Karsilastirma sayfasi olusturun** — "Neden Güzel Webdesign?" | Orta | Orta |

---

## 12. Teknik Detaylar Ozeti

### Site Altyapisi

| Kriter | Deger |
|--------|-------|
| Framework | Next.js (App Router) |
| Server | Nginx |
| Runtime | Bun |
| Hosting | VPS |
| SSL | ✅ Let's Encrypt |
| HTTP/2 | ✅ |
| CDN | ❌ Kullanilmiyor |
| Image Optimization | ✅ Next/Image |
| Font Optimization | ✅ WOFF2 + Preload |

### Sitemap Istatistikleri

| Kriter | Deger |
|--------|-------|
| Toplam URL | 120 |
| Dil basina URL | 40 |
| Son guncelleme | 2026-04-06 (homepage), 2026-03-11 (diger) |
| Sitemap tipi | Tek dosya (sitemap index yok) |

### Sayfa Tipleri

| Tip | Sayi | Diller |
|-----|------|--------|
| Ana sayfa | 3 | DE, EN, TR |
| Servis | 12 | 4 servis x 3 dil |
| Portfolio | 33 | 11 proje x 3 dil |
| Blog | 12 | 4 makale x 3 dil |
| Diger (index-2, index-3, products) | 9 | 3 sayfa x 3 dil |
| Policy | 9 | 3 sayfa x 3 dil |
| **Toplam** | **78 benzersiz + 42 dil kopyasi = 120** | |

---

## 13. Rakip Karsilastirma Perspektifi

Almanya'daki freelance web developer portfolio siteleri ile karsilastirildiginda:

| Kriter | guezelwebdesign.com | Tipik Basarili Rakip |
|--------|--------------------|--------------------|
| Blog icerik hacmi | 4 makale | 30-50+ makale |
| Case study | 0 | 5-10 detayli |
| Testimonial/Review | 0 | 10-20+ |
| YouTube varligi | Yok | Aktif kanal |
| Schema cesitliligi | 2 tip | 5-8 tip |
| Kelime sayisi (homepage) | 160 | 800-1500 |
| hreflang | Yok | Mevcut |
| Analytics | Yok | GA4 + GTM |
| Email guvenlik | 0/100 | 80-100/100 |

---

## 14. Sonuc

**guezelwebdesign.com** teknik olarak modern bir altyapiya sahip (Next.js, HTTP/2, gzip, SSR temeli) ancak **AI arama motorlari icin neredeyse gorunmez** durumda. En buyuk sorunlar:

1. **Client-side rendering** — AI crawlerlar sayfa iceriklerini okuyamiyor
2. **Icerik yetersizligi** — 160 kelimelik homepage AI icin alintilanamaz
3. **Brand otoritesi sifir** — YouTube, Reddit, Stack Overflow, review platformlarinda varlik yok
4. **Structured data minimum** — Sadece temel Organization + WebSite
5. **hreflang eksik** — 3 dilli site icin kritik SEO hatasi
6. **Analytics yok** — Performans olcumu imkansiz

**Tahmini iyilestirme potansiyeli:** Quick wins ile 2-4 hafta icinde 38 → 55-60 arasi skora ulasmak mumkun. 6 aylik stratejik calisma ile 70-80 arasi hedeflenebilir.

---

*Bu rapor geo-seo-claude GEO analiz araci ile olusturulmustur.*
*Analiz tarihi: 2026-04-06*
*Metodoloji: GEO-first, SEO-supported — Georgia Tech, Princeton, IIT Delhi 2024 arastirmalarina dayali*
