// ===================================================================
// FILE: src/modules/faqs/controller.ts
// FINAL — NO category/sub_category
// - Public endpoints locale query destekli: ?locale=tr
// - Dynamic LOCALES runtime (site_settings) ile uyumlu: resolveLocales()
// ===================================================================

import type { RouteHandler } from 'fastify';

import { listFaqs, getFaqMergedById, getFaqMergedBySlug } from './repository';
import { faqListQuerySchema, type FaqListQuery } from './validation';

import { resolveLocales, type LocaleQueryLike } from '@/modules/_shared/locales';

function pickQueryLocale(q: any): LocaleQueryLike {
  return {
    locale: typeof q?.locale === 'string' ? q.locale : undefined,
    default_locale: typeof q?.default_locale === 'string' ? q.default_locale : undefined,
  };
}

/** LIST (public) */
export const listFaqsPublic: RouteHandler<{ Querystring: FaqListQuery }> = async (req, reply) => {
  const parsed = faqListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success) {
    return reply.code(400).send({
      error: { message: 'invalid_query', issues: parsed.error.issues },
    });
  }

  const q = parsed.data;

  // ✅ locale: query > req.locale > runtime/default
  const { locale, def } = await resolveLocales(req, pickQueryLocale(q));

  const { items, total } = await listFaqs({
    orderParam: typeof q.order === 'string' ? q.order : undefined,
    sort: q.sort,
    order: q.orderDir,
    limit: q.limit,
    offset: q.offset,

    // public default: active
    is_active: typeof q.is_active === 'undefined' ? 1 : q.is_active,

    q: q.q,
    slug: q.slug,

    locale,
    defaultLocale: def,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

/** GET BY ID (public) — supports ?locale=xx */
export const getFaqPublic: RouteHandler<{
  Params: { id: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));

  const row = await getFaqMergedById(locale, def, req.params.id);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};

/** GET BY SLUG (public) — supports ?locale=xx */
export const getFaqBySlugPublic: RouteHandler<{
  Params: { slug: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));

  const row = await getFaqMergedBySlug(locale, def, req.params.slug);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};
