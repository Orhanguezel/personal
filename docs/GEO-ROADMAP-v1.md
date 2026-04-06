# GEO Optimizasyon Yol Haritasi & Gorev Dagitimi

**Proje:** guezelwebdesign.com
**Tarih:** 2026-04-06
**Mevcut GEO Skoru:** 38/100 (Kritik)
**Hedef:** 70+ (3 ay) / 80+ (6 ay)
**Hazirlayan:** Claude Code (Mimar & Stratejist)

---

## Gorev Dagitimi — AI Arac Rolleri

| Arac | Sorumluluk Alani |
|------|-----------------|
| **Claude Code** | Mimari kararlar, schema tasarimi, SSR/SSG yapilandirmasi, teknik SEO altyapisi, llms.txt, guvenlik headerlari, hreflang sistemi, cache stratejisi |
| **Cursor AI** | Kod implementasyonu, component refactoring, i18n duzeltmeleri, SSR donusumleri, schema JSON-LD ekleme, GA4/GTM entegrasyonu |
| **Antigravity AI** | UI dogrulama, lighthouse skorlari, gorsel regression testleri, deploy sonrasi kontrol |
| **Orhan (Manuel)** | DNS kayitlari (SPF/DMARC/DKIM), YouTube/Reddit/StackOverflow hesaplari, icerik yazimi (blog/case study), musteri testimonial toplama, Google Business Profile |

---

## Cursor AI — Uygulama durumu (kod tabani)

> Son guncelleme: 2026-04-06. Asagidaki maddeler repoda uygulanmis karsiliklari isaretler.

| Kod / dosya | Durum |
|-------------|--------|
| `buildMetadata` + `alternates.languages` (hreflang DE/EN/TR + `x-default`→DE) + `openGraph.alternateLocale` | Tamam (`frontend/seo/metadata.ts`) |
| Liste sayfalari: sunucu verisi + RTK `skip` (API tekrari yok) | Tamam (`ServicesClient`, `BlogList`, `Work.client`) |
| `generateStaticParams` blog/service/work `[slug]` + **API yokken build** | Tamam (`safeGenerateStaticSlugParams.ts`) |
| Consent Mode v2 + `dataLayer` + GA/GTM (`GlobalScripts`, locale layout) | Tamam (`frontend/seo/scripts.tsx`) |
| Guvenlik + cache header (Next) | Tamam (`frontend/next.config.mjs` — `headers`) |
| H1 / hero metinleri (ui_home.home1) DE/EN/TR | Tamam (`frontend/public/ui/*.json`) |
| Person + ProfessionalService JSON-LD | Tamam (`frontend/seo/jsonld.ts`, `seo.server.ts`) |
| Homepage ek metin blogu (GEO intro) | Tamam (`HomeSeoIntro`, `content/geo-home-intro.ts`) |
| `llms.txt` + `llms-full.txt` | Tamam (`frontend/public/`) |
| FAQ sayfasi + FAQPage JSON-LD | Tamam (`frontend/app/[locale]/faq/page.tsx`) |
| Pricing sayfasi tam SSR ayristirma | Tamam (`page.tsx` server fetch: `getPricingPageCopyServer`, `getPricingPublicServer`, `getFaqsListServer`; `PricingClient` RTK sadece API dusukse; FAQ `<details>` ile JS’siz acilabilir) |
| Blog detay: yazar biosu + Article schema (genisletme) | Tamam (`BlogDetail` yazar blogu; `blog/[slug]/page.tsx` Article + publisher + mutlak URL) |
| Case study section + schema (work detail) | Tamam (`CreativeWork` JSON-LD + istege bagli `content.case_study` UI; `jsonld.creativeWork`) |
| Menuye FAQ linki / footer ic linkler | Tamam (`171_menu_items_seed.sql` header/footer `/faq`) |
| Homepage FAZ 2.1: istatistik + teknoloji yigini + mini SSS + FAQPage JSON-LD | Tamam (`HomeGeoBlocks`, `content/geo-home-blocks.ts`) |
| FAZ 3.3: Testimonials (homepage SSR veri) + `/testimonials` + Review/AggregateRating JSON-LD | Tamam (`Testimonials1`, `testimonials/page.tsx`, `jsonld.testimonialsReviewGraph`, menu + sitemap + `seo_pages_testimonials` seed) |

