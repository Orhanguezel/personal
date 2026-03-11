import { readFile } from 'fs/promises';
import path from 'path';

type StaticSettingsMap = Record<string, unknown>;

const DEFAULT_LOCALE = 'en';
const localeCache = new Map<string, StaticSettingsMap>();

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

  const { map } = await getStaticSettingsMap(locale);
  return (map as StaticSettingsMap)[normalizedKey];
}
