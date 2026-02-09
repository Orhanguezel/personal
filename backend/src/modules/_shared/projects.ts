

import type { Sortable, } from '@/modules/_shared';
import { safeJson,toBool } from '@/modules/_shared';

export type ProjectListParams = {
  orderParam?: string;
  sort?: Sortable;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;

  is_published?: boolean | 0 | 1 | '0' | '1' | 'true' | 'false';
  is_featured?: boolean | 0 | 1 | '0' | '1' | 'true' | 'false';

  q?: string;
  slug?: string;

  category?: string;
  client?: string;

  locale: string;
  defaultLocale: string;
};



export type ProjectMerged = {
  id: string;
  is_published: 0 | 1;
  is_featured: 0 | 1;
  display_order: number;

  featured_image: string | null;
  featured_image_asset_id: string | null;

  demo_url: string | null;
  repo_url: string | null;

  category: string | null;
  client_name: string | null;
  start_date: string | Date | null;
  complete_date: string | Date | null;
  completion_time_label: string | null;
  services: string | null;
  website_url: string | null;

  techs: string | null;

  created_at: string | Date;
  updated_at: string | Date;

  title: string | null;
  slug: string | null;
  summary: string | null;
  content: string | null;
  featured_image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  locale_resolved: string | null;
};



export type ListQuery = {
  order?: string;
  sort?: 'created_at' | 'updated_at' | 'display_order';
  orderDir?: 'asc' | 'desc';
  limit?: string;
  offset?: string;

  is_published?: '0' | '1' | 'true' | 'false';
  is_featured?: '0' | '1' | 'true' | 'false';

  q?: string;
  slug?: string;

  category?: string;
  client?: string;

  view?: 'card' | 'detail';
  select?: string;

  // (opsiyonel) FE ileride orderBy yollarsa:
  orderBy?: 'created_at' | 'updated_at' | 'display_order';
};


export const parseContent = (s: string | null) => {
  const obj = safeJson<Record<string, any>>(s, {});
  return {
    html: typeof obj.html === 'string' ? obj.html : '',
    description: typeof obj.description === 'string' ? obj.description : null,
    key_features: Array.isArray(obj.key_features) ? obj.key_features : [],
    technologies_used: Array.isArray(obj.technologies_used) ? obj.technologies_used : [],
    design_highlights: Array.isArray(obj.design_highlights) ? obj.design_highlights : [],
  };
};

export const parseArr = (raw: string | null) => safeJson<string[]>(raw, []).filter(Boolean);

export const toCard = (p: ProjectMerged) => ({
  id: p.id,

  is_published: toBool(p.is_published),
  is_featured: toBool(p.is_featured),
  display_order: p.display_order ?? 0,

  featured_image: p.featured_image ?? null,
  featured_image_asset_id: p.featured_image_asset_id ?? null,

  demo_url: p.demo_url ?? null,
  repo_url: p.repo_url ?? null,

  category: p.category ?? null,
  client_name: p.client_name ?? null,

  start_date: p.start_date ?? null,
  complete_date: p.complete_date ?? null,
  completion_time_label: p.completion_time_label ?? null,

  services: parseArr(p.services),
  website_url: p.website_url ?? null,

  techs: parseArr(p.techs),

  locale: p.locale_resolved ?? null,
  title: p.title ?? '',
  slug: p.slug ?? '',
  summary: p.summary ?? null,

  content: p.content ?? JSON.stringify({ html: '' }), // card: string

  featured_image_alt: p.featured_image_alt ?? null,
  meta_title: p.meta_title ?? null,
  meta_description: p.meta_description ?? null,

  created_at: p.created_at as any,
  updated_at: p.updated_at as any,
});

export const toDetail = (p: ProjectMerged) => ({
  ...toCard(p),
  content: parseContent(p.content), // detail: object
});
