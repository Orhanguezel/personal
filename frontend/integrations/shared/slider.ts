// -------------------------------------------------------------
// FILE: src/integrations/types/slider.ts
// -------------------------------------------------------------
import { toBool } from '@/integrations/shared';
/** Public model (FE) */
export interface SliderPublic {
  id: number;
  title: string;
  description: string;
  image: string; // effective url
  alt?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;

  featured?: boolean;
  isActive?: boolean;
  order?: number;
}

/** DB satırı tipini yansıtan raw model (admin controller {...sl}) */
export interface SliderRow {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;

  image_url: string | null;
  /** ✅ backend ile aynı isim */
  image_asset_id: string | null;
  alt: string | null;
  buttonText: string | null;
  buttonLink: string | null;

  featured: number; // 0 | 1
  is_active: number; // 0 | 1
  display_order: number;

  created_at: string;
  updated_at: string;
}

/** Admin yanıtında ek alan */
export interface SliderAdminRow extends SliderRow {
  image_effective_url: string | null;
}

/** Admin UI görünümü */
export interface SliderAdminView {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;

  image_url: string | null;
  image_asset_id: string | null;
  image_effective_url: string | null;

  alt: string | null;
  buttonText: string | null;
  buttonLink: string | null;

  featured: boolean;
  is_active: boolean;
  display_order: number;

  created_at: string;
  updated_at: string;
}

/** Public list query */
export interface SliderListParams {
  q?: string;
  limit?: number;
  offset?: number;
  sort?: 'display_order' | 'name' | 'created_at' | 'updated_at';
  order?: 'asc' | 'desc';
}

/** Admin list query */
export interface SliderAdminListParams extends SliderListParams {
  is_active?: boolean;
}

/** Create / Update inputları (backend zod ile parse ediyor) */
export interface SliderCreateInput {
  name: string;
  slug?: string;
  description?: string | null;

  image_url?: string | null;
  /** ✅ backend ile aynı isim */
  image_asset_id?: string | null;
  alt?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;

  featured?: boolean;
  is_active?: boolean;
  display_order?: number;
}

export interface SliderUpdateInput {
  name?: string;
  slug?: string;
  description?: string | null;

  image_url?: string | null;
  /** ✅ backend ile aynı isim */
  image_asset_id?: string | null;
  alt?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;

  featured?: boolean;
  is_active?: boolean;
  display_order?: number;
}

/** Yardımcı body’ler */
export interface SliderStatusBody {
  is_active: boolean;
}
export interface SliderReorderBody {
  ids: number[];
}

/** ✅ Yeni: tek uç sözleşmesi */
export interface SliderSetImageBody {
  asset_id?: string | null;
}

export const buildParams = (p?: SliderListParams) => {
  if (!p) return undefined;
  const o: Record<string, string | number> = {};
  if (p.q) o.q = p.q;
  if (p.limit != null) o.limit = p.limit;
  if (p.offset != null) o.offset = p.offset;
  if (p.sort) o.sort = p.sort;
  if (p.order) o.order = p.order;
  return o;
};

export const buildSliderParams = (p?: SliderAdminListParams) => {
  if (!p) return undefined;
  const o: Record<string, string | number | boolean> = {};
  if (p.q) o.q = p.q;
  if (p.limit != null) o.limit = p.limit;
  if (p.offset != null) o.offset = p.offset;
  if (p.sort) o.sort = p.sort;
  if (p.order) o.order = p.order;
  if (p.is_active !== undefined) o.is_active = p.is_active;
  return o;
};

export const toAdminSliderView = (r: SliderAdminRow): SliderAdminView => ({
  id: r.id,
  uuid: r.uuid,
  name: r.name,
  slug: r.slug,
  description: r.description,
  image_url: r.image_url,
  image_asset_id: r.image_asset_id,
  image_effective_url: r.image_effective_url,
  alt: r.alt,
  buttonText: r.buttonText,
  buttonLink: r.buttonLink,
  featured: toBool(r.featured),
  is_active: toBool(r.is_active),
  display_order: r.display_order,
  created_at: r.created_at,
  updated_at: r.updated_at,
});
