// ===================================================================
// FILE: src/modules/brand/admin.routes.ts (ADMIN)
// ===================================================================

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  listBrandLogosAdmin,
  createBrandLogoAdmin,
  updateBrandLogoAdmin,
  removeBrandLogoAdmin,
} from './admin.controller';
import type { CreateBrandLogoBody, PatchBrandLogoBody, BrandListQuery } from './validation';
import { requireAuth } from '@/common/middleware/auth';
import { requireAdmin } from '@/common/middleware/roles';

const BASE = '/brands';

export async function registerBrandsAdmin(app: FastifyInstance) {
  const adminGuard = async (req: FastifyRequest, reply: FastifyReply) => {
    await requireAuth(req, reply);
    await requireAdmin(req, reply);
  };

  app.get<{ Querystring: BrandListQuery }>(
    `${BASE}`,
    { preHandler: adminGuard },
    listBrandLogosAdmin,
  );

  app.post<{ Body: CreateBrandLogoBody }>(
    `${BASE}`,
    { preHandler: adminGuard },
    createBrandLogoAdmin,
  );

  app.patch<{ Params: { id: string }; Body: PatchBrandLogoBody }>(
    `${BASE}/:id`,
    { preHandler: adminGuard },
    updateBrandLogoAdmin,
  );

  app.delete<{ Params: { id: string } }>(
    `${BASE}/:id`,
    { preHandler: adminGuard },
    removeBrandLogoAdmin,
  );
}
