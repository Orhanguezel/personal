// =============================================================
// FILE: src/modules/audit/shared.ts
// Audit shared helpers/types
// =============================================================

export type AuditListResponse<T> = { items: T[]; total: number };

export const isTruthyBoolLike = (v: unknown) =>
  v === true || v === 1 || v === '1' || v === 'true';

export function coerceAuditList<T>(raw: unknown): AuditListResponse<T> {
  const r = raw as any;
  if (!r) return { items: [], total: 0 };
  if (Array.isArray(r)) return { items: r as T[], total: r.length };
  if (Array.isArray(r.items)) {
    const total = Number.isFinite(Number(r.total)) ? Number(r.total) : r.items.length;
    return { items: r.items as T[], total };
  }
  if (Array.isArray(r.data)) {
    const total = Number.isFinite(Number(r.total)) ? Number(r.total) : r.data.length;
    return { items: r.data as T[], total };
  }
  return { items: [], total: 0 };
}
