// ===================================================================
// FILE: src/integrations/endpoints/popups.public.endpoints.ts
// FINAL — Popups (PUBLIC) RTK
// ===================================================================

import { baseApi } from '@/integrations/baseApi';
import type { CampaignPopupView, PopupListQuery } from '@/integrations/shared';
import {
  normalizeCampaignPopup,
  normalizeCampaignPopupList,
  toPopupListQueryParams,
} from '@/integrations/shared';

const BASE = '/popups';

export const popupsPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    /** GET /popups */
    listPopupsPublic: b.query<CampaignPopupView[], PopupListQuery | void>({
      query: (q) => ({
        url: BASE,
        method: 'GET',
        params: q ? toPopupListQueryParams(q) : undefined,
      }),
      transformResponse: (res: unknown) => normalizeCampaignPopupList(res),
      providesTags: (result) =>
        result && result.length
          ? [
              ...result.map((x) => ({ type: 'Popup' as const, id: x.id })),
              { type: 'Popups' as const, id: 'PUBLIC_LIST' },
            ]
          : [{ type: 'Popups' as const, id: 'PUBLIC_LIST' }],
      keepUnusedDataFor: 20,
    }),

    /** GET /popups/by-key/:key */
    getPopupByKeyPublic: b.query<CampaignPopupView, { key: string }>({
      query: ({ key }) => ({
        url: `${BASE}/by-key/${encodeURIComponent(key)}`,
        method: 'GET',
      }),
      transformResponse: (res: unknown) => normalizeCampaignPopup(res),
      providesTags: (_r, _e, arg) => [{ type: 'Popup' as const, id: `key:${arg.key}` }],
      keepUnusedDataFor: 30,
    }),
  }),
  overrideExisting: true,
});

export const {
  useListPopupsPublicQuery,
  useLazyListPopupsPublicQuery,
  useGetPopupByKeyPublicQuery,
  useLazyGetPopupByKeyPublicQuery,
} = popupsPublicApi;
