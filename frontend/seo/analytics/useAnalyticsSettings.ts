// =============================================================
// FILE: src/features/analytics/useAnalyticsSettings.ts
// FINAL — Analytics settings from DB (single-locale TR) + env fallback
// - No locale hook dependency (project is single-language)
// - DB overrides env; env is fallback
// - Robust against null/undefined/"null"/"undefined"
// =============================================================
'use client';

import { useMemo } from 'react';
import { useGetSiteSettingByKeyQuery } from '@/integrations/hooks';

function coerceId(v: unknown): string {
  const s = String(v ?? '').trim();
  if (!s || s === 'null' || s === 'undefined') return '';
  return s;
}

type SettingResp = { key?: string; value?: unknown } | undefined;

export function useAnalyticsSettings() {
  // ✅ single locale
  const locale = 'tr';

  // ✅ consistent arg shape (single-locale: no locale param)
  const gaArg = useMemo(() => ({ key: 'ga4_measurement_id' }) as const, []);
  const gtmArg = useMemo(() => ({ key: 'gtm_container_id' }) as const, []);

  const {
    data: ga,
    isLoading: gaLoading,
    isFetching: gaFetching,
  } = useGetSiteSettingByKeyQuery(gaArg as any, {
    refetchOnMountOrArgChange: true,
  }) as { data?: SettingResp; isLoading: boolean; isFetching: boolean };

  const {
    data: gtm,
    isLoading: gtmLoading,
    isFetching: gtmFetching,
  } = useGetSiteSettingByKeyQuery(gtmArg as any, {
    refetchOnMountOrArgChange: true,
  }) as { data?: SettingResp; isLoading: boolean; isFetching: boolean };

  const ga4Id = useMemo(() => {
    const db = coerceId((ga as any)?.value);
    const env = coerceId(process.env.NEXT_PUBLIC_GA_ID);
    return db || env;
  }, [ga]);

  const gtmId = useMemo(() => {
    const db = coerceId((gtm as any)?.value);
    const env = coerceId(process.env.NEXT_PUBLIC_GTM_ID);
    return db || env;
  }, [gtm]);

  const isLoading = gaLoading || gtmLoading || gaFetching || gtmFetching;

  return { locale, ga4Id, gtmId, isLoading };
}
