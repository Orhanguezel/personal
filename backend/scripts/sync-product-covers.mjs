#!/usr/bin/env node
// =============================================================
// sync-product-covers.mjs
// -------------------------------------------------------------
// Urunler sayfasindaki kart gorsellerini, workspace'teki KANONIK proje
// kapaklarindan uretir.
//
// NEDEN VAR (2026-08-29): /tr/urunler kartlarinin gorselleri elle konmus
// yer tutuculardi — ikisi duz degrade uzerine yazi (7-9 KB), biri kirpilmis
// logo. Oysa ayni projelerin PROJECT_PORTFOLIO_STANDARD.md'ye uygun
// 3200x2000 kapaklari zaten uretilmis durumda duruyordu.
//
// KAYNAK SAHIPLIGI — DIKKAT:
//   `project.portfolio.json` GZL Gelir CRM'in repoya yazdigi PROJEKSIYONDUR.
//   Bu betik manifesti YALNIZCA OKUR, asla yazmaz. Manifest kanonik kapagi
//   gostermiyorsa (legacy yol) durum `manifestDrift` olarak RAPORLANIR ve
//   duzeltme CRM kontrol duzlemine birakilir.
//
// IZIN KAPISI:
//   Bir kapak ancak manifestte `displayPermission` ve `rightsConfirmed`
//   ikisi de true ise yayina cikar. Aksi halde atlanir ve raporda gorunur.
//
// Kullanim:
//   node backend/scripts/sync-product-covers.mjs                # dry-run + rapor
//   node backend/scripts/sync-product-covers.mjs --write        # backend/uploads/products altina yaz
//   node backend/scripts/sync-product-covers.mjs --write --out /tmp/kapaklar
//   GZL_PROJECTS_ROOT=/baska/yol node backend/scripts/sync-product-covers.mjs
// =============================================================

import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

/** Workspace koku — tum projelerin bulundugu dizin. */
const workspaceRoot = resolve(process.env.GZL_PROJECTS_ROOT || resolve(repoRoot, '../..'));

/** Kart gorselinin web boyutu. Kart 240px yuksekliginde `object-fit: cover`
 *  ile kirpiliyor; kapaklarin dogal orani 16:10, ayni oranda uretiyoruz. */
const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 1000;
const QUALITY = 82;

/** Kanonik kapak yolu — PROJECT_PORTFOLIO_STANDARD.md "Gorsel Standardi". */
const STANDARD_COVER = 'docs/portfolio/assets/00-cover.png';

/**
 * Site urun slug'i -> workspace proje dizini.
 * `file` alani DB'deki `image_url` ile birebir ayni olmalidir
 * (029_saas_products_seed.sql).
 */
const PRODUCTS = [
  { slug: 'geoserra', project: 'vps-guezel/geoserra', file: 'geoserra.webp' },
  { slug: 'sosyal-medya-platformu', project: 'ekosistem-sosyal-medya', file: 'sozial.webp' },
  { slug: 'katalogai', project: 'tarim-dijital-ekosistem/projects/katalogAI', file: 'katalogai.webp' },
  { slug: 'scraper-api', project: 'vps-guezel/scraper-service', file: 'scraper-api.webp' },
  // 2026-08-29 karar (Orhan): kart yalnizca Ihracat Radari olarak kalir.
  // Onceki gorsel market_pulse kapagiydi ve uzerinde MarketPulse markasi vardi
  // — Ihracat Radari kartinda YANLIS MARKA gosteriyordu.
  { slug: 'ihracat-radari', project: 'ihracatradari.com.tr', file: 'ihracat-radari.webp' },
];

const args = process.argv.slice(2);
const write = args.includes('--write');
const outIndex = args.indexOf('--out');
const outDir = resolve(
  outIndex >= 0 && args[outIndex + 1] ? args[outIndex + 1] : join(repoRoot, 'backend/uploads/products'),
);

