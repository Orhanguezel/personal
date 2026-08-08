// =============================================================
// FILE: ecosystem.config.cjs  (guezelwebdesign monorepo — TEK KAYNAK)
// -------------------------------------------------------------
// Bu dosya bu kod tabanindan surulen TUM deployment'lari tanimlar.
// Ayni kod, iki marka (MIGRASYON_PLANI_gzlteknoloji_2026-08-08.md):
//
//   DEPLOY_PROFILE=gwd  -> www.guezelwebdesign.com   (de/en, DB: guezelwebdesign)
//   DEPLOY_PROFILE=gzl  -> gzlteknoloji.com          (tr,    DB: gzlteknoloji)
//
// Kullanim (VPS'te):
//   pm2 startOrRestart ecosystem.config.cjs                     # gwd (varsayilan)
//   DEPLOY_PROFILE=gzl pm2 startOrRestart ecosystem.config.cjs   # gzl
//   pm2 save
//
// NEDEN BU DOSYA VAR (2026-08-08 kesintisi):
//   Onceki uc ayri ecosystem dosyasi yanlis `cwd` (/var/www/guezelwebdesign/...)
//   ve yanlis bun yolu tasiyordu; hicbiri canlida kullanilmiyordu, canli
//   surecler elle `pm2 start` ile ayaga kaldirilmisti. Yapilandirma ile gercek
//   arasindaki bu sapma, kesinti sirasinda tanilamayi zorlastirdi.
//   Artik tek dosya, gercek canli yapilandirmanin aynisi.
//
// NODE SURUMU — DIKKAT:
//   frontend `isomorphic-dompurify -> jsdom@30 -> undici@8` zincirini tasir ve
//   undici@8 `engines: node >= 22.19` ister (webidl.util.markAsUncloneable).
//   Node 20 ile HER SSR sayfasi 500 verir. VPS'te sistem Node'u 20.x oldugu icin
//   Node 22 yan yana kuruludur: /home/orhan/.local/node22/bin/node
//   Sistem Node'u 22+'ye cikarilinca NODE_BIN env'i verilmeyebilir.
// =============================================================

const path = require('path');

const PROFILE = process.env.DEPLOY_PROFILE || 'gwd';

/** Repo koku: bu dosyanin bulundugu dizin (VPS'te /var/www/vps-guezel/guezelwebdesign) */
const ROOT = __dirname;

/** Next.js/SSR icin kullanilacak node ikilisi (undici@8 -> node>=22.19 sarti) */
const NODE_BIN = process.env.NODE_BIN || '/home/orhan/.local/node22/bin/node';

/** Backend bun ile calisir */
const BUN_BIN = process.env.BUN_BIN || '/usr/local/bin/bun';

const PROFILES = {
  // Guzel Web Design — DE ajans (de/en)
  gwd: {
    slug: 'guezelwebdesign',
    ports: { backend: 8044, frontend: 3044, admin: 3045 },
    env: {
      DEPLOY_PROFILE: 'gwd',
      SEED_PROFILE: 'gwd',
      DEFAULT_LOCALE: 'de',
    },
  },
  // GZL Teknoloji — TR yazilim/SaaS (tr). gzlteknoloji frontend'i emekli;
  // bu deployment ayni koddan, ayri DB ve ayri portlarla surulur.
  gzl: {
    slug: 'gzlteknoloji',
    ports: { backend: 8102, frontend: 3120, admin: 3121 },
    env: {
      DEPLOY_PROFILE: 'gzl',
      SEED_PROFILE: 'gzl',
      DEFAULT_LOCALE: 'tr',
    },
  },
};

const cfg = PROFILES[PROFILE];
if (!cfg) {
  throw new Error(
    `Bilinmeyen DEPLOY_PROFILE="${PROFILE}". Gecerli: ${Object.keys(PROFILES).join(', ')}`
  );
}

/** Tum uygulamalarda ortak PM2 dayaniklilik ayarlari */
const common = {
  exec_mode: 'fork',
  instances: 1,
  watch: false,
  autorestart: true,
  min_uptime: '30s',
  max_restarts: 10,
  restart_delay: 5000,
  kill_timeout: 8000,
  listen_timeout: 10000,
  combine_logs: true,
  time: true,
};

const logFile = (name, kind) => `/home/orhan/.pm2/logs/${name}.${kind}.log`;

function nextApp({ name, cwd, port }) {
  return {
    ...common,
    name,
    cwd,
    // npm/`next` binary uzerinden degil, dogrudan next ikilisini calistiriyoruz:
    // boylece interpreter'i (Node 22) kesin olarak sabitleyebiliyoruz.
    script: path.join(cwd, 'node_modules/next/dist/bin/next'),
    interpreter: NODE_BIN,
    args: `start -p ${port} -H 127.0.0.1`,
    max_memory_restart: '400M',
    env: {
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: String(port),
      NEXT_TELEMETRY_DISABLED: '1',
      ...cfg.env,
    },
    out_file: logFile(name, 'out'),
    error_file: logFile(name, 'err'),
  };
}

const backendName = `${cfg.slug}-backend`;
const frontendName = `${cfg.slug}-frontend`;
const adminName = `${cfg.slug}-admin-panel`;

module.exports = {
  apps: [
    {
      ...common,
      name: backendName,
      cwd: path.join(ROOT, 'backend'),
      script: path.join(ROOT, 'backend/dist/index.js'),
      interpreter: BUN_BIN,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: String(cfg.ports.backend),
        ...cfg.env,
      },
      out_file: logFile(backendName, 'out'),
      error_file: logFile(backendName, 'err'),
    },
    nextApp({
      name: frontendName,
      cwd: path.join(ROOT, 'frontend'),
      port: cfg.ports.frontend,
    }),
    nextApp({
      name: adminName,
      cwd: path.join(ROOT, 'admin_panel'),
      port: cfg.ports.admin,
    }),
  ],
};
