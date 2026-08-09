import { notFound } from 'next/navigation';

import Layout from '@/components/layout/Layout';
import { BASE_URL } from '@/integrations/apiBase';
import type { CustomPageView } from '@/integrations/shared';
import { extractHtmlFromPost, normalizeCustomPage, sanitizeBlogHtml } from '@/integrations/shared';

export async function getCustomContentPage(
  moduleKey: 'legal' | 'corporate',
  slug: string,
  locale: string,
): Promise<CustomPageView | null> {
  const url = new URL(
    `${BASE_URL}/custom-pages/by-module/${encodeURIComponent(moduleKey)}/${encodeURIComponent(slug)}`,
  );
  url.searchParams.set('locale', locale);
  const res = await fetch(url, { next: { revalidate: 60 }, headers: { Accept: 'application/json' } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Custom page fetch failed: ${res.status}`);
  return normalizeCustomPage(await res.json());
}

export async function CustomContentPage({
  moduleKey,
  slug,
  locale,
}: {
  moduleKey: 'legal' | 'corporate';
  slug: string;
  locale: string;
}) {
  const page = await getCustomContentPage(moduleKey, slug, locale);
  if (!page) notFound();

  const summary = page.excerpt || page.summary || '';
  const html = sanitizeBlogHtml(extractHtmlFromPost(page));

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <section className="section-details pt-130 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-lg-auto">
              <div className="text-center mb-6">
                <h1 className="ds-3 mt-3 mb-3 text-dark">{page.title}</h1>
                {summary ? <p className="text-300 fs-5 mb-0">{summary}</p> : null}
              </div>
              <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
