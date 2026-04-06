'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, RefreshCcw, ArrowUp, ArrowDown, Save, Search, Trash2, Pencil } from 'lucide-react';

import { useAdminLocales } from '@/app/(main)/admin/_components/common/useAdminLocales';
import { resolveAdminApiLocale } from '@/i18n/adminLocale';
import { localeShortClient, localeShortClientOr } from '@/i18n/localeShortClient';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { ProductDto, ProductListAdminQueryParams } from '@/integrations/shared/products.types';
import {
  useListProductsAdminQuery,
  useUpdateProductAdminMutation,
  useDeleteProductAdminMutation,
  useReorderProductsAdminMutation,
} from '@/integrations/hooks';

type StatusFilter = 'all' | 'active' | 'draft' | 'archived';

type Filters = {
  search: string;
  statusFilter: StatusFilter;
  locale: string;
  category: string;
};

function isUuidLike(v?: string) {
  if (!v) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

const STATUS_BADGE: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

const CATEGORIES = ['', 'emlak', 'ecommerce', 'erp', 'landing'];

export default function AdminProductsClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const {
    localeOptions,
    defaultLocaleFromDb,
    loading: localesLoading,
    fetching: localesFetching,
  } = useAdminLocales();

  const apiLocale = React.useMemo(() => {
    return resolveAdminApiLocale(localeOptions as any, defaultLocaleFromDb, 'de');
  }, [localeOptions, defaultLocaleFromDb]);

  const urlLocale = React.useMemo(() => {
    const q = sp?.get('locale');
    return localeShortClient(q) || '';
  }, [sp]);

  const [filters, setFilters] = React.useState<Filters>({
    search: '',
    statusFilter: 'all',
    locale: '',
    category: '',
  });

  React.useEffect(() => {
    if (!localeOptions || localeOptions.length === 0) return;
    setFilters((prev) => {
      const prevLoc = localeShortClient(prev.locale);
      const urlLoc = localeShortClient(urlLocale);
      const defLoc = localeShortClientOr(apiLocale, 'de');
      const canUse = (l: string) =>
        !!l && (localeOptions ?? []).some((x: any) => localeShortClient(x.value) === l);
      if (prevLoc && canUse(prevLoc)) return prev;
      if (urlLoc && canUse(urlLoc)) return { ...prev, locale: urlLoc };
      if (defLoc && canUse(defLoc)) return { ...prev, locale: defLoc };
      return { ...prev, locale: localeShortClient((localeOptions as any)?.[0]?.value) || 'de' };
    });
  }, [localeOptions, urlLocale, apiLocale]);

  const effectiveLocale = React.useMemo(() => {
    return localeShortClient(filters.locale) || apiLocale;
  }, [filters.locale, apiLocale]);

  React.useEffect(() => {
    const l = localeShortClient(filters.locale);
    if (!l) return;
    if (l === urlLocale) return;
    const params = new URLSearchParams(sp?.toString() || '');
    params.set('locale', l);
    router.replace(`/admin/products?${params.toString()}`);
  }, [filters.locale]);

  const queryParams = React.useMemo(() => {
    const qp: ProductListAdminQueryParams = {
      q: filters.search.trim() || undefined,
      locale: effectiveLocale || undefined,
      status: filters.statusFilter !== 'all' ? (filters.statusFilter as any) : undefined,
      category: filters.category || undefined,
      limit: 200,
      offset: 0,
    };
    return qp;
  }, [filters.search, effectiveLocale, filters.statusFilter, filters.category]);

  const listQ = useListProductsAdminQuery(queryParams as any, {
    refetchOnMountOrArgChange: true,
  } as any);

  const items: ProductDto[] = React.useMemo(() => {
    return ((listQ.data as any)?.items ?? []) as ProductDto[];
  }, [listQ.data]);

  const total: number = React.useMemo(() => {
    const t = (listQ.data as any)?.total;
    return typeof t === 'number' ? t : items.length;
  }, [listQ.data, items.length]);

  const [rows, setRows] = React.useState<ProductDto[]>([]);
  React.useEffect(() => setRows(items), [items]);

  const [updateProduct, updateState] = useUpdateProductAdminMutation();
  const [deleteProduct, deleteState] = useDeleteProductAdminMutation();
  const [reorderProducts, reorderState] = useReorderProductsAdminMutation();

  const busy =
    listQ.isLoading ||
    listQ.isFetching ||
    localesLoading ||
    localesFetching ||
    updateState.isLoading ||
    deleteState.isLoading ||
    reorderState.isLoading;

  function moveRow(from: number, to: number) {
    setRows((prev) => {
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;
      const copy = prev.slice();
      const [x] = copy.splice(from, 1);
      copy.splice(to, 0, x);
      return copy;
    });
  }

  async function onSaveOrder() {
    try {
      const payload = { items: rows.map((p, idx) => ({ id: p.id, display_order: idx })) };
      await reorderProducts(payload as any).unwrap();
      toast.success('Sıralama kaydedildi');
      listQ.refetch();
    } catch (err: any) {
      toast.error(err?.data?.error?.message || 'Sıralama kaydedilemedi');
    }
  }

  function onCreate() {
    const l = localeShortClientOr(effectiveLocale, 'de');
    router.push(`/admin/products/new?locale=${encodeURIComponent(l)}`);
  }

  function onEdit(id: string) {
    const l = localeShortClientOr(effectiveLocale, 'de');
    router.push(`/admin/products/${encodeURIComponent(id)}?locale=${encodeURIComponent(l)}`);
  }

  async function onDelete(item: ProductDto) {
    const id = String(item.id);
    if (!isUuidLike(id)) return;
    const ok = window.confirm(`"${item.title || 'Produkt'}" silinsin mi?`);
    if (!ok) return;
    try {
      await deleteProduct({ id }).unwrap();
      toast.success('Ürün silindi');
      listQ.refetch();
    } catch (err: any) {
      toast.error(err?.data?.error?.message || 'Silinemedi');
    }
  }

  function formatPrice(val: string | number | null): string {
    if (val == null || val === '') return '—';
    const n = typeof val === 'string' ? parseFloat(val) : val;
    if (Number.isNaN(n)) return '—';
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n);
  }

  const showEmpty = !busy && rows.length === 0;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">Site Paketleri</h1>
        <p className="text-sm text-muted-foreground">Satılık site paketlerini yönetin.</p>
      </div>

      <Card>
        <CardHeader className="gap-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Filtreler</CardTitle>
              <CardDescription>
                Toplam <span className="font-medium">{total}</span> • Dil{' '}
                <Badge variant="secondary">{effectiveLocale || '—'}</Badge>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={onCreate} disabled={busy}>
                <Plus className="mr-2 size-4" />
                Yeni Paket
              </Button>
              <Button variant="outline" onClick={() => listQ.refetch()} disabled={busy}>
                <RefreshCcw className="mr-2 size-4" />
                Yenile
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="q">Arama</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="q"
                  value={filters.search}
                  onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                  placeholder="Başlık, slug..."
                  className="pl-9"
                  disabled={busy}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Durum</Label>
              <Select
                value={filters.statusFilter}
                onValueChange={(v) => setFilters((p) => ({ ...p, statusFilter: v as any }))}
                disabled={busy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="archived">Arşiv</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={filters.category}
                onValueChange={(v) => setFilters((p) => ({ ...p, category: v === '__all__' ? '' : v }))}
                disabled={busy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">Tümü</SelectItem>
                  <SelectItem value="emlak">Emlak</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce</SelectItem>
                  <SelectItem value="erp">ERP</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Dil</Label>
              <Select
                value={filters.locale || ''}
                onValueChange={(v) => setFilters((p) => ({ ...p, locale: v }))}
                disabled={busy || (localeOptions?.length ?? 0) === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Dil seçin" />
                </SelectTrigger>
                <SelectContent>
                  {(localeOptions ?? []).map((l: any) => (
                    <SelectItem key={l.value} value={String(l.value)}>
                      {String(l.label ?? l.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base">
              {busy ? 'Yükleniyor...' : `${rows.length} kayıt`}
            </CardTitle>
            <Button variant="outline" onClick={onSaveOrder} disabled={busy || rows.length === 0}>
              <Save className="mr-2 size-4" />
              Sıralamayı Kaydet
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {listQ.isError && (
            <div className="rounded-md border p-4 text-sm">
              Liste yüklenemedi.{' '}
              <Button variant="link" className="px-1" onClick={() => listQ.refetch()}>
                Tekrar Dene
              </Button>
            </div>
          )}

          <div className="hidden rounded-md border md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Fiyat (Tek)</TableHead>
                  <TableHead>Fiyat (Aylık)</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p, idx) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title || '—'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.category || '—'}</Badge>
                    </TableCell>
                    <TableCell>{p.product_type === 'digital' ? 'Dijital' : 'Hizmet'}</TableCell>
                    <TableCell>{formatPrice(p.price_onetime)}</TableCell>
                    <TableCell>{formatPrice(p.price_monthly)}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_BADGE[p.status] || ''}>
                        {p.status === 'active' ? 'Aktif' : p.status === 'draft' ? 'Taslak' : 'Arşiv'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveRow(idx, idx - 1)}
                          disabled={busy || idx === 0}
                        >
                          <ArrowUp className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveRow(idx, idx + 1)}
                          disabled={busy || idx === rows.length - 1}
                        >
                          <ArrowDown className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(p.id)}
                          disabled={busy}
                        >
                          <Pencil className="mr-1 size-4" />
                          Düzenle
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn('border-destructive text-destructive hover:text-destructive')}
                          onClick={() => onDelete(p)}
                          disabled={busy}
                        >
                          <Trash2 className="mr-1 size-4" />
                          Sil
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {showEmpty && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      Kayıt bulunamadı
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="rounded-md border md:hidden">
            <div className="divide-y">
              {rows.map((p, idx) => (
                <div key={p.id} className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{p.title || '—'}</span>
                    <Badge className={STATUS_BADGE[p.status] || ''}>{p.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{p.category || '—'}</Badge>
                    <span>{formatPrice(p.price_onetime)}</span>
                    {p.price_monthly && <span>{formatPrice(p.price_monthly)}/mo</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(p.id)} disabled={busy}>
                      <Pencil className="mr-1 size-4" />
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive text-destructive"
                      onClick={() => onDelete(p)}
                      disabled={busy}
                    >
                      <Trash2 className="mr-1 size-4" />
                      Sil
                    </Button>
                  </div>
                </div>
              ))}
              {showEmpty && (
                <div className="p-6 text-center text-sm text-muted-foreground">Kayıt bulunamadı</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