**Manuel / diger arac:** GA4 property + GTM ID’yi admin `site_settings` veya env ile girmek (Orhan). Nginx header (VPS) Orhan. Antigravity: build sonrasi `curl`/Lighthouse.

---

## FAZ 1 — Quick Wins (Hafta 1-2) | Hedef: 38 → 55

### 1.1 [CRITICAL] SSR/SSG Duzeltmesi — +8 puan

**Sorun:** Servis, blog, pricing sayfalari client-side rendering kullaniyor. AI crawlerlar (GPTBot, ClaudeBot, PerplexityBot) JavaScript calistirmiyor ve bu sayfalari bos goruyor.

**Claude Code gorevi:**
- CSR kullanan tum route'lari tespit et
- Her route icin SSR/SSG stratejisi belirle (hangileri static, hangileri dynamic)
- `"use client"` directive'leri analiz et, gereksiz olanlari isaretLE

**Cursor AI gorevi:**
- `"use client"` olan sayfa componentlerini server component'e donustur
- Client interaktivitesi gereken parcalari ayri client component'lere tasi
- `generateStaticParams()` ekle (portfolio, blog, servis sayfalari icin)
- `generateMetadata()` fonksiyonlarini tum sayfalara ekle
- fetch islemlerini server-side'a tasi

**Antigravity AI gorevi:**
- Donusum sonrasi her sayfanin SSR ciktisini dogrula (curl ile HTML kontrolu)
- `view-source:` ile sayfa iceriginin HTML'de gorunup gorunmedigini kontrol et

**Dosyalar:**
```
frontend/app/[locale]/services/         → SSR'a donustur
frontend/app/[locale]/blog/             → SSR'a donustur  
frontend/app/[locale]/pricing/          → SSR'a donustur
frontend/app/[locale]/work/             → SSR kontrol et
frontend/components/sections/           → Client parcalarini ayir
```

---

### 1.2 [CRITICAL] hreflang Taglari — +4 puan

**Sorun:** 3 dilli site (DE/EN/TR) hreflang taglari olmadan calisiyor. Google hangi dil sayfasini gosterecegini bilemez.

