// =============================================================
// FILE: src/seo/scripts.tsx
// FINAL — Global scripts loader (SiteSettings)
// - GA (gtag), GTM, Meta Pixel (opsiyonel)
// - cache: no-store (admin panel değişiklikleri anında)
// =============================================================

import React from 'react';
import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import CookieConsent from '@/components/analytics/CookieConsent';

import { getAnalyticsConfig } from './seo.server';

export async function GlobalScripts({ locale }: { locale?: string | null } = {}) {
  // locale GECILMELI — bkz. seo.server.ts getSiteJsonLdGraph notu:
  // routeLocale yoksa cozumleyici cookies()/headers() kullaniyor ve statik
  // render'da bailout uretiyor.
  const a = await getAnalyticsConfig({ routeLocale: locale ?? null });

  const GA_ID = a.gaId || '';
  const GTM_ID = a.gtmId || '';
  const META_PIXEL_ID = a.metaPixelId || '';

  return (
    <>
      {/* dataLayer — GTM/GA4 ve custom event'ler için (her zaman) */}
      <Script id="data-layer-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>

      {/* Consent Mode v2 defaults (GDPR) — update after cookie banner grants */}
      {GA_ID || GTM_ID ? (
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
      ) : null}

      {/* GTM varsa GA4 etiketi container tarafindan yonetilir; cift page_view yukleme. */}
      {!GTM_ID && GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}

      {/* Google Tag Manager */}
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}

      {/* Meta Pixel yalnızca pazarlama onayından sonra CookieConsent tarafından yüklenir. */}
      <CookieConsent locale={locale} metaPixelId={META_PIXEL_ID} />
    </>
  );
}
