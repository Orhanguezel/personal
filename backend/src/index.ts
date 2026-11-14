import {startContentWorker} from './modules/shared-content/worker';
// src/index.ts
// src/index.ts
import { createApp } from './app';
import { env } from '@/core/env';
import { writeStartupFailure } from '@/core/logger';
import type { FastifyInstance } from 'fastify';

async function main() {
  const app: FastifyInstance = await createApp();

  // Only bind to localhost unless explicitly overridden
  const host = (process.env.HOST ?? '127.0.0.1') as string;

  let stopWorker=()=>{};app.addHook('onClose',async()=>stopWorker());
  await app.listen({ port: env.PORT, host });

  stopWorker=startContentWorker();
  app.log.info({ host, port: env.PORT }, 'api_listening');
}

main().catch((e) => {
  writeStartupFailure(e);
  process.exit(1);
});
