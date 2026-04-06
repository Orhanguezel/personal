'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Save, RefreshCcw } from 'lucide-react';

import { useAdminLocales } from '@/app/(main)/admin/_components/common/useAdminLocales';
import { resolveAdminApiLocale } from '@/i18n/adminLocale';
import { localeShortClient, localeShortClientOr } from '@/i18n/localeShortClient';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type {
  ProductDto,
  ProductCreatePayload,
  ProductUpdatePayload,
  ProductFormValues,
} from '@/integrations/shared/products.types';
import { buildProductFormValues } from '@/integrations/shared/products.types';
import {
  useGetProductAdminQuery,
  useCreateProductAdminMutation,
  useUpdateProductAdminMutation,
} from '@/integrations/hooks';

function isUuidLike(v?: string) {
  if (!v) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

function slugify(value: string): string {
  const map: Record<string, string> = {
    ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss',
    ç: 'c', ğ: 'g', ı: 'i', ş: 's',
  };
  return value
    .toLowerCase()
    .replace(/[äöüßçğışŞÇĞÜÖİ]/g, (m) => map[m.toLowerCase()] || m)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getErrMessage(err: unknown, fallback: string): string {
  const anyErr = err as any;
  return anyErr?.data?.error?.message || anyErr?.data?.message || anyErr?.error || fallback;
}

function csvToArray(val: string): string[] {
  return val
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const isCreateMode = String(id) === 'new';

  const {
    localeOptions,
    defaultLocaleFromDb,
    loading: localesLoading,
    fetching: localesFetching,
  } = useAdminLocales();

  const apiLocaleFromDb = React.useMemo(() => {
    return resolveAdminApiLocale(localeOptions as any, defaultLocaleFromDb, 'de');
  }, [localeOptions, defaultLocaleFromDb]);

  const localeSet = React.useMemo(() => {
    return new Set(
      (localeOptions ?? []).map((x: any) => localeShortClient(x.value)).filter(Boolean),
    );
  }, [localeOptions]);

  const urlLocale = React.useMemo(() => {
    return localeShortClient(sp?.get('locale')) || '';
  }, [sp]);

  const [activeLocale, setActiveLocale] = React.useState('');

  React.useEffect(() => {
    if (!localeOptions || localeOptions.length === 0) return;
    setActiveLocale((prev) => {
      const p = localeShortClient(prev);
      const u = localeShortClient(urlLocale);
      const def = localeShortClientOr(apiLocaleFromDb, 'de');
      const canUse = (l: string) => !!l && (localeSet.size === 0 || localeSet.has(l));
      if (p && canUse(p)) return p;
      if (u && canUse(u)) return u;
      if (def && canUse(def)) return def;
      return localeShortClient((localeOptions as any)?.[0]?.value) || 'de';
    });
  }, [localeOptions, localeSet, urlLocale, apiLocaleFromDb]);

  const queryLocale = React.useMemo(() => {
    const l = localeShortClient(activeLocale);
    if (l && (localeSet.size === 0 || localeSet.has(l))) return l;
    return localeShortClientOr(apiLocaleFromDb, 'de');
  }, [activeLocale, localeSet, apiLocaleFromDb]);

  React.useEffect(() => {
    const l = localeShortClient(activeLocale);
    if (!l || l === urlLocale) return;
    const params = new URLSearchParams(sp?.toString() || '');
    params.set('locale', l);
    const path = isCreateMode ? '/admin/products/new' : `/admin/products/${encodeURIComponent(id)}`;
    router.replace(`${path}?${params.toString()}`);
  }, [activeLocale]);

  const shouldSkipDetail = isCreateMode || !isUuidLike(id) || !queryLocale;

  const {
    data: product,
    isLoading: isLoadingProduct,
    isFetching: isFetchingProduct,
    error: productError,
    refetch,
  } = useGetProductAdminQuery(
    { id, locale: queryLocale } as any,
    { skip: shouldSkipDetail } as any,
  );

  const [createProduct, createState] = useCreateProductAdminMutation();
  const [updateProduct, updateState] = useUpdateProductAdminMutation();

  const loading = localesLoading || localesFetching || isLoadingProduct || isFetchingProduct;
  const saving = createState.isLoading || updateState.isLoading;
  const busy = loading || saving;

  const [form, setForm] = React.useState<ProductFormValues>(
    buildProductFormValues(undefined, queryLocale || 'de'),
  );

  React.useEffect(() => {
    if (isCreateMode) {
      setForm(buildProductFormValues(undefined, queryLocale || 'de'));
    } else if (product) {
      setForm(buildProductFormValues(product as ProductDto, queryLocale || 'de'));
    }
  }, [product, isCreateMode, queryLocale]);

  function onCancel() {
    router.push(`/admin/products?locale=${encodeURIComponent(queryLocale || 'de')}`);
  }

  function updateField<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && isCreateMode) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title?.trim() || !form.slug?.trim()) {
      toast.error('Başlık ve slug zorunludur.');
      return;
    }

    try {
      const loc = localeShortClient(form.locale || queryLocale || apiLocaleFromDb) || 'de';

      const common = {
        product_type: form.product_type,
        category: form.category || null,
        price_onetime: form.price_onetime ? String(form.price_onetime) : null,
        price_monthly: form.price_monthly ? String(form.price_monthly) : null,
        currency: form.currency || 'EUR',
        status: form.status,
        is_featured: form.is_featured,
        display_order: form.display_order ? Number(form.display_order) : 0,
        cover_image_url: form.cover_image_url || null,
        gallery: form.gallery ? (() => { try { return JSON.parse(form.gallery); } catch { return []; } })() : [],
        demo_url: form.demo_url || null,
        download_url: form.download_url || null,
        tags: csvToArray(form.tags),
        tech_stack: csvToArray(form.tech_stack),
        paypal_plan_id: form.paypal_plan_id || null,
        locale: loc,
        title: form.title.trim(),
        slug: form.slug.trim(),
        subtitle: form.subtitle || null,
        description: form.description || null,
        features: csvToArray(form.features),
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
      };

      if (isCreateMode) {
        const payload: ProductCreatePayload = {
          ...common,
          replicate_all_locales: form.replicate_all_locales,
        };
        const created = await createProduct(payload as any).unwrap();
        const nextId = String((created as any)?.id ?? '');
        if (!isUuidLike(nextId)) {
          toast.error('Oluşturuldu fakat ID alınamadı.');
          return;
        }
        toast.success('Ürün oluşturuldu');
        router.replace(`/admin/products/${nextId}?locale=${encodeURIComponent(loc)}`);
        router.refresh();
      } else {
        const currentId = String((product as any)?.id ?? id);
        const patch: ProductUpdatePayload = {
          ...common,
          apply_all_locales: form.apply_all_locales,
        };
        await updateProduct({ id: currentId, patch } as any).unwrap();
        toast.success('Ürün güncellendi');
      }
    } catch (err) {
      toast.error(getErrMessage(err, 'Bir hata oluştu.'));
    }
  }

  // Guards
  if (!isCreateMode && !isUuidLike(id)) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Geçersiz ID</h1>
        <Card>
          <CardContent className="pt-6">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="mr-2 size-4" /> Listeye Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isCreateMode && !loading && !product && productError) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Ürün bulunamadı</h1>
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="mr-2 size-4" /> Listeye Dön
            </Button>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCcw className="mr-2 size-4" /> Tekrar Dene
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pageTitle = isCreateMode ? 'Yeni Paket Oluştur' : (product as any)?.title || 'Ürün Düzenle';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()} disabled={busy}>
              <ArrowLeft className="mr-2 size-4" /> Geri
            </Button>
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dil:</span>
            <Badge variant="secondary">{queryLocale || '-'}</Badge>
            <Badge>{isCreateMode ? 'YENİ' : 'DÜZENLE'}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel} disabled={busy}>İptal</Button>
          <Button onClick={(e) => onSubmit(e as any)} disabled={busy}>
            <Save className="mr-2 size-4" /> Kaydet
          </Button>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Genel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Dil</Label>
                    <Select
                      value={activeLocale}
                      onValueChange={(v) => setActiveLocale(v)}
                      disabled={busy}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                  <div className="space-y-2">
                    <Label>Durum</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) => updateField('status', v as any)}
                      disabled={busy}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Taslak</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="archived">Arşiv</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Başlık *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    disabled={busy}
                    placeholder="Emlak Sitesi Paketi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    disabled={busy}
                    placeholder="emlak-sitesi-paketi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Alt Başlık</Label>
                  <Input
                    id="subtitle"
                    value={form.subtitle}
                    onChange={(e) => updateField('subtitle', e.target.value)}
                    disabled={busy}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama (HTML)</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    disabled={busy}
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Özellikler (her satır bir özellik)</Label>
                  <Textarea
                    id="features"
                    value={form.features}
                    onChange={(e) => updateField('features', e.target.value)}
                    disabled={busy}
                    rows={4}
                    placeholder={'Responsive Tasarım\nSEO Optimizasyon\nAdmin Panel'}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fiyatlandırma</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price_onetime">Tek Seferlik Fiyat (EUR)</Label>
                    <Input
                      id="price_onetime"
                      type="number"
                      step="0.01"
                      value={form.price_onetime}
                      onChange={(e) => updateField('price_onetime', e.target.value)}
                      disabled={busy}
                      placeholder="999.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_monthly">Aylık Fiyat (EUR)</Label>
                    <Input
                      id="price_monthly"
                      type="number"
                      step="0.01"
                      value={form.price_monthly}
                      onChange={(e) => updateField('price_monthly', e.target.value)}
                      disabled={busy}
                      placeholder="49.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal_plan_id">PayPal Plan ID</Label>
                    <Input
                      id="paypal_plan_id"
                      value={form.paypal_plan_id}
                      onChange={(e) => updateField('paypal_plan_id', e.target.value)}
                      disabled={busy}
                      placeholder="P-xxxx"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_title">SEO Başlık</Label>
                  <Input
                    id="seo_title"
                    value={form.seo_title}
                    onChange={(e) => updateField('seo_title', e.target.value)}
                    disabled={busy}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_description">SEO Açıklama</Label>
                  <Textarea
                    id="seo_description"
                    value={form.seo_description}
                    onChange={(e) => updateField('seo_description', e.target.value)}
                    disabled={busy}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ürün Tipi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tip</Label>
                  <Select
                    value={form.product_type}
                    onValueChange={(v) => updateField('product_type', v as any)}
                    disabled={busy}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Dijital (Kaynak Kod)</SelectItem>
                      <SelectItem value="service">Hizmet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select
                    value={form.category || '__none__'}
                    onValueChange={(v) => updateField('category', v === '__none__' ? '' : v)}
                    disabled={busy}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">Seçiniz</SelectItem>
                      <SelectItem value="emlak">Emlak</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="erp">ERP</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Sıralama</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={form.display_order}
                    onChange={(e) => updateField('display_order', e.target.value)}
                    disabled={busy}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.is_featured}
                    onCheckedChange={(v) => updateField('is_featured', v)}
                    disabled={busy}
                  />
                  <Label>Öne Çıkan</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Medya & Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover_image_url">Kapak Görseli URL</Label>
                  <Input
                    id="cover_image_url"
                    value={form.cover_image_url}
                    onChange={(e) => updateField('cover_image_url', e.target.value)}
                    disabled={busy}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={form.demo_url}
                    onChange={(e) => updateField('demo_url', e.target.value)}
                    disabled={busy}
                    placeholder="https://demo.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="download_url">İndirme URL</Label>
                  <Input
                    id="download_url"
                    value={form.download_url}
                    onChange={(e) => updateField('download_url', e.target.value)}
                    disabled={busy}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Teknik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tech_stack">Teknolojiler (virgülle ayırın)</Label>
                  <Input
                    id="tech_stack"
                    value={form.tech_stack}
                    onChange={(e) => updateField('tech_stack', e.target.value)}
                    disabled={busy}
                    placeholder="Next.js, React, Node.js"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiketler (virgülle ayırın)</Label>
                  <Input
                    id="tags"
                    value={form.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                    disabled={busy}
                    placeholder="emlak, responsive, seo"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Çoklu Dil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isCreateMode ? (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.replicate_all_locales}
                      onCheckedChange={(v) => updateField('replicate_all_locales', v)}
                      disabled={busy}
                    />
                    <Label>Tüm dillere kopyala</Label>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={form.apply_all_locales}
                      onCheckedChange={(v) => updateField('apply_all_locales', v)}
                      disabled={busy}
                    />
                    <Label>Tüm dillere uygula</Label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
