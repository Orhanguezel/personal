-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler project metadata files
-- Generated at 2026-06-09T23:37:13.761Z
SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

SET @p1 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='quickecommerce' LIMIT 1);
SET @img1 := (SELECT id FROM project_images WHERE project_id=@p1 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p1, 'tr', 'QuickEcommerce', 'quickecommerce', 'Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',
  CAST('{"html":"<p>Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.</p>","description":null,"key_features":["Admin panel","Customer web","Mobile application","Store and seller management","Multi-language support"],"technologies_used":["Laravel","PHP","Next.js","React","TypeScript","Flutter","MySQL","Tailwind CSS","Redux Toolkit","React Query","Zustand","i18n","SEO","JWT","Bun","Radix UI","Zod"],"design_highlights":["Production-ready commerce stack","Shared architecture across channels","Marketplace-style store workflows"]}' AS CHAR), 'QuickEcommerce cover image', 'QuickEcommerce', 'Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img1, 'tr', 'QuickEcommerce', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p2 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='ensotek' LIMIT 1);
SET @img2 := (SELECT id FROM project_images WHERE project_id=@p2 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p2, 'tr', 'Ensotek', 'ensotek', 'B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.',
  CAST('{"html":"<p>B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.</p>","description":null,"key_features":["Admin panel","Multiple frontend variants","Catalog management","Customer document handling","Multi-language (TR/EN/DE)","Swagger API docs"],"technologies_used":["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","JWT","Tailwind CSS","Radix UI","i18n","SEO","Swagger","Docker","Nginx","CI/CD","React","Redux Toolkit","React Query","PM2","GitHub Actions","Zustand","Nodemailer","Sass"],"design_highlights":["Shared packages across frontends","Locale-aware content flows","Production deployed at ensotek.de"]}' AS CHAR), 'Ensotek cover image', 'Ensotek', 'B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img2, 'tr', 'Ensotek', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p3 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='paspas-erp' LIMIT 1);
SET @img3 := (SELECT id FROM project_images WHERE project_id=@p3 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p3, 'tr', 'Paspas ERP', 'paspas-erp', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',
  CAST('{"html":"<p>Production planning and operations ERP workspace with Bun backend and Next.js admin panel.</p>","description":null,"key_features":["Production planning","Operations management","Admin dashboard","ERP workflows","Reporting"],"technologies_used":["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Zod","Cloudinary","Nodemailer"],"design_highlights":["Operational data flows","Machine planning focus","Admin-first workflow design"]}' AS CHAR), 'Paspas ERP cover image', 'Paspas ERP', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img3, 'tr', 'Paspas ERP', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p4 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='vista-insaat' LIMIT 1);
SET @img4 := (SELECT id FROM project_images WHERE project_id=@p4 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p4, 'tr', 'Vista İnşaat', 'vista-insaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',
  CAST('{"html":"<p>İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.</p>","description":null,"key_features":["TR/EN multilingual (next-intl)","Project catalog with galleries","Blog","Contact and offer form","Technical SEO (canonical, hreflang, JSON-LD, sitemap)","Admin panel (content management)","Token-based theme system","SSL + Nginx deployment"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Radix UI","Node.js","Fastify","MySQL","Drizzle ORM","React","PM2","Nginx","i18n","SEO","JWT","Cloudinary","Nodemailer","Bun"],"design_highlights":["Portfolio metadata standard is enforced","Tech stack is merged with repository scan results","Content is generated dynamically for portfolio seeds"]}' AS CHAR), 'Vista İnşaat cover image', 'Vista İnşaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img4, 'tr', 'Vista İnşaat', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p5 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='sunplex-uretim-yonetim' LIMIT 1);
SET @img5 := (SELECT id FROM project_images WHERE project_id=@p5 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p5, 'tr', 'SUNPLEX Üretim Yönetim Sistemi', 'sunplex-uretim-yonetim', 'Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.',
  CAST('{"html":"<p>Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.</p>","description":null,"key_features":["Stoğa üretim planlama","Logo Wings ERP entegrasyonu","Makine veri entegrasyonu","Sipariş paketleme ve sevkiyat","Haftalık makine bazlı planlama","Personel devam takibi"],"technologies_used":["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Zod","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Cloudinary","Nodemailer"],"design_highlights":["Stok odaklı üretim akışı","Haftalık ve makine bazlı planlama","Admin-first workflow design"]}' AS CHAR), 'SUNPLEX Üretim Yönetim Sistemi cover image', 'SUNPLEX Üretim Yönetim Sistemi', 'Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img5, 'tr', 'SUNPLEX Üretim Yönetim Sistemi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p6 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='ekosistem-sosyal-medya' LIMIT 1);
SET @img6 := (SELECT id FROM project_images WHERE project_id=@p6 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p6, 'tr', 'Ekosistem Sosyal Medya', 'ekosistem-sosyal-medya', 'Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.',
  CAST('{"html":"<p>Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.</p>","description":null,"key_features":["Çoklu marka/proje yönetimi (bereketfide, vistaseed, tarimansiklopedisi...)","Facebook & Instagram Business API entegrasyonu","LinkedIn OAuth ve içerik yayını","X (Twitter) OAuth ve tweet yönetimi","Telegram bot entegrasyonu","AI destekli içerik üretimi (Groq/OpenAI)","Zamanlanmış görevler (node-cron): 5dk, 30dk, saatlik, günlük","Ekosistem haber akışı senkronizasyonu","Google Analytics 4 ve Google Ads takibi","İçerik şablonu yönetimi","Hashtag grup yönetimi","Kampanya takvimi","Platform token sağlığı izleme","Çoklu tenant mimarisi","Paylaşımlı @agro/shared-backend altyapısı"],"technologies_used":["TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","JWT","node-cron","Next.js","React","React Query","Tailwind CSS","Shadcn UI","Groq LLM","OpenAI","Google Analytics API","Google Ads API","PM2","Nginx","Nodemailer","Cloudinary"],"design_highlights":["Monorepo, @agro/shared-backend ile SaaS mimarisi","Tüm ekosistem platformlarına tek panelden erişim","Cron tabanlı otonom yayın akışı"]}' AS CHAR), 'Ekosistem Sosyal Medya cover image', 'Ekosistem Sosyal Medya', 'Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img6, 'tr', 'Ekosistem Sosyal Medya', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p7 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='tahmin-motoru' LIMIT 1);
SET @img7 := (SELECT id FROM project_images WHERE project_id=@p7 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p7, 'tr', 'Tahmin Motoru', 'tahmin-motoru', 'Tarım Dijital Ekosistemi''nin merkezi tahmin mikroservisi. Geçmiş istatistikler ve o yılki şartları gözeterek 12 aya kadar hava durumu, hal fiyatı, enflasyon ve tarla verimi tahmini üretir; ekosistemdeki diğer projelere API ile servis eder.',
  CAST('{"html":"<p>Tarım Dijital Ekosistemi''nin merkezi tahmin mikroservisi. Geçmiş istatistikler ve o yılki şartları gözeterek 12 aya kadar hava durumu, hal fiyatı, enflasyon ve tarla verimi tahmini üretir; ekosistemdeki diğer projelere API ile servis eder.</p>","description":null,"key_features":["12 aya kadar hava durumu (iklim istatistiği + o yılki anomali) olasılıklı tahmini","Geçmiş hal fiyatlarına dayalı ürün/hal bazlı fiyat tahmini","Enflasyon (TÜFE/tarımsal ÜFE) senaryolu tahmini","Ürün/parsel/bölge bazlı tarla verimi tahmini","Belirsizlik aralığı + backtest doğruluk metrikleri ile dürüst tahmin","REST API — ekosistem modüllerine tahmin servisi (/api/v1)","Diğer proje DB''lerine read-only erişim + REST hibrit veri toplama","Versiyonlu model kayıt defteri ve zamanlanmış yeniden eğitim"],"technologies_used":["Python","FastAPI","statsmodels","Prophet","scikit-learn","pandas","TypeScript","Fastify","Bun","MySQL","TimescaleDB","Redis","Docker"],"design_highlights":["tm_ prefix ile şema ayrımı","Python ML çekirdeği + ince Fastify ekosistem gateway","Ekosistemin merkezi tahmin/forecast veri servisi"]}' AS CHAR), 'Tahmin Motoru cover image', 'Tahmin Motoru', 'Tarım Dijital Ekosistemi''nin merkezi tahmin mikroservisi. Geçmiş istatistikler ve o yılki şartları gözeterek 12 aya kadar hava durumu, hal fiyatı, enflasyon ve tarla verimi tahmini üretir; ekosistemdeki diğer projelere API ile servis eder.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img7, 'tr', 'Tahmin Motoru', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p8 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='paketjet' LIMIT 1);
SET @img8 := (SELECT id FROM project_images WHERE project_id=@p8 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p8, 'tr', 'PaketJet', 'paketjet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',
  CAST('{"html":"<p>P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.</p>","description":null,"key_features":["P2P cargo listing & booking","Real-time capacity management","Wallet & payment system","Carrier & customer dashboards","Multi-step listing wizard","Admin panel with revenue stats","JWT cookie auth with role guards"],"technologies_used":["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Zustand","Tailwind CSS v4","Next.js","React","Fastify","MySQL","Tailwind CSS","Radix UI","JWT","Cloudinary","Nodemailer"],"design_highlights":["Token-based Tailwind v4 design system","Dark mode with data-theme attribute","Mobile-first responsive panel UI","Capacity bar visualization"]}' AS CHAR), 'PaketJet cover image', 'PaketJet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img8, 'tr', 'PaketJet', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p9 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='dirican-mantar' LIMIT 1);
SET @img9 := (SELECT id FROM project_images WHERE project_id=@p9 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p9, 'tr', 'Dirican Mantar — AI Hasat Görüntüleme Sistemi', 'dirican-mantar', 'Mersin''deki kültür mantarı üretim tesisi için geliştirilecek yapay zeka destekli hasat görüntüleme ve işaretleme sistemi. YOLOv8 + Intel RealSense + NVIDIA Jetson Orin ile 4 cm eşiğini geçen mantarları gerçek zamanlı tespit ederek hasat personelini LED/projeksiyon ile yönlendiriyor.',
  CAST('{"html":"<p>Mersin''deki kültür mantarı üretim tesisi için geliştirilecek yapay zeka destekli hasat görüntüleme ve işaretleme sistemi. YOLOv8 + Intel RealSense + NVIDIA Jetson Orin ile 4 cm eşiğini geçen mantarları gerçek zamanlı tespit ederek hasat personelini LED/projeksiyon ile yönlendiriyor.</p>","description":null,"key_features":["YOLOv8 instance segmentation — örtüşen mantarlar dahil %94+ doğruluk","Intel RealSense D435i derinlik kamerası ile ±2mm boyut hassasiyeti","Gerçek zamanlı LED/projektör işaretleme (4cm+ yeşil, küçük kırmızı)","Oda/ranza/kat bazlı kalibrasyon profili yönetimi (15 saniyelik geçiş)","8 taşınabilir sepet birimi ile 18 oda kapsama","Web tabanlı yönetim paneli: oda izleme, personel performansı, hasat istatistikleri","MQTT tabanlı cihaz → panel veri akışı","M18K dataset (18.000+ örnek) + saha görüntüleriyle fine-tune model"],"technologies_used":["Python","YOLOv8","OpenCV","TensorRT","NVIDIA Jetson Orin","Intel RealSense","PyQt6","Fastify","Next.js","TypeScript","MySQL","MQTT","Docker","Node.js","Tailwind CSS","PM2","Nginx","Bun","Framer Motion","React","Zustand","Radix UI","Zod","Drizzle ORM","JWT","WebSockets","Sass","Cloudinary","Nodemailer"],"design_highlights":["Edge-first mimari: WiFi kesilse bile sepet birimi bağımsız çalışır","Taşınabilirlik: 15 sn''de kalibrasyon yükle, oda değiştir","MycoSense''e göre %85 maliyet avantajı","Faz 2 robotik hasat entegrasyonuna hazır yazılım altyapısı"]}' AS CHAR), 'Dirican Mantar — AI Hasat Görüntüleme Sistemi cover image', 'Dirican Mantar — AI Hasat Görüntüleme Sistemi', 'Mersin''deki kültür mantarı üretim tesisi için geliştirilecek yapay zeka destekli hasat görüntüleme ve işaretleme sistemi. YOLOv8 + Intel RealSense + NVIDIA Jetson Orin ile 4 cm eşiğini geçen mantarları gerçek zamanlı tespit ederek hasat personelini LED/projeksiyon ile yönlendiriyor.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img9, 'tr', 'Dirican Mantar — AI Hasat Görüntüleme Sistemi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p10 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='amozon' LIMIT 1);
SET @img10 := (SELECT id FROM project_images WHERE project_id=@p10 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p10, 'tr', 'Amozon', 'amozon', 'Amazon kategorilerinde 5 boyutlu risk skoru + LLM reasoning ile açıklanabilir AL/TAKIP_ET/UZAK_DUR karar motoru.',
  CAST('{"html":"<p>Amazon kategorilerinde 5 boyutlu risk skoru + LLM reasoning ile açıklanabilir AL/TAKIP_ET/UZAK_DUR karar motoru.</p>","description":null,"key_features":["Amazon ürün scraping ve ASIN tekilleştirme","Beş boyutlu kategori risk scoring","LLM cross-dimension reasoning","Confidence honesty ve coverage gate","Thesis memory — karar izleme ve invalidation","Single Journey tarama akışı (operatör paneli)","Keepa fiyat geçmişi zenginleştirme","Scan cache reuse ve kota görünürlüğü"],"technologies_used":["TypeScript","Bun","Next.js","React","MySQL","Oxylabs","Keepa","Groq LLM","Drizzle ORM"],"design_highlights":["Portfolio metadata standard is enforced","Tech stack is merged with repository scan results","Content is generated dynamically for portfolio seeds"]}' AS CHAR), 'Amozon cover image', 'Amozon', 'Amazon kategorilerinde 5 boyutlu risk skoru + LLM reasoning ile açıklanabilir AL/TAKIP_ET/UZAK_DUR karar motoru.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img10, 'tr', 'Amozon', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p11 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='market-pulse' LIMIT 1);
SET @img11 := (SELECT id FROM project_images WHERE project_id=@p11 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p11, 'tr', 'MarketPulse', 'market-pulse', 'Türk distribütörleri için bayi izleme, lead yönetimi ve rakip analiz SaaS platformu. Scraper destekli otomatik sinyal üretimi.',
  CAST('{"html":"<p>Türk distribütörleri için bayi izleme, lead yönetimi ve rakip analiz SaaS platformu. Scraper destekli otomatik sinyal üretimi.</p>","description":null,"key_features":["Hedef firma takibi (rakip, bayi, distribütör, ortak)","Otomatik churn risk skoru (sinyal + aktivite + ERP verisi)","Lead pipeline (Yeni → Görüşmede → Dönüştürüldü akışı)","Pazar sinyalleri (site değişikliği, fiyat, sosyal aktivite, yorum)","Manuel ve scraper kaynaklı sinyal yönetimi","Lead Machine: Amazon satıcı tarama + AI review analizi","Lead Machine: B2B dizin tarama + ICP eşleştirme + pain point tespiti","Lead Machine: Fuar exhibitor tarama + 10times intent verisi","Enrichment: Apollo.io ile email + karar verici bulma","AI outreach e-posta taslağı üretimi (human-in-the-loop)","Haftalık PDF raporu + SMTP e-posta gönderimi","Paspas ERP cross-DB entegrasyonu (müşteri/sipariş okuma)","Paspas müşteri otomatik senkronizasyonu — POST /admin/market/sync-paspas (idempotent upsert)","Copy-deploy: her müşteri bağımsız kurulum"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Cloudinary","Docker","Next.js","Tailwind CSS","JWT","React","Zustand","Radix UI","Zod","Nodemailer","Sass"],"design_highlights":["Sinyal öncelik renk kodlaması (Kritik/Yüksek/Orta/Düşük)","Lead pipeline kanban-tablo hibrit görünüm","Churn risk renk skalası"]}' AS CHAR), 'MarketPulse cover image', 'MarketPulse', 'Türk distribütörleri için bayi izleme, lead yönetimi ve rakip analiz SaaS platformu. Scraper destekli otomatik sinyal üretimi.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img11, 'tr', 'MarketPulse', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p12 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='e-fatura-service' LIMIT 1);
SET @img12 := (SELECT id FROM project_images WHERE project_id=@p12 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p12, 'tr', 'e-fatura-service', 'e-fatura-service', 'Turkiye e-ticaret projeleri icin merkezi multi-tenant e-arsiv / e-fatura mikroservisi.',
  CAST('{"html":"<p>Turkiye e-ticaret projeleri icin merkezi multi-tenant e-arsiv / e-fatura mikroservisi.</p>","description":null,"key_features":["Multi-tenant credential at-rest sifreleme (AES-256-GCM)","Idempotent fatura olusturma + durum makinesi","BullMQ kalici kuyruk + uretici soyutlama (Nilvera/EDM)","Imzali webhook bildirimi + poll fallback"],"technologies_used":["Bun","Fastify 5","TypeScript","Drizzle ORM","MySQL","Redis","BullMQ","Docker","Fastify","Zod"],"design_highlights":[]}' AS CHAR), 'e-fatura-service cover image', 'e-fatura-service', 'Turkiye e-ticaret projeleri icin merkezi multi-tenant e-arsiv / e-fatura mikroservisi.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img12, 'tr', 'e-fatura-service', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p13 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='invitea' LIMIT 1);
SET @img13 := (SELECT id FROM project_images WHERE project_id=@p13 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p13, 'tr', 'Invitea', 'invitea', 'QR kod sistemli, animasyonlu dijital davetiye SaaS platformu. Dugun, nisan, dogum gunu ve kurumsal etkinlikler icin LCV, masa plani ve canli giris kontrolu.',
  CAST('{"html":"<p>QR kod sistemli, animasyonlu dijital davetiye SaaS platformu. Dugun, nisan, dogum gunu ve kurumsal etkinlikler icin LCV, masa plani ve canli giris kontrolu.</p>","description":null,"key_features":["Animasyonlu davetiye sablonlari (GSAP + Lenis)","QR kod ile davetli giris kontrolu (mukerrer giris engeli)","LCV (RSVP) formu ve canli katilim tablosu","Masa/oturma plani (dnd-kit drag-drop)","Excel/CSV ile toplu davetli yukleme","WhatsApp + SMS + Email gonderim","5 dil + coklu para birimi","Admin paneli (sablon, paket, odeme yonetimi)","Multi-tenant SaaS mimari"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Radix UI","Framer Motion","GSAP","Lenis","Fastify 5","Bun","Drizzle ORM","MySQL","Redis","Cloudinary","Stripe","Iyzipay","PayPal","next-intl","BullMQ","Next.js","Fastify","React","Zustand","Tailwind CSS","Zod","JWT","Sass"],"design_highlights":["Zarf acilma animasyonu (GSAP)","Scroll-trigger kelime kelime fade","Lenis smooth scroll","Parallax foto galeri","Geri sayim flip animasyonu","Modern tipografi (serif + script + sans)"]}' AS CHAR), 'Invitea cover image', 'Invitea', 'QR kod sistemli, animasyonlu dijital davetiye SaaS platformu. Dugun, nisan, dogum gunu ve kurumsal etkinlikler icin LCV, masa plani ve canli giris kontrolu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img13, 'tr', 'Invitea', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p14 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='satisai' LIMIT 1);
SET @img14 := (SELECT id FROM project_images WHERE project_id=@p14 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p14, 'tr', 'SatisAI', 'satisai', 'Sahibinden basta olmak uzere Turk pazaryerleri icin AI destekli ilan baslik, aciklama ve etiket uretim SaaS platformu.',
  CAST('{"html":"<p>Sahibinden basta olmak uzere Turk pazaryerleri icin AI destekli ilan baslik, aciklama ve etiket uretim SaaS platformu.</p>","description":null,"key_features":["Kategori-spesifik AI ilan uretimi (Vasita, Emlak, Ikinci El, Yedek Parca)","Toplu ilan uretimi (Excel/CSV import-export)","Sahibinden algoritmasina optimize baslik ve etiket","Multi-platform cikti (Sahibinden + Arabam + Hepsiemlak + Emlakjet)","Foto analizi ile otomatik ozellik tespiti (Claude Vision)","Pazar fiyat verisi ve fiyat onerisi (scraper-service entegrasyonu)","Galeri ve emlakci icin multi-user takim ozelligi","Kredi tabanli plan ve abonelik yonetimi","Kullanim analizi ve performans raporlari"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Claude Sonnet 4.6 API","Cloudinary","iyzico","Stripe","Redis","Docker"],"design_highlights":["Galerici dostu hizli akis tasarimi","Toplu mod icin tablo bazli editor","Foto onizleme ve drag-drop yukleme"]}' AS CHAR), 'SatisAI cover image', 'SatisAI', 'Sahibinden basta olmak uzere Turk pazaryerleri icin AI destekli ilan baslik, aciklama ve etiket uretim SaaS platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img14, 'tr', 'SatisAI', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p15 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='sultandefense' LIMIT 1);
SET @img15 := (SELECT id FROM project_images WHERE project_id=@p15 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p15, 'tr', 'Sultan Defense', 'sultandefense', 'Sultan Defense Ltd., Co. icin gelistirilen savunma tedarik katalogu, B2B teklif talebi ve admin yonetim platformu.',
  CAST('{"html":"<p>Sultan Defense Ltd., Co. icin gelistirilen savunma tedarik katalogu, B2B teklif talebi ve admin yonetim platformu.</p>","description":null,"key_features":["Cok dilli savunma urun katalogu","10 ana urun kategorisi","B2B teklif ve RFQ akisi","Admin panelden katalog, medya, sayfa ve teklif yonetimi","EUC, ihracat uyumu ve lojistik odakli icerik","Teknik SEO, metadata, sitemap ve OG altyapisi","Seed tabanli MySQL kurulum akisi","Sultan Defense Celik ve Cyan marka temasi"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","next-intl","Fastify","Bun","Drizzle ORM","MySQL","Zod","Radix UI","Cloudinary","Nginx","PM2","Next.js","React","Tailwind CSS","Shadcn UI","i18n","Zustand","JWT","Nodemailer"],"design_highlights":["Deep Navy ve Tactical Cyan renk sistemi","Kalkan ve SD monogram odakli marka dili","Koyu ve acik tema destegi","Operasyonel B2B katalog arayuzu","Yoğun admin ekranlari icin sade, taranabilir layout"]}' AS CHAR), 'Sultan Defense cover image', 'Sultan Defense', 'Sultan Defense Ltd., Co. icin gelistirilen savunma tedarik katalogu, B2B teklif talebi ve admin yonetim platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img15, 'tr', 'Sultan Defense', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p16 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='techstack-analyzer' LIMIT 1);
SET @img16 := (SELECT id FROM project_images WHERE project_id=@p16 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p16, 'tr', 'TechStack Analyzer', 'techstack-analyzer', 'Web sitelerinin kullandigi teknolojileri (CMS, odeme, analytics, reklam, hosting, CDN, JS kutuphaneleri) tespit eden BuiltWith benzeri analiz ve lead-generation SaaS platformu.',
  CAST('{"html":"<p>Web sitelerinin kullandigi teknolojileri (CMS, odeme, analytics, reklam, hosting, CDN, JS kutuphaneleri) tespit eden BuiltWith benzeri analiz ve lead-generation SaaS platformu.</p>","description":null,"key_features":["Tek domain teknoloji analizi (CMS, odeme, analytics, reklam, hosting, CDN, JS lib)","Toplu domain analizi (CSV/liste import, queue tabanli batch)","Wappalyzer tabanli fingerprint motoru (HTML, header, cookie, DNS, script)","Reverse lookup: belirli teknolojiyi kullanan domain listesi","Public REST API + API key & rate limit","Admin panel: tarama izleme, fingerprint kural yonetimi, kullanici","scraper-service entegrasyonu ile olcekli ve CF-bypass sayfa cekme","Periyodik yeniden tarama ve teknoloji degisim takibi","Kredi/abonelik tabanli plan yonetimi"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Redis","BullMQ","Python","Scrapling","Docker","Next.js","React"],"design_highlights":["Domain rapor sayfasi: kategori bazli teknoloji kartlari","Reverse lookup icin filtrelenebilir tablo + export","Batch ilerleme paneli"]}' AS CHAR), 'TechStack Analyzer cover image', 'TechStack Analyzer', 'Web sitelerinin kullandigi teknolojileri (CMS, odeme, analytics, reklam, hosting, CDN, JS kutuphaneleri) tespit eden BuiltWith benzeri analiz ve lead-generation SaaS platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img16, 'tr', 'TechStack Analyzer', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p17 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='trackpulse' LIMIT 1);
SET @img17 := (SELECT id FROM project_images WHERE project_id=@p17 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p17, 'tr', 'TrackPulse', 'trackpulse', 'GA4, Google Tag Manager, Meta Pixel ve Google Ads verisini tek panelde birleştiren web analitik ve dönüşüm izleme platformu + kurulum hizmeti.',
  CAST('{"html":"<p>GA4, Google Tag Manager, Meta Pixel ve Google Ads verisini tek panelde birleştiren web analitik ve dönüşüm izleme platformu + kurulum hizmeti.</p>","description":null,"key_features":["GA4 + GTM + Meta Pixel + Google Ads tek panelde birleşik raporlama","Olay (event) ve dönüşüm izleme kurulumu","Dönüşüm hunisi (funnel) ve adım adım kayıp analizi","Kanal / atıf (attribution) modelleme ve ROAS","E-ticaret satın alma ve gelir izleme (enhanced e-commerce)","Server-side tracking (sGTM) ve Consent Mode v2 uyumu","Gerçek zamanlı aktif kullanıcı izleme","Hedef (goal) ve KPI panoları","Otomatik haftalık performans raporu (PDF + e-posta)","Çoklu site / çoklu hesap yönetimi"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Google Analytics 4 Data API","Google Tag Manager","Google Ads API","Meta Conversions API","Docker","Next.js","React","Tailwind CSS","PM2","Nginx"],"design_highlights":["Birleşik veri panosu — kaynaklar arası tek görünüm","Dönüşüm hunisi görselleştirmesi","Kanal performansı ROAS renk skalası"]}' AS CHAR), 'TrackPulse cover image', 'TrackPulse', 'GA4, Google Tag Manager, Meta Pixel ve Google Ads verisini tek panelde birleştiren web analitik ve dönüşüm izleme platformu + kurulum hizmeti.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img17, 'tr', 'TrackPulse', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p18 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='videomatik' LIMIT 1);
SET @img18 := (SELECT id FROM project_images WHERE project_id=@p18 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p18, 'tr', 'Videomatik', 'videomatik', 'TR pazarına yönelik AI destekli video editleme SaaS. YouTube + Shorts/Reels için ham videoyu otomatik kesip yayın hazır hale getiren tarayıcı tabanlı editör.',
  CAST('{"html":"<p>TR pazarına yönelik AI destekli video editleme SaaS. YouTube + Shorts/Reels için ham videoyu otomatik kesip yayın hazır hale getiren tarayıcı tabanlı editör.</p>","description":null,"key_features":["AI auto-edit: Whisper transcribe + LLM segment seçimi + FFmpeg cut+concat","Tarayıcı tabanlı timeline editör (Faz 2+, OpenCut''tan ilham)","YouTube + Shorts + Reels + TikTok format presetleri (16:9, 9:16, 1:1)","Otomatik altyazı (Whisper) + AI başlık/açıklama/etiket üretimi","Direkt yayın: YouTube + Instagram + TikTok platformlara push","Türkçe arayüz, TL + KDV faturalama"],"technologies_used":["Next.js 16","React 19","TypeScript","Fastify","Bun","Drizzle ORM","MySQL","FFmpeg","OpenAI Whisper","Anthropic Claude","BullMQ","Redis","Cloudinary","SEO"],"design_highlights":["AI-first workflow: ham video → 60sn YouTube-ready output tek tıkla","Hibrit kontrol: otomatik kesim + opsiyonel manuel ince ayar","TR pazar odaklı: yerli ödeme + KDV + Türkçe LLM prompt''ları"]}' AS CHAR), 'Videomatik cover image', 'Videomatik', 'TR pazarına yönelik AI destekli video editleme SaaS. YouTube + Shorts/Reels için ham videoyu otomatik kesip yayın hazır hale getiren tarayıcı tabanlı editör.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img18, 'tr', 'Videomatik', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p19 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='woody' LIMIT 1);
SET @img19 := (SELECT id FROM project_images WHERE project_id=@p19 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p19, 'tr', 'Woody ve Arkadaşları', 'woody', 'Anaokulu İngilizce eğitim setleri, dijital içerik kütüphanesi, öğretmen akademisi ve mağazayı tek çatıda toplayan çok dilli eğitim platformu.',
  CAST('{"html":"<p>Anaokulu İngilizce eğitim setleri, dijital içerik kütüphanesi, öğretmen akademisi ve mağazayı tek çatıda toplayan çok dilli eğitim platformu.</p>","description":null,"key_features":["Çok dilli (10 dil) gerçek route + tam hreflang","SSR/SSG ile AI/arama motoru erişilebilir içerik","Dijital içerik kütüphanesi (Storyland / Movieland / Musicland)","Mağaza ve ürün sayfaları (Product + pricing şeması)","Blog ve öğretmen akademisi","Yerel SEO (İstanbul anaokulu İngilizce eğitimi)","Zengin JSON-LD şema + llms.txt"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","next-intl","Fastify","Drizzle ORM","MySQL","Next.js","PM2","Bun","React","Zustand","Tailwind CSS","Radix UI","Zod","JWT","Sass","Cloudinary","Nodemailer"],"design_highlights":["Eski canlı tasarımın SSR sürümüne sadık taşınması","Çocuk dostu, marka renkli arayüz","Erişilebilirlik ve Core Web Vitals odaklı"]}' AS CHAR), 'Woody ve Arkadaşları cover image', 'Woody ve Arkadaşları', 'Anaokulu İngilizce eğitim setleri, dijital içerik kütüphanesi, öğretmen akademisi ve mağazayı tek çatıda toplayan çok dilli eğitim platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(UUID(), @img19, 'tr', 'Woody ve Arkadaşları', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

COMMIT;
