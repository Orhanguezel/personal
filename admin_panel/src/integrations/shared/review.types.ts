// =============================================================
// FILE: src/integrations/shared/review.types.ts
// FINAL — Public Reviews shared types
// =============================================================

import type { BoolLike } from '@/integrations/shared';
import { parseJsonObject, uiText } from '@/integrations/shared';

// ===============================
// Reviews (Public)
// ===============================

export type ReviewDto = {
  id: string;

  target_type: string;
  target_id: string;

  name: string;
  email: string;
  rating: number;

  is_active: boolean;
  is_approved: boolean;
  display_order: number;

  likes_count: number;
  dislikes_count: number;
  helpful_count: number;

  /** Kaydın gönderildiği dil */
  submitted_locale: string;

  created_at: string;
  updated_at: string;

  // i18n alanları (coalesced)
  comment: string | null;
  locale_resolved: string | null;

  /** legacy */
  locale?: string | null;

  // Optional FE extras (some backends might return)
  title?: string | null;
  admin_reply?: string | null;
  avatar_url?: string | null;
  logo_url?: string | null;
  profile_href?: string | null;
  role?: string | null;
  company?: string | null;
};

export type ReviewListQueryParams = {
  search?: string;
  approved?: BoolLike;
  active?: BoolLike;
  minRating?: number;
  maxRating?: number;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'updated_at' | 'display_order' | 'rating' | 'name';
  order?: 'asc' | 'desc';

  // Listeleme locale override
  locale?: string;

  // Target filtreleri
  target_type?: string;
  target_id?: string;
};

export type ReviewCreatePayload = {
  target_type: string;
  target_id: string;

  locale?: string; // yoksa server req.locale/DEFAULT_LOCALE kullanır

  name: string;
  email: string;
  rating: number;
  comment: string;
  title?: string;

  // Optional reviewer profile extras
  role?: string;
  company?: string;
  avatar_url?: string;
  logo_url?: string;
  profile_href?: string;

  is_active?: boolean;
  is_approved?: boolean;
  display_order?: number;
};

export type ReviewUpdatePayload = Partial<ReviewCreatePayload> & {
  admin_reply?: string | null;
};

export type ReviewReactionPayload = {
  type: 'like' | 'dislike';
};
