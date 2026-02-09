// =============================================================
// FILE: src/integrations/endpoints/public/seo.endpoints.ts
// FINAL — Public SEO endpoints (SiteSettings-backed)
// - Uses /site_settings with SEO_KEY_LIST_ALL
// - Builds SeoAll via seo.mapper (single source)
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type { SeoAll } from '@/integrations/shared';
import { rowsToMap } from '@/integrations/shared';
import { SEO_KEY_LIST_ALL, buildSeoAllFromSettings } from '@/seo';

const PUBLIC_BASE = '/site_settings';

const extendedApi = baseApi.enhanceEndpoints({
  addTagTypes: ['Seo'] as const,
});

export const seoApi = extendedApi.injectEndpoints({
  endpoints: (b) => ({
    seoAll: b.query<SeoAll, { locale?: string } | void>({
      query: (arg) => ({
        url: PUBLIC_BASE,
        method: 'GET',
        params: {
          keys: SEO_KEY_LIST_ALL.join(','),
          limit: SEO_KEY_LIST_ALL.length,
          ...(arg?.locale ? { locale: arg.locale } : {}),
        },
      }),
      transformResponse: (raw: unknown) => buildSeoAllFromSettings(rowsToMap(raw)),
      providesTags: [{ type: 'Seo' as const, id: 'ALL' }],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const { useSeoAllQuery } = seoApi;
