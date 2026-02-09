// =============================================================
// FILE: src/integrations/endpoints/public/custom_pages.endpoints.ts
// FINAL — backend-aligned (+ optional locale/sort/orderDir for FE typing)
// - locale backend'te yoksa bile param olarak göndermek sorun değil (ignore edilebilir)
// - Exports BOTH normal + lazy hooks (BlogDetail fallback needs lazy)
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  CustomPageRow,
  CustomPageView,
  CustomPagesListParams,
  CustomPageBySlugParams,
  CustomPageByModuleSlugParams,
} from '@/integrations/shared';
import { normalizeCustomPage } from '@/integrations/shared';

const BASE = '/custom_pages';

export const customPagesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listCustomPages: b.query<CustomPageView[], CustomPagesListParams>({
      query: (params) => ({ url: `${BASE}`, params }),
      transformResponse: (res: unknown): CustomPageView[] =>
        Array.isArray(res) ? (res as CustomPageRow[]).map(normalizeCustomPage) : [],
      providesTags: (result) =>
        result && result.length
          ? [
              ...result.map((p) => ({ type: 'CustomPage' as const, id: p.id })),
              { type: 'CustomPages' as const, id: 'LIST' },
            ]
          : [{ type: 'CustomPages' as const, id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),

    getCustomPageBySlug: b.query<CustomPageView, CustomPageBySlugParams>({
      query: ({ slug, ...params }) => ({
        url: `${BASE}/by-slug/${encodeURIComponent(slug)}`,
        params,
      }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      providesTags: (_r, _e, { slug }) => [{ type: 'CustomPage' as const, id: `SLUG_${slug}` }],
    }),

    // ✅ recommended: /custom_pages/by-module/:module_key/:slug
    getCustomPageByModuleSlug: b.query<CustomPageView, CustomPageByModuleSlugParams>({
      query: ({ module_key, slug, ...params }) => ({
        url: `${BASE}/by-module/${encodeURIComponent(module_key)}/${encodeURIComponent(slug)}`,
        params,
      }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      providesTags: (_r, _e, { module_key, slug }) => [
        { type: 'CustomPage' as const, id: `MS_${module_key}_${slug}` },
      ],
    }),

    getCustomPageById: b.query<CustomPageView, string>({
      query: (id) => ({ url: `${BASE}/${encodeURIComponent(id)}` }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      providesTags: (_r, _e, id) => [{ type: 'CustomPage' as const, id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  // list
  useListCustomPagesQuery,
  useLazyListCustomPagesQuery,

  // by slug
  useGetCustomPageBySlugQuery,
  useLazyGetCustomPageBySlugQuery,

  // by module+slug
  useGetCustomPageByModuleSlugQuery,
  useLazyGetCustomPageByModuleSlugQuery,

  // by id
  useGetCustomPageByIdQuery,
  useLazyGetCustomPageByIdQuery,
} = customPagesApi;
