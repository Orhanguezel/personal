// =============================================================
// FILE: src/modules/pricing/admin.controller.ts
// FINAL — Admin pricing CRUD (plans only)
// =============================================================

import type { FastifyReply, FastifyRequest } from 'fastify';
import { pricingRepo } from './repository';
import { AdminUpsertPricingPlanSchema, AdminPatchPricingPlanSchema } from './validation';

import { toFeaturesArray, toBool, uuid, asDecimalString } from '@/modules/_shared';

// ----------------------------- Plans -----------------------------

export async function adminListPlans(req: FastifyRequest, reply: FastifyReply) {
  const { limit, offset } = ((req as any).query ?? {}) as any;

  const data = await pricingRepo.adminListPlans({
    limit: limit ? Number(limit) : 50,
    offset: offset ? Number(offset) : 0,
  });

  return reply.send(data);
}

export async function adminGetPlan(req: FastifyRequest, reply: FastifyReply) {
  const id = String((req as any).params?.id || '').trim();
  if (!id) return reply.status(400).send({ message: 'Missing id' });

  const data = await pricingRepo.adminGetPlan(id);
  if (!data) return reply.status(404).send({ message: 'Not found' });

  return reply.send(data);
}

export async function adminCreatePlan(req: FastifyRequest, reply: FastifyReply) {
  const parsed = AdminUpsertPricingPlanSchema.safeParse((req as any).body ?? {});
  if (!parsed.success) {
    return reply.status(400).send({ message: 'Invalid body', issues: parsed.error.issues });
  }

  const b = parsed.data;

  const planId = uuid();
  const tI18n = b.i18n.map((x) => ({
    id: uuid(),
    locale: x.locale,
    badge: x.badge,
    title: x.title ?? null,
    description: x.description ?? null,
    features: toFeaturesArray(x.features),
    cta_label: x.cta_label ?? null,
    cta_href: x.cta_href ?? null,
  }));

  const created = await pricingRepo.adminCreatePlan({
    id: planId,
    code: b.code,
    price_amount: asDecimalString(b.price_amount),
    price_unit: b.price_unit ?? 'hour',
    currency: b.currency ?? 'USD',
    is_active: toBool(b.is_active),
    is_featured: toBool(b.is_featured),
    display_order: b.display_order ?? 0,
    cta_href: b.cta_href ?? null,
    i18n: tI18n,
  });

  return reply.status(201).send(created);
}

export async function adminPatchPlan(req: FastifyRequest, reply: FastifyReply) {
  const id = String((req as any).params?.id || '').trim();
  if (!id) return reply.status(400).send({ message: 'Missing id' });

  const parsed = AdminPatchPricingPlanSchema.safeParse((req as any).body ?? {});
  if (!parsed.success) {
    return reply.status(400).send({ message: 'Invalid body', issues: parsed.error.issues });
  }

  const b = parsed.data;

  const patch: any = {};
  if (typeof b.code !== 'undefined') patch.code = b.code;
  if (typeof b.price_amount !== 'undefined') patch.price_amount = asDecimalString(b.price_amount);
  if (typeof b.price_unit !== 'undefined') patch.price_unit = b.price_unit ?? 'hour';
  if (typeof b.currency !== 'undefined') patch.currency = b.currency ?? 'USD';
  if (typeof b.is_active !== 'undefined') patch.is_active = toBool(b.is_active);
  if (typeof b.is_featured !== 'undefined') patch.is_featured = toBool(b.is_featured);
  if (typeof b.display_order !== 'undefined') patch.display_order = b.display_order ?? 0;
  if (typeof b.cta_href !== 'undefined') patch.cta_href = b.cta_href ?? null;

  if (b.i18n?.length) {
    patch.i18n = b.i18n.map((x) => ({
      locale: x.locale,
      badge: x.badge,
      title: typeof x.title === 'undefined' ? undefined : (x.title ?? null),
      description: typeof x.description === 'undefined' ? undefined : (x.description ?? null),
      features: typeof x.features === 'undefined' ? undefined : toFeaturesArray(x.features),
      cta_label: typeof x.cta_label === 'undefined' ? undefined : (x.cta_label ?? null),
      cta_href: typeof x.cta_href === 'undefined' ? undefined : (x.cta_href ?? null),
    }));
  }

  const updated = await pricingRepo.adminPatchPlan(id, patch);
  if (!updated) return reply.status(404).send({ message: 'Not found' });

  return reply.send(updated);
}

export async function adminDeletePlan(req: FastifyRequest, reply: FastifyReply) {
  const id = String((req as any).params?.id || '').trim();
  if (!id) return reply.status(400).send({ message: 'Missing id' });

  await pricingRepo.adminDeletePlan(id);
  return reply.send({ ok: true });
}
