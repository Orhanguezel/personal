// src/db/seed/index.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { env } from '@/core/env';
import { cleanSql, splitStatements, logStep } from './utils';

// ESM için __dirname/__filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Flags = {
  noDrop?: boolean;
  only?: string[]; // ör: ["40","41","50"] -> sadece o dosyalar
  profile?: string; // ör: "gzl" -> --profile=gzl (SEED_PROFILE env'ini ezer)
};

function parseFlags(argv: string[]): Flags {
  const flags: Flags = {};
  for (const a of argv.slice(2)) {
    if (a === '--no-drop') flags.noDrop = true;
    else if (a.startsWith('--only=')) {
      flags.only = a.replace('--only=', '').split(',').map(s => s.trim());
    } else if (a.startsWith('--profile=')) {
      flags.profile = a.replace('--profile=', '').trim();
    }
  }
  return flags;
}

// ─── Seed profilleri ─────────────────────────────────────────────────────────
// Ayni kod tabani iki markayi sunar (MIGRASYON_PLANI_gzlteknoloji_2026-08-08.md):
//   SEED_PROFILE=gwd -> Guzel Web Design (de/en)
//   SEED_PROFILE=gzl -> GZL Teknoloji (tr)
// Sema ortak, icerik ayridir. Siniflandirma: profiles.json

type FileClass = 'schema' | 'core' | `content:${string}`;

type ProfileManifest = {
  defaultProfile: string;
  profiles: Record<string, { label: string; defaultLocale: string; locales: string[] }>;
  files: Record<string, FileClass>;
};

function loadManifest(): ProfileManifest {
  // dist/ altinda calisirken profiles.json build ciktisina kopyalanmis olur;
  // kaynaktan calisirken de ayni dizinde durur.
  const candidates = [
    path.resolve(__dirname, 'profiles.json'),
    path.resolve(__dirname, '../../../src/db/seed/profiles.json'),
  ];
  const found = candidates.find(p => fs.existsSync(p));
  if (!found) {
    throw new Error(
      `Seed profil manifestosu bulunamadi. Arananlar:\n  ${candidates.join('\n  ')}`
    );
  }
  return JSON.parse(fs.readFileSync(found, 'utf8')) as ProfileManifest;
}

function resolveProfile(manifest: ProfileManifest, flags: Flags): string {
  const profile = (flags.profile || process.env.SEED_PROFILE || manifest.defaultProfile).trim();
  if (!manifest.profiles[profile]) {
    throw new Error(
      `Bilinmeyen SEED_PROFILE="${profile}". Gecerli profiller: ${Object.keys(manifest.profiles).join(', ')}`
    );
  }
  return profile;
}

/**
 * sql/ altindaki bir dosya bu profilde calismali mi?
 * Siniflandirilmamis dosyada FAIL-CLOSED durur: sessizce yanlis markanin
 * icerigini basmaktansa seed'in patlamasi yeglenir.
 */
function shouldRunForProfile(
  manifest: ProfileManifest,
  profile: string,
  fileName: string
): boolean {
  const cls = manifest.files[fileName];
  if (!cls) {
    throw new Error(
      `Seed dosyasi profiles.json'da siniflandirilmamis: "${fileName}".\n` +
      `backend/src/db/seed/profiles.json -> "files" altina ekleyin.\n` +
      `Gecerli siniflar: "schema" (saf DDL), "core" (her deployment'in onyukleme verisi), ` +
      `"content:<profil>" (yalnizca o markanin icerigi).`
    );
  }
  if (cls === 'schema' || cls === 'core') return true;
  if (cls.startsWith('content:')) return cls === `content:${profile}`;
  throw new Error(`profiles.json icinde gecersiz sinif: "${cls}" (dosya: ${fileName})`);
}

