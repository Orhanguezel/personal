// =============================================================
// FILE: src/integrations/endpoints/public/bookings_public.endpoints.ts
// FINAL — Public bookings RTK (backend-aligned)
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type { PublicCreateBookingBody, PublicCreateBookingResp } from '@/integrations/shared';

export const bookingsPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    createBookingPublic: b.mutation<PublicCreateBookingResp, PublicCreateBookingBody>({
      query: (body) => ({ url: '/bookings', method: 'POST', body }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateBookingPublicMutation } = bookingsPublicApi;
