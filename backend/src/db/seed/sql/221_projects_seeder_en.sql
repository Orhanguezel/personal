-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler project metadata files
-- Generated at 2026-06-09T23:37:13.757Z
SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

SET @p1 := UUID();
SET @pi18n1 := UUID();
SET @img1 := UUID();
SET @imgI18n1 := UUID();
SET @asset1 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p1, 1, 1, 1,
  1000.00, 'USD', 1,
  '/assets/imgs/work/projects/quickecommerce.png', @asset1, 'https://sportoonline.com', 'https://github.com/Orhanguezel/quickecommerce',
  'E-COMMERCE', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Mobile Development","Architecture & Optimization"]' AS CHAR), 'https://sportoonline.com', CAST('["Laravel","PHP","Next.js","React","TypeScript","Flutter","MySQL","Tailwind CSS","Redux Toolkit","React Query","Zustand","i18n","SEO","JWT","Bun","Radix UI","Zod"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n1, @p1, 'en', 'QuickEcommerce', 'quickecommerce', 'Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',
  CAST('{"html":"<p>Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.</p>","description":null,"key_features":["Admin panel","Customer web","Mobile application","Store and seller management","Multi-language support"],"technologies_used":["Laravel","PHP","Next.js","React","TypeScript","Flutter","MySQL","Tailwind CSS","Redux Toolkit","React Query","Zustand","i18n","SEO","JWT","Bun","Radix UI","Zod"],"design_highlights":["Production-ready commerce stack","Shared architecture across channels","Marketplace-style store workflows"]}' AS CHAR), 'QuickEcommerce cover image', 'QuickEcommerce', 'Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img1, @p1, @asset1, '/assets/imgs/work/projects/quickecommerce.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n1, @img1, 'en', 'QuickEcommerce', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p2 := UUID();
SET @pi18n2 := UUID();
SET @img2 := UUID();
SET @imgI18n2 := UUID();
SET @asset2 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p2, 1, 1, 2,
  1000.00, 'USD', 1,
  '/assets/imgs/work/projects/ensotek.png', @asset2, 'https://www.ensotek.de', 'https://github.com/Orhanguezel/Ensotek',
  'B2B PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Architecture & Optimization","DevOps & Deployment"]' AS CHAR), 'https://www.ensotek.de', CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","JWT","Tailwind CSS","Radix UI","i18n","SEO","Swagger","Docker","Nginx","CI/CD","React","Redux Toolkit","React Query","PM2","GitHub Actions","Zustand","Nodemailer","Sass"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n2, @p2, 'en', 'Ensotek', 'ensotek', 'B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.',
  CAST('{"html":"<p>B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.</p>","description":null,"key_features":["Admin panel","Multiple frontend variants","Catalog management","Customer document handling","Multi-language (TR/EN/DE)","Swagger API docs"],"technologies_used":["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","JWT","Tailwind CSS","Radix UI","i18n","SEO","Swagger","Docker","Nginx","CI/CD","React","Redux Toolkit","React Query","PM2","GitHub Actions","Zustand","Nodemailer","Sass"],"design_highlights":["Shared packages across frontends","Locale-aware content flows","Production deployed at ensotek.de"]}' AS CHAR), 'Ensotek B2B Platform', 'Ensotek', 'B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img2, @p2, @asset2, '/assets/imgs/work/projects/ensotek.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n2, @img2, 'en', 'Ensotek', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p3 := UUID();
SET @pi18n3 := UUID();
SET @img3 := UUID();
SET @imgI18n3 := UUID();
SET @asset3 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p3, 1, 1, 3,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-3.png', @asset3, NULL, NULL,
  'ERP', 'Own Project', '2026-01-01', NULL, 'Ongoing',
  CAST('["Backend Development","Admin Panel","Architecture & Optimization"]' AS CHAR), NULL, CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Zod","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n3, @p3, 'en', 'Paspas ERP', 'paspas-erp', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',
  CAST('{"html":"<p>Production planning and operations ERP workspace with Bun backend and Next.js admin panel.</p>","description":null,"key_features":["Production planning","Operations management","Admin dashboard","ERP workflows","Reporting"],"technologies_used":["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Zod","Cloudinary","Nodemailer"],"design_highlights":["Operational data flows","Machine planning focus","Admin-first workflow design"]}' AS CHAR), 'Paspas ERP cover image', 'Paspas ERP', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img3, @p3, @asset3, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n3, @img3, 'en', 'Paspas ERP', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p4 := UUID();
SET @pi18n4 := UUID();
SET @img4 := UUID();
SET @imgI18n4 := UUID();
SET @asset4 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p4, 1, 1, 4,
  1000.00, 'USD', 1,
  '/assets/imgs/work/projects/vistainsaat.png', @asset4, 'https://www.vistainsaat.com', NULL,
  'CORPORATE WEBSITE', 'Vista Insaat', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","SEO Optimization","UI/UX Design","Admin Panel"]' AS CHAR), 'https://www.vistainsaat.com', CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Radix UI","Node.js","Fastify","MySQL","Drizzle ORM","React","PM2","Nginx","i18n","SEO","JWT","Cloudinary","Nodemailer","Bun"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n4, @p4, 'en', 'Vista İnşaat', 'vista-insaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',
  CAST('{"html":"<p>İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.</p>","description":null,"key_features":["TR/EN multilingual (next-intl)","Project catalog with galleries","Blog","Contact and offer form","Technical SEO (canonical, hreflang, JSON-LD, sitemap)","Admin panel (content management)","Token-based theme system","SSL + Nginx deployment"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Radix UI","Node.js","Fastify","MySQL","Drizzle ORM","React","PM2","Nginx","i18n","SEO","JWT","Cloudinary","Nodemailer","Bun"],"design_highlights":["Portfolio metadata standard is enforced","Tech stack is merged with repository scan results","Content is generated dynamically for portfolio seeds"]}' AS CHAR), 'Vista Insaat corporate website screenshot', 'Vista İnşaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img4, @p4, @asset4, '/assets/imgs/work/projects/vistainsaat.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n4, @img4, 'en', 'Vista İnşaat', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p5 := UUID();
