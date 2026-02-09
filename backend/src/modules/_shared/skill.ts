// ===================================================================
// FILE: src/modules/skill/shared.ts
// FINAL — Skill shared types + helpers (TEMP PATH as requested)
// - User will move later.
// - Keep all types/helpers here to avoid circular imports.
// ===================================================================

import { z } from 'zod';
import { sql } from 'drizzle-orm';

// If your project already exports these from '@/modules/_shared', you can replace
// the local schemas below with imports. But per request, we keep shared here.

export const SKILL_TRACK = z.enum(['right', 'left']);
export type SkillTrack = z.infer<typeof SKILL_TRACK>;

// Slug: simple + safe



// -----------------------------------------------------
// merged types (public/admin read models)
// -----------------------------------------------------
export type SkillCounterMerged = {
  id: string;
  is_active: boolean;
  display_order: number;

  percent: number; // 0..100

  image_url: string | null;
  image_asset_id: string | null;

  // i18n merged
  locale: string;
  title: string;
  slug: string;

  created_at?: string;
  updated_at?: string;
};

export type SkillLogoMerged = {
  id: string;
  is_active: boolean;
  display_order: number;

  track: SkillTrack;

  image_url: string | null;
  image_asset_id: string | null;

  // i18n merged
  locale: string;
  label: string;

  created_at?: string;
  updated_at?: string;
};

export type SkillsGroupedResponse = {
  locale: string;
  default_locale?: string;
  counters: SkillCounterMerged[];
  logos_right: SkillLogoMerged[];
  logos_left: SkillLogoMerged[];
};

// -----------------------------------------------------
// generic order param parser helper
// Accepts: "display_order.asc" | "created_at.desc" | ...
// NOTE: repository implements a LOCAL parser bound to its schema instance.
// This shared helper is just a placeholder signature if you want to reuse.
// -----------------------------------------------------
export type OrderDir = 'asc' | 'desc';
export type ParsedOrder = { col: any; dir: OrderDir } | null;
