# Fastify + Drizzle + Bun Starter

Small production-style API starter extracted from the Guezel Web Design stack.

## Stack

- Bun runtime
- Fastify 5
- Drizzle ORM
- MySQL
- Zod environment validation
- CORS and typed health endpoint

## Usage

```bash
cp .env.example .env
bun install
bun run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

## Publish Prep

Before publishing as OSS:

- Add CI for `bun run typecheck`.
- Replace the example schema with the first reusable module.
