-- =============================================================
-- 071_services_seed.sql — SEED (FE Services page content)
-- schema: 070_services.sql ile BIREBIR uyumlu
-- locales: en + tr + de
-- IDs: UUID() ile uretilir
-- cover images: /assets/imgs/services-list/img-1.png ... img-4.png
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- (Opsiyonel) temizlemek istersen:
-- DELETE FROM service_images_i18n;
-- DELETE FROM service_images;
-- DELETE FROM services_i18n;
-- DELETE FROM services;

-- =============================================================
-- SERVICE 1 — Full-Stack Web Development
-- =============================================================

SET @svc1 := UUID();

INSERT INTO `services` (
  `id`, `type`, `featured`, `is_active`, `display_order`,
  `featured_image`, `image_url`, `image_asset_id`,
  `created_at`, `updated_at`
) VALUES (
  @svc1,
  'engineering_support',
  1, 1, 10,
  '/assets/imgs/services-list/img-1.png',
  '/assets/imgs/services-list/img-1.png',
  NULL,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- EN
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc1, 'en',
  'full-stack-web-development',
  'Full-Stack Web Development',
  'Production-ready web applications with Next.js, Fastify or Laravel, covering architecture, frontend, backend and database flows.',
  '{
    "tagline": "Architecture. Delivery. Reliability.",
    "highlights": [
      { "title": "Frontend and Admin Panels", "description": "Building maintainable customer-facing applications and admin dashboards with modern React and Next.js patterns." },
      { "title": "Backend and API Delivery", "description": "Designing secure backend services, data models and REST APIs with Fastify or Laravel for real business workflows." },
      { "title": "Database and Workflow Modeling", "description": "Structuring relational data, validation rules and process flows for commerce, booking, ERP and service platforms." }
    ],
    "html": "<p>I deliver full-stack web systems from architecture to production, with a focus on clarity, maintainability and real operational use.</p>"
  }',
  'Full-Stack Web Development cover image',
  'Full-Stack Web Development — Architecture. Delivery. Reliability.',
  'Full-stack web development with Next.js, Fastify, Laravel, database modeling and admin workflows.',
  'full-stack development, next.js, fastify, laravel, admin panel, mysql',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- TR
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc1, 'tr',
  'full-stack-web-gelistirme',
  'Full-Stack Web Geliştirme',
  'Next.js, Fastify veya Laravel ile mimariden frontend, backend ve veritabanı akışlarına kadar üretime hazır web uygulamaları.',
  '{
    "tagline": "Mimari. Teslimat. Güvenilirlik.",
    "highlights": [
      { "title": "Frontend ve Admin Panel", "description": "Modern React ve Next.js yaklaşımlarıyla müşteri arayüzleri ve yönetim panelleri geliştiririm." },
      { "title": "Backend ve API Teslimi", "description": "Gerçek iş süreçleri için Fastify veya Laravel ile güvenli backend servisleri, veri modelleri ve REST API''ler kurarım." },
      { "title": "Veritabanı ve Süreç Modellemesi", "description": "Ticaret, booking, ERP ve service platformları için ilişkisel veri yapıları ve operasyon akışları tasarlarım." }
    ],
    "html": "<p>Mimariden production ortama kadar full-stack sistemler teslim ederim; odak noktam sürdürülebilirlik, açıklık ve gerçek operasyonel kullanımdır.</p>"
  }',
  'Full-Stack Web Geliştirme kapak görseli',
  'Full-Stack Web Geliştirme — Mimari. Teslimat. Güvenilirlik.',
  'Next.js, Fastify, Laravel, veritabanı modelleme ve admin workflow odaklı full-stack web geliştirme.',
  'full-stack gelistirme, next.js, fastify, laravel, admin panel, mysql',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- DE
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc1, 'de',
  'full-stack-webentwicklung',
  'Full-Stack Webentwicklung',
  'Produktionsreife Webanwendungen mit Next.js, Fastify oder Laravel von Architektur über Frontend bis Backend und Datenmodell.',
  '{
    "tagline": "Architektur. Delivery. Verlässlichkeit.",
    "highlights": [
      { "title": "Frontend und Admin Panels", "description": "Wartbare Kundenanwendungen und Admin Dashboards mit modernen React- und Next.js-Patterns." },
      { "title": "Backend und API Delivery", "description": "Sichere Backend-Services, Datenmodelle und REST APIs mit Fastify oder Laravel für reale Geschäftsprozesse." },
      { "title": "Datenbank- und Prozessmodellierung", "description": "Relationale Datenstrukturen und Workflows für Commerce-, Booking-, ERP- und Service-Plattformen." }
    ],
    "html": "<p>Ich liefere Full-Stack-Websysteme von der Architektur bis zur produktiven Umgebung mit Fokus auf Wartbarkeit und echten operativen Nutzen.</p>"
  }',
  'Full-Stack Webentwicklung Titelbild',
  'Full-Stack Webentwicklung — Architektur. Delivery. Verlässlichkeit.',
  'Full-Stack Webentwicklung mit Next.js, Fastify, Laravel, Datenmodellierung und Admin-Workflows.',
  'full-stack entwicklung, next.js, fastify, laravel, admin panel, mysql',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- Gallery 1 image
