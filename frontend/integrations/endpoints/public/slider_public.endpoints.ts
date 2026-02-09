// src/integrations/endpoints/slider_public.endpoints.ts

import { baseApi } from '@/integrations/baseApi';
import type { FetchArgs } from '@reduxjs/toolkit/query';
import type { SliderPublic, SliderListParams } from '@/integrations/shared';
import { buildParams } from '@/integrations/shared';

const BASE = '/sliders';

export const sliderPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listSlidesPublic: b.query<SliderPublic[], void | SliderListParams>({
      query: (params): FetchArgs | string => {
        const qp = buildParams(params as SliderListParams | undefined);
        return qp
          ? { url: BASE, params: qp, headers: { 'x-skip-auth': '1' } }
          : { url: BASE, headers: { 'x-skip-auth': '1' } };
      },
      providesTags: (res) =>
        res
          ? [
              ...res.map((s) => ({ type: 'SliderPublic' as const, id: s.id })),
              { type: 'SliderPublic' as const, id: 'LIST' },
            ]
          : [{ type: 'SliderPublic' as const, id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),

    getSlidePublic: b.query<SliderPublic, string>({
      query: (idOrSlug): FetchArgs => ({
        url: `${BASE}/${encodeURIComponent(idOrSlug)}`,
        headers: { 'x-skip-auth': '1' },
      }),
      providesTags: (r) =>
        r
          ? [{ type: 'SliderPublic' as const, id: r.id }]
          : [{ type: 'SliderPublic' as const, id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const { useListSlidesPublicQuery, useGetSlidePublicQuery } = sliderPublicApi;
