// =============================================================
// FILE: src/config/app-config.ts
//
// PANEL KIMLIGI — MARKA KODA GOMULMEZ
//
// ONCEDEN (hata): burada "Königs Massage Panel" sabit yaziliydi. Bu kod tabani
// birden fazla markaya hizmet ediyor; gzlteknoloji.com panelinde tarayici
// sekmesinde ve arama sonuclarinda BASKA BIR MUSTERININ adi gorunuyordu.
//
// SIMDI: ad, deployment'in KENDI veritabanindan gelir (`company_brand`,
// `site_title`). Ag erisimi yoksa markadan bagimsiz notr ada dusulur.
// Panel ici gosterim ise `site_settings.ui_admin -> app_name` uzerinden
// (AppSidebar) zaten dinamikti; iki yol da ayni kanali kullanir.
// =============================================================

import packageJson from '../../package.json';

/** Marka bilgisi yoksa kullanilacak notr ad. Buraya MARKA ADI YAZILMAZ. */
export const APP_FALLBACK_NAME = 'Yönetim Paneli';

export const APP_CONFIG = {
  version: packageJson.version,
} as const;

export type PanelBrand = {
  name: string;
  title: string;
  description: string;
};

function apiBase(): string {
  const raw =
    process.env.PANEL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    '';
  return String(raw).replace(/\/+$/, '');
}

function readValue(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object') return undefined;
  const obj = payload as Record<string, unknown>;
  return 'value' in obj ? obj.value : obj;
}

async function fetchSetting(key: string): Promise<unknown> {
  const base = apiBase();
  if (!/^https?:\/\//i.test(base)) return undefined;
  try {
    const res = await fetch(`${base}/site_settings/${encodeURIComponent(key)}`, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return undefined;
    return readValue((await res.json()) as unknown);
  } catch {
    return undefined;
  }
}

/**
 * Panelin marka bilgisini deployment'in kendi ayarlarindan cozer.
 * Sunucu tarafinda (generateMetadata) kullanilir.
 */
export async function getPanelBrand(): Promise<PanelBrand> {
  const [brandRaw, titleRaw] = await Promise.all([
    fetchSetting('company_brand'),
    fetchSetting('site_title'),
  ]);

  const brand =
    brandRaw && typeof brandRaw === 'object' ? (brandRaw as Record<string, unknown>) : {};
  const shortName = String(brand.short_name ?? brand.name ?? '').trim();
  const siteTitle = typeof titleRaw === 'string' ? titleRaw.trim() : '';

  const name = shortName || siteTitle.split('—')[0]?.trim() || APP_FALLBACK_NAME;
  const title = shortName ? `${shortName} — ${APP_FALLBACK_NAME}` : APP_FALLBACK_NAME;

  return {
    name,
    title,
    description: `${name} içerik, satış ve iletişim süreçlerinin tek noktadan yönetildiği panel.`,
  };
}