SET @pi18n5 := UUID();
SET @img5 := UUID();
SET @imgI18n5 := UUID();
SET @asset5 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p5, 1, 1, 5,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-3.png', @asset5, NULL, 'https://github.com/Orhanguezel/sunplex',
  'ERP', 'SUNPLEX (ENES OTO)', '2026-05-22', NULL, 'Ongoing',
  CAST('["Backend Development","Admin Panel","ERP Integration","Architecture & Optimization"]' AS CHAR), NULL, CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Zod","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n5, @p5, 'en', 'SUNPLEX Üretim Yönetim Sistemi', 'sunplex-uretim-yonetim', 'Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.',
  CAST('{"html":"<p>Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.</p>","description":null,"key_features":["Stoğa üretim planlama","Logo Wings ERP entegrasyonu","Makine veri entegrasyonu","Sipariş paketleme ve sevkiyat","Haftalık makine bazlı planlama","Personel devam takibi"],"technologies_used":["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Zod","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Cloudinary","Nodemailer"],"design_highlights":["Stok odaklı üretim akışı","Haftalık ve makine bazlı planlama","Admin-first workflow design"]}' AS CHAR), 'SUNPLEX Üretim Yönetim Sistemi cover image', 'SUNPLEX Üretim Yönetim Sistemi', 'Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img5, @p5, @asset5, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n5, @img5, 'en', 'SUNPLEX Üretim Yönetim Sistemi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p6 := UUID();
SET @pi18n6 := UUID();
SET @img6 := UUID();
SET @imgI18n6 := UUID();
SET @asset6 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p6, 1, 0, 6,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-4.png', @asset6, 'https://sosial.tarvista.com', NULL,
  'SAAS PLATFORM', 'Own Project — Tarım Dijital Ekosistemi', '2025-01-01', NULL, 'Aktif geliştirme',
  CAST('["Backend Development","Frontend Development","Admin Dashboard","Architecture & Optimization","AI Integration","Social Media Automation"]' AS CHAR), 'https://sosial.tarvista.com', CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","JWT","node-cron","Next.js","React","React Query","Tailwind CSS","Shadcn UI","Groq LLM","OpenAI","Google Analytics API","Google Ads API","PM2","Nginx","Nodemailer","Cloudinary"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n6, @p6, 'en', 'Ekosistem Sosyal Medya', 'ekosistem-sosyal-medya', 'Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.',
  CAST('{"html":"<p>Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.</p>","description":null,"key_features":["Çoklu marka/proje yönetimi (bereketfide, vistaseed, tarimansiklopedisi...)","Facebook & Instagram Business API entegrasyonu","LinkedIn OAuth ve içerik yayını","X (Twitter) OAuth ve tweet yönetimi","Telegram bot entegrasyonu","AI destekli içerik üretimi (Groq/OpenAI)","Zamanlanmış görevler (node-cron): 5dk, 30dk, saatlik, günlük","Ekosistem haber akışı senkronizasyonu","Google Analytics 4 ve Google Ads takibi","İçerik şablonu yönetimi","Hashtag grup yönetimi","Kampanya takvimi","Platform token sağlığı izleme","Çoklu tenant mimarisi","Paylaşımlı @agro/shared-backend altyapısı"],"technologies_used":["TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","JWT","node-cron","Next.js","React","React Query","Tailwind CSS","Shadcn UI","Groq LLM","OpenAI","Google Analytics API","Google Ads API","PM2","Nginx","Nodemailer","Cloudinary"],"design_highlights":["Monorepo, @agro/shared-backend ile SaaS mimarisi","Tüm ekosistem platformlarına tek panelden erişim","Cron tabanlı otonom yayın akışı"]}' AS CHAR), 'Ekosistem Sosyal Medya Yönetim Paneli', 'Ekosistem Sosyal Medya', 'Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img6, @p6, @asset6, '/assets/imgs/work/img-4.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n6, @img6, 'en', 'Ekosistem Sosyal Medya', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p7 := UUID();
