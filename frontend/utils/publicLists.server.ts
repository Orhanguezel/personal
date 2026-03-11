import { BASE_URL } from '@/integrations/apiBase';
import type {
  ApiServicePublic,
  ServiceDto,
  Project,
  CustomPageView,
  UiHomeCopy,
  ProductDto,
} from '@/integrations/shared';
import {
  normalizeService,
  normalizeCustomPage,
  normalizeUiHomeSettingValue,
  normalizeProduct,
} from '@/integrations/shared';
import { getStaticSiteSettingValue } from '@/utils/staticSiteSettings.server';

const REVALIDATE_SECONDS = 60;

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
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as unknown;

  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
    return (data as any).data as T[];
  }

  return [];
}

export async function getServicesListServer(args: {
  locale: string;
  limit?: number;
  offset?: number;
}): Promise<ServiceDto[]> {
  const rows = await fetchList<ApiServicePublic>('/services', {
    limit: args.limit ?? 20,
    offset: args.offset ?? 0,
    order: 'display_order.asc',
    locale: args.locale,
    default_locale: args.locale,
  });

  return rows.map(normalizeService);
}

export async function getProjectsListServer(args: {
  locale: string;
  limit?: number;
  offset?: number;
}): Promise<Project[]> {
  return fetchList<Project>('/projects', {
    limit: args.limit ?? 200,
    offset: args.offset ?? 0,
    order: 'display_order.asc',
    view: 'card',
    locale: args.locale,
    is_published: true,
  });
}

export async function getBlogListServer(args: {
  locale: string;
  limit?: number;
  offset?: number;
}): Promise<CustomPageView[]> {
  const rows = await fetchList<unknown>('/custom_pages', {
    module_key: 'blog',
    is_published: 1,
    limit: args.limit ?? 60,
    offset: args.offset ?? 0,
    locale: args.locale,
  });

  return rows.map(normalizeCustomPage);
}

export async function getProductsListServer(args: {
  locale: string;
  limit?: number;
  offset?: number;
  category?: string;
}): Promise<ProductDto[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    limit: args.limit ?? 50,
    offset: args.offset ?? 0,
    order: 'display_order.asc',
    locale: args.locale,
    default_locale: args.locale,
  };
  if (args.category) params.category = args.category;

  const rows = await fetchList<unknown>('/products', params);
  return rows.map(normalizeProduct);
}

export async function getUiHomeServer(args: {
  locale: string;
}): Promise<UiHomeCopy> {
  const value = await getStaticSiteSettingValue('ui_home', args.locale);
  return normalizeUiHomeSettingValue(value ?? null);
}