SET @img1 := UUID();

INSERT INTO `service_images` (
  `id`, `service_id`,
  `image_asset_id`, `image_url`,
  `is_active`, `display_order`,
  `created_at`, `updated_at`
) VALUES (
  @img1, @svc1,
  NULL, '/assets/imgs/services-list/img-1.png',
  1, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- image i18n: EN/TR/DE
INSERT INTO `service_images_i18n` (`id`, `image_id`, `locale`, `title`, `alt`, `caption`, `created_at`, `updated_at`)
VALUES
  (UUID(), @img1, 'en', 'Full-Stack Web Development', 'Full-Stack Web Development cover image', 'Architecture. Delivery. Reliability.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img1, 'tr', 'Full-Stack Web Geliştirme', 'Full-Stack Web Geliştirme kapak görseli', 'Mimari. Teslimat. Güvenilirlik.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img1, 'de', 'Full-Stack Webentwicklung', 'Full-Stack Webentwicklung Titelbild', 'Architektur. Delivery. Verlässlichkeit.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));



-- =============================================================
-- SERVICE 2 — E-Commerce and Platform Delivery
-- =============================================================

SET @svc2 := UUID();

INSERT INTO `services` (
  `id`, `type`, `featured`, `is_active`, `display_order`,
  `featured_image`, `image_url`, `image_asset_id`,
  `created_at`, `updated_at`
) VALUES (
  @svc2,
  'production',
  1, 1, 20,
  '/assets/imgs/services-list/img-2.png',
  '/assets/imgs/services-list/img-2.png',
  NULL,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- EN
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc2, 'en',
  'ecommerce-platform-delivery',
  'E-Commerce and Platform Delivery',
  'End-to-end implementation for commerce platforms, marketplace workflows, admin operations and customer-facing applications.',
  '{
    "tagline": "Commerce. Workflow. Scale.",
    "highlights": [
      { "title": "Commerce Workflows", "description": "Implementing catalog, cart, checkout, order and backoffice flows for real e-commerce operations." },
      { "title": "Admin and Customer Apps", "description": "Delivering admin panels, storefronts and customer experiences that share a consistent system architecture." },
      { "title": "Multi-Application Delivery", "description": "Connecting web, admin and mobile layers when the platform requires more than one application surface." }
    ],
    "html": "<p>I build commerce and platform products that connect operations, customer journeys and internal management into one coherent system.</p>"
  }',
  'E-Commerce and Platform Delivery cover image',
  'E-Commerce and Platform Delivery — Commerce. Workflow. Scale.',
  'E-commerce and platform delivery for storefronts, admin panels, backoffice workflows and multi-application products.',
  'e-commerce development, platform delivery, admin panel, storefront, marketplace',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- TR
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc2, 'tr',
  'ecommerce-ve-platform-teslimi',
  'E-Commerce ve Platform Teslimi',
  'Ticaret platformları, marketplace akışları, admin operasyonları ve müşteri uygulamaları için uçtan uca geliştirme.',
  '{
    "tagline": "Commerce. Süreç. Ölçek.",
    "highlights": [
      { "title": "Commerce Akışları", "description": "Katalog, sepet, checkout, sipariş ve backoffice akışlarını gerçek e-ticaret operasyonlarına uygun şekilde kurarım." },
      { "title": "Admin ve Müşteri Uygulamaları", "description": "Admin panel, storefront ve müşteri deneyimini ortak sistem mimarisiyle birlikte teslim ederim." },
      { "title": "Çoklu Uygulama Teslimi", "description": "İhtiyaç olduğunda web, admin ve mobil katmanlarını tek platform mantığıyla bağlarım." }
    ],
    "html": "<p>Operasyon, müşteri yolculuğu ve iç yönetim süreçlerini tek bir sistem altında birleştiren commerce ve platform ürünleri geliştiririm.</p>"
  }',
  'E-Commerce ve Platform Teslimi kapak görseli',
  'E-Commerce ve Platform Teslimi — Commerce. Süreç. Ölçek.',
  'Storefront, admin panel, backoffice süreçleri ve çoklu uygulama ürünleri için e-commerce ve platform geliştirme.',
  'e-commerce gelistirme, platform teslimi, admin panel, storefront, marketplace',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- DE
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc2, 'de',
  'ecommerce-und-plattform-delivery',
  'E-Commerce und Plattform Delivery',
  'End-to-End Umsetzung für Commerce-Plattformen, Marketplace-Workflows, Admin-Operationen und kundennahe Anwendungen.',
  '{
    "tagline": "Commerce. Workflow. Skalierung.",
    "highlights": [
      { "title": "Commerce Workflows", "description": "Katalog-, Warenkorb-, Checkout-, Bestell- und Backoffice-Flows für reale E-Commerce-Prozesse." },
      { "title": "Admin- und Customer-Apps", "description": "Admin Panels, Storefronts und Customer Experiences mit konsistenter Systemarchitektur." },
      { "title": "Multi-Application Delivery", "description": "Verbindung von Web-, Admin- und Mobile-Layern, wenn die Plattform mehrere Anwendungen benötigt." }
    ],
    "html": "<p>Ich entwickle Commerce- und Plattform-Produkte, die Operations, Customer Journeys und internes Management in einem System verbinden.</p>"
  }',
  'E-Commerce und Plattform Delivery Titelbild',
  'E-Commerce und Plattform Delivery — Commerce. Workflow. Skalierung.',
  'E-Commerce- und Plattform-Delivery für Storefronts, Admin Panels, Backoffice-Workflows und Multi-Application-Produkte.',
  'e-commerce entwicklung, plattform delivery, admin panel, storefront, marketplace',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- Gallery 1 image
