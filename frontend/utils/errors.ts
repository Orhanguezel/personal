// =============================================================
// FILE: src/integrations/utils/errors.ts
// FINAL — RTK error message normalize
// =============================================================

function pickText(v: unknown): string {
  if (typeof v === 'string' && v.trim()) return v.trim();
  if (v && typeof v === 'object') {
    const any = v as any;
    const msg = any.message || any.error || any.detail || any.title || any.reason;
    if (typeof msg === 'string' && msg.trim()) return msg.trim();
  }
  return '';
}

export function getRtkErrorMessage(err: unknown, fallback: string): string {
  const anyErr = err as any;

  // RTKQ: err.data
  const data = anyErr?.data;
  const m0 = pickText(data);
  if (m0) return m0;

  // RTKQ: err.error
  const m1 = pickText(anyErr?.error);
  if (m1) return m1;

  // status-based fallback
  const status = anyErr?.status ?? anyErr?.originalStatus;
  if (status === 400) return 'E-posta veya şifre hatalı olabilir.';
  if (status === 401) return 'E-posta veya şifre hatalı.';
  if (status === 500) return 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';

  return fallback;
}
