-- =============================================================
-- 052 — Portfolyo gorselleri: Bionluk CDN'inden kendi sunucumuza
-- -------------------------------------------------------------
-- NEDEN (2026-08-29): 45 portfolyo gorseli `gcdn.bionluk.com` uzerinden
-- HOTLINK ediliyordu. Iki somut sorun:
--
--   1) DIS BAGIMLILIK — gorseller ucuncu tarafin CDN'inde. Bionluk o
--      dosyalari kaldirir/tasirsa portfolyo sayfasi bosalir.
--   2) OPTIMIZASYON YOK — `next/image` yalnizca izinli kaynaklari isler;
--      uzak host `images.remotePatterns` icinde olmadigi icin bilesen duz
--      <img> etiketine dusuyordu. Kartlar 0,6–1,9 MB'lik ham PNG indiriyordu
--      (/tr/portfolyo icin ~8 MB fazladan). Kendi sunucumuzdaki 24 gorsel
--      ise /_next/image uzerinden webp/avif olarak servis ediliyordu.
--
-- Dosyalar backend/uploads/portfolio/<proje>/ altina alindi; yollar artik
-- kok-egik oldugu icin hepsi ayni optimizasyon hattindan geciyor.
--
-- 030_portfolio_projects_seed.sql OTOMATIK URETILMISTIR ve elle
-- duzenlenmez; duzeltme burada, ondan SONRA uygulanir.
-- =============================================================

SET NAMES utf8mb4;

-- ── Kart gorselleri (projects.featured_image) ───────────────────────────────

-- antalyadoner
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/antalyadoner/01-cover.jpeg'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/36ce7fbb-3fc9-4b6a-9327-4a1274c0451a.jpeg';

-- b2b-geo-seo
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/b2b-geo-seo/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/order/d128a2ec-0660-4ebf-b511-298277d358d0.png';

-- trackpulse
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/trackpulse/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/8bc1d63a-d63f-42bb-9500-047bfc2f28a0.png';

-- amozon
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/amozon/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/0aefc2a7-6c29-4205-905e-0367ee411ab5.png';

-- genomai
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/genomai/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/cbc4b6ca-de8c-479e-93b4-c018937d3161.png';

-- socialpulse
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/socialpulse/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/ddeb6256-4e8f-4d70-83e8-203facc16206.png';

-- konigsmassage
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/konigsmassage/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/77249db5-8cf6-4c13-9351-584ac15d6cec.png';

-- paspas
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/paspas/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/1203741c-0292-48b7-a4bd-5f0945b7d0e8.png';

-- marketpulse
UPDATE `projects` SET `featured_image` = '/uploads/portfolio/marketpulse/01-cover.png'
WHERE `featured_image` = 'https://gcdn.bionluk.com/uploads/portfolio/6bd94983-ffc5-4c99-9a12-5da82cdd94ac.png';


-- ── Galeri gorselleri (project_images.image_url) ────────────────────────────

UPDATE `project_images` SET `image_url` = '/uploads/portfolio/amozon/g01.png' WHERE `id` = '40000006-0000-4000-8000-000004000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/amozon/g02.png' WHERE `id` = '40000006-0000-4000-8000-000004000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/amozon/g03.png' WHERE `id` = '40000006-0000-4000-8000-000004000008';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/amozon/g04.png' WHERE `id` = '40000006-0000-4000-8000-000004000011';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/amozon/g05.png' WHERE `id` = '40000006-0000-4000-8000-000004000014';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/antalyadoner/g01.jpeg' WHERE `id` = '40000006-0000-4000-8000-000021000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/antalyadoner/g02.jpeg' WHERE `id` = '40000006-0000-4000-8000-000021000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/b2b-geo-seo/g01.png' WHERE `id` = '40000006-0000-4000-8000-000001000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/genomai/g01.png' WHERE `id` = '40000006-0000-4000-8000-000005000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/genomai/g02.png' WHERE `id` = '40000006-0000-4000-8000-000005000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/genomai/g03.png' WHERE `id` = '40000006-0000-4000-8000-000005000008';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/genomai/g04.png' WHERE `id` = '40000006-0000-4000-8000-000005000011';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/genomai/g05.png' WHERE `id` = '40000006-0000-4000-8000-000005000014';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/konigsmassage/g01.png' WHERE `id` = '40000006-0000-4000-8000-000013000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/konigsmassage/g02.png' WHERE `id` = '40000006-0000-4000-8000-000013000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/marketpulse/g01.png' WHERE `id` = '40000006-0000-4000-8000-000007000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/marketpulse/g02.png' WHERE `id` = '40000006-0000-4000-8000-000007000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/marketpulse/g03.png' WHERE `id` = '40000006-0000-4000-8000-000007000008';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/marketpulse/g04.png' WHERE `id` = '40000006-0000-4000-8000-000007000011';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/marketpulse/g05.png' WHERE `id` = '40000006-0000-4000-8000-000007000014';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/paspas/g01.png' WHERE `id` = '40000006-0000-4000-8000-000008000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/paspas/g02.png' WHERE `id` = '40000006-0000-4000-8000-000008000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/paspas/g03.png' WHERE `id` = '40000006-0000-4000-8000-000008000008';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/paspas/g04.png' WHERE `id` = '40000006-0000-4000-8000-000008000011';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/paspas/g05.png' WHERE `id` = '40000006-0000-4000-8000-000008000014';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/paspas/g06.png' WHERE `id` = '40000006-0000-4000-8000-000008000017';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/socialpulse/g01.png' WHERE `id` = '40000006-0000-4000-8000-000006000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/socialpulse/g02.png' WHERE `id` = '40000006-0000-4000-8000-000006000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/socialpulse/g03.png' WHERE `id` = '40000006-0000-4000-8000-000006000008';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/socialpulse/g04.png' WHERE `id` = '40000006-0000-4000-8000-000006000011';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/socialpulse/g05.png' WHERE `id` = '40000006-0000-4000-8000-000006000014';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/trackpulse/g01.png' WHERE `id` = '40000006-0000-4000-8000-000002000002';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/trackpulse/g02.png' WHERE `id` = '40000006-0000-4000-8000-000002000005';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/trackpulse/g03.png' WHERE `id` = '40000006-0000-4000-8000-000002000008';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/trackpulse/g04.png' WHERE `id` = '40000006-0000-4000-8000-000002000011';
UPDATE `project_images` SET `image_url` = '/uploads/portfolio/trackpulse/g05.png' WHERE `id` = '40000006-0000-4000-8000-000002000014';

-- ── Guvenlik agi: kalan hotlink var mi? ─────────────────────────────────────
-- Bu sorgu 0 donmelidir:
--   SELECT COUNT(*) FROM projects WHERE featured_image LIKE '%gcdn.bionluk%';
--   SELECT COUNT(*) FROM project_images WHERE image_url LIKE '%gcdn.bionluk%';
