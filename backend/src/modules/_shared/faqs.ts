// src/modules/faqs/faqs.ts


import type{ Sortable } from '@/modules/_shared';

export type ListParams = {
  orderParam?: string; // "created_at.asc"
  sort?: Sortable;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;

  is_active?: boolean | 0 | 1 | '0' | '1' | 'true' | 'false';
  q?: string;
  slug?: string;

  locale: string;
  defaultLocale: string;
};

export type FaqMerged = {
  id: string;
  is_active: 0 | 1;
  display_order: number;
  created_at: string | Date;
  updated_at: string | Date;

  question: string | null;
  answer: string | null;
  slug: string | null;
  locale_resolved: string | null;
};