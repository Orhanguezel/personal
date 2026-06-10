import cors from '@fastify/cors';
import Fastify from 'fastify';
import { sql } from 'drizzle-orm';

import { db, pool } from './db';
import { env } from './env';

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
});

app.get('/health', async () => {
  const [result] = await db.execute(sql`SELECT 1 AS ok`);
  return {
    ok: true,
    db: result,
  };
});

app.get('/', async () => ({
  name: '@guezel/fastify-drizzle-bun-starter',
  endpoints: ['/health'],
}));

const shutdown = async () => {
  await app.close();
  await pool.end();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

await app.listen({
  host: env.HOST,
  port: env.PORT,
});
