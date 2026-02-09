// ===================================================================
// FILE: src/integrations/endpoints/offers.public.endpoints.ts
// FINAL — Offers (PUBLIC) RTK
// - POST /offers (public)
// ===================================================================

import { baseApi } from '@/integrations/baseApi';
import type { OfferPublicCreateBody, OfferView } from '@/integrations/shared';
import { normalizeOffer, toOfferPublicCreateBody } from '@/integrations/shared';

const BASE = '/offers';

export const offersPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    /** POST /offers */
    createOfferPublic: b.mutation<OfferView, OfferPublicCreateBody>({
      query: (body) => ({
        url: BASE,
        method: 'POST',
        body: toOfferPublicCreateBody(body),
      }),
      transformResponse: (res: unknown): OfferView => normalizeOffer(res),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOfferPublicMutation } = offersPublicApi;
