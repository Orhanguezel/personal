'use client';

// =============================================================
// FILE: src/app/(main)/admin/(admin)/projects/admin-project-detail-client.tsx
// FINAL — Admin Project Create/Edit
// ✅ RichContentEditor added for content field
// =============================================================

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { AdminJsonEditor } from '@/app/(main)/admin/_components/common/AdminJsonEditor';
import { AdminLocaleSelect, type AdminLocaleOption } from '@/app/(main)/admin/_components/common/AdminLocaleSelect';
import { useAdminLocales } from '@/app/(main)/admin/_components/common/useAdminLocales';
import { useAdminUiCopy } from '@/app/(main)/admin/_components/common/useAdminUiCopy';
import RichContentEditor from '@/components/common/RichContentEditor'; // ✅ ADDED

import type { Project, ServiceDto, UpsertProjectInput } from '@/integrations/shared';
import { isUuidLike, parseStringArray } from '@/integrations/shared';
import {
  useGetProjectAdminQuery,
  useGetProjectBySlugAdminQuery,
  useCreateProjectAdminMutation,
  useUpdateProjectAdminMutation,
  useListServicesAdminQuery,
} from '@/integrations/hooks';
import type { BlogSeoQualityScore } from '@/integrations/shared';
import ContentQualityPanel from '@/components/admin/seo/content-quality-panel';
import { CategorySelect } from '@/components/admin/category-select';

type FormState = UpsertProjectInput & { id?: string };

const emptyForm: FormState = {
  locale: '',
  is_published: true,
  is_featured: false,
  display_order: 0,
  featured_image: '',
  featured_image_asset_id: '',
  demo_url: '',
  repo_url: '',
  category: '',
  client_name: '',
  start_date: '',
  complete_date: '',
  completion_time_label: '',
  website_url: '',
  services: [],
  techs: [],
  title: '',
  slug: '',
  summary: '',
  content: '',
  featured_image_alt: '',
  meta_title: '',
  meta_description: '',
  price_onetime: '',
  currency: 'USD',
  is_purchasable: false,
};

