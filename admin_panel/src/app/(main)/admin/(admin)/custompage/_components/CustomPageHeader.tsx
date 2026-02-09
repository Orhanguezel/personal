// =============================================================
// FILE: src/app/(main)/admin/(admin)/custompage/_components/CustomPageHeader.tsx
// FINAL — Admin Custom Pages Header (Filters + Summary)
// - ✅ Locale options dynamic
// - ✅ Module dropdown dynamic (props)
// - ✅ NO inline styles
// =============================================================

import React from 'react';
import Link from 'next/link';

import {
  AdminLocaleSelect,
  type AdminLocaleOption,
} from '@/app/(main)/admin/_components/common/AdminLocaleSelect';

export type LocaleOption = {
  value: string;
  label: string;
};

export type ModuleOption = {
  value: string;
  label: string;
};

export type CustomPageFilters = {
  search: string;
  moduleKey: string;
  publishedFilter: 'all' | 'published' | 'draft';
  locale: string;
};

export type CustomPageHeaderProps = {
  filters: CustomPageFilters;
  total: number;
  onFiltersChange: (next: CustomPageFilters) => void;
  onRefresh?: () => void;

  locales: LocaleOption[];
  localesLoading?: boolean;

  allowAllOption?: boolean;
  moduleOptions?: ModuleOption[];
};

export const CustomPageHeader: React.FC<CustomPageHeaderProps> = ({
  filters,
  total,
  onFiltersChange,
  onRefresh,
  locales,
  localesLoading,
  allowAllOption = true,
  moduleOptions,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, moduleKey: e.target.value });
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CustomPageFilters['publishedFilter'];
    onFiltersChange({ ...filters, publishedFilter: value });
  };

  const handleLocaleChange = (nextLocale: string) => {
    const normalized = nextLocale ? nextLocale.trim().toLowerCase() : '';
    onFiltersChange({ ...filters, locale: normalized });
  };

  const localeOptions: AdminLocaleOption[] = React.useMemo(() => {
    const base = (locales || [])
      .map((l) => ({
        value: String(l.value || '')
          .trim()
          .toLowerCase(),
        label: l.label,
      }))
      .filter((x) => x.value);

    if (!allowAllOption) return base;
    return [{ value: '', label: 'Tüm diller' }, ...base];
  }, [locales, allowAllOption]);

  const disabledLocaleSelect = !!localesLoading || localeOptions.length === 0;

  const moduleOpts = (moduleOptions ?? []).filter((x) => String(x?.value || '').trim().length > 0);
  const disabledModuleSelect = moduleOpts.length === 0;

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">Özel Sayfalar</div>
            <div className="text-xs text-muted-foreground">
              İçerik sayfalarını modül, yayın durumu ve aktif dile göre yönetebilirsin.
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-12 md:items-end">
              <div className="md:col-span-5">
                <label className="mb-1 block text-xs text-muted-foreground">
                  Başlık / Slug / Meta arama
                </label>
                <input
                  type="search"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="Örn: 'hakkımızda', 'duyuru', 'kampanya'"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="md:col-span-3">
                <AdminLocaleSelect
                  value={filters.locale}
                  onChange={handleLocaleChange}
                  options={localeOptions}
                  loading={!!localesLoading}
                  disabled={disabledLocaleSelect}
                  label="Dil"
                />
                {localesLoading ? (
                  <div className="mt-1 text-xs text-muted-foreground">Diller yükleniyor...</div>
                ) : null}
                {!localesLoading && localeOptions.length === 0 ? (
                  <div className="mt-1 text-xs text-destructive">
                    Aktif dil listesi yok. Site ayarlarından app_locales kontrol et.
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs text-muted-foreground">Modül</label>
                <select
                  className="w-full rounded-md border bg-background px-2 py-2 text-sm"
                  value={filters.moduleKey}
                  onChange={handleModuleChange}
                  disabled={disabledModuleSelect}
                >
                  <option value="">Tümü</option>
                  {moduleOpts.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {disabledModuleSelect ? (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Modül listesi yükleniyor...
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs text-muted-foreground">Yayın durumu</label>
                <select
                  className="w-full rounded-md border bg-background px-2 py-2 text-sm"
                  value={filters.publishedFilter}
                  onChange={handlePublishedChange}
                >
                  <option value="all">Hepsi</option>
                  <option value="published">Yayında</option>
                  <option value="draft">Taslak</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:w-72 lg:border-l lg:pl-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Toplam Kayıt</div>
                <div className="text-2xl font-bold">{total}</div>
              </div>

              {onRefresh ? (
                <button
                  type="button"
                  className="rounded-md border px-3 py-1 text-xs"
                  onClick={onRefresh}
                >
                  Yenile
                </button>
              ) : null}
            </div>

            <div className="mt-3 flex justify-end">
              <Link
                href="/admin/custompage/new"
                className="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground"
              >
                Yeni Sayfa Oluştur
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
