-- Canonical project -> service relationships.
-- projects.services stores service slugs (not free-form portfolio labels).

UPDATE projects p JOIN projects_i18n i ON i.project_id = p.id AND i.locale = 'tr'
SET p.services = CASE i.slug
  WHEN 'cok-dilli-b2b-sitesi-geo-seo-lighthouse-analizi' THEN JSON_ARRAY('geo-seo-lighthouse-analizi','yapay-zeka-arama-optimizasyonu-geo','seo-hizmeti')
  WHEN 'trackpulse-web-analitik-donusum-izleme-platformu' THEN JSON_ARRAY('ga4-gtm-donusum-izleme','geo-seo-lighthouse-analizi')
  WHEN 'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu' THEN JSON_ARRAY('yapay-zeka-arama-optimizasyonu-geo','geo-seo-lighthouse-analizi','seo-hizmeti')
  WHEN 'amozon-amazon-ticari-radar-ai-karar-motoru' THEN JSON_ARRAY('amazon-fiyat-scraping-sistemi','ai-ml-veri-tahmin-platformu')
  WHEN 'genomai-genomik-tahmin-ai-bitki-islahi-platformu' THEN JSON_ARRAY('ai-ml-veri-tahmin-platformu')
  WHEN 'socialpulse-sosyal-medya-yonetim-otomasyon-platformu' THEN JSON_ARRAY('sosyal-medya-otomasyon-paneli')
  WHEN 'marketpulse-bayi-rakip-pazar-izleme-saas-platformu' THEN JSON_ARRAY('lead-bulma-rakip-takip-paneli','google-maps-veri-cekme-botu')
  WHEN 'paspas-erp-uretim-ve-operasyon-yonetim-sistemi' THEN JSON_ARRAY('firmaya-ozel-erp-yazilimi','ozel-yazilim-nextjs-fastify')
  WHEN 'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu' THEN JSON_ARRAY('geo-seo-lighthouse-analizi','yapay-zeka-arama-optimizasyonu-geo','seo-hizmeti','bakim-destek')
  WHEN 'gzlteknoloji' THEN JSON_ARRAY('kurumsal-web-sitesi','ozel-yazilim-nextjs-fastify','geo-seo-lighthouse-analizi','bakim-destek')
  WHEN 'bereket-fide-kurumsal-web-sitesi-urun-katalogu' THEN JSON_ARRAY('kurumsal-web-sitesi','ozel-yazilim-nextjs-fastify')
  WHEN 'vista-insaat-kurumsal-web-sitesi-admin-paneli' THEN JSON_ARRAY('kurumsal-web-sitesi','ozel-yazilim-nextjs-fastify')
  WHEN 'konig-energetik-randevulu-masaj-wellness-sitesi' THEN JSON_ARRAY('randevu-sistemli-kurumsal-site','kurumsal-web-sitesi')
  WHEN 'sportoonline-spor-outdoor-e-ticaret-platformu' THEN JSON_ARRAY('e-ticaret-sitesi','modern-e-ticaret-sitesi')
  WHEN 'kamanilan' THEN JSON_ARRAY('emlak-ilan-sitesi','ozel-yazilim-nextjs-fastify')
  WHEN 'ensotek-multi-tenant-b2b-saas-metahub' THEN JSON_ARRAY('ozel-yazilim-nextjs-fastify','firmaya-ozel-erp-yazilimi','teklif-raporlama-web-sayfasi')
  WHEN 'antalya-doner-qr-menu-online-siparis-next-js' THEN JSON_ARRAY('online-siparis-sistemi','ozel-yazilim-nextjs-fastify')
  WHEN 'miss-et-balik' THEN JSON_ARRAY('kurumsal-web-sitesi','online-siparis-sistemi')
  WHEN 'gzl-temizlik' THEN JSON_ARRAY('kurumsal-web-sitesi','ozel-yazilim-nextjs-fastify')
  ELSE p.services
END;

-- Public terminology: the records are projects; portfolio describes the
-- collection but is no longer used as a competing page/module name.
UPDATE menu_items_i18n
SET title = 'Projeler', updated_at = CURRENT_TIMESTAMP(3)
WHERE locale = 'tr' AND url = '/portfolyo';

UPDATE site_settings
SET value = JSON_SET(
  value,
  '$.work.badge', 'Projeler',
  '$.work.title_html', 'Tamamladığımız <span class="text-300">projeler</span>',
  '$.work.intro_html', 'Portföyümüzde yer alan, üretimde çalışan ve teslim edilmiş projeler.'
), updated_at = CURRENT_TIMESTAMP(3)
WHERE `key` = 'ui_project' AND locale = 'tr' AND JSON_VALID(value);

-- The migrated local Bionluk derivatives are not part of the current public
-- asset tree. Prefer the original CDN images that already exist in each
-- project's gallery and disable only the unavailable local duplicates.
UPDATE projects p
SET p.featured_image = (
  SELECT image_url
  FROM project_images pi
  WHERE pi.project_id = p.id
    AND pi.image_url LIKE 'https://gcdn.bionluk.com/%'
  ORDER BY pi.display_order ASC
  LIMIT 1
)
WHERE p.featured_image LIKE '/assets/bionluk/%'
  AND EXISTS (
    SELECT 1 FROM project_images pi
    WHERE pi.project_id = p.id
      AND pi.image_url LIKE 'https://gcdn.bionluk.com/%'
  );

UPDATE project_images pi
SET pi.is_active = 0, pi.updated_at = CURRENT_TIMESTAMP(3)
WHERE pi.image_url LIKE '/assets/bionluk/%'
  AND EXISTS (
    SELECT 1 FROM (
      SELECT project_id FROM project_images
      WHERE image_url LIKE 'https://gcdn.bionluk.com/%'
      GROUP BY project_id
    ) cdn_projects
    WHERE cdn_projects.project_id = pi.project_id
  );
