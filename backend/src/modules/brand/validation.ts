// ===================================================================
// FILE: src/modules/brand/validation.ts
// FINAL — Brand validation
// ===================================================================

import { z } from 'zod';
import { LOCALE_SCHEMA } from '@/modules/_shared';
import { BRAND_TRACK } from '@/modules/_shared/brand';

const boolLike = z.union([z.boolean(), z.number(), z.string()]);

// ---------- Public/Admin LIST query
export const brandListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional(),
  offset: z.coerce.number().int().min(0).optional(),

  is_active: boolLike.optional(),
  track: BRAND_TRACK.optional(),

  locale: LOCALE_SCHEMA.optional(),
});

export type BrandListQuery = z.infer<typeof brandListQuerySchema>;

// ---------- Admin: create logo
export const createBrandLogoBodySchema = z.object({
  track: BRAND_TRACK.default('right'),

  image_url: z.string().trim().max(500).optional(),
  image_asset_id: z.string().trim().length(36).optional(),

  is_active: boolLike.optional().default(true),
  display_order: z.coerce.number().int().min(0).optional(),

  locale: LOCALE_SCHEMA.optional(),
  label: z.string().trim().min(1).max(300),
});

export type CreateBrandLogoBody = z.infer<typeof createBrandLogoBodySchema>;

// ---------- Admin: patch logo
export const patchBrandLogoBodySchema = z.object({
  track: BRAND_TRACK.optional(),

  image_url: z.string().trim().max(500).optional(),
  image_asset_id: z.string().trim().length(36).optional(),

  is_active: boolLike.optional(),
  display_order: z.coerce.number().int().min(0).optional(),

  locale: LOCALE_SCHEMA.optional(),
  label: z.string().trim().min(1).max(300).optional(),
});

export type PatchBrandLogoBody = z.infer<typeof patchBrandLogoBodySchema>;