function readManifest(projectDir) {
  const file = join(projectDir, 'project.portfolio.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function pickCoverEntry(manifest) {
  const media = Array.isArray(manifest?.media) ? manifest.media : [];
  return media.find((m) => m?.role === 'cover') ?? null;
}

/** Manifestteki `src` diske cozulebiliyorsa mutlak yolu, yoksa null doner. */
function resolveManifestSource(projectDir, src) {
  if (typeof src !== 'string' || !src.trim()) return null;
  const value = src.trim();
  // Kok-egik yollar (`/assets/imgs/...`) bir WEB yoludur, dosya sistemi degil.
  const candidate = isAbsolute(value) ? value : join(projectDir, value);
  if (!isAbsolute(value) && existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (isAbsolute(value) && existsSync(value) && statSync(value).isFile()) return value;
  return null;
}

async function convert(source, target) {
  await execFileAsync(
    'convert',
    [source, '-resize', `${TARGET_WIDTH}x${TARGET_HEIGHT}`, '-quality', String(QUALITY), target],
    { timeout: 120_000 },
  );
}

const report = [];

for (const product of PRODUCTS) {
  const projectDir = join(workspaceRoot, product.project);
  const row = {
    slug: product.slug,
    project: product.project,
    file: product.file,
    status: 'pending',
    source: null,
    manifestDrift: false,
    notes: [],
  };

  if (!existsSync(projectDir)) {
    row.status = 'project_missing';
    row.notes.push(`proje dizini yok: ${projectDir}`);
    report.push(row);
    continue;
  }

  const manifest = readManifest(projectDir);
  if (!manifest) {
    row.status = 'manifest_missing';
    row.notes.push('project.portfolio.json okunamadi — CRM projeksiyon uretmeli');
    report.push(row);
    continue;
  }

  const cover = pickCoverEntry(manifest);
  if (!cover) {
    row.status = 'cover_entry_missing';
    row.notes.push('manifestte role="cover" kaydi yok');
    report.push(row);
    continue;
  }

  if (cover.displayPermission !== true || cover.rightsConfirmed !== true) {
    row.status = 'permission_denied';
    row.notes.push(
      `yayin izni kapali (displayPermission=${cover.displayPermission}, rightsConfirmed=${cover.rightsConfirmed})`,
    );
    report.push(row);
    continue;
  }

  let source = resolveManifestSource(projectDir, cover.src);
  if (!source) {
    const standard = join(projectDir, STANDARD_COVER);
    if (existsSync(standard)) {
      source = standard;
      row.manifestDrift = true;
      row.notes.push(
        `manifest "${cover.src}" diske cozulmedi; standart kapaga dusuldu (${STANDARD_COVER}). ` +
          'CRM kontrol duzleminde media.src guncellenmeli.',
      );
    }
  }

  if (!source) {
    row.status = 'cover_file_missing';
    row.notes.push(
      `ne manifest yolu ne de ${STANDARD_COVER} bulundu — kapak PROJECT_PORTFOLIO_STANDARD.md'ye gore uretilmeli`,
    );
    report.push(row);
    continue;
  }

  row.source = source;
  row.alt = typeof cover.alt === 'string' ? cover.alt : '';

  if (!write) {
    row.status = 'ready';
    report.push(row);
    continue;
  }

  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, product.file);
  try {
    await convert(source, target);
    const size = statSync(target).size;
    row.status = 'written';
    row.target = target;
    row.bytes = size;
  } catch (error) {
    row.status = 'convert_failed';
    row.notes.push(String(error?.message ?? error));
  }
  report.push(row);
}

const summary = {
  workspaceRoot,
  outDir: write ? outDir : null,
  mode: write ? 'write' : 'dry-run',
  target: `${TARGET_WIDTH}x${TARGET_HEIGHT} webp q${QUALITY}`,
  ok: report.filter((r) => r.status === 'written' || r.status === 'ready').length,
  blocked: report.filter((r) => !['written', 'ready'].includes(r.status)).length,
  manifestDrift: report.filter((r) => r.manifestDrift).map((r) => r.project),
  products: report,
};

console.log(JSON.stringify(summary, null, 2));
if (summary.blocked > 0) process.exitCode = 1;
