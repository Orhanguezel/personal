// ===================================================================
// FILE: frontend/src/integrations/endpoints/brands.endpoints.ts
// FINAL — Public brands endpoints
// - base: /brands
// - unwrap tolerant
// ===================================================================

import { baseApi } from '@/integrations/baseApi';
import type { BrandsGroupedResponse, BrandListParams } from '@/integrations/shared';
import { unwrap, toPublicBrandQuery } from '@/integrations/shared';

const BASE = '/brands';

export const brandsPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /brands?locale=xx => grouped response
    getBrands: b.query<BrandsGroupedResponse, BrandListParams | void>({
      query: (p) => ({ url: BASE, params: toPublicBrandQuery(p) }),
      transformResponse: (raw: any) => unwrap<BrandsGroupedResponse>(raw),
      providesTags: () => [{ type: 'Brand' as const, id: 'PUBLIC' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetBrandsQuery } = brandsPublicApi;
