#!/usr/bin/env bun
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const DOCS = path.join(ROOT, 'docs/bionluk');
const OUT_DIR = path.join(ROOT, 'frontend/public/assets/bionluk');
const CDN_HOST = 'bgcp.bionluk.com';

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(DOCS, file), 'utf8'));
  } catch {
    return fallback;
  }
}

function urlUuid(url) {
  const base = path.basename(new URL(url).pathname).replace(/\.[^.]+$/, '');
  return base || createHash('sha1').update(url).digest('hex').slice(0, 12);
}

function variant(url) {
  const pathname = new URL(url).pathname;
  if (pathname.includes('/1400x788/')) return '1400';
  if (pathname.includes('/526x296/')) return '526';
  return null;
}

function collectGigUrls(gigs) {
  const entries = [];
  for (const gig of gigs) {
    const gigId = String(gig.detail?.gig_id ?? gig.list_item?.id ?? 'unknown');
    const portfolios = [
      ...(gig.detail?.portfolios ?? []),
      ...(gig.list_item?.portfolios ?? []),
    ];
    for (const item of portfolios) {
      for (const key of ['imageURL', 'imageURLSmall']) {
        const url = item?.[key];
        if (typeof url === 'string' && url.includes(CDN_HOST)) entries.push({ url, prefix: `gig-${gigId}` });
      }
    }
  }
  return entries;
}

function collectPortfolioUrls(portfolios) {
  const entries = [];
  for (const pf of portfolios) {
    const prefix = `pf-${pf.uuid ?? urlUuid(pf.image_url ?? '')}`;
    const urls = [
      pf.image_url,
      pf.image_url_original,
      pf.image_url_small,
      ...(pf.items ?? []).flatMap((item) => [
        item.image_url,
        item.image_url_original,
        item.image_url_small,
        item.imageURL,
        item.imageURLSmall,
      ]),
    ];
    for (const url of urls) {
      if (typeof url === 'string' && url.includes(CDN_HOST)) entries.push({ url, prefix });
    }
  }
  return entries;
}

function outputPath(entry) {
  const suffix = variant(entry.url);
  const name = suffix
    ? `${entry.prefix}-${urlUuid(entry.url)}-${suffix}.webp`
    : `${entry.prefix}-${urlUuid(entry.url)}.webp`;
  return {
    abs: path.join(OUT_DIR, name),
    publicPath: `/assets/bionluk/${name}`,
  };
}

async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    try {
      return (await import('../frontend/node_modules/sharp/lib/index.js')).default;
    } catch {
      return null;
    }
  }
}

function runConvert(input, output) {
  return new Promise((resolve, reject) => {
    const child = spawn('convert', [input, '-quality', '86', output], { stdio: 'ignore' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`convert exited with code ${code}`));
    });
  });
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'GZLTechnologyContentSync/1.0 (+https://gzlteknoloji.com)',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`Image download failed ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

await fs.mkdir(OUT_DIR, { recursive: true });

const gigs = (await readJson('gigs-raw.json', { gigs: [] })).gigs ?? [];
const portfolios = (await readJson('profile-portfolio-raw.json', { portfolios: [] })).portfolios ?? [];
const previousMap = await readJson('image-map.json', {});
const entries = [...collectGigUrls(gigs), ...collectPortfolioUrls(portfolios)];
const unique = [...new Map(entries.map((entry) => [entry.url, entry])).values()]
  .sort((a, b) => a.url.localeCompare(b.url));
const sharp = await loadSharp();
const imageMap = { ...previousMap };

let downloaded = 0;
let skipped = 0;

for (const entry of unique) {
  const target = outputPath(entry);
  imageMap[entry.url] = target.publicPath;
  if (await exists(target.abs)) {
    skipped += 1;
    continue;
  }
  const input = await download(entry.url);
  if (sharp) {
    await sharp(input).webp({ quality: 86 }).toFile(target.abs);
  } else {
    const tmp = `${target.abs}.input`;
    await fs.writeFile(tmp, input);
    await runConvert(tmp, target.abs);
    await fs.rm(tmp, { force: true });
  }
  downloaded += 1;
}

await fs.writeFile(
  path.join(DOCS, 'image-map.json'),
  `${JSON.stringify(Object.fromEntries(Object.entries(imageMap).sort()), null, 2)}\n`,
  'utf8',
);

console.log(`Bionluk images: ${downloaded} downloaded, ${skipped} skipped, ${unique.length} mapped.`);
