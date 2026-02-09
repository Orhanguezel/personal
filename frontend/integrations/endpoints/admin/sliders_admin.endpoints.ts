// src/integrations/metahub/rtk/endpoints/admin/sliders_admin.endpoints.ts

import { baseApi } from '@/integrations/baseApi';
import type { FetchArgs } from '@reduxjs/toolkit/query';
import type {
  SliderAdminView,
  SliderAdminRow,
  SliderRow,
  SliderAdminListParams,
  SliderCreateInput,
  SliderUpdateInput,
  SliderStatusBody,
  SliderReorderBody,
  SliderSetImageBody,
} from '@/integrations/shared';
import { buildSliderParams, toAdminSliderView } from '@/integrations/shared';

const ADMIN_BASE = '/admin/sliders';

export const slidersAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    adminListSlides: b.query<SliderAdminView[], void | SliderAdminListParams>({
      query: (params): FetchArgs | string => {
        const qp = buildSliderParams(params as SliderAdminListParams | undefined);
        return qp ? { url: ADMIN_BASE, params: qp } : ADMIN_BASE;
      },
      transformResponse: (res: unknown): SliderAdminView[] => {
        const arr = Array.isArray(res) ? (res as SliderAdminRow[]) : [];
        return arr.map(toAdminSliderView);
      },
      providesTags: (result) =>
        result
          ? [
              { type: 'Slider' as const, id: 'LIST' },
              ...result.map((x) => ({ type: 'Slider' as const, id: x.id })),
            ]
          : [{ type: 'Slider' as const, id: 'LIST' }],
    }),

    adminGetSlide: b.query<SliderAdminView, string | number>({
      query: (id): FetchArgs | string => `${ADMIN_BASE}/${encodeURIComponent(String(id))}`,
      transformResponse: (res: unknown): SliderAdminView =>
        toAdminSliderView(res as SliderAdminRow),
      providesTags: (_r, _e, id) => [{ type: 'Slider' as const, id: String(id) }],
    }),

    adminCreateSlide: b.mutation<SliderAdminView, SliderCreateInput>({
      query: (body): FetchArgs => ({ url: ADMIN_BASE, method: 'POST', body }),
      transformResponse: (res: unknown): SliderAdminView => {
        const row = res as SliderRow & { image_effective_url?: string | null };
        const withUrl: SliderAdminRow = {
          ...(row as SliderRow),
          image_effective_url:
            (row as any).image_effective_url ?? (row as any).asset_url ?? row.image_url ?? null,
        };
        return toAdminSliderView(withUrl);
      },
      invalidatesTags: [{ type: 'Slider' as const, id: 'LIST' }],
    }),

    adminUpdateSlide: b.mutation<SliderAdminView, { id: string | number; body: SliderUpdateInput }>(
      {
        query: ({ id, body }): FetchArgs => ({
          url: `${ADMIN_BASE}/${encodeURIComponent(String(id))}`,
          method: 'PATCH',
          body,
        }),
        transformResponse: (res: unknown): SliderAdminView => {
          const row = res as SliderRow & { image_effective_url?: string | null };
          const withUrl: SliderAdminRow = {
            ...(row as SliderRow),
            image_effective_url:
              (row as any).image_effective_url ?? (row as any).asset_url ?? row.image_url ?? null,
          };
          return toAdminSliderView(withUrl);
        },
        invalidatesTags: (_r, _e, arg) => [
          { type: 'Slider' as const, id: String(arg.id) },
          { type: 'Slider' as const, id: 'LIST' },
        ],
      },
    ),

    adminDeleteSlide: b.mutation<{ ok: true }, string | number>({
      query: (id): FetchArgs => ({
        url: `${ADMIN_BASE}/${encodeURIComponent(String(id))}`,
        method: 'DELETE',
      }),
      transformResponse: (): { ok: true } => ({ ok: true }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Slider' as const, id: String(id) },
        { type: 'Slider' as const, id: 'LIST' },
      ],
    }),

    adminReorderSlides: b.mutation<{ ok: true }, SliderReorderBody>({
      query: (body): FetchArgs => ({ url: `${ADMIN_BASE}/reorder`, method: 'POST', body }),
      transformResponse: (): { ok: true } => ({ ok: true }),
      invalidatesTags: [{ type: 'Slider' as const, id: 'LIST' }],
    }),

    adminSetSlideStatus: b.mutation<
      SliderAdminView,
      { id: string | number; body: SliderStatusBody }
    >({
      query: ({ id, body }): FetchArgs => ({
        url: `${ADMIN_BASE}/${encodeURIComponent(String(id))}/status`,
        method: 'POST',
        body,
      }),
      transformResponse: (res: unknown): SliderAdminView =>
        toAdminSliderView(res as SliderAdminRow),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Slider' as const, id: String(arg.id) },
        { type: 'Slider' as const, id: 'LIST' },
      ],
    }),

    /** ✅ Tek uç: PATCH /admin/sliders/:id/image { asset_id?: string | null } */
    adminSetSlideImage: b.mutation<
      SliderAdminView,
      { id: string | number; body: SliderSetImageBody }
    >({
      query: ({ id, body }): FetchArgs => ({
        url: `${ADMIN_BASE}/${encodeURIComponent(String(id))}/image`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: unknown): SliderAdminView =>
        toAdminSliderView(res as SliderAdminRow),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Slider' as const, id: String(arg.id) },
        { type: 'Slider' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAdminListSlidesQuery,
  useAdminGetSlideQuery,
  useAdminCreateSlideMutation,
  useAdminUpdateSlideMutation,
  useAdminDeleteSlideMutation,
  useAdminReorderSlidesMutation,
  useAdminSetSlideStatusMutation,
  useAdminSetSlideImageMutation,
} = slidersAdminApi;
