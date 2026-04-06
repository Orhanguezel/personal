/**
 * Prefix locale-less app paths (`/pricing`) with `/{locale}` for next/link.
 * Absolute URLs are returned unchanged.
 */
export function withLocalePath(locale: string, path: string | undefined | null): string {
  const loc = (locale || 'en').trim() || 'en';
  const p = String(path ?? '').trim();
  if (!p || p === '#') return `/${loc}/testimonials`;
  if (p.startsWith('http://') || p.startsWith('https://')) return p;
  if (p.startsWith(`/${loc}/`) || p === `/${loc}`) return p;
  if (p.startsWith('/')) return `/${loc}${p}`;
  return p;
}
