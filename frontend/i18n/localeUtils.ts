// =============================================================
// FILE: src/i18n/localeUtils.ts
// FINAL — locale normalization helpers (shared)
// =============================================================

export function normLocaleTag(x: unknown): string {
  return String(x ?? '')
    .trim()
    .toLowerCase()
    .replace('_', '-')
    .split('-')[0]
    .trim();
}

/** order-preserving dedupe */
export function uniqKeepOrder(locales: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of locales) {
    const n = normLocaleTag(l);
    if (!n) continue;
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

function tryParseJson(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw;
  const s = raw.trim();
  if (!s) return raw;

  if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
    try {
      return JSON.parse(s);
    } catch {
      return raw;
    }
  }
  return raw;
}

type AppLocaleObj = {
  code?: unknown;
  label?: unknown;
  is_default?: unknown;
  is_active?: unknown;
};

export function normalizeLocales(appLocalesValue: unknown): string[] {
  let v: any = tryParseJson(appLocalesValue);

  // tolerate wrappers: {data:[...]} or {value:[...]} etc.
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    if (Array.isArray((v as any).data)) v = (v as any).data;
    else if (Array.isArray((v as any).value)) v = (v as any).value;
  }

  const arr: any[] = Array.isArray(v) ? v : [];
  const actives: string[] = [];
  const defaults: string[] = [];

  for (const item of arr) {
    if (typeof item === 'string') {
      const code = normLocaleTag(item);
      if (code) actives.push(code);
      continue;
    }

    if (item && typeof item === 'object') {
      const obj = item as AppLocaleObj;
      const code = normLocaleTag(obj.code);
      if (!code) continue;

      const isActive = obj.is_active === undefined ? true : Boolean(obj.is_active);
      if (!isActive) continue;

      actives.push(code);

      const isDefault = Boolean(obj.is_default);
      if (isDefault) defaults.push(code);
    }
  }

  const activeUniq = uniqKeepOrder(actives);
  if (!activeUniq.length) return [];

  const defaultUniq = uniqKeepOrder(defaults).filter((d) => activeUniq.includes(d));
  if (!defaultUniq.length) return activeUniq;

  const d = defaultUniq[0]!;
  return [d, ...activeUniq.filter((x) => x !== d)];
}

export function resolveDefaultLocale(
  defaultLocaleValue: unknown,
  appLocalesValue: unknown,
): string {
  const active = normalizeLocales(appLocalesValue);
  const activeSet = new Set(active.map(normLocaleTag));

  const cand = normLocaleTag(defaultLocaleValue);
  if (cand && activeSet.has(cand)) return cand;

  return normLocaleTag(active[0]) || '';
}
