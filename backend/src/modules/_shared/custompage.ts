// src/modules/_shared/custompage.ts

import type { Sortable } from '@/modules/_shared';

export type CustomPageMerged = {
  id: string;

  module_key: string;

  is_published: 0 | 1;
  featured_image: string | null;
  featured_image_asset_id: string | null;

  display_order: number;
  order_num: number;

  image_url: string | null;
  storage_asset_id: string | null;
  images: string[];
  storage_image_ids: string[];

  created_at: Date;
  updated_at: Date;

  title: string | null;
  slug: string | null;
  category: string | null;
  content: string | null;
  summary: string | null;
  excerpt: string | null;
  featured_image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string | null;
  locale_resolved: string | null;
};




export type CustomPageListParams = {
  orderParam?: string;
  sort?: Sortable;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;

  is_published?: boolean | 0 | 1 | '0' | '1' | 'true' | 'false';
  q?: string;
  slug?: string;

  /** ✅ parent module_key filter */
  module_key?: string;

  locale: string;
  defaultLocale: string;
};



export type CustomPageListQuery = {
  order?: string;
  sort?: 'created_at' | 'updated_at' | 'display_order' | 'order_num';
  orderDir?: 'asc' | 'desc';
  limit?: string | number;
  offset?: string | number;
  is_published?: '0' | '1' | 'true' | 'false';
  q?: string;
  slug?: string;

  module_key?: string;

  locale?: string;
  default_locale?: string;
};
