// =============================================================
// FILE: src/modules/pricing/admin.routes.ts
// FINAL — Admin pricing routes
// - /admin/pricing/plans
// =============================================================

import type { FastifyInstance } from 'fastify';
import {
  adminListPlans,
  adminGetPlan,
  adminCreatePlan,
  adminPatchPlan,
  adminDeletePlan,
} from './admin.controller';

const BASE = '/pricing';

export async function registerPricingAdmin(fastify: FastifyInstance) {
  // ✅ Eğer projede admin auth hook varsa buraya bağla:
  // fastify.addHook('preHandler', fastify.verifyAdmin);

  // Plans
  fastify.get(`${BASE}/plans`, adminListPlans);
  fastify.get(`${BASE}/plans/:id`, adminGetPlan);
  fastify.post(`${BASE}/plans`, adminCreatePlan);
  fastify.patch(`${BASE}/plans/:id`, adminPatchPlan);
  fastify.delete(`${BASE}/plans/:id`, adminDeletePlan);
}
