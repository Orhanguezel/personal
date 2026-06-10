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

