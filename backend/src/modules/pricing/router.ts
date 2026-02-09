// =============================================================
// FILE: src/modules/pricing/router.ts
// FINAL — Public pricing routes
// - GET /pricing?locale=en
// =============================================================

import type { FastifyInstance } from 'fastify';
import { getPricingPublic } from './controller';

export async function registerPricing(fastify: FastifyInstance) {
  fastify.get('/pricing', getPricingPublic);
}
