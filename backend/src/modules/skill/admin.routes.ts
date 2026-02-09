// ===================================================================
// FILE: src/modules/skill/admin.routes.ts
// FINAL — Skill admin routes
// - Mount under /admin
// ===================================================================

import type { FastifyInstance } from 'fastify';
import {
  listSkillCountersAdmin,
  listSkillLogosAdmin,
  createSkillCounterAdmin,
  updateSkillCounterAdmin,
  removeSkillCounterAdmin,
  createSkillLogoAdmin,
  updateSkillLogoAdmin,
  removeSkillLogoAdmin,
} from './admin.controller';

const BASE_ADMIN_COUNTERS = '/skill-counters';
const BASE_ADMIN_LOGOS = '/skill-logos';

export async function registerSkillAdmin(app: FastifyInstance) {
  // Counters
  app.get(BASE_ADMIN_COUNTERS, listSkillCountersAdmin);
  app.post(BASE_ADMIN_COUNTERS, createSkillCounterAdmin);
  app.patch(`${BASE_ADMIN_COUNTERS}/:id`, updateSkillCounterAdmin);
  app.delete(`${BASE_ADMIN_COUNTERS}/:id`, removeSkillCounterAdmin);

  // Logos
  app.get(BASE_ADMIN_LOGOS, listSkillLogosAdmin);
  app.post(BASE_ADMIN_LOGOS, createSkillLogoAdmin);
  app.patch(`${BASE_ADMIN_LOGOS}/:id`, updateSkillLogoAdmin);
  app.delete(`${BASE_ADMIN_LOGOS}/:id`, removeSkillLogoAdmin);
}
