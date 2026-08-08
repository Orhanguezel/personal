# gzlteknoloji → guezelwebdesign Birleştirme & İçerik Taşıma Planı

**Tarih:** 2026-08-08 · **Karar sahibi:** Orhan · **Mimar:** Claude Code
**Karar:** gzlteknoloji reposu/frontend'i emekliye ayrılıyor. **guezelwebdesign tek kod tabanı.**
İki domain, **iki marka, ortak kod** (kullanıcı onayı, 2026-08-08).

## 1. Mimari Karar

| | guezelwebdesign.com | gzlteknoloji.com |
|---|---|---|
| Marka | Güzel Web Design (DE ajans) | GZL Teknoloji (TR yazılım/SaaS) |
| Diller | de + en | tr |
| Varsayılan locale | `de` | `tr` |
| DB | `guezelwebdesign` | `gzlteknoloji` (guezelwebdesign şemasıyla yeniden kurulur) |
| Kod | guezelwebdesign monorepo (ortak) | **aynı kod** |
| Deploy | ecosystem.config.cjs / guarded flow | gzlteknoloji'nin temiz `deploy.sh` deseni |

**Neden iki DB:** İki marka farklı katalog (GZL: SaaS ürünler + TR yazılım hizmetleri; GWD: DE ajans + CV). Tek DB iki işi karıştırır. Monorepo'da kanıtlı desen (kamanilan/konig/GZLTemizlik hepsi tek şablon → ayrı DB/deployment).

**Neden kolay:** İki repo **aynı şablon soyu + aynı i18n şeması** (`base + _i18n` tablolar, aynı kolonlar). Taşıma ≈ veri dönüşümü, yeniden yazma değil.

## 2. Kritik Tasarım: Per-deployment Seed Profilleri

