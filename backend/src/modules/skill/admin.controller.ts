// ===================================================================
// FILE: src/modules/skill/admin.controller.ts
// FINAL — Admin CRUD for skill counters + logos (parent + i18n upsert)
// ===================================================================

import type { RouteHandler } from 'fastify';
import { randomUUID } from 'crypto';

import {
  skillListQuerySchema,
  createSkillCounterBodySchema,
  patchSkillCounterBodySchema,
  createSkillLogoBodySchema,
  patchSkillLogoBodySchema,
  type SkillListQuery,
  type CreateSkillCounterBody,
  type PatchSkillCounterBody,
  type CreateSkillLogoBody,
  type PatchSkillLogoBody,
} from './validation';

import {
  listSkillCountersMerged,
  listSkillLogosMerged,
  createSkillCounterParent,
  updateSkillCounterParent,
  deleteSkillCounterParent,
  getSkillCounterI18nRow,
  upsertSkillCounterI18nSafe,
  createSkillLogoParent,
  updateSkillLogoParent,
  deleteSkillLogoParent,
  getSkillLogoI18nRow,
  upsertSkillLogoI18nSafe,
} from './repository';

import { toBool } from '@/modules/_shared';
import { resolveLocales } from '@/modules/_shared';

// -------------------------
// LIST (admin)
// -------------------------
export const listSkillCountersAdmin: RouteHandler<{ Querystring: SkillListQuery }> = async (
  req,
  reply,
) => {
  const parsed = skillListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_query', issues: parsed.error.issues } });

  const q = parsed.data;
  const { locale, def } = await resolveLocales(req, {
    locale: q.locale,
    default_locale: q.default_locale,
  });

  const { items, total } = await listSkillCountersMerged({
    locale,
    is_active: q.is_active, // undefined => ALL
    limit: q.limit,
    offset: q.offset,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

export const listSkillLogosAdmin: RouteHandler<{ Querystring: SkillListQuery }> = async (
  req,
  reply,
) => {
  const parsed = skillListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_query', issues: parsed.error.issues } });

  const q = parsed.data;
  const { locale, def } = await resolveLocales(req, {
    locale: q.locale,
    default_locale: q.default_locale,
  });

  const { items, total } = await listSkillLogosMerged({
    locale,
    is_active: q.is_active, // undefined => ALL
    track: q.track,
    limit: q.limit,
    offset: q.offset,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

// -------------------------
// CREATE counter
// -------------------------
export const createSkillCounterAdmin: RouteHandler<{ Body: CreateSkillCounterBody }> = async (
  req,
  reply,
) => {
  const parsed = createSkillCounterBodySchema.safeParse(req.body ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });

  const b = parsed.data;
  const { locale, def } = await resolveLocales(req, { locale: b.locale });

  try {
    const id = randomUUID();
    const now = new Date();

    await createSkillCounterParent({
      id,
      percent: b.percent,
      image_url: b.image_url ?? null,
      image_asset_id: b.image_asset_id ?? null,
      is_active: toBool(b.is_active) ? 1 : 0,
      display_order: typeof b.display_order === 'number' ? b.display_order : 0,
      created_at: now,
      updated_at: now,
    });

    await upsertSkillCounterI18nSafe({
      id: randomUUID(),
      counter_id: id,
      locale,
      title: b.title,
      slug: b.slug,
    });

    // return merged list item (quick)
    const { items } = await listSkillCountersMerged({
      locale,
      is_active: undefined,
      limit: 1,
      offset: 0,
    });
    const created = items.find((x) => x.id === id) ?? null;

    return reply.code(201).send(created);
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY')
      return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    req.log.error({ err }, 'skill_counter_create_failed');
    return reply.code(500).send({ error: { message: 'skill_counter_create_failed' } });
  }
};

// -------------------------
// PATCH counter
// -------------------------
export const updateSkillCounterAdmin: RouteHandler<{
  Params: { id: string };
  Body: PatchSkillCounterBody;
}> = async (req, reply) => {
  const parsed = patchSkillCounterBodySchema.safeParse(req.body ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });

  const b = parsed.data;
  const { locale, def } = await resolveLocales(req, { locale: b.locale });

  try {
    const parentPatch: Record<string, any> = {};

    if (typeof b.percent !== 'undefined') parentPatch.percent = b.percent as any;
    if (typeof b.image_url !== 'undefined') parentPatch.image_url = b.image_url ?? null;
    if (typeof b.image_asset_id !== 'undefined')
      parentPatch.image_asset_id = b.image_asset_id ?? null;
    if (typeof b.is_active !== 'undefined') parentPatch.is_active = toBool(b.is_active) ? 1 : 0;
    if (typeof b.display_order !== 'undefined') parentPatch.display_order = b.display_order;

    if (Object.keys(parentPatch).length) {
      await updateSkillCounterParent(req.params.id, parentPatch);
    }

    const hasI18n = typeof b.title !== 'undefined' || typeof b.slug !== 'undefined';
    if (hasI18n) {
      const existing = await getSkillCounterI18nRow(req.params.id, locale);

      if (!existing) {
        if (!b.title || !b.slug) {
          return reply
            .code(400)
            .send({ error: { message: 'missing_required_translation_fields' } });
        }
        await upsertSkillCounterI18nSafe({
          id: randomUUID(),
          counter_id: req.params.id,
          locale,
          title: b.title,
          slug: b.slug,
        });
      } else {
        await upsertSkillCounterI18nSafe({
          id: existing.id,
          counter_id: req.params.id,
          locale,
          title: typeof b.title === 'string' ? b.title : existing.title,
          slug: typeof b.slug === 'string' ? b.slug : existing.slug,
        });
      }
    }

    // return merged item
    const { items } = await listSkillCountersMerged({
      locale,
      is_active: undefined,
      limit: 200,
      offset: 0,
    });
    const updated = items.find((x) => x.id === req.params.id) ?? null;
    if (!updated) return reply.code(404).send({ error: { message: 'not_found' } });

    return reply.send(updated);
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY')
      return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    req.log.error({ err }, 'skill_counter_update_failed');
    return reply.code(500).send({ error: { message: 'skill_counter_update_failed' } });
  }
};

// -------------------------
// DELETE counter
// -------------------------
export const removeSkillCounterAdmin: RouteHandler<{ Params: { id: string } }> = async (
  req,
  reply,
) => {
  const affected = await deleteSkillCounterParent(req.params.id);
  if (!affected) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.code(204).send();
};

// -------------------------
// CREATE logo
// -------------------------
export const createSkillLogoAdmin: RouteHandler<{ Body: CreateSkillLogoBody }> = async (
  req,
  reply,
) => {
  const parsed = createSkillLogoBodySchema.safeParse(req.body ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });

  const b = parsed.data;
  const { locale, def } = await resolveLocales(req, { locale: b.locale });

  try {
    const id = randomUUID();
    const now = new Date();

    await createSkillLogoParent({
      id,
      track: b.track,
      image_url: b.image_url ?? null,
      image_asset_id: b.image_asset_id ?? null,
      is_active: toBool(b.is_active) ? 1 : 0,
      display_order: typeof b.display_order === 'number' ? b.display_order : 0,
      created_at: now,
      updated_at: now,
    });

    await upsertSkillLogoI18nSafe({
      id: randomUUID(),
      logo_id: id,
      locale,
      label: b.label,
    });

    const { items } = await listSkillLogosMerged({
      locale,
      is_active: undefined,
      track: undefined,
      limit: 200,
      offset: 0,
    });
    const created = items.find((x) => x.id === id) ?? null;

    return reply.code(201).send(created);
  } catch (err: any) {
    req.log.error({ err }, 'skill_logo_create_failed');
    return reply.code(500).send({ error: { message: 'skill_logo_create_failed' } });
  }
};

// -------------------------
// PATCH logo
// -------------------------
export const updateSkillLogoAdmin: RouteHandler<{
  Params: { id: string };
  Body: PatchSkillLogoBody;
}> = async (req, reply) => {
  const parsed = patchSkillLogoBodySchema.safeParse(req.body ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });

  const b = parsed.data;
  const { locale, def } = await resolveLocales(req, { locale: b.locale });

  try {
    const parentPatch: Record<string, any> = {};

    if (typeof b.track !== 'undefined') parentPatch.track = b.track;
    if (typeof b.image_url !== 'undefined') parentPatch.image_url = b.image_url ?? null;
    if (typeof b.image_asset_id !== 'undefined')
      parentPatch.image_asset_id = b.image_asset_id ?? null;
    if (typeof b.is_active !== 'undefined') parentPatch.is_active = toBool(b.is_active) ? 1 : 0;
    if (typeof b.display_order !== 'undefined') parentPatch.display_order = b.display_order;

    if (Object.keys(parentPatch).length) {
      await updateSkillLogoParent(req.params.id, parentPatch);
    }

    const hasI18n = typeof b.label !== 'undefined';
    if (hasI18n) {
      const existing = await getSkillLogoI18nRow(req.params.id, locale);

      if (!existing) {
        if (!b.label)
          return reply
            .code(400)
            .send({ error: { message: 'missing_required_translation_fields' } });
        await upsertSkillLogoI18nSafe({
          id: randomUUID(),
          logo_id: req.params.id,
          locale,
          label: b.label,
        });
      } else {
        await upsertSkillLogoI18nSafe({
          id: existing.id,
          logo_id: req.params.id,
          locale,
          label: typeof b.label === 'string' ? b.label : existing.label,
        });
      }
    }

    const { items } = await listSkillLogosMerged({
      locale,
      is_active: undefined,
      track: undefined,
      limit: 200,
      offset: 0,
    });
    const updated = items.find((x) => x.id === req.params.id) ?? null;
    if (!updated) return reply.code(404).send({ error: { message: 'not_found' } });

    return reply.send(updated);
  } catch (err: any) {
    req.log.error({ err }, 'skill_logo_update_failed');
    return reply.code(500).send({ error: { message: 'skill_logo_update_failed' } });
  }
};

// -------------------------
// DELETE logo
// -------------------------
export const removeSkillLogoAdmin: RouteHandler<{ Params: { id: string } }> = async (
  req,
  reply,
) => {
  const affected = await deleteSkillLogoParent(req.params.id);
  if (!affected) return reply.code(404).send({ error: { message: 'not_found' } });
  return reply.code(204).send();
};
