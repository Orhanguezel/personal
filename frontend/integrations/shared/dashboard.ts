import type { FetchArgs, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

// ---- Helpers -------------------------------------------------
export function getTotalFromMeta(meta?: FetchBaseQueryMeta, fallback = 0) {
  const h = meta?.response?.headers;
  if (!h) return fallback;
  const v = h.get('x-total-count') || h.get('X-Total-Count');
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export function toCountQuery(url: string, params?: Record<string, any>): FetchArgs {
  return {
    url,
    params: { limit: 1, offset: 0, ...params },
    // admin uçları yetki ister; x-skip-auth KULLANMA
  };
}

export function toListQuery(url: string, params?: Record<string, any>): FetchArgs {
  return {
    url,
    params: {
      limit: 10,
      offset: 0,
      orderBy: 'created_at',
      order: 'desc',
      ...params,
    },
  };
}

/** JSON gövdesi { total } veya { meta: { total } } dönerse de destekle */
export function coerceCount(data: unknown, meta?: FetchBaseQueryMeta) {
  const totalFromHeader = getTotalFromMeta(meta, 0);
  if (totalFromHeader) return totalFromHeader;

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const any = data as any;
    if (typeof any.total === 'number') return any.total;
    if (typeof any.count === 'number') return any.count; // 👈 eklendi
    if (any.meta && typeof any.meta.total === 'number') return any.meta.total;
    if (any.pagination && typeof any.pagination.total === 'number') return any.pagination.total; // 👈 eklendi
    if (Array.isArray(any.items) && typeof any.items_total === 'number') return any.items_total;
  }
  if (Array.isArray(data)) return data.length;
  return 0;
}

/** Body { items: T[] } / { data: T[] } / T[] -> T[] */
export function coerceItems<T = any>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object') {
    const any = data as any;
    if (Array.isArray(any.items)) return any.items as T[];
    if (Array.isArray(any.data)) return any.data as T[];
    if (Array.isArray(any.results)) return any.results as T[];
  }
  return [];
}

// ---- Light types (dashboard özet tabloları için) -------------
export type ProductLite = {
  id: string | number;
  title?: string;
  price?: number | string | null;
  created_at?: string | Date | null;
  sub_category_id?: string | number | null;
};

export type UserLite = {
  id: string | number;
  email?: string;
  full_name?: string | null;
  roles?: string[] | string | null;
  created_at?: string | Date | null;
};
