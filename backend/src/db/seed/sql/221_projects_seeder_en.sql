-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler project metadata files
-- Generated at 2026-03-11T20:44:39.061Z
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
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p1, 1, 1, 1,
  '/assets/imgs/work/img-1.png', @asset1, 'https://sportoonline.com', 'https://github.com/Orhanguezel/quickecommerce',
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
(@img1, @p1, @asset1, '/assets/imgs/work/img-1.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n1, @img1, 'en', 'QuickEcommerce', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p2 := UUID();
SET @pi18n2 := UUID();
SET @img2 := UUID();
SET @imgI18n2 := UUID();
SET @asset2 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p2, 1, 1, 2,
  '/assets/imgs/work/img-2.png', @asset2, 'https://www.ensotek.de', NULL,
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
(@img2, @p2, @asset2, '/assets/imgs/work/img-2.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n2, @img2, 'en', 'Ensotek', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p3 := UUID();
SET @pi18n3 := UUID();
SET @img3 := UUID();
SET @imgI18n3 := UUID();
SET @asset3 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p3, 1, 1, 3,
  '/assets/imgs/work/img-2.png', @asset3, NULL, NULL,
  'BOOKING PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel","Architecture & Optimization"]' AS CHAR), NULL, CAST('["Next.js","React","TypeScript","Tailwind CSS","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","React Query","Zustand","Node.js","Redux Toolkit","Radix UI","PM2","CI/CD","i18n","SEO","GitHub Actions","Framer Motion","Sass"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n3, @p3, 'en', 'Konig Massage', 'konig-massage', 'Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.',
  CAST('{"html":"<p>Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.</p>","description":null,"key_features":["Online booking system","Admin management","Multi-language support","SEO optimization","Cloudinary media management"],"technologies_used":["Next.js","React","TypeScript","Tailwind CSS","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","React Query","Zustand","Node.js","Redux Toolkit","Radix UI","PM2","CI/CD","i18n","SEO","GitHub Actions","Framer Motion","Sass"],"design_highlights":["Service and booking focused UX","Headless architecture","Operational admin tooling"]}' AS CHAR), 'Konig Massage cover image', 'Konig Massage', 'Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img3, @p3, @asset3, '/assets/imgs/work/img-2.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n3, @img3, 'en', 'Konig Massage', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p4 := UUID();
SET @pi18n4 := UUID();
SET @img4 := UUID();
SET @imgI18n4 := UUID();
SET @asset4 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p4, 1, 1, 4,
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
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p5, 1, 1, 5,
  '/assets/imgs/work/img-4.png', @asset5, NULL, NULL,
  'CONTENT PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","AI Integration"]' AS CHAR), NULL, CAST('["Next.js","TypeScript","Redux Toolkit","Styled Components","next-intl","Zod","Express","MongoDB","Mongoose","Cloudinary","JWT","Groq LLM","SEO","i18n","Node.js","React"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n5, @p5, 'en', 'Tarifin Tarifi', 'tarifin-tarifi', 'AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.',
  CAST('{"html":"<p>AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.</p>","description":null,"key_features":["AI recipe generation (Groq LLM)","Multi-language (TR/EN/DE)","reCAPTCHA spam protection","Cloudinary media","User accounts","Comment system","SEO optimized"],"technologies_used":["Next.js","TypeScript","Redux Toolkit","Styled Components","next-intl","Zod","Express","MongoDB","Mongoose","Cloudinary","JWT","Groq LLM","SEO","i18n","Node.js","React"],"design_highlights":["Groq LLM content generation","Styled Components theming","Multi-language SSR"]}' AS CHAR), 'Tarifin Tarifi Recipe Platform', 'Tarifin Tarifi', 'AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img5, @p5, @asset5, '/assets/imgs/work/img-4.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n5, @img5, 'en', 'Tarifin Tarifi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p6 := UUID();
SET @pi18n6 := UUID();
SET @img6 := UUID();
SET @imgI18n6 := UUID();
SET @asset6 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p6, 1, 0, 6,
  '/assets/imgs/work/img-4.png', @asset6, NULL, NULL,
  'SOCIAL PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Backend Development","Frontend Development","Admin Panel","Architecture & Optimization"]' AS CHAR), NULL, CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","JWT","node-cron","Next.js","React","React Query","Tailwind CSS"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n6, @p6, 'en', 'Kaman Social', 'kaman-social', 'Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.',
  CAST('{"html":"<p>Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.</p>","description":null,"key_features":["Social content management","Scheduled jobs (node-cron)","Admin dashboard","Monorepo workspace","REST API"],"technologies_used":["TypeScript","Fastify","Drizzle ORM","MySQL","Bun","Zod","JWT","node-cron","Next.js","React","React Query","Tailwind CSS"],"design_highlights":["Modular monorepo setup","Scheduled automation","Tooling-first architecture"]}' AS CHAR), 'Kaman Social Management System', 'Kaman Social', 'Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img6, @p6, @asset6, '/assets/imgs/work/img-4.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n6, @img6, 'en', 'Kaman Social', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p7 := UUID();
SET @pi18n7 := UUID();
SET @img7 := UUID();
SET @imgI18n7 := UUID();
SET @asset7 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p7, 1, 0, 7,
  '/assets/imgs/work/img-1.png', @asset7, NULL, NULL,
  'REAL ESTATE', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel"]' AS CHAR), NULL, CAST('["Next.js","React","TypeScript","Radix UI","Tailwind CSS","Framer Motion","next-intl","React Query","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","Iyzipay","Google OAuth","i18n","Zustand"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n7, @p7, 'en', 'Kamanilan', 'kamanilan', 'Real estate listing and property management platform with customer web, admin panel, multi-language support and integrated payment.',
  CAST('{"html":"<p>Real estate listing and property management platform with customer web, admin panel, multi-language support and integrated payment.</p>","description":null,"key_features":["Property listings","Admin management","Multi-language support","Iyzipay payment integration","Google OAuth","Email notifications"],"technologies_used":["Next.js","React","TypeScript","Radix UI","Tailwind CSS","Framer Motion","next-intl","React Query","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","Iyzipay","Google OAuth","i18n","Zustand"],"design_highlights":["Property-focused UX","Multi-language routing","Headless architecture"]}' AS CHAR), 'Kamanilan Real Estate Platform', 'Kamanilan', 'Real estate listing and property management platform with customer web, admin panel, multi-language support and integrated payment.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img7, @p7, @asset7, '/assets/imgs/work/img-1.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n7, @img7, 'en', 'Kamanilan', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p8 := UUID();
SET @pi18n8 := UUID();
SET @img8 := UUID();
SET @imgI18n8 := UUID();
SET @asset8 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p8, 1, 0, 8,
  '/assets/imgs/work/img-3.png', @asset8, 'https://mezarisim.com', NULL,
  'SERVICE PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel"]' AS CHAR), 'https://mezarisim.com', CAST('["React","TypeScript","Vite","Redux Toolkit","React Query","Radix UI","Shadcn UI","Tailwind CSS","React Hook Form","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","Google OAuth"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n8, @p8, 'en', 'Mezar Tasi', 'mezar-tasi', 'Memorial construction and grave care platform for the Istanbul market with model catalog, service pages, quote flows and admin management.',
  CAST('{"html":"<p>Memorial construction and grave care platform for the Istanbul market with model catalog, service pages, quote flows and admin management.</p>","description":null,"key_features":["Model and service catalog","Quote and contact flows","Admin dashboard","Cloudinary media","Email notifications","SEO optimized"],"technologies_used":["React","TypeScript","Vite","Redux Toolkit","React Query","Radix UI","Shadcn UI","Tailwind CSS","React Hook Form","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT","Google OAuth"],"design_highlights":["Service-led catalog UX","Shadcn UI components","Production deployed at mezarisim.com"]}' AS CHAR), 'Mezar Tasi Memorial Services Platform', 'Mezar Tasi', 'Memorial construction and grave care platform for the Istanbul market with model catalog, service pages, quote flows and admin management.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img8, @p8, @asset8, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n8, @img8, 'en', 'Mezar Tasi', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p9 := UUID();
SET @pi18n9 := UUID();
SET @img9 := UUID();
SET @imgI18n9 := UUID();
SET @asset9 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p9, 1, 0, 9,
  '/assets/imgs/work/img-4.png', @asset9, NULL, NULL,
  'COMMERCE PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel"]' AS CHAR), NULL, CAST('["React","TypeScript","Vite","Redux Toolkit","React Query","Radix UI","Shadcn UI","Tailwind CSS","React Hook Form","dnd-kit","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Stripe","JWT","Google OAuth","Nodemailer","Next.js"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n9, @p9, 'en', 'Products Park', 'products-park', 'Commerce management platform with admin dashboard, product and catalog workflows, order flows and Fastify backend.',
  CAST('{"html":"<p>Commerce management platform with admin dashboard, product and catalog workflows, order flows and Fastify backend.</p>","description":null,"key_features":["Product and catalog management","Cart and order flows","Stripe payments","Admin dashboard","Media management","Google OAuth"],"technologies_used":["React","TypeScript","Vite","Redux Toolkit","React Query","Radix UI","Shadcn UI","Tailwind CSS","React Hook Form","dnd-kit","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Stripe","JWT","Google OAuth","Nodemailer","Next.js"],"design_highlights":["Drag-and-drop merchandising UX","Shadcn UI components","Stripe integration"]}' AS CHAR), 'Products Park Commerce Platform', 'Products Park', 'Commerce management platform with admin dashboard, product and catalog workflows, order flows and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img9, @p9, @asset9, '/assets/imgs/work/img-4.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n9, @img9, 'en', 'Products Park', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p10 := UUID();
SET @pi18n10 := UUID();
SET @img10 := UUID();
SET @imgI18n10 := UUID();
SET @asset10 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p10, 1, 0, 10,
  '/assets/imgs/work/img-3.png', @asset10, NULL, NULL,
  'SERVICE PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel"]' AS CHAR), NULL, CAST('["Next.js","React","TypeScript","Redux Toolkit","Sass","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n10, @p10, 'en', 'GZL Temizlik', 'gzl-temizlik', 'Cleaning company management platform with customer website, admin panel, booking system and Fastify backend.',
  CAST('{"html":"<p>Cleaning company management platform with customer website, admin panel, booking system and Fastify backend.</p>","description":null,"key_features":["Service booking","Admin management","Customer portal","Email notifications","Media management"],"technologies_used":["Next.js","React","TypeScript","Redux Toolkit","Sass","Fastify","Drizzle ORM","MySQL","Bun","Zod","Cloudinary","Nodemailer","JWT"],"design_highlights":["Turkish-focused service UX","Operational admin tooling"]}' AS CHAR), 'GZL Temizlik Service Platform', 'GZL Temizlik', 'Cleaning company management platform with customer website, admin panel, booking system and Fastify backend.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img10, @p10, @asset10, '/assets/imgs/work/img-3.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n10, @img10, 'en', 'GZL Temizlik', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

SET @p11 := UUID();
SET @pi18n11 := UUID();
SET @img11 := UUID();
SET @imgI18n11 := UUID();
SET @asset11 := UUID();

INSERT INTO `projects` (
  `id`, `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`, `demo_url`, `repo_url`,
  `category`, `client_name`, `start_date`, `complete_date`, `completion_time_label`,
  `services`, `website_url`, `techs`, `created_at`, `updated_at`
) VALUES (
  @p11, 1, 0, 11,
  '/assets/imgs/work/img-2.png', @asset11, NULL, NULL,
  'LOGISTICS PLATFORM', 'Own Project', '2025-01-01', NULL, 'Ongoing',
  CAST('["Frontend Development","Backend Development","Admin Panel"]' AS CHAR), NULL, CAST('["TypeScript","Next.js","React","Fastify","MySQL","Drizzle ORM","Bun","Zod"]' AS CHAR), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`, `title`, `slug`, `summary`, `content`,
  `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`
) VALUES (
  @pi18n11, @p11, 'en', 'PaketJet', 'paketjet', 'Logistics and cargo delivery management platform with shipment tracking, customer portal and operations dashboard.',
  CAST('{"html":"<p>Logistics and cargo delivery management platform with shipment tracking, customer portal and operations dashboard.</p>","description":null,"key_features":["Shipment tracking","Customer portal","Operations dashboard","Logistics workflows"],"technologies_used":["TypeScript","Next.js","React","Fastify","MySQL","Drizzle ORM","Bun","Zod"],"design_highlights":["Operations-focused UX"]}' AS CHAR), 'PaketJet Logistics Platform', 'PaketJet', 'Logistics and cargo delivery management platform with shipment tracking, customer portal and operations dashboard.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `project_images` (`id`, `project_id`, `asset_id`, `image_url`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(@img11, @p11, @asset11, '/assets/imgs/work/img-2.png', 0, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO `project_images_i18n` (`id`, `image_id`, `locale`, `alt`, `caption`, `created_at`, `updated_at`) VALUES
(@imgI18n11, @img11, 'en', 'PaketJet', 'Primary project visual', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

COMMIT;
