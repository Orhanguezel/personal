// Read-only production export of editorial tables and public site settings. No users, secrets, orders or messages.
import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
const names = [
  'projects',
  'projects_i18n',
  'project_images',
  'project_images_i18n',
  'services',
  'services_i18n',
  'service_images',
  'service_images_i18n',
  'products',
  'product_i18n',
  'product_images',
  'product_specs',
  'product_faqs',
  'product_options',
  'categories',
  'category_i18n',
  'sub_categories',
  'sub_category_i18n',
  'custom_pages',
  'custom_pages_i18n',
  'faqs',
  'faqs_i18n',
  'pricing_plans',
  'pricing_plans_i18n',
  'brand_logos',
  'brand_logos_i18n',
  'resume_entries',
  'resume_entries_i18n',
  'skill_counters',
  'skill_counters_i18n',
  'skill_logos',
  'skill_logos_i18n',
  'storage_assets',
  'storage_assets_i18n',
  'menu_items',
  'menu_items_i18n',
  'footer_sections',
  'footer_sections_i18n',
];
const publicKeys = new Set([
  'app_locales',
  'default_locale',
  'public_base_url',
  'company_brand',
  'company_profile',
  'contact_info',
  'socials',
  'site_title',
  'brand_name',
  'brand_short_name',
  'site_logo',
  'site_logo_dark',
  'site_logo_light',
  'site_favicon',
  'site_apple_touch_icon',
  'site_meta_default',
  'seo',
  'site_seo',
  'seo_defaults',
  'seo_pages_home',
  'seo_pages_work',
  'seo_pages_work_detail',
  'businessHours',
  'ga4_measurement_id',
  'gtm_container_id',
  'cookie_consent',
  'content_categories',
]);
const sites = {};
for (const [id, dir] of [
  ['gwd', 'guezelwebdesign'],
  ['gzl', 'gzlteknoloji-site'],
]) {
  const v = {};
  for (const line of (await readFile('/var/www/vps-guezel/' + dir + '/backend/.env', 'utf8')).split(
    /\r?\n/,
  )) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) v[m[1]] = m[2].replace(/^(["'])(.*)\1$/, '$2');
  }
  const db = await mysql.createConnection({
    host: v.DB_HOST || 'localhost',
    port: Number(v.DB_PORT || 3306),
    user: v.DB_USER,
    password: v.DB_PASSWORD,
    database: v.DB_NAME,
    dateStrings: true,
  });
  const tables = {},
    ddl = {};
  for (const name of names) {
    const [[exists]] = await db.query(
      'SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name=?',
      [name],
    );
    if (!exists.n) continue;
    const [rows] = await db.query('SELECT * FROM `' + name + '`');
    tables[name] = rows;
    const [[create]] = await db.query('SHOW CREATE TABLE `' + name + '`');
    ddl[name] = create['Create Table'];
  }
  const [settings] = await db.query('SELECT * FROM site_settings');
  tables.site_settings = settings.filter(
    (s) => publicKeys.has(s.key) || s.key.startsWith('ui_') || s.key.startsWith('seo_pages_'),
  );
  const [[create]] = await db.query('SHOW CREATE TABLE site_settings');
  ddl.site_settings = create['Create Table'];
  sites[id] = { database: v.DB_NAME, tables, ddl };
  await db.end();
}
console.log(JSON.stringify({ capturedAt: new Date().toISOString(), sites }));
