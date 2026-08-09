'use client';

// =============================================================
// FILE: components/content/CategoryFilter.tsx
//
// KATEGORI SUZGECI — hizmet ve portfolyo listelerinde ortak.
//
// Kategori listesi `site_settings.content_categories` ayarindan gelir; hizmet
// (services.type) ve proje (projects.category) AYNI slug kumesini kullanir,
// bu yuzden tek bilesen iki listeyi de besler.
//
// SEO NOTU: suzme yalnizca istemcide, zaten yuklenmis liste uzerinde yapilir.
// Sunucu render'i her zaman TUM kayitlari icerir; boylece tarayicilar eksiksiz
// listeyi gorur ve suzgec adresi/olusturdugu durum indekslemeyi etkilemez.
// =============================================================

import { useMemo } from 'react';

export type CategoryOption = { slug: string; label: string };

export function CategoryFilter({
  categories,
  value,
  onChange,
  allLabel,
  counts,
}: {
  categories: CategoryOption[];
  value: string;
  onChange: (next: string) => void;
  allLabel: string;
  /** slug -> kayit sayisi. Bos kategoriler gosterilmez. */
  counts?: Record<string, number>;
}) {
  const visible = useMemo(
    () => categories.filter((c) => !counts || (counts[c.slug] ?? 0) > 0),
    [categories, counts],
  );

  if (visible.length < 2) return null;

  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : undefined;

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mt-6" role="group">
      <button
        type="button"
        onClick={() => onChange('')}
        className={`btn btn-sm ${value ? 'btn-outline-secondary' : 'btn-gradient'}`}
        aria-pressed={!value}
      >
        {allLabel}
        {typeof total === 'number' ? ` (${total})` : ''}
      </button>

      {visible.map((c) => (
        <button
          key={c.slug}
          type="button"
          onClick={() => onChange(c.slug === value ? '' : c.slug)}
          className={`btn btn-sm ${value === c.slug ? 'btn-gradient' : 'btn-outline-secondary'}`}
          aria-pressed={value === c.slug}
        >
          {c.label}
          {counts ? ` (${counts[c.slug] ?? 0})` : ''}
        </button>
      ))}
    </div>
  );
}

/** Ayar degerini (JSON veya nesne) secenek listesine cevirir. */
export function parseCategoryOptions(value: unknown): CategoryOption[] {
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
    return [{ slug, label: String(o.label ?? slug).trim() }];
  });
}
