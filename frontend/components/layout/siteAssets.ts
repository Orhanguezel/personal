'use client';

import { useMemo } from 'react';
import { useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import type { SettingValue } from '@/integrations/shared';
import {
  parseSiteLogoMedia,
  parseJsonObject,
  pickBrandName,
  trimStr,
} from '@/integrations/shared';

export const SITE_MEDIA_KEYS = {
  siteTitle: 'site_title',
  companyBrand: 'company_brand',

  logo: 'site_logo',
  logoDark: 'site_logo_dark',
  logoLight: 'site_logo_light',

  favicon: 'site_favicon',
  appleTouchIcon: 'site_apple_touch_icon',
  ogDefault: 'site_og_default_image',
} as const;

// Marka varsayilanlari DEPLOYMENT'A GORE uretilir:
//   bun run ui:generate  ->  config/brand.generated.json
//
// NEDEN: site_settings istemci tarafinda `/ui/<locale>.json` ile okunuyor,
// yani SUNUCUDA uretilen HTML'de marka henuz bilinmiyor ve buradaki sabit
// deger basiliyordu. Iki markali kurulumda bu, gzlteknoloji.com'un SSR
// ciktisinda "Guezel Web Design" ve GWD logosunun gorunmesi demekti.
// Uretilmis dosya yoksa (temiz checkout) asagidaki sablon degerlere duser.
import brandGenerated from '@/config/brand.generated.json';

/** Footer kunyesi — degerler DB'deki `company_brand.legal` blogundan uretilir. */
export type LegalEntity = {
  name?: string;
  shortName?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  taxOffice?: string;
  taxNumber?: string;
  mersis?: string;
  tradeRegistry?: string;
  registerCourt?: string;
  vatId?: string;
  director?: string;
};

export type LegalLink = { title: string; href: string };

// Uretilmis dosyanin sekli deployment'a gore degisir (eski kurulumlarda yeni
// alanlar hic olmayabilir); tek noktadan gevsek tiplenir.
const brandGen = brandGenerated as {
  brandName?: string;
  logo?: string;
  favicon?: string;
  appleTouchIcon?: string;
  ogDefault?: string;
  home?: unknown;
  legalEntity?: LegalEntity | null;
  legalLinks?: Record<string, LegalLink[]> | null;
};

const BRAND_DEFAULTS = {
  brandName: '',
  logo: '/assets/imgs/landing-page/logo.svg',
  favicon: '/assets/imgs/template/favicon.svg',
  appleTouchIcon: '/assets/imgs/template/favicon.svg',
  ogDefault: '/assets/imgs/guezel-showcase/service_web_design_showcase.webp',
};

export const SITE_MEDIA_FALLBACKS = {
  brandName: brandGen.brandName || BRAND_DEFAULTS.brandName,
  logo: brandGen.logo || BRAND_DEFAULTS.logo,
  favicon: brandGen.favicon || BRAND_DEFAULTS.favicon,
  appleTouchIcon: brandGen.appleTouchIcon || BRAND_DEFAULTS.appleTouchIcon,
  ogDefault: brandGen.ogDefault || BRAND_DEFAULTS.ogDefault,
  // SSR'da da basilmalidir: Meta/Facebook dogrulamasi ve arama motorlari
  // JavaScript sonrasi doldurulan metni gormeyebilir.
  legalEntity: (brandGen.legalEntity || null) as LegalEntity | null,
  legalLinks: (brandGen.legalLinks || {}) as Record<string, LegalLink[]>,
} as const;

export type SiteMedia = {
  brandName: string;
  brandShort: string;

  logo: ReturnType<typeof parseSiteLogoMedia>;
  logoDark: ReturnType<typeof parseSiteLogoMedia>;
  logoLight: ReturnType<typeof parseSiteLogoMedia>;

  favicon: ReturnType<typeof parseSiteLogoMedia>;
  appleTouchIcon: ReturnType<typeof parseSiteLogoMedia>;
  ogDefault: ReturnType<typeof parseSiteLogoMedia>;
};

const buildArg = (key: string, locale?: string) =>
  (locale ? ({ key, locale } as any) : (key as any));

function resolveMedia(val: SettingValue | unknown, fallbackUrl: string) {
  const media = parseSiteLogoMedia(val);
  const url = trimStr(media.url) || fallbackUrl;
  return { ...media, url };
}

function pickBrandLogo(val: unknown) {
  const obj = parseJsonObject(val);
  if (obj && typeof obj === 'object' && obj.logo) {
    return parseSiteLogoMedia(obj.logo);
  }
  return parseSiteLogoMedia(val);
}

export function useSiteMedia(opts?: { locale?: string }): SiteMedia {
  const locale = opts?.locale;

  const { data: siteTitleRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.siteTitle, locale));
  const { data: companyBrandRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.companyBrand, locale));

  const { data: logoRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.logo, locale));
  const { data: logoDarkRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.logoDark, locale));
  const { data: logoLightRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.logoLight, locale));

  const { data: faviconRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.favicon, locale));
  const { data: appleTouchRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.appleTouchIcon, locale));
  const { data: ogDefaultRow } = useGetSiteSettingByKeyQuery(buildArg(SITE_MEDIA_KEYS.ogDefault, locale));

  const brandName = useMemo(() => {
    const brandObj = (companyBrandRow as any)?.value;
    const fallback = SITE_MEDIA_FALLBACKS.brandName;

    // `site_title` bir SAYFA BASLIGIDIR ("GZL Teknoloji — Yazilim, SaaS ve
    // Dijital Cozumler"); header'daki logo yanina basilacak MARKA ADI degil.
    // Onceden ilk sirada oldugu icin gzlteknoloji.com header'inda logonun
    // yaninda cok uzun bir cumle cikiyordu. Once marka adi, en sonda baslik.
    return (
      pickBrandName(brandObj, '') ||
      trimStr((siteTitleRow as any)?.value) ||
      fallback
    );
  }, [siteTitleRow, companyBrandRow]);

  const brandShort = useMemo(() => {
    const brandObj = parseJsonObject((companyBrandRow as any)?.value) as any;
    // Veri kaynaklari iki yazim bicimini de kullaniyor: sablon `shortName`,
    // tasinan gzlteknoloji verisi `short_name`. Yalnizca camelCase arandigi
    // icin kisa ad bulunamiyor ve uzun baslige dusuluyordu.
    return trimStr(brandObj?.shortName) || trimStr(brandObj?.short_name) || '';
  }, [companyBrandRow]);

  const logo = useMemo(() => {
    const direct = parseSiteLogoMedia((logoRow as any)?.value);
    if (trimStr(direct.url)) return resolveMedia(direct, SITE_MEDIA_FALLBACKS.logo);

    const fromBrand = pickBrandLogo((companyBrandRow as any)?.value);
    return resolveMedia(fromBrand, SITE_MEDIA_FALLBACKS.logo);
  }, [logoRow, companyBrandRow]);

  const logoDark = useMemo(() => {
    const media = parseSiteLogoMedia((logoDarkRow as any)?.value);
    const fallback = trimStr(media.url) ? media : logo;
    return resolveMedia(fallback, SITE_MEDIA_FALLBACKS.logo);
  }, [logoDarkRow, logo]);

  const logoLight = useMemo(() => {
    const media = parseSiteLogoMedia((logoLightRow as any)?.value);
    const fallback = trimStr(media.url) ? media : logo;
    return resolveMedia(fallback, SITE_MEDIA_FALLBACKS.logo);
  }, [logoLightRow, logo]);

  const favicon = useMemo(
    () => resolveMedia((faviconRow as any)?.value, SITE_MEDIA_FALLBACKS.favicon),
    [faviconRow],
  );

  const appleTouchIcon = useMemo(
    () => resolveMedia((appleTouchRow as any)?.value, SITE_MEDIA_FALLBACKS.appleTouchIcon),
    [appleTouchRow],
  );

  const ogDefault = useMemo(
    () => resolveMedia((ogDefaultRow as any)?.value, SITE_MEDIA_FALLBACKS.ogDefault),
    [ogDefaultRow],
  );

  return {
    brandName,
    brandShort,
    logo,
    logoDark,
    logoLight,
    favicon,
    appleTouchIcon,
    ogDefault,
  };
}
