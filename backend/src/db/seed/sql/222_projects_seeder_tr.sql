-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler project metadata files
-- Generated at 2026-03-11T20:44:39.073Z
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
  UUID(), @p2, 'tr', 'Ensotek', 'ensotek', 'B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.',
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
(UUID(), @img2, 'tr', 'Ensotek', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p3 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='konig-massage' LIMIT 1);
SET @img3 := (SELECT id FROM project_images WHERE project_id=@p3 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p3, 'tr', 'Konig Massage', 'konig-massage', 'Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.',
  CAST('{"html":"<p>Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.</p>","description":null,"key_features":["Online booking system","Admin management","Multi-language support","SEO optimization","Cloudinary media management"],"technologies_used":["Next.js","React","TypeScript","Tailwind CSS","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","React Query","Zustand","Node.js","Redux Toolkit","Radix UI","PM2","CI/CD","i18n","SEO","GitHub Actions","Framer Motion","Sass"],"design_highlights":["Service and booking focused UX","Headless architecture","Operational admin tooling"]}' AS CHAR), 'Konig Massage cover image', 'Konig Massage', 'Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img3, 'tr', 'Konig Massage', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
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
  UUID(), @p4, 'tr', 'Paspas ERP', 'paspas-erp', 'Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',
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
(UUID(), @img4, 'tr', 'Paspas ERP', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p5 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='tarifin-tarifi' LIMIT 1);
SET @img5 := (SELECT id FROM project_images WHERE project_id=@p5 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p5, 'tr', 'Tarifin Tarifi', 'tarifin-tarifi', 'AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.',
  CAST('{"html":"<p>AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.</p>","description":null,"key_features":["AI recipe generation (Groq LLM)","Multi-language (TR/EN/DE)","reCAPTCHA spam protection","Cloudinary media","User accounts","Comment system","SEO optimized"],"technologies_used":["Next.js","TypeScript","Redux Toolkit","Styled Components","next-intl","Zod","Express","MongoDB","Mongoose","Cloudinary","JWT","Groq LLM","SEO","i18n","Node.js","React"],"design_highlights":["Groq LLM content generation","Styled Components theming","Multi-language SSR"]}' AS CHAR), 'Tarifin Tarifi cover image', 'Tarifin Tarifi', 'AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img5, 'tr', 'Tarifin Tarifi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p6 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='kaman-social' LIMIT 1);
SET @img6 := (SELECT id FROM project_images WHERE project_id=@p6 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p6, 'tr', 'Kaman Social', 'kaman-social', 'Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.',
  CAST('{"html":"<p>Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.</p>","description":null,"key_features":["Social content management","Scheduled jobs (node-cron)","Admin dashboard","Monorepo workspace","REST API"],"technologies_used":["TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","JWT","node-cron","Next.js","React","React Query","Tailwind CSS"],"design_highlights":["Modular monorepo setup","Scheduled automation","Tooling-first architecture"]}' AS CHAR), 'Kaman Social cover image', 'Kaman Social', 'Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img6, 'tr', 'Kaman Social', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p7 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='kamanilan' LIMIT 1);
SET @img7 := (SELECT id FROM project_images WHERE project_id=@p7 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p7, 'tr', 'Kamanilan', 'kamanilan', 'Real estate listing and property management platform with customer web, admin panel, multi-language support and integrated payment.',
  CAST('{"html":"<p>Real estate listing and property management platform with customer web, admin panel, multi-language support and integrated payment.</p>","description":null,"key_features":["Property listings","Admin management","Multi-language support","Iyzipay payment integration","Google OAuth","Email notifications"],"technologies_used":["Next.js","React","TypeScript","Radix UI","Tailwind CSS","Framer Motion","next-intl","React Query","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","Iyzipay","Google OAuth","i18n","Zustand"],"design_highlights":["Property-focused UX","Multi-language routing","Headless architecture"]}' AS CHAR), 'Kamanilan cover image', 'Kamanilan', 'Real estate listing and property management platform with customer web, admin panel, multi-language support and integrated payment.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img7, 'tr', 'Kamanilan', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p8 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='mezar-tasi' LIMIT 1);
SET @img8 := (SELECT id FROM project_images WHERE project_id=@p8 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p8, 'tr', 'Mezar Tasi', 'mezar-tasi', 'Memorial construction and grave care platform for the Istanbul market with model catalog, service pages, quote flows and admin management.',
  CAST('{"html":"<p>Memorial construction and grave care platform for the Istanbul market with model catalog, service pages, quote flows and admin management.</p>","description":null,"key_features":["Model and service catalog","Quote and contact flows","Admin dashboard","Cloudinary media","Email notifications","SEO optimized"],"technologies_used":["React","TypeScript","Vite","Redux Toolkit","React Query","Radix UI","Shadcn UI","Tailwind CSS","React Hook Form","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","Google OAuth"],"design_highlights":["Service-led catalog UX","Shadcn UI components","Production deployed at mezarisim.com"]}' AS CHAR), 'Mezar Tasi cover image', 'Mezar Tasi', 'Memorial construction and grave care platform for the Istanbul market with model catalog, service pages, quote flows and admin management.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img8, 'tr', 'Mezar Tasi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p9 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='products-park' LIMIT 1);
SET @img9 := (SELECT id FROM project_images WHERE project_id=@p9 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p9, 'tr', 'Products Park', 'products-park', 'Commerce management platform with admin dashboard, product and catalog workflows, order flows and Fastify backend.',
  CAST('{"html":"<p>Commerce management platform with admin dashboard, product and catalog workflows, order flows and Fastify backend.</p>","description":null,"key_features":["Product and catalog management","Cart and order flows","Stripe payments","Admin dashboard","Media management","Google OAuth"],"technologies_used":["React","TypeScript","Vite","Redux Toolkit","React Query","Radix UI","Shadcn UI","Tailwind CSS","React Hook Form","dnd-kit","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Stripe","JWT","Google OAuth","Nodemailer","Next.js"],"design_highlights":["Drag-and-drop merchandising UX","Shadcn UI components","Stripe integration"]}' AS CHAR), 'Products Park cover image', 'Products Park', 'Commerce management platform with admin dashboard, product and catalog workflows, order flows and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img9, 'tr', 'Products Park', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p10 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='gzl-temizlik' LIMIT 1);
SET @img10 := (SELECT id FROM project_images WHERE project_id=@p10 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p10, 'tr', 'GZL Temizlik', 'gzl-temizlik', 'Cleaning company management platform with customer website, admin panel, booking system and Fastify backend.',
  CAST('{"html":"<p>Cleaning company management platform with customer website, admin panel, booking system and Fastify backend.</p>","description":null,"key_features":["Service booking","Admin management","Customer portal","Email notifications","Media management"],"technologies_used":["Next.js","React","TypeScript","Redux Toolkit","Sass","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT"],"design_highlights":["Turkish-focused service UX","Operational admin tooling"]}' AS CHAR), 'GZL Temizlik cover image', 'GZL Temizlik', 'Cleaning company management platform with customer website, admin panel, booking system and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img10, 'tr', 'GZL Temizlik', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

SET @p11 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='paketjet' LIMIT 1);
SET @img11 := (SELECT id FROM project_images WHERE project_id=@p11 ORDER BY display_order ASC, created_at ASC LIMIT 1);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  UUID(), @p11, 'tr', 'PaketJet', 'paketjet', 'Logistics and cargo delivery management platform with shipment tracking, customer portal and operations dashboard.',
  CAST('{"html":"<p>Logistics and cargo delivery management platform with shipment tracking, customer portal and operations dashboard.</p>","description":null,"key_features":["Shipment tracking","Customer portal","Operations dashboard","Logistics workflows"],"technologies_used":["TypeScript","Next.js","React","Fastify","MySQL","Drizzle ORM","Bun","Zod"],"design_highlights":["Operations-focused UX"]}' AS CHAR), 'PaketJet cover image', 'PaketJet', 'Logistics and cargo delivery management platform with shipment tracking, customer portal and operations dashboard.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
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
(UUID(), @img11, 'tr', 'PaketJet', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

COMMIT;
