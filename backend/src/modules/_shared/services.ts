




export type ServiceMerged = {
  id: string;
  type: string;

  featured: 0 | 1;
  is_active: 0 | 1;
  display_order: number;

  featured_image: string | null;
  image_url: string | null;
  image_asset_id: string | null;

  /** resolved cover URL (asset -> publicUrlOf OR image_url OR featured_image) */
  cover_url: string | null;

  created_at: string | Date;
  updated_at: string | Date;

  // i18n coalesced
  slug: string | null;
  name: string | null;
  summary: string | null;
  content: string | null;
  image_alt: string | null;

  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;

  locale_resolved: string | null;
};

export type ServiceImageMerged = {
  id: string;
  service_id: string;
  image_asset_id: string | null;
  image_url: string | null;
  is_active: 0 | 1;
  display_order: number;
  created_at: string | Date;
  updated_at: string | Date;

  // i18n
  title: string | null;
  alt: string | null;
  caption: string | null;
  locale_resolved: string | null;
};


