// =============================================================
// FILE: app/[locale]/work/[slug]/_components/RelatedServices.tsx
//
// PROJE -> O KATEGORIDEKI HIZMETLERIMIZ
//
// RelatedProjects'in tersi. Iki bolum birlikte kavram ayrimini gorunur kilar:
//   PROJE   = yapilmis is (kanit)      -> hizmet sayfasinda listelenir
//   HIZMET  = satilan is (teklif)      -> proje sayfasinda listelenir
//   KATEGORI= ikisini baglayan sinif   (projects.category == services.type)
//
// Ayrica proje kaydindaki `services` alani ile karistirilmamalidir: orada
// projede teslim edilen is kalemleri yazar ("Frontend Gelistirme"), hizmet
// katalogu degil.
// =============================================================

import Link from 'next/link';

import { localizedSegment } from '@/i18n/routes';
import { getServicesListServer } from '@/utils/publicLists.server';
import { getCategoryLabel } from '@/utils/contentCategories.server';

const FALLBACK_TITLE: Record<string, string> = {
  tr: 'Bu kategoride verdiğimiz hizmetler',
  en: 'Services we offer in this category',
  de: 'Leistungen in dieser Kategorie',
};

export default async function RelatedServices({
  locale,
  category,
}: {
  locale: string;
  category?: string | null;
}) {
  const slug = String(category ?? '').trim();
  if (!slug) return null;

  const [services, categoryLabel] = await Promise.all([
    getServicesListServer({ locale, limit: 100 }),
    getCategoryLabel(locale, slug),
  ]);

  const matching = services
    .filter((s) => String((s as { type?: string }).type ?? '').trim() === slug)
    .slice(0, 6);
  if (!matching.length) return null;

  const base = `/${locale}/${localizedSegment(locale, 'services')}`;
  const title = FALLBACK_TITLE[locale] ?? FALLBACK_TITLE.en;

  return (
    <section className="section-related-services pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-lg-auto">
            <h2 className="fs-4 mb-1">{title}</h2>
            {categoryLabel ? <p className="text-300 fs-6 mb-4">{categoryLabel}</p> : null}

            <div className="row g-3">
              {matching.map((s) => {
                const item = s as {
                  id: string;
                  slug?: string;
                  name?: string;
                  summary?: string | null;
                };
                return (
                  <div className="col-md-6" key={item.id}>
                    <Link
                      href={`${base}/${item.slug ?? ''}`}
                      className="d-block border-linear-3 rounded-3 p-4 text-decoration-none h-100"
                    >
                      <h3 className="fs-6 mb-2">{item.name ?? ''}</h3>
                      <p className="text-300 fs-7 mb-0">{item.summary ?? ''}</p>
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
