// =============================================================
// FILE: src/integrations/endpoints/admin/bookings_admin.endpoints.ts
// FINAL — Admin bookings RTK (backend-aligned)
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  AdminBookingsListParams,
  AdminCreateBookingBody,
  AdminUpdateBookingBody,
  BookingView,
} from '@/integrations/shared';
import {
  normalizeBooking,
  normalizeBookingList,
  toAdminBookingsQuery,
  toAdminUpdateBookingBody,
} from '@/integrations/shared';

const BASE = '/admin/bookings';

export const bookingsAdminApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listBookingsAdmin: b.query<BookingView[], AdminBookingsListParams | void>({
      query: (params) => ({
        url: BASE,
        method: 'GET',
        params: params ? toAdminBookingsQuery(params) : undefined,
      }),
      transformResponse: (res: unknown): BookingView[] => normalizeBookingList(res),
      providesTags: (result) =>
        result && result.length
          ? [
              ...result.map((x) => ({ type: 'Booking' as const, id: x.id })),
              { type: 'Bookings' as const, id: 'LIST' },
            ]
          : [{ type: 'Bookings' as const, id: 'LIST' }],
    }),

    getBookingAdmin: b.query<BookingView, { id: string }>({
      query: ({ id }) => ({ url: `${BASE}/${encodeURIComponent(id)}`, method: 'GET' }),
      transformResponse: (res: unknown): BookingView => normalizeBooking(res),
      providesTags: (_r, _e, arg) => [{ type: 'Booking' as const, id: arg.id }],
    }),

    createBookingAdmin: b.mutation<BookingView, AdminCreateBookingBody>({
      query: (body) => ({ url: BASE, method: 'POST', body }),
      transformResponse: (res: unknown): BookingView => normalizeBooking(res),
      invalidatesTags: [{ type: 'Bookings' as const, id: 'LIST' }],
    }),

    updateBookingAdmin: b.mutation<BookingView, { id: string; body: AdminUpdateBookingBody }>({
      query: ({ id, body }) => ({
        url: `${BASE}/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: toAdminUpdateBookingBody(body),
      }),
      transformResponse: (res: unknown): BookingView => normalizeBooking(res),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Booking' as const, id: arg.id },
        { type: 'Bookings' as const, id: 'LIST' },
      ],
    }),

    markBookingReadAdmin: b.mutation<BookingView, { id: string }>({
      query: ({ id }) => ({ url: `${BASE}/${encodeURIComponent(id)}/read`, method: 'POST' }),
      transformResponse: (res: unknown): BookingView => normalizeBooking(res),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Booking' as const, id: arg.id },
        { type: 'Bookings' as const, id: 'LIST' },
      ],
    }),

    deleteBookingAdmin: b.mutation<{ ok: true }, { id: string }>({
      query: ({ id }) => ({ url: `${BASE}/${encodeURIComponent(id)}`, method: 'DELETE' }),
      // backend 204 — FE sabit ok:true
      transformResponse: () => ({ ok: true as const }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Booking' as const, id: arg.id },
        { type: 'Bookings' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListBookingsAdminQuery,
  useGetBookingAdminQuery,
  useCreateBookingAdminMutation,
  useUpdateBookingAdminMutation,
  useMarkBookingReadAdminMutation,
  useDeleteBookingAdminMutation,
} = bookingsAdminApi;
