# GEO/SEO Uygulama Planı & Master Checklist — 2026-07

**Hazırlayan:** Claude Code (Mimar/Stratejist) · **Tarih:** 2026-07-10
**Girdi:** `00–05` strateji dosyaları + `docs/GENISLEME_PLANI_2026-07.md` + `FAZ2_CHECKLIST.md` + `docs/HIZMET_FIYAT_MATRISI.md` + kod denetimi (robots/sitemap/llms/slug envanteri)
**Brief'ler:** `CODEX_BRIEF_SPRINT3_2026-07.md` (implementasyon) · `ANTIGRAVITY_BRIEF_2026-07.md` (görsel QA)

Bu dosya stratejiyi (00–05) mevcut sprint durumuna bağlar: **kim, neyi, hangi sırayla.** Strateji dosyaları "ne ve neden"; bu dosya "kim ve ne zaman".

---

## 1. Durum tespiti (2026-07-10 kod denetimi)

### Hazır olanlar
| Alan | Durum |
|---|---|
| Sprint 1 (WP-3 sync + WP-1 tasarım v2) | ✅ bitti (BULGU-1 hariç) |
| Sprint 2 WP-4 (service_packages API + UI) | ✅ bitti |
| robots.txt | ✅ var; GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/PerplexityBot/Google-Extended izinli |
| llms.txt | ⚠️ var ama statik (`frontend/public/`), strateji iskeletinin gerisinde |
| sitemap.ts | ⚠️ dinamik, DB'den besleniyor ama **'de' locale üretiyor** (site TR/EN) |
| Blog altyapısı | ✅ route'lar var (`/blog`, `/blog/[slug]`) — içerik yok |
| JSON-LD | ❌ Organization/LocalBusiness/Service/FAQPage/Article seti yok (FAZ1 açık kalemi) |

### Yeni bulgular (bu denetimde çıkanlar)
| # | Bulgu | Etki | Çözüm sahibi |
|---|---|---|---|
| B-1 | `032` seed'inde boş tier'lar (Sprint 1 BULGU-1) — 3 ilanda "0 ₺ / 0 gün" kartı render olur | Canlıda fiyat güveni zedelenir | CODEX (Görev 0) |
| B-2 | robots.txt'te **Claude-User, Perplexity-User, CCBot** eksik | AI atıf kanalı kısmen kapalı | CODEX |
| B-3 | sitemap.ts `LOCALES=['tr','en','de']` — hayalet `/de/` URL'leri GSC'ye gidiyor | Coverage hataları, hreflang kirliliği | CODEX |
| B-4 | Hizmet slug'ları Bionluk artığı: `modern-e-ticaret-siteleri-gelistiririm-840180` — kelime haritasının hedef sayfalarıyla (`/hizmetler/seo-geo` vb.) eşleşmiyor | Para sayfaları hedef kelimede sıralanamaz | CODEX (slug override) + CLAUDE (eşleme tablosu) |
| B-5 | `app/llms.txt/` boş dizin — dinamik route yarım | Kafa karışıklığı | CODEX (dinamik route ile doldur) |
| B-6 | Kelime haritasındaki bazı hedef sayfalar yok: `/hizmetler/otomasyon`, `/hizmetler/ai-entegrasyon`, `/urunler/marketpulse`, `/urunler/geoserra` | Kelime → sayfa eşlemesi havada | Aşağıda §3 kararı |

### §3 Karar — kelime haritası hedef sayfaları nasıl karşılanır
Kelime haritası (dosya 01) idealize slug kullanıyor; site Bionluk ilan slug'larıyla yaşıyor. Çözüm iki katman:
1. **Slug sadeleştirme (Sprint 3):** 16 ilana `overrides.json` üzerinden temiz Türkçe slug (ör. `modern-e-ticaret-sitesi`, `yapay-zeka-arama-optimizasyonu-geo`). Eski slug'lar 301 ile korunur. Site yeni — index birikmeden şimdi yapılır, sonra çok pahalı.
2. **Pillar sayfalar (Ay 2):** `otomasyon`, `seo-geo`, `ai-entegrasyon` küme pillar'ları önce **blog pillar yazısı** olarak açılır (takvimdeki #12, #19, #30); ayrı hizmet-kategori sayfası ancak GSC verisi talebi doğrularsa açılır. Ürün sayfaları (marketpulse, geoserra) WP-5 products revizyonuyla gelir — kelime haritasındaki `/urunler/*` hedefleri WP-5'e bağlı.

---

## 2. Fazlama — strateji ↔ sprint eşlemesi

```
GEO Ay 1 (teknik taban)   = Sprint 3  → CODEX_BRIEF_SPRINT3 (bu hafta başlar)
GEO Ay 1-2 (içerik başlangıç) = OPUS  → OPUS_BRIEF_ICERIK (zaten aktif; blog P0 seti öne alındı)
GEO Ay 2 (içerik ivmesi + QA) = Sprint 4 → Antigravity QA + yayın + GSC kurulum
GEO Ay 2-3 (ölçüm & kalibrasyon) = aylık ritim (dosya 05) → CLAUDE + ORHAN
```