SET @img2 := UUID();

INSERT INTO `service_images` (
  `id`, `service_id`,
  `image_asset_id`, `image_url`,
  `is_active`, `display_order`,
  `created_at`, `updated_at`
) VALUES (
  @img2, @svc2,
  NULL, '/assets/imgs/services-list/img-2.png',
  1, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `service_images_i18n` (`id`, `image_id`, `locale`, `title`, `alt`, `caption`, `created_at`, `updated_at`)
VALUES
  (UUID(), @img2, 'en', 'E-Commerce and Platform Delivery', 'E-Commerce and Platform Delivery cover image', 'Commerce. Workflow. Scale.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img2, 'tr', 'E-Commerce ve Platform Teslimi', 'E-Commerce ve Platform Teslimi kapak görseli', 'Commerce. Süreç. Ölçek.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img2, 'de', 'E-Commerce und Plattform Delivery', 'E-Commerce und Plattform Delivery Titelbild', 'Commerce. Workflow. Skalierung.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));



-- =============================================================
-- SERVICE 3 — API and Backend Engineering
-- =============================================================

SET @svc3 := UUID();

INSERT INTO `services` (
  `id`, `type`, `featured`, `is_active`, `display_order`,
  `featured_image`, `image_url`, `image_asset_id`,
  `created_at`, `updated_at`
) VALUES (
  @svc3,
  'applications_references',
  0, 1, 30,
  '/assets/imgs/services-list/img-3.png',
  '/assets/imgs/services-list/img-3.png',
  NULL,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- EN
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc3, 'en',
  'api-backend-engineering',
  'API and Backend Engineering',
  'Backend services, authentication, data modeling and integration layers for scalable products and internal systems.',
  '{
    "tagline": "Data. Security. Integration.",
    "highlights": [
      { "title": "REST API Design", "description": "Structuring endpoints, validation and data contracts for maintainable product and business workflows." },
      { "title": "Authentication and Permissions", "description": "Implementing JWT-based auth, role checks and secure access flows for admin and customer systems." },
      { "title": "Integrations and Documentation", "description": "Connecting third-party services, payment providers and generating clear API documentation for teams." }
    ],
    "html": "<p>I build backend foundations that keep products stable, secure and easier to extend as the business grows.</p>"
  }',
  'API and Backend Engineering cover image',
  'API and Backend Engineering — Data. Security. Integration.',
  'Backend engineering with authentication, REST APIs, integrations, validation and database-first implementation.',
  'api development, backend engineering, jwt, mysql, fastify, laravel',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- TR
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc3, 'tr',
  'api-backend-muhendisligi',
  'API ve Backend Mühendisliği',
  'Ölçeklenebilir ürünler ve iç sistemler için backend servisleri, kimlik doğrulama, veri modelleme ve entegrasyon katmanları.',
  '{
    "tagline": "Veri. Güvenlik. Entegrasyon.",
    "highlights": [
      { "title": "REST API Tasarımı", "description": "Bakımı kolay ürün ve iş akışları için endpoint yapısı, validasyon ve veri kontratları kurarım." },
      { "title": "Kimlik Doğrulama ve Yetkilendirme", "description": "Admin ve müşteri sistemleri için JWT tabanlı auth, rol kontrolleri ve güvenli erişim akışları uygularım." },
      { "title": "Entegrasyon ve Dokümantasyon", "description": "Üçüncü parti servisleri, ödeme sağlayıcılarını bağlar ve ekipler için net API dokümantasyonu üretirim." }
    ],
    "html": "<p>Ürünün büyüdükçe stabil, güvenli ve geliştirilebilir kalmasını sağlayan backend temellerini kurarım.</p>"
  }',
  'API ve Backend Mühendisliği kapak görseli',
  'API ve Backend Mühendisliği — Veri. Güvenlik. Entegrasyon.',
  'Kimlik doğrulama, REST API, entegrasyon, validasyon ve veritabanı odaklı backend mühendisliği.',
  'api gelistirme, backend muhendisligi, jwt, mysql, fastify, laravel',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- DE
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc3, 'de',
  'api-backend-engineering',
  'API und Backend Engineering',
  'Backend-Services, Authentifizierung, Datenmodellierung und Integrationsschichten für skalierbare Produkte und interne Systeme.',
  '{
    "tagline": "Daten. Sicherheit. Integration.",
    "highlights": [
      { "title": "REST API Design", "description": "Endpoints, Validierung und Datenverträge für wartbare Produkt- und Business-Workflows." },
      { "title": "Authentifizierung und Berechtigungen", "description": "JWT-basierte Authentifizierung, Rollenprüfungen und sichere Zugriffspfade für Admin- und Customer-Systeme." },
      { "title": "Integrationen und Dokumentation", "description": "Anbindung externer Services, Payment Provider und klare API-Dokumentation für Teams." }
    ],
    "html": "<p>Ich baue Backend-Fundamente, die Produkte stabil, sicher und mit dem Unternehmen mitwachsend halten.</p>"
  }',
  'API und Backend Engineering Titelbild',
  'API und Backend Engineering — Daten. Sicherheit. Integration.',
  'Backend Engineering mit Authentifizierung, REST APIs, Integrationen, Validierung und datenbankorientierter Umsetzung.',
  'api entwicklung, backend engineering, jwt, mysql, fastify, laravel',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- Gallery 1 image
