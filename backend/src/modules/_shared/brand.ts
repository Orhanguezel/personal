// ===================================================================
// FILE: src/modules/_shared/brand.ts
// FINAL — Brand shared types + helpers
// ===================================================================

import { z } from 'zod';
import { sql } from 'drizzle-orm';

export const BRAND_TRACK = z.enum(['right', 'left']);
export type BrandTrack = z.infer<typeof BRAND_TRACK>;

export function parseTrack(v: unknown): BrandTrack | null {
  const s = String(v ?? '')
    .trim()
    .toLowerCase();
  if (s === 'right' || s === 'left') return s;
  return null;
}

export function safeLocale(v?: string) {
  const s = String(v ?? '')
    .trim()
    .toLowerCase();
  return s || 'en';
}

export type BrandLogoMerged = {
  id: string;
  is_active: boolean;
  display_order: number;

  track: BrandTrack;

  image_url: string | null;
  image_asset_id: string | null;

  // i18n merged
  locale: string;
  label: string;

  created_at?: string;
  updated_at?: string;
};

export type BrandsGroupedResponse = {
  locale: string;
  default_locale?: string;
  logos_right: BrandLogoMerged[];
  logos_left: BrandLogoMerged[];
};

export const SQL_NOW_3 = sql`CURRENT_TIMESTAMP(3)`;

export function boolLikeTo01(v: any): 0 | 1 | null {
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (typeof v === 'number') return v ? 1 : 0;

  const s = String(v ?? '')
    .trim()
    .toLowerCase();
  if (!s) return null;

  if (s === '1' || s === 'true' || s === 'yes' || s === 'on') return 1;
  if (s === '0' || s === 'false' || s === 'no' || s === 'off') return 0;

  return null;
}