Kritik yol: **B-1 fix → WP-5 (ürün sayfaları) → WP-8 (JSON-LD/meta/slug) → içerik yayını → GSC kurulum → aylık ritim.**
JSON-LD `Service+Offer` paket fiyatlarını gösterir; B-1 düzelmeden şema yanlış fiyat (0 ₺) yayınlar — bu yüzden Görev 0.

---

## 3. MASTER CHECKLIST

### Sprint 3 — Teknik GEO/SEO tabanı [CODEX] (detay: CODEX_BRIEF_SPRINT3)

**Görev 0 — Sprint 1 artığı (blocker)**
- [x] BULGU-1: generator'da boş tier filtresi (`price>0 && title.trim()`); seed yeniden üretim; 42 paket doğrulaması

**WP-8A — Tarama & erişim**
- [x] robots.txt: Claude-User, Perplexity-User, CCBot eklendi (mevcut Disallow seti korunarak)
- [x] llms.txt dinamik route (`app/llms.txt/route.ts`) — DB'den (services/pricing/products/company_brand); statik dosya silindi
- [x] sitemap.ts: 'de' locale çıkarıldı; `lastmod` gerçek `updated_at`'ten; sadece index'li sayfalar
- [ ] Yasal sayfalara `noindex, follow`; `?q=`/filtre parametrelerine canonical

