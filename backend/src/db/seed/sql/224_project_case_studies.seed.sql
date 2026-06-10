-- =============================================================
-- Portfolio case-study enrichment
-- Adds Problem / Solution / Outcome blocks without changing the
-- auto-generated base project seed files.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- -------------------------------------------------------------
-- Sportoonline / QuickEcommerce
-- -------------------------------------------------------------
UPDATE `projects_i18n`
SET
  `title` = 'Sportoonline / QuickEcommerce',
  `summary` = 'Enterprise commerce platform for Sportoonline, built around a Laravel backend, Next.js web apps, Flutter mobile app and marketplace-style store workflows.',
  `meta_title` = 'Sportoonline / QuickEcommerce',
  `meta_description` = 'Enterprise commerce platform for Sportoonline with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'Sportoonline needed a commerce foundation that could support customer-facing storefronts, admin workflows, mobile usage and marketplace-style store management without splitting the product into disconnected systems.',
      'approach', 'The platform was structured with a Laravel commerce backend, Next.js web applications and a Flutter mobile layer. Shared product, seller, order and localization workflows keep web, admin and mobile channels aligned.',
      'outcome', 'The result is a production-ready enterprise commerce stack for Sportoonline with reusable multi-channel architecture and room for marketplace growth.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'en' AND `slug` = 'quickecommerce';

UPDATE `projects_i18n`
SET
  `title` = 'Sportoonline / QuickEcommerce',
  `summary` = 'Sportoonline için Laravel backend, Next.js web uygulamaları, Flutter mobil uygulama ve marketplace tipi mağaza akışlarıyla geliştirilen enterprise e-ticaret platformu.',
  `meta_title` = 'Sportoonline / QuickEcommerce',
  `meta_description` = 'Sportoonline için Laravel backend, Next.js web uygulamaları, Flutter mobil uygulama ve çok mağazalı marketplace akışları.',
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'Sportoonline; müşteri vitrini, admin operasyonları, mobil kullanım ve marketplace tipi mağaza yönetimini ayrı ayrı sistemlere bölmeden taşıyacak bir e-ticaret altyapısına ihtiyaç duyuyordu.',
      'approach', 'Platform Laravel commerce backend, Next.js web uygulamaları ve Flutter mobil katman üzerine kuruldu. Ürün, satıcı, sipariş ve lokalizasyon akışları web, admin ve mobil kanalları aynı veri modeli etrafında tutuyor.',
      'outcome', 'Sonuç olarak Sportoonline için production-ready, çok kanallı ve marketplace büyümesine açık bir enterprise commerce altyapısı ortaya çıktı.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'quickecommerce';

UPDATE `projects_i18n`
SET
  `title` = 'Sportoonline / QuickEcommerce',
  `summary` = 'Enterprise-Commerce-Plattform für Sportoonline mit Laravel Backend, Next.js Web-Apps, Flutter Mobile App und Marketplace-Workflows.',
  `meta_title` = 'Sportoonline / QuickEcommerce',
  `meta_description` = 'Enterprise-Commerce-Plattform für Sportoonline mit Laravel Backend, Next.js Web-Apps, Flutter Mobile App und Multi-Store Marketplace-Workflows.',
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'Sportoonline brauchte eine Commerce-Grundlage, die Storefronts, Admin-Prozesse, mobile Nutzung und Marketplace-Store-Management verbindet, ohne das Produkt in getrennte Systeme zu zerlegen.',
      'approach', 'Die Plattform wurde mit Laravel Commerce Backend, Next.js Web-Apps und einer Flutter Mobile-Schicht aufgebaut. Produkt-, Seller-, Order- und Lokalisierungsprozesse bleiben kanalübergreifend konsistent.',
      'outcome', 'Entstanden ist ein produktionsreifer Enterprise-Commerce-Stack für Sportoonline mit wiederverwendbarer Multi-Channel-Architektur und Raum für Marketplace-Wachstum.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'de' AND `slug` = 'quickecommerce';

-- -------------------------------------------------------------
-- Ensotek
-- -------------------------------------------------------------
UPDATE `projects_i18n`
SET
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'Ensotek needed a B2B web platform family that could serve multiple domains, languages and product catalog contexts while keeping backend, UI patterns and deployment workflows maintainable.',
      'approach', 'A poly-repo platform setup was built around Next.js, Fastify, Drizzle ORM, MySQL and shared UI/backend packages. Each public site keeps its own database and brand surface while reusing proven operational modules.',
      'outcome', 'The platform is live across Ensotek-related domains including ensotek.de, ensotek.com.tr, karbonkompozit.com.tr and kuhlturm.com, with admin, catalog, document and multilingual publishing workflows.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'en' AND `slug` = 'ensotek';

