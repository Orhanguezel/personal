// ============================================================================
// FILE: src/integrations/types/contacts.ts
// FINAL — Contact UI types + site_settings normalizers (NO duplication in UI)
// ============================================================================

import { isPlainObject, uiText, toStrArrayOrNull, parseJsonObject } from '@/integrations/shared';

import type { SortOrder } from '@/integrations/shared';

/** Durum alanı (BE: 'new' | 'in_progress' | 'closed') */
export type ContactStatus = 'new' | 'in_progress' | 'closed';

/** Liste sıralama alanları */
export type ContactOrderBy = 'created_at' | 'updated_at' | 'status' | 'name';
/** Sıralama yönü */

/** BE'den dönen tam kayıt (admin/public GET sonrası görünüm) */
export interface ContactView {
  id: string;

  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;

  status: ContactStatus;
  is_resolved: boolean;
  admin_note: string | null;

  // meta
  ip: string | null;
  user_agent: string | null;

  // antispam (honeypot)
  website?: string | null;

  // tarih alanları (DATETIME(3) -> string)
  created_at: string;
  updated_at: string;
}

/** Public create isteği (BE: ContactCreateSchema) */
export interface ContactCreateInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Honeypot – opsiyonel (string veya null) */
  website?: string | null;
}

/** Admin patch isteği (BE: ContactUpdateSchema) */
export interface ContactUpdateInput {
  status?: ContactStatus;
  is_resolved?: boolean;
  admin_note?: string | null;
}

/** Admin liste parametreleri (BE: ContactListParamsSchema) */
export interface ContactListParams {
  search?: string;
  status?: ContactStatus;
  resolved?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: ContactOrderBy;
  order?: SortOrder;
}

/** Public create dönüşü */
export type CreateContactPublicResponse = { ok: true; id: string };

export type ContactInfo = {
  companyName?: string;
  phone?: string;
  phones?: string[];
  email?: string;
  skype?: string;
  address?: string;
  website?: string;
};

export type ContactSection = {
  headline?: string;
  intro?: string;
  marquee?: string;
  cards?: {
    phone_label?: string;
    email_label?: string;
    skype_label?: string;
    address_label?: string;
  };
  form?: {
    title?: string;
    name_label?: string;
    email_label?: string;
    phone_label?: string;
    subject_label?: string;
    message_label?: string;

    name_ph?: string;
    email_ph?: string;
    phone_ph?: string;
    subject_ph?: string;
    message_ph?: string;

    submit?: string;
  };
};

// ----------------------------- internal helpers -----------------------------

const pick = (obj: Record<string, unknown>, key: string): string => uiText(obj?.[key]);

// ----------------------------- normalizers -----------------------------

/**
 * site_settings.contact_info.value -> ContactInfo
 * Accepts object or json-string (parseJsonObject already covers both)
 */
export function normalizeContactInfoSettingValue(value: unknown): ContactInfo {
  const o = parseJsonObject(value);
  if (!isPlainObject(o)) return {};

  const phones = toStrArrayOrNull((o as any).phones) || undefined;

  return {
    companyName: pick(o, 'companyName') || undefined,
    phone: pick(o, 'phone') || undefined,
    phones,
    email: pick(o, 'email') || undefined,
    skype: pick(o, 'skype') || undefined,
    address: pick(o, 'address') || undefined,
    website: pick(o, 'website') || undefined,
  };
}

/**
 * site_settings.contact_section.value -> ContactSection
 * Accepts object or json-string
 */
export function normalizeContactSectionSettingValue(value: unknown): ContactSection {
  const o = parseJsonObject(value);
  if (!isPlainObject(o)) return {};

  const cards = parseJsonObject((o as any).cards);
  const form = parseJsonObject((o as any).form);

  return {
    headline: pick(o, 'headline') || undefined,
    intro: pick(o, 'intro') || undefined,
    marquee: pick(o, 'marquee') || undefined,

    cards: {
      phone_label: pick(cards, 'phone_label') || undefined,
      email_label: pick(cards, 'email_label') || undefined,
      skype_label: pick(cards, 'skype_label') || undefined,
      address_label: pick(cards, 'address_label') || undefined,
    },

    form: {
      title: pick(form, 'title') || undefined,
      name_label: pick(form, 'name_label') || undefined,
      email_label: pick(form, 'email_label') || undefined,
      phone_label: pick(form, 'phone_label') || undefined,
      subject_label: pick(form, 'subject_label') || undefined,
      message_label: pick(form, 'message_label') || undefined,

      name_ph: pick(form, 'name_ph') || undefined,
      email_ph: pick(form, 'email_ph') || undefined,
      phone_ph: pick(form, 'phone_ph') || undefined,
      subject_ph: pick(form, 'subject_ph') || undefined,
      message_ph: pick(form, 'message_ph') || undefined,

      submit: pick(form, 'submit') || undefined,
    },
  };
}

/**
 * Admin liste sorgu eşlemesi: backend aşağıdaki alanları bekliyor:
 * search, status, resolved, limit, offset, orderBy, order
 */
export function toAdminContactQuery(p?: ContactListParams) {
  if (!p) return undefined;
  const q: Record<string, any> = {};
  if (p.search) q.search = p.search;
  if (typeof p.status !== 'undefined') q.status = p.status;
  if (typeof p.resolved === 'boolean') q.resolved = p.resolved;
  if (typeof p.limit === 'number') q.limit = p.limit;
  if (typeof p.offset === 'number') q.offset = p.offset;
  if (p.orderBy) q.orderBy = p.orderBy;
  if (p.order) q.order = p.order;
  return q;
}
