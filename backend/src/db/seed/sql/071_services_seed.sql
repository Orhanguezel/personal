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
-- SERVICE 1 — UI/UX Design
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
  'ui-ux-design',
  'UI/UX Design',
  'Transforming ideas into intuitive, engaging user experiences through research, prototyping, and iterative testing.',
  '{
    "tagline": "Creative. Unique. Reality.",
    "highlights": [
      { "title": "User Research", "description": "Conducting thorough user research through surveys, interviews, and usability studies to understand target audiences and their needs, ensuring designs are user-centric and effective." },
      { "title": "Wireframing and Prototyping", "description": "Designing detailed wireframes and interactive prototypes to visualize and test user flows and interactions, allowing for early feedback and iterative improvements." },
      { "title": "User Testing", "description": "Implementing comprehensive user testing sessions to gather feedback, identify pain points, and make data-driven design improvements, ensuring a seamless user experience." }
    ],
    "html": "<p>With expertise in mobile app and web design, I transform ideas into visually stunning and user-friendly interfaces that captivate and retain users.</p>"
  }',
  'UI/UX Design cover image',
  'UI/UX Design — Creative. Unique. Reality.',
  'User-centric UI/UX design services: research, wireframing, prototyping, and testing for engaging experiences.',
  'uiux, ux, ui, user research, prototyping, usability testing',
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
  'ui-ux-tasarim',
  'UI/UX Tasarım',
  'Araştırma, prototipleme ve iteratif testlerle fikirleri sezgisel ve etkileyici kullanıcı deneyimlerine dönüştürür.',
  '{
    "tagline": "Yaratıcı. Özgün. Gerçek.",
    "highlights": [
      { "title": "Kullanıcı Araştırması", "description": "Anketler, görüşmeler ve kullanılabilirlik çalışmalarıyla hedef kitleyi ve ihtiyaçlarını anlayarak kullanıcı odaklı ve etkili tasarımlar üretir." },
      { "title": "Wireframe ve Prototipleme", "description": "Kullanıcı akışlarını ve etkileşimleri görselleştirmek ve test etmek için detaylı wireframe ve etkileşimli prototipler hazırlar; erken geri bildirimle iyileştirme sağlar." },
      { "title": "Kullanıcı Testleri", "description": "Geri bildirim toplamak, sorun noktalarını tespit etmek ve veriye dayalı iyileştirmeler yapmak için kapsamlı kullanıcı testleri uygular; akıcı bir deneyim sunar." }
    ],
    "html": "<p>Mobil ve web tasarım deneyimiyle, fikirleri görsel olarak güçlü ve kullanıcı dostu arayüzlere dönüştürürüm.</p>"
  }',
  'UI/UX Tasarım kapak görseli',
  'UI/UX Tasarım — Yaratıcı. Özgün. Gerçek.',
  'UI/UX tasarım hizmetleri: kullanıcı araştırması, wireframe, prototip ve testlerle güçlü deneyimler.',
  'uiux, ux, ui, kullanici arastirmasi, prototip, kullanilabilirlik testi',
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
  'ui-ux-design',
  'UI/UX Design',
  'Ideen werden durch Recherche, Prototyping und iteratives Testing in intuitive und überzeugende Nutzererlebnisse verwandelt.',
  '{
    "tagline": "Kreativ. Einzigartig. Real.",
    "highlights": [
      { "title": "User Research", "description": "Gründliche Nutzerforschung durch Umfragen, Interviews und Usability-Studien, um Zielgruppen zu verstehen und nutzerzentrierte Designs zu liefern." },
      { "title": "Wireframes und Prototypen", "description": "Detaillierte Wireframes und interaktive Prototypen zur Visualisierung und zum Testen von Flows und Interaktionen, um früh Feedback zu integrieren." },
      { "title": "User Testing", "description": "Umfassende Tests zur Identifikation von Pain Points und zur datenbasierten Optimierung für ein reibungsloses Nutzererlebnis." }
    ],
    "html": "<p>Ich verwandle Ideen in visuell starke und benutzerfreundliche Interfaces, die Nutzer begeistern und binden.</p>"
  }',
  'UI/UX Design Titelbild',
  'UI/UX Design — Kreativ. Einzigartig. Real.',
  'UI/UX Design: Research, Wireframes, Prototypen und Testing für überzeugende Nutzererlebnisse.',
  'uiux, ux, ui, user research, prototyping, usability testing',
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
  (UUID(), @img1, 'en', 'UI/UX Design', 'UI/UX Design cover image', 'Creative. Unique. Reality.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img1, 'tr', 'UI/UX Tasarım', 'UI/UX Tasarım kapak görseli', 'Yaratıcı. Özgün. Gerçek.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img1, 'de', 'UI/UX Design', 'UI/UX Design Titelbild', 'Kreativ. Einzigartig. Real.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));



-- =============================================================
-- SERVICE 2 — Mobile App Design
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
  'mobile-app-design',
  'Mobile App Design',
  'Cross-platform mobile app design with interactive prototypes and consistent branding across iOS and Android.',
  '{
    "tagline": "Creative. Unique. Reality.",
    "highlights": [
      { "title": "Cross-Platform Design", "description": "Creating designs that work smoothly on both iOS and Android platforms, ensuring a consistent and high-quality user experience regardless of the device." },
      { "title": "Interactive Prototypes", "description": "Developing interactive prototypes to demonstrate app functionality and help stakeholders experience the app before development begins." },
      { "title": "Consistent Branding", "description": "Ensuring the app design remains consistent with your brand identity across all touchpoints to build recognition and trust." }
    ],
    "html": "<p>I design mobile experiences that feel native, perform well, and remain visually consistent across platforms.</p>"
  }',
  'Mobile App Design cover image',
  'Mobile App Design — Cross-platform, consistent, engaging',
  'Mobile app UI/UX design: cross-platform design, interactive prototypes, and consistent branding.',
  'mobile design, ios, android, prototype, branding, ux',
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
  'mobil-uygulama-tasarim',
  'Mobil Uygulama Tasarımı',
  'iOS ve Android için çapraz platform tasarım; etkileşimli prototipler ve her noktada tutarlı marka dili.',
  '{
    "tagline": "Yaratıcı. Özgün. Gerçek.",
    "highlights": [
      { "title": "Çapraz Platform Tasarım", "description": "iOS ve Android cihazlarda sorunsuz çalışan tasarımlar üreterek cihazdan bağımsız tutarlı ve yüksek kaliteli bir deneyim sağlar." },
      { "title": "Etkileşimli Prototipler", "description": "Uygulama işlevlerini göstermek ve geliştirme öncesi deneyimletmek için etkileşimli prototipler hazırlar." },
      { "title": "Tutarlı Markalama", "description": "Tasarımı marka kimliğinize uyumlu kurgulayarak tüm temas noktalarında tanınırlık ve güven oluşturur." }
    ],
    "html": "<p>Native hissiyat veren, hızlı ve platformlar arasında görsel tutarlılığı koruyan mobil deneyimler tasarlarım.</p>"
  }',
  'Mobil Uygulama Tasarımı kapak görseli',
  'Mobil Uygulama Tasarımı — Çapraz platform ve tutarlı',
  'Mobil uygulama UI/UX tasarımı: çapraz platform, prototipler ve marka tutarlılığı.',
  'mobil tasarim, ios, android, prototip, marka, ux',
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
  'mobile-app-design',
  'Mobile App Design',
  'Cross-Platform App-Design mit interaktiven Prototypen und konsistentem Branding für iOS und Android.',
  '{
    "tagline": "Kreativ. Einzigartig. Real.",
    "highlights": [
      { "title": "Cross-Platform Design", "description": "Designs, die auf iOS und Android reibungslos funktionieren und eine konsistente, hochwertige User Experience bieten." },
      { "title": "Interaktive Prototypen", "description": "Interaktive Prototypen zur Demonstration der App-Funktionalität, damit Stakeholder die App vor der Entwicklung erleben können." },
      { "title": "Konsistentes Branding", "description": "Visuelle Konsistenz mit der Markenidentität über alle Touchpoints hinweg für Wiedererkennung und Vertrauen." }
    ],
    "html": "<p>Ich gestalte mobile Experiences, die sich nativen anfühlen, performant sind und plattformübergreifend konsistent bleiben.</p>"
  }',
  'Mobile App Design Titelbild',
  'Mobile App Design — Plattformübergreifend und konsistent',
  'Mobile App UI/UX: Cross-Platform Design, interaktive Prototypen und konsistentes Branding.',
  'mobile design, ios, android, prototype, branding, ux',
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
  (UUID(), @img2, 'en', 'Mobile App Design', 'Mobile App Design cover image', 'Creative. Unique. Reality.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img2, 'tr', 'Mobil Uygulama Tasarımı', 'Mobil Uygulama Tasarımı kapak görseli', 'Yaratıcı. Özgün. Gerçek.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img2, 'de', 'Mobile App Design', 'Mobile App Design Titelbild', 'Kreativ. Einzigartig. Real.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));



-- =============================================================
-- SERVICE 3 — Brand Identity Design
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
  'brand-identity-design',
  'Brand Identity Design',
  'Brand identity systems that stay consistent across platforms: logos, guidelines, and key visual assets.',
  '{
    "tagline": "Creative. Unique. Reality.",
    "highlights": [
      { "title": "Logo Design", "description": "Creating memorable and impactful logos that represent your brand essence and values, helping you stand out in a crowded marketplace." },
      { "title": "Brand Guidelines", "description": "Developing comprehensive guidelines including typography, color, and visual styles to keep consistency across all platforms and media." },
      { "title": "Visual Assets", "description": "Designing assets such as business cards and letterheads to ensure communications are cohesive and professional." }
    ],
    "html": "<p>From logo to full visual system, I help brands look coherent, modern, and trustworthy across every touchpoint.</p>"
  }',
  'Brand Identity Design cover image',
  'Brand Identity Design — Logo, guidelines, assets',
  'Brand identity: logo design, brand guidelines, and visual assets for cohesive communication.',
  'brand identity, logo, brand guidelines, visual assets, design system',
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
  'marka-kimligi-tasarim',
  'Marka Kimliği Tasarımı',
  'Platformlar arasında tutarlılığı koruyan marka kimliği: logo, kılavuzlar ve temel görsel materyaller.',
  '{
    "tagline": "Yaratıcı. Özgün. Gerçek.",
    "highlights": [
      { "title": "Logo Tasarımı", "description": "Markanızın özünü ve değerlerini yansıtan akılda kalıcı logolar tasarlayarak rekabette öne çıkmanıza yardımcı olur." },
      { "title": "Marka Kılavuzu", "description": "Tipografi, renk ve görsel stil standartlarını içeren kapsamlı kılavuzlar oluşturarak tüm mecralarda tutarlılık sağlar." },
      { "title": "Görsel Materyaller", "description": "Kartvizit, antetli kağıt gibi görsel materyaller tasarlayarak iletişiminizin profesyonel ve bütüncül görünmesini sağlar." }
    ],
    "html": "<p>Logodan görsel sisteme kadar, markanızın her temas noktasında modern ve güven veren görünmesini sağlarım.</p>"
  }',
  'Marka Kimliği Tasarımı kapak görseli',
  'Marka Kimliği Tasarımı — Logo, kılavuz, materyaller',
  'Marka kimliği tasarımı: logo, marka kılavuzu ve görsel materyallerle bütüncül iletişim.',
  'marka kimligi, logo, marka kilavuzu, kurumsal kimlik, tasarim sistemi',
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
  'brand-identity-design',
  'Brand Identity Design',
  'Markenidentität, die über alle Plattformen konsistent bleibt: Logos, Guidelines und zentrale Visual Assets.',
  '{
    "tagline": "Kreativ. Einzigartig. Real.",
    "highlights": [
      { "title": "Logo Design", "description": "Einprägsame Logos, die Werte und Charakter Ihrer Marke transportieren und Sie im Wettbewerb differenzieren." },
      { "title": "Brand Guidelines", "description": "Umfassende Guidelines mit Typografie, Farben und visuellen Standards für Konsistenz über alle Kanäle." },
      { "title": "Visual Assets", "description": "Visual Assets wie Visitenkarten und Briefpapier, damit jede Kommunikation professionell und stimmig wirkt." }
    ],
    "html": "<p>Vom Logo bis zum visuellen System: Ich helfe Marken, modern, konsistent und vertrauenswürdig aufzutreten.</p>"
  }',
  'Brand Identity Design Titelbild',
  'Brand Identity Design — Logo, Guidelines, Assets',
  'Markenidentität: Logo Design, Brand Guidelines und Visual Assets für konsistente Kommunikation.',
  'brand identity, logo, brand guidelines, visual assets, design system',
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
  (UUID(), @img3, 'en', 'Brand Identity Design', 'Brand Identity Design cover image', 'Creative. Unique. Reality.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img3, 'tr', 'Marka Kimliği Tasarımı', 'Marka Kimliği Tasarımı kapak görseli', 'Yaratıcı. Özgün. Gerçek.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img3, 'de', 'Brand Identity Design', 'Brand Identity Design Titelbild', 'Kreativ. Einzigartig. Real.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));



-- =============================================================
-- SERVICE 4 — Web Development
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
  'web-development',
  'Web Development',
  'Modern web development with responsive front-end, robust back-end, and CMS integration for easy content management.',
  '{
    "tagline": "Creative. Unique. Reality.",
    "highlights": [
      { "title": "Front-End Development", "description": "Utilizing modern technologies like HTML, CSS, and JavaScript to create responsive and interactive web pages that provide an engaging user experience." },
      { "title": "Back-End Development", "description": "Implementing server-side logic and database management to ensure seamless performance and data integrity." },
      { "title": "Content Management Systems", "description": "Integrating user-friendly CMS platforms or custom solutions for easy content updates, enabling non-technical users to manage content efficiently." }
    ],
    "html": "<p>I build fast, maintainable websites with clean architecture: front-end, back-end, and content workflows.</p>"
  }',
  'Web Development cover image',
  'Web Development — Front-end, back-end, CMS',
  'Web development: responsive front-end, scalable back-end, and CMS integration for content management.',
  'web development, frontend, backend, cms, responsive, performance',
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
  'web-gelistirme',
  'Web Geliştirme',
  'Responsive arayüz, sağlam back-end ve kolay içerik yönetimi için CMS entegrasyonu ile modern web geliştirme.',
  '{
    "tagline": "Yaratıcı. Özgün. Gerçek.",
    "highlights": [
      { "title": "Front-End Geliştirme", "description": "HTML, CSS ve JavaScript gibi modern teknolojilerle responsive ve etkileşimli arayüzler geliştirerek güçlü bir kullanıcı deneyimi sunar." },
      { "title": "Back-End Geliştirme", "description": "Sunucu tarafı iş mantığını ve veri yönetimini kurarak performans ve veri bütünlüğünü güvence altına alır." },
      { "title": "İçerik Yönetim Sistemleri", "description": "WordPress benzeri CMS veya özel çözümler entegre ederek teknik olmayan kullanıcıların içeriği kolayca yönetmesini sağlar." }
    ],
    "html": "<p>Hızlı ve sürdürülebilir web siteleri geliştiririm: front-end, back-end ve içerik akışları dahil.</p>"
  }',
  'Web Geliştirme kapak görseli',
  'Web Geliştirme — Front-end, back-end, CMS',
  'Web geliştirme: responsive arayüz, ölçeklenebilir back-end ve içerik yönetimi için CMS entegrasyonu.',
  'web gelistirme, frontend, backend, cms, responsive, performans',
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
  'web-development',
  'Web Development',
  'Moderne Webentwicklung mit responsive Front-End, robustem Back-End und CMS-Integration für einfache Inhaltsverwaltung.',
  '{
    "tagline": "Kreativ. Einzigartig. Real.",
    "highlights": [
      { "title": "Front-End Development", "description": "Responsive und interaktive Oberflächen mit modernen Technologien für eine überzeugende User Experience." },
      { "title": "Back-End Development", "description": "Serverlogik und Datenmanagement für zuverlässige Performance und Datenintegrität." },
      { "title": "Content Management Systems", "description": "CMS-Integration oder individuelle Lösungen für einfache Content-Updates, auch für nicht-technische Nutzer." }
    ],
    "html": "<p>Ich baue schnelle, wartbare Websites mit sauberer Architektur: Front-End, Back-End und Content-Workflows.</p>"
  }',
  'Web Development Titelbild',
  'Web Development — Front-End, Back-End, CMS',
  'Webentwicklung: responsives Front-End, skalierbares Back-End und CMS-Integration für Content Management.',
  'web development, frontend, backend, cms, responsive, performance',
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
  (UUID(), @img4, 'en', 'Web Development', 'Web Development cover image', 'Creative. Unique. Reality.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img4, 'tr', 'Web Geliştirme', 'Web Geliştirme kapak görseli', 'Yaratıcı. Özgün. Gerçek.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), @img4, 'de', 'Web Development', 'Web Development Titelbild', 'Kreativ. Einzigartig. Real.', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));


COMMIT;
