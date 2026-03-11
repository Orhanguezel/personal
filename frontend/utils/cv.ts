const CV_BY_LOCALE: Record<string, string> = {
  tr: '/cv/tr',
  en: '/cv/en',
  de: '/cv/de',
};

export function getCvAssetPath(locale?: string | null): string {
  const normalized = String(locale || '')
    .trim()
    .toLowerCase()
    .slice(0, 2);

  return CV_BY_LOCALE[normalized] || CV_BY_LOCALE.en;
}
