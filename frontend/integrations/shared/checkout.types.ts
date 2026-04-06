// src/integrations/shared/checkout.types.ts
// Checkout / order types

export interface CreateOrderRequest {
  /** Varsayılan: site_packages ürünü */
  sellable_type?: 'product' | 'service' | 'project';
  product_id?: string;
  service_id?: string;
  project_id?: string;
  payment_type: 'onetime' | 'subscription';
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  customer_locale?: string;
  return_url: string;
  cancel_url: string;
}

export interface CreateOrderResponse {
  order_id: string;
  order_number: string;
  approve_url: string | null;
  paypal_order_id?: string;
  subscription_id?: string;
}

export interface CaptureOrderRequest {
  paypal_order_id: string;
}

export interface CaptureOrderResponse {
  order_id: string;
  status: string;
  order?: OrderStatusDto;
}

export interface ActivateSubscriptionRequest {
  subscription_id: string;
  order_id: string;
}

export interface OrderStatusDto {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_type: string;
  total_amount: string;
  currency: string;
  delivery_type: string;
  delivery_url: string | null;
  created_at: string;
}
