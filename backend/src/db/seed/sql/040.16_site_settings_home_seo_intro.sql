-- =============================================================
-- FILE: 040.16_site_settings_home_seo_intro.sql
-- ui_home_seo_intro — ana sayfa SEO/GEO tanitim bolumu (Guezel Web Design).
--
-- NEDEN VAR (2026-08-08): Bu metin components/sections/HomeSeoIntro.tsx ve
-- content/geo-home-intro.ts icine GOMULUYDU. Ayni kod tabani artik
-- gzlteknoloji.com'u da sundugu icin GWD'ye ait "Grevenbroich merkezli"
-- anlatimi TR sitede de cikiyordu. Bilesen artik bu ayardan okuyor; ayar
-- yoksa bolumu hic render etmiyor. Metin AYNEN korunmustur.
--
-- ESCAPE NOTU: MySQL tek tirnakli dizgede TERS BOLU de kacis karakteridir.
-- JSON icindeki \\" ifadeleri, dosya uretilirken ikilenmezse kayit sirasinda
-- " olur ve deger GECERSIZ JSON olarak saklanir. (Bu hata bir kez yapildi:
-- ui_home bozuk kaydedildi, hero metni istemcide cozulemedi.)
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('2d398cfc-341b-5326-8f77-e1c80ce09135', 'ui_home_seo_intro', 'de', '{"heading": "Full-Stack Delivery aus Deutschland", "html": "<p>Orhan Guzel ist Full-Stack Webentwickler mit Sitz in <strong>Deutschland</strong> und liefert produktionsreife Geschäftsplattformen, E-Commerce-Systeme und operative Webanwendungen für Teams in Deutschland und Europa. Der Schwerpunkt liegt auf klarer Architektur, typsicheren APIs (Fastify, Laravel), wartbaren Frontends (Next.js, React, TypeScript) und zuverlässigem Deployment (Docker, Nginx, CI/CD).</p>\\n<p>Typische Projekte umfassen mehrsprachige Marketing-Sites, Admin-Dashboards, Bestell- und Buchungsstrecken, B2B-Kataloge sowie Mobile-Begleit-Apps mit Flutter. Jede Lieferung folgt einem wiederholbaren Muster: Domänenmodell, API-Verträge, UI-Komponentenbibliothek, Observability und dokumentierte Release-Fahrspuren.</p>\\n<p>AgriTech-Experimente und Landwirtschaftsprodukte werden bewusst als separates Produktlabor geführt. Auf guezelwebdesign.com bleiben sie als Referenz für komplexe Plattformarbeit sichtbar, ohne die Positionierung als Full-Stack Delivery Partner für Unternehmen in Deutschland zu verwässern.</p>\\n<p>Wenn Sie eine bestehende Plattform modernisieren oder eine neue skalierbare Lösung von Grund auf benötigen, liefert Guezel Web Design Discovery, Implementierung und Übergabe in einem durchgängigen Full-Stack-Engagement.</p>"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('6fc4378e-6293-5fe3-9de7-2073dd38605f', 'ui_home_seo_intro', 'en', '{"heading": "Full-stack delivery from Germany", "html": "<p>Orhan Guzel is a full-stack web developer based in <strong>Germany</strong>, shipping production-ready business platforms, e-commerce systems, and operational web applications for clients across Europe. Work emphasizes clean architecture, type-safe APIs (Fastify, Laravel), maintainable frontends (Next.js, React, TypeScript), and dependable delivery (Docker, Nginx, CI/CD).</p>\\n<p>Typical deliveries include multilingual marketing sites, admin consoles, order and booking flows, B2B catalogs, and Flutter companion apps. Each engagement follows a repeatable pattern: domain modeling, API contracts, UI systems, observability hooks, and documented release paths.</p>\\n<p>AgriTech experiments and agriculture products are kept under a separate product-lab umbrella. On guezelwebdesign.com they remain a concise reference for complex platform work, while the main positioning stays focused on full-stack delivery for business clients in Germany.</p>\\n<p>Whether you are modernizing a legacy stack or launching a new product, Guezel Web Design provides discovery, implementation, and handover in one full-stack engagement.</p>"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('cf808827-77ed-503a-bdd7-90b5e74fea31', 'ui_home_seo_intro', 'tr', '{"heading": "Almanya''dan full-stack teslimat", "html": "<p>Orhan Güzel, <strong>Almanya</strong> merkezli bir full-stack web geliştiricisidir; Avrupa genelinde işletmelere üretime hazır iş platformları, e-ticaret sistemleri ve operasyonel web uygulamaları teslim eder. Odak; temiz mimari, tip güvenli API’ler (Fastify, Laravel), sürdürülebilir arayüzler (Next.js, React, TypeScript) ve güvenilir yayın (Docker, Nginx, CI/CD) üzerinedir.</p>\\n<p>Çok dilli kurumsal siteler, yönetim panelleri, sipariş ve rezervasyon akışları, B2B kataloglar ve Flutter mobil eşlik uygulamaları tipik teslimler arasındadır. Her proje; domain modeli, API sözleşmeleri, UI bileşen seti, gözlemlenebilirlik ve dokümantasyonlu sürüm hatları ile ilerler.</p>\\n<p>AgriTech deneyleri ve tarım ürünleri ayrı bir ürün laboratuvarı çatısı altında konumlandırılır. guezelwebdesign.com üzerinde yalnızca karmaşık platform geliştirme referansı olarak kısa biçimde yer alır; ana konumlandırma Almanya’daki işletmeler için full-stack teslimat odağında kalır.</p>\\n<p>Mevcut sisteminizi modernize etmek veya sıfırdan ölçeklenebilir bir ürün kurmak istiyorsanız, Guezel Web Design keşif, geliştirme ve devri tek tam kapsamlı süreçte sunar.</p>"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);
