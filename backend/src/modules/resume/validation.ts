// ===================================================================
// FILE: src/modules/resume/validation.ts
// FINAL — Resume validation
// - locale query supported
// - runtime LOCALES => LOCALE_SCHEMA is string + checks (shared)
// ===================================================================

import { z } from 'zod';
import {
  boolLike,
  LOCALE_SCHEMA,
  SLUG,
  RESUME_TYPE,
  ISO_DATE,
  HIGHLIGHTS_INPUT,
} from '@/modules/_shared';

// ---------- LIST query (public/admin ortak)
export const resumeListQuerySchema = z.object({
  order: z.string().optional(), // "display_order.asc"
  sort: z.enum(['created_at', 'updated_at', 'display_order', 'start_date']).optional(),
  orderDir: z.enum(['asc', 'desc']).optional(),

  limit: z.coerce.number().int().min(1).max(200).optional(),
  offset: z.coerce.number().int().min(0).optional(),

  is_active: boolLike.optional(),
  q: z.string().optional(),
  slug: z.string().optional(),
  type: RESUME_TYPE.optional(),
  locale: LOCALE_SCHEMA.optional(),
  default_locale: LOCALE_SCHEMA.optional(),
});

export type ResumeListQuery = z.infer<typeof resumeListQuerySchema>;

// ---------- CREATE (admin)
export const upsertResumeBodySchema = z.object({
  // parent
  type: RESUME_TYPE,
  is_active: boolLike.optional().default(true),
  display_order: z.coerce.number().int().min(0).optional(),

  start_date: ISO_DATE,
  end_date: ISO_DATE.optional(),
  is_current: boolLike.optional().default(false),

  location: z.string().trim().max(200).optional(),
  organization: z.string().trim().max(200).optional(),

  score_value: z.coerce.number().min(0).max(99).optional(),
  score_scale: z.coerce.number().int().min(1).max(100).optional(),

  // i18n
  locale: LOCALE_SCHEMA.optional(),
  title: z.string().trim().min(1).max(300),
  subtitle: z.string().trim().min(1).max(300),
  description: z.string().optional(),
  highlights: HIGHLIGHTS_INPUT,
  slug: SLUG,
});

export type UpsertResumeBody = z.infer<typeof upsertResumeBodySchema>;

// ---------- PATCH (admin)
export const patchResumeBodySchema = z.object({
  // parent
  type: RESUME_TYPE.optional(),
  is_active: boolLike.optional(),
  display_order: z.coerce.number().int().min(0).optional(),

  start_date: ISO_DATE.optional(),
  end_date: ISO_DATE.optional(),
  is_current: boolLike.optional(),

  location: z.string().trim().max(200).optional(),
  organization: z.string().trim().max(200).optional(),

  score_value: z.coerce.number().min(0).max(99).optional(),
  score_scale: z.coerce.number().int().min(1).max(100).optional(),

  // i18n
  locale: LOCALE_SCHEMA.optional(),
  title: z.string().trim().min(1).max(300).optional(),
  subtitle: z.string().trim().min(1).max(300).optional(),
  description: z.string().optional(),
  highlights: HIGHLIGHTS_INPUT,
  slug: SLUG.optional(),
});

export type PatchResumeBody = z.infer<typeof patchResumeBodySchema>;
