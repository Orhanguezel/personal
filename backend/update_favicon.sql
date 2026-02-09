-- Update favicon paths to correct values
UPDATE site_settings 
SET value = '/assets/imgs/favicon.png', 
    updated_at = NOW(3)
WHERE `key` = 'site_favicon' AND locale = '*';

UPDATE site_settings 
SET value = '/assets/imgs/apple-touch-icon.png',
    updated_at = NOW(3)
WHERE `key` = 'site_apple_touch_icon' AND locale = '*';

UPDATE site_settings 
SET value = '/assets/imgs/logo/logo-dark.svg',
    updated_at = NOW(3)  
WHERE `key` = 'site_logo' AND locale = '*';

UPDATE site_settings 
SET value = '/assets/imgs/logo/logo-dark.svg',
    updated_at = NOW(3)
WHERE `key` = 'site_logo_dark' AND locale = '*';

UPDATE site_settings 
SET value = '/assets/imgs/logo/logo-white.svg',
    updated_at = NOW(3)
WHERE `key` = 'site_logo_light' AND locale = '*';

-- Insert if not exists
INSERT IGNORE INTO site_settings (id, `key`, locale, value, created_at, updated_at)
VALUES 
(UUID(), 'public_base_url', '*', 'http://localhost:3000', NOW(3), NOW(3)),
(UUID(), 'site_logo', '*', '/assets/imgs/logo/logo-dark.svg', NOW(3), NOW(3)),
(UUID(), 'site_logo_dark', '*', '/assets/imgs/logo/logo-dark.svg', NOW(3), NOW(3)),
(UUID(), 'site_logo_light', '*', '/assets/imgs/logo/logo-white.svg', NOW(3), NOW(3)),
(UUID(), 'site_favicon', '*', '/assets/imgs/favicon.png', NOW(3), NOW(3)),
(UUID(), 'site_apple_touch_icon', '*', '/assets/imgs/apple-touch-icon.png', NOW(3), NOW(3)),
(UUID(), 'site_og_default_image', '*', 'http://localhost:3000/assets/imgs/home-page-3/hero/img-1.png', NOW(3), NOW(3));
