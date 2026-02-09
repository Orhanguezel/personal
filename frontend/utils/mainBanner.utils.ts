// =============================================================
// FILE: src/components/mainBanner.utils.ts
// Helpers extracted from MainBanner
// =============================================================

import type { StaticImageData } from 'next/image';
import type { SliderPublic } from '@/integrations/shared';

export type ImgSrc = string | StaticImageData;

export function s(v: unknown): string {
  return String(v ?? '').trim();
}

export function isHttpUrl(v: string): boolean {
  return /^https?:\/\//i.test(v);
}

/**
 * next/image optimizer bypass only for localhost/dev.
 * (Remote image domain config yoksa dev'de patlamasın diye)
 */
export function shouldBypassOptimizer(src: ImgSrc): boolean {
  if (typeof src !== 'string') return false;
  if (!isHttpUrl(src)) return false;
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

export function pickSingleSlide(list: SliderPublic[] | undefined): SliderPublic | null {
  const arr = Array.isArray(list) ? list : [];
  if (!arr.length) return null;
  return arr.find((x) => x?.featured) ?? arr[0] ?? null;
}

/**
 * Başlığı 2 satıra böler:
 * - Öncelik: "\n"
 * - Sonra: " • " veya " | "
 * - Yoksa: fallback (ui satırları)
 */
export function splitTitleTwoLines(
  titleRaw: string,
  fallback1: string,
  fallback2: string,
): [string, string] {
  const t = s(titleRaw);
  if (!t) return [fallback1, fallback2];

  if (t.includes('\n')) {
    const parts = t
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean);
    return [parts[0] || fallback1, parts.slice(1).join(' ') || fallback2];
  }

  const sep = t.includes(' • ') ? ' • ' : t.includes(' | ') ? ' | ' : '';
  if (sep) {
    const [a, ...rest] = t
      .split(sep)
      .map((x) => x.trim())
      .filter(Boolean);
    return [a || fallback1, rest.join(' ') || fallback2];
  }

  return [t, fallback2];
}
