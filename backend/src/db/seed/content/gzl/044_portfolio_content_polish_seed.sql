-- =============================================================
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/044_portfolio_content_polish_seed.sql
-- Gerekce : Portfolyo metni cilalama
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- 044 — Öne çıkan B2B portfolyo kaydının TR/EN içeriğini düzenler.

SET NAMES utf8mb4;

UPDATE `projects_i18n`
SET
  `summary`='Çok dilli B2B ihracat sitesi; GEO, teknik SEO, hreflang, yapılandırılmış veri ve Core Web Vitals analizleriyle birlikte hazırlandı.',
  `content`=JSON_OBJECT(
    'description','Çok dilli B2B ihracat sitesi, uluslararası hedef kitlelerin markaya doğru dil ve içerikle ulaşabilmesi için geliştirildi. Teknik kurulum; yapay zekâ aramalarında görünürlük, klasik arama motoru optimizasyonu ve performans ölçümünü birlikte ele alıyor.',
    'overview','Çok dilli B2B ihracat sitesi, uluslararası hedef kitlelerin markaya doğru dil ve içerikle ulaşabilmesi için geliştirildi. Teknik kurulum; yapay zekâ aramalarında görünürlük, klasik arama motoru optimizasyonu ve performans ölçümünü birlikte ele alıyor.',
    'key_features',JSON_ARRAY('Çok dilli sayfa ve içerik mimarisi','Hreflang, sitemap ve canonical yapılandırması','Schema.org ve JSON-LD uygulaması','GEO ve yapay zekâ bot erişim kontrolleri','Lighthouse ve Core Web Vitals performans analizi'),
    'technologies_used',JSON_ARRAY('Next.js','Fastify','MySQL','JSON-LD','Lighthouse'),
    'design_highlights',JSON_ARRAY('Responsive arayüz','Yönetilebilir içerik','Performans odaklı kurulum'),
    'sections',JSON_ARRAY(
      JSON_OBJECT('title','Proje Kapsamı','items',JSON_ARRAY('Çok dilli sayfa ve içerik mimarisi','Hreflang, sitemap ve canonical yapılandırması','Schema.org ve JSON-LD uygulaması','GEO ve yapay zekâ bot erişim kontrolleri','Lighthouse ve Core Web Vitals performans analizi')),
      JSON_OBJECT('title','Teslimatlar','items',JSON_ARRAY('Teknik SEO ve GEO analiz raporu','Önceliklendirilmiş aksiyon planı','Mobil ve masaüstü performans kontrolleri','Geliştiriciye uygulanabilir teknik notlar')),
      JSON_OBJECT('title','Teknoloji','body','Next.js, Fastify ve MySQL tabanlı; responsive, yönetilebilir ve performans odaklı teknik yapı.')
    )
  ),
  `meta_description`='Çok dilli B2B web sitesi, GEO, teknik SEO, Lighthouse ve Core Web Vitals odaklı portfolyo çalışması.'
WHERE `project_id`='40000000-0000-4000-8000-000000000001' AND `locale`='tr';

UPDATE `projects_i18n`
SET
  `title`='Multilingual B2B Website — GEO, SEO and Lighthouse Audit',
  `summary`='A multilingual B2B export website delivered with GEO, technical SEO, hreflang, structured data and Core Web Vitals analysis.',
  `content`=JSON_OBJECT(
    'description','A multilingual B2B export website built to connect international audiences with the right language and content. The technical foundation combines AI-search visibility, traditional SEO and performance measurement.',
    'overview','A multilingual B2B export website built to connect international audiences with the right language and content. The technical foundation combines AI-search visibility, traditional SEO and performance measurement.',
    'key_features',JSON_ARRAY('Multilingual page and content architecture','Hreflang, sitemap and canonical setup','Schema.org and JSON-LD implementation','GEO and AI crawler access checks','Lighthouse and Core Web Vitals analysis'),
    'technologies_used',JSON_ARRAY('Next.js','Fastify','MySQL','JSON-LD','Lighthouse'),
    'design_highlights',JSON_ARRAY('Responsive interface','Managed content','Performance-focused delivery'),
    'sections',JSON_ARRAY(
      JSON_OBJECT('title','Project Scope','items',JSON_ARRAY('Multilingual page and content architecture','Hreflang, sitemap and canonical setup','Schema.org and JSON-LD implementation','GEO and AI crawler access checks','Lighthouse and Core Web Vitals analysis')),
      JSON_OBJECT('title','Deliverables','items',JSON_ARRAY('Technical SEO and GEO audit','Prioritized action plan','Mobile and desktop performance checks','Implementation-ready developer notes')),
      JSON_OBJECT('title','Technology','body','A responsive, manageable and performance-focused foundation built with Next.js, Fastify and MySQL.')
    )
  ),
  `featured_image_alt`='Multilingual B2B website GEO SEO and Lighthouse project',
  `meta_title`='Multilingual B2B Website — GEO, SEO and Lighthouse | GZL Technology',
  `meta_description`='Multilingual B2B website portfolio project focused on GEO, technical SEO, Lighthouse and Core Web Vitals.'
WHERE `project_id`='40000000-0000-4000-8000-000000000001' AND `locale`='en';
