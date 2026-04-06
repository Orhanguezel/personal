// =============================================================
// FILE: src/seo/scripts.tsx
// FINAL — Global scripts loader (SiteSettings)
// - GA (gtag), GTM, Meta Pixel (opsiyonel)
// - cache: no-store (admin panel değişiklikleri anında)
// =============================================================

import React from 'react';
import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { getAnalyticsConfig } from './seo.server';

export async function GlobalScripts() {
  const a = await getAnalyticsConfig();

  const GA_ID = a.gaId || '';
  const GTM_ID = a.gtmId || '';
  const META_PIXEL_ID = a.metaPixelId || '';

  return (
    <>
      {/* dataLayer — GTM/GA4 ve custom event'ler için (her zaman) */}
      <Script id="data-layer-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>

      {/* Consent Mode v2 defaults (GDPR) — update after cookie banner grants */}
      {GA_ID || GTM_ID ? (
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
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

      {/* Google Analytics (gtag) */}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}

      {/* Google Tag Manager */}
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}

      {/* Meta Pixel (low priority) */}
      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="lazyOnload">

          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
