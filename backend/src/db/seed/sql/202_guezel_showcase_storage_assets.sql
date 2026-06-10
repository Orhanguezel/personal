-- =============================================================
-- Guezel showcase storage assets (local optimized WebP/AVIF)
-- =============================================================

INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(UUID(), NULL, 'developer_hands_coding.webp', 'public', 'guezel-showcase/developer_hands_coding.webp', 'guezel-showcase', 'image/webp', 102120, 1024, 1024, '/uploads/guezel-showcase/developer_hands_coding.webp', NULL, 'local', 'guezel-showcase/developer_hands_coding.webp', 'image', 'webp', 1, NULL, JSON_OBJECT('source','docs/images/developer_hands_coding.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'developer_hands_coding.avif', 'public', 'guezel-showcase/developer_hands_coding.avif', 'guezel-showcase', 'image/avif', 47941, 1024, 1024, '/uploads/guezel-showcase/developer_hands_coding.avif', NULL, 'local', 'guezel-showcase/developer_hands_coding.avif', 'image', 'avif', 1, NULL, JSON_OBJECT('source','docs/images/developer_hands_coding.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'service_web_design_showcase.webp', 'public', 'guezel-showcase/service_web_design_showcase.webp', 'guezel-showcase', 'image/webp', 71766, 1024, 1024, '/uploads/guezel-showcase/service_web_design_showcase.webp', NULL, 'local', 'guezel-showcase/service_web_design_showcase.webp', 'image', 'webp', 1, NULL, JSON_OBJECT('source','docs/images/service_web_design_showcase.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'service_web_design_showcase.avif', 'public', 'guezel-showcase/service_web_design_showcase.avif', 'guezel-showcase', 'image/avif', 31416, 1024, 1024, '/uploads/guezel-showcase/service_web_design_showcase.avif', NULL, 'local', 'guezel-showcase/service_web_design_showcase.avif', 'image', 'avif', 1, NULL, JSON_OBJECT('source','docs/images/service_web_design_showcase.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'storefront_guezel_web_design.webp', 'public', 'guezel-showcase/storefront_guezel_web_design.webp', 'guezel-showcase', 'image/webp', 148120, 1024, 1024, '/uploads/guezel-showcase/storefront_guezel_web_design.webp', NULL, 'local', 'guezel-showcase/storefront_guezel_web_design.webp', 'image', 'webp', 1, NULL, JSON_OBJECT('source','docs/images/storefront_guezel_web_design.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'storefront_guezel_web_design.avif', 'public', 'guezel-showcase/storefront_guezel_web_design.avif', 'guezel-showcase', 'image/avif', 74586, 1024, 1024, '/uploads/guezel-showcase/storefront_guezel_web_design.avif', NULL, 'local', 'guezel-showcase/storefront_guezel_web_design.avif', 'image', 'avif', 1, NULL, JSON_OBJECT('source','docs/images/storefront_guezel_web_design.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'workspace_guezel_web_design.webp', 'public', 'guezel-showcase/workspace_guezel_web_design.webp', 'guezel-showcase', 'image/webp', 115578, 1024, 1024, '/uploads/guezel-showcase/workspace_guezel_web_design.webp', NULL, 'local', 'guezel-showcase/workspace_guezel_web_design.webp', 'image', 'webp', 1, NULL, JSON_OBJECT('source','docs/images/workspace_guezel_web_design.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'workspace_guezel_web_design.avif', 'public', 'guezel-showcase/workspace_guezel_web_design.avif', 'guezel-showcase', 'image/avif', 55781, 1024, 1024, '/uploads/guezel-showcase/workspace_guezel_web_design.avif', NULL, 'local', 'guezel-showcase/workspace_guezel_web_design.avif', 'image', 'avif', 1, NULL, JSON_OBJECT('source','docs/images/workspace_guezel_web_design.png','role','showcase'), NOW(3), NOW(3)),
(UUID(), NULL, 'gzl-teknoloji-logo.webp', 'public', 'guezel-showcase/gzl-teknoloji-logo.webp', 'guezel-showcase', 'image/webp', 38840, 1254, 1254, '/uploads/guezel-showcase/gzl-teknoloji-logo.webp', NULL, 'local', 'guezel-showcase/gzl-teknoloji-logo.webp', 'image', 'webp', 1, NULL, JSON_OBJECT('source','docs/images/gzl-teknoloji-logo.png','role','brand'), NOW(3), NOW(3)),
(UUID(), NULL, 'gzl-teknoloji-logo.avif', 'public', 'guezel-showcase/gzl-teknoloji-logo.avif', 'guezel-showcase', 'image/avif', 15144, 1254, 1254, '/uploads/guezel-showcase/gzl-teknoloji-logo.avif', NULL, 'local', 'guezel-showcase/gzl-teknoloji-logo.avif', 'image', 'avif', 1, NULL, JSON_OBJECT('source','docs/images/gzl-teknoloji-logo.png','role','brand'), NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  mime=VALUES(mime),
  size=VALUES(size),
  width=VALUES(width),
  height=VALUES(height),
  url=VALUES(url),
  provider=VALUES(provider),
  provider_public_id=VALUES(provider_public_id),
  provider_resource_type=VALUES(provider_resource_type),
  provider_format=VALUES(provider_format),
  metadata=VALUES(metadata),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
SELECT UUID(), a.id, l.locale, l.title, l.alt, l.caption, l.description, NOW(3), NOW(3)
FROM storage_assets a
JOIN (
  SELECT 'guezel-showcase/developer_hands_coding.webp' AS path, 'en' AS locale, 'Developer hands coding' AS title, 'Hands working on a web development workspace' AS alt, 'Guezel Web Design development workspace' AS caption, 'Optimized showcase image for web development services.' AS description
  UNION ALL SELECT 'guezel-showcase/developer_hands_coding.webp', 'de', 'Entwicklung am Arbeitsplatz', 'Haende an einem Webentwicklungs-Arbeitsplatz', 'Guezel Web Design Entwicklungsumgebung', 'Optimiertes Showcase-Bild fuer Webentwicklungsleistungen.'
  UNION ALL SELECT 'guezel-showcase/developer_hands_coding.webp', 'tr', 'Kod yazan eller', 'Web geliştirme çalışma alanında çalışan eller', 'Guezel Web Design geliştirme çalışma alanı', 'Web geliştirme hizmetleri için optimize edilmiş görsel.'
  UNION ALL SELECT 'guezel-showcase/service_web_design_showcase.webp', 'en', 'Web design service showcase', 'Modern website design showcase on a screen', 'Website design and delivery visual', 'Optimized service showcase image.'
  UNION ALL SELECT 'guezel-showcase/service_web_design_showcase.webp', 'de', 'Webdesign Showcase', 'Modernes Website-Design auf einem Bildschirm', 'Visual fuer Website-Design und Umsetzung', 'Optimiertes Service-Showcase-Bild.'
  UNION ALL SELECT 'guezel-showcase/service_web_design_showcase.webp', 'tr', 'Web tasarım hizmet görseli', 'Ekranda modern web sitesi tasarım vitrini', 'Web tasarım ve teslimat görseli', 'Optimize edilmiş hizmet görseli.'
  UNION ALL SELECT 'guezel-showcase/storefront_guezel_web_design.webp', 'en', 'Digital storefront showcase', 'Digital storefront and e-commerce presentation', 'E-commerce and business platform visual', 'Optimized storefront showcase image.'
  UNION ALL SELECT 'guezel-showcase/storefront_guezel_web_design.webp', 'de', 'Digitales Storefront Showcase', 'Digitale Storefront- und E-Commerce-Praesentation', 'E-Commerce und Business-Plattform Visual', 'Optimiertes Storefront-Showcase-Bild.'
  UNION ALL SELECT 'guezel-showcase/storefront_guezel_web_design.webp', 'tr', 'Dijital vitrin görseli', 'Dijital vitrin ve e-ticaret sunumu', 'E-ticaret ve iş platformu görseli', 'Optimize edilmiş vitrin görseli.'
  UNION ALL SELECT 'guezel-showcase/workspace_guezel_web_design.webp', 'en', 'Guezel Web Design workspace', 'Professional web design workspace with project visuals', 'Guezel Web Design showcase hero image', 'Optimized workspace hero image.'
  UNION ALL SELECT 'guezel-showcase/workspace_guezel_web_design.webp', 'de', 'Guezel Web Design Workspace', 'Professioneller Webdesign-Arbeitsplatz mit Projektvisuals', 'Guezel Web Design Showcase Hero-Bild', 'Optimiertes Workspace-Hero-Bild.'
  UNION ALL SELECT 'guezel-showcase/workspace_guezel_web_design.webp', 'tr', 'Guezel Web Design çalışma alanı', 'Proje görselleriyle profesyonel web tasarım çalışma alanı', 'Guezel Web Design showcase hero görseli', 'Optimize edilmiş çalışma alanı hero görseli.'
  UNION ALL SELECT 'guezel-showcase/gzl-teknoloji-logo.webp', 'en', 'GZL Teknoloji logo', 'GZL Teknoloji logo mark', 'Brand asset', 'Optimized brand logo.'
  UNION ALL SELECT 'guezel-showcase/gzl-teknoloji-logo.webp', 'de', 'GZL Teknoloji Logo', 'GZL Teknoloji Logozeichen', 'Brand-Asset', 'Optimiertes Markenlogo.'
  UNION ALL SELECT 'guezel-showcase/gzl-teknoloji-logo.webp', 'tr', 'GZL Teknoloji logo', 'GZL Teknoloji logo işareti', 'Marka görseli', 'Optimize edilmiş marka logosu.'
) l ON l.path = a.`path`
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);
