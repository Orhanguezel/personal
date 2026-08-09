'use client';

// =============================================================
// FILE: src/components/admin/category-select.tsx
//
// KATEGORI SECIMI — TEK KANAL
//
// Hizmet ve projeler AYNI kategori listesini kullanir; liste
// `site_settings.content_categories` ayarindan gelir (dile gore etiketli).
//
// NEDEN SECIM KUTUSU:
//   Proje kategorisi panelde SERBEST METIN alaniydi. Sonuc olarak veritabaninda
//   15 farkli deger olustu: "RESTAURANT WEBSITE", "Web Yazılım",
//   "Diğer Yazılım Teknoloji", "saas"... Ayni is farkli yazildigi icin
//   hizmet-proje eslesmesi kurulamiyordu. Artik degerler listeden secilir.
//
// Kavramlar karismasin:
//   HIZMET   = satisa sunulan is
//   PROJE    = o isin kimin icin yapildigi
//   KATEGORI = ikisini baglayan sinif (bu bilesen)
// =============================================================

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDefaultLocaleAdminQuery, useGetSiteSettingAdminByKeyQuery } from '@/integrations/hooks';
import { normLocaleTag } from '@/i18n/localeUtils';

export type ContentCategory = { slug: string; label: string; description?: string };

function parseCategories(value: unknown): ContentCategory[] {
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

  return items.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const o = item as Record<string, unknown>;
    const slug = String(o.slug ?? '').trim();
    if (!slug) return [];
    return [
      {
        slug,
        label: String(o.label ?? slug).trim(),
        description: o.description ? String(o.description).trim() : undefined,
      },
    ];
  });
}

export function useContentCategories(): { categories: ContentCategory[]; loading: boolean } {
  const defaultLocaleQ = useGetDefaultLocaleAdminQuery();
  const locale = normLocaleTag(defaultLocaleQ.data) || undefined;

  const q = useGetSiteSettingAdminByKeyQuery(
    { key: 'content_categories', ...(locale ? { locale } : {}) },
    { skip: defaultLocaleQ.isLoading },
  );

  const categories = React.useMemo(
    () => parseCategories((q.data as { value?: unknown } | undefined)?.value),
    [q.data],
  );

  return { categories, loading: defaultLocaleQ.isLoading || q.isLoading };
}

const NONE = '__none__';

export function CategorySelect({
  value,
  onChange,
  allowEmpty = true,
  placeholder = 'Kategori seçin',
}: {
  value?: string | null;
  onChange: (next: string) => void;
  allowEmpty?: boolean;
  placeholder?: string;
}) {
  const { categories, loading } = useContentCategories();
  const current = String(value ?? '').trim();

  // Ayarda olmayan eski bir deger varsa listeye ekleyip gosteriyoruz; aksi
  // halde secim kutusu bos gorunur ve kaydedince deger sessizce kaybolurdu.
  const options = React.useMemo(() => {
    if (!current || categories.some((c) => c.slug === current)) return categories;
    return [{ slug: current, label: `${current} (listede yok)` }, ...categories];
  }, [categories, current]);

  return (
    <Select
      value={current || (allowEmpty ? NONE : '')}
      onValueChange={(next) => onChange(next === NONE ? '' : next)}
      disabled={loading}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowEmpty ? <SelectItem value={NONE}>—</SelectItem> : null}
        {options.map((c) => (
          <SelectItem key={c.slug} value={c.slug}>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
