import { BASE_URL } from '@/integrations/apiBase';
import { asText, joinApi } from '@/integrations/shared';

const PUBLIC_LOCALES = ['tr', 'en', 'de'] as const;

export type PublicLocale = (typeof PUBLIC_LOCALES)[number];
export type LocalizedSlugs = Partial<Record<PublicLocale, string>>;

/** Resolve locale-specific resource slugs through the shared DB row id. */
export async function getResourceLocalizedSlugsBySlug(args: {
  resource: 'services' | 'products' | 'projects';
  slug: string;
  locale: string;
}): Promise<LocalizedSlugs> {
  const detailUrl = new URL(
    joinApi(BASE_URL, `/${args.resource}/by-slug/${encodeURIComponent(args.slug)}`),
  );
  detailUrl.searchParams.set('locale', args.locale);
  detailUrl.searchParams.set('default_locale', args.locale);

  const detailRes = await fetch(detailUrl.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  });
  if (!detailRes.ok) return {};
  const detail = (await detailRes.json()) as unknown;
  const id = detail && typeof detail === 'object' ? asText((detail as any).id) : '';
  if (!id) return {};

  const entries = await Promise.all(
    PUBLIC_LOCALES.map(async (targetLocale) => {
      const listUrl = new URL(joinApi(BASE_URL, `/${args.resource}`));
      listUrl.searchParams.set('locale', targetLocale);
      listUrl.searchParams.set('default_locale', targetLocale);
      listUrl.searchParams.set('limit', '100');

      const listRes = await fetch(listUrl.toString(), {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      });
      if (!listRes.ok) return null;
      const rows = (await listRes.json()) as unknown;
      if (!Array.isArray(rows)) return null;
      const sibling = rows.find(
        (row) => row && typeof row === 'object' && asText((row as any).id) === id,
      );
      const siblingSlug =
        sibling && typeof sibling === 'object' ? asText((sibling as any).slug) : '';
      return siblingSlug ? ([targetLocale, siblingSlug] as const) : null;
    }),
  );

  return Object.fromEntries(
    entries.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
  );
}
