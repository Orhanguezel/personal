// ===================================================================
// FILE: src/modules/resume/controller.ts
// FINAL — Public resume (locale fallback supported)
// - GET /resume?locale=de&default_locale=en => { education: [...], experience: [...] }
// - If type provided: returns items[]
// ===================================================================

import type { RouteHandler } from 'fastify';
import { resumeListQuerySchema, type ResumeListQuery } from './validation';
import { listResumeEntries, getResumeMergedById, getResumeMergedBySlug } from './repository';
import { resolveLocales, type LocaleQueryLike } from '@/modules/_shared/locales';

const BASE_LIMIT = 200;

function pickQueryLocale(q: any): LocaleQueryLike {
  return {
    locale: typeof q?.locale === 'string' ? q.locale : undefined,
    default_locale: typeof q?.default_locale === 'string' ? q.default_locale : undefined,
  };
}

export const getResumePublic: RouteHandler<{ Querystring: ResumeListQuery }> = async (
  req,
  reply,
) => {
  const parsed = resumeListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: { message: 'invalid_query', issues: parsed.error.issues } });
  }

  const q = parsed.data;

  const { locale, def } = await resolveLocales(req, pickQueryLocale(q));

  // If type specified: return a flat list for that type
  if (q.type) {
    const { items, total } = await listResumeEntries({
      type: q.type,
      is_active: q.is_active ?? 1,
      q: q.q,
      slug: q.slug,
      orderParam: q.order,
      sort: q.sort,
      order: q.orderDir,
      limit: Math.min(q.limit ?? BASE_LIMIT, BASE_LIMIT),
      offset: q.offset ?? 0,
      locale,
      defaultLocale: def,
    });

    reply.header('x-total-count', String(total ?? 0));
    return reply.send(items);
  }

  const [edu, exp] = await Promise.all([
    listResumeEntries({
      type: 'education',
      is_active: q.is_active ?? 1,
      q: q.q,
      slug: q.slug,
      orderParam: q.order,
      sort: q.sort,
      order: q.orderDir,
      limit: Math.min(q.limit ?? BASE_LIMIT, BASE_LIMIT),
      offset: q.offset ?? 0,
      locale,
      defaultLocale: def,
    }),
    listResumeEntries({
      type: 'experience',
      is_active: q.is_active ?? 1,
      q: q.q,
      slug: q.slug,
      orderParam: q.order,
      sort: q.sort,
      order: q.orderDir,
      limit: Math.min(q.limit ?? BASE_LIMIT, BASE_LIMIT),
      offset: q.offset ?? 0,
      locale,
      defaultLocale: def,
    }),
  ]);

  reply.header('x-total-count', String((edu.total ?? 0) + (exp.total ?? 0)));

  return reply.send({
    locale,
    education: edu.items,
    experience: exp.items,
  });
};

export const getResumeEntryPublic: RouteHandler<{
  Params: { id: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));
  const row = await getResumeMergedById(locale, def, req.params.id);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};

export const getResumeEntryBySlugPublic: RouteHandler<{
  Params: { slug: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));
  const row = await getResumeMergedBySlug(locale, def, req.params.slug);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};
