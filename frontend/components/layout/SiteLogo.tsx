// =============================================================
// FILE: src/layout/SiteLogo.tsx
// FINAL — Dynamic Site Logo (SINGLE LOCALE) + SSR-safe optimizer decision
// - Reads: site_logo / site_logo_dark / site_logo_light from site_settings
// - Robust value parsing: object | JSON-string | plain string url  (via common.ts)
// - ✅ No window usage (SSR-safe) for unoptimized decision
// - ✅ Adds stable class to enforce aspect-ratio via CSS (no inline styles)
// - ✅ Never renders src="" (always fallback)
// =============================================================

'use client';

import * as React from 'react';
import Image, { type StaticImageData } from 'next/image';

import { useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import type { SettingValue } from '@/integrations/shared';

import {
  cx,
  trimStr,
  parseSiteLogoMedia,
  shouldBypassNextImageOptimizer,
} from '@/integrations/shared';
import { SITE_MEDIA_KEYS, SITE_MEDIA_FALLBACKS } from './siteAssets';

type Variant = 'default' | 'dark' | 'light';

export type SiteLogoProps = {
  variant?: Variant;
  overrideSrc?: StaticImageData | string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const FALLBACK_URL = SITE_MEDIA_FALLBACKS.logo;

const DEFAULT_W = 160;
const DEFAULT_H = 60;

const variantKeyMap: Record<Variant, string> = {
  default: SITE_MEDIA_KEYS.logo,
  dark: SITE_MEDIA_KEYS.logoDark,
  light: SITE_MEDIA_KEYS.logoLight,
};

const SiteLogo: React.FC<SiteLogoProps> = ({
  variant = 'default',
  overrideSrc,
  alt,
  className,
  priority = true,
  sizes,
}) => {
  const key = variantKeyMap[variant];

  const { data: setting } = useGetSiteSettingByKeyQuery(key, {
    refetchOnMountOrArgChange: true,
  });

  const media = React.useMemo(
    () => parseSiteLogoMedia((setting?.value as SettingValue) ?? null),
    [setting?.value],
  );

  const resolved = React.useMemo(() => {
    let finalSrc: StaticImageData | string = FALLBACK_URL;
    let finalW = DEFAULT_W;
    let finalH = DEFAULT_H;

    if (overrideSrc) {
      if (typeof overrideSrc === 'string') {
        finalSrc = trimStr(overrideSrc) || FALLBACK_URL;
      } else {
        finalSrc = overrideSrc;
        finalW = overrideSrc.width ?? DEFAULT_W;
        finalH = overrideSrc.height ?? DEFAULT_H;
      }
    } else {
      finalSrc = trimStr(media.url) || FALLBACK_URL;
      finalW = media.width || DEFAULT_W;
      finalH = media.height || DEFAULT_H;
    }

    const finalAlt =
      trimStr(alt) ||
      trimStr(media.alt) ||
      SITE_MEDIA_FALLBACKS.brandName ||
      'Site Logo';
    const finalSizes = trimStr(sizes) || '(max-width: 992px) 120px, 160px';

    return { finalSrc, finalW, finalH, finalAlt, finalSizes };
  }, [overrideSrc, media.url, media.width, media.height, media.alt, alt, sizes]);

  const unoptimized = shouldBypassNextImageOptimizer(resolved.finalSrc);

  // stable class for CSS-based aspect-ratio fixes
  const imgClassName = cx('site-logo-img', className);

  return (
    <Image
      src={resolved.finalSrc}
      alt={resolved.finalAlt}
      width={resolved.finalW}
      height={resolved.finalH}
      className={imgClassName}
      sizes={resolved.finalSizes}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
};

SiteLogo.displayName = 'SiteLogo';
export default SiteLogo;