guezelwebdesign repo iki içerik setini barındıracak. Şema ortak, **içerik ayrı**:
```
backend/src/db/seed/sql/            # ortak ŞEMA (tüm deployment'lar)
backend/src/db/seed/content/gwd/    # Güzel Web Design içeriği (de/en)
backend/src/db/seed/content/gzl/    # GZL Teknoloji içeriği (tr) — TAŞINAN
```
Seed runner `SEED_PROFILE=gwd|gzl` env'ine göre ilgili content/ setini uygular.
(Template geliştirmesi — seed runner'a profil desteği eklenecek.)

## 3. İçerik Taşıma Haritası (gzlteknoloji seed → guezelwebdesign şeması, locale=tr)

| # | Kaynak (gzlteknoloji) | Hedef (guezelwebdesign) | İşlem |
|---|---|---|---|
| 1 | `services`+`services_i18n` (027 bionluk, 031, 048 osgb, 040 polish) | `services`+`services_i18n` | ~Doğrudan kopya. Bionluk-slug artıklarını (`...-840180`, `i-provide-...`) temiz slug'a çevir. |
| 2 | `product`+`product_i18n` (GeoSerra, Sozial, KatalogAI, Invitea, Scraper-API) | `products`(013)+`product_i18n` | **En yüksek değer.** Kategori/i18n eşle. |
| 3 | `pricing`+paketler (021,028,032,041,042) | `pricing`(230) | Tier eşlemesi. service_packages → GWD pricing modeli. |
| 4 | `projects`+`projects_i18n` (030,044,046,038; Ensotek, QuickEcommerce, B2B katalog) | `projects`+`projects_i18n` | GWD'nin mevcut projeleriyle **dedupe/merge** (slug bazlı). Bionluk-kategori sahte projelerini AT. |
| 5 | blog (039 + custom_pages 026; 8 yazı) | `custom_pages`+`custom_pages_i18n` (blog) | GEO, e-ticaret maliyeti, ChatGPT, sosyal medya, otomasyon, bayi takibi, AI overviews, sera. |
| 6 | `testimonials` (034) | `reviews`(060) | Gerçekse taşı; placeholder ise atla. |
| 7 | `faqs` (024,031) | `faqs`(140) | Kopya. |
| 8 | legal (047 + custom_pages) | `custom_pages` (policy) / impressum | KVKK, gizlilik, kullanım, çerez, mesafeli satış, ön bilgilendirme, iade. |
| 9 | about/kurumsal (040,045) | `custom_pages` (about) / site_settings | TR. |
| 10 | site_settings (marka, iletişim, SEO, **Meta Pixel 38701926646073227**) | site_settings (040.x) | GZL marka değerleri. Per-deployment. |
| 11 | brand media (yeni logo/favicon/emblem seti) | `storage_assets`(130/200) + uploads/site-media | Kopya. |
| 12 | home_sections v2 (033) | GWD home modeli (site_settings home / 040.7/040.14) | GWD kendi home modeli — eşle veya yeniden kur. |

**ATILACAK:** theme_presets, bionluk tracker (036), placeholder marketing (037), bionluk-kategori sahte projeler, **EN stub çevirileri** (027 generator STUB'ıydı — gerekirse GWD'de düzgün çevrilir), gzlteknoloji frontend kodu, proxy.ts locale hack.

## 4. Taşıma Mekanizması

**Yöntem:** Re-runnable `bun` migration script'i (`backend/scripts/migrate-gzlteknoloji-content.mjs`) — kaynak olarak gzlteknoloji **seed SQL'lerini** (versiyonlu, tekrarlanabilir) okur, guezelwebdesign şemasına `content/gzl/` seed SQL'i olarak üretir. Curation kuralları (slug temizliği, EN-stub eleme, sahte-proje eleme) kodda.
*Alternatif:* prod gzlteknoloji DB'sinden dump (admin düzenlemelerini yakalar) — ama seed'ler zaten kapsamlı; admin-only farklar Orhan tarafından reconcile edilir.

## 5. Fazlar

- **Faz 0 — İskelet (repo, prod'a dokunmaz):** seed profil desteği; `content/gwd/` + `content/gzl/` dizinleri; gzlteknoloji.com env profili (locale=tr, DB=gzlteknoloji, portlar); nginx vhost + deploy.sh uyarlaması.
- **Faz 1 — İçerik taşıma (repo):** migration script + `content/gzl/` seed'leri (madde 1-12). Curation.
- **Faz 2 — Lokal doğrulama:** GWD kodu TR profille ayağa; gzl content seed'le; her sayfa gözden geçir; `bun run build && bun run start`.
- **Faz 3 — Deploy (prod, dikkatli, mesai dışı):** yeni gzlteknoloji.com deployment'ı GWD kodundan; DB fresh seed (SEED_PROFILE=gzl); nginx vhost switch; **eski gzlteknoloji deployment'ı durdur**. DNS zaten gzlteknoloji.com'da (Cloudflare) — origin değişmez, yalnız hangi PM2/port sunacağı değişir.
- **Faz 4 — Emeklilik:** gzlteknoloji repo arşivle; monorepo workspace'ten çıkar; portları serbest bırak.

## 6. Riskler / Dikkat

- **Canlı gzlteknoloji.com şu an ESKİ kodla yayında** — Faz 3'e kadar ona dokunma. Kesinti riski Faz 3'te (mesai dışı + fail-closed).
- Meta Pixel değeri prod DB'de hâlâ boş (aktivasyon Orhan'da) — yeni DB seed'inde dolu gelecek.
- GWD frontend locale LİSTESİ i18n config'te (env değil) — TR-only için config'in env-driven veya per-deployment override olması gerekebilir.
- gzlteknoloji'de olup GWD'de OLMAYAN: home_sections v2, service_packages, theme_presets. GWD'de olup gzlteknoloji'de olmayan: resume, skills, project_case_studies, checkout. Faz 1'de eşleme boşlukları netleşir.

## 7. Sıradaki adım
Faz 0 → Faz 1. Migration script + content/gzl seed'leri ile başla (en yüksek değer: SaaS ürünler + hizmetler).
