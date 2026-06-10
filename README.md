# guezelwebdesign

Guezel Web Design monorepo uygulaması: public Next.js frontend, Next.js admin panel ve Bun/Fastify backend.

## Stack

- `frontend`: Next.js 16, React 19, RTK Query
- `admin_panel`: Next.js 16, Biome, RTK Query
- `backend`: Bun, Fastify, MySQL, Drizzle schema definitions from `../packages/shared-backend`

## Local Setup

1. `.env.example` dosyalarını kopyalayın:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp admin_panel/.env.example admin_panel/.env
```

2. Bağımlılıkları kurun:

```bash
(cd backend && bun install)
(cd frontend && bun install)
(cd admin_panel && bun install)
```

3. Geliştirme servisleri:

```bash
(cd backend && bun run dev)
(cd frontend && bun run dev)
(cd admin_panel && bun run dev)
```

Varsayılan local portlar: backend `8044`, frontend `3044`, admin panel `3045`.

## Quality Gates

```bash
(cd frontend && bun run lint && bun run typecheck && bun run build)
(cd admin_panel && bun run check && bunx tsc --noEmit && bun run build)
(cd backend && bunx tsc --noEmit && bun run check && bun run build)
```

Şema drift kontrolü:

```bash
(cd backend && bun run schema:drift)
(cd backend && bun run schema:drift:fix)
```

`schema:drift:fix` SQL önerisi üretir; otomatik ALTER çalıştırmaz.

## Deploy Runbook

GitHub Actions `main.yml` önce kalite kapılarını çalıştırır, sonra backend, admin panel ve frontend klasörlerini `/var/www/guezelwebdesign` altına rsync eder. PM2 süreçleri ilgili `ecosystem.config.cjs` dosyalarıyla reload edilir.

Reload sonrasında smoke testler backend health, frontend root, `/de`, `/en`, `/tr`, `/de/services`, `/de/work` ve admin login formunu kontrol eder. Bu adım locale HTML marker'larını ve temel Next.js hata marker'larını doğrulayarak boş/yanlış dil/500 sayfalarının sessiz deploy olmasını engeller.

Backend runtime canlıda Bun/Node dist build üzerinden çalışır. Deploy öncesi `.env` değerlerinin gerçek sunucuda güncel olduğundan emin olun; gerçek secret değerleri repoya yazılmaz.
