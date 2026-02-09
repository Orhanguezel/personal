// ===================================================================
// FILE: src/modules/brand/controller.ts
// FINAL — Public brands controller
// - GET /brands?locale=de
// - grouped output: logos_right + logos_left
// - NO default_locale in response (per request)
// ===================================================================

import type { RouteHandler } from 'fastify';
import { brandListQuerySchema, type BrandListQuery } from './validation';
import { listBrandLogosMerged } from './repository';
import { resolveLocales } from '@/modules/_shared';

const BASE_LIMIT = 200;

export const getBrandsPublic: RouteHandler<{ Querystring: BrandListQuery }> = async (req, reply) => {
  const parsed = brandListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: { message: 'invalid_query', issues: parsed.error.issues } });
  }

  const q = parsed.data;

  const { locale } = await resolveLocales(req, { locale: q.locale });

  const limit = Math.min(q.limit ?? BASE_LIMIT, BASE_LIMIT);
  const offset = q.offset ?? 0;

  const is_active = typeof q.is_active !== 'undefined' ? q.is_active : 1;

  const [logosRight, logosLeft] = await Promise.all([
    listBrandLogosMerged({ locale, is_active, track: 'right', limit, offset }),
    listBrandLogosMerged({ locale, is_active, track: 'left', limit, offset }),
  ]);

  reply.header('x-total-count', String((logosRight.total ?? 0) + (logosLeft.total ?? 0)));

  return reply.send({
    locale,
    logos_right: logosRight.items,
    logos_left: logosLeft.items,
  });
};
