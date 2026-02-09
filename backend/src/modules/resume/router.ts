// ===================================================================
// FILE: src/modules/resume/router.ts
// FINAL — Public routes
// ===================================================================

import type { FastifyInstance } from 'fastify';
import { getResumePublic, getResumeEntryPublic, getResumeEntryBySlugPublic } from './controller';

const BASE = '/resume';

export async function registerResume(app: FastifyInstance) {
  // GET /resume?locale=tr => grouped education+experience (or type=education)
  app.get(`${BASE}`, { config: { public: true } }, getResumePublic);

  // single
  app.get(`${BASE}/:id`, { config: { public: true } }, getResumeEntryPublic);
  app.get(`${BASE}/by-slug/:slug`, { config: { public: true } }, getResumeEntryBySlugPublic);
}
