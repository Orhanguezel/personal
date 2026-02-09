// ===================================================================
// FILE: src/modules/faqs/admin.controller.ts
// FINAL — NO category/sub_category
// - locale çözümü MERKEZİ: query/body > req.locale > runtime default (DB) > build default
// - LIST query param locale destekli (RTK ile bire bir)
// - Dynamic LOCALES runtime (site_settings) ile uyumlu: resolveLocales() helper
// ===================================================================

import type { RouteHandler } from 'fastify';
import { randomUUID } from 'crypto';

import {
  listFaqs,
  getFaqMergedById,
  getFaqMergedBySlug,
  createFaqParent,
  upsertFaqI18n,
  updateFaqParent,
  deleteFaqParent,
  getFaqI18nRow,
} from './repository';

import {
  faqListQuerySchema,
  upsertFaqBodySchema,
  patchFaqBodySchema,
  type FaqListQuery,
  type UpsertFaqBody,
  type PatchFaqBody,
} from './validation';

import { toBool } from '@/modules/_shared';
import { resolveLocales, type LocaleQueryLike } from '@/modules/_shared/locales';

// ------------------------------
// Helpers
// ------------------------------

function pickQueryLocale(q: any): LocaleQueryLike {
  // RTK: ?locale=xx
  // Admin: default_locale gerekirse query’den de geçebilir
  return {
    locale: typeof q?.locale === 'string' ? q.locale : undefined,
    default_locale: typeof q?.default_locale === 'string' ? q.default_locale : undefined,
  };
}

// ===================================================================
// LIST (admin)
// ===================================================================

export const listFaqsAdmin: RouteHandler<{ Querystring: FaqListQuery }> = async (req, reply) => {
  const parsed = faqListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success) {
    return reply.code(400).send({
      error: { message: 'invalid_query', issues: parsed.error.issues },
    });
  }
  const q = parsed.data;

  const { locale, def } = await resolveLocales(req, pickQueryLocale(q));

  const { items, total } = await listFaqs({
    // sorting
    orderParam: typeof q.order === 'string' ? q.order : undefined,
    sort: q.sort,
    order: q.orderDir,

    // paging
    limit: q.limit,
    offset: q.offset,

    // filters
    is_active: q.is_active, // admin: optional
    q: q.q,
    slug: q.slug,

    // i18n
    locale,
    defaultLocale: def,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

// ===================================================================
// GET BY ID (admin) — supports ?locale=xx
// ===================================================================

export const getFaqAdmin: RouteHandler<{
  Params: { id: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));

  const row = await getFaqMergedById(locale, def, req.params.id);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};

// ===================================================================
// GET BY SLUG (admin) — supports ?locale=xx
// ===================================================================

export const getFaqBySlugAdmin: RouteHandler<{
  Params: { slug: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));

  const row = await getFaqMergedBySlug(locale, def, req.params.slug);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};

// ===================================================================
// CREATE (admin)
// ===================================================================

export const createFaqAdmin: RouteHandler<{ Body: UpsertFaqBody }> = async (req, reply) => {
  const parsed = upsertFaqBodySchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return reply.code(400).send({
      error: { message: 'invalid_body', issues: parsed.error.issues },
    });
  }
  const b = parsed.data;

  // body.locale > req.locale > defaults
  const { locale, def } = await resolveLocales(req, { locale: b.locale });

  try {
    const id = randomUUID();
    const now = new Date();

    await createFaqParent({
      id,
      is_active: toBool(b.is_active) ? 1 : 0,
      display_order: typeof b.display_order === 'number' ? b.display_order : 0,
      created_at: now as any,
      updated_at: now as any,
    } as any);

    await upsertFaqI18n(id, locale, {
      question: b.question.trim(),
      answer: b.answer,
      slug: b.slug.trim(),
    });

    const row = await getFaqMergedById(locale, def, id);
    return reply.code(201).send(row);
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    }
    req.log.error({ err }, 'faqs_create_failed');
    return reply.code(500).send({ error: { message: 'faqs_create_failed' } });
  }
};

// ===================================================================
// UPDATE (admin)
// ===================================================================

export const updateFaqAdmin: RouteHandler<{ Params: { id: string }; Body: PatchFaqBody }> = async (
  req,
  reply,
) => {
  const parsed = patchFaqBodySchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return reply.code(400).send({
      error: { message: 'invalid_body', issues: parsed.error.issues },
    });
  }
  const b = parsed.data;

  // body.locale > req.locale > defaults
  const { locale, def } = await resolveLocales(req, { locale: b.locale });

  try {
    const parentPatch: Record<string, any> = {};

    if (typeof b.is_active !== 'undefined') parentPatch.is_active = toBool(b.is_active) ? 1 : 0;
    if (typeof b.display_order !== 'undefined') parentPatch.display_order = b.display_order;

    if (Object.keys(parentPatch).length > 0) {
      await updateFaqParent(req.params.id, parentPatch as any);
    }

    const hasI18nFields =
      typeof b.question !== 'undefined' ||
      typeof b.answer !== 'undefined' ||
      typeof b.slug !== 'undefined';

    if (hasI18nFields) {
      const existing = await getFaqI18nRow(req.params.id, locale);

      if (!existing) {
        // yeni locale ekleniyor => required alanlar zorunlu
        if (!b.question || !b.answer || !b.slug) {
          return reply
            .code(400)
            .send({ error: { message: 'missing_required_translation_fields' } });
        }
        await upsertFaqI18n(req.params.id, locale, {
          question: b.question.trim(),
          answer: b.answer,
          slug: b.slug.trim(),
        });
      } else {
        await upsertFaqI18n(req.params.id, locale, {
          question: typeof b.question === 'string' ? b.question.trim() : undefined,
          answer: typeof b.answer === 'string' ? b.answer : undefined,
          slug: typeof b.slug === 'string' ? b.slug.trim() : undefined,
        });
      }
    }

    const row = await getFaqMergedById(locale, def, req.params.id);
    if (!row) return reply.code(404).send({ error: { message: 'not_found' } });

    return reply.send(row);
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    }
    req.log.error({ err }, 'faqs_update_failed');
    return reply.code(500).send({ error: { message: 'faqs_update_failed' } });
  }
};

// ===================================================================
// DELETE (admin)
// ===================================================================

export const removeFaqAdmin: RouteHandler<{ Params: { id: string } }> = async (req, reply) => {
  const affected = await deleteFaqParent(req.params.id);
  if (!affected) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.code(204).send();
};
