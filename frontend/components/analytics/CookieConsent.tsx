'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'site_cookie_consent_v1';

type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
};

interface MetaPixelFunction {
  (...args: unknown[]): void;
  queue: unknown[][];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    dataLayer?: Object[];
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

function updateGoogleConsent(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    'consent',
    'update',
    {
      analytics_storage: choice.analytics ? 'granted' : 'denied',
      ad_storage: choice.marketing ? 'granted' : 'denied',
      ad_user_data: choice.marketing ? 'granted' : 'denied',
      ad_personalization: choice.marketing ? 'granted' : 'denied',
    },
  ]);
  window.dataLayer.push({
    event: 'consent_update',
    analytics_storage: choice.analytics ? 'granted' : 'denied',
    ad_storage: choice.marketing ? 'granted' : 'denied',
  });
}

function enableMetaPixel(pixelId: string) {
  if (!pixelId || window.fbq) return;
  const fbq = ((...args: unknown[]) => {
    fbq.queue.push(args);
  }) as MetaPixelFunction;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

export default function CookieConsent({
  locale,
  metaPixelId,
}: {
  locale?: string | null;
  metaPixelId?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const saved = JSON.parse(raw) as ConsentChoice;
      const choice = { analytics: saved.analytics === true, marketing: saved.marketing === true };
      updateGoogleConsent(choice);
      if (choice.marketing && metaPixelId) enableMetaPixel(metaPixelId);
    } catch {
      setVisible(true);
    }
  }, [metaPixelId]);

  const save = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(choice))}; Max-Age=15552000; Path=/; SameSite=Lax; Secure`;
    updateGoogleConsent(choice);
    if (choice.marketing && metaPixelId) enableMetaPixel(metaPixelId);
    setVisible(false);
  };

  if (!visible) return null;

  const isTr = locale === 'tr';
  const isDe = locale === 'de';
  const text = isTr
    ? {
        title: 'Çerez tercihleri',
        body: 'Analitik ve pazarlama çerezleri, site performansını ve reklam dönüşümlerini ölçmemize yardımcı olur.',
        reject: 'Yalnızca gerekli',
        accept: 'Tümünü kabul et',
      }
    : isDe
      ? {
          title: 'Cookie-Einstellungen',
          body: 'Analyse- und Marketing-Cookies helfen uns, die Website-Leistung und Werbe-Conversions zu messen.',
          reject: 'Nur notwendige',
          accept: 'Alle akzeptieren',
        }
      : {
          title: 'Cookie preferences',
          body: 'Analytics and marketing cookies help us measure website performance and advertising conversions.',
          reject: 'Necessary only',
          accept: 'Accept all',
        };

  return (
    <aside
      role="dialog"
      aria-label={text.title}
      style={{
        position: 'fixed',
        zIndex: 99999,
        left: 16,
        right: 16,
        bottom: 16,
        maxWidth: 720,
        margin: '0 auto',
        padding: 20,
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,.16)',
        background: '#171821',
        color: '#fff',
        boxShadow: '0 18px 60px rgba(0,0,0,.4)',
      }}
    >
      <strong style={{ display: 'block', fontSize: 18, marginBottom: 6 }}>{text.title}</strong>
      <p style={{ margin: '0 0 16px', color: '#d1d5db', lineHeight: 1.5 }}>{text.body}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-outline-light" onClick={() => save({ analytics: false, marketing: false })}>
          {text.reject}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => save({ analytics: true, marketing: true })}>
          {text.accept}
        </button>
      </div>
    </aside>
  );
}
