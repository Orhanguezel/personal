// =============================================================
// FILE: src/integrations/shared/products.types.ts
// Admin Products (Site Packages) RTK Types
// Backend: src/modules/products/schema.ts (site_packages + site_packages_i18n)
// =============================================================

import type { BoolLike, SortOrder } from '@/integrations/shared/common';

export type ProductType = 'digital' | 'service';
export type ProductStatus = 'draft' | 'active' | 'archived';

export interface ProductListAdminQueryParams {
  q?: string;
  locale?: string;
  default_locale?: string;
  limit?: number;
  offset?: number;
  order?: string;
  product_type?: ProductType;
  category?: string;
  is_featured?: BoolLike;
  status?: ProductStatus;
}

export interface ApiProductAdmin {
  id: string;
  product_type: ProductType;
  category: string | null;
  price_onetime: string | number | null;
  price_monthly: string | number | null;
  currency: string;
  status: ProductStatus;
  is_featured: 0 | 1;
  display_order: number;
  cover_image_url: string | null;
  gallery: string | string[] | null;
  demo_url: string | null;
  download_url: string | null;
  tags: string | string[] | null;
  tech_stack: string | string[] | null;
  paypal_plan_id: string | null;
  created_at: string;
  updated_at: string;

  // i18n coalesced
  title: string | null;
  slug: string | null;
  subtitle: string | null;
  description: string | null;
  features: string | string[] | null;
  seo_title: string | null;
  seo_description: string | null;

  locale_resolved?: string | null;
}

export interface ProductDto {
  id: string;
  product_type: ProductType;
  category: string | null;
  price_onetime: string | number | null;
  price_monthly: string | number | null;
  currency: string;
  status: ProductStatus;
  is_featured: boolean;
  display_order: number;
  cover_image_url: string | null;
  gallery: string[];
  demo_url: string | null;
  download_url: string | null;
  tags: string[];
  tech_stack: string[];
  paypal_plan_id: string | null;
  created_at: string;
  updated_at: string;

  title: string | null;
  slug: string | null;
  subtitle: string | null;
  description: string | null;
  features: string[];
  seo_title: string | null;
  seo_description: string | null;

  locale_resolved?: string | null;
}

export interface ProductListResult {
  items: ProductDto[];
  total: number;
}

export interface ProductCreatePayload {
  product_type?: ProductType;
  category?: string | null;
  price_onetime?: string | number | null;
  price_monthly?: string | number | null;
  currency?: string;
  status?: ProductStatus;
  is_featured?: BoolLike;
  display_order?: number;
  cover_image_url?: string | null;
  gallery?: string[];
  demo_url?: string | null;
  download_url?: string | null;
  tags?: string[];
  tech_stack?: string[];
  paypal_plan_id?: string | null;

  locale?: string;
  title?: string;
  slug?: string;
  subtitle?: string | null;
  description?: string | null;
  features?: string[];
  seo_title?: string | null;
  seo_description?: string | null;

  replicate_all_locales?: boolean;
}

export interface ProductUpdatePayload {
  product_type?: ProductType;
  category?: string | null;
  price_onetime?: string | number | null;
  price_monthly?: string | number | null;
  currency?: string;
  status?: ProductStatus;
  is_featured?: BoolLike;
  display_order?: number;
  cover_image_url?: string | null;
  gallery?: string[];
  demo_url?: string | null;
  download_url?: string | null;
  tags?: string[];
  tech_stack?: string[];
  paypal_plan_id?: string | null;

  locale?: string;
  title?: string;
  slug?: string;
  subtitle?: string | null;
  description?: string | null;
  features?: string[];
  seo_title?: string | null;
  seo_description?: string | null;

  apply_all_locales?: boolean;
}

export interface ProductFormValues {
  id?: string;
  locale: string;

  product_type: ProductType;
  category: string;
  price_onetime: string;
  price_monthly: string;
  currency: string;
  status: ProductStatus;
  is_featured: boolean;
  display_order: string;

  cover_image_url: string;
  gallery: string;
  demo_url: string;
  download_url: string;
  tags: string;
  tech_stack: string;
  paypal_plan_id: string;

  title: string;
  slug: string;
  subtitle: string;
  description: string;
  features: string;
  seo_title: string;
  seo_description: string;

  replicate_all_locales: boolean;
  apply_all_locales: boolean;
}

function safeJsonArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // ignore
    }
  }
  return [];
}

export const normalizeProduct = (row: ApiProductAdmin): ProductDto => ({
  id: row.id,
  product_type: row.product_type,
  category: row.category,
  price_onetime: row.price_onetime,
  price_monthly: row.price_monthly,
  currency: row.currency || 'EUR',
  status: row.status,
  is_featured: row.is_featured === 1,
  display_order: row.display_order ?? 0,
  cover_image_url: row.cover_image_url,
  gallery: safeJsonArray(row.gallery),
  demo_url: row.demo_url,
  download_url: row.download_url,
  tags: safeJsonArray(row.tags),
  tech_stack: safeJsonArray(row.tech_stack),
  paypal_plan_id: row.paypal_plan_id,
  created_at: row.created_at,
  updated_at: row.updated_at,
  title: row.title,
  slug: row.slug,
  subtitle: row.subtitle,
  description: row.description,
  features: safeJsonArray(row.features),
  seo_title: row.seo_title,
  seo_description: row.seo_description,
  locale_resolved: row.locale_resolved,
});

export function buildProductFormValues(
  product: ProductDto | undefined,
  locale: string,
): ProductFormValues {
  if (!product) {
    return {
      locale,
      product_type: 'digital',
      category: '',
      price_onetime: '',
      price_monthly: '',
      currency: 'EUR',
      status: 'draft',
      is_featured: false,
      display_order: '0',
      cover_image_url: '',
      gallery: '',
      demo_url: '',
      download_url: '',
      tags: '',
      tech_stack: '',
      paypal_plan_id: '',
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      features: '',
      seo_title: '',
      seo_description: '',
      replicate_all_locales: false,
      apply_all_locales: false,
    };
  }

  return {
    id: product.id,
    locale,
    product_type: product.product_type || 'digital',
    category: product.category || '',
    price_onetime: product.price_onetime != null ? String(product.price_onetime) : '',
    price_monthly: product.price_monthly != null ? String(product.price_monthly) : '',
    currency: product.currency || 'EUR',
    status: product.status || 'draft',
    is_featured: product.is_featured,
    display_order: String(product.display_order ?? 0),
    cover_image_url: product.cover_image_url || '',
    gallery: product.gallery.length > 0 ? JSON.stringify(product.gallery) : '',
    demo_url: product.demo_url || '',
    download_url: product.download_url || '',
    tags: product.tags.join(', '),
    tech_stack: product.tech_stack.join(', '),
    paypal_plan_id: product.paypal_plan_id || '',
    title: product.title || '',
    slug: product.slug || '',
    subtitle: product.subtitle || '',
    description: product.description || '',
    features: product.features.join('\n'),
    seo_title: product.seo_title || '',
    seo_description: product.seo_description || '',
    replicate_all_locales: false,
    apply_all_locales: false,
  };
}

export interface ProductFormProps {
  initialData?: ProductDto;
  onSubmit: (data: ProductFormValues) => void | Promise<void>;
  mode?: 'create' | 'edit';
  loading?: boolean;
  saving?: boolean;
  locales?: { value: string; label: string }[];
  localesLoading?: boolean;
  defaultLocale?: string;
  onCancel?: () => void;
  onLocaleChange?: (locale: string) => void;
}
