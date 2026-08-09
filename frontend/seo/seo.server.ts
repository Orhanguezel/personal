// =============================================================
// FILE: src/seo/seo.server.ts
// FINAL — Server-side SEO + Analytics loader from SiteSettings (STRICT, dynamic only)
// - STRICT: missing critical settings throw
// - Allows values to come as JSON string or {key,value}/{value}/{data:{value}} wrapper
// - Better diagnostics (shows key + hint about locale='*')
// =============================================================

import type { SeoAll, SeoPage, AnalyticsConfig } from '@/integrations/shared';

import type { Thing } from './jsonld';
import { graph, org, website, person, professionalService } from './jsonld';
import { joinUrl } from '@/integrations/shared';
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
  const localBusinessRaw = all.localBusiness ?? null;

  // ── IKI MARKA, TEK KOD TABANI ─────────────────────────────────────────────
  // Asagidaki JSON-LD grafi Guezel Web Design icin ELLE yazilmisti: kurucu
  // Person'i (Orhan Guzel, IHK Aachen), Almanya adresi (Grevenbroich),
  // Alman telefon/e-postasi ve GWD sosyal hesaplari.
  // gzlteknoloji.com ayni koddan sunuldugunda bu yapisal veri YANLIS bir
  // isletmeyi tarif ediyordu.
  //
  // Ayrim: bir deployment `seo_local_business` ayarini TANIMLADIYSA, yapisal
  // veri O AYARDAN uretilir ve GWD'ye ozel bloklar hic eklenmez. Ayar yoksa
  // (guezelwebdesign.com'un bugunku durumu) eski graf aynen korunur.
  const hasOwnBusinessData = Boolean(
    localBusinessRaw && typeof localBusinessRaw === 'object',
  );

  const sameAs = Array.from(
    new Set([
      ...(all.sameAs ?? []),
      // GWD'ye ait sabit hesaplar yalnizca kendi deployment'inda eklenir
      ...(hasOwnBusinessData
        ? []
        : [
            'https://github.com/Orhanguezel',
            'https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a',
            'https://www.linkedin.com/company/gzl-teknoloji',
          ]),
    ]),
  );

  const orgId = `${canonicalBase}/#org`;
  const websiteId = `${canonicalBase}/#website`;
  const localBusinessId = `${canonicalBase}/#localbusiness`;
  const localBusinessDeId = `${canonicalBase}/#localbusiness-de`;
  const localBusinessTrId = `${canonicalBase}/#localbusiness-tr`;
  const founderId = `${canonicalBase}/#founder`;
  const professionalServiceId = `${canonicalBase}/#professional-service`;

  const localBusinessImage = joinUrl(
    canonicalBase,
    '/assets/imgs/guezel-showcase/workspace_guezel_web_design.webp',
  );

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
      // Aciklama/kurulus/e-posta once DB'den; yoksa GWD'nin mevcut degerleri.
      // (Sabit degerler GZL deployment'inda yanlis isletmeyi tarif ediyordu.)
      description: hasOwnBusinessData
        ? (asText((localBusinessRaw as any)?.description) || undefined)
        : 'Full-Stack Web Development Agency specializing in production-ready business platforms, e-commerce systems, and web applications using Next.js, Fastify, Laravel, and Flutter.',
      founderId: hasOwnBusinessData ? undefined : founderId,
      foundingDate: hasOwnBusinessData
        ? (asText((localBusinessRaw as any)?.foundingDate) || undefined)
        : '2020',
      areaServed: hasOwnBusinessData ? undefined : ['Germany', 'Europe'],
      knowsAbout: hasOwnBusinessData
        ? undefined
        : [
            'Next.js',
            'React',
            'TypeScript',
            'Fastify',
            'Laravel',
            'Flutter',
            'MySQL',
            'E-Commerce',
            'Full-Stack Web Development',
            'UI/UX Design',
          ],
      email: hasOwnBusinessData
        ? (asText((localBusinessRaw as any)?.email) || undefined)
        : 'orhanguzell@gmail.com',
    }),
  );

  if (!hasOwnBusinessData) items.push(
    person({
      id: founderId,
      name: 'Orhan Güzel',
      alternateName: 'Orhan Guzel',
      jobTitle: 'Full-Stack Developer & Founder',
      url: canonicalBase,
      sameAs: [
        'https://github.com/Orhanguezel',
        'https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a',
      ],
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Fastify',
        'Laravel',
        'Flutter',
        'MySQL',
        'E-Commerce',
        'Full-Stack Development',
      ],
      worksForId: orgId,
      alumniOf: 'IHK Aachen',
      address: { locality: 'Grevenbroich', region: 'Nordrhein-Westfalen', country: 'DE' },
    }),
  );

  if (!hasOwnBusinessData) items.push(
    professionalService({
      id: professionalServiceId,
      name: siteName,
      url: canonicalBase,
      founderId,
      areaServed: ['Germany', 'Europe'],
      knowsLanguage: ['de', 'en', 'tr'],
      priceRange: '$$',
    }),
  );

  if (!hasOwnBusinessData) items.push({
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': localBusinessDeId,
    name: siteName,
    url: canonicalBase,
    email: 'orhanguzell@gmail.com',
    telephone: '+49 172 384 6068',
    image: localBusinessImage,
    logo:
      localBusinessRaw && typeof (localBusinessRaw as any).logo === 'string'
        ? String((localBusinessRaw as any).logo).trim()
        : joinUrl(canonicalBase, '/assets/imgs/template/favicon.svg'),
    parentOrganization: { '@id': orgId },
    founder: { '@id': founderId },
    sameAs,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Daimlerstraße 50',
      postalCode: '41516',
      addressLocality: 'Grevenbroich',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0876,
      longitude: 6.5877,
    },
    areaServed: ['Germany', 'Europe'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  });

  if (!hasOwnBusinessData) items.push({
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': localBusinessTrId,
    name: 'GZL Teknoloji ve Danışmanlık Hizmetleri Ltd. Şti.',
    url: canonicalBase,
    email: 'orhanguzell@gmail.com',
    telephone: '+90 505 715 14 60',
    parentOrganization: { '@id': orgId },
    founder: { '@id': founderId },
    sameAs,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cumhuriyet Mah. Hastahane Cad. 12/C Şahinler Sitesi D:14',
      postalCode: '16600',
      addressLocality: 'Gemlik',
      addressRegion: 'Bursa',
      addressCountry: 'TR',
    },
    areaServed: ['Turkey'],
  });

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