UPDATE `projects_i18n`
SET
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'Ensotek; birden fazla domain, dil ve ürün kataloğu bağlamını destekleyen ama backend, UI ve deployment akışları sürdürülebilir kalan bir B2B platform ailesine ihtiyaç duyuyordu.',
      'approach', 'Next.js, Fastify, Drizzle ORM, MySQL ve ortak UI/backend paketleriyle poly-repo bir platform yapısı kuruldu. Her site kendi veritabanı ve marka yüzeyini korurken kanıtlanmış operasyon modüllerini paylaşıyor.',
      'outcome', 'Platform ensotek.de, ensotek.com.tr, karbonkompozit.com.tr ve kuhlturm.com dahil Ensotek alanlarında canlı; admin, katalog, doküman ve çok dilli yayın akışlarıyla çalışıyor.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'ensotek';

UPDATE `projects_i18n`
SET
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'Ensotek brauchte eine B2B-Plattformfamilie für mehrere Domains, Sprachen und Produktkatalog-Kontexte, ohne Backend-, UI- und Deployment-Prozesse unwartbar zu machen.',
      'approach', 'Auf Basis von Next.js, Fastify, Drizzle ORM, MySQL und gemeinsamen UI-/Backend-Paketen entstand ein Poly-Repo-Setup. Jede öffentliche Website behält eigene Datenbank- und Markenflächen, nutzt aber wiederverwendbare Betriebsbausteine.',
      'outcome', 'Die Plattform ist über Ensotek-Domains wie ensotek.de, ensotek.com.tr, karbonkompozit.com.tr und kuhlturm.com live und unterstützt Admin-, Katalog-, Dokumenten- und mehrsprachige Publishing-Workflows.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'de' AND `slug` = 'ensotek';

-- -------------------------------------------------------------
-- PaketJet
-- -------------------------------------------------------------
UPDATE `projects_i18n`
SET
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'PaketJet needed a freight marketplace MVP where carriers could publish route capacity and customers could book available cargo space through a clear, mobile-first workflow.',
      'approach', 'The product was delivered with Next.js, Fastify, MySQL, Drizzle ORM and Bun. Carrier dashboards, customer booking flows, route capacity management and admin revenue views were designed around a compact marketplace model.',
      'outcome', 'A production-oriented marketplace foundation was delivered in a two-week build window, ready for iteration around listings, bookings, wallet and operational reporting.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'en' AND `slug` = 'paketjet';

UPDATE `projects_i18n`
SET
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'PaketJet; taşıyıcıların rota kapasitesi yayınlayabildiği, müşterilerin de uygun kargo alanını rezerve edebildiği sade ve mobil öncelikli bir freight marketplace MVP yapısına ihtiyaç duyuyordu.',
      'approach', 'Ürün Next.js, Fastify, MySQL, Drizzle ORM ve Bun ile geliştirildi. Taşıyıcı panelleri, müşteri rezervasyon akışları, rota kapasite yönetimi ve admin gelir ekranları kompakt marketplace modeli etrafında tasarlandı.',
      'outcome', 'İki haftalık geliştirme penceresinde production odaklı bir marketplace temeli çıkarıldı; ilan, rezervasyon, cüzdan ve operasyon raporlama iterasyonlarına hazır hale geldi.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'paketjet';

UPDATE `projects_i18n`
SET
  `content` = CAST(JSON_SET(
    CAST(`content` AS JSON),
    '$.case_study',
    JSON_OBJECT(
      'challenge', 'PaketJet brauchte ein Freight-Marketplace-MVP, in dem Carrier Routenkapazitäten veröffentlichen und Kunden freien Frachtraum über einen klaren, mobile-first Workflow buchen können.',
      'approach', 'Das Produkt wurde mit Next.js, Fastify, MySQL, Drizzle ORM und Bun umgesetzt. Carrier-Dashboards, Kundenbuchungen, Routenkapazitäten und Admin-Umsatzansichten wurden um ein kompaktes Marketplace-Modell herum gebaut.',
      'outcome', 'Innerhalb eines zweiwöchigen Build-Fensters entstand eine produktionsorientierte Marketplace-Grundlage, bereit für Iterationen rund um Listings, Buchungen, Wallet und operatives Reporting.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'de' AND `slug` = 'paketjet';

COMMIT;
