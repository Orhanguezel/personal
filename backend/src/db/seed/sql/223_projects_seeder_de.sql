-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler project metadata files
-- Generated at 2026-04-06T18:12:50.926Z
SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

SET @p1 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='quickecommerce' LIMIT 1);
SET @img1 := (SELECT id FROM project_images WHERE project_id=@p1 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p1, 'de', 'QuickEcommerce', 'quickecommerce', 'Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',
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
(UUID(), @img1, 'de', 'QuickEcommerce', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
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
  UUID(), @p2, 'de', 'Ensotek', 'ensotek', 'B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.',
  CAST('{"html":"<p>B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.</p>","description":null,"key_features":["Admin panel","Multiple frontend variants","Catalog management","Customer document handling","Multi-language (TR/EN/DE)","Swagger API docs"],"technologies_used":["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","JWT","Tailwind CSS","Radix UI","i18n","SEO","Swagger","Docker","Nginx","CI/CD","React","Zustand","Nodemailer","Sass"],"design_highlights":["Shared packages across frontends","Locale-aware content flows","Production deployed at ensotek.de"]}' AS CHAR), 'Ensotek cover image', 'Ensotek', 'B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img2, 'de', 'Ensotek', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p3 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='karbonkompozit' LIMIT 1);
SET @img3 := (SELECT id FROM project_images WHERE project_id=@p3 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p3, 'de', 'Karbonkompozit', 'karbonkompozit', 'MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.',
  CAST('{"html":"<p>MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.</p>","description":null,"key_features":["TR/EN multilingual (next-intl)","Product catalog with categories","Gallery system","Blog","Contact and offer form","Technical SEO (canonical, hreflang, JSON-LD, sitemap)","Token-based theme system","SEO monitoring","Newsletter"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Embla Carousel","Radix UI","Fastify","Drizzle ORM","MySQL"],"design_highlights":["Token-first industrial theme (moe-carbon-industrial)","Dark surface contract for hero and CTA sections","Semantic color system with neutral/primary/accent tokens"]}' AS CHAR), 'Karbonkompozit cover image', 'Karbonkompozit', 'MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img3, 'de', 'Karbonkompozit', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p4 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='paspas-erp' LIMIT 1);
SET @img4 := (SELECT id FROM project_images WHERE project_id=@p4 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p4, 'de', 'Paspas ERP', 'paspas-erp', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',
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
(UUID(), @img4, 'de', 'Paspas ERP', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p5 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='vista-insaat' LIMIT 1);
SET @img5 := (SELECT id FROM project_images WHERE project_id=@p5 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p5, 'de', 'Vista İnşaat', 'vista-insaat', 'İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',
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
(UUID(), @img5, 'de', 'Vista İnşaat', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p6 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='paketjet' LIMIT 1);
SET @img6 := (SELECT id FROM project_images WHERE project_id=@p6 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p6, 'de', 'PaketJet', 'paketjet', 'P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',
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
(UUID(), @img6, 'de', 'PaketJet', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p7 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='katalog-ai' LIMIT 1);
SET @img7 := (SELECT id FROM project_images WHERE project_id=@p7 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p7, 'de', 'KatalogAI', 'katalog-ai', 'Multi-database product catalog creator — pull products from different project databases, design catalogs with templates, export as PDF or send via email.',
  CAST('{"html":"<p>Multi-database product catalog creator — pull products from different project databases, design catalogs with templates, export as PDF or send via email.</p>","description":null,"key_features":["Multi-database product sourcing","Catalog template & layout system","Drag & drop catalog builder","PDF export & email delivery","AI-powered descriptions & translations","Color theme & font customization","Admin panel with catalog management"],"technologies_used":["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8","Drizzle ORM","Bun","Zod","Redux Toolkit","Tailwind CSS v4","Shadcn UI","Next.js","React","Fastify","MySQL","Zustand","Cloudinary","Docker","Tailwind CSS","Radix UI","JWT","Nodemailer"],"design_highlights":["Token-based Tailwind v4 design system","Dark mode with data-theme attribute","A4 print-ready catalog preview","Mobile-first responsive panel UI"]}' AS CHAR), 'KatalogAI cover image', 'KatalogAI', 'Multi-database product catalog creator — pull products from different project databases, design catalogs with templates, export as PDF or send via email.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img7, 'de', 'KatalogAI', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p8 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='vistaseed' LIMIT 1);
SET @img8 := (SELECT id FROM project_images WHERE project_id=@p8 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p8, 'de', 'VistaSeed', 'vistaseed', 'Corporate seed brand website with product showcase, multilingual-ready content management, and a Fastify-backed admin workflow.',
  CAST('{"html":"<p>Corporate seed brand website with product showcase, multilingual-ready content management, and a Fastify-backed admin workflow.</p>","description":null,"key_features":["Corporate marketing pages","Seed product catalog","Admin-managed content workflow","Contact and FAQ management","Career page foundation","SEO-ready page structure"],"technologies_used":["Next.js","React","TypeScript","Fastify","MySQL","Drizzle ORM","Bun","Tailwind CSS","Zustand","Radix UI","Zod","JWT","Cloudinary","Nodemailer"],"design_highlights":["Agriculture-focused brand presentation","Responsive public site and admin experience","Structured content planning under doc/"]}' AS CHAR), 'VistaSeed cover image', 'VistaSeed', 'Corporate seed brand website with product showcase, multilingual-ready content management, and a Fastify-backed admin workflow.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img8, 'de', 'VistaSeed', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p9 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='bereketfide' LIMIT 1);
SET @img9 := (SELECT id FROM project_images WHERE project_id=@p9 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p9, 'de', 'Bereket Fide', 'bereketfide', 'Bereket Fide markasi icin planlanan, urun katalogu, kurumsal tanitim, bilgi merkezi ve iletisim akislari iceren modern web platformu.',
  CAST('{"html":"<p>Bereket Fide markasi icin planlanan, urun katalogu, kurumsal tanitim, bilgi merkezi ve iletisim akislari iceren modern web platformu.</p>","description":null,"key_features":["Multilingual corporate website structure","Product catalog and category pages","Corporate content and policy pages","Contact and demand collection forms","Admin panel for content management","Technical SEO foundation","Reusable token-based theme system"],"technologies_used":["Next.js","TypeScript","Tailwind CSS","next-intl","React Query","Zod","React Hook Form","Zustand","Node.js","Fastify","MySQL","Drizzle ORM","React","Radix UI","PM2","Nginx","i18n","SEO","Framer Motion","JWT","Cloudinary","Nodemailer","Bun"],"design_highlights":["Wheat-gold and natural neutral color direction","Structured for product-first corporate presentation","SEO-first content model with scalable admin architecture"]}' AS CHAR), 'Bereket Fide cover image', 'Bereket Fide', 'Bereket Fide markasi icin planlanan, urun katalogu, kurumsal tanitim, bilgi merkezi ve iletisim akislari iceren modern web platformu.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img9, 'de', 'Bereket Fide', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

COMMIT;
