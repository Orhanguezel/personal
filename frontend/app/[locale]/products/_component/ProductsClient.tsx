import Link from 'next/link';
import Image from 'next/image';
import type { ProductDto } from '@/integrations/shared/products.types';
import { localizePath } from '@/i18n/routes';

const COPY = {
  tr: {
    badge: 'SaaS Ürünleri',
    title: 'İşinizi büyüten dijital ürünler',
    intro: 'Otomasyon, veri analizi ve yapay zekâ odaklı platformlarımızı keşfedin.',
    details: 'Ürünü incele',
    demo: 'Canlı demo',
    featured: 'Öne çıkan',
    empty: 'Henüz yayınlanmış bir SaaS ürünü bulunmuyor.',
  },
  de: {
    badge: 'SaaS-Produkte',
    title: 'Digitale Produkte für Ihr Wachstum',
    intro: 'Entdecken Sie unsere Plattformen für Automatisierung, Datenanalyse und KI.',
    details: 'Produkt ansehen',
    demo: 'Live-Demo',
    featured: 'Empfohlen',
    empty: 'Derzeit sind keine SaaS-Produkte veröffentlicht.',
  },
  en: {
    badge: 'SaaS Products',
    title: 'Digital products built for growth',
    intro: 'Explore our platforms for automation, data analysis, and artificial intelligence.',
    details: 'View product',
    demo: 'Live demo',
    featured: 'Featured',
    empty: 'There are no published SaaS products yet.',
  },
} as const;

export default function ProductsClient({
  locale,
  initialItems = [],
}: {
  locale: string;
  initialItems?: ProductDto[];
}) {
  const baseLocale = locale.startsWith('tr') ? 'tr' : locale.startsWith('de') ? 'de' : 'en';
  const copy = COPY[baseLocale];
  const items = initialItems.filter((product) => product.slug && product.status === 'active');

  return (
    <section className="section-products pt-120 pb-150">
      <div className="container">
        <div className="text-center mb-8">
          <span className="btn btn-tag fadeInUp">{copy.badge}</span>
          <h1 className="ds-3 mt-3 mb-4 text-dark fw-bold">{copy.title}</h1>
          <p className="fs-5 text-300 mb-0 mx-auto" style={{ maxWidth: '720px' }}>
            {copy.intro}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="row g-4">
            {items.map((product, idx) => {
              const href = `/${locale}${localizePath(locale, `/products/${product.slug}`)}`;
              const imgSrc = product.cover_image_url || `/assets/imgs/work/img-${(idx % 4) + 1}.webp`;

              return (
                <div key={product.id} className="col-lg-4 col-md-6">
                  <article className="card border-0 shadow-sm h-100 card-hover overflow-hidden">
                    <Link href={href} className="position-relative d-block" style={{ height: '240px' }}>
                      <Image
                        src={imgSrc}
                        alt={product.title || copy.badge}
                        fill
                        className="object-fit-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.is_featured === 1 && (
                        <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3">
                          {copy.featured}
                        </span>
                      )}
                    </Link>
                    <div className="card-body d-flex flex-column p-4">
                      <span className="text-uppercase text-primary-1 fs-7 fw-semibold mb-2">
                        {product.category}
                      </span>
                      <Link href={href} className="text-decoration-none">
                        <h2 className="h4 fw-bold text-dark mb-3">{product.title}</h2>
                      </Link>
                      <p className="text-300 mb-4">{product.description || product.subtitle}</p>

                      {product.tags && product.tags.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mb-4">
                          {product.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="badge bg-light text-dark border">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="d-flex flex-wrap gap-2 mt-auto">
                        <Link href={href} className="btn btn-primary flex-grow-1 justify-content-center">
                          {copy.details} <i className="ri-arrow-right-line" />
                        </Link>
                        {product.demo_url && (
                          <a
                            href={product.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-secondary"
                          >
                            {copy.demo}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-300 py-5">{copy.empty}</p>
        )}
      </div>
    </section>
  );
}