SET @pi18n7 := UUID();
SET @img7 := UUID();
SET @imgI18n7 := UUID();
SET @asset7 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p7, 1, 0, 7,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-3.png', @asset7, NULL, NULL,
  'AGRITECH PLATFORM', 'Own Project — Tarım Dijital Ekosistemi', '2026-05-15', NULL, 'Aktif geliştirme',
  CAST('["Backend Development","API Design","Data Modeling","Machine Learning","Data Engineering"]' AS CHAR), NULL, CAST('["Python","FastAPI","statsmodels","Prophet","scikit-learn","pandas","TypeScript","Fastify","Bun","MySQL","TimescaleDB","Redis","Docker"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n7, @p7, 'en', 'Tahmin Motoru', 'tahmin-motoru', 'Tarım Dijital Ekosistemi''nin merkezi tahmin mikroservisi. Geçmiş istatistikler ve o yılki şartları gözeterek 12 aya kadar hava durumu, hal fiyatı, enflasyon ve tarla verimi tahmini üretir; ekosistemdeki diğer projelere API ile servis eder.',
  CAST('{"html":"<p>Saf istatistiksel/ML tahmin servisi. Python (FastAPI) tahmin çekirdeği + Fastify (Bun) ekosistem ağ geçidi. Diğer proje veritabanlarına read-only erişim ve REST API hibrit veri toplama. karar-motoru ve diğer modüller bu servisi tüketir.</p>","description":null,"key_features":["12 aya kadar hava durumu (iklim istatistiği + o yılki anomali) olasılıklı tahmini","Geçmiş hal fiyatlarına dayalı ürün/hal bazlı fiyat tahmini","Enflasyon (TÜFE/tarımsal ÜFE) senaryolu tahmini","Ürün/parsel/bölge bazlı tarla verimi tahmini","Belirsizlik aralığı + backtest doğruluk metrikleri ile dürüst tahmin","REST API — ekosistem modüllerine tahmin servisi (/api/v1)","Diğer proje DB''lerine read-only erişim + REST hibrit veri toplama","Versiyonlu model kayıt defteri ve zamanlanmış yeniden eğitim"],"technologies_used":["Python","FastAPI","statsmodels","Prophet","scikit-learn","pandas","TypeScript","Fastify","Bun","MySQL","TimescaleDB","Redis","Docker"],"design_highlights":["tm_ prefix ile şema ayrımı","Python ML çekirdeği + ince Fastify ekosistem gateway","Ekosistemin merkezi tahmin/forecast veri servisi"]}' AS CHAR), 'Tahmin Motoru', 'Tahmin Motoru', 'Tarım Dijital Ekosistemi''nin merkezi tahmin mikroservisi. Geçmiş istatistikler ve o yılki şartları gözeterek 12 aya kadar hava durumu, hal fiyatı, enflasyon ve tarla verimi tahmini üretir; ekosistemdeki diğer projelere API ile servis eder.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img7, @p7, @asset7, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n7, @img7, 'en', 'Tahmin Motoru', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p8 := UUID();
SET @pi18n8 := UUID();
SET @img8 := UUID();
SET @imgI18n8 := UUID();
SET @asset8 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p8, 1, 0, 8,
  1000.00, 'USD', 1,
  '/assets/imgs/work/projects/paketjet.png', @asset8, 'https://paketjet.com', NULL,
  'MARKETPLACE PLATFORM', 'Own Project', '2026-03-01', '2026-03-12', '2 weeks',
  CAST('["Full-Stack Development","Marketplace Architecture","Admin Panel"]' AS CHAR), 'https://paketjet.com', CAST('["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Zustand","Tailwind CSS v4","Next.js","React","Fastify","MySQL","Tailwind CSS","Radix UI","JWT","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n8, @p8, 'en', 'PaketJet', 'paketjet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',
  CAST('{"html":"<p>P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.</p>","description":null,"key_features":["P2P cargo listing & booking","Real-time capacity management","Wallet & payment system","Carrier & customer dashboards","Multi-step listing wizard","Admin panel with revenue stats","JWT cookie auth with role guards"],"technologies_used":["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Zustand","Tailwind CSS v4","Next.js","React","Fastify","MySQL","Tailwind CSS","Radix UI","JWT","Cloudinary","Nodemailer"],"design_highlights":["Token-based Tailwind v4 design system","Dark mode with data-theme attribute","Mobile-first responsive panel UI","Capacity bar visualization"]}' AS CHAR), 'PaketJet Logistics Platform', 'PaketJet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img8, @p8, @asset8, '/assets/imgs/work/projects/paketjet.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n8, @img8, 'en', 'PaketJet', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p9 := UUID();
SET @pi18n9 := UUID();
SET @img9 := UUID();
SET @imgI18n9 := UUID();
SET @asset9 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p9, 1, 0, 9,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-2.png', @asset9, 'https://diricanmantar.com', NULL,
  'AGRITECH PLATFORM', 'Dirican Mantar', '2026-05-08', NULL, '9–10 hafta',
  CAST('["Computer Vision / AI Development","Edge AI Software","Backend Development","Frontend Development","Hardware Consulting"]' AS CHAR), 'https://diricanmantar.com', CAST('["Python","YOLOv8","OpenCV","TensorRT","NVIDIA Jetson Orin","Intel RealSense","PyQt6","Fastify","Next.js","TypeScript","MySQL","MQTT","Docker","Node.js","Tailwind CSS","PM2","Nginx","Bun","Framer Motion","React","Zustand","Radix UI","Zod","Drizzle ORM","JWT","WebSockets","Sass","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n9, @p9, 'en', 'Dirican Mantar — AI Hasat Görüntüleme Sistemi', 'dirican-mantar', 'Mersin''deki kültür mantarı üretim tesisi için geliştirilecek yapay zeka destekli hasat görüntüleme ve işaretleme sistemi. YOLOv8 + Intel RealSense + NVIDIA Jetson Orin ile 4 cm eşiğini geçen mantarları gerçek zamanlı tespit ederek hasat personelini LED/projeksiyon ile yönlendiriyor.',
  CAST('{"html":"<p>Dirican Mantar, Mersin Toroslar''da 18 oda, 2 ton/gün (~50.000 mantar/gün) kapasiteli profesyonel kültür mantarı (Agaricus bisporus) üretim tesisidir. Mevcut sorun: personelin hasat boyutu olan 4 cm''ye ulaşmamış mantarları da toplaması — hem verim hem kalite kaybına yol açıyor. Çözüm: Her hasat sepetine monte edilen kamera+edge AI birimi, ranza üzerindeki mantarları sürekli tarar, 4 cm+ olanları yeşil LED ile işaretler, küçükleri kırmızı ile geçer. İsviçre''deki rakip MycoSense Spotlight (CHF 4.500/birim) ile aynı teknoloji, %85 daha düşük maliyetle yerel koşullara uyarlanıyor. 8 sepet birimi + web yönetim paneli kapsamı.</p>","description":null,"key_features":["YOLOv8 instance segmentation — örtüşen mantarlar dahil %94+ doğruluk","Intel RealSense D435i derinlik kamerası ile ±2mm boyut hassasiyeti","Gerçek zamanlı LED/projektör işaretleme (4cm+ yeşil, küçük kırmızı)","Oda/ranza/kat bazlı kalibrasyon profili yönetimi (15 saniyelik geçiş)","8 taşınabilir sepet birimi ile 18 oda kapsama","Web tabanlı yönetim paneli: oda izleme, personel performansı, hasat istatistikleri","MQTT tabanlı cihaz → panel veri akışı","M18K dataset (18.000+ örnek) + saha görüntüleriyle fine-tune model"],"technologies_used":["Python","YOLOv8","OpenCV","TensorRT","NVIDIA Jetson Orin","Intel RealSense","PyQt6","Fastify","Next.js","TypeScript","MySQL","MQTT","Docker","Node.js","Tailwind CSS","PM2","Nginx","Bun","Framer Motion","React","Zustand","Radix UI","Zod","Drizzle ORM","JWT","WebSockets","Sass","Cloudinary","Nodemailer"],"design_highlights":["Edge-first mimari: WiFi kesilse bile sepet birimi bağımsız çalışır","Taşınabilirlik: 15 sn''de kalibrasyon yükle, oda değiştir","MycoSense''e göre %85 maliyet avantajı","Faz 2 robotik hasat entegrasyonuna hazır yazılım altyapısı"]}' AS CHAR), 'Dirican Mantar AI Hasat Sistemi', 'Dirican Mantar — AI Hasat Görüntüleme Sistemi', 'Mersin''deki kültür mantarı üretim tesisi için geliştirilecek yapay zeka destekli hasat görüntüleme ve işaretleme sistemi. YOLOv8 + Intel RealSense + NVIDIA Jetson Orin ile 4 cm eşiğini geçen mantarları gerçek zamanlı tespit ederek hasat personelini LED/projeksiyon ile yönlendiriyor.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img9, @p9, @asset9, '/assets/imgs/work/img-2.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n9, @img9, 'en', 'Dirican Mantar — AI Hasat Görüntüleme Sistemi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p10 := UUID();
SET @pi18n10 := UUID();
SET @img10 := UUID();
SET @imgI18n10 := UUID();
SET @asset10 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p10, 1, 0, 10,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-2.png', @asset10, NULL, NULL,
  'DATA SCRAPING', 'Amozon', '2026-05-07', '2026-05-21', 'Tamamlandı (V1 — Bedrock)',
  CAST('["Backend Development","Data Scraping","Scoring Engine","LLM Integration","Admin Panel"]' AS CHAR), NULL, CAST('["TypeScript","Bun","Next.js","React","MySQL","Oxylabs","Keepa","Groq LLM","Drizzle ORM"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n10, @p10, 'en', 'Amozon', 'amozon', 'Amazon kategorilerinde 5 boyutlu risk skoru + LLM reasoning ile açıklanabilir AL/TAKIP_ET/UZAK_DUR karar motoru.',
  CAST('{"html":"<p>Oxylabs ile Amazon arama ve ürün verisini toplayan, Keepa fiyat geçmişiyle zenginleştiren, beş boyutta risk skoru ve LLM cross-dimension reasoning üreten explainable decision engine. Operatör paneli (Next.js) Single Journey tarama akışı, tez izleme, karar yüzeyi ve lineage sunar. Bağımsız TypeScript/Bun + MySQL projesi.</p>","description":null,"key_features":["Amazon ürün scraping ve ASIN tekilleştirme","Beş boyutlu kategori risk scoring","LLM cross-dimension reasoning","Confidence honesty ve coverage gate","Thesis memory — karar izleme ve invalidation","Single Journey tarama akışı (operatör paneli)","Keepa fiyat geçmişi zenginleştirme","Scan cache reuse ve kota görünürlüğü"],"technologies_used":["TypeScript","Bun","Next.js","React","MySQL","Oxylabs","Keepa","Groq LLM","Drizzle ORM"],"design_highlights":["Portfolio metadata standard is enforced","Tech stack is merged with repository scan results","Content is generated dynamically for portfolio seeds"]}' AS CHAR), 'Amozon Amazon scraping ve scoring engine', 'Amozon', 'Amazon kategorilerinde 5 boyutlu risk skoru + LLM reasoning ile açıklanabilir AL/TAKIP_ET/UZAK_DUR karar motoru.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img10, @p10, @asset10, '/assets/imgs/work/img-2.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n10, @img10, 'en', 'Amozon', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p11 := UUID();
SET @pi18n11 := UUID();
SET @img11 := UUID();
SET @imgI18n11 := UUID();
SET @asset11 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p11, 1, 0, 11,
  1000.00, 'USD', 1,
  '/assets/imgs/work/market-pulse-cover.png', @asset11, NULL, NULL,
  'SAAS PLATFORM', 'Promat (Paspas Müşterisi)', '2026-05-07', NULL, 'Pilot aşama',
  CAST('["SaaS Product Development","Frontend Development","Backend Development","Data Scraping","Market Intelligence"]' AS CHAR), NULL, CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Cloudinary","Docker","Next.js","Tailwind CSS","JWT","React","Zustand","Radix UI","Zod","Nodemailer","Sass"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n11, @p11, 'en', 'MarketPulse', 'market-pulse', 'Türk distribütörleri için bayi izleme, lead yönetimi ve rakip analiz SaaS platformu. Scraper destekli otomatik sinyal üretimi.',
  CAST('{"html":"<p>Plastik enjeksiyon, otomotiv ve benzeri sektörlerdeki distribütörler için rakip/bayi takip, churn riski hesaplama, lead pipeline ve pazar sinyali yönetimi. Copy-deploy modeli ile her müşteri için bağımsız kurulum. Scraper-service ile site değişikliği, fiyat farkı ve sosyal aktivite sinyalleri otomatik üretilir.</p>","description":null,"key_features":["Hedef firma takibi (rakip, bayi, distribütör, ortak)","Otomatik churn risk skoru (sinyal + aktivite + ERP verisi)","Lead pipeline (Yeni → Görüşmede → Dönüştürüldü akışı)","Pazar sinyalleri (site değişikliği, fiyat, sosyal aktivite, yorum)","Manuel ve scraper kaynaklı sinyal yönetimi","Lead Machine: Amazon satıcı tarama + AI review analizi","Lead Machine: B2B dizin tarama + ICP eşleştirme + pain point tespiti","Lead Machine: Fuar exhibitor tarama + 10times intent verisi","Enrichment: Apollo.io ile email + karar verici bulma","AI outreach e-posta taslağı üretimi (human-in-the-loop)","Haftalık PDF raporu + SMTP e-posta gönderimi","Paspas ERP cross-DB entegrasyonu (müşteri/sipariş okuma)","Paspas müşteri otomatik senkronizasyonu — POST /admin/market/sync-paspas (idempotent upsert)","Copy-deploy: her müşteri bağımsız kurulum"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Cloudinary","Docker","Next.js","Tailwind CSS","JWT","React","Zustand","Radix UI","Zod","Nodemailer","Sass"],"design_highlights":["Sinyal öncelik renk kodlaması (Kritik/Yüksek/Orta/Düşük)","Lead pipeline kanban-tablo hibrit görünüm","Churn risk renk skalası"]}' AS CHAR), 'MarketPulse - Bayi ve rakip izleme SaaS', 'MarketPulse', 'Türk distribütörleri için bayi izleme, lead yönetimi ve rakip analiz SaaS platformu. Scraper destekli otomatik sinyal üretimi.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img11, @p11, @asset11, '/assets/imgs/work/market-pulse-cover.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n11, @img11, 'en', 'MarketPulse', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p12 := UUID();
SET @pi18n12 := UUID();
SET @img12 := UUID();
SET @imgI18n12 := UUID();
SET @asset12 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p12, 1, 0, 12,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-1.png', @asset12, NULL, 'https://github.com/Orhanguezel/e-fatura-service',
  'SERVICE PLATFORM', 'Own Product', '2026-05-16', NULL, 'Ongoing',
  CAST('["Backend Development","API Integration","DevOps"]' AS CHAR), NULL, CAST('["Bun","Fastify 5","TypeScript","Drizzle ORM","MySQL","Redis","BullMQ","Docker","Fastify","Zod"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n12, @p12, 'en', 'e-fatura-service', 'e-fatura-service', 'Turkiye e-ticaret projeleri icin merkezi multi-tenant e-arsiv / e-fatura mikroservisi.',
  CAST('{"html":"<p>Nilvera/EDM entegratorleri uzerinden mali muhurlu e-arsiv fatura kesen, idempotent, kuyruk tabanli ve webhook bildirimli merkezi servis. sportoonline pilot tenant; kamanilan, konigsmassage, GZLTemizlik ortak tuketir.</p>","description":null,"key_features":["Multi-tenant credential at-rest sifreleme (AES-256-GCM)","Idempotent fatura olusturma + durum makinesi","BullMQ kalici kuyruk + uretici soyutlama (Nilvera/EDM)","Imzali webhook bildirimi + poll fallback"],"technologies_used":["Bun","Fastify 5","TypeScript","Drizzle ORM","MySQL","Redis","BullMQ","Docker","Fastify","Zod"],"design_highlights":[]}' AS CHAR), 'e-fatura-service cover image', 'e-fatura-service', 'Turkiye e-ticaret projeleri icin merkezi multi-tenant e-arsiv / e-fatura mikroservisi.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img12, @p12, @asset12, '/assets/imgs/work/img-1.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n12, @img12, 'en', 'e-fatura-service', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p13 := UUID();
SET @pi18n13 := UUID();
SET @img13 := UUID();
SET @imgI18n13 := UUID();
SET @asset13 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p13, 1, 0, 13,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-1.png', @asset13, NULL, NULL,
  'SAAS PLATFORM', 'Own Product', '2026-05-28', NULL, 'Planlama',
  CAST('["Backend Development","Frontend Development","Admin Panel Development","UI/UX Design","Animation Design","Payment Integration","DevOps"]' AS CHAR), NULL, CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Radix UI","Framer Motion","GSAP","Lenis","Fastify 5","Bun","Drizzle ORM","MySQL","Redis","Cloudinary","Stripe","Iyzipay","PayPal","next-intl","BullMQ","Next.js","Fastify","React","Zustand","Tailwind CSS","Zod","JWT","Sass"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n13, @p13, 'en', 'Invitea', 'invitea', 'QR kod sistemli, animasyonlu dijital davetiye SaaS platformu. Dugun, nisan, dogum gunu ve kurumsal etkinlikler icin LCV, masa plani ve canli giris kontrolu.',
  CAST('{"html":"<p>Gelin/damat veya kurumsal musteri kendi davetiyesini olusturur, davetlilere QR kodlu link gonderir; etkinlik gunu kapida gorevli telefonun kamerasi ile QR okutarak mukerrer girisi engeller. Global pazar icin 5 dil (TR/EN/DE/ES/FR) ve coklu para birimi (Stripe + Iyzipay + PayPal) destegi.</p>","description":null,"key_features":["Animasyonlu davetiye sablonlari (GSAP + Lenis)","QR kod ile davetli giris kontrolu (mukerrer giris engeli)","LCV (RSVP) formu ve canli katilim tablosu","Masa/oturma plani (dnd-kit drag-drop)","Excel/CSV ile toplu davetli yukleme","WhatsApp + SMS + Email gonderim","5 dil + coklu para birimi","Admin paneli (sablon, paket, odeme yonetimi)","Multi-tenant SaaS mimari"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Radix UI","Framer Motion","GSAP","Lenis","Fastify 5","Bun","Drizzle ORM","MySQL","Redis","Cloudinary","Stripe","Iyzipay","PayPal","next-intl","BullMQ","Next.js","Fastify","React","Zustand","Tailwind CSS","Zod","JWT","Sass"],"design_highlights":["Zarf acilma animasyonu (GSAP)","Scroll-trigger kelime kelime fade","Lenis smooth scroll","Parallax foto galeri","Geri sayim flip animasyonu","Modern tipografi (serif + script + sans)"]}' AS CHAR), 'Invitea — QR sistemli dijital davetiye platformu', 'Invitea', 'QR kod sistemli, animasyonlu dijital davetiye SaaS platformu. Dugun, nisan, dogum gunu ve kurumsal etkinlikler icin LCV, masa plani ve canli giris kontrolu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img13, @p13, @asset13, '/assets/imgs/work/img-1.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n13, @img13, 'en', 'Invitea', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p14 := UUID();
SET @pi18n14 := UUID();
SET @img14 := UUID();
SET @imgI18n14 := UUID();
SET @asset14 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p14, 1, 0, 14,
  1000.00, 'USD', 1,
  '/assets/imgs/work/satisai-cover.png', @asset14, NULL, NULL,
  'SAAS PLATFORM', 'Own Project', '2026-05-02', NULL, 'Ongoing',
  CAST('["AI Product Development","Frontend Development","Backend Development","Prompt Engineering","SaaS Architecture"]' AS CHAR), NULL, CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Claude Sonnet 4.6 API","Cloudinary","iyzico","Stripe","Redis","Docker"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n14, @p14, 'en', 'SatisAI', 'satisai', 'Sahibinden basta olmak uzere Turk pazaryerleri icin AI destekli ilan baslik, aciklama ve etiket uretim SaaS platformu.',
  CAST('{"html":"<p>Galericiler, emlakcilar, ikinci el satici ve kurumsal saticilar icin Claude Sonnet 4.6 tabanli ilan optimizasyon araci. Kategori-spesifik prompt''lar, toplu ilan uretimi (Excel/CSV), foto analizi ve pazar fiyat verisi ile Sahibinden, Arabam.com, Hepsiemlak ve Emlakjet gibi platformlara paralel cikti uretir.</p>","description":null,"key_features":["Kategori-spesifik AI ilan uretimi (Vasita, Emlak, Ikinci El, Yedek Parca)","Toplu ilan uretimi (Excel/CSV import-export)","Sahibinden algoritmasina optimize baslik ve etiket","Multi-platform cikti (Sahibinden + Arabam + Hepsiemlak + Emlakjet)","Foto analizi ile otomatik ozellik tespiti (Claude Vision)","Pazar fiyat verisi ve fiyat onerisi (scraper-service entegrasyonu)","Galeri ve emlakci icin multi-user takim ozelligi","Kredi tabanli plan ve abonelik yonetimi","Kullanim analizi ve performans raporlari"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Claude Sonnet 4.6 API","Cloudinary","iyzico","Stripe","Redis","Docker"],"design_highlights":["Galerici dostu hizli akis tasarimi","Toplu mod icin tablo bazli editor","Foto onizleme ve drag-drop yukleme"]}' AS CHAR), 'SatisAI - AI ilan uretim SaaS', 'SatisAI', 'Sahibinden basta olmak uzere Turk pazaryerleri icin AI destekli ilan baslik, aciklama ve etiket uretim SaaS platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img14, @p14, @asset14, '/assets/imgs/work/satisai-cover.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n14, @img14, 'en', 'SatisAI', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p15 := UUID();
SET @pi18n15 := UUID();
SET @img15 := UUID();
SET @imgI18n15 := UUID();
SET @asset15 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p15, 1, 0, 15,
  1000.00, 'USD', 1,
  '/logo/png/sultandefense_logo_512.png', @asset15, 'https://www.sultandefense.com', 'https://github.com/Orhanguezel/defense.git',
  'B2B PLATFORM', 'Sultan Defense Ltd., Co.', '2026-06-04', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel Development","Database Seeding","Technical SEO","Brand Implementation","Deployment Preparation"]' AS CHAR), 'https://www.sultandefense.com', CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","next-intl","Fastify","Bun","Drizzle ORM","MySQL","Zod","Radix UI","Cloudinary","Nginx","PM2","Next.js","React","Tailwind CSS","Shadcn UI","i18n","Zustand","JWT","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n15, @p15, 'en', 'Sultan Defense', 'sultandefense', 'Sultan Defense Ltd., Co. icin gelistirilen savunma tedarik katalogu, B2B teklif talebi ve admin yonetim platformu.',
  CAST('{"html":"<p>Sultan Defense; savunma urun kategorileri, tedarik sureci, ihracat uyumu, EUC dokumantasyonu, lojistik koordinasyonu ve cok dilli kurumsal icerik yonetimi iceren Next.js, Fastify ve MySQL tabanli bir B2B platformdur.</p>","description":null,"key_features":["Cok dilli savunma urun katalogu","10 ana urun kategorisi","B2B teklif ve RFQ akisi","Admin panelden katalog, medya, sayfa ve teklif yonetimi","EUC, ihracat uyumu ve lojistik odakli icerik","Teknik SEO, metadata, sitemap ve OG altyapisi","Seed tabanli MySQL kurulum akisi","Sultan Defense Celik ve Cyan marka temasi"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","next-intl","Fastify","Bun","Drizzle ORM","MySQL","Zod","Radix UI","Cloudinary","Nginx","PM2","Next.js","React","Tailwind CSS","Shadcn UI","i18n","Zustand","JWT","Nodemailer"],"design_highlights":["Deep Navy ve Tactical Cyan renk sistemi","Kalkan ve SD monogram odakli marka dili","Koyu ve acik tema destegi","Operasyonel B2B katalog arayuzu","Yoğun admin ekranlari icin sade, taranabilir layout"]}' AS CHAR), 'Sultan Defense shield logo', 'Sultan Defense', 'Sultan Defense Ltd., Co. icin gelistirilen savunma tedarik katalogu, B2B teklif talebi ve admin yonetim platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img15, @p15, @asset15, '/logo/png/sultandefense_logo_512.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n15, @img15, 'en', 'Sultan Defense', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p16 := UUID();
SET @pi18n16 := UUID();
SET @img16 := UUID();
SET @imgI18n16 := UUID();
SET @asset16 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p16, 1, 0, 16,
  1000.00, 'USD', 1,
  '/assets/imgs/work/techstack-analyzer-cover.png', @asset16, NULL, NULL,
  'SAAS PLATFORM', 'Own Project', '2026-05-19', NULL, 'Ongoing',
  CAST('["Backend Development","Web Scraping & Crawling","Data Engineering","Frontend Development","SaaS Architecture","API Development"]' AS CHAR), NULL, CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Redis","BullMQ","Python","Scrapling","Docker","Next.js","React"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n16, @p16, 'en', 'TechStack Analyzer', 'techstack-analyzer', 'Web sitelerinin kullandigi teknolojileri (CMS, odeme, analytics, reklam, hosting, CDN, JS kutuphaneleri) tespit eden BuiltWith benzeri analiz ve lead-generation SaaS platformu.',
  CAST('{"html":"<p>Bir domain veya domain listesi alir; sayfa HTML''i, HTTP header, cookie, DNS ve script imzalarini Wappalyzer tabanli fingerprint motoru ile eslestirerek sitenin teknoloji yiginini cikarir. Reverse lookup (belirli bir teknolojiyi kullanan tum domainleri listeleme) ile pazar arastirmasi ve lead generation saglar. Sayfa cekme isi merkezi scraper-service uzerinden yapilir.</p>","description":null,"key_features":["Tek domain teknoloji analizi (CMS, odeme, analytics, reklam, hosting, CDN, JS lib)","Toplu domain analizi (CSV/liste import, queue tabanli batch)","Wappalyzer tabanli fingerprint motoru (HTML, header, cookie, DNS, script)","Reverse lookup: belirli teknolojiyi kullanan domain listesi","Public REST API + API key & rate limit","Admin panel: tarama izleme, fingerprint kural yonetimi, kullanici","scraper-service entegrasyonu ile olcekli ve CF-bypass sayfa cekme","Periyodik yeniden tarama ve teknoloji degisim takibi","Kredi/abonelik tabanli plan yonetimi"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Redis","BullMQ","Python","Scrapling","Docker","Next.js","React"],"design_highlights":["Domain rapor sayfasi: kategori bazli teknoloji kartlari","Reverse lookup icin filtrelenebilir tablo + export","Batch ilerleme paneli"]}' AS CHAR), 'TechStack Analyzer - web teknoloji tespit SaaS', 'TechStack Analyzer', 'Web sitelerinin kullandigi teknolojileri (CMS, odeme, analytics, reklam, hosting, CDN, JS kutuphaneleri) tespit eden BuiltWith benzeri analiz ve lead-generation SaaS platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img16, @p16, @asset16, '/assets/imgs/work/techstack-analyzer-cover.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n16, @img16, 'en', 'TechStack Analyzer', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p17 := UUID();
SET @pi18n17 := UUID();
SET @img17 := UUID();
SET @imgI18n17 := UUID();
SET @asset17 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p17, 1, 0, 17,
  1000.00, 'USD', 1,
  'docs/portfolio/assets/00-cover.png', @asset17, NULL, NULL,
  'WEB ANALYTICS', 'Own Product', '2026-06-05', NULL, 'Planlama / Portfolyo hazırlık',
  CAST('["Web Analytics Setup","Conversion Tracking","Tag Management","Frontend Development","Backend Development","Data Integration"]' AS CHAR), NULL, CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Google Analytics 4 Data API","Google Tag Manager","Google Ads API","Meta Conversions API","Docker","Next.js","React","Tailwind CSS","PM2","Nginx"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n17, @p17, 'en', 'TrackPulse', 'trackpulse', 'GA4, Google Tag Manager, Meta Pixel ve Google Ads verisini tek panelde birleştiren web analitik ve dönüşüm izleme platformu + kurulum hizmeti.',
  CAST('{"html":"<p>Web sitelerine GA4, Google Tag Manager, Meta Pixel ve Google Ads dönüşüm izleme kurulumu yapan ve tüm bu kaynakları tek bir panelde birleştiren analitik platformu. Olay (event) ve dönüşüm takibi, dönüşüm hunisi, kanal/atıf (attribution) analizi, e-ticaret satın alma izleme ve gerçek zamanlı raporlama. Server-side tracking ve Consent Mode v2 uyumlu kurulum.</p>","description":null,"key_features":["GA4 + GTM + Meta Pixel + Google Ads tek panelde birleşik raporlama","Olay (event) ve dönüşüm izleme kurulumu","Dönüşüm hunisi (funnel) ve adım adım kayıp analizi","Kanal / atıf (attribution) modelleme ve ROAS","E-ticaret satın alma ve gelir izleme (enhanced e-commerce)","Server-side tracking (sGTM) ve Consent Mode v2 uyumu","Gerçek zamanlı aktif kullanıcı izleme","Hedef (goal) ve KPI panoları","Otomatik haftalık performans raporu (PDF + e-posta)","Çoklu site / çoklu hesap yönetimi"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Shadcn UI","Fastify","Drizzle ORM","MySQL","Bun","Google Analytics 4 Data API","Google Tag Manager","Google Ads API","Meta Conversions API","Docker","Next.js","React","Tailwind CSS","PM2","Nginx"],"design_highlights":["Birleşik veri panosu — kaynaklar arası tek görünüm","Dönüşüm hunisi görselleştirmesi","Kanal performansı ROAS renk skalası"]}' AS CHAR), 'TrackPulse — web analitik ve dönüşüm izleme paneli', 'TrackPulse', 'GA4, Google Tag Manager, Meta Pixel ve Google Ads verisini tek panelde birleştiren web analitik ve dönüşüm izleme platformu + kurulum hizmeti.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img17, @p17, @asset17, 'docs/portfolio/assets/00-cover.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n17, @img17, 'en', 'TrackPulse', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p18 := UUID();
SET @pi18n18 := UUID();
SET @img18 := UUID();
SET @imgI18n18 := UUID();
SET @asset18 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p18, 1, 0, 18,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-1.png', @asset18, NULL, NULL,
  'SAAS PLATFORM', 'Own Project', '2026-05-26', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","AI Integration","Video Processing"]' AS CHAR), NULL, CAST('["Next.js 16","React 19","TypeScript","Fastify","Bun","Drizzle ORM","MySQL","FFmpeg","OpenAI Whisper","Anthropic Claude","BullMQ","Redis","Cloudinary","SEO"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n18, @p18, 'en', 'Videomatik', 'videomatik', 'TR pazarına yönelik AI destekli video editleme SaaS. YouTube + Shorts/Reels için ham videoyu otomatik kesip yayın hazır hale getiren tarayıcı tabanlı editör.',
  CAST('{"html":"<p>Operatör ham videosunu yükler; Whisper transcribe → LLM segment seçimi → FFmpeg cut+concat boru hattı YouTube-ready bir video üretir. İsteğe bağlı manuel timeline editörü ile ince ayar. Çıktı doğrudan YouTube/Instagram/TikTok''a yayınlanabilir. CapCut alternatifi olarak konumlanır; Türkçe arayüz, TL fiyatlama, KDV faturalama.</p>","description":null,"key_features":["AI auto-edit: Whisper transcribe + LLM segment seçimi + FFmpeg cut+concat","Tarayıcı tabanlı timeline editör (Faz 2+, OpenCut''tan ilham)","YouTube + Shorts + Reels + TikTok format presetleri (16:9, 9:16, 1:1)","Otomatik altyazı (Whisper) + AI başlık/açıklama/etiket üretimi","Direkt yayın: YouTube + Instagram + TikTok platformlara push","Türkçe arayüz, TL + KDV faturalama"],"technologies_used":["Next.js 16","React 19","TypeScript","Fastify","Bun","Drizzle ORM","MySQL","FFmpeg","OpenAI Whisper","Anthropic Claude","BullMQ","Redis","Cloudinary","SEO"],"design_highlights":["AI-first workflow: ham video → 60sn YouTube-ready output tek tıkla","Hibrit kontrol: otomatik kesim + opsiyonel manuel ince ayar","TR pazar odaklı: yerli ödeme + KDV + Türkçe LLM prompt''ları"]}' AS CHAR), 'Videomatik AI video editor cover', 'Videomatik', 'TR pazarına yönelik AI destekli video editleme SaaS. YouTube + Shorts/Reels için ham videoyu otomatik kesip yayın hazır hale getiren tarayıcı tabanlı editör.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img18, @p18, @asset18, '/assets/imgs/work/img-1.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n18, @img18, 'en', 'Videomatik', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p19 := UUID();
SET @pi18n19 := UUID();
SET @img19 := UUID();
SET @imgI18n19 := UUID();
SET @asset19 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `price_onetime`, `currency`, `is_purchasable`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p19, 1, 0, 19,
  1000.00, 'USD', 1,
  '/assets/imgs/work/img-1.png', @asset19, 'https://woodyvearkadaslari.com', NULL,
  'WEB APPLICATION', 'Mina Yayınevi', '2026-06-02', NULL, 'Devam ediyor',
  CAST('["Frontend Development","Backend Development","SEO / GEO Optimization","i18n / Localization","Admin Panel"]' AS CHAR), 'https://woodyvearkadaslari.com', CAST('["Next.js 16","React 19","TypeScript","Tailwind CSS v4","next-intl","Fastify","Drizzle ORM","MySQL","Next.js","PM2","Bun","React","Zustand","Tailwind CSS","Radix UI","Zod","JWT","Sass","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n19, @p19, 'en', 'Woody ve Arkadaşları', 'woody', 'Anaokulu İngilizce eğitim setleri, dijital içerik kütüphanesi, öğretmen akademisi ve mağazayı tek çatıda toplayan çok dilli eğitim platformu.',
  CAST('{"html":"<p>woodyvearkadaslari.com''un Next.js 16 + Fastify yeniden inşası. Eski CSR (Emergent/PHP) site SSR/SSG''ye taşınıyor; 10 dil için gerçek hreflang (next-intl), zengin JSON-LD şema (Product offers, Article author, FAQPage, LocalBusiness), llms.txt ve güvenlik başlıkları ile GEO/SEO skoru hedefleniyor. Kapsam: anasayfa, preschool, workshop, home-tutor, woody-academy, library, blog, store ve 12 dijital içerik ürün sayfası.</p>","description":null,"key_features":["Çok dilli (10 dil) gerçek route + tam hreflang","SSR/SSG ile AI/arama motoru erişilebilir içerik","Dijital içerik kütüphanesi (Storyland / Movieland / Musicland)","Mağaza ve ürün sayfaları (Product + offers şeması)","Blog ve öğretmen akademisi","Yerel SEO (İstanbul anaokulu İngilizce eğitimi)","Zengin JSON-LD şema + llms.txt"],"technologies_used":["Next.js 16","React 19","TypeScript","Tailwind CSS v4","next-intl","Fastify","Drizzle ORM","MySQL","Next.js","PM2","Bun","React","Zustand","Tailwind CSS","Radix UI","Zod","JWT","Sass","Cloudinary","Nodemailer"],"design_highlights":["Eski canlı tasarımın SSR sürümüne sadık taşınması","Çocuk dostu, marka renkli arayüz","Erişilebilirlik ve Core Web Vitals odaklı"]}' AS CHAR), 'Woody ve Arkadaşları platform kapak görseli', 'Woody ve Arkadaşları', 'Anaokulu İngilizce eğitim setleri, dijital içerik kütüphanesi, öğretmen akademisi ve mağazayı tek çatıda toplayan çok dilli eğitim platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img19, @p19, @asset19, '/assets/imgs/work/img-1.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n19, @img19, 'en', 'Woody ve Arkadaşları', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

COMMIT;
