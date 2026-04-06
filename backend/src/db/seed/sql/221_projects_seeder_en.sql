-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler project metadata files
-- Generated at 2026-04-06T18:12:50.919Z
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
  '/assets/imgs/work/projects/ensotek.png', @asset2, 'https://www.ensotek.de', NULL,
  'B2B PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Architecture & Optimization","DevOps & Deployment"]' AS CHAR), 'https://www.ensotek.de', CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","JWT","Tailwind CSS","Radix UI","i18n","SEO","Swagger","Docker","Nginx","CI/CD","React","Zustand","Nodemailer","Sass"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n2, @p2, 'en', 'Ensotek', 'ensotek', 'B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.',
  CAST('{"html":"<p>B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.</p>","description":null,"key_features":["Admin panel","Multiple frontend variants","Catalog management","Customer document handling","Multi-language (TR/EN/DE)","Swagger API docs"],"technologies_used":["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","JWT","Tailwind CSS","Radix UI","i18n","SEO","Swagger","Docker","Nginx","CI/CD","React","Zustand","Nodemailer","Sass"],"design_highlights":["Shared packages across frontends","Locale-aware content flows","Production deployed at ensotek.de"]}' AS CHAR), 'Ensotek B2B Platform', 'Ensotek', 'B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
  '/assets/imgs/work/projects/karbonkompozit.png', @asset3, 'https://karbonkompozit.com.tr', NULL,
  'CORPORATE WEBSITE', 'MOE Kompozit / Ensotek', '2025-06-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","SEO Optimization","UI/UX Design"]' AS CHAR), 'https://karbonkompozit.com.tr', CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Embla Carousel","Radix UI","Fastify","Drizzle ORM","MySQL"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n3, @p3, 'en', 'Karbonkompozit', 'karbonkompozit', 'MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.',
  CAST('{"html":"<p>MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. Token-based tema sistemi, full SEO pipeline, urun katalogu, galeri, blog ve multilingual icerik.</p>","description":null,"key_features":["TR/EN multilingual (next-intl)","Product catalog with categories","Gallery system","Blog","Contact and offer form","Technical SEO (canonical, hreflang, JSON-LD, sitemap)","Token-based theme system","SEO monitoring","Newsletter"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Embla Carousel","Radix UI","Fastify","Drizzle ORM","MySQL"],"design_highlights":["Token-first industrial theme (moe-carbon-industrial)","Dark surface contract for hero and CTA sections","Semantic color system with neutral/primary/accent tokens"]}' AS CHAR), 'Karbonkompozit corporate website screenshot', 'Karbonkompozit', 'MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img3, @p3, @asset3, '/assets/imgs/work/projects/karbonkompozit.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n3, @img3, 'en', 'Karbonkompozit', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

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
  '/assets/imgs/work/img-3.png', @asset4, NULL, NULL,
  'ERP', 'Own Project', '2026-01-01', NULL, 'Ongoing',
  CAST('["Backend Development","Admin Panel","Architecture & Optimization"]' AS CHAR), NULL, CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Zod","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n4, @p4, 'en', 'Paspas ERP', 'paspas-erp', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',
  CAST('{"html":"<p>Production planning and operations ERP workspace with Bun backend and Next.js admin panel.</p>","description":null,"key_features":["Production planning","Operations management","Admin dashboard","ERP workflows","Reporting"],"technologies_used":["Bun","TypeScript","Fastify","Drizzle ORM","MySQL","Next.js","React","React Query","Redux Toolkit","JWT","Nginx","CI/CD","Zustand","Tailwind CSS","Radix UI","Zod","Cloudinary","Nodemailer"],"design_highlights":["Operational data flows","Machine planning focus","Admin-first workflow design"]}' AS CHAR), 'Paspas ERP cover image', 'Paspas ERP', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img4, @p4, @asset4, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n4, @img4, 'en', 'Paspas ERP', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

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
  '/assets/imgs/work/projects/vistainsaat.png', @asset5, 'https://www.vistainsaat.com', NULL,
  'CORPORATE WEBSITE', 'Vista Insaat', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","SEO Optimization","UI/UX Design","Admin Panel"]' AS CHAR), 'https://www.vistainsaat.com', CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Radix UI","Node.js","Fastify","MySQL","Drizzle ORM","React","PM2","Nginx","i18n","SEO","JWT","Cloudinary","Nodemailer","Bun"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n5, @p5, 'en', 'Vista İnşaat', 'vista-insaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',
  CAST('{"html":"<p>İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.</p>","description":null,"key_features":["TR/EN multilingual (next-intl)","Project catalog with galleries","Blog","Contact and offer form","Technical SEO (canonical, hreflang, JSON-LD, sitemap)","Admin panel (content management)","Token-based theme system","SSL + Nginx deployment"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Radix UI","Node.js","Fastify","MySQL","Drizzle ORM","React","PM2","Nginx","i18n","SEO","JWT","Cloudinary","Nodemailer","Bun"],"design_highlights":["Portfolio metadata standard is enforced","Tech stack is merged with repository scan results","Content is generated dynamically for portfolio seeds"]}' AS CHAR), 'Vista Insaat corporate website screenshot', 'Vista İnşaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img5, @p5, @asset5, '/assets/imgs/work/projects/vistainsaat.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n5, @img5, 'en', 'Vista İnşaat', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

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
  '/assets/imgs/work/projects/paketjet.png', @asset6, 'https://paketjet.com', NULL,
  'MARKETPLACE PLATFORM', 'Own Project', '2026-03-01', '2026-03-12', '2 weeks',
  CAST('["Full-Stack Development","Marketplace Architecture","Admin Panel"]' AS CHAR), 'https://paketjet.com', CAST('["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Zustand","Tailwind CSS v4","Next.js","React","Fastify","MySQL","Tailwind CSS","Radix UI","JWT","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n6, @p6, 'en', 'PaketJet', 'paketjet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',
  CAST('{"html":"<p>P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.</p>","description":null,"key_features":["P2P cargo listing & booking","Real-time capacity management","Wallet & payment system","Carrier & customer dashboards","Multi-step listing wizard","Admin panel with revenue stats","JWT cookie auth with role guards"],"technologies_used":["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Zustand","Tailwind CSS v4","Next.js","React","Fastify","MySQL","Tailwind CSS","Radix UI","JWT","Cloudinary","Nodemailer"],"design_highlights":["Token-based Tailwind v4 design system","Dark mode with data-theme attribute","Mobile-first responsive panel UI","Capacity bar visualization"]}' AS CHAR), 'PaketJet Logistics Platform', 'PaketJet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img6, @p6, @asset6, '/assets/imgs/work/projects/paketjet.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n6, @img6, 'en', 'PaketJet', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

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
  '/assets/imgs/work/img-2.png', @asset7, NULL, NULL,
  'SAAS TOOL', 'Own Project', '2026-03-24', NULL, 'In active development',
  CAST('["Full-Stack Development","Admin Panel","PDF Generation","AI Content Enhancement"]' AS CHAR), NULL, CAST('["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Redux Toolkit","Tailwind CSS v4","Shadcn UI","Next.js","React","Fastify","MySQL","Zustand","Cloudinary","Docker","Tailwind CSS","Radix UI","JWT","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n7, @p7, 'en', 'KatalogAI', 'katalog-ai', 'Multi-database product catalog creator — pull products from different project databases, design catalogs with templates, export as PDF or send via email.',
  CAST('{"html":"<p>KatalogAI is a SaaS catalog creation platform with a Next.js admin panel and Fastify backend that aggregates products from multiple sources, enriches content with AI, and prepares print-ready catalog outputs.</p>","description":null,"key_features":["Multi-database product sourcing","Catalog template & layout system","Drag & drop catalog builder","PDF export & email delivery","AI-powered descriptions & translations","Color theme & font customization","Admin panel with catalog management"],"technologies_used":["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Redux Toolkit","Tailwind CSS v4","Shadcn UI","Next.js","React","Fastify","MySQL","Zustand","Cloudinary","Docker","Tailwind CSS","Radix UI","JWT","Nodemailer"],"design_highlights":["Token-based Tailwind v4 design system","Dark mode with data-theme attribute","A4 print-ready catalog preview","Mobile-first responsive panel UI"]}' AS CHAR), 'KatalogAI Catalog Creator', 'KatalogAI', 'Multi-database product catalog creator — pull products from different project databases, design catalogs with templates, export as PDF or send via email.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img7, @p7, @asset7, '/assets/imgs/work/img-2.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n7, @img7, 'en', 'KatalogAI', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

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
  '/assets/imgs/work/img-3.png', @asset8, 'https://vistaseed.com.tr', NULL,
  'CORPORATE WEBSITE', 'Vista Seeds', '2026-03-01', NULL, 'In active development',
  CAST('["Frontend Development","Backend Development","Admin Panel","CMS Integration"]' AS CHAR), 'https://vistaseed.com.tr', CAST('["Next.js","React","TypeScript","Fastify","MySQL","Drizzle ORM","Bun","Tailwind CSS","Zustand","Radix UI","Zod","JWT","Cloudinary","Nodemailer"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n8, @p8, 'en', 'VistaSeed', 'vistaseed', 'Corporate seed brand website with product showcase, multilingual-ready content management, and a Fastify-backed admin workflow.',
  CAST('{"html":"<p>VistaSeed combines a public-facing Next.js website, an admin panel, and a Fastify API to manage product content, company pages, FAQ, contact flows, and future hiring modules for an agricultural seed brand.</p>","description":null,"key_features":["Corporate marketing pages","Seed product catalog","Admin-managed content workflow","Contact and FAQ management","Career page foundation","SEO-ready page structure"],"technologies_used":["Next.js","React","TypeScript","Fastify","MySQL","Drizzle ORM","Bun","Tailwind CSS","Zustand","Radix UI","Zod","JWT","Cloudinary","Nodemailer"],"design_highlights":["Agriculture-focused brand presentation","Responsive public site and admin experience","Structured content planning under doc/"]}' AS CHAR), 'VistaSeed corporate website', 'VistaSeed', 'Corporate seed brand website with product showcase, multilingual-ready content management, and a Fastify-backed admin workflow.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img8, @p8, @asset8, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n8, @img8, 'en', 'VistaSeed', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

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
  '/assets/imgs/work/projects/bereketfide.png', @asset9, 'https://www.bereketfide.com', NULL,
  'CORPORATE WEBSITE', 'Bereket Fide', '2026-03-14', NULL, 'In Progress',
  CAST('["Frontend Development","Backend Development","Admin Panel","Technical SEO"]' AS CHAR), 'https://www.bereketfide.com', CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Node.js","Fastify","MySQL","Drizzle ORM","React","Radix UI","PM2","Nginx","i18n","SEO","Framer Motion","JWT","Cloudinary","Nodemailer","Bun"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n9, @p9, 'en', 'Bereket Fide', 'bereketfide', 'Bereket Fide markasi icin planlanan, urun katalogu, kurumsal tanitim, bilgi merkezi ve iletisim akislari iceren modern web platformu.',
  CAST('{"html":"<p>Referans reposu baz alinarak olusturulan bu proje, Bereket Fide icin basak-altin tonlu gorsel dil, urun odakli bilgi mimarisi, yonetim paneli ve teknik SEO altyapisini ayni mimari mantikta kurmak uzere baslatildi.</p>","description":null,"key_features":["Multilingual corporate website structure","Product catalog and category pages","Corporate content and policy pages","Contact and demand collection forms","Admin panel for content management","Technical SEO foundation","Reusable token-based theme system"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Node.js","Fastify","MySQL","Drizzle ORM","React","Radix UI","PM2","Nginx","i18n","SEO","Framer Motion","JWT","Cloudinary","Nodemailer","Bun"],"design_highlights":["Wheat-gold and natural neutral color direction","Structured for product-first corporate presentation","SEO-first content model with scalable admin architecture"]}' AS CHAR), 'Bereket Fide corporate website and product catalog project cover', 'Bereket Fide', 'Bereket Fide markasi icin planlanan, urun katalogu, kurumsal tanitim, bilgi merkezi ve iletisim akislari iceren modern web platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img9, @p9, @asset9, '/assets/imgs/work/projects/bereketfide.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n9, @img9, 'en', 'Bereket Fide', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

COMMIT;
