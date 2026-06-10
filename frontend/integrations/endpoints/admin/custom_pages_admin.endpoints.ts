// =============================================================
// FILE: src/integrations/metahub/rtk/endpoints/admin/custom_pages_admin.endpoints.ts
// FINAL — backend-aligned (author_id + /by-module route fixed)
// Tipler types/customPages.ts'den geliyor; endpoint dosyası sade.
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  CustomPageRow,
  CustomPageView,
  UpsertCustomPageBody,
  PatchCustomPageBody,
  SetCustomPageCoverBody,
} from '@/integrations/shared';
import {
  normalizeCustomPage,
  toCustomPageApiBody,
  toCustomPageApiPatchBody,
} from '@/integrations/shared';

const BASE = '/admin/custom_pages';

export const customPagesAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listCustomPagesAdmin: b.query<
      CustomPageView[],
      {
        limit?: number;
        offset?: number;
        q?: string;
        slug?: string;
        module_key?: string;
        sort?: 'created_at' | 'updated_at';
        orderDir?: 'asc' | 'desc';
        is_published?: boolean | 0 | 1;
        tags?: string;
      } | void
    >({
      query: (params) => (params ? { url: BASE, params } : { url: BASE }),
      transformResponse: (res: unknown): CustomPageView[] =>
        Array.isArray(res) ? (res as CustomPageRow[]).map(normalizeCustomPage) : [],
      providesTags: (result) =>
        result && result.length
          ? [
              ...result.map((p) => ({ type: 'CustomPage' as const, id: p.id })),
              { type: 'CustomPages' as const, id: 'LIST' },
            ]
          : [{ type: 'CustomPages' as const, id: 'LIST' }],
    }),

    getCustomPageAdminById: b.query<CustomPageView, string>({
      query: (id) => ({ url: `${BASE}/${encodeURIComponent(id)}` }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      providesTags: (_r, _e, id) => [{ type: 'CustomPage' as const, id }],
    }),

    getCustomPageAdminBySlug: b.query<CustomPageView, { slug: string }>({
      query: ({ slug }) => ({ url: `${BASE}/by-slug/${encodeURIComponent(slug)}` }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      providesTags: (_r, _e, { slug }) => [{ type: 'CustomPage' as const, id: `SLUG_${slug}` }],
    }),

    // ✅ backend: /admin/custom_pages/by-module/:module_key/:slug
    getCustomPageAdminByModuleSlug: b.query<CustomPageView, { module_key: string; slug: string }>({
      query: ({ module_key, slug }) => ({
        url: `${BASE}/by-module/${encodeURIComponent(module_key)}/${encodeURIComponent(slug)}`,
      }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      providesTags: (_r, _e, { module_key, slug }) => [
        { type: 'CustomPage' as const, id: `MS_${module_key}_${slug}` },
      ],
    }),

    createCustomPageAdmin: b.mutation<CustomPageView, UpsertCustomPageBody>({
      query: (body) => ({ url: BASE, method: 'POST', body: toCustomPageApiBody(body) }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      invalidatesTags: [{ type: 'CustomPages' as const, id: 'LIST' }],
    }),

    updateCustomPageAdmin: b.mutation<CustomPageView, { id: string; body: PatchCustomPageBody }>({
      query: ({ id, body }) => ({
        url: `${BASE}/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: toCustomPageApiPatchBody(body),
      }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'CustomPage' as const, id: arg.id },
        { type: 'CustomPages' as const, id: 'LIST' },
      ],
    }),

    deleteCustomPageAdmin: b.mutation<{ ok: true }, string>({
      query: (id) => ({ url: `${BASE}/${encodeURIComponent(id)}`, method: 'DELETE' }),
      transformResponse: () => ({ ok: true as const }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'CustomPage' as const, id },
        { type: 'CustomPages' as const, id: 'LIST' },
      ],
    }),

    setCustomPageImageAdmin: b.mutation<
      CustomPageView,
      { id: string; body: SetCustomPageCoverBody }
    >({
      query: ({ id, body }) => ({
        url: `${BASE}/${encodeURIComponent(id)}/image`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: unknown): CustomPageView => normalizeCustomPage(res),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'CustomPage' as const, id: arg.id },
        { type: 'CustomPages' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListCustomPagesAdminQuery,
  useGetCustomPageAdminByIdQuery,
  useGetCustomPageAdminBySlugQuery,
  useGetCustomPageAdminByModuleSlugQuery,
  useCreateCustomPageAdminMutation,
  useUpdateCustomPageAdminMutation,
  useDeleteCustomPageAdminMutation,
  useSetCustomPageImageAdminMutation,
} = customPagesAdminApi;
