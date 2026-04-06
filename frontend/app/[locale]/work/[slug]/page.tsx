// ---------------------------------------------------------------------
// FILE: frontend/app/[locale]/work/[slug]/page.tsx
// Work detail — BreadcrumbJsonLd + CreativeWork schema
// ---------------------------------------------------------------------
import Layout from '@/components/layout/Layout';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import WorkSingleClient from '../_component/WorkSingle.client';
import { getProjectSeoPageBySlug, getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import JsonLd from '@/seo/JsonLd';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { joinUrl, mergeSeoPage, toAbsUrl } from '@/integrations/shared';
import { getProjectsListServer, getProjectDetailServer } from '@/utils/publicLists.server';
import { safeGenerateStaticSlugParams } from '@/utils/safeGenerateStaticSlugParams';
import { creativeWork, graph } from '@/seo/jsonld';
import { getSeoAll } from '@/seo/seo.server';

export async function generateStaticParams() {
  return safeGenerateStaticSlugParams({
    fetchForLocale: (locale) => getProjectsListServer({ locale, limit: 200 }),
  });
}

const BREADCRUMB_LABELS: Record<string, { home: string; work: string }> = {
  de: { home: 'Startseite', work: 'Portfolio' },
  en: { home: 'Home', work: 'Portfolio' },
  tr: { home: 'Anasayfa', work: 'Referanslar' },
};

function workDescription(project: {
  title: string;
  summary?: string | null;
  content?: unknown;
}): string {
  const sum = String(project.summary ?? '').trim();
  if (sum) return sum.length > 5000 ? `${sum.slice(0, 4997)}...` : sum;
  if (project.content && typeof project.content === 'object') {
    const d = (project.content as { description?: string }).description;
    if (typeof d === 'string' && d.trim()) return d.length > 5000 ? `${d.slice(0, 4997)}...` : d;
  }
  return project.title;
}

export default async function WorkSinglePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const safeLocale = normalizeLocaleParam(p?.locale);
  const slug = String(p?.slug ?? '').trim();

  const [project, seoAll] = await Promise.all([
    getProjectDetailServer({ locale: safeLocale, slug }),
    getSeoAll({ routeLocale: safeLocale }),
  ]);

  const canonicalBase = seoAll.defaults.canonicalBase;
  const founderId = `${canonicalBase}/#founder`;
  const labels = BREADCRUMB_LABELS[safeLocale] ?? BREADCRUMB_LABELS.en;

  const pageUrl = joinUrl(canonicalBase, `/${safeLocale}/work/${encodeURIComponent(slug)}`);
  const rawCover = project?.featured_image?.trim();
  const fallbackWork = '/assets/imgs/work/img-background.png';
  const absCover =
    rawCover && rawCover !== fallbackWork ? toAbsUrl(canonicalBase, rawCover) : undefined;

  const datePub = project?.start_date || project?.created_at;

  const creativeWorkJsonLd = project
    ? graph([
        creativeWork({
          name: project.title,
          description: workDescription(project),
          url: pageUrl,
          image: absCover,
          datePublished: typeof datePub === 'string' ? datePub : undefined,
          creatorId: founderId,
        }),
      ])
    : null;

  const crumbTitle = project?.title?.trim() || slug;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `/${safeLocale}` },
          { name: labels.work, url: `/${safeLocale}/work` },
          { name: crumbTitle, url: pageUrl },
        ]}
      />
      {creativeWorkJsonLd && <JsonLd data={creativeWorkJsonLd} id="creative-work" />}
      <WorkSingleClient locale={safeLocale} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const slug = String(p?.slug ?? '').trim();

  const [{ all, page }, contentSeo] = await Promise.all([
    getSeoPage(SEO_PAGE_KEYS.workDetail, { routeLocale: locale }),
    getProjectSeoPageBySlug(slug),
  ]);

  const merged = mergeSeoPage(page, contentSeo);

  return buildMetadata({
    seo: all,
    page: merged,
    canonicalPath: `/${locale}/work/${slug}`,
    ogType: 'article',
  });
}
