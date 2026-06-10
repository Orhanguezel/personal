// =============================================================
// FILE: src/integrations/apiBase.ts
// FINAL — Central API base resolver (shared by RTK + server SEO)
// - Exports: BASE_URL
// - Same logic as baseApi.ts (kept stable)
// =============================================================

function trimSlash(x: string) {
  return x.replace(/\/+$/, '');
}
function ensureLeadingSlash(x: string) {
  return x.startsWith('/') ? x : `/${x}`;
}
function isAbsUrl(x: string) {
  return /^https?:\/\//i.test(x);
}
function joinOriginAndBase(origin?: string, base?: string) {
  if (!origin) return '';
  const o = trimSlash(origin);
  if (!base) return o;
  const b = trimSlash(base);
  return o + ensureLeadingSlash(b);
}

function withApiVersion(base: string) {
  const clean = trimSlash(base);
  if (/\/api\/v\d+$/i.test(clean)) return clean;
  if (/\/api$/i.test(clean)) return `${clean}/v1`;
  return clean;
}

const IS_DEV = process.env.NODE_ENV !== 'production';

function guessDevBackend(): string {
  // Client'ta current host üzerinden tahmin, SSR'da localhost fallback
  try {
    if (typeof window !== 'undefined') {
      const loc = window.location;
      const host = loc?.hostname || 'localhost';
      const proto = loc?.protocol || 'http:';
      return `${proto}//${host}:8044`;
    }
  } catch {
    // ignore
  }
  return 'http://localhost:8044';
}

/**
 * Env resolution (Next.js):
 * - API_BASE_URL             : server-only full base url, e.g. https://api.domain.com/api/v1
 * - NEXT_PUBLIC_API_URL      : full base url, e.g. https://api.domain.com/api
 * - NEXT_PUBLIC_API_BASE_URL : same as NEXT_PUBLIC_API_URL (legacy env name)
 * - NEXT_PUBLIC_API_ORIGIN   : origin only, e.g. https://api.domain.com
 * - NEXT_PUBLIC_API_BASE     : base path, e.g. /api  (or api)
 * Fallback:
 * - DEV: guessed http(s)://{host}:8044
 * - PROD: /api/v1
 */
export function resolveBaseUrl(): string {
  const apiUrl = (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ''
  ).trim();
  const apiOrigin = (process.env.NEXT_PUBLIC_API_ORIGIN || '').trim();
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE || '').trim();

  // 1) Full URL preferred
  if (apiUrl && isAbsUrl(apiUrl)) return withApiVersion(apiUrl);

  // 2) origin + base together
  if (apiOrigin && apiBase) return withApiVersion(joinOriginAndBase(apiOrigin, apiBase));

  // 3) only base provided
  if (apiBase) {
    if (isAbsUrl(apiBase)) return withApiVersion(apiBase);
    return withApiVersion(ensureLeadingSlash(trimSlash(apiBase)));
  }

  // 4) fallbacks
  if (IS_DEV) return guessDevBackend();
  return '/api/v1';
}

export const BASE_URL = resolveBaseUrl();
