// ---------------------------------------------------------------------
// FILE: src/integrations/metahub/rtk/endpoints/pricing.endpoints.ts
// FINAL — Public Pricing RTK endpoints
// - GET /pricing?locale=en&plans_limit=10
// ---------------------------------------------------------------------

import { baseApi } from '@/integrations/baseApi';
import type { PricingPublicResponse, PricingPublicParams } from '@/integrations/shared';
import { toPublicPricingQuery } from '@/integrations/shared';

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getPricing: b.query<PricingPublicResponse, PricingPublicParams | void>({
      query: (p) => ({ url: '/pricing', params: toPublicPricingQuery(p) }),
      providesTags: () => [{ type: 'Pricing' as const, id: 'PUBLIC' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPricingQuery } = pricingApi;
