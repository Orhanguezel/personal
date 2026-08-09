// =============================================================
// FILE: app/[locale]/services/[slug]/_components/RelatedProjects.tsx
//
// HIZMET -> O KATEGORIDE TAMAMLANAN PROJELER
//
// Kavram ayrimi (karismasin diye):
//   HIZMET  = satisa sunulan is ("Kurumsal web sitesi")
//   PROJE   = o isin kimin icin yapildigi ("Vista Insaat kurumsal sitesi")
//   KATEGORI= ikisini baglayan ortak sinif (services.type == projects.category)
//
// Bu bolum SUNUCU bileseni: icerik SSR ciktisinda yer alir, dolayisiyla arama
// motorlari ve yapay zeka tarayicilari hizmet ile referanslar arasindaki bagi
// gorur. Hizmet sayfasi boylece "iddia" degil "kanit" tasir.
// =============================================================

import Image from 'next/image';
import Link from 'next/link';

import { localizedSegment } from '@/i18n/routes';
import { getProjectsListServer } from '@/utils/publicLists.server';
import { getCategoryLabel } from '@/utils/contentCategories.server';
import { getStaticSiteSettingValue } from '@/utils/staticSiteSettings.server';
import { shouldUnoptimizeImage } from '@/utils/nextImage';

/** Basliklar once ayardan; yoksa dile gore notr karsilik (marka icermez). */
const FALLBACK_TITLE: Record<string, string> = {
  tr: 'Bu kategoride tamamladığımız projeler',
  en: 'Projects we completed in this category',
  de: 'Projekte, die wir in dieser Kategorie umgesetzt haben',
};
const FALLBACK_ALL: Record<string, string> = {
  tr: 'Tüm referanslar',
  en: 'All references',
  de: 'Alle Referenzen',
};

function pickText(value: unknown, path: string[]): string | null {
  let cur: unknown = value;
  if (typeof cur === 'string') {
    try {
      cur = JSON.parse(cur);
    } catch {
      return null;
    }
  }
  for (const key of path) {
    if (!cur || typeof cur !== 'object') return null;
    cur = (cur as Record<string, unknown>)[key];
  }
  const text = typeof cur === 'string' ? cur.trim() : '';
  return text || null;
}

export default async function RelatedProjects({
  locale,
  category,
  currentServiceSlug,
  currentServiceName,
}: {
  locale: string;
  category?: string | null;
  currentServiceSlug?: string | null;
  currentServiceName?: string | null;
}) {
  const slug = String(category ?? '').trim();
  const serviceSlug = String(currentServiceSlug ?? '').trim();
  if (!slug) return null;

  const [projects, categoryLabel, uiServices] = await Promise.all([
    getProjectsListServer({ locale, category: slug, limit: 100 }),
    getCategoryLabel(locale, slug),
    getStaticSiteSettingValue('ui_services', locale),
  ]);

  const exactProjects = serviceSlug
    ? projects.filter((project) =>
        Array.isArray((project as { services?: string[] }).services) &&
        (project as { services: string[] }).services.includes(serviceSlug),
      )
    : [];
  const matchingProjects = (exactProjects.length ? exactProjects : projects).slice(0, 6);
  if (!matchingProjects.length) return null;

  const title =
    pickText(uiServices, ['detail', 'related_projects_title']) ??
    FALLBACK_TITLE[locale] ??
    FALLBACK_TITLE.en;
  const allLabel =
    pickText(uiServices, ['detail', 'related_projects_all']) ??
    FALLBACK_ALL[locale] ??
    FALLBACK_ALL.en;

  const workPath = `/${locale}/${localizedSegment(locale, 'work')}`;

  return (
    <section className="section-related-projects pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-lg-auto">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <h2 className="fs-4 mb-1">{title}</h2>
                {categoryLabel ? (
                  <p className="text-300 fs-6 mb-0">
                    {categoryLabel}
                    {currentServiceName ? ` · ${currentServiceName}` : ''}
                  </p>
                ) : null}
              </div>
              <Link className="btn btn-outline-secondary btn-sm" href={workPath}>
                {allLabel}
              </Link>
            </div>

            <div className="row g-4">
              {matchingProjects.map((p) => {
                const image = (p as { featured_image?: string | null }).featured_image ?? '';
                const href = `${workPath}/${(p as { slug?: string }).slug ?? ''}`;
                return (
                  <div className="col-md-6 col-lg-4" key={(p as { id: string }).id}>
                    <Link href={href} className="card h-100 text-decoration-none">
                      {image ? (
                        <Image
                          src={image}
                          alt={(p as { title?: string }).title ?? ''}
                          width={480}
                          height={300}
                          className="card-img-top"
                          unoptimized={shouldUnoptimizeImage(image)}
                        />
                      ) : null}
                      <div className="card-body">
                        <h3 className="fs-6 mb-2">{(p as { title?: string }).title ?? ''}</h3>
                        <p className="text-300 fs-7 mb-0">
                          {(p as { summary?: string | null }).summary ?? ''}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
