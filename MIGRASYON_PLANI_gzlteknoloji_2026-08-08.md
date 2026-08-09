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

---

# DURUM — 2026-08-08 akşamı güncellemesi

## ✅ Faz 0 — İskelet: TAMAM

- **Seed profil desteği** (`SEED_PROFILE=gwd|gzl` / `--profile=`). `backend/src/db/seed/profiles.json`
  69 seed dosyasını sınıflandırır: `schema`(27) / `core`(9) / `content:gwd`(33).
  Sınıflandırılmamış dosyada seed **fail-closed** durur.
- `content/gwd/` + `content/gzl/` dizinleri açıldı. GWD içeriği bilerek `sql/` altında
  bırakıldı → mevcut canlı deploy'un davranışı **hiç değişmedi**.
- `ecosystem.config.cjs` **profil destekli** hale geldi (`DEPLOY_PROFILE=gwd|gzl`);
  gzl profili portları: BE 8102 / FE 3120 / Admin 3121, locale `tr`.
- Doğrulama scripti: `bun run db:seed:profiles:check`.

## ✅ Faz 1 — İçerik taşıma: BÜYÜK ÖLÇÜDE TAMAM

`backend/scripts/migrate-gzlteknoloji-content.mjs` (`bun run migrate:gzl`) — tekrar
çalıştırılabilir ve **deterministik** (iki çalıştırma bit-bazında aynı çıktı).
39 kaynak dosyadan **22 içerik seed'i** üretildi.

Yerel MySQL'de gzl profiliyle uçtan uca seed edildi ve doğrulandı:

| | Adet |
|---|---|
| Hizmetler (TR) | 21 |
| SaaS ürünler | 6 (GeoSerra, Sozial, KatalogAI, Invitea, Scraper-API, MarketPulse) |
| Projeler | 27 |
| Custom pages (blog+legal+kurumsal) | 7 sayfa / 14 çeviri |
| Fiyat planları | 8 |
| SSS | 7 |
| Menü / Footer / Medya | 15 / 3 / 26 |
| site_settings | 44 — marka "GZL Teknoloji", **Meta Pixel 38701926646073227 yerinde** |

Küratörlük uygulandı: 255 EN stub satırı, 4 sahte "bionluk kategorisi" projesi elendi;
`menu_items.site_id` düşürüldü; `custom_pages_i18n` için 14 deterministik id üretildi.

### Yol boyunca çıkan ve düzeltilen 3 gerçek hata
1. **Dangling FK:** `products` tablosunun `categories`/`sub_categories` FK'leri vardı ama
   o tablolar şemada **hiç yoktu** (`FOREIGN_KEY_CHECKS=0` gizliyordu) → `012_categories_schema.sql` eklendi.
2. **Eksik SaaS alanları:** `products`'a `product_kind`, `demo_url`, `docs_url`, `status`,
   `pricing_model` eklendi (ALTER yok, CREATE TABLE'a yazıldı).
3. **Seed SQL ayrıştırıcısı:** düz regex kullanıyordu; metin değeri içindeki `;`+satırsonu
   cümleyi bölüyor, `--` dizisi içeriği yorum sanıp siliyordu. `utils.ts` artık tırnak duyarlı.

## ⏳ Faz 1'de KALAN — elle eşleme gerektiren 3 kalem

Bunlar otomatik taşınamaz çünkü GWD'de karşılık tablo yok; script bunları **raporlayıp atlıyor**:

| Plan md. | Kaynak | Ne gerek |
|---|---|---|
| 3 | `service_packages` (+i18n), 3 deyim | GWD `pricing_plans` modeline tier eşlemesi |
| 6 | `testimonials` (034) | GWD `reviews`(060) tablosuna eşleme — gerçek yorum mu placeholder mı ayıklanmalı |
| 12 | `home_sections` v2 (033) | GWD kendi home modeli (site_settings 040.7/040.14) — yeniden kurulmalı |

## ⏳ Faz 2-3-4 — yapılmadı

- **Faz 2 (lokal doğrulama):** DB tarafı doğrulandı; frontend'i TR profille ayağa kaldırıp
  sayfa sayfa gözden geçirme YAPILMADI. Not: GWD frontend locale listesi hâlâ i18n config'te
  (env değil) — TR-only için per-deployment override gerekecek.
- **Faz 3 (deploy):** YAPILMADI. **gzlteknoloji.com şu an 502** — eski deployment 2026-08-08'de
  emekliye ayrıldı (PM2 uygulamaları silindi), yerine yeni deployment henüz kurulmadı.
  Bu, planın "Faz 3'e kadar ona dokunma" varsayımını değiştirir: artık kesinti riski değil,
  **kapalı bir siteyi açma** işi var. Yapılacaklar: `/var/www/vps-guezel/gzlteknoloji-new`
  (GWD kodu) → `bun install && bun run build` → `DEPLOY_PROFILE=gzl pm2 start ecosystem.config.cjs`
  → DB `gzlteknoloji` fresh seed (`SEED_PROFILE=gzl`) → nginx vhost → doğrulama.
- **Faz 4 (emeklilik):** repo silindi/arşivlendi (Orhan yaptı, içerik `_migration/` altında güvende).
  VPS'teki `/var/www/vps-guezel/gzlteknoloji` eski ağacı ve root `package.json`'daki workspace
  girdileri hâlâ duruyor — Faz 3 bitince temizlenecek.
