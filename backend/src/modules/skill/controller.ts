// ===================================================================
// FILE: src/modules/skill/controller.ts
// FINAL — Public skills controller
// - GET /skills?locale=de
// - grouped output: counters + logos_right + logos_left
// - NO default_locale in response (per request)
// ===================================================================

import type { RouteHandler } from 'fastify';
import { skillListQuerySchema, type SkillListQuery } from './validation';
import { listSkillCountersMerged, listSkillLogosMerged } from './repository';
import { resolveLocales } from '@/modules/_shared/locales';

const BASE_LIMIT = 200;

export const getSkillsPublic: RouteHandler<{ Querystring: SkillListQuery }> = async (
  req,
  reply,
) => {
  const parsed = skillListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: { message: 'invalid_query', issues: parsed.error.issues } });
  }

  const q = parsed.data;

  // resolveLocales yine çalışsın ama def'i KULLANMIYORUZ
  const { locale } = await resolveLocales(req, { locale: q.locale });

  const limit = Math.min(q.limit ?? BASE_LIMIT, BASE_LIMIT);
  const offset = q.offset ?? 0;

  const is_active = typeof q.is_active !== 'undefined' ? q.is_active : 1;

  const [counters, logosRight, logosLeft] = await Promise.all([
    listSkillCountersMerged({ locale, is_active, limit, offset }),
    listSkillLogosMerged({ locale, is_active, track: 'right', limit, offset }),
    listSkillLogosMerged({ locale, is_active, track: 'left', limit, offset }),
  ]);

  reply.header(
    'x-total-count',
    String((counters.total ?? 0) + (logosRight.total ?? 0) + (logosLeft.total ?? 0)),
  );

  return reply.send({
    locale,
    counters: counters.items,
    logos_right: logosRight.items,
    logos_left: logosLeft.items,
  });
};
