// ===================================================================
// FILE: src/modules/resume/admin.controller.ts
// FINAL — Admin controller (locale fallback supported)
// - LIST supports ?locale=xx&default_locale=yy
// - CRUD parent + i18n upsert
// ===================================================================

import type { RouteHandler } from 'fastify';
import { randomUUID } from 'crypto';

import { resumeListQuerySchema, upsertResumeBodySchema, patchResumeBodySchema } from './validation';
import type { ResumeListQuery, UpsertResumeBody, PatchResumeBody } from './validation';

import {
  listResumeEntries,
  getResumeMergedById,
  getResumeMergedBySlug,
  createResumeParent,
  updateResumeParent,
  deleteResumeParent,
  getResumeI18nRow,
  upsertResumeI18nSafe,
} from './repository';

import { toBool } from '@/modules/_shared';
import { resolveLocales, type LocaleQueryLike } from '@/modules/_shared';

function pickQueryLocale(q: any): LocaleQueryLike {
  return {
    locale: typeof q?.locale === 'string' ? q.locale : undefined,
    default_locale: typeof q?.default_locale === 'string' ? q.default_locale : undefined,
  };
}

export const listResumeAdmin: RouteHandler<{ Querystring: ResumeListQuery }> = async (
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

  const { items, total } = await listResumeEntries({
    type: q.type,
    is_active: q.is_active, // undefined => ALL (admin)
    q: q.q,
    slug: q.slug,
    orderParam: q.order,
    sort: q.sort,
    order: q.orderDir,
    limit: q.limit,
    offset: q.offset,
    locale,
    defaultLocale: def,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

export const getResumeAdmin: RouteHandler<{
  Params: { id: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));
  const row = await getResumeMergedById(locale, def, req.params.id);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};

export const getResumeBySlugAdmin: RouteHandler<{
  Params: { slug: string };
  Querystring: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, pickQueryLocale(req.query));
  const row = await getResumeMergedBySlug(locale, def, req.params.slug);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.send(row);
};

export const createResumeAdmin: RouteHandler<{ Body: UpsertResumeBody }> = async (req, reply) => {
  const parsed = upsertResumeBodySchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });
  }
  const b = parsed.data;

  const { locale } = await resolveLocales(req, { locale: b.locale });

  try {
    const id = randomUUID();
    const now = new Date();

    await createResumeParent({
      id,
      type: b.type,
      is_active: toBool(b.is_active) ? 1 : 0,
      display_order: typeof b.display_order === 'number' ? b.display_order : 0,

      start_date: b.start_date,
      end_date: b.end_date ?? null,
      is_current: toBool(b.is_current) ? 1 : 0,

      location: b.location ?? null,
      organization: b.organization ?? null,

      score_value: typeof b.score_value === 'number' ? b.score_value : null,
      score_scale: typeof b.score_scale === 'number' ? b.score_scale : 5,

      created_at: now,
      updated_at: now,
    });

    await upsertResumeI18nSafe({
      id: randomUUID(),
      entry_id: id,
      locale,
      title: b.title,
      subtitle: b.subtitle,
      description: b.description ?? null,
      highlights_json: (b as any).highlights ?? null, // already transformed by validation
      slug: b.slug,
    });

    const row = await getResumeMergedById(locale, locale, id);
    return reply.code(201).send(row);
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    }
    req.log.error({ err }, 'resume_create_failed');
    return reply.code(500).send({ error: { message: 'resume_create_failed' } });
  }
};

export const updateResumeAdmin: RouteHandler<{
  Params: { id: string };
  Body: PatchResumeBody;
}> = async (req, reply) => {
  const parsed = patchResumeBodySchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });
  }
  const b = parsed.data;

  const { locale } = await resolveLocales(req, { locale: b.locale });

  try {
    // ----- parent patch
    const parentPatch: Record<string, any> = {};

    if (typeof b.type !== 'undefined') parentPatch.type = b.type;
    if (typeof b.is_active !== 'undefined') parentPatch.is_active = toBool(b.is_active) ? 1 : 0;
    if (typeof b.display_order !== 'undefined') parentPatch.display_order = b.display_order;

    if (typeof b.start_date !== 'undefined') parentPatch.start_date = b.start_date as any;
    if (typeof b.end_date !== 'undefined') parentPatch.end_date = b.end_date as any;
    if (typeof b.is_current !== 'undefined') parentPatch.is_current = toBool(b.is_current) ? 1 : 0;

    if (typeof b.location !== 'undefined') parentPatch.location = b.location ?? null;
    if (typeof b.organization !== 'undefined') parentPatch.organization = b.organization ?? null;

    if (typeof b.score_value !== 'undefined')
      parentPatch.score_value = (b.score_value as any) ?? null;
    if (typeof b.score_scale !== 'undefined') parentPatch.score_scale = b.score_scale ?? 5;

    if (Object.keys(parentPatch).length) {
      await updateResumeParent(req.params.id, parentPatch);
    }

    // ----- i18n patch/upsert
    const hasI18n =
      typeof b.title !== 'undefined' ||
      typeof b.subtitle !== 'undefined' ||
      typeof b.description !== 'undefined' ||
      typeof (b as any).highlights !== 'undefined' ||
      typeof b.slug !== 'undefined';

    if (hasI18n) {
      const existing = await getResumeI18nRow(req.params.id, locale);

      if (!existing) {
        if (!b.title || !b.subtitle || !b.slug) {
          return reply
            .code(400)
            .send({ error: { message: 'missing_required_translation_fields' } });
        }

        await upsertResumeI18nSafe({
          id: randomUUID(),
          entry_id: req.params.id,
          locale,
          title: b.title,
          subtitle: b.subtitle,
          description: typeof b.description === 'string' ? b.description : null,
          highlights_json: (b as any).highlights ?? null,
          slug: b.slug,
        });
      } else {
        await upsertResumeI18nSafe({
          id: existing.id,
          entry_id: req.params.id,
          locale,
          title: typeof b.title === 'string' ? b.title : existing.title,
          subtitle: typeof b.subtitle === 'string' ? b.subtitle : existing.subtitle,
          description:
            typeof b.description !== 'undefined'
              ? (b.description as any)
              : (existing.description ?? null),
          highlights_json:
            typeof (b as any).highlights !== 'undefined'
              ? ((b as any).highlights as any)
              : (existing.highlights_json ?? null),
          slug: typeof b.slug === 'string' ? b.slug : existing.slug,
        });
      }
    }

  const row = await getResumeMergedById(locale, locale, req.params.id);
    if (!row) return reply.code(404).send({ error: { message: 'not_found' } });
    return reply.send(row);
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    }
    req.log.error({ err }, 'resume_update_failed');
    return reply.code(500).send({ error: { message: 'resume_update_failed' } });
  }
};

export const removeResumeAdmin: RouteHandler<{ Params: { id: string } }> = async (req, reply) => {
  const affected = await deleteResumeParent(req.params.id);
  if (!affected) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.code(204).send();
};
