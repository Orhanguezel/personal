'use client';

import { useEffect, useState } from 'react';

import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config';
import { BASE_URL } from '@/integrations/apiBase';

type StaticSettingsMap = Record<string, unknown>;

export type StaticSettingRow = {
  key: string;
  locale: string;
  value: unknown;
};

type StaticSettingState = {
  data?: StaticSettingRow;
  isLoading: boolean;
  isError: boolean;
  value?: unknown;
};

const DEFAULT_LOCALE = 'en';
const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);
const localeCache = new Map<string, Promise<StaticSettingsMap>>();
const settingCache = new Map<string, Promise<StaticSettingRow | undefined>>();

function normalizeLocale(input?: string) {
  const raw = String(input || DEFAULT_LOCALE).trim();
  if (!raw) return DEFAULT_LOCALE;
  const base = raw.toLowerCase().split('-')[0] || DEFAULT_LOCALE;
  return LOCALE_SET.has(base) ? base : FALLBACK_LOCALE;
}

async function fetchLocaleMap(locale: string): Promise<StaticSettingsMap> {
  const res = await fetch(`/ui/${locale}.json`, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`Static settings fetch failed: ${res.status}`);
  }

  const json = (await res.json()) as unknown;
  if (!json || typeof json !== 'object') return {};
  return json as StaticSettingsMap;
}

function getLocaleMap(locale: string) {
  if (!localeCache.has(locale)) {
    localeCache.set(locale, fetchLocaleMap(locale));
  }
  return localeCache.get(locale) as Promise<StaticSettingsMap>;
}

function joinApiPath(path: string): string {
  const base = String(BASE_URL || '').replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

async function fetchDbSetting(key: string, locale: string): Promise<StaticSettingRow | undefined> {
  const url = new URL(joinApiPath(`/site_settings/${encodeURIComponent(key)}`), window.location.origin);
  url.searchParams.set('locale', locale);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) return undefined;

  const json = (await res.json()) as Partial<StaticSettingRow> | null;
  if (!json || typeof json !== 'object' || json.value === undefined) return undefined;

  return {
    key: String(json.key || key),
    locale: String(json.locale || locale),
    value: json.value,
  };
}

function getDbSetting(key: string, locale: string) {
  const cacheKey = `${locale}:${key}`;
  if (!settingCache.has(cacheKey)) {
    settingCache.set(cacheKey, fetchDbSetting(key, locale));
  }
  return settingCache.get(cacheKey) as Promise<StaticSettingRow | undefined>;
}

async function loadLocaleMap(locale: string) {
  const normalized = normalizeLocale(locale);

  try {
    const map = await getLocaleMap(normalized);
    return { locale: normalized, map };
  } catch (error) {
    if (normalized !== DEFAULT_LOCALE) {
      const map = await getLocaleMap(DEFAULT_LOCALE);
      return { locale: DEFAULT_LOCALE, map };
    }
    throw error;
  }
}

async function loadSiteSetting(key: string, locale: string): Promise<StaticSettingRow | undefined> {
  const normalized = normalizeLocale(locale);

  try {
    const dbRow = await getDbSetting(key, normalized);
    if (dbRow) return dbRow;
  } catch {
    // Static JSON remains the compatibility fallback when the API is unavailable.
  }

  const { locale: resolvedLocale, map } = await loadLocaleMap(normalized);
  const value = (map as StaticSettingsMap)[key];
  return value === undefined ? undefined : { key, locale: resolvedLocale, value };
}

export function useStaticSiteSetting(args: { key: string; locale?: string }): StaticSettingState {
  const key = String(args.key || '').trim();
  const locale = normalizeLocale(args.locale);

  const [state, setState] = useState<StaticSettingState>({
    data: undefined,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    let cancelled = false;

    if (!key) {
      setState({ data: undefined, isLoading: false, isError: false });
      return undefined;
    }

    setState({ data: undefined, isLoading: true, isError: false });

    loadSiteSetting(key, locale)
      .then((data) => {
        if (cancelled) return;
        setState({ data, isLoading: false, isError: false });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ data: undefined, isLoading: false, isError: true });
      });

    return () => {
      cancelled = true;
    };
  }, [key, locale]);

  return { ...state, value: state.data?.value };
}
