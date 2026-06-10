// =============================================================
// FILE: src/integrations/endpoints/admin/orders_admin.endpoints.ts
// Admin Orders + Subscriptions RTK Endpoints
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  OrderDto,
  OrderDetailDto,
  OrderListResult,
  OrderListAdminQueryParams,
  OrderUpdatePayload,
  SubscriptionDto,
  SubscriptionListResult,
} from '@/integrations/shared/orders.types';
import { normalizeOrder, normalizeSubscription } from '@/integrations/shared/orders.types';

export const ordersAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listOrdersAdmin: build.query<OrderListResult, OrderListAdminQueryParams | void>({
      query: (params) => ({
        url: '/admin/orders',
        method: 'GET',
        params: params ?? {},
        credentials: 'include',
      }),
      transformResponse: (response: any[], meta) => {
        const items = Array.isArray(response) ? response.map(normalizeOrder) : [];
        const totalHeader = meta?.response?.headers.get('x-total-count');
        const totalFromHeader = totalHeader ? Number(totalHeader) : Number.NaN;
        const total = Number.isFinite(totalFromHeader) ? totalFromHeader : items.length;
        return { items, total };
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order' as const, id: 'LIST' },
            ]
          : [{ type: 'Order' as const, id: 'LIST' }],
    }),

    getOrderAdmin: build.query<OrderDetailDto, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/orders/${encodeURIComponent(id)}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: (_result, _error, { id }) => [{ type: 'Order', id }],
    }),

    updateOrderAdmin: build.mutation<OrderDto, { id: string; patch: OrderUpdatePayload }>({
      query: ({ id, patch }) => ({
        url: `/admin/orders/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: patch,
        credentials: 'include',
      }),
      transformResponse: (resp: any) => normalizeOrder(resp),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
      ],
    }),

    listSubscriptionsAdmin: build.query<SubscriptionListResult, { limit?: number; offset?: number } | void>({
      query: (params) => ({
        url: '/admin/subscriptions',
        method: 'GET',
        params: params ?? {},
        credentials: 'include',
      }),
      transformResponse: (response: any[], meta) => {
        const items = Array.isArray(response) ? response.map(normalizeSubscription) : [];
        const totalHeader = meta?.response?.headers.get('x-total-count');
        const totalFromHeader = totalHeader ? Number(totalHeader) : Number.NaN;
        const total = Number.isFinite(totalFromHeader) ? totalFromHeader : items.length;
        return { items, total };
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'Subscription' as const, id })),
              { type: 'Subscription' as const, id: 'LIST' },
            ]
          : [{ type: 'Subscription' as const, id: 'LIST' }],
    }),

    cancelSubscriptionAdmin: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/subscriptions/${encodeURIComponent(id)}/cancel`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Subscription', id },
        { type: 'Subscription', id: 'LIST' },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListOrdersAdminQuery,
  useGetOrderAdminQuery,
  useUpdateOrderAdminMutation,
  useListSubscriptionsAdminQuery,
  useCancelSubscriptionAdminMutation,
} = ordersAdminApi;
