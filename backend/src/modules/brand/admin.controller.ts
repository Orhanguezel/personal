// ===================================================================
// FILE: src/modules/brand/admin.controller.ts
// FINAL — Admin CRUD for brand logos (parent + i18n upsert)
// ===================================================================

import type { RouteHandler } from 'fastify';
import { randomUUID } from 'crypto';

import {
  brandListQuerySchema,
  createBrandLogoBodySchema,
  patchBrandLogoBodySchema,
  type BrandListQuery,
  type CreateBrandLogoBody,
  type PatchBrandLogoBody,
} from './validation';

import {
  listBrandLogosMerged,
  createBrandLogoParent,
  updateBrandLogoParent,
  deleteBrandLogoParent,
  getBrandLogoI18nRow,
  upsertBrandLogoI18nSafe,
} from './repository';

import { toBool } from '@/modules/_shared';
import { resolveLocales } from '@/modules/_shared';

// -------------------------
// LIST (admin)
// -------------------------
export const listBrandLogosAdmin: RouteHandler<{ Querystring: BrandListQuery }> = async (
  req,
  reply,
) => {
  const parsed = brandListQuerySchema.safeParse(req.query ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_query', issues: parsed.error.issues } });

  const q = parsed.data;
  const { locale } = await resolveLocales(req, {
    locale: q.locale,
    default_locale: (req.query as any)?.default_locale,
  });

  const { items, total } = await listBrandLogosMerged({
    locale,
    is_active: q.is_active,
    track: q.track,
    limit: q.limit,
    offset: q.offset,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

// -------------------------
// CREATE logo
// -------------------------
export const createBrandLogoAdmin: RouteHandler<{ Body: CreateBrandLogoBody }> = async (
  req,
  reply,
) => {
  const parsed = createBrandLogoBodySchema.safeParse(req.body ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });

  const b = parsed.data;
  const { locale } = await resolveLocales(req, { locale: b.locale });

  try {
    const id = randomUUID();
    const now = new Date();

    await createBrandLogoParent({
      id,
      track: b.track,
      image_url: b.image_url ?? null,
      image_asset_id: b.image_asset_id ?? null,
      is_active: toBool(b.is_active) ? 1 : 0,
      display_order: typeof b.display_order === 'number' ? b.display_order : 0,
      created_at: now,
      updated_at: now,
    });

    await upsertBrandLogoI18nSafe({
      id: randomUUID(),
      logo_id: id,
      locale,
      label: b.label,
    });

    const { items } = await listBrandLogosMerged({
      locale,
      is_active: undefined,
      limit: 200,
      offset: 0,
    });
    const created = items.find((x) => x.id === id) ?? null;

    return reply.code(201).send(created);
  } catch (err: any) {
    req.log.error({ err }, 'brand_logo_create_failed');
    return reply.code(500).send({ error: { message: 'brand_logo_create_failed' } });
  }
};

// -------------------------
// PATCH logo
// -------------------------
export const updateBrandLogoAdmin: RouteHandler<{
  Params: { id: string };
  Body: PatchBrandLogoBody;
}> = async (req, reply) => {
  const parsed = patchBrandLogoBodySchema.safeParse(req.body ?? {});
  if (!parsed.success)
    return reply
      .code(400)
      .send({ error: { message: 'invalid_body', issues: parsed.error.issues } });

  const b = parsed.data;
  const { locale } = await resolveLocales(req, { locale: b.locale });

  try {
    const parentPatch: Record<string, any> = {};

    if (typeof b.track !== 'undefined') parentPatch.track = b.track;
    if (typeof b.image_url !== 'undefined') parentPatch.image_url = b.image_url ?? null;
    if (typeof b.image_asset_id !== 'undefined') parentPatch.image_asset_id = b.image_asset_id ?? null;
    if (typeof b.is_active !== 'undefined') parentPatch.is_active = toBool(b.is_active) ? 1 : 0;
    if (typeof b.display_order !== 'undefined') parentPatch.display_order = b.display_order;

    if (Object.keys(parentPatch).length) {
      await updateBrandLogoParent(req.params.id, parentPatch);
    }

    if (typeof b.label !== 'undefined') {
      const existing = await getBrandLogoI18nRow(req.params.id, locale);

      if (!existing) {
        if (!b.label) {
          return reply
            .code(400)
            .send({ error: { message: 'missing_required_translation_fields' } });
        }
        await upsertBrandLogoI18nSafe({
          id: randomUUID(),
          logo_id: req.params.id,
          locale,
          label: b.label,
        });
      } else {
        await upsertBrandLogoI18nSafe({
          id: existing.id,
          logo_id: req.params.id,
          locale,
          label: typeof b.label === 'string' ? b.label : existing.label,
        });
      }
    }

    const { items } = await listBrandLogosMerged({
      locale,
      is_active: undefined,
      limit: 200,
      offset: 0,
    });
    const updated = items.find((x) => x.id === req.params.id) ?? null;

    return reply.send(updated);
  } catch (err: any) {
    req.log.error({ err }, 'brand_logo_update_failed');
    return reply.code(500).send({ error: { message: 'brand_logo_update_failed' } });
  }
};

// -------------------------
// DELETE logo
// -------------------------
export const removeBrandLogoAdmin: RouteHandler<{ Params: { id: string } }> = async (
  req,
  reply,
) => {
  await deleteBrandLogoParent(req.params.id);
  return reply.code(204).send();
};
