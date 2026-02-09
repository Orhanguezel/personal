// =============================================================
// FILE: src/modules/pricing/repository.ts
// FINAL — Pricing repository (public + admin) — PLANS ONLY
// - Locale-first queries with fallback if empty
// - Parent + i18n upsert
// - NO FAQ (separate module)
// =============================================================

import { and, eq, asc, inArray } from 'drizzle-orm';
import { db } from '@/db/client';

import { pricingPlans, pricingPlansI18n } from './schema';

import {
  toFeaturesArray,
  toBool,
  parseJsonArray,
  now3,
  safeJsonArrayString,
} from '@/modules/_shared';

import type { PricingPlanPublic } from '@/modules/_shared';

export type PricingPublicResponse = {
  plans: PricingPlanPublic[];
};

export class PricingRepository {
  // ----------------------------- Public -----------------------------

  async getPublic(locale?: string, plansLimit = 10): Promise<PricingPublicResponse> {
    const loc = (locale || '').trim();

    // 1) Try locale list
    const resLocale = loc ? await this._getPublicByLocale(loc, plansLimit) : null;

    // If locale specified and returned non-empty, use it
    if (loc && resLocale && resLocale.plans.length > 0) {
      return resLocale;
    }

    // 2) Fallback: no locale filter (pick first i18n deterministically)
    return this._getPublicFallback(plansLimit);
  }

  private async _getPublicByLocale(
    locale: string,
    plansLimit: number,
  ): Promise<PricingPublicResponse> {
    const plansRows = await db
      .select({
        id: pricingPlans.id,
        code: pricingPlans.code,
        price_amount: pricingPlans.price_amount,
        price_unit: pricingPlans.price_unit,
        currency: pricingPlans.currency,
        is_active: pricingPlans.is_active,
        display_order: pricingPlans.display_order,
        cta_href_root: pricingPlans.cta_href,

        badge: pricingPlansI18n.badge,
        title: pricingPlansI18n.title,
        description: pricingPlansI18n.description,
        features: pricingPlansI18n.features,
        cta_label: pricingPlansI18n.cta_label,
        cta_href_i18n: pricingPlansI18n.cta_href,
      })
      .from(pricingPlans)
      .innerJoin(pricingPlansI18n, eq(pricingPlansI18n.plan_id, pricingPlans.id))
      .where(and(eq(pricingPlans.is_active, 1), eq(pricingPlansI18n.locale, locale)))
      .orderBy(asc(pricingPlans.display_order), asc(pricingPlans.code))
      .limit(plansLimit);

    return {
      plans: plansRows.map<PricingPlanPublic>((r) => ({
        id: r.id,
        code: r.code,
        badge: r.badge,
        title: r.title ?? null,
        description: r.description ?? null,
        price_amount: String(r.price_amount ?? '0.00'),
        price_unit: r.price_unit ?? 'hour',
        currency: r.currency ?? 'USD',
        features: parseJsonArray(r.features),
        cta_label: r.cta_label ?? null,
        cta_href: (r.cta_href_i18n ?? r.cta_href_root ?? null) as any,
        is_active: toBool(r.is_active),
        display_order: Number(r.display_order ?? 0),
      })),
    };
  }

