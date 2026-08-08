-- Portfolyo liste sayfası metinleri site_settings üzerinden admin panelden yönetilir.

INSERT INTO site_settings (`id`, `key`, `locale`, `value`)
VALUES
  (
    'ss-ui-portfolio-page-tr',
    'ui_portfolio_page',
    'tr',
    JSON_OBJECT(
      'eyebrow', 'Portfolyo',
      'title', 'Canlı projeler, güçlü referanslar ve seçilmiş çalışmalar.',
      'lead', 'Tamamlanan projelerimizi, kullandığımız teknolojileri ve geliştirdiğimiz dijital çözümleri inceleyin.',
      'empty', 'Henüz yayımlanmış bir portfolyo kaydı bulunmuyor.'
    )
  ),
  (
    'ss-ui-portfolio-page-en',
    'ui_portfolio_page',
    'en',
    JSON_OBJECT(
      'eyebrow', 'Portfolio',
      'title', 'Live projects, strong references and selected work.',
      'lead', 'Explore our completed projects, the technologies we use and the digital solutions we have delivered.',
      'empty', 'No portfolio entries have been published yet.'
    )
  )
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = CURRENT_TIMESTAMP(3);
