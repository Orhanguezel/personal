// =============================================================
// FILE: src/integrations/types/bookings.ts
// FINAL — Booking shared types + normalizers (backend-aligned)
// =============================================================

import type { BoolLike } from '@/integrations/shared';

export type BookingStatus =
  | 'new'
  | 'confirmed'
  | 'rejected'
  | 'completed'
  | 'cancelled'
  | 'expired';

export type BookingRow = {
  id: string;

  // customer
  name: string;
  email: string;
  phone: string;

  // service
  service_id: string | null;
  service_slug: string | null;
  service_title: string | null;

  // appointment
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string | null; // HH:mm | null

  message: string | null;

  // workflow
  status: BookingStatus;
  is_read: 0 | 1 | boolean;

  admin_note: string | null;

  decided_at: string | null;
  decided_by: string | null;
  decision_note: string | null;

  // email tracking
  email_last_sent_at: string | null;
  email_last_template_key: string | null;
  email_last_to: string | null;
  email_last_subject: string | null;
  email_last_error: string | null;

  created_at: string;
  updated_at: string;
};

/** UI-friendly view (normalized booleans, nullables, strings) */
export type BookingView = {
  id: string;

  name: string;
  email: string;
  phone: string;

  service_id: string | null;
  service_slug: string | null;
  service_title: string | null;

  appointment_date: string;
  appointment_time: string | null;

  message: string | null;

  status: BookingStatus;
  is_read: boolean;

  admin_note: string | null;

  decided_at: string | null;
  decided_by: string | null;
  decision_note: string | null;

  email_last_sent_at: string | null;
  email_last_template_key: string | null;
  email_last_to: string | null;
  email_last_subject: string | null;
  email_last_error: string | null;

  created_at: string;
  updated_at: string;
};

// ----------------------------- request bodies -----------------------------

/**
 * PUBLIC: POST /bookings
 * backend: publicCreateBookingSchema
 * - service selection required: service_id OR service_slug/service_title
 * - appointment_time optional
 */
export type PublicCreateBookingBody = {
  name: string;
  email: string;
  phone: string;

  appointment_date: string; // YYYY-MM-DD
  appointment_time?: string; // HH:mm

  service_id?: string;
  service_slug?: string;
  service_title?: string;

  message?: string;
};

export type PublicCreateBookingResp = { ok: true; id: string; status: BookingStatus };

/**
 * ADMIN: POST /admin/bookings
 * backend: adminCreateBookingSchema
 */
export type AdminCreateBookingBody = PublicCreateBookingBody & {
  status?: BookingStatus;
  is_read?: BoolLike;
  admin_note?: string;
};

export type AdminUpdateBookingBody = Partial<{
  name: string;
  email: string;
  phone: string;

  service_id: string | null;
  service_slug: string | null;
  service_title: string | null;

  appointment_date: string;
  appointment_time: string | null;

  message: string | null;

  status: BookingStatus;
  is_read: BoolLike;

  admin_note: string | null;
  decision_note: string | null;
}>;

export type AdminBookingsListParams = {
  q?: string;
  status?: string; // backend list schema accepts string
  is_read?: BoolLike;
  appointment_date?: string; // YYYY-MM-DD
  service_id?: string;
  service_slug?: string;
  limit?: number;
  offset?: number;
};

// ----------------------------- helpers -----------------------------

const safeStr = (v: unknown) => String(v ?? '').trim();

const asNullableString = (v: unknown): string | null => {
  const s = safeStr(v);
  return s ? s : null;
};

const toBool = (v: unknown): boolean => v === true || v === 1 || v === '1' || v === 'true';

const asStatus = (v: unknown): BookingStatus => {
  const s = safeStr(v) as BookingStatus;
  if (
    s === 'new' ||
    s === 'confirmed' ||
    s === 'rejected' ||
    s === 'completed' ||
    s === 'cancelled' ||
    s === 'expired'
  )
    return s;
  return 'new';
};

/** raw -> normalized view (tolerant parsing) */
export const normalizeBooking = (raw: unknown): BookingView => {
  const r = (raw ?? {}) as any;

  return {
    id: safeStr(r.id),

    name: safeStr(r.name),
    email: safeStr(r.email),
    phone: safeStr(r.phone),

    service_id: asNullableString(r.service_id),
    service_slug: asNullableString(r.service_slug),
    service_title: asNullableString(r.service_title),

    appointment_date: safeStr(r.appointment_date),
    appointment_time: asNullableString(r.appointment_time),

    message: asNullableString(r.message),

    status: asStatus(r.status),
    is_read: toBool(r.is_read),

    admin_note: asNullableString(r.admin_note),

    decided_at: asNullableString(r.decided_at),
    decided_by: asNullableString(r.decided_by),
    decision_note: asNullableString(r.decision_note),

    email_last_sent_at: asNullableString(r.email_last_sent_at),
    email_last_template_key: asNullableString(r.email_last_template_key),
    email_last_to: asNullableString(r.email_last_to),
    email_last_subject: asNullableString(r.email_last_subject),
    email_last_error: asNullableString(r.email_last_error),

    created_at: safeStr(r.created_at),
    updated_at: safeStr(r.updated_at),
  };
};

export const normalizeBookingList = (res: unknown): BookingView[] =>
  Array.isArray(res) ? res.map(normalizeBooking) : [];

/** admin list query params — normalize BoolLike to backend-expected string 1/0 */
export const toAdminBookingsQuery = (p: AdminBookingsListParams = {}): Record<string, any> => {
  const out: Record<string, any> = {};

  if (p.q) out.q = p.q;
  if (p.status) out.status = p.status;
  if (p.appointment_date) out.appointment_date = p.appointment_date;
  if (p.service_id) out.service_id = p.service_id;
  if (p.service_slug) out.service_slug = p.service_slug;
  if (typeof p.limit === 'number') out.limit = p.limit;
  if (typeof p.offset === 'number') out.offset = p.offset;

  if (typeof p.is_read !== 'undefined') out.is_read = toBool(p.is_read) ? '1' : '0';

  return out;
};

/** admin update body — convert BoolLike to boolean-like payload */
export const toAdminUpdateBookingBody = (b: AdminUpdateBookingBody): Record<string, any> => {
  const out: Record<string, any> = {};

  if (typeof b.name !== 'undefined') out.name = b.name;
  if (typeof b.email !== 'undefined') out.email = b.email;
  if (typeof b.phone !== 'undefined') out.phone = b.phone;

  if (typeof b.service_id !== 'undefined') out.service_id = b.service_id;
  if (typeof b.service_slug !== 'undefined') out.service_slug = b.service_slug;
  if (typeof b.service_title !== 'undefined') out.service_title = b.service_title;

  if (typeof b.appointment_date !== 'undefined') out.appointment_date = b.appointment_date;
  if (typeof b.appointment_time !== 'undefined') out.appointment_time = b.appointment_time;

  if (typeof b.message !== 'undefined') out.message = b.message;

  if (typeof b.status !== 'undefined') out.status = b.status;

  if (typeof b.is_read !== 'undefined') out.is_read = toBool(b.is_read);

  if (typeof b.admin_note !== 'undefined') out.admin_note = b.admin_note;
  if (typeof b.decision_note !== 'undefined') out.decision_note = b.decision_note;

  return out;
};
