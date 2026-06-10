// =============================================================
// FILE: src/integrations/types/emailTemplates.ts
// FINAL — EmailTemplates shared types + normalizers (single-language)
// Backend-aligned with:
// - Public: GET /email_templates, GET /email_templates/by-key/:key, POST /email_templates/by-key/:key/render
// - Admin : GET /admin/email_templates, GET /admin/email_templates/:id, POST/PATCH/DELETE /admin/email_templates
// Notes:
// - DB: variables stored as JSON-string or null
// - Public mapper hides content? (backend mapTemplateRowPublic). We keep types tolerant.
// - Admin list returns additional: detected_variables, variables_raw
// =============================================================

import type { BoolLike } from '@/integrations/shared';
import { toBool } from '@/integrations/shared';

export type EmailTemplateRow = {
  id: string;
  template_key: string;

  template_name: string;
  subject: string;

  // HTML content
  content: string;

  // backend: JSON string or null
  variables: string | null;

  // 0/1 (can arrive as number/bool/string)
  is_active: BoolLike;

  created_at: string;
  updated_at: string;
};

/**
 * Public API item: backend uses mapTemplateRowPublic(row)
 * We keep it tolerant because mapper details can vary (some projects hide "content" in list).
 */
export type EmailTemplatePublic = {
  id: string;
  template_key: string;
  template_name: string;
  subject: string;

  // optional: some implementations may exclude content in list
  content?: string;

  // parsed variables array if present; optional in public views
  variables?: string[] | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;
};

/**
 * Admin GET /admin/email_templates/:id returns rich object:
 * {
 *   id, template_key, template_name, subject, content,
 *   variables: string[] | null,
 *   variables_raw: string | null,
 *   detected_variables: string[],
 *   is_active: boolean,
 *   created_at, updated_at
 * }
 */
export type EmailTemplateAdminDetail = {
  id: string;
  template_key: string;
  template_name: string;
  subject: string;
  content: string;

  variables: string[] | null;
  variables_raw: string | null;
  detected_variables: string[];

  is_active: boolean;

  created_at: string;
  updated_at: string;
};

/**
 * Admin LIST /admin/email_templates returns:
 * mapTemplateRowPublic(row) + detected_variables + variables_raw
 * So list item is similar to public but with extras.
 */
export type EmailTemplateAdminListItem = EmailTemplatePublic & {
  detected_variables: string[];
  variables_raw: string | null;
};

/** Public render response: POST /email_templates/by-key/:key/render */
export type EmailTemplateRenderResp = {
  id: string;
  key: string;
  name: string;
  subject: string;
  body: string;
  required_variables: string[];
  missing_variables: string[];
  updated_at: string;
};

// ----------------------------- request bodies -----------------------------

export type EmailTemplatesPublicListParams = {
  q?: string;
  is_active?: BoolLike; // backend supports string|number|boolean
};

export type RenderTemplateByKeyBody = {
  params?: Record<string, unknown>;
};

export type EmailTemplatesAdminListParams = {
  q?: string;
  is_active?: BoolLike;
};

export type EmailTemplateCreateBody = {
  template_key: string;
  template_name: string;
  subject: string;
  content: string; // HTML

  // backend accepts: string[] | JSON-string | null
  variables?: string[] | string | null;
  is_active?: BoolLike;
};

export type EmailTemplateUpdateBody = Partial<{
  template_key: string;
  template_name: string;
  subject: string;
  content: string;

  variables: string[] | string | null;
  is_active: BoolLike;
}>;

// ----------------------------- helpers -----------------------------

const safeStr = (v: unknown) => String(v ?? '').trim();

export const tryParseStringArray = (v: unknown): string[] | null => {
  if (v == null) return null;

  if (Array.isArray(v)) {
    const arr = v.map((x) => safeStr(x)).filter(Boolean);
    return arr.length ? arr : [];
  }

  if (typeof v === 'string') {
    const s = v.trim();
    if (!s) return null;
    // try JSON parse
    if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('"') && s.endsWith('"'))) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed.map((x) => safeStr(x)).filter(Boolean);
        // if somehow single string -> wrap
        const single = safeStr(parsed);
        return single ? [single] : [];
      } catch {
        // if plain comma-separated fallback
      }
    }
    // allow comma-separated fallback
    const parts = s
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);
    return parts.length ? parts : [];
  }

  return null;
};

const asNullableString = (v: unknown): string | null => {
  const s = safeStr(v);
  return s ? s : null;
};

// ----------------------------- normalizers -----------------------------

