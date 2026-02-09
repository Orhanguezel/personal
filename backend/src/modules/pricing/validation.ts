// =============================================================
// FILE: src/modules/pricing/validation.ts
// FINAL — Zod validation (public + admin)
// =============================================================

import { z } from 'zod';

export const LocaleQuerySchema = z.object({
  locale: z.string().trim().min(2).max(10).optional(),
});

export const PublicPricingQuerySchema = LocaleQuerySchema.extend({
  plans_limit: z.coerce.number().int().min(1).max(50).optional(),
});

// -------- Admin bodies --------

export const PricingPlanUpsertI18nSchema = z.object({
  locale: z.string().trim().min(2).max(10),
  badge: z.string().trim().min(1).max(64),

  title: z.string().trim().max(255).nullable().optional(),
  description: z.string().trim().max(1000).nullable().optional(),

  // string[] or csv accepted
  features: z.union([z.array(z.string().trim().min(1)), z.string().trim()]).optional(),

  cta_label: z.string().trim().max(100).nullable().optional(),
  cta_href: z.string().trim().max(500).nullable().optional(),
});

export const AdminUpsertPricingPlanSchema = z.object({
  code: z.string().trim().min(1).max(64),

  price_amount: z.union([z.string().trim(), z.number()]),
  price_unit: z.string().trim().min(1).max(32).optional(),
  currency: z.string().trim().min(1).max(10).optional(),

  is_active: z.union([z.boolean(), z.number(), z.string()]).optional(),
  is_featured: z.union([z.boolean(), z.number(), z.string()]).optional(),
  display_order: z.coerce.number().int().min(0).max(999999).optional(),

  cta_href: z.string().trim().max(500).nullable().optional(),

  i18n: z.array(PricingPlanUpsertI18nSchema).min(1),
});

export const AdminPatchPricingPlanSchema = AdminUpsertPricingPlanSchema.partial().extend({
  i18n: z.array(PricingPlanUpsertI18nSchema).optional(),
});

export const PricingFaqUpsertI18nSchema = z.object({
  locale: z.string().trim().min(2).max(10),
  question: z.string().trim().min(1).max(255),
  answer: z.string().trim().min(1).max(4000),
});