function ProjectServiceSelector({
  locale,
  value,
  onChange,
  label,
  helperText,
}: {
  locale: string;
  value: string[];
  onChange: (next: string[]) => void;
  label?: string;
  helperText?: string;
}) {
  const servicesQ = useListServicesAdminQuery({
    locale: locale || undefined,
    is_active: 1,
    limit: 200,
    offset: 0,
  });
  const services = React.useMemo(
    () => ((servicesQ.data as { items?: ServiceDto[] } | undefined)?.items ?? []),
    [servicesQ.data],
  );
  const selected = React.useMemo(() => new Set(value), [value]);

  const toggle = (slug: string, checked: boolean) => {
    onChange(checked ? [...new Set([...value, slug])] : value.filter((item) => item !== slug));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>{label || 'İlgili hizmetler'}</Label>
        <Badge variant="secondary">{selected.size} seçili</Badge>
      </div>
      {helperText ? <p className="text-xs text-muted-foreground">{helperText}</p> : null}
      <div className="max-h-72 space-y-1 overflow-y-auto rounded-md border p-2">
        {servicesQ.isLoading ? (
          <p className="p-2 text-sm text-muted-foreground">Hizmetler yükleniyor…</p>
        ) : (
          services.map((service) => {
            const slug = String(service.slug ?? '').trim();
            if (!slug) return null;
            return (
              <label
                key={service.id}
                className="flex cursor-pointer items-start gap-3 rounded-md p-2 hover:bg-muted/60"
              >
                <Checkbox
                  checked={selected.has(slug)}
                  onCheckedChange={(checked) => toggle(slug, checked === true)}
                  className="mt-0.5"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{service.name || slug}</span>
                  <span className="block wrap-break-word text-xs text-muted-foreground">{slug}</span>
                </span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function AdminProjectDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { copy } = useAdminUiCopy();
  const page = copy.pages?.projects_detail ?? {};
  const common = copy.common;

  const { localeOptions, defaultLocaleFromDb, loading: localesLoading } = useAdminLocales();

  // ✅ FIX: Safe locale options
  const safeLocaleOptions: AdminLocaleOption[] = React.useMemo(() => {
    if (!Array.isArray(localeOptions)) return [];
    return localeOptions.map((opt) => ({
      value: opt.value || '',
      label: opt.label || opt.value || '',
    }));
  }, [localeOptions]);

  const isCreate = String(id) === 'new';
  // ADRESTE ID DEGIL SLUG
  // Rota onceden yalnizca UUID kabul ediyordu; adres cubugunda okunmaz bir
  // kimlik duruyordu. Artik slug de calisir, eski UUID adresleri de.
  const routeKey = String(id || '').trim();
  const looksLikeId = isUuidLike(routeKey);
  const canLoad = !isCreate && !!routeKey;

  const byIdQ = useGetProjectAdminQuery(routeKey, {
    skip: !canLoad || !looksLikeId,
    refetchOnMountOrArgChange: true,
  });
  const bySlugQ = useGetProjectBySlugAdminQuery(routeKey, {
    skip: !canLoad || looksLikeId,
    refetchOnMountOrArgChange: true,
  });
  const projectQ = looksLikeId ? byIdQ : bySlugQ;
  const [createProject, createState] = useCreateProjectAdminMutation();
  const [updateProject, updateState] = useUpdateProjectAdminMutation();

  const seoQuality = (projectQ.data as { seo_quality?: BlogSeoQualityScore } | undefined)?.seo_quality;

  const [form, setForm] = React.useState<FormState>(emptyForm);

  React.useEffect(() => {
    if (projectQ.data) {
      const p = projectQ.data as Project;
      setForm({
        id: p.id,
        locale: p.locale ?? (p as Project & { locale_resolved?: string }).locale_resolved ?? '',
        is_published: p.is_published,
        is_featured: p.is_featured,
        display_order: p.display_order,
        featured_image: p.featured_image ?? '',
        featured_image_asset_id: p.featured_image_asset_id ?? '',
        demo_url: p.demo_url ?? '',
        repo_url: p.repo_url ?? '',
        category: p.category ?? '',
        client_name: p.client_name ?? '',
        start_date: p.start_date ?? '',
        complete_date: p.complete_date ?? '',
        completion_time_label: p.completion_time_label ?? '',
        website_url: p.website_url ?? '',
        services: parseStringArray(p.services),
        techs: parseStringArray(p.techs),
        title: p.title ?? '',
        slug: p.slug ?? '',
        summary: p.summary ?? '',
        // ✅ CHANGED: Handle content properly for RichContentEditor
        content: typeof p.content === 'string' ? p.content : JSON.stringify(p.content ?? {}, null, 2),
        featured_image_alt: p.featured_image_alt ?? '',
        meta_title: p.meta_title ?? '',
        meta_description: p.meta_description ?? '',
        price_onetime: p.price_onetime != null ? String(p.price_onetime) : '',
        currency: (p.currency as string) || 'USD',
        is_purchasable:
          p.is_purchasable === true || (p as { is_purchasable?: number }).is_purchasable === 1,
      });
    }
    if (isCreate) setForm({ ...emptyForm, locale: defaultLocaleFromDb || '' });
  }, [projectQ.data, isCreate, defaultLocaleFromDb]);

  async function onSave() {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error(page?.required_error || '');
      return;
    }

    const payload: UpsertProjectInput = {
      locale: form.locale || undefined,
      is_published: !!form.is_published,
      is_featured: !!form.is_featured,
      display_order: Number(form.display_order ?? 0),
      featured_image: form.featured_image?.trim() || null,
      featured_image_asset_id: form.featured_image_asset_id?.trim() || null,
      demo_url: form.demo_url?.trim() || null,
      repo_url: form.repo_url?.trim() || null,
      category: form.category?.trim() || null,
      client_name: form.client_name?.trim() || null,
      start_date: form.start_date?.trim() || null,
      complete_date: form.complete_date?.trim() || null,
      completion_time_label: form.completion_time_label?.trim() || null,
      website_url: form.website_url?.trim() || null,
      services: Array.isArray(form.services) ? form.services : [],
      techs: Array.isArray(form.techs) ? form.techs : [],
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary?.trim() || null,
      // ✅ CHANGED: Content as string (RichContentEditor handles HTML)
      content: typeof form.content === 'string' ? form.content : JSON.stringify(form.content ?? {}),
      featured_image_alt: form.featured_image_alt?.trim() || null,
      meta_title: form.meta_title?.trim() || null,
      meta_description: form.meta_description?.trim() || null,
      price_onetime: (() => {
        const s = String(form.price_onetime ?? '').trim();
        return s ? s : null;
      })(),
      currency: form.currency?.trim() || 'USD',
      is_purchasable: !!form.is_purchasable,
    };

    try {
      if (isCreate) {
        const created = await createProject(payload).unwrap();
        if (created?.id) {
          toast.success(common?.actions?.save || '');
          // Adreste slug tercih edilir.
          const nextKey = String((created as { slug?: string }).slug ?? '').trim() || created.id;
          router.replace(`/admin/projects/${encodeURIComponent(nextKey)}`);
          return;
        }
      } else if (form.id) {
        await updateProject({ id: form.id, patch: payload }).unwrap();
        toast.success(common?.actions?.save || '');
      }
    } catch (err: any) {
      toast.error(err?.data?.error?.message || err?.message || common?.states?.error || '');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">
            {isCreate ? page?.create_title : page?.edit_title}
          </h1>
          <p className="text-sm text-muted-foreground">{page?.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/projects')}>
            {common?.actions?.back}
          </Button>
          <Button onClick={onSave} disabled={createState.isLoading || updateState.isLoading}>
            {common?.actions?.save}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="gap-2">
            <CardTitle className="text-base">{page?.form_title}</CardTitle>
            <CardDescription>{page?.form_desc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <AdminLocaleSelect
              value={form.locale || ''}
              onChange={(v) => setForm((p) => ({ ...p, locale: v }))}
              options={safeLocaleOptions}
              loading={localesLoading}
              label={page?.locale_label}
            />

            <div className="space-y-2">
              <Label>{page?.title_label}</Label>
              <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{page?.slug_label}</Label>
              <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{page?.summary_label}</Label>
              <Textarea value={form.summary ?? ''} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} rows={3} />
            </div>

            {/* ✅ CHANGED: RichContentEditor instead of Textarea */}
            <div className="md:col-span-2">
              <RichContentEditor
  label={page?.content_label || 'İçerik'}
  value={typeof form.content === 'string' ? form.content : ''}
  onChange={(next: string) => setForm((p) => ({ ...p, content: next }))}
  height="400px"
/>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="gap-2">
            <CardTitle className="text-base">{page?.meta_title}</CardTitle>
            <CardDescription>{page?.meta_desc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={!!form.is_published} onCheckedChange={(v) => setForm((p) => ({ ...p, is_published: v }))} />
              <Label>{page?.published_label}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!form.is_featured} onCheckedChange={(v) => setForm((p) => ({ ...p, is_featured: v }))} />
              <Label>{page?.featured_label}</Label>
            </div>

            <div className="space-y-2">
              <Label>{page?.order_label}</Label>
              <Input type="number" value={form.display_order ?? 0} onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))} />
            </div>

            <div className="space-y-2">
              <Label>{page?.price_onetime_label ?? 'Tek seferlik fiyat (PayPal)'}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={form.price_onetime ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, price_onetime: e.target.value }))}
                placeholder="1000"
              />
            </div>
            <div className="space-y-2">
              <Label>{page?.currency_label ?? 'Para birimi'}</Label>
              <Input
                value={form.currency ?? 'USD'}
                onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value.toUpperCase() }))}
                placeholder="USD"
                maxLength={10}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={!!form.is_purchasable}
                onCheckedChange={(v) => setForm((p) => ({ ...p, is_purchasable: v }))}
              />
              <Label>{page?.is_purchasable_label ?? 'Satışa aç (portföy checkout)'}</Label>
            </div>

            <div className="space-y-2">
              <Label>{page?.category_label}</Label>
              {/* Serbest metin degil: kategori listesi site ayarindan gelir.
                  Bkz. components/admin/category-select.tsx */}
              <CategorySelect
                value={form.category}
                onChange={(next) => setForm((p) => ({ ...p, category: next }))}
              />
            </div>
            <div className="space-y-2">
              <Label>{page?.client_label}</Label>
              <Input value={form.client_name ?? ''} onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>{page?.featured_image_label}</Label>
              <Input value={form.featured_image ?? ''} onChange={(e) => setForm((p) => ({ ...p, featured_image: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{page?.featured_image_asset_label}</Label>
              <Input value={form.featured_image_asset_id ?? ''} onChange={(e) => setForm((p) => ({ ...p, featured_image_asset_id: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{page?.featured_image_alt_label}</Label>
              <Input value={form.featured_image_alt ?? ''} onChange={(e) => setForm((p) => ({ ...p, featured_image_alt: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>{page?.demo_url_label}</Label>
              <Input value={form.demo_url ?? ''} onChange={(e) => setForm((p) => ({ ...p, demo_url: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{page?.repo_url_label}</Label>
              <Input value={form.repo_url ?? ''} onChange={(e) => setForm((p) => ({ ...p, repo_url: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{page?.website_url_label}</Label>
              <Input value={form.website_url ?? ''} onChange={(e) => setForm((p) => ({ ...p, website_url: e.target.value }))} />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{page?.start_date_label}</Label>
                <Input type="date" value={form.start_date ?? ''} onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{page?.complete_date_label}</Label>
                <Input type="date" value={form.complete_date ?? ''} onChange={(e) => setForm((p) => ({ ...p, complete_date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{page?.completion_time_label}</Label>
              <Input value={form.completion_time_label ?? ''} onChange={(e) => setForm((p) => ({ ...p, completion_time_label: e.target.value }))} />
            </div>

            <ProjectServiceSelector
              locale={form.locale || defaultLocaleFromDb || ''}
              label={page?.services_label}
              value={form.services ?? []}
              onChange={(next) => setForm((p) => ({ ...p, services: next }))}
              helperText={page?.services_help}
            />

            <AdminJsonEditor
              label={page?.techs_label}
              value={form.techs ?? []}
              onChange={(next) => setForm((p) => ({ ...p, techs: Array.isArray(next) ? next : [] }))}
              helperText={page?.techs_help}
              height={200}
            />

            <div className="space-y-2">
              <Label>{page?.meta_title_label}</Label>
              <Input value={form.meta_title ?? ''} onChange={(e) => setForm((p) => ({ ...p, meta_title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{page?.meta_description_label}</Label>
              <Textarea value={form.meta_description ?? ''} onChange={(e) => setForm((p) => ({ ...p, meta_description: e.target.value }))} rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Icerik kalite / SEO paneli — skor backend'de hesaplanir (seo-quality.ts) */}
        {seoQuality ? <ContentQualityPanel score={seoQuality} /> : null}
      </div>
    </div>
  );
}