SET @img3 := UUID();

INSERT INTO `service_images` (
  `id`, `service_id`,
  `image_asset_id`, `image_url`,
  `is_active`, `display_order`,
  `created_at`, `updated_at`
) VALUES (
  @img3, @svc3,
  NULL, '/assets/imgs/services-list/img-3.png',
  1, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `service_images_i18n` (`id`, `image_id`, `locale`, `title`, `alt`, `caption`, `created_at`, `updated_at`)
VALUES
  (UUID(), @img3, 'en', 'API and Backend Engineering', 'API and Backend Engineering cover image', 'Data. Security. Integration.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img3, 'tr', 'API ve Backend Mühendisliği', 'API ve Backend Mühendisliği kapak görseli', 'Veri. Güvenlik. Entegrasyon.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img3, 'de', 'API und Backend Engineering', 'API und Backend Engineering Titelbild', 'Daten. Sicherheit. Integration.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));



-- =============================================================
-- SERVICE 4 — Maintenance and Deployment
-- =============================================================

SET @svc4 := UUID();

INSERT INTO `services` (
  `id`, `type`, `featured`, `is_active`, `display_order`,
  `featured_image`, `image_url`, `image_asset_id`,
  `created_at`, `updated_at`
) VALUES (
  @svc4,
  'modernization',
  0, 1, 40,
  '/assets/imgs/services-list/img-4.png',
  '/assets/imgs/services-list/img-4.png',
  NULL,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- EN
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc4, 'en',
  'maintenance-and-deployment',
  'Maintenance and Deployment',
  'Production maintenance, server delivery, environment setup and iterative improvements for active applications.',
  '{
    "tagline": "Stability. Updates. Continuity.",
    "highlights": [
      { "title": "Deployment and Release Flow", "description": "Preparing production environments, process management and rollout steps for stable releases." },
      { "title": "Bug Fixing and Iteration", "description": "Handling post-launch issues, feature refinements and operational improvements without disrupting core workflows." },
      { "title": "Infrastructure Awareness", "description": "Working with PM2, Nginx, Docker and CI/CD-oriented delivery patterns where the product needs operational continuity." }
    ],
    "html": "<p>I support live systems after launch with careful updates, environment management and pragmatic technical maintenance.</p>"
  }',
  'Maintenance and Deployment cover image',
  'Maintenance and Deployment — Stability. Updates. Continuity.',
  'Production maintenance, deployment flow, PM2, Nginx, Docker and ongoing improvement for active systems.',
  'maintenance, deployment, pm2, nginx, docker, production support',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- TR
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc4, 'tr',
  'bakim-ve-deploy',
  'Bakım ve Deploy',
  'Canlı uygulamalar için production bakımı, sunucu teslimi, ortam kurulumu ve iteratif iyileştirme süreçleri.',
  '{
    "tagline": "Stabilite. Güncelleme. Süreklilik.",
    "highlights": [
      { "title": "Deploy ve Release Akışı", "description": "Stabil sürümler için production ortamı, process yönetimi ve release adımlarını hazırlarım." },
      { "title": "Hata Düzeltme ve İterasyon", "description": "Yayın sonrası hataları, iyileştirmeleri ve operasyonel geliştirmeleri temel akışı bozmadan yönetirim." },
      { "title": "Altyapı Farkındalığı", "description": "Ürün ihtiyaç duyduğunda PM2, Nginx, Docker ve CI/CD odaklı teslim kalıplarıyla çalışırım." }
    ],
    "html": "<p>Canlı sistemleri yayın sonrası dikkatli güncellemeler, ortam yönetimi ve pragmatik teknik bakım ile desteklerim.</p>"
  }',
  'Bakım ve Deploy kapak görseli',
  'Bakım ve Deploy — Stabilite. Güncelleme. Süreklilik.',
  'Production bakım, deploy akışı, PM2, Nginx, Docker ve aktif sistemler için sürekli iyileştirme.',
  'bakim, deploy, pm2, nginx, docker, production support',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- DE
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc4, 'de',
  'maintenance-und-deployment',
  'Maintenance und Deployment',
  'Produktionswartung, Server-Delivery, Environment-Setup und iterative Verbesserungen für aktive Anwendungen.',
  '{
    "tagline": "Stabilität. Updates. Kontinuität.",
    "highlights": [
      { "title": "Deployment und Release Flow", "description": "Produktionsumgebungen, Prozessmanagement und Rollout-Schritte für stabile Releases." },
      { "title": "Bugfixing und Iteration", "description": "Post-Launch-Probleme, Feature-Anpassungen und operative Verbesserungen ohne Störung der Kernprozesse." },
      { "title": "Infrastructure Awareness", "description": "Arbeit mit PM2, Nginx, Docker und CI/CD-orientierten Delivery-Mustern für operative Kontinuität." }
    ],
    "html": "<p>Ich begleite Live-Systeme nach dem Launch mit sorgfältigen Updates, Environment-Management und pragmatischer technischer Wartung.</p>"
  }',
  'Maintenance und Deployment Titelbild',
  'Maintenance und Deployment — Stabilität. Updates. Kontinuität.',
  'Produktionswartung, Deployment-Flows, PM2, Nginx, Docker und kontinuierliche Verbesserung aktiver Systeme.',
  'wartung, deployment, pm2, nginx, docker, production support',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- Gallery 1 image
SET @img4 := UUID();

INSERT INTO `service_images` (
  `id`, `service_id`,
  `image_asset_id`, `image_url`,
  `is_active`, `display_order`,
  `created_at`, `updated_at`
) VALUES (
  @img4, @svc4,
  NULL, '/assets/imgs/services-list/img-4.png',
  1, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

INSERT INTO `service_images_i18n` (`id`, `image_id`, `locale`, `title`, `alt`, `caption`, `created_at`, `updated_at`)
VALUES
  (UUID(), @img4, 'en', 'Maintenance and Deployment', 'Maintenance and Deployment cover image', 'Stability. Updates. Continuity.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img4, 'tr', 'Bakım ve Deploy', 'Bakım ve Deploy kapak görseli', 'Stabilite. Güncelleme. Süreklilik.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img4, 'de', 'Maintenance und Deployment', 'Maintenance und Deployment Titelbild', 'Stabilität. Updates. Kontinuität.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));


COMMIT;