  private async _getPublicFallback(plansLimit: number): Promise<PricingPublicResponse> {
    // fallback strategy:
    // - join i18n without locale condition
    // - pick first i18n per plan deterministically (by locale asc)
    const rows = await db
      .select({
        id: pricingPlans.id,
        code: pricingPlans.code,
        price_amount: pricingPlans.price_amount,
        price_unit: pricingPlans.price_unit,
        currency: pricingPlans.currency,
        is_active: pricingPlans.is_active,
        display_order: pricingPlans.display_order,
        cta_href_root: pricingPlans.cta_href,

        locale: pricingPlansI18n.locale,
        badge: pricingPlansI18n.badge,
        title: pricingPlansI18n.title,
        description: pricingPlansI18n.description,
        features: pricingPlansI18n.features,
        cta_label: pricingPlansI18n.cta_label,
        cta_href_i18n: pricingPlansI18n.cta_href,
      })
      .from(pricingPlans)
      .innerJoin(pricingPlansI18n, eq(pricingPlansI18n.plan_id, pricingPlans.id))
      .where(eq(pricingPlans.is_active, 1))
      .orderBy(
        asc(pricingPlans.display_order),
        asc(pricingPlans.code),
        asc(pricingPlansI18n.locale),
      )
      .limit(plansLimit * 5);

    const firstById = new Map<string, (typeof rows)[number]>();
    for (const r of rows) {
      if (!firstById.has(r.id)) firstById.set(r.id, r);
    }

    const plans = Array.from(firstById.values())
      .slice(0, plansLimit)
      .map<PricingPlanPublic>((r) => ({
        id: r.id,
        code: r.code,
        badge: r.badge,
        title: r.title ?? null,
        description: r.description ?? null,
        price_amount: String(r.price_amount ?? '0.00'),
        price_unit: r.price_unit ?? 'hour',
        currency: r.currency ?? 'USD',
        features: parseJsonArray(r.features),
        cta_label: r.cta_label ?? null,
        cta_href: (r.cta_href_i18n ?? r.cta_href_root ?? null) as any,
        is_active: toBool(r.is_active),
        display_order: Number(r.display_order ?? 0),
      }));

    return { plans };
  }

  // ----------------------------- Admin (Plans) -----------------------------

  async adminListPlans(params: { limit?: number; offset?: number } = {}) {
    const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
    const offset = Math.max(params.offset ?? 0, 0);

    const rows = await db
      .select()
      .from(pricingPlans)
      .orderBy(asc(pricingPlans.display_order), asc(pricingPlans.code))
      .limit(limit)
      .offset(offset);

    const ids = rows.map((r: any) => r.id);
    const i18n = ids.length
      ? await db
          .select()
          .from(pricingPlansI18n)
          .where(inArray(pricingPlansI18n.plan_id, ids))
          .orderBy(asc(pricingPlansI18n.locale))
      : [];

    const i18nByPlan = new Map<string, any[]>();
    for (const r of i18n as any[]) {
      const arr = i18nByPlan.get(r.plan_id) || [];
      arr.push(r);
      i18nByPlan.set(r.plan_id, arr);
    }

    return rows.map((p: any) => ({
      ...p,
      is_active: toBool(p.is_active),
      i18n: (i18nByPlan.get(p.id) || []).map((x) => ({
        ...x,
        features: parseJsonArray(x.features),
      })),
    }));
  }

  async adminGetPlan(id: string) {
    const p = await db.select().from(pricingPlans).where(eq(pricingPlans.id, id)).limit(1);
    if (!p.length) return null;

    const i18n = await db
      .select()
      .from(pricingPlansI18n)
      .where(eq(pricingPlansI18n.plan_id, id))
      .orderBy(asc(pricingPlansI18n.locale));

    return {
      ...p[0],
      is_active: toBool((p[0] as any).is_active),
      i18n: (i18n as any[]).map((x) => ({ ...x, features: parseJsonArray(x.features) })),
    };
  }

  async adminCreatePlan(input: {
    id: string;
    code: string;
    price_amount: string;
    price_unit: string;
    currency: string;
    is_active: boolean;
    is_featured: boolean;
    display_order: number;
    cta_href: string | null;
    i18n: Array<{
      id: string;
      locale: string;
      badge: string;
      title: string | null;
      description: string | null;
      features: string[];
      cta_label: string | null;
      cta_href: string | null;
    }>;
  }) {
    const t = now3();

    await db.insert(pricingPlans).values({
      id: input.id,
      code: input.code,
      price_amount: input.price_amount,
      price_unit: input.price_unit,
      currency: input.currency,
      is_active: input.is_active ? 1 : 0,
      is_featured: input.is_featured ? 1 : 0,
      display_order: input.display_order,
      cta_href: input.cta_href ?? null,
      created_at: t,
      updated_at: t,
    } as any);

    for (const tr of input.i18n) {
      await db.insert(pricingPlansI18n).values({
        id: tr.id,
        plan_id: input.id,
        locale: tr.locale,
        badge: tr.badge,
        title: tr.title ?? null,
        description: tr.description ?? null,
        features: safeJsonArrayString(tr.features),
        cta_label: tr.cta_label ?? null,
        cta_href: tr.cta_href ?? null,
        created_at: t,
        updated_at: t,
      } as any);
    }

    return this.adminGetPlan(input.id);
  }

