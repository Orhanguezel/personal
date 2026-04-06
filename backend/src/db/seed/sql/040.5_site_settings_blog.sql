-- =============================================================
-- ADD: ui_blog (localized) — blog UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_blog',
  'en',
  CAST(JSON_OBJECT(
    'blog1', JSON_OBJECT(
      'heading','Recent blog',
      'intro','Explore the insights and trends shaping our industry',
      'cta_label','View more',
      'loading','Loading...',
      'error','Something went wrong.',
      'empty','No posts found.',
      'read_time','3 min read',
      'category_fallback','Blog'
    ),
    'blog2', JSON_OBJECT(
      'badge','Latest Posts',
      'heading','From Blog',
      'card1_category','CEO',
      'card1_title','Optimize Your Web Application for Speed',
      'card1_description','Notes from production delivery, platform architecture and implementation decisions.',
      'card2_category','Development',
      'card2_title','Best Practices for Secure Web Development',
      'card2_description','Practical lessons from building business platforms, APIs and admin systems.',
      'card3_category','Trending',
      'card3_title','10 JavaScript Frameworks for Web Development in 2026',
      'card3_description','Selected technical notes around e-commerce, B2B systems and operational software.',
      'sample_date','March 28, 2026',
      'read_time','3 min read'
    ),
    'list', JSON_OBJECT(
      'badge','Recent blog',
      'title_html','Explore the <span class="text-dark">insights and trends shaping</span> our industry',
      'intro_html','Discover key insights and emerging trends shaping the future of design: a detailed <br /> examination of how these innovations are reshaping our industry',
      'loading','Loading...',
      'error','Failed to load posts.',
      'read_time','3 min read',
      'default_category','Blog',
      'empty','No posts found.'
    ),
    'post', JSON_OBJECT(
      'loading','Loading...',
      'error','Something went wrong',
      'empty','No Posts Found'
    ),
    'detail', JSON_OBJECT(
      'loading_title','Loading...',
      'loading_text','Please wait',
      'not_found_title','Post not found',
      'not_found_text_prefix','Invalid slug:',
      'error_title','Something went wrong',
      'error_text','Please try again.',
      'read_time_label','16 mins to read',
      'by_label','By',
      'share_label','Share',
      'related_title','Related posts',
      'view_more_label','View more',
      'related_empty','No related posts.',
      'category_fallback','Blog',
      'read_time','3 min read',
      'author_section_title','About the author',
      'author_bio_html','<p>Orhan Güzel builds production-ready web platforms and business software with Next.js, Fastify, and Laravel — based in Grevenbroich, Germany.</p>'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_blog',
  'de',
  CAST(JSON_OBJECT(
    'blog1', JSON_OBJECT(
      'heading','Aktuelle Beiträge',
      'intro','Entdecken Sie die Einblicke und Trends, die unsere Branche prägen',
      'cta_label','Mehr anzeigen',
      'loading','Wird geladen...',
      'error','Etwas ist schiefgelaufen.',
      'empty','Keine Beiträge gefunden.',
      'read_time','3 Min. Lesezeit',
      'category_fallback','Blog'
    ),
    'blog2', JSON_OBJECT(
      'badge','Neueste Beiträge',
      'heading','Aus dem Blog',
      'card1_category','CEO',
      'card1_title','Optimieren Sie Ihre Webanwendung für Geschwindigkeit',
      'card1_description','Notizen aus produktiver Delivery, Plattform-Architektur und technischen Entscheidungen.',
      'card2_category','Entwicklung',
      'card2_title','Best Practices für sichere Webentwicklung',
      'card2_description','Praktische Learnings aus Business-Plattformen, APIs und Admin-Systemen.',
      'card3_category','Trend',
      'card3_title','10 JavaScript-Frameworks für die Webentwicklung 2026',
      'card3_description','Ausgewählte technische Notizen zu E-Commerce, B2B-Systemen und operativer Software.',
      'sample_date','28. März 2026',
      'read_time','3 Min. Lesezeit'
    ),
    'list', JSON_OBJECT(
      'badge','Aktueller Blog',
      'title_html','Entdecken Sie die <span class="text-dark">Einblicke und Trends</span>, die unsere Branche prägen',
      'intro_html','Entdecken Sie wichtige Einblicke und neue Trends, die die Zukunft des Designs prägen: <br />eine detaillierte Betrachtung, wie diese Innovationen unsere Branche verändern',
      'loading','Wird geladen...',
      'error','Beiträge konnten nicht geladen werden.',
      'read_time','3 Min. Lesezeit',
      'default_category','Blog',
      'empty','Keine Beiträge gefunden.'
    ),
    'post', JSON_OBJECT(
      'loading','Wird geladen...',
      'error','Etwas ist schiefgelaufen',
      'empty','Keine Beiträge gefunden'
    ),
    'detail', JSON_OBJECT(
      'loading_title','Wird geladen...',
      'loading_text','Bitte warten',
      'not_found_title','Beitrag nicht gefunden',
      'not_found_text_prefix','Ungültiger Slug:',
      'error_title','Etwas ist schiefgelaufen',
      'error_text','Bitte versuche es erneut.',
      'read_time_label','16 Min. Lesezeit',
      'by_label','Von',
      'share_label','Teilen',
      'related_title','Ähnliche Beiträge',
      'view_more_label','Mehr anzeigen',
      'related_empty','Keine ähnlichen Beiträge.',
      'category_fallback','Blog',
      'read_time','3 Min. Lesezeit',
      'author_section_title','Über den Autor',
      'author_bio_html','<p>Orhan Güzel entwickelt produktionsreife Webplattformen und Business-Software mit Next.js, Fastify und Laravel — in Grevenbroich, Deutschland.</p>'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_blog',
  'tr',
  CAST(JSON_OBJECT(
    'blog1', JSON_OBJECT(
      'heading','Son Blog',
      'intro','Sektörümüzü şekillendiren içgörüleri ve trendleri keşfedin',
      'cta_label','Daha fazlası',
      'loading','Yükleniyor...',
      'error','Bir şeyler ters gitti.',
      'empty','Yazı bulunamadı.',
      'read_time','3 dk okuma',
      'category_fallback','Blog'
    ),
    'blog2', JSON_OBJECT(
      'badge','Son Yazılar',
      'heading','Blogdan',
      'card1_category','CEO',
      'card1_title','Web Uygulamanızı Hız için Optimize Edin',
      'card1_description','Production teslimatı, platform mimarisi ve teknik kararlar üzerine notlar.',
      'card2_category','Geliştirme',
      'card2_title','Güvenli Web Geliştirme için En İyi Uygulamalar',
      'card2_description','İş platformları, API katmanı ve admin sistemlerinden pratik çıkarımlar.',
      'card3_category','Trend',
      'card3_title','2026''da Web Geliştirme için 10 JavaScript Framework''ü',
      'card3_description','E-ticaret, B2B sistemler ve operasyon yazılımları üzerine seçilmiş teknik notlar.',
      'sample_date','28 Mart 2026',
      'read_time','3 dk okuma'
    ),
    'list', JSON_OBJECT(
      'badge','Son Blog',
      'title_html','Sektörümüzü şekillendiren <span class="text-dark">içgörüleri ve trendleri</span> keşfedin',
      'intro_html','Tasarımın geleceğini şekillendiren önemli içgörüleri ve yükselen trendleri keşfedin: <br />bu yeniliklerin sektörümüzü nasıl dönüştürdüğüne dair ayrıntılı bir bakış',
      'loading','Yükleniyor...',
      'error','Yazılar yüklenemedi.',
      'read_time','3 dk okuma',
      'default_category','Blog',
      'empty','Yazı bulunamadı.'
    ),
    'post', JSON_OBJECT(
      'loading','Yükleniyor...',
      'error','Bir hata oluştu',
      'empty','Yazı bulunamadı'
    ),
    'detail', JSON_OBJECT(
      'loading_title','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'not_found_title','Yazı bulunamadı',
      'not_found_text_prefix','Geçersiz slug:',
      'error_title','Bir hata oluştu',
      'error_text','Lütfen tekrar deneyin.',
      'read_time_label','16 dk okuma',
      'by_label','Yazar',
      'share_label','Paylaş',
      'related_title','İlgili yazılar',
      'view_more_label','Daha fazlası',
      'related_empty','İlgili yazı bulunamadı.',
      'category_fallback','Blog',
      'read_time','3 dk okuma',
      'author_section_title','Yazar hakkında',
      'author_bio_html','<p>Orhan Güzel, Next.js, Fastify ve Laravel ile üretime hazır web platformları ve iş yazılımları geliştiriyor; Grevenbroich, Almanya.</p>'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
