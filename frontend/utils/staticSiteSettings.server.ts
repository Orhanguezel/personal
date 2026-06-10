import { readFile } from 'fs/promises';
import path from 'path';

import { BASE_URL } from '@/integrations/apiBase';

type StaticSettingsMap = Record<string, unknown>;

const DEFAULT_LOCALE = 'en';
const localeCache = new Map<string, StaticSettingsMap>();
const settingCache = new Map<string, unknown>();

function normalizeLocale(input?: string) {
  const raw = String(input || DEFAULT_LOCALE).trim();
  if (!raw) return DEFAULT_LOCALE;
  const base = raw.toLowerCase().split('-')[0];
  return base || DEFAULT_LOCALE;
}

async function readLocaleFile(locale: string): Promise<StaticSettingsMap> {
  const filePath = path.join(process.cwd(), 'public', 'ui', `${locale}.json`);
  const raw = await readFile(filePath, 'utf-8');
  const json = JSON.parse(raw) as StaticSettingsMap;
  return json && typeof json === 'object' ? json : {};
}

function canFetchApiOnServer() {
  return /^https?:\/\//i.test(String(BASE_URL || ''));
}

function buildApiUrl(key: string, locale: string) {
  const base = String(BASE_URL || '').replace(/\/+$/, '');
  const url = new URL(`${base}/site_settings/${encodeURIComponent(key)}`);
  url.searchParams.set('locale', locale);
  return url.toString();
}

async function getDbSiteSettingValue(key: string, locale: string): Promise<unknown> {
  if (!canFetchApiOnServer()) return undefined;

  const cacheKey = `${locale}:${key}`;
  if (settingCache.has(cacheKey)) return settingCache.get(cacheKey);

  try {
    const res = await fetch(buildApiUrl(key, locale), {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) return undefined;

    const json = (await res.json()) as { value?: unknown } | null;
    const value = json && typeof json === 'object' ? json.value : undefined;
    if (value !== undefined) settingCache.set(cacheKey, value);
    return value;
  } catch {
    return undefined;
  }
}


export async function getStaticSettingsMap(locale?: string): Promise<{ locale: string; map: StaticSettingsMap }> {
  const normalized = normalizeLocale(locale);

  if (localeCache.has(normalized)) {
    return { locale: normalized, map: localeCache.get(normalized) as StaticSettingsMap };
  }

  try {
    const map = await readLocaleFile(normalized);
    localeCache.set(normalized, map);
    return { locale: normalized, map };
  } catch (error) {
    if (normalized !== DEFAULT_LOCALE) {
      if (localeCache.has(DEFAULT_LOCALE)) {
        return { locale: DEFAULT_LOCALE, map: localeCache.get(DEFAULT_LOCALE) as StaticSettingsMap };
      }
      const map = await readLocaleFile(DEFAULT_LOCALE);
      localeCache.set(DEFAULT_LOCALE, map);
      return { locale: DEFAULT_LOCALE, map };
    }
    throw error;
  }
}

export async function getStaticSiteSettingValue(key: string, locale?: string): Promise<unknown> {
  const normalizedKey = String(key || '').trim();
  if (!normalizedKey) return undefined;
  const normalizedLocale = normalizeLocale(locale);

  const dbValue = await getDbSiteSettingValue(normalizedKey, normalizedLocale);
  if (dbValue !== undefined) return dbValue;

  const { map } = await getStaticSettingsMap(normalizedLocale);
  return (map as StaticSettingsMap)[normalizedKey];
}
