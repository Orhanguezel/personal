-- Canonical custom-page taxonomy for existing GWD records.
UPDATE `custom_pages`
SET `module_key` = 'legal'
WHERE `module_key` IN ('policy', 'privacy', 'terms', 'cookies');

UPDATE `custom_pages`
SET `module_key` = 'corporate'
WHERE `module_key` IN ('about', 'kurumsal');
