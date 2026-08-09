// =============================================================
// FILE: src/app/(main)/admin/(admin)/services/_components/serviceForm/serviceForm.utils.ts
// guezelwebdesign – ServiceForm helpers (normalize/build) (FINAL)
// - ✅ category/sub_category removed
// - ✅ safe locale resolve
// - ✅ slugify TR/DE safe
// =============================================================

import type { ServiceDto, ServiceFormValues } from '@/integrations/shared';

export const normalizeLocale = (v: unknown): string =>
  typeof v === 'string' ? v.trim().toLowerCase() : '';

export const slugify = (value: string): string => {
  if (!value) return '';
  let s = value.trim();

  const trMap: Record<string, string> = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    I: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  };

  s = s
    .split('')
    .map((ch) => trMap[ch] ?? ch)
    .join('');

  // German ß
  s = s.replace(/ß/g, 'ss').replace(/ẞ/g, 'ss');

  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const resolveInitialLocale = (
  initial: ServiceDto | undefined,
  activeLocale: string | undefined,
  fallbackLocale: string,
): string => {
  const candidate = normalizeLocale(
    initial?.locale_resolved ?? activeLocale ?? fallbackLocale ?? '',
  );
  return candidate || normalizeLocale(fallbackLocale) || '';
};

const toStr = (v: unknown) => (v === null || v === undefined ? '' : String(v));

type ServiceContentRecord = Record<string, unknown>;

export const parseServiceContent = (raw: unknown): ServiceContentRecord => {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    return { ...(raw as ServiceContentRecord) };
  }

  const text = toStr(raw).trim();
  if (!text) return {};

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ServiceContentRecord;
    }
  } catch {
    // Legacy rows may contain HTML directly instead of a JSON object.
  }

  return { html: text };
};

const contentString = (content: ServiceContentRecord, key: string): string =>
  toStr(content[key]);

export const serializeServiceContent = (values: ServiceFormValues): string => {
  const content = parseServiceContent(values.content);
  const tags = toStr(values.tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const editable: Record<string, unknown> = {
    html: values.description || '',
    material: values.material || '',
    includes: values.includes || '',
    warranty: values.warranty || '',
    area: values.area || '',
    duration: values.duration || '',
    maintenance: values.maintenance || '',
    season: values.season || '',
    equipment: values.equipment || '',
    tags,
  };

  // Preserve packages, source metadata and any future keys while making every
  // field visible in the form persist through the canonical content column.
  return JSON.stringify({ ...content, ...editable });
};

export const buildInitialValues = (
  initial: ServiceDto | undefined,
  activeLocale: string | undefined,
  fallbackLocale: string,
): ServiceFormValues => {
  const loc = resolveInitialLocale(initial, activeLocale, fallbackLocale);

  if (!initial) {
    return {
      id: undefined,
      locale: loc,

      // i18n
      name: '',
      slug: '',
      summary: '',
      content: '',
      description: '',

      material: '',
      price: '',
      currency: 'USD',
      is_purchasable: false,
      includes: '',
      warranty: '',
      image_alt: '',

      // flags + order
      is_active: true,
      featured: false,
      display_order: '0',
      type: 'other',

      // cover (UI keeps both mirrored)
      featured_image: '',
      image_url: '',
      image_asset_id: '',

      // technical
      area: '',
      duration: '',
      maintenance: '',
      season: '',
      equipment: '',

      // SEO + tags
      tags: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',

      // i18n ops
      replicate_all_locales: true,
      apply_all_locales: false,
    };
  }

  const parsedContent = parseServiceContent(initial.content);
  const parsedTags = Array.isArray(parsedContent.tags)
    ? parsedContent.tags.map(toStr).filter(Boolean).join(', ')
    : contentString(parsedContent, 'tags');

  return {
    id: initial.id,
    locale: loc,

    // i18n
    name: toStr(initial.name),
    slug: toStr(initial.slug),
    summary: toStr(initial.summary),
    content: toStr(initial.content),
    description:
      contentString(parsedContent, 'html') ||
      contentString(parsedContent, 'description') ||
      toStr(initial.description),

    material: contentString(parsedContent, 'material') || toStr(initial.material),
    price: toStr(initial.price_onetime ?? initial.price),
    currency: toStr((initial as { currency?: string }).currency) || 'USD',
    is_purchasable: !!initial.is_purchasable,
    includes: contentString(parsedContent, 'includes') || toStr(initial.includes),
    warranty: contentString(parsedContent, 'warranty') || toStr(initial.warranty),
    image_alt: toStr(initial.image_alt),

    // flags + order
    is_active: !!initial.is_active,
    featured: !!initial.featured,
    display_order: Number.isFinite(initial.display_order) ? String(initial.display_order) : '0',
    type: toStr(initial.type) || 'other',

    // cover
    featured_image: toStr(initial.featured_image),
    image_url: toStr(initial.image_url),
    image_asset_id: toStr(initial.image_asset_id),

    // technical
    area: contentString(parsedContent, 'area') || toStr(initial.area),
    duration: contentString(parsedContent, 'duration') || toStr(initial.duration),
    maintenance: contentString(parsedContent, 'maintenance') || toStr(initial.maintenance),
    season: contentString(parsedContent, 'season') || toStr(initial.season),
    equipment: contentString(parsedContent, 'equipment') || toStr(initial.equipment),

    // SEO + tags
    tags: parsedTags || toStr((initial as any).tags),
    meta_title: toStr((initial as any).meta_title),
    meta_description: toStr((initial as any).meta_description),
    meta_keywords: toStr((initial as any).meta_keywords),

    // i18n ops
    replicate_all_locales: true,
    apply_all_locales: false,
  };
};