function assertSafeToDrop(dbName: string) {
  const allowDrop = process.env.ALLOW_DROP === 'true';
  const isProd = process.env.NODE_ENV === 'production';
  const isSystem = ['mysql','information_schema','performance_schema','sys'].includes(dbName.toLowerCase());
  if (isSystem) throw new Error(`Sistem DB'si drop edilemez: ${dbName}`);
  if (isProd && !allowDrop) throw new Error('Prod ortamda DROP için ALLOW_DROP=true bekleniyor.');
}

async function dropAndCreate(root: mysql.Connection) {
  assertSafeToDrop(env.DB.name);
  await root.query(`DROP DATABASE IF EXISTS \`${env.DB.name}\`;`);
  await root.query(
    `CREATE DATABASE \`${env.DB.name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
}

async function createRoot(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: env.DB.host,
    port: env.DB.port,
    user: env.DB.user,
    password: env.DB.password,
    multipleStatements: true,
  });
}

async function createConnToDb(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: env.DB.host,
    port: env.DB.port,
    user: env.DB.user,
    password: env.DB.password,
    database: env.DB.name,
    multipleStatements: true,
    // unicode_ci ile uyumlu
    charset: 'utf8mb4_unicode_ci',
  });
}

function shouldRun(file: string, flags: Flags) {
  if (!flags.only?.length) return true;
  const m = path.basename(file).match(/^(\d+)/);
  const prefix = m?.[1];
  return prefix ? flags.only.includes(prefix) : false;
}

/** admin değişkenlerini ENV'den oku + bcrypt üret */
function getAdminVars() {
  const email = (process.env.ADMIN_EMAIL || 'orhanguzell@gmail.com').trim();
  const id = (process.env.ADMIN_ID || '4f618a8d-6fdb-498c-898a-395d368b2193').trim();
  const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = bcrypt.hashSync(plainPassword, 12);
  return { email, id, passwordHash };
}

/** SQL string güvenli tek tırnak escape */
function sqlStr(v: string) {
  return v.replaceAll("'", "''");
}

/** Dosyayı oku, temizle, admin değişkenleri enjekte et ve opsiyonel yer tutucu değiştir */
function prepareSqlForRun(rawSql: string, admin: { email: string; id: string; passwordHash: string }) {
  // Dosyadaki comment/boşluk temizliği
  let sql = cleanSql(rawSql);

  // Header ile session değişkenlerini set et (dosyada COALESCE olsa bile önce biz set ediyoruz)
  const header = [
    `SET @ADMIN_EMAIL := '${sqlStr(admin.email)}';`,
    `SET @ADMIN_ID := '${sqlStr(admin.id)}';`,
    `SET @ADMIN_PASSWORD_HASH := '${sqlStr(admin.passwordHash)}';`
  ].join('\n');

  // Eski yer tutucu kalıplarını da destekle (örn: {{ADMIN_BCRYPT}})
  sql = sql
    .replaceAll('{{ADMIN_BCRYPT}}', admin.passwordHash)
    .replaceAll('{{ADMIN_PASSWORD_HASH}}', admin.passwordHash)
    .replaceAll('{{ADMIN_EMAIL}}', admin.email)
    .replaceAll('{{ADMIN_ID}}', admin.id);

  // En üstte header'ı ekle
  sql = `${header}\n${sql}`;

  return sql;
}

/** Bir SQL dosyasinin DROP edecegi tablolari cikarir */
function dropTargets(sql: string): string[] {
  const out = new Set<string>();
  for (const m of sql.matchAll(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?`?([a-z0-9_]+)`?/gi)) {
    out.add(m[1].toLowerCase());
  }
  return [...out];
}

/**
 * VERI KAYBI KORUMASI.
 *
 * Sema dosyalarinin 14'u `DROP TABLE IF EXISTS` iceriyor — yani "sema" dosyasi
 * calistirmak YIKICIDIR. `--no-drop` bayragi yalnizca DATABASE drop'unu atlar,
 * bu DROP TABLE'lari ENGELLEMEZ.
 *
 * 2026-08-09'da bu yuzden canli veri kaybedildi: urun kolonlari eklenirken
 * calistirilan tam seed, ilerleyen bir dosyada duplicate-key hatasiyla yarida
 * kesildi; ama o noktaya gelene kadar services / pricing_plans / faqs
 * tablolarini dusurup bos birakmisti. Sayfalar sessizce bosaldi.
 *
 * Bu kontrol, calistirilacak dosyalarin DROP edecegi tablolardan HERHANGI BIRI
 * DOLU ise seed'i durdurur. Bilerek yapiliyorsa: ALLOW_DESTRUCTIVE=true
 */
async function assertNoDestructiveDrop(
  conn: mysql.Connection,
  files: Array<{ file: string; abs: string }>,
) {
  if (process.env.ALLOW_DESTRUCTIVE === 'true') {
    logStep('⚠️  ALLOW_DESTRUCTIVE=true — dolu tablolarin dusurulmesine izin verildi');
    return;
  }

  const targets = new Map<string, string[]>(); // tablo -> onu dusuren dosyalar
  for (const { file, abs } of files) {
    for (const t of dropTargets(fs.readFileSync(abs, 'utf8'))) {
      targets.set(t, [...(targets.get(t) ?? []), file]);
    }
  }
  if (!targets.size) return;

  const nonEmpty: Array<{ table: string; rows: number; files: string[] }> = [];
  for (const [table, srcFiles] of targets) {
    try {
      const [rows] = await conn.query<any[]>(
        `SELECT COUNT(*) AS n FROM \`${table}\``,
      );
      const n = Number(rows?.[0]?.n ?? 0);
      if (n > 0) nonEmpty.push({ table, rows: n, files: srcFiles });
    } catch {
      // tablo yok -> dusurulecek bir veri de yok
    }
  }
  if (!nonEmpty.length) return;

  const detail = nonEmpty
    .map((x) => `  - ${x.table}: ${x.rows} satir  (${x.files.join(', ')})`)
    .join('\n');

  throw new Error(
    'VERI KAYBI ONLENDI: calistirilacak sema dosyalari DOLU tablolari ' +
      'DROP edecek.\n' +
      detail +
      '\n\nSeed dosyalari DROP TABLE + CREATE TABLE deseni kullaniyor; ' +
      '`--no-drop` bunu engellemez.\n' +
      'Bilerek yapiyorsaniz: ALLOW_DESTRUCTIVE=true ile calistirin ' +
      '(once yedek alin).',
  );
}