  async adminPatchPlan(
    id: string,
    patch: Partial<{
      code: string;
      price_amount: string;
      price_unit: string;
      currency: string;
      is_active: boolean;
      is_featured: boolean;
      display_order: number;
      cta_href: string | null;
      i18n: Array<{
        locale: string;
        badge?: string;
        title?: string | null;
        description?: string | null;
        features?: string[];
        cta_label?: string | null;
        cta_href?: string | null;
      }>;
    }>,
  ) {
    const t = now3();

    const update: any = { updated_at: t };
    if (typeof patch.code !== 'undefined') update.code = patch.code;
    if (typeof patch.price_amount !== 'undefined') update.price_amount = patch.price_amount;
    if (typeof patch.price_unit !== 'undefined') update.price_unit = patch.price_unit;
    if (typeof patch.currency !== 'undefined') update.currency = patch.currency;
    if (typeof patch.is_active !== 'undefined') update.is_active = patch.is_active ? 1 : 0;
    if (typeof patch.is_featured !== 'undefined') update.is_featured = patch.is_featured ? 1 : 0;
    if (typeof patch.display_order !== 'undefined') update.display_order = patch.display_order;
    if (typeof patch.cta_href !== 'undefined') update.cta_href = patch.cta_href ?? null;

    const hasAny = Object.keys(update).length > 1; // updated_at always there
    if (hasAny) {
      await db.update(pricingPlans).set(update).where(eq(pricingPlans.id, id));
    }

    // upsert i18n by (plan_id, locale)
    if (patch.i18n?.length) {
      for (const tr of patch.i18n) {
        const existing = await db
          .select({ id: pricingPlansI18n.id })
          .from(pricingPlansI18n)
          .where(and(eq(pricingPlansI18n.plan_id, id), eq(pricingPlansI18n.locale, tr.locale)))
          .limit(1);

        const i18nUpdate: any = { updated_at: t };
        if (typeof tr.badge !== 'undefined') i18nUpdate.badge = tr.badge;
        if (typeof tr.title !== 'undefined') i18nUpdate.title = tr.title ?? null;
        if (typeof tr.description !== 'undefined') i18nUpdate.description = tr.description ?? null;
        if (typeof tr.features !== 'undefined')
          i18nUpdate.features = safeJsonArrayString(tr.features ?? []);
        if (typeof tr.cta_label !== 'undefined') i18nUpdate.cta_label = tr.cta_label ?? null;
        if (typeof tr.cta_href !== 'undefined') i18nUpdate.cta_href = tr.cta_href ?? null;

        if (existing.length) {
          await db
            .update(pricingPlansI18n)
            .set(i18nUpdate)
            .where(eq(pricingPlansI18n.id, existing[0].id));
        } else {
          await db.insert(pricingPlansI18n).values({
            id: crypto.randomUUID(),
            plan_id: id,
            locale: tr.locale,
            badge: tr.badge ?? '',
            title: tr.title ?? null,
            description: tr.description ?? null,
            features: safeJsonArrayString(tr.features ?? []),
            cta_label: tr.cta_label ?? null,
            cta_href: tr.cta_href ?? null,
            created_at: t,
            updated_at: t,
          } as any);
        }
      }
    }

    return this.adminGetPlan(id);
  }

  async adminDeletePlan(id: string) {
    await db.delete(pricingPlansI18n).where(eq(pricingPlansI18n.plan_id, id));
    await db.delete(pricingPlans).where(eq(pricingPlans.id, id));
    return { ok: true };
  }
}

export const pricingRepo = new PricingRepository();