/**
 * Normalize public item (list/by-key) from unknown
 * - variables may come as string JSON or already parsed depending on endpoint/controller
 */
export const normalizeEmailTemplatePublic = (raw: unknown): EmailTemplatePublic => {
  const r = (raw ?? {}) as any;

  const maybeVariables =
    typeof r.variables !== 'undefined' ? tryParseStringArray(r.variables) : undefined;

  const hasContent = typeof r.content === 'string' && r.content.trim().length > 0;

  return {
    id: safeStr(r.id),
    template_key: safeStr(r.template_key),
    template_name: safeStr(r.template_name),
    subject: safeStr(r.subject),

    ...(hasContent ? { content: r.content as string } : {}),

    ...(typeof maybeVariables !== 'undefined' ? { variables: maybeVariables } : {}),

    is_active: toBool(r.is_active),

    created_at: safeStr(r.created_at),
    updated_at: safeStr(r.updated_at),
  };
};

export const normalizeEmailTemplatePublicList = (res: unknown): EmailTemplatePublic[] =>
  Array.isArray(res) ? res.map(normalizeEmailTemplatePublic) : [];

/** Normalize admin list item */
export const normalizeEmailTemplateAdminListItem = (raw: unknown): EmailTemplateAdminListItem => {
  const r = (raw ?? {}) as any;

  const base = normalizeEmailTemplatePublic(r);

  return {
    ...base,
    detected_variables: Array.isArray(r.detected_variables)
      ? r.detected_variables.map((x: any) => safeStr(x)).filter(Boolean)
      : [],
    variables_raw: asNullableString(r.variables_raw),
  };
};

export const normalizeEmailTemplateAdminList = (res: unknown): EmailTemplateAdminListItem[] =>
  Array.isArray(res) ? res.map(normalizeEmailTemplateAdminListItem) : [];

/** Normalize admin detail */
export const normalizeEmailTemplateAdminDetail = (raw: unknown): EmailTemplateAdminDetail => {
  const r = (raw ?? {}) as any;

  return {
    id: safeStr(r.id),
    template_key: safeStr(r.template_key),
    template_name: safeStr(r.template_name),
    subject: safeStr(r.subject),
    content: safeStr(r.content),

    variables: tryParseStringArray(r.variables),
    variables_raw: asNullableString(r.variables_raw),
    detected_variables: Array.isArray(r.detected_variables)
      ? r.detected_variables.map((x: any) => safeStr(x)).filter(Boolean)
      : [],

    is_active: toBool(r.is_active),

    created_at: safeStr(r.created_at),
    updated_at: safeStr(r.updated_at),
  };
};

/** Normalize render response */
export const normalizeEmailTemplateRenderResp = (raw: unknown): EmailTemplateRenderResp => {
  const r = (raw ?? {}) as any;

  return {
    id: safeStr(r.id),
    key: safeStr(r.key),
    name: safeStr(r.name),
    subject: safeStr(r.subject),
    body: safeStr(r.body),
    required_variables: Array.isArray(r.required_variables)
      ? r.required_variables.map((x: any) => safeStr(x)).filter(Boolean)
      : [],
    missing_variables: Array.isArray(r.missing_variables)
      ? r.missing_variables.map((x: any) => safeStr(x)).filter(Boolean)
      : [],
    updated_at: safeStr(r.updated_at),
  };
};

// ----------------------------- query/body mappers -----------------------------

export const toEmailTemplatesQuery = (
  p: { q?: string; is_active?: BoolLike } = {},
): Record<string, any> => {
  const out: Record<string, any> = {};
  if (p.q) out.q = p.q;
  if (typeof p.is_active !== 'undefined') out.is_active = toBool(p.is_active) ? '1' : '0';
  return out;
};

/**
 * Create/Update body mapper:
 * - keep fields as backend expects
 * - variables can be string[] or JSON-string or null; we pass through
 * - is_active: ensure boolean/0/1 string acceptable (pass boolean)
 */
export const toEmailTemplateWriteBody = (
  body: EmailTemplateCreateBody | EmailTemplateUpdateBody,
): Record<string, any> => {
  const b = body as any;
  const out: Record<string, any> = {};

  if (typeof b.template_key !== 'undefined') out.template_key = b.template_key;
  if (typeof b.template_name !== 'undefined') out.template_name = b.template_name;
  if (typeof b.subject !== 'undefined') out.subject = b.subject;
  if (typeof b.content !== 'undefined') out.content = b.content;

  if (typeof b.variables !== 'undefined') out.variables = b.variables;

  if (typeof b.is_active !== 'undefined') out.is_active = toBool(b.is_active);

  return out;
};
