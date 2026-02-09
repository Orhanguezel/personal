// ===================================================================
// FILE: src/modules/brand/router.ts (PUBLIC)
// ===================================================================

import type { FastifyInstance } from 'fastify';
import { getBrandsPublic } from './controller';

export async function registerBrands(app: FastifyInstance) {
  app.get('/brands', getBrandsPublic);
}
