// FILE: src/plugins/staticUploads.ts
import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import type { FastifyInstance } from 'fastify';

export default fp(async (app: FastifyInstance) => {
  const uploadsDir = path.resolve(process.cwd(), 'uploads');

  app.register(fastifyStatic, {
    root: process.env.CONTENT_SHARED_ENABLED==='1'&&process.env.CONTENT_MEDIA_ROOT?[process.env.CONTENT_MEDIA_ROOT,uploadsDir]:uploadsDir,
    prefix: '/uploads/', // https://www.ensotek.de/uploads/...
  });
});
