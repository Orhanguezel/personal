// =============================================================
// FILE: src/integrations/shared/orders.types.ts
// Admin Orders + Subscriptions RTK Types
// Backend: src/modules/checkout/schema.ts
// =============================================================

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';
export type PaymentType = 'onetime' | 'subscription';
export type DeliveryType = 'digital' | 'service';
export type SubscriptionStatus = 'active' | 'suspended' | 'cancelled' | 'expired';

export interface OrderListAdminQueryParams {
  q?: string;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  payment_type?: PaymentType;
  limit?: number;
  offset?: number;
}

export interface OrderDto {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  customer_locale: string;
  status: OrderStatus;
  payment_type: PaymentType;
  total_amount: string | number;
  currency: string;
  paypal_order_id: string | null;
  paypal_subscription_id: string | null;
  paypal_capture_id: string | null;
  payment_status: PaymentStatus;
  delivery_type: DeliveryType;
  delivery_url: string | null;
  delivery_note: string | null;
  delivered_at: string | null;
  admin_note: string | null;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItemDto {
  id: string;
  order_id: string;
  product_id: string | null;
  title: string;
  price: string | number;
  currency: string;
  quantity: number;
  item_type: string;
  created_at: string;
}

export interface PaymentDto {
  id: string;
  order_id: string;
  provider: string;
  transaction_id: string | null;
  amount: string | number;
  currency: string;
  status: string;
  raw_response: unknown;
  created_at: string;
}

export interface OrderDetailDto extends OrderDto {
  items: OrderItemDto[];
  payments: PaymentDto[];
}

export interface OrderListResult {
  items: OrderDto[];
  total: number;
}

export interface OrderUpdatePayload {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  delivery_url?: string | null;
  delivery_note?: string | null;
  admin_note?: string | null;
}

export interface SubscriptionDto {
  id: string;
  order_id: string;
  product_id: string | null;
  customer_email: string;
  paypal_subscription_id: string | null;
  paypal_plan_id: string | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionListResult {
  items: SubscriptionDto[];
  total: number;
}

export const normalizeOrder = (row: any): OrderDto => ({
  id: row.id,
  order_number: row.order_number || '',
  customer_email: row.customer_email || '',
  customer_name: row.customer_name || '',
  customer_phone: row.customer_phone || null,
  customer_locale: row.customer_locale || 'de',
  status: row.status || 'pending',
  payment_type: row.payment_type || 'onetime',
  total_amount: row.total_amount,
  currency: row.currency || 'EUR',
  paypal_order_id: row.paypal_order_id || null,
  paypal_subscription_id: row.paypal_subscription_id || null,
  paypal_capture_id: row.paypal_capture_id || null,
  payment_status: row.payment_status || 'unpaid',
  delivery_type: row.delivery_type || 'digital',
  delivery_url: row.delivery_url || null,
  delivery_note: row.delivery_note || null,
  delivered_at: row.delivered_at || null,
  admin_note: row.admin_note || null,
  ip_address: row.ip_address || null,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

export const normalizeSubscription = (row: any): SubscriptionDto => ({
  id: row.id,
  order_id: row.order_id || '',
  product_id: row.product_id || null,
  customer_email: row.customer_email || '',
  paypal_subscription_id: row.paypal_subscription_id || null,
  paypal_plan_id: row.paypal_plan_id || null,
  status: row.status || 'active',
  current_period_start: row.current_period_start || null,
  current_period_end: row.current_period_end || null,
  cancelled_at: row.cancelled_at || null,
  created_at: row.created_at,
  updated_at: row.updated_at,
});
