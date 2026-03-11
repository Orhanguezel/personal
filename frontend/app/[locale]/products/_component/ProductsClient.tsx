'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProductDto } from '@/integrations/shared/products.types';
import { formatPrice } from '@/integrations/shared/products.types';
import { useListProductsPublicQuery } from '@/integrations/hooks';

const CATEGORIES = [
  { key: '', label: 'Alle' },
  { key: 'emlak', label: 'Immobilien' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'erp', label: 'ERP' },
  { key: 'landing', label: 'Landing Page' },
];

const FALLBACK_IMAGES = [
  '/assets/imgs/work/img-1.png',
  '/assets/imgs/work/img-2.png',
  '/assets/imgs/work/img-3.png',
  '/assets/imgs/work/img-4.png',
];

export default function ProductsClient({
  locale,
  initialItems = [],
}: {
  locale: string;
  initialItems?: ProductDto[];
}) {
  const [activeCategory, setActiveCategory] = useState('');

  const { data, isLoading, isFetching } = useListProductsPublicQuery({
    locale,
    default_locale: locale,
    limit: 100,
    order: 'display_order.asc',
    category: activeCategory || undefined,
  });

  const items = useMemo(() => {
    const list = Array.isArray(data) && data.length > 0 ? data : initialItems;
    if (activeCategory) {
      return list.filter((p) => p.category === activeCategory);
    }
    return list;
  }, [data, initialItems, activeCategory]);

  return (
    <section className="section-products pt-120 pb-150">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="btn btn-tag wow fadeInUp">Site Pakete</span>
          <h3 className="ds-3 mt-3 mb-4 text-dark fw-bold">
            Fertige Website-Pakete
          </h3>
          <p className="fs-5 text-300 mb-5">
            Professionelle, sofort einsatzbereite Website-Loesungen fuer Ihr Geschaeft
          </p>
        </div>

        {/* Category Filter */}
        <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`btn ${activeCategory === cat.key ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-4`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <div className="row g-4">
            {items.map((product, idx) => {
              const href = `/${locale}/products/${product.slug}`;
              const imgSrc = product.cover_image_url || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
              const priceOnetime = formatPrice(product.price_onetime, product.currency);
              const priceMonthly = formatPrice(product.price_monthly, product.currency);

              return (
                <div key={product.id} className="col-lg-4 col-md-6">
                  <div className="card border-0 shadow-sm h-100 card-hover">
                    <Link href={href}>
                      <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                        <Image
                          src={imgSrc}
                          alt={product.title || ''}
                          fill
                          className="object-fit-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {product.is_featured === 1 && (
                          <span className="badge bg-warning position-absolute top-0 end-0 m-3">
                            Featured
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <span className="badge bg-light text-dark mb-2 align-self-start">
                        {product.category}
                      </span>
                      <Link href={href} className="text-decoration-none">
                        <h5 className="card-title fw-bold text-dark">{product.title}</h5>
                      </Link>
                      {product.subtitle && (
                        <p className="text-muted small mb-3">{product.subtitle}</p>
                      )}

                      {/* Tech Stack */}
                      {product.tech_stack && product.tech_stack.length > 0 && (
                        <div className="mb-3">
                          {product.tech_stack.slice(0, 4).map((tech) => (
                            <span key={tech} className="badge bg-soft-primary text-primary me-1 mb-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto">
                        {/* Pricing */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                          {priceOnetime && (
                            <div>
                              <small className="text-muted d-block">Einmalig</small>
                              <strong className="text-primary fs-5">{priceOnetime}</strong>
                            </div>
                          )}
                          {priceMonthly && (
                            <div>
                              <small className="text-muted d-block">Monatlich</small>
                              <strong className="text-success fs-5">{priceMonthly}/mo</strong>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="d-flex gap-2">
                          <Link href={href} className="btn btn-primary btn-sm flex-grow-1">
                            Details
                          </Link>
                          {product.demo_url && (
                            <a
                              href={product.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-secondary btn-sm"
                            >
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">Keine Pakete gefunden</h4>
            <p className="text-300">Bitte versuchen Sie eine andere Kategorie.</p>
          </div>
        )}
      </div>
    </section>
  );
}