**Claude Code gorevi:**
- hreflang stratejisi tasarla (layout.tsx'te mi, middleware'de mi, generateMetadata'da mi)
- x-default dil secimini belirle (DE — Almanya pazari)

**Cursor AI gorevi:**
- Root layout veya generateMetadata icinde hreflang taglari olustur
- Tum 120 URL icin DE/EN/TR + x-default hreflang ekle
- `<link rel="alternate" hreflang="de" href="...">` pattern'ini uygula
- og:locale ve og:locale:alternate taglari ekle

**Ornek cikti:**
```html
<link rel="alternate" hreflang="de" href="https://guezelwebdesign.com/de/..." />
<link rel="alternate" hreflang="en" href="https://guezelwebdesign.com/en/..." />
<link rel="alternate" hreflang="tr" href="https://guezelwebdesign.com/tr/..." />
<link rel="alternate" hreflang="x-default" href="https://guezelwebdesign.com/de/..." />
```

---

### 1.3 [CRITICAL] H1 Duzeltmesi & Dil Tutarliligi — +5 puan

**Sorun:** H1 "Digitale Erlebnisse furGWD" — bosluk hatasi + anlamsiz kisaltma. Almanca sayfada Ingilizce basliklar.

**Claude Code gorevi:**
- Her dil icin keyword-rich H1 onerisi hazirla
- Tum sayfalardaki dil karisikliklarini listele

**Cursor AI gorevi:**
- H1'leri duzelt:
  - DE: "Orhan Guzel — Full-Stack Webentwickler aus Grevenbroich"
  - EN: "Orhan Guzel — Full-Stack Web Developer from Germany"
  - TR: "Orhan Guzel — Full-Stack Web Gelistirici"
- Her dil sayfasindaki karisik dil iceriklerini dogru cevirilerle degistir
- "What do I offer?" → DE: "Was biete ich an?" / TR: "Neler sunuyorum?"
- Tum H2, H3 basliklarindaki dil tutarsizligini gider

---

### 1.4 [CRITICAL] Google Analytics 4 + GTM — Veri temeli

**Sorun:** Sitede hicbir analitik araci yok. SEO performansini olcmek imkansiz.

**Orhan gorevi:**
- GA4 property olustur (analytics.google.com)
- GTM container olustur (tagmanager.google.com)
- Google Search Console'a site ekle ve dogrula

**Cursor AI gorevi:**
- GTM script'ini `frontend/app/layout.tsx`'e ekle (next/script ile)
- Consent mode v2 uyumlu yapi kur (GDPR — Almanya icin zorunlu)
- Event tracking icin temel data layer olustur

---

### 1.5 [HIGH] Guvenlik Headerlari — Guvenilirlik artisi

**Claude Code gorevi:**
- Nginx config icin guvenlik header blogu hazirla

**Cursor AI gorevi (veya dogrudan Nginx config):**
```nginx
# /etc/nginx/conf.d/security-headers.conf
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;" always;
```

**Orhan gorevi:**
- Nginx config'i VPS'e deploy et ve reload yap

---

### 1.6 [CRITICAL] SPF/DMARC/DKIM — Email Guvenlik 0 → 80+

**Orhan gorevi (DNS):**
```
# SPF Record (TXT)
v=spf1 mx a include:_spf.google.com ~all

# DMARC Record (_dmarc.guezelwebdesign.com TXT)
v=DMARC1; p=quarantine; rua=mailto:dmarc@guezelwebdesign.com; pct=100

# DKIM — mail provider'a gore olusturulacak
```

---

## FAZ 2 — Icerik & Schema Zenginlestirme (Hafta 3-6) | Hedef: 55 → 65

### 2.1 [CRITICAL] Homepage Icerik Zenginlestirme — +6 puan

**Sorun:** Homepage sadece 160 kelime. AI alintilama icin en az 500+ kelime gerekli.

**Claude Code gorevi:**
- Homepage icerik mimarisini tasarla (her dil icin ayri)
- Alintilabilir blok yapisi belirle (134-167 kelime, kendi kendine yeten paragraflar)

**Cursor AI gorevi:**
- Asagidaki section'lari homepage'e ekle:
  1. **Hero tanim blogu** (150+ kelime) — "Orhan Guzel, Almanya/Grevenbroich merkezli bir Full-Stack Developer'dir. 12+ yillik deneyimiyle Next.js, Fastify, Laravel ve Flutter kullanan uretim seviyesinde web uygulamalari gelistirmektedir..."
  2. **Istatistik bolgesi** — "11+ canli proje, 9+ memnun musteri, 3 dilde hizmet, 5+ yillik Next.js deneyimi"
  3. **Hizmet ozeti** (200+ kelime) — Her hizmet icin 2-3 cumlelik tanim
  4. **Neden ben?** FAQ formati (150+ kelime) — 3-5 soru-cevap blogu
  5. **Teknoloji yiginimiz** — Kullanilan teknolojilerin kategorize listesi
- Toplam hedef: Her dil icin 600-800 kelime

**Antigravity AI gorevi:**
- Yeni homepage'in gorsel tutarliligini dogrula
- Mobile responsive kontrolu

---

### 2.2 [HIGH] Structured Data Genisletme — +6 puan

**Claude Code gorevi:**
- Tum schema tiplerini tasarla (JSON-LD)

**Cursor AI gorevi — asagidaki schemalari ekle:**

**Person Schema (kurucu):**
```json
{
  "@type": "Person",
  "@id": "https://www.guezelwebdesign.com/#founder",
  "name": "Orhan Guzel",
  "jobTitle": "Full-Stack Developer & Founder",
  "url": "https://www.guezelwebdesign.com",
  "image": "https://www.guezelwebdesign.com/images/orhan-guzel.jpg",
  "sameAs": [
    "https://github.com/Orhanguezel",
    "https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a"
  ],
  "knowsAbout": ["Next.js", "React", "TypeScript", "Fastify", "Laravel", "Flutter", "MySQL", "E-Commerce", "Full-Stack Development"],
  "worksFor": { "@id": "https://www.guezelwebdesign.com/#org" },
  "alumniOf": { "@type": "EducationalOrganization", "name": "IHK Aachen" }
}
```

**ProfessionalService Schema:**
```json
{
  "@type": "ProfessionalService",
  "name": "Guzel Web Design",
  "founder": { "@id": "https://www.guezelwebdesign.com/#founder" },
  "areaServed": ["Germany", "Europe"],
  "knowsLanguage": ["de", "en", "tr"],
  "priceRange": "$$"
}
```

**Service Schema (her servis icin ayri):**
- Full-Stack Web Development
- E-Commerce Solutions
- UI/UX Design
- Mobile App Development

**Article Schema (blog yazilari icin):**
- author, datePublished, dateModified, image, publisher

**BreadcrumbList Schema (tum sayfalar):**
- Home > Services > [Service Name]
- Home > Blog > [Article Title]
- Home > Work > [Project Name]

**FAQPage Schema (FAQ sayfasi icin)**

---

### 2.3 [HIGH] llms.txt Olusturma — +2 puan

**Claude Code gorevi — dogrudan olustur:**

```
# Guzel Web Design
> Full-Stack Web Development Agency based in Grevenbroich, Germany

## About
Guzel Web Design is a full-stack web development agency founded by Orhan Guzel. 
We specialize in production-ready business platforms, e-commerce systems, and 
operational web applications using Next.js, Fastify, Laravel, and Flutter.

## Services
- [Full-Stack Web Development](/en/services/full-stack-web-development)
- [E-Commerce Solutions](/en/services/e-commerce-solutions)
- [UI/UX Design](/en/services/ui-ux-design)
- [Mobile App Development](/en/services/mobile-app-development)

## Portfolio
- [Ensotek](/en/work/ensotek) - Industrial platform (Next.js, Fastify)
- [Konig Massage](/en/work/konig-massage) - Booking service
- [QuickEcommerce](/en/work/quickecommerce) - E-commerce admin panel
- [Vista Insaat](/en/work/vista-insaat) - Construction company
- [Karbonkompozit](/en/work/karbonkompozit) - Manufacturing

## Blog
- [Latest articles](/en/blog)

## Contact
- Location: Grevenbroich, Germany
- Website: https://guezelwebdesign.com
- GitHub: https://github.com/Orhanguezel
- LinkedIn: https://linkedin.com/in/orhan-güzel-53b47b11a
```

**Cursor AI gorevi:**
- llms.txt ve llms-full.txt dosyalarini `frontend/public/` altina yerlestir
- Nginx config'e `/llms.txt` ve `/llms-full.txt` route'larini ekle

---

### 2.4 [HIGH] Blog Iyilestirme — +5 puan

**Sorun:** 4 makale, hepsi ayni tarihte, yazar biyografisi yok, Article schema yok.

**Cursor AI gorevi:**
- Blog detail sayfasina yazar biyografisi componenti ekle
- Article JSON-LD schema ekle (generateMetadata icinde)
- Blog liste sayfasina yayin tarihi ve okuma suresi ekle
- Breadcrumb navigasyonu ekle

**Orhan gorevi — icerik uretimi:**
- Ayda 2-4 teknik makale yazin. Onerilen konular:
  1. "Next.js App Router ile Cok Dilli Web Uygulamasi Nasil Yapilir"
  2. "Fastify vs Express: Performans Karsilastirmasi"
  3. "Almanya'da Freelance Web Developer Olmak"
  4. "E-Commerce Projelerinde Drizzle ORM Kullanimi"
  5. "Full-Stack Proje Mimarisi: Monorepo vs Multi-Repo"
- Her makalede istatistik, kaynak atfi ve kod ornekleri kullanin
- Yayin tarihlerini farkli gunlere yayin (organik buyume sinyali)

---

### 2.5 [MEDIUM] Case Study Olusturma — +3 puan

**Orhan gorevi — en az 3 proje icin detayli case study yazin:**

Format (her biri 500-800 kelime):
```
## [Proje Adi]

### Problem
Musteri hangi sorunla geldi? Mevcut durum neydi?

### Cozum
Hangi teknolojiler secildi ve neden? Mimari kararlar nelerdi?

### Sonuclar
Somut metrikler: performans iyilestirmesi, kullanici artisi, is etkisi

### Kullanilan Teknolojiler
Stack detayi ve entegrasyonlar
```

Oncelikli projeler: Ensotek, Vista Insaat, QuickEcommerce

**Cursor AI gorevi:**
- Work detail sayfasina case study section'i ekle
- CreativeWork/CaseStudy schema markup ekle

---

### 2.6 [MEDIUM] FAQ Sayfasi — +2 puan

**Claude Code gorevi:**
- FAQ icerik yapisi ve soru listesi hazirla

**Cursor AI gorevi:**
- FAQ sayfasi olustur (`/[locale]/faq`)
- FAQPage JSON-LD schema ekle
- Accordion UI componenti ile implement et

**Sorular (15-20 adet):**
1. Was kostet eine professionelle Webseite? / What does a professional website cost?
2. Wie lange dauert die Entwicklung? / How long does development take?
3. Welche Technologien verwenden Sie? / What technologies do you use?
4. Bieten Sie Wartung an? / Do you offer maintenance?
5. Konnen Sie bestehende Webseiten uberarbeiten? / Can you redesign existing websites?
...ve devami

---

### 2.7 [MEDIUM] Cache & Performans Optimizasyonu

**Cursor AI gorevi:**
- Next.js config'de static asset cache headerlari ayarla
- `next.config.js`'de headers() fonksiyonuna cache kurallari ekle:
  ```js
  {
    source: '/_next/static/:path*',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
  }
  ```

**Orhan gorevi:**
- Nginx'te Brotli modulunu aktif et
- Static asset'ler icin CDN degerlendirmesi yap (Cloudflare Free tier)

---

## FAZ 3 — Brand Authority & Platform Varligi (Ay 2-4) | Hedef: 65 → 75

### 3.1 [HIGH] YouTube Kanali — +6 puan (uzun vadeli en etkili)

**Orhan gorevi:**
- YouTube kanali olustur: "Orhan Guzel — Full-Stack Development"
- Ilk 5 video icerigi:
  1. Portfolio showcase — tum canli projelerin walkthrough'u
  2. "Next.js + Fastify ile Production-Ready App Nasil Yapilir"
  3. "Freelance Web Developer olarak Almanya'da Calisma"
  4. Bir projenin basindan sonuna kadar development sureci (timelapse)
  5. Tech stack comparison — Neden Next.js + Fastify + Drizzle?
- Her videoya website linki, GitHub linki ve aciklama ekle
- Ayda 2 video hedefle

---

### 3.2 [HIGH] Developer Platform Varligi — +6 puan

**Orhan gorevi:**
- **Stack Overflow** profili olustur, haftada 2-3 soruya kaliteli yanit ver
- **Dev.to** hesabi ac, blog yazilarini cross-post et
- **Reddit** hesabi ac, r/webdev, r/nextjs, r/freelance'te katilim sagla
- **Google Business Profile** olustur (Grevenbroich adresiyle)
- **Trustpilot** profili olustur

---

### 3.3 [MEDIUM] Musteri Testimonial Sistemi

**Cursor AI gorevi:**
- Siteye testimonial/review section'i ekle (homepage + ayri sayfa)
- Review JSON-LD schema ekle

**Orhan gorevi:**
- Mevcut musterilerden (Ensotek, Vista Insaat, Konig Massage vb.) review iste
- Google Business Profile'a review yonlendir

---

### 3.4 [MEDIUM] GitHub Profilini Guclendir

**Orhan gorevi:**
- Onemli repo'lara detayli README ekle
- 1-2 adet acik kaynak utility/template projesi yayinla
- GitHub profile README olustur (istatistikler, tech stack, canli projeler)
- Starred/fork sayisini artirmak icin topluluk etkilesimi

---

## FAZ 4 — Ileri Optimizasyon (Ay 4-6) | Hedef: 75 → 80+

### 4.1 Title Tag & Meta Optimizasyonu

**Cursor AI gorevi:**
- Title tag'i genislet (44 → 55-60 karakter):
  - DE: "Orhan Guzel — Full-Stack Webentwickler | Next.js, Fastify, Laravel"
  - EN: "Orhan Guzel — Full-Stack Developer | Next.js, Fastify, Laravel"
  - TR: "Orhan Guzel — Full-Stack Gelistirici | Next.js, Fastify, Laravel"
- OG locale taglari ekle
- Partner marka gorsellerine gercek alt text yaz

### 4.2 Internal Link Stratejisi

**Cursor AI gorevi:**
- Servis sayfalarindan ilgili portfolio projelerine link ekle
- Blog yazilarindan servis sayfalarina contextual link ekle
- Footer'a onemli sayfalar icin link blogu ekle
- Breadcrumb navigasyonu tum sayfalara ekle

### 4.3 CDN Entegrasyonu

**Orhan gorevi:**
- Cloudflare Free tier aktif et
- DNS'i Cloudflare uzerinden yonet
- Static asset'ler icin edge caching

### 4.4 Niche Otorite Olusturma

**Orhan gorevi:**
- "Full-Stack Development in Germany" niche'inde blog serisi
- Almanca ve Ingilizce teknik makaleler
- Guest post firsatlari ara (Smashing Magazine, CSS-Tricks, Dev.to featured)

---

## Zaman Cizelgesi & Metrikler

### Haftalik Gorev Matrisi

| Hafta | Claude Code | Cursor AI | Antigravity | Orhan |
|-------|-------------|-----------|-------------|-------|
| H1 | SSR strateji, hreflang tasarim | SSR donusumleri baslat | — | GA4/GTM olustur, DNS kayitlari |
| H2 | Schema tasarimi, llms.txt | SSR tamamla, hreflang ekle, H1 duzelt | SSR dogrulama | Guvenlik headerlari deploy |
| H3 | Homepage icerik mimarisi | Schema JSON-LD ekle | Homepage dogrulama | Homepage icerigi yaz (3 dil) |
| H4 | FAQ tasarimi, blog strateji | Homepage implement, FAQ sayfasi | Blog dogrulama | Blog makaleleri yaz |
| H5 | Case study yapisi | Blog iyilestirme, testimonial UI | Tam site dogrulama | Case study'ler yaz |
| H6 | Ara degerlendirme raporu | Cache optimizasyon, title tag | Performans testi | YouTube kanal ac |
| H7-8 | Internal link stratejisi | Internal linking, breadcrumbs | Link dogrulama | Dev.to/SO profilleri |
| H9-12 | Ileri optimizasyon plani | CDN entegrasyonu, Brotli | Tam GEO re-audit | Icerik uretimi devam |

### Beklenen GEO Skor Artisi

| Faz | Tarih | Hedef Skor | Artis |
|-----|-------|-----------|-------|
| Baslangic | 2026-04-06 | 38/100 | — |
| Faz 1 tamamlandiktan sonra | 2026-04-20 | 55/100 | +17 |
| Faz 2 tamamlandiktan sonra | 2026-05-18 | 65/100 | +10 |
| Faz 3 tamamlandiktan sonra | 2026-07-06 | 75/100 | +10 |
| Faz 4 tamamlandiktan sonra | 2026-09-06 | 80+/100 | +5 |

### Puan Dagilimi Tahmini

| Aksiyon | Beklenen Puan |
|---------|---------------|
| SSR/SSG duzeltmesi | +8 |
| hreflang taglari | +4 |
| H1 + dil tutarliligi | +5 |
| Homepage icerik zenginlestirme | +6 |
| Structured data genisletme | +6 |
| Blog iyilestirme + Article schema | +5 |
| Case study'ler | +3 |
| FAQ sayfasi | +2 |
| llms.txt | +2 |
| Brand authority (YouTube, SO, Reddit) | +8 |
| Diger (cache, title, internal link) | +3 |
| **TOPLAM POTANSIYEL** | **+52** |

---

## Basari Kriterleri

- [ ] Tum sayfalar `curl` ile kontrol edildiginde icerik HTML'de gorunuyor (SSR)
- [ ] Google Search Console'da hreflang hata sayisi 0
- [ ] Lighthouse Performance skoru 90+
- [ ] Schema.org validator'da hata yok
- [ ] GA4'te veri akisi baslamis
- [ ] llms.txt erisilebilir (200 status)
- [ ] Email guvenlik skoru 80+
- [ ] Homepage kelime sayisi 500+
- [ ] Blog makale sayisi 10+ (3 ay icerisinde)
- [ ] En az 3 detayli case study yayinda
- [ ] YouTube kanalinda en az 3 video
- [ ] Google Business Profile aktif ve review'lar var

---

## Notlar

- Bu plan GEO-first yaklasimla hazirlanmistir (AI arama motorlarinda gorunurluk oncelikli)
- Klasik SEO iyilestirmeleri de GEO skorunu yukselttigi icin paralel yurutulur
- GDPR uyumlulugu Almanya pazari icin zorunludur (GA4 consent mode v2)
- Tum icerik degisiklikleri 3 dilde (DE/EN/TR) yapilmalidir
- Her faz sonunda GEO re-audit yapilmalidir

---

*Bu yol haritasi Claude Code tarafindan GEO-REPORT ve GEO-AUDIT-REPORT analizlerine dayanarak olusturulmustur.*
