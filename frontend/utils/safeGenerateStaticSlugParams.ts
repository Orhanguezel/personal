/**
 * Build-time static paths from API. If the backend is down (CI, local `next build` without API),
 * return [] so the build still succeeds; pages remain available via dynamic rendering when the API is up.
 */
export async function safeGenerateStaticSlugParams(options: {
  fetchForLocale: (locale: string) => Promise<Array<{ slug?: string | null }>>;
}): Promise<{ locale: string; slug: string }[]> {
  const locales = ['de', 'en', 'tr'] as const;
  const out: { locale: string; slug: string }[] = [];
  try {
    for (const locale of locales) {
      const rows = await options.fetchForLocale(locale);
      for (const row of rows) {
        const slug = String(row.slug || '').trim();
        if (slug) out.push({ locale, slug });
      }
    }
  } catch {
    return [];
  }
  return out;
}
