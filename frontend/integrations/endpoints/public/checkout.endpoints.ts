// src/integrations/endpoints/public/checkout.endpoints.ts

import { baseApi } from '@/integrations/baseApi';
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  CaptureOrderRequest,
  CaptureOrderResponse,
  ActivateSubscriptionRequest,
  OrderStatusDto,
} from '@/integrations/shared/checkout.types';

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    createCheckoutOrder: b.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: '/checkout/create',
        method: 'POST',
        body,
      }),
    }),

    captureCheckoutOrder: b.mutation<CaptureOrderResponse, CaptureOrderRequest>({
      query: (body) => ({
        url: '/checkout/capture',
        method: 'POST',
        body,
      }),
    }),

    activateSubscription: b.mutation<CaptureOrderResponse, ActivateSubscriptionRequest>({
      query: (body) => ({
        url: '/checkout/subscription/activate',
        method: 'POST',
        body,
      }),
    }),

    getOrderStatus: b.query<OrderStatusDto, string>({
      query: (orderId) => ({
        url: `/checkout/order/${orderId}`,
      }),
      providesTags: (_res, _e, id) => [{ type: 'Orders' as const, id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateCheckoutOrderMutation,
  useCaptureCheckoutOrderMutation,
  useActivateSubscriptionMutation,
  useGetOrderStatusQuery,
} = checkoutApi;
