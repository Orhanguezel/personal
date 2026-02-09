// ===================================================================
// FILE: src/modules/skill/validation.ts
// FINAL — Skill validation
// ===================================================================

import { z } from 'zod';
import { LOCALE_SCHEMA, SLUG, SKILL_TRACK } from '@/modules/_shared';

// boolLike used frequently across your codebase; re-define minimal here
const boolLike = z.union([z.boolean(), z.number(), z.string()]);

// ---------- Public/Admin LIST query
export const skillListQuerySchema = z.object({
  // paging
  limit: z.coerce.number().int().min(1).max(200).optional(),
  offset: z.coerce.number().int().min(0).optional(),

  // filters
  is_active: boolLike.optional(),
  track: SKILL_TRACK.optional(),

  // locale selection
  locale: LOCALE_SCHEMA.optional(),
  default_locale: LOCALE_SCHEMA.optional(),
});

export type SkillListQuery = z.infer<typeof skillListQuerySchema>;

// ---------- Admin: create counter
export const createSkillCounterBodySchema = z.object({
  percent: z.coerce.number().int().min(0).max(100),

  image_url: z.string().trim().max(500).optional(),
  image_asset_id: z.string().trim().length(36).optional(),

  is_active: boolLike.optional().default(true),
  display_order: z.coerce.number().int().min(0).optional(),

  // i18n
  locale: LOCALE_SCHEMA.optional(),
  title: z.string().trim().min(1).max(300),
  slug: SLUG,
});

export type CreateSkillCounterBody = z.infer<typeof createSkillCounterBodySchema>;

// ---------- Admin: patch counter
export const patchSkillCounterBodySchema = z.object({
  percent: z.coerce.number().int().min(0).max(100).optional(),

  image_url: z.string().trim().max(500).optional(),
  image_asset_id: z.string().trim().length(36).optional(),

  is_active: boolLike.optional(),
  display_order: z.coerce.number().int().min(0).optional(),

  // i18n
  locale: LOCALE_SCHEMA.optional(),
  title: z.string().trim().min(1).max(300).optional(),
  slug: SLUG.optional(),
});

export type PatchSkillCounterBody = z.infer<typeof patchSkillCounterBodySchema>;

// ---------- Admin: create logo
export const createSkillLogoBodySchema = z.object({
  track: SKILL_TRACK.default('right'),

  image_url: z.string().trim().max(500).optional(),
  image_asset_id: z.string().trim().length(36).optional(),

  is_active: boolLike.optional().default(true),
  display_order: z.coerce.number().int().min(0).optional(),

  // i18n
  locale: LOCALE_SCHEMA.optional(),
  label: z.string().trim().min(1).max(300),
});

export type CreateSkillLogoBody = z.infer<typeof createSkillLogoBodySchema>;

// ---------- Admin: patch logo
export const patchSkillLogoBodySchema = z.object({
  track: SKILL_TRACK.optional(),

  image_url: z.string().trim().max(500).optional(),
  image_asset_id: z.string().trim().length(36).optional(),

  is_active: boolLike.optional(),
  display_order: z.coerce.number().int().min(0).optional(),

  // i18n
  locale: LOCALE_SCHEMA.optional(),
  label: z.string().trim().min(1).max(300).optional(),
});

export type PatchSkillLogoBody = z.infer<typeof patchSkillLogoBodySchema>;
