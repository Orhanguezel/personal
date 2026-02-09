// 

// ----------------------------- FE Views -----------------------------

export type PricingPlanPublic = {
  id: string;
  code: string;
  badge: string;
  title: string | null;
  description: string | null;

  price_amount: string; // keep decimal as string
  price_unit: string;
  currency: string;

  features: string[];
  cta_label: string | null;
  cta_href: string | null;

  is_active: boolean;
  display_order: number;
};

export type PricingPublicResponse = {
  plans: PricingPlanPublic[];
};

// -------- helpers --------
export function uuid() {
  return crypto.randomUUID();
}

export function asDecimalString(v: any) {
  if (typeof v === 'number') return v.toFixed(2);
  const s = String(v ?? '').trim();
  return s || '0.00';
}

export function toFeaturesArray(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((x) => String(x).trim()).filter(Boolean);
  const s = String(input).trim();
  if (!s) return [];
  // allow csv
  if (s.includes(','))
    return s
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);
  return [s];
}



export function now3() {
  // MySQL DATETIME(3)
  return new Date();
}

export function safeJsonArrayString(arr: string[]) {
  return JSON.stringify(arr ?? []);
}

export function parseJsonArray(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((x) => String(x).trim()).filter(Boolean);
  if (typeof raw === 'string') {
    const s = raw.trim();
    if (!s) return [];
    if (s.startsWith('[')) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed.map((x) => String(x).trim()).filter(Boolean);
      } catch {
        // ignore
      }
    }
    // fallback csv
    return toFeaturesArray(s);
  }
  return [];
}
