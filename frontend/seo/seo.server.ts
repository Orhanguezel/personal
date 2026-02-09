// =============================================================
// FILE: src/seo/seo.server.ts
// FINAL — Server-side SEO + Analytics loader from SiteSettings (STRICT, dynamic only)
// - STRICT: missing critical settings throw
// - Allows values to come as JSON string or {key,value}/{value}/{data:{value}} wrapper
// - Better diagnostics (shows key + hint about locale='*')
// =============================================================

import type { SeoAll, SeoPage, AnalyticsConfig } from '@/integrations/shared';

import type { Thing } from './jsonld';
import { graph, org, website } from './jsonld';
import { SEO_KEY_LIST_ALL, SEO_KEYS } from './seo.keys';
import { buildSeoAllFromSettings } from './seo.mapper';

import { stripContext, fetchSiteSettingsStrict, asText } from '@/integrations/shared';

// -------------------------
// Public API
// -------------------------

export async function getSeoAll(opts?: { routeLocale?: string | null }): Promise<SeoAll> {
  // NOTE: fetchSiteSettingsStrict'in locale davranışı projene bağlı.
  // Hata "seo_defaults" bulunamadığı için: DB'de bu key kesin olmalı.
  const dict = await fetchSiteSettingsStrict(SEO_KEY_LIST_ALL, {
    routeLocale: opts?.routeLocale ?? null,
  });
  return buildSeoAllFromSettings(dict);
}

export async function getSeoPage(
  pageKey: string,
  opts?: { routeLocale?: string | null },
): Promise<{ all: SeoAll; page: SeoPage | null }> {
  const all = await getSeoAll({ routeLocale: opts?.routeLocale ?? null });
  const page = all.pages?.[pageKey] ?? null;
  return { all, page };
}

export async function getAnalyticsConfig(opts?: {
  routeLocale?: string | null;
}): Promise<AnalyticsConfig> {
  const dict = await fetchSiteSettingsStrict(
    [SEO_KEYS.gaId, SEO_KEYS.gtmId, SEO_KEYS.metaPixelId],
    { routeLocale: opts?.routeLocale ?? null },
  );

  return {
    gaId: asText(dict[SEO_KEYS.gaId]) || undefined,
    gtmId: asText(dict[SEO_KEYS.gtmId]) || undefined,
    metaPixelId: asText(dict[SEO_KEYS.metaPixelId]) || undefined,
  };
}

// =============================================================
// JSON-LD graph builder (Organization + WebSite + LocalBusiness)
// =============================================================

export async function getSiteJsonLdGraph(): Promise<Thing> {
  const all = await getSeoAll();
  const canonicalBase = all.defaults.canonicalBase;
  const siteName = all.defaults.siteName;
  const sameAs = all.sameAs ?? [];
  const localBusinessRaw = all.localBusiness ?? null;

  const orgId = `${canonicalBase}/#org`;
  const websiteId = `${canonicalBase}/#website`;
  const localBusinessId = `${canonicalBase}/#localbusiness`;

  const items: Thing[] = [];

  items.push(
    org({
      id: orgId,
      name: siteName,
      url: canonicalBase,
      logo:
        localBusinessRaw && typeof (localBusinessRaw as any).logo === 'string'
          ? String((localBusinessRaw as any).logo).trim()
          : undefined,
      sameAs: sameAs.length ? sameAs : undefined,
    }),
  );

  items.push(
    website({
      id: websiteId,
      name: siteName,
      url: canonicalBase,
      publisherId: orgId,
    }),
  );

  if (localBusinessRaw) {
    const lb = stripContext(localBusinessRaw as Record<string, unknown>);

    if (!(lb as any)['@id']) (lb as any)['@id'] = localBusinessId;
    if (!(lb as any).url) (lb as any).url = canonicalBase;
    if (!(lb as any).name) (lb as any).name = siteName;

    const lbSameAs = Array.isArray((lb as any).sameAs) ? (lb as any).sameAs : [];
    if (!lbSameAs.length && sameAs.length) (lb as any).sameAs = sameAs;

    if (!(lb as any).parentOrganization) (lb as any).parentOrganization = { '@id': orgId };

    items.push(lb as Thing);
  }

  return graph(items);
}
