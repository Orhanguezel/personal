// FILE: src/plugins/staticUploads.ts
import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import type { FastifyInstance } from 'fastify';

export default fp(async (app: FastifyInstance) => {
  const uploadsDir = path.resolve(
    process.env.LOCAL_STORAGE_ROOT || path.join(process.cwd(), 'uploads'),
  );

  app.register(fastifyStatic, {
    root:
      process.env.CONTENT_SHARED_ENABLED === '1' && process.env.CONTENT_MEDIA_ROOT
        ? [uploadsDir, process.env.CONTENT_MEDIA_ROOT]
        : uploadsDir,
    prefix: '/uploads/', // https://www.ensotek.de/uploads/...
  });
  if (process.env.CONTENT_SHARED_ENABLED === '1' && process.env.CONTENT_MEDIA_ROOT)
    app.register(fastifyStatic, {
      root: process.env.CONTENT_MEDIA_ROOT,
      prefix: '/media/shared/',
      decorateReply: false,
    });
});
