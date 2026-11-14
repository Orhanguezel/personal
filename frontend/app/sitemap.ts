import type { MetadataRoute } from 'next';
import { getSeoAll } from '@/seo/seo.server';
import { getRuntimeLocalesServer } from '@/i18n/server';
import { BASE_URL } from '@/integrations/apiBase';
import { joinUrl } from '@/integrations/shared';
import { localizePath } from '@/i18n/routes';

type ListRow = {
  slug?: string | null;
  updated_at?: string | null;
  module_key?: string | null;
};

export const dynamic = 'force-dynamic';

function buildApiUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const base = String(BASE_URL || '').replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${base}${normalizedPath}`;

  if (!params) return url;

  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    qs.set(key, String(value));
  }

  const query = qs.toString();
  return query ? `${url}?${query}` : url;
}

async function fetchList<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<T[]> {
  const url = buildApiUrl(path, params);

  const res = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (res.status>=500)throw Error('Content source unavailable');
  if (!res.ok) return [];

  const data = (await res.json()) as unknown;

  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
    return (data as any).data as T[];
  }

  return [];
}

function toDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeoAll();
  const runtime = await getRuntimeLocalesServer();
  const activeLocales = process.env.NEXT_PUBLIC_SHARED_CONTENT==='1' ? (process.env.NEXT_PUBLIC_DEFAULT_LOCALE==='tr'?['tr']:['de','en']) : runtime.activeLocales;
  const base = seo.defaults.canonicalBase;

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const pushEntry = (url: string, lastModified?: Date) => {
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastModified: lastModified || now });
  };

  const staticPaths = [
    '',
    '/services',
    '/blog',
    '/work',
    '/pricing',
    '/faq',
    '/impressum',
    '/products',
  ];

  for (const locale of activeLocales) {
    for (const path of staticPaths) {
      // Kanonik adres DILE GORE olan (bkz. i18n/routes.ts). Ingilizce yollar
      // 308 ile buraya yonleniyor; sitemap dogrudan hedefi listelemeli.
      const fullPath = path ? `/${locale}${localizePath(locale, path)}` : `/${locale}`;
      pushEntry(joinUrl(base, fullPath));
    }
  }

  for (const locale of activeLocales) {
    const [services,projects,customPages,products]=await Promise.all([
      fetchList<ListRow>('/services',{limit:1000,locale,default_locale:locale}),
      fetchList<ListRow>('/projects',{limit:1000,locale,default_locale:locale}),
      fetchList<ListRow>('/custom-pages',{limit:1000,locale,default_locale:locale}),
      fetchList<ListRow>('/products',{limit:1000,locale,default_locale:locale}),
    ]);
    for (const row of services) {
      const slug = String(row?.slug || '').trim();
      if (!slug) continue;
      pushEntry(joinUrl(base, `/${locale}${localizePath(locale, `/services/${slug}`)}`), toDate(row.updated_at));
    }

    for (const row of projects) {
      const slug = String(row?.slug || '').trim();
      if (!slug) continue;
      pushEntry(joinUrl(base, `/${locale}${localizePath(locale, `/work/${slug}`)}`), toDate(row.updated_at));
    }

    for (const row of products) {
      const slug = String(row?.slug || '').trim();
      if (!slug) continue;
      pushEntry(joinUrl(base, `/${locale}${localizePath(locale, `/products/${slug}`)}`), toDate(row.updated_at));
    }

    for (const row of customPages) {
      const slug = String(row?.slug || '').trim();
      const moduleKey = String(row?.module_key || '').trim();
      if (!slug || !moduleKey) continue;

      if (moduleKey === 'blog') {
        pushEntry(joinUrl(base, `/${locale}${localizePath(locale, `/blog/${slug}`)}`), toDate(row.updated_at));
      } else if (moduleKey === 'legal' || moduleKey === 'corporate') {
        pushEntry(joinUrl(base, `/${locale}${localizePath(locale, `/${moduleKey}/${slug}`)}`), toDate(row.updated_at));
      } else {
        pushEntry(
          joinUrl(base, `/${locale}/custompages/${moduleKey}/${slug}`),
          toDate(row.updated_at),
        );
      }
    }
  }

  return entries;
}
