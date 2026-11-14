#!/usr/bin/env node
// Build deployment-specific AI crawler files from that deployment's API.
// This prevents one brand's legal identity or links leaking into another one.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(scriptDir, '../public');
const apiBase = String(
  process.env.API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  '',
).replace(/\/+$/, '');

if (!apiBase) {
  console.error('HATA: llms dosyalari icin API_BASE veya NEXT_PUBLIC_API_URL gerekli.');
  process.exit(1);
}

async function getJson(pathname) {
  const response = await fetch(`${apiBase}${pathname}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`${pathname}: HTTP ${response.status}`);
  return response.json();
}

function parseValue(value) {
  if (value && typeof value === 'object') return value;
  try { return JSON.parse(String(value || '')); } catch { return value; }
}

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

const settingsRows = await getJson('/site_settings?keys=company_brand,brand_name,brand_short_name,contact_info&limit=50');
const settings = {};
for (const row of Array.isArray(settingsRows) ? settingsRows : []) {
  if (row?.key && settings[row.key] === undefined) settings[row.key] = parseValue(row.value);
}

const company = settings.company_brand && typeof settings.company_brand === 'object'
  ? settings.company_brand
  : {};
const legal = company.legal && typeof company.legal === 'object' ? company.legal : {};
const contact = settings.contact_info && typeof settings.contact_info === 'object'
  ? settings.contact_info
  : {};
const name = text(settings.brand_short_name) || text(settings.brand_name) || text(company.short_name) || text(company.name) || 'Website';
const website = (text(company.website) || text(contact.website) || new URL(apiBase).origin).replace(/\/+$/, '');
const email = text(company.email) || text(contact.email);
const phone = text(company.phone) || text(contact.phone);
const address = text(legal.address) || text(legal.adres) || text(contact.address);

const [projectsRaw, servicesRaw, postsRaw] = await Promise.all([
  getJson('/projects?limit=100&offset=0&locale=de'),
  getJson('/services?limit=100&offset=0&locale=de'),
  getJson('/custom-pages?module_key=blog&is_published=true&limit=100&offset=0&locale=de'),
]);
const rows = (value) => Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : [];
const projects = rows(projectsRaw);
const services = rows(servicesRaw);
const posts = rows(postsRaw);

const shortLines = [
  `# ${name}`,
  '',
  `> Independent web and software development provider based in Germany. Official website: ${website}.`,
  '',
  '## Canonical pages',
  `- Home: ${website}/de`,
  `- About: ${website}/de/corporate/ueber-uns`,
  `- Services: ${website}/de/services`,
  `- Portfolio: ${website}/de/work`,
  `- Blog: ${website}/de/blog`,
  `- Contact: ${website}/de/contact`,
  `- Legal notice: ${website}/de/impressum`,
  '',
  '## Publisher',
  `- Name: ${name}`,
  address ? `- Address: ${address}` : null,
  email ? `- Email: ${email}` : null,
  phone ? `- Phone: ${phone}` : null,
  '- Owner and author: Orhan Güzel',
  '',
  `Current public catalogue: ${projects.length} portfolio entries, ${services.length} services and ${posts.length} German-locale blog entries.`,
].filter((line) => line !== null);

const list = (items, prefix) => items.slice(0, 100).map((item) => {
  const title = text(item.title) || text(item.name) || text(item.slug);
  const slug = text(item.slug);
  return title && slug ? `- [${title}](${website}/de/${prefix}/${slug})` : null;
}).filter(Boolean);

const fullLines = [
  ...shortLines,
  '',
  '## Services',
  ...list(services, 'services'),
  '',
  '## Selected work',
  ...list(projects, 'work'),
  '',
  '## Blog',
  ...list(posts, 'blog'),
  '',
  '## Content and attribution',
  `Content on ${website} is published by ${name}. Blog articles are attributed to Orhan Güzel unless a page explicitly states otherwise.`,
];

fs.writeFileSync(path.join(outputDir, 'llms.txt'), `${shortLines.join('\n')}\n`);
fs.writeFileSync(path.join(outputDir, 'llms-full.txt'), `${fullLines.join('\n')}\n`);
console.log(`llms.txt ve llms-full.txt uretildi — marka: ${name} · kaynak: ${apiBase}`);
