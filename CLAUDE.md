# CLAUDE.md - guezelwebdesign

## Scope

This repository is the guezelwebdesign monorepo. It is not related to the Ensotek/Karbonkompozit project.

## Components

- `frontend`: public Next.js site
- `admin_panel`: Next.js admin panel
- `backend`: Bun/Fastify API
- `../packages/shared-backend`: shared backend modules and schemas used by `backend`

## Guardrails

- Do not commit secrets or real production `.env` values.
- Do not deploy from Codex source-prep tasks unless the user explicitly asks to override the current brief.
- **Sunucuda derleme YASAK.** Yayin yalniz yerelden: `bash scripts/deploy-yerel.sh` (asagida).
- After every Next.js source change, verify both `bun run build` and `bun run start` locally for the touched app.

## Local Ports

- Backend: `8044`
- Frontend: `3044`
- Admin panel: `3045`


## Deploy — marka verisi ONCE uretilir (KESIN)

`frontend/public/ui/*.json` ve `frontend/config/brand.generated.json` **git'te
tutulan ama URETILEN** dosyalardir ve icerikleri **guezelwebdesign** kurulumuna
aittir. Kaynak agaci gzlteknoloji-site'a kopyalanip dogrudan `bun run build`
calistirilirsa, gzlteknoloji.com **Guezel Web Design markasiyla** yayina girer.

**2026-08-28'de tam olarak bu oldu:** gzlteknoloji.com'un header/footer/iletisim
bolumleri "Guezel Web Design", Alman telefonu ve Grevenbroich adresini gosteriyordu.
Meta isletme dogrulamasi bu yuzden reddedildi ("Resmi isletme adinizin internet
sitesinde yer almasi gerekir").

`scripts/deploy-yerel.sh` bunu her kurulum icin ayri yapar: sunucudan o kurulumun
`.env` dosyalarini alir, `API_BASE=<o kurulumun API'si> bun run build:deploy` ile
YERELDE derler, ciktiyi o kuruluma gonderir. Ayni `.next` iki siteye gitmez.

Uretici, `company_brand.legal` blogu yoksa uyarir — footer kunyesi o kurulumda
basilmaz. Gorunur resmi unvan Meta dogrulamasi ve TTK m.39 icin zorunludur.

## SUNUCUDA DERLEME YASAK (2026-10-01, Orhan, zorunlu — hepsihal ile ayni kural)

Sunucu (`orhan@72.61.23.36`) 1 vCPU / 3.9 GB RAM ve 7 canli siteyi tasiyor. Sunucuda
`next build`/`tsc` dakikalarca tam CPU yer, build boyunca tum siteler yavaslar
(2026-09-03 CPU krizi: load 36, tum siteler dustu). 2026-10-01'de ayrica sunlar cikti:

- CI `deploy` isi sunucuda `rm -rf .next && bun run build` yapiyordu (build boyunca site
  kapali) ve 2026-08-20'den beri hic basarili olmamisti — push "deploy" degildi.
- Root ile alinmis bir build `.next`'i root'a birakmis; PM2 sureci (orhan) ISR
  onbellegine yazamamis, sayfalar haftalarca yenilenmemisti.
- Disk %100 doluydu; sunucuda build/kopya birikintisi bunun ana nedeniydi.

**Kural:**

- **Yayin yalniz:** `bash scripts/deploy-yerel.sh` — origin/main'i yerel worktree'de
  (`../.build-guezelwebdesign`) derler, rsync ile gonderir, sunucuda yalniz `.next`
  takasi + `pm2 restart` + saglik kontrolu yapar; gecmezse `.next.prev`'e geri doner.
  - `APPS="frontend admin_panel backend"` (varsayilan `frontend`), `TREES="gwd gzl"`,
    `BUILD_ONLY=1` yalniz yerel derleme.
- **Sunucuda yasak:** `bun run build`, `build:deploy`, `next build`, `tsc`, `bun test`,
  Playwright/Chromium, lighthouse. Sunucuda `/etc/vps-guezel-derleme-yasak` varken build
  betikleri kendiliginden durur (`scripts/derleme-kilidi.mjs`); kilidi asma, isaret
  dosyasini silme. Tek istisna Orhan'in acik acil durum onayi: `SUNUCUDA_DERLE=evet-acil`.
- **Push deploy degildir.** GitHub Actions yalniz kalite kapisi (lint/tsc/build) calistirir.
- **Sunucuda `sudo` ile build/yazma yapma** — dosyalar root'a gecer, PM2 yazamaz.
- **Deploy'dan once:** `df -h /` (bos alan >= 3 GB), `git status` temiz commit, kalite
  kapisi yesil. Sunucuda `.next-*`, `*.bak`, eski kopya biriktirme; geri donus icin
  yalniz tek `.next.prev` tutulur.
- Sunucu agacinda commit'lenmemis elle degisiklik var: sunucuda `git pull` ile yayin yapma.
- **Entegrasyon uclari (2026-10-01):** `/api/v1/integrations/tanitio` (Tanitio yalniz gzlteknoloji.com'u
  okur; anahtar yalniz gzl `.env`'inde, gwd'de BOS — onceden iki sitede ayni anahtar vardi) ve
  `/api/v1/integrations/gzl-crm` (anahtar tanimsiz → 503; `gzl_crm_content_imports` tablosu iki
  canli DB'de kurulu, 2026-10-01). Tanitio kiraci metinleri `site_settings.tanitio_content_source`'tan
  gelir (gzl seed 054); ayar yoksa notr yanit.
- **Admin paneli Next surumu (2026-10-01):** panel `next 16.1.1`'e SABITLENDI. Sunucuda
  panelin kendi `node_modules/next`'i yoktu; Next kokten **15.5.25** cozuluyordu
  (GZLTemizlik'in kok kurulumu, 2026-09-03) ve 16 ile derlenmis panel en az 2026-09-27'den
  beri `Invariant: Expected clientReferenceManifest` ile 500 veriyordu (iki kurulumda da).
  Duzeltme: sunucuda `admin_panel/node_modules/next` -> ayni agacin `frontend/node_modules/next`
  (16.1.1) symlink'i. Paneli yayinlarken yerel Next de 16.1.1 olmali (deploy-yerel.sh kontrol eder).
