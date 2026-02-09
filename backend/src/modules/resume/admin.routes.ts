// ===================================================================
// FILE: src/modules/resume/admin.routes.ts
// FINAL — Admin routes for resume entries
// ===================================================================

import type { FastifyInstance } from 'fastify';
import {
  listResumeAdmin,
  getResumeAdmin,
  getResumeBySlugAdmin,
  createResumeAdmin,
  updateResumeAdmin,
  removeResumeAdmin,
} from './admin.controller';

const BASE = '/resume-entries';

export async function registerResumeAdmin(app: FastifyInstance) {
  app.get(`${BASE}`, listResumeAdmin);
  app.get(`${BASE}/:id`, getResumeAdmin);
  app.get(`${BASE}/by-slug/:slug`, getResumeBySlugAdmin);

  app.post(`${BASE}`, createResumeAdmin);
  app.patch(`${BASE}/:id`, updateResumeAdmin);
  app.delete(`${BASE}/:id`, removeResumeAdmin);
}
