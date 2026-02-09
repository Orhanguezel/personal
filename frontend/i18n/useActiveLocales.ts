// =============================================================
// FILE: src/i18n/useActiveLocales.ts
// FINAL — client hook (cached) to read active locales + default locale
// - Client-only (no next/headers)
// - Fetch: settingsApi.client
// - Unwrap: settingsApi.shared
// - TTL cache (60s) + cancellation guard
// =============================================================

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FALLBACK_LOCALE } from '@/i18n/config';
import { normLocaleTag, normalizeLocales, resolveDefaultLocale } from '@/i18n/localeUtils';
import { unwrapData } from '@/i18n/settingsApi.shared';
import { fetchAppLocalesRawClient, fetchDefaultLocaleRawClient } from '@/i18n/settingsApi.client';

let __cache: { at: number; appRaw: any; defRaw: any } | null = null;
const TTL_MS = 60_000;

export function useActiveLocales() {
  const [appRaw, setAppRaw] = useState<any>(() =>
    __cache && Date.now() - __cache.at < TTL_MS ? __cache.appRaw : null,
  );
  const [defRaw, setDefRaw] = useState<any>(() =>
    __cache && Date.now() - __cache.at < TTL_MS ? __cache.defRaw : null,
  );

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    // cache yoksa ilk render’da loading true olsun
    if (!__cache) return true;
    return Date.now() - __cache.at >= TTL_MS;
  });

  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    // cache validse hiç fetch yapma
    if (__cache && Date.now() - __cache.at < TTL_MS) {
      setAppRaw(__cache.appRaw);
      setDefRaw(__cache.defRaw);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    setIsLoading(true);

    (async () => {
      const [a, d] = await Promise.all([fetchAppLocalesRawClient(), fetchDefaultLocaleRawClient()]);

      if (cancelled) return;

      __cache = { at: Date.now(), appRaw: a, defRaw: d };

      setAppRaw(a);
      setDefRaw(d);
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const { locales, defaultLocale } = useMemo(() => {
    const appValue = unwrapData(appRaw);
    const defValue = unwrapData(defRaw);

    const active = normalizeLocales(appValue);
    const fb = normLocaleTag(FALLBACK_LOCALE) || 'de';

    const def = resolveDefaultLocale(defValue, appValue) || normLocaleTag(active[0]) || fb;

    return {
      locales: active.length ? active : [fb],
      defaultLocale: def || fb,
    };
  }, [appRaw, defRaw]);

  return { locales, defaultLocale, isLoading };
}
