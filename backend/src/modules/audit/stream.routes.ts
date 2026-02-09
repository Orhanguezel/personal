// =============================================================
// FILE: src/modules/audit/stream.routes.ts
// Ensotek – Audit Stream Routes (SSE)
//   - Mounted under /api/admin
//   - Final URL:
//       GET /api/admin/audit/stream
// =============================================================

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { requireAuth as requireAuthMw } from '@/common/middleware/auth';
import { requireAdmin as requireAdminMw } from '@/common/middleware/roles';

import { handleAuditStreamSse } from './stream.controller';

const BASE = '/audit';

export async function registerAuditStream(app: FastifyInstance) {
  const requireAuth = (app as any).requireAuth as
    | ((req: FastifyRequest, reply: FastifyReply) => Promise<void>)
    | undefined;

  const requireAdmin = (app as any).requireAdmin as
    | ((req: FastifyRequest, reply: FastifyReply) => Promise<void>)
    | undefined;

  const adminGuard = async (req: FastifyRequest, reply: FastifyReply) => {
    if (typeof requireAuth === 'function') {
      await requireAuth(req, reply);
      if (reply.sent) return;
    } else {
      await requireAuthMw(req, reply);
      if (reply.sent) return;
    }

    if (typeof requireAdmin === 'function') {
      await requireAdmin(req, reply);
    } else {
      await requireAdminMw(req, reply);
    }
  };

  const ph = { preHandler: adminGuard, config: { auth: true, admin: true } };

  app.get(`${BASE}/stream`, ph, handleAuditStreamSse);
}
