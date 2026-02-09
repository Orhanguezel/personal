// ===================================================================
// FILE: src/modules/dashboard/admin.routes.ts
// FINAL — Admin Dashboard Summary Routes
// - GET /api/admin/dashboard/summary
// ===================================================================

import type { FastifyInstance } from 'fastify';
import { requireAuth } from '@/common/middleware/auth';
import { getDashboardSummaryAdmin } from './admin.controller';

const BASE = '/dashboard';

export async function registerDashboardAdmin(app: FastifyInstance) {
  app.get(`${BASE}/summary`, { preHandler: [requireAuth] }, getDashboardSummaryAdmin);
}
