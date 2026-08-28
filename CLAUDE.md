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
- For production rollout, use the guarded server build flow on `guezel-yeni-root`.
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

Her frontend deploy'unda **build'den once** o kurulumun kendi API'siyle uret:

```bash
# gzlteknoloji.com
cd /var/www/vps-guezel/gzlteknoloji-site/frontend
API_BASE=https://gzlteknoloji.com/api/v1 bun run build:deploy

# guezelwebdesign.com
cd /var/www/vps-guezel/guezelwebdesign/frontend
API_BASE=https://www.guezelwebdesign.com/api/v1 bun run build:deploy
```

`build:deploy` = `ui:generate` + `next build`. Duz `bun run build` **kullanma**.
Build Node 22 ister: `export PATH=/home/orhan/.local/node22/bin:$PATH`.

Uretici, `company_brand.legal` blogu yoksa uyarir — footer kunyesi o kurulumda
basilmaz. Gorunur resmi unvan Meta dogrulamasi ve TTK m.39 icin zorunludur.