async function runSqlFile(conn: mysql.Connection, absPath: string, adminVars: { email: string; id: string; passwordHash: string }) {
  const name = path.basename(absPath);
  logStep(`⏳ ${name} çalışıyor...`);
  const raw = fs.readFileSync(absPath, 'utf8');

  const sql = prepareSqlForRun(raw, adminVars);
  const statements = splitStatements(sql);

  // bağlantı karakter seti & timezone
  await conn.query('SET NAMES utf8mb4;');
  await conn.query("SET time_zone = '+00:00';");

  for (const stmt of statements) {
    if (!stmt) continue;
    await conn.query(stmt);
  }
  logStep(`✅ ${name} bitti`);
}

async function main() {
  const flags = parseFlags(process.argv);

  // 0) Profil cozumle — hangi markanin icerigi basilacak?
  const manifest = loadManifest();
  const profile = resolveProfile(manifest, flags);
  const profileInfo = manifest.profiles[profile];
  logStep(
    `🏷️  Seed profili: ${profile} — ${profileInfo.label} ` +
    `(varsayilan locale: ${profileInfo.defaultLocale}, DB: ${env.DB.name})`
  );

  // 1) Root ile drop + create (opsiyonel)
  const root = await createRoot();
  try {
    if (!flags.noDrop) {
      logStep('💣 DROP + CREATE başlıyor');
      await dropAndCreate(root);
      logStep('🆕 DB oluşturuldu');
    } else {
      logStep('⤵️ --no-drop: DROP/CREATE atlanıyor');
    }
  } finally {
    await root.end();
  }

  // 2) DB bağlantısı
  const conn = await createConnToDb();

  try {
    // 3) Admin değişkenlerini hazırla (tek sefer)
    const ADMIN = getAdminVars();

    // 3.1) Dinamik portfolio seedlerini kaynaktan yeniden uret
    const validatorPath = path.resolve(__dirname, '../../../scripts/validate-project-portfolios.mjs');
    if (fs.existsSync(validatorPath)) {
      logStep('🔎 Proje metadata standartlari kontrol ediliyor');
      execFileSync('node', [validatorPath], { stdio: 'inherit' });
    }

    const generatorPath = path.resolve(__dirname, '../../../scripts/generate-dynamic-portfolio-seeds.mjs');
    if (fs.existsSync(generatorPath)) {
      logStep('♻️ Dinamik portfolio seedleri guncelleniyor');
      execFileSync('node', [generatorPath], { stdio: 'inherit' });
    }

    // 4) SQL klasörünü bul (öncelik env, sonra dist/sql, yoksa src/sql)
    const envDir = process.env.SEED_SQL_DIR && process.env.SEED_SQL_DIR.trim();
    const distSql = path.resolve(__dirname, 'sql');
    const srcSql  = path.resolve(__dirname, '../../../src/db/seed/sql');
    const sqlDir  = envDir ? path.resolve(envDir) : (fs.existsSync(distSql) ? distSql : srcSql);

    const files = fs.readdirSync(sqlDir)
      .filter(f => f.endsWith('.sql'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    // Profil filtresini once TOPLUCA uygula: siniflandirilmamis bir dosya varsa
    // DB'ye tek satir yazmadan, en basta patlasin.
    const plan = files.map(f => ({ file: f, run: shouldRunForProfile(manifest, profile, f) }));
    const skipped = plan.filter(p => !p.run);
    if (skipped.length) {
      logStep(
        `⏭️ ${skipped.length} icerik dosyasi "${profile}" profiline ait olmadigi icin atlanacak`
      );
    }

    // Calistirilacak nihai liste (profil + --only filtreleri uygulanmis)
    const toRun = plan
      .filter((p) => p.run)
      .map((p) => ({ file: p.file, abs: path.join(sqlDir, p.file) }))
      .filter((p) => shouldRun(p.abs, flags));

    for (const { file: f } of plan) {
      if (!plan.find((p) => p.file === f)?.run) continue;
      if (!toRun.some((p) => p.file === f)) logStep(`⏭️ ${f} atlandı (--only filtresi)`);
    }

    // Dolu tabloyu dusurecek bir sema dosyasi varsa BURADA dur (bkz.
    // assertNoDestructiveDrop): tek satir bile yazmadan hata verir.
    await assertNoDestructiveDrop(conn, toRun);

    for (const { file: f, abs } of toRun) {
      await runSqlFile(conn, abs, ADMIN);
    }

    // 5) Profile ozel icerik: content/<profil>/*.sql
    const contentDirCandidates = [
      path.resolve(sqlDir, '../content', profile),
      path.resolve(__dirname, 'content', profile),
      path.resolve(__dirname, '../../../src/db/seed/content', profile),
    ];
    const contentDir = contentDirCandidates.find(d => fs.existsSync(d));

    if (!contentDir) {
      logStep(`ℹ️ content/${profile}/ dizini yok — profile ozel icerik atlandi`);
    } else {
      const contentFiles = fs.readdirSync(contentDir)
        .filter(f => f.endsWith('.sql'))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      if (!contentFiles.length) {
        logStep(`ℹ️ content/${profile}/ bos — profile ozel icerik yok`);
      } else {
        logStep(`📦 content/${profile}/ — ${contentFiles.length} icerik dosyasi`);
        for (const f of contentFiles) {
          const abs = path.join(contentDir, f);
          if (!shouldRun(abs, flags)) {
            logStep(`⏭️ ${f} atlandı (--only filtresi)`);
            continue;
          }
          await runSqlFile(conn, abs, ADMIN);
        }
      }
    }

    logStep(`🎉 Seed tamamlandı (profil: ${profile}).`);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
