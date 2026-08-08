#!/usr/bin/env node
// =============================================================
// check-seed-profiles.mjs
// -------------------------------------------------------------
// backend/src/db/seed/profiles.json ile sql/ dizininin senkron oldugunu
// dogrular. Amac: yeni bir seed dosyasi eklenip siniflandirilmadiginda
// hatayi *deploy sirasinda* degil, burada yakalamak.
//
//   bun run db:seed:profiles:check
//
// Ayrica her profil icin hangi tablolarin semasinin olusacagini kontrol eder:
// yalnizca "content:*" dosyalarinda CREATE TABLE edilen bir tablo varsa, o tablo
// baska profillerde hic olusmaz — bu sessiz bir bozukluktur, hata olarak bildirilir.
// =============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.resolve(__dirname, '../src/db/seed');
const SQL_DIR = path.join(SEED_DIR, 'sql');
const MANIFEST = path.join(SEED_DIR, 'profiles.json');

const errors = [];
const warnings = [];

if (!fs.existsSync(MANIFEST)) {
  console.error(`HATA: manifest bulunamadi: ${MANIFEST}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const profiles = Object.keys(manifest.profiles ?? {});

if (!profiles.length) errors.push('profiles.json icinde hic profil tanimli degil.');
if (!manifest.profiles?.[manifest.defaultProfile]) {
  errors.push(`defaultProfile="${manifest.defaultProfile}" tanimli profiller arasinda yok.`);
}

const diskFiles = fs
  .readdirSync(SQL_DIR)
  .filter((f) => f.endsWith('.sql'))
  .sort();

// 1) Disk <-> manifest ortusmesi
for (const f of diskFiles) {
  if (!manifest.files[f]) {
    errors.push(
      `sql/${f} profiles.json'da siniflandirilmamis. ` +
        `"schema" | "core" | "content:<profil>" degerlerinden birini ekleyin.`
    );
  }
}
for (const f of Object.keys(manifest.files)) {
  if (!diskFiles.includes(f)) {
    errors.push(`profiles.json "${f}" dosyasini listeliyor ama sql/ altinda yok (silinmis mi?).`);
  }
}

// 2) Sinif degerleri gecerli mi
const validClass = (cls) =>
  cls === 'schema' || cls === 'core' || (cls.startsWith('content:') && profiles.includes(cls.slice(8)));

for (const [f, cls] of Object.entries(manifest.files)) {
  if (!validClass(cls)) {
    errors.push(
      `sql/${f} icin gecersiz sinif: "${cls}". ` +
        `Gecerli: "schema", "core", ${profiles.map((p) => `"content:${p}"`).join(', ')}`
    );
  }
}

// 3) Sema kapsami: her tablo, en az bir "schema"/"core" dosyasinda yaratilmali
const createRe = /CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+`?([a-z0-9_]+)`?/gi;
const creators = new Map(); // tablo -> Set(dosya)

for (const f of diskFiles) {
  const sql = fs.readFileSync(path.join(SQL_DIR, f), 'utf8');
  for (const m of sql.matchAll(createRe)) {
    const table = m[1];
    if (!creators.has(table)) creators.set(table, new Set());
    creators.get(table).add(f);
  }
}

for (const [table, files] of creators) {
  const alwaysRun = [...files].some((f) => {
    const cls = manifest.files[f];
    return cls === 'schema' || cls === 'core';
  });
  if (!alwaysRun) {
    errors.push(
      `"${table}" tablosu YALNIZCA icerik dosyalarinda yaratiliyor (${[...files].join(', ')}). ` +
        `Diger profillerde bu tablo hic olusmaz. CREATE TABLE ifadesini bir "schema" dosyasina tasiyin.`
    );
  }
}

// 4) Profil basina ozet + content/<profil>/ durumu
console.log(`Seed profil kontrolu — sql/: ${diskFiles.length} dosya\n`);
for (const p of profiles) {
  const runs = diskFiles.filter((f) => {
    const cls = manifest.files[f];
    return cls === 'schema' || cls === 'core' || cls === `content:${p}`;
  });
  const contentDir = path.join(SEED_DIR, 'content', p);
  const contentFiles = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.sql'))
    : null;

  if (contentFiles === null) {
    warnings.push(`content/${p}/ dizini yok — profile ozel icerik uygulanmayacak.`);
  }

  console.log(
    `  ${p.padEnd(6)} ${manifest.profiles[p].label}\n` +
      `         sql/ : ${runs.length}/${diskFiles.length} dosya calisir\n` +
      `         content/${p}/ : ${contentFiles === null ? '(dizin yok)' : `${contentFiles.length} dosya`}`
  );
}
console.log();

for (const w of warnings) console.warn(`UYARI: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} HATA:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('OK — profiles.json ile sql/ senkron, sema kapsami tam.');
