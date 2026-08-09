// =============================================================
// FILE: utils/contentCategories.server.ts
//
// KATEGORI ETIKETLERI — TEK KANAL
//
// Hizmet ve proje AYNI kategori listesini kullanir. Liste ve etiketler
// `site_settings.content_categories` ayarindan gelir (dile gore), yani
// deployment kendi kategorilerini panelden yonetir. Kod tarafinda kategori
// adi SABIT YAZILMAZ — aksi halde iki markali kod tabaninda yine sizinti olur.
//
// Kavramlar:
//   HIZMET   -> ne yapiyoruz            (services.type = kategori slug)
//   PROJE    -> kimin icin yaptik       (projects.category = ayni slug)
//   KATEGORI -> ikisini baglayan sinif  (bu dosya)
// =============================================================

import { getStaticSiteSettingValue } from './staticSiteSettings.server';

export type ContentCategory = {
  slug: string;
  label: string;
  description?: string;
  order?: number;
};

function parse(value: unknown): ContentCategory[] {
  let raw: unknown = value;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  const items =
    raw && typeof raw === 'object' && Array.isArray((raw as { items?: unknown }).items)
      ? ((raw as { items: unknown[] }).items as unknown[])
      : Array.isArray(raw)
        ? (raw as unknown[])
        : [];

  return items
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const o = item as Record<string, unknown>;
      const slug = String(o.slug ?? '').trim();
      if (!slug) return null;
      return {
        slug,
        label: String(o.label ?? slug).trim(),
        description: o.description ? String(o.description).trim() : undefined,
        order: typeof o.order === 'number' ? o.order : undefined,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a!.order ?? 99) - (b!.order ?? 99)) as ContentCategory[];
}

export async function getContentCategories(locale: string): Promise<ContentCategory[]> {
  return parse(await getStaticSiteSettingValue('content_categories', locale));
}

export async function getCategoryLabel(
  locale: string,
  slug: string | null | undefined,
): Promise<string | null> {
  const key = String(slug ?? '').trim();
  if (!key) return null;
  const found = (await getContentCategories(locale)).find((c) => c.slug === key);
  return found?.label ?? null;
}
