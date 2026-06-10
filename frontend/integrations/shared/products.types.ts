// src/integrations/shared/products.types.ts
// Site packages (products) types + normalizers

export interface ProductDto {
  id: string;
  product_type: 'digital' | 'service';
  category: string;
  price_onetime: string | null;
  price_monthly: string | null;
  currency: string;
  status: string;
  is_featured: number;
  display_order: number;
  cover_image_url: string | null;
  gallery: string[] | null;
  demo_url: string | null;
  download_url: string | null;
  tags: string[] | null;
  tech_stack: string[] | null;
  paypal_plan_id: string | null;
  created_at: string;
  updated_at: string;
  // i18n
  title: string | null;
  slug: string | null;
  subtitle: string | null;
  description: string | null;
  features: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  locale_resolved: string | null;
}

export interface ProductListQueryParams {
  locale?: string;
  default_locale?: string;
  limit?: number;
  offset?: number;
  order?: string;
  q?: string;
  product_type?: string;
  category?: string;
  is_featured?: boolean;
}

export interface ProductListResult {
  items: ProductDto[];
  total: number;
}

function safeJsonArray(val: unknown): string[] | null {
  if (!val) return null;
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {}
  }
  return null;
}

export function normalizeProduct(raw: any): ProductDto {
  return {
    id: raw.id ?? '',
    product_type: raw.product_type ?? 'service',
    category: raw.category ?? 'landing',
    price_onetime: raw.price_onetime ?? null,
    price_monthly: raw.price_monthly ?? null,
    currency: raw.currency ?? 'EUR',
    status: raw.status ?? 'draft',
    is_featured: raw.is_featured ?? 0,
    display_order: raw.display_order ?? 0,
    cover_image_url: raw.cover_image_url ?? null,
    gallery: safeJsonArray(raw.gallery),
    demo_url: raw.demo_url ?? null,
    download_url: raw.download_url ?? null,
    tags: safeJsonArray(raw.tags),
    tech_stack: safeJsonArray(raw.tech_stack),
    paypal_plan_id: raw.paypal_plan_id ?? null,
    created_at: raw.created_at ?? '',
    updated_at: raw.updated_at ?? '',
    title: raw.title ?? null,
    slug: raw.slug ?? null,
    subtitle: raw.subtitle ?? null,
    description: raw.description ?? null,
    features: safeJsonArray(raw.features),
    seo_title: raw.seo_title ?? null,
    seo_description: raw.seo_description ?? null,
    locale_resolved: raw.locale_resolved ?? null,
  };
}

export function formatPrice(amount: string | null, currency = 'EUR'): string {
  if (!amount) return '';
  const num = parseFloat(amount);
  if (isNaN(num)) return '';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}
