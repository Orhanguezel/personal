#!/usr/bin/env bun
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DOCS = path.join(ROOT, 'docs/bionluk');
const API_BASE = 'https://api.bionluk.com/general'; // OpenClaw deseni: v1 YOK (bundle path'leri /general/<endpoint>/)
const USERNAME = process.env.BIONLUK_USERNAME ?? 'orhanguzell';
const BUNDLE_URL = process.env.BIONLUK_BUNDLE_URL ?? 'https://bionluk.com/freelancer-is-ilanlari';
const WAIT_MS = 1500;
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

// OpenClaw deseni (openclaw/src/bionluk-fetch.mjs): SUPER-KEY frontend bundle'ina
// gomulu statik uygulama kimligidir — env'de yoksa canli bundle'dan regex ile okunur.
// Public profil/ilan endpoint'leri icin login token'i (SUPER-TOKEN) gerekmez;
// BIONLUK_TOKEN set edilmisse header'a eklenir.
let SUPER_KEY = String(process.env.BIONLUK_SUPER_KEY ?? '').trim();
const SUPER_TOKEN = String(process.env.BIONLUK_TOKEN ?? '').trim();

async function resolveSuperKey() {
  if (SUPER_KEY) return SUPER_KEY;
  const page = await fetch(BUNDLE_URL, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
  const html = await page.text();
  // OpenClaw regex'i: minified HTML'de tirnak yok — `src=https://...app.<hash>.js`
  const appUrl = (html.match(/src=(https:\/\/[^\s">]*app\.[0-9a-f]+\.js)/) || [])[1];
  if (!appUrl) throw new Error('app.js URL bundle sayfasinda bulunamadi (BIONLUK_BUNDLE_URL kontrol edin)');
  const js = await (await fetch(appUrl, { headers: { 'User-Agent': UA, 'accept-encoding': 'gzip' }, signal: AbortSignal.timeout(20000) })).text();
  const key = (js.match(/SUPER-KEY"\s*:\s*"([0-9a-f-]{36})"/i) || [])[1];
  if (!key) throw new Error('SUPER-KEY bundle icinde bulunamadi');
  SUPER_KEY = key;
  return SUPER_KEY;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(DOCS, file), 'utf8'));
  } catch {
    return fallback;
  }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function api(endpoint, params = {}) {
  const url = new URL(`${API_BASE}/${endpoint}/`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    if (attempt > 1) await sleep(WAIT_MS * attempt);
    try {
      const headers = {
        'SUPER-KEY': await resolveSuperKey(),
        'User-Agent': UA,
        Accept: 'application/json,text/plain,*/*',
      };
      if (SUPER_TOKEN) headers['SUPER-TOKEN'] = SUPER_TOKEN;
      const res = await fetch(url, { headers });
      const payload = await res.json().catch(() => null);
      if (!res.ok || payload?.success === false) {
        throw new Error(`${endpoint} failed: HTTP ${res.status} ${payload?.message ?? ''}`.trim());
      }
      await sleep(WAIT_MS);
      return payload?.data ?? payload;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

function asArray(payload, ...keys) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  for (const key of keys) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
}

function gigId(gig) {
  return String(gig.detail?.gig_id ?? gig.list_item?.id ?? gig.gig_id ?? gig.id);
}

function packagePriceMap(gig) {
  const packages = gig.detail?.packages ?? {};
  return Object.fromEntries(['basic', 'standard', 'premium']
    .filter((tier) => packages[tier])
    .map((tier) => [tier, Number(packages[tier].price ?? 0)]));
}

function diffReport(previousGigs, nextGigs, previousPortfolio, nextPortfolio) {
  const prevMap = new Map(previousGigs.map((gig) => [gigId(gig), gig]));
  const nextMap = new Map(nextGigs.map((gig) => [gigId(gig), gig]));
  const added = [...nextMap.keys()].filter((id) => !prevMap.has(id));
  const removed = [...prevMap.keys()].filter((id) => !nextMap.has(id));
  const priceChanges = [];
  for (const [id, next] of nextMap) {
    const prev = prevMap.get(id);
    if (!prev) continue;
    const before = packagePriceMap(prev);
    const after = packagePriceMap(next);
    for (const tier of ['basic', 'standard', 'premium']) {
      if (before[tier] !== undefined && after[tier] !== undefined && before[tier] !== after[tier]) {
        priceChanges.push(`${id} ${tier}: ${before[tier]} -> ${after[tier]}`);
      }
    }
  }
  const prevComments = new Set((previousPortfolio.comments ?? []).map((c) => String(c.comment_id ?? c.id ?? c.uuid)));
  const newComments = (nextPortfolio.comments ?? []).filter((c) => !prevComments.has(String(c.comment_id ?? c.id ?? c.uuid)));

  return [
    `# Bionluk değişiklik raporu (${today()})`,
    '',
    `- Eklenen ilan: ${added.length}${added.length ? ` (${added.join(', ')})` : ''}`,
    `- Silinen ilan: ${removed.length}${removed.length ? ` (${removed.join(', ')})` : ''}`,
    `- Fiyat değişikliği: ${priceChanges.length}`,
    ...priceChanges.map((line) => `  - ${line}`),
    `- Yeni yorum: ${newComments.length}`,
    ...newComments.map((c) => `  - ${c.comment_id ?? c.id ?? 'unknown'} · ${c.rating ?? c.grade ?? ''}`.trim()),
    '',
  ].join('\n');
}

const previousGigsRaw = await readJson('gigs-raw.json', { gigs: [] });
const previousPortfolioRaw = await readJson('profile-portfolio-raw.json', { comments: [] });

const profile = await api('get_public_profile', { username: USERNAME });
const gigListPayload = await api('get_all_gigs_by_user', { username: USERNAME });
const listItems = asArray(gigListPayload, 'gigs', 'items');
const gigs = [];

for (const item of listItems) {
  const id = item.id ?? item.gig_id;
  const slug = item.slug;
  const detail = await api('gig_detail', { gig_id: id, slug });
  gigs.push({ list_item: item, detail });
}

const portfolioPayload = await api('portfolio_get_all', { username: USERNAME });
const commentsPayload = await api('get_user_profile_comments', { username: USERNAME });
const portfolios = asArray(portfolioPayload, 'portfolios', 'items');
const comments = asArray(commentsPayload, 'comments', 'items');
const fetchedAt = new Date().toISOString();
const nextGigsRaw = { fetched_at: fetchedAt, gigs_count: gigs.length, gigs };
const nextPortfolioRaw = { fetched_at: fetchedAt, profile, portfolio_count: portfolios.length, portfolios, comments };

await fs.mkdir(DOCS, { recursive: true });
await fs.writeFile(path.join(DOCS, 'gigs-raw.json'), `${JSON.stringify(nextGigsRaw, null, 2)}\n`, 'utf8');
await fs.writeFile(path.join(DOCS, 'profile-portfolio-raw.json'), `${JSON.stringify(nextPortfolioRaw, null, 2)}\n`, 'utf8');

const report = diffReport(previousGigsRaw.gigs ?? [], gigs, previousPortfolioRaw, nextPortfolioRaw);
const reportPath = path.join(DOCS, `CHANGES-${today()}.md`);
await fs.writeFile(reportPath, report, 'utf8');
console.log(report);
console.log(`Wrote ${path.relative(ROOT, reportPath)}`);