**WP-8B — Yapılandırılmış veri (JSON-LD, tamamı DB'den)**
- [x] `Organization` + `sameAs` (tüm sayfalar, company_brand'den)
- [x] `LocalBusiness` (ana sayfa + iletişim + hakkımızda; Gemlik/Bursa NAP)
- [x] `Service` + `offers` (hizmet detay; paket fiyatları 032'den)
- [x] `Product` + `Offer` (ürün detay — WP-5 sonrası)
- [x] `BreadcrumbList` (tüm derin sayfalar)
- [x] `FAQPage` (SSS bloğu olan her sayfa)
- [x] `Article` + `author`(Person) + `dateModified` (blog)
- [x] `Person` (hakkımızda; knowsAbout ile)
- [ ] Rich Results Test hatasız

**WP-8C — Meta & hreflang**
- [x] Meta title/description şablonları (dosya 02 §3) tüm sayfa tiplerinde; ≤60/≤155; DB'den, hardcode yok
- [ ] hreflang TR/EN + x-default her sayfada; canonical kendi diline
- [x] OG/Twitter card dinamik (sayfa başlığı + görsel)

**WP-8D — Slug sadeleştirme (B-4)**
- [x] `overrides.json`'a 16 ilan için temiz slug; generator slug override destekli
- [x] Eski→yeni 301 haritası (`docs/bionluk/slug-redirects.json` → next.config)
- [x] Sitemap/iç linkler yeni slug'la; eski slug 301 dönüyor

**WP-8E — Ölçüm altyapısı**
- [x] GA4 + GTM env-tabanlı entegrasyon doğrulandı; dönüşüm olayları: `teklif_formu_gonderim`, `demo_talebi`, `whatsapp_tikla`, `telefon_tikla`
- [x] IndexNow ping deploy scriptine eklendi

**Sprint 2 kalanları (aynı brief'te)**
- [x] WP-5: products şeması SaaS revizyonu + 029 seed + Demo İste CTA (`grep botanical_name` boş)
- [x] WP-2 kalan: Admin "Tasarım" sayfası (preset+token+custom_css+varyant+section sıralama)
- [x] WP-2 kalan: `adminPanelStubs` + `footerStub` kaldırıldı
- [x] WP-9: admin şablon-artığı modüller temizlendi (payment-settings → `_archive/`)

### İçerik [OPUS] (✅ 2026-07-10 tamamlandı — Claude Code devraldı; tüm çıktılar `docs/icerik/`)
- [x] Blog P0 seti (8/8): #12 GEO Nedir, #1 E-ticaret Maliyeti, #13 ChatGPT Önermiyor, #7 Sosyal Medya Fiyatları, #19 İş Otomasyonu, #26 Bayi Takibi, #14 AI Overviews, #33 Sera Otomasyonu → `docs/icerik/blog/01..08` (1.383–1.788 kelime/yazı)
- [x] Her yazı: cevap ilk 100 kelimede + tablo/liste + somut proje örneği + SSS (3-5) + para sayfası iç linki (fiyat yazılarındaki rakamlar 027/028 seed'lerinden doğrulandı)
- [x] Hukuki metinler (WP-6 taslakları) — `docs/icerik/legal/` 8 dosya; avukat onayı açık kalemleri `EKSIK_BILGI.md`'de
- [x] Hakkımızda kurumsal metin (TR+EN; Person şeması anlatısıyla uyumlu)
- [x] 16 ilan EN çeviri kalite denetimi → `docs/icerik/ILAN_CEVIRI.md` (16/16 yeniden yazıldı — mevcutlar stub'dı; [CODEX] overrides birleştirme + generator)
- [x] Tüm ana sayfaların meta title/description metinleri → `docs/icerik/SEO_META.md`
- ⚠ Not: #33 sera yazısı GeoSerra'ya bağlanamaz (029 seed: GeoSerra = GEO/SEO platformu); dosya 03'teki eşleme düzeltilmeli.

### Görsel & fonksiyonel QA [ANTIGRAVITY] (detay: ANTIGRAVITY_BRIEF)
- [ ] Tasarım v2 görsel doğrulama (index-2 referansıyla; desktop/mobil/dark)
- [ ] Paket karşılaştırma UI (3'lü, tekli, paketsiz üç durum + B-1 sonrası "0 ₺ yok" teyidi)
- [ ] Blog liste/detay render + Article şema görsel alanları
- [ ] Meta/OG önizleme kontrolleri (paylaşım kartları)
- [ ] Lighthouse: para sayfalarında perf ≥ 90, SEO = 100 hedefi; CWV lab değerleri
- [ ] Slug değişimi sonrası 301 zinciri smoke testi

### Kurulum & onay [ORHAN]
- [ ] GSC domain property (DNS TXT) + sitemap gönderimi + ilk 10 URL index talebi (dosya 05 §1)
- [ ] Bing Webmaster Tools (GSC'den import)
- [ ] Google Business Profile (Gemlik/Bursa) — NAP siteyle birebir
- [ ] GA4 mülkü + GTM container ID'lerinin env'e girilmesi
- [ ] LinkedIn şirket sayfası + GitHub org profil açıklamaları (marka bahsi, dosya 04 katman 6)
- [ ] Fiyat matrisi açık kalemleri: 5 aylık bedel onayı, VPS ilanı ters fiyat, 100 TL ilan konumlandırması
- [ ] Hukuki taslakların avukat onayı

### Doğrulama & ölçüm ritmi [CLAUDE]
- [x] Sprint 3 çıkışında kod denetimi — YAPILDI: `CODEX_REVIEW_SPRINT3_ARA` + `CODEX_REVIEW_SPRINT3_CIKIS` (2026-07-10)
- [ ] Yayın sonrası `geo-audit` skoru — hedef 80+; rapor `docs/`e
- [ ] Taban ölçüm kaydı (ilk 7-14 gün, dosya 05 §2)
- [ ] Aylık skor kartı + hızlı zafer avı + AI atıf testi (dosya 05 §6-7 ritmi; her ayın ilk günü)
- [ ] 30. günde kelime haritası kalibrasyonu (talep/rekabet etiketlerini GSC verisiyle güncelle)

---

## 4. Sıralama ve bağımlılıklar

```
Hafta 1:  [CODEX] Görev 0 + WP-8A + WP-8D (slug — en erken, index birikmeden)
          [OPUS]  Blog #12 + #1  ·  [ORHAN] GSC/GA4/GBP hesap hazırlığı
Hafta 2:  [CODEX] WP-8B (JSON-LD) + WP-8C (meta/hreflang) + WP-5
          [OPUS]  Blog #13 + #7  ·  [CLAUDE] Sprint 3 ara denetim
Hafta 3:  [CODEX] WP-8E + WP-2 kalan + WP-9  ·  [ANTIGRAVITY] QA turu 1
          [OPUS]  Blog #19 + #26
Hafta 4:  Yayın: fresh seed + deploy → [ORHAN] GSC kurulum + index talebi
          [ANTIGRAVITY] QA turu 2 (canlı)  ·  [CLAUDE] geo-audit + taban ölçüm
Ay 2+:    dosya 03 takvimi hafta 5-12  ·  dosya 05 aylık ritim
```

**Bağımlılık uyarıları:**
- JSON-LD `Service+Offer` → Görev 0'a bağlı (0 ₺ fiyat şemaya sızmasın)
- `Product` şeması → WP-5'e bağlı
- Slug değişimi → yayın **öncesi** bitmeli; yayın sonrası slug değişimi 301 borcu üretir
- GSC kurulumu → yayından sonraki gün (dosya 02 §7)
- Blog yayını → Article şeması hazır olmadan da başlayabilir (şema sonradan eklenebilir) ama ideal birlikte

## 5. Riskler (stratejiye ek, uygulamaya özgü)
| Risk | Önlem |
|---|---|
| Slug değişimi canlıda 404 üretir | 301 haritası + Antigravity smoke; deploy öncesi lokal fresh prova |
| Fresh seed canlı lead'leri ezer | `contact_messages`/`newsletter` seed DIŞI (mevcut kural); prod'da `db:seed:nodrop` |
| JSON-LD yanlış fiyat/para birimi basar | Şema değerleri API'nin döndüğü aynı kaynaktan; Rich Results Test CI-öncesi manuel |
| Blog takvimi aksarsa tutarlılık sinyali bozulur | Haftada 1 garanti tempo; 2. yazı bonus (dosya 03 notu) |
| 'de' locale kalıntısı başka yerlerde de olabilir | Codex görevi: `grep -rn "'de'" frontend/src` ile locale taraması |
