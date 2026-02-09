// =============================================================
// FILE: src/app.ts
// FIX: Audit module single-entry mount (registerAudit) + remove duplicate stream mount
// =============================================================

import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import authPlugin from './plugins/authPlugin';
import mysqlPlugin from '@/plugins/mysql';
import staticUploads from './plugins/staticUploads';
import { localeMiddleware } from '@/common/middleware/locale';

import type { FastifyInstance } from 'fastify';
import { env } from '@/core/env';
import { registerErrorHandlers } from '@/core/error';

// Public modüller
import { registerAuth } from '@/modules/auth/router';
import { registerStorage } from '@/modules/storage/router';
import { registerProfiles } from '@/modules/profiles/router';
import { registerCustomPages } from '@/modules/customPages/router';
import { registerSiteSettings } from '@/modules/siteSettings/router';
import { registerUserRoles } from '@/modules/userRoles/router';
import { registerFaqs } from '@/modules/faqs/router';
import { registerServices } from '@/modules/services/router';
import { registerMenuItems } from '@/modules/menuItems/router';
import { registerSlider } from '@/modules/slider/router';
import { registerContacts } from '@/modules/contact/router';
import { registerEmailTemplates } from '@/modules/email-templates/router';
import { registerFooterSections } from '@/modules/footerSections/router';
import { registerMail } from '@/modules/mail/router';
import { registerNewsletter } from '@/modules/newsletter/router';
import { registerNotifications } from '@/modules/notifications/router';
import { registerReviews } from '@/modules/review/router';
import { registerSupport } from '@/modules/support/router';
import { registerProject } from '@/modules/projects/router';
import { registerPricing } from '@/modules/pricing/router';
import { registerResume } from '@/modules/resume/router';
import { registerAudit } from '@/modules/audit/router';
import { registerSkill} from '@/modules/skill/router';
import { registerBrands } from '@/modules/brand/router';
import { registerSeoRoutes } from '@/modules/seo/router';
import { registerAvailability } from '@/modules/availability/router';
import { registerBookings } from '@/modules/bookings/router';
import { registerResources } from '@/modules/resources/router';

// Admin modüller
import { registerCustomPagesAdmin } from '@/modules/customPages/admin.routes';
import { registerSiteSettingsAdmin } from '@/modules/siteSettings/admin.routes';
import { registerUserAdmin } from '@/modules/auth/admin.routes';
import { registerFaqsAdmin } from '@/modules/faqs/admin.routes';
import { registerServicesAdmin } from '@/modules/services/admin.routes';
import { registerStorageAdmin } from '@/modules/storage/admin.routes';
import { registerMenuItemsAdmin } from '@/modules/menuItems/admin.routes';
import { registerSliderAdmin } from '@/modules/slider/admin.routes';
import { registerContactsAdmin } from '@/modules/contact/admin.routes';
import { registerDbAdmin } from '@/modules/db_admin/admin.routes';
import { registerEmailTemplatesAdmin } from '@/modules/email-templates/admin.routes';
import { registerFooterSectionsAdmin } from '@/modules/footerSections/admin.routes';
import { registerNewsletterAdmin } from '@/modules/newsletter/admin.routes';
import { registerReviewsAdmin } from '@/modules/review/admin.routes';
import { registerSupportAdmin } from '@/modules/support/admin.routes';
import { registerDashboardAdmin } from '@/modules/dashboard/admin.routes';
import { registerProjectAdmin } from '@/modules/projects/admin.routes';
import { registerPricingAdmin } from '@/modules/pricing/admin.routes';
import { registerResumeAdmin } from '@/modules/resume/admin.routes';
import { registerSkillAdmin } from '@/modules/skill/admin.routes';
import { registerBrandsAdmin } from '@/modules/brand/admin.routes';
import { registerAvailabilityAdmin } from '@/modules/availability/admin.routes';
import { registerResourcesAdmin } from '@/modules/resources/admin.routes';
import { registerBookingsAdmin } from '@/modules/bookings/admin.routes';

function parseCorsOrigins(v?: string | string[]): boolean | string[] {
  if (!v) return true;
  if (Array.isArray(v)) return v;
  const s = String(v).trim();
  if (!s) return true;
  const arr = s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  return arr.length ? arr : true;
}

export async function createApp() {
  const { default: buildFastify } = (await import('fastify')) as unknown as {
    default: (opts?: Parameters<FastifyInstance['log']['child']>[0]) => FastifyInstance;
  };

  const app = buildFastify({
    logger: env.NODE_ENV !== 'production',
  }) as FastifyInstance;

  await app.register(cors, {
    origin: parseCorsOrigins(env.CORS_ORIGIN as any),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-lang',
      'Prefer',
      'Accept',
      'Accept-Language',
      'X-Locale',
      'x-skip-auth',
      'Range',
    ],
    exposedHeaders: ['x-total-count', 'content-range', 'range'],
  });

  const cookieSecret =
    (globalThis as any).Bun?.env?.COOKIE_SECRET ?? process.env.COOKIE_SECRET ?? 'cookie-secret';

  await app.register(cookie, {
    secret: cookieSecret,
    hook: 'onRequest',
    parseOptions: {
      httpOnly: true,
      path: '/',
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: env.NODE_ENV === 'production',
    },
  });

  await app.register(jwt, {
    secret: env.JWT_SECRET,
    cookie: { cookieName: 'access_token', signed: false },
  });

  app.addHook('onRequest', localeMiddleware);

  await app.register(authPlugin);
  await app.register(mysqlPlugin);


  await app.register(multipart, {
    throwFileSizeLimit: true,
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  await app.register(staticUploads);

  // SEO public routes (robots.txt + sitemap.xml + /seo/meta)
  await registerSeoRoutes(app);

  await app.register(
    async (api) => {
      api.get('/health', async () => ({ ok: true }));
      await api.register(async (i) => registerAudit(i), { prefix: '/admin' });
      await api.register(async (i) => registerCustomPagesAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerSiteSettingsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerUserAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerFaqsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerServicesAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerStorageAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerMenuItemsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerSliderAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerContactsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerDbAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerEmailTemplatesAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerFooterSectionsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerNewsletterAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerReviewsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerSupportAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerDashboardAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerProjectAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerPricingAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerResumeAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerSkillAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerBrandsAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerAvailabilityAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerResourcesAdmin(i), { prefix: '/admin' });
      await api.register(async (i) => registerBookingsAdmin(i), { prefix: '/admin' });

      // --- Public modüller: /api/...
      await registerAuth(api);
      await registerStorage(api);
      await registerProfiles(api);
      await registerCustomPages(api);
      await registerSiteSettings(api);
      await registerUserRoles(api);
      await registerFaqs(api);
      await registerServices(api);
      await registerMenuItems(api);
      await registerSlider(api);
      await registerContacts(api);
      await registerEmailTemplates(api);
      await registerFooterSections(api);
      await registerMail(api);
      await registerNewsletter(api);
      await registerNotifications(api);
      await registerReviews(api);
      await registerSupport(api);
      await registerProject(api);
      await registerPricing(api);
      await registerResume(api);
      await registerSkill(api);
      await registerBrands(api);
      await registerAvailability(api);
      await registerResources(api);
      await registerBookings(api);
    },
    { prefix: '/api' },
  );

  registerErrorHandlers(app);
  return app;
}
