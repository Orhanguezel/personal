// =============================================================
// FILE: src/integrations/utils/url.ts
// FINAL — URL helpers (shared)
// =============================================================

export function trimSlash(x: string): string {
  return String(x || '').replace(/\/+$/, '');
}

export function safeNextPath(next: string | null | undefined, fallback: string): string {
  const v = String(next ?? '').trim();
  if (!v || !v.startsWith('/')) return fallback;
  if (v.startsWith('//')) return fallback;
  return v;
}

export function safeHttpOrigin(raw: unknown): string {
  const s = String(raw ?? '').trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) return '';
  return trimSlash(s);
}
