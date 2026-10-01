import type { FastifyInstance } from 'fastify';
import { requireAuth } from '@vps/shared-backend/middleware/auth';
import { requireAdmin } from '@vps/shared-backend/middleware/roles';
import { registerSharedPublic, registerSharedAdmin, registerSeoRoutes } from './routes/shared';
import { registerTanitioContentSource } from './modules/tanitio-content-source/router';
import { registerGzlCrmContentIntegration } from './modules/gzl-crm-content/router';

export async function registerAllRoutes(app: FastifyInstance) {
  // SEO routes at root level (robots.txt, sitemap.xml, /seo/meta)
  await registerSeoRoutes(app);

  async function registerVersionedApi(api: FastifyInstance) {
    // Admin routes — auth + admin role required
    await api.register(async (adminApi) => {
      adminApi.addHook('onRequest', requireAuth);
      adminApi.addHook('onRequest', requireAdmin);
      await registerSharedAdmin(adminApi);
    }, { prefix: '/admin' });

    // Public routes
    await registerSharedPublic(api);
    await api.register(registerTanitioContentSource, { prefix: '/integrations/tanitio' });
    await api.register(registerGzlCrmContentIntegration, { prefix: '/integrations/gzl-crm' });
  }

  await app.register(async (api) => {
    await api.register(registerVersionedApi, { prefix: '/v1' });
    await api.register(registerVersionedApi);
  }, { prefix: '/api' });
}
