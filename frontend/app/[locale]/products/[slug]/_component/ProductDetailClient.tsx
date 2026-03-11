'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProductDto } from '@/integrations/shared/products.types';
import { formatPrice } from '@/integrations/shared/products.types';

type PaymentType = 'onetime' | 'subscription';

export default function ProductDetailClient({
  locale,
  product,
}: {
  locale: string;
  product: ProductDto;
}) {
  const [paymentType, setPaymentType] = useState<PaymentType>(
    product.price_onetime ? 'onetime' : 'subscription',
  );

  const priceOnetime = formatPrice(product.price_onetime, product.currency);
  const priceMonthly = formatPrice(product.price_monthly, product.currency);
  const features = product.features ?? [];
  const techStack = product.tech_stack ?? [];
  const gallery = product.gallery ?? [];

  const checkoutHref = `/${locale}/checkout?product=${product.id}&type=${paymentType}`;

  return (
    <section className="pt-120 pb-150">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href={`/${locale}`}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/${locale}/products`}>Pakete</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Left: Image + Gallery */}
          <div className="col-lg-7">
            {product.cover_image_url && (
              <div className="position-relative rounded overflow-hidden mb-4" style={{ height: '400px' }}>
                <Image
                  src={product.cover_image_url}
                  alt={product.title || ''}
                  fill
                  className="object-fit-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>
            )}

            {gallery.length > 0 && (
              <div className="row g-2">
                {gallery.slice(0, 4).map((img, i) => (
                  <div key={i} className="col-3">
                    <div className="position-relative rounded overflow-hidden" style={{ height: '100px' }}>
                      <Image
                        src={img}
                        alt={`${product.title} - ${i + 1}`}
                        fill
                        className="object-fit-cover"
                        sizes="15vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info + CTA */}
          <div className="col-lg-5">
            <span className="badge bg-light text-dark mb-2">{product.category}</span>
            <h1 className="fw-bold mb-2">{product.title}</h1>
            {product.subtitle && (
              <p className="fs-5 text-muted mb-4">{product.subtitle}</p>
            )}

            {/* Pricing Selection */}
            <div className="card border mb-4">
              <div className="card-body">
                {product.price_onetime && (
                  <label
                    className={`d-flex align-items-center gap-3 p-3 rounded cursor-pointer mb-2 ${paymentType === 'onetime' ? 'bg-primary bg-opacity-10 border border-primary' : 'border'}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentType === 'onetime'}
                      onChange={() => setPaymentType('onetime')}
                      className="form-check-input"
                    />
                    <div>
                      <strong>Einmalzahlung</strong>
                      <div className="text-primary fs-4 fw-bold">{priceOnetime}</div>
                    </div>
                  </label>
                )}

                {product.price_monthly && product.paypal_plan_id && (
                  <label
                    className={`d-flex align-items-center gap-3 p-3 rounded cursor-pointer ${paymentType === 'subscription' ? 'bg-success bg-opacity-10 border border-success' : 'border'}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentType === 'subscription'}
                      onChange={() => setPaymentType('subscription')}
                      className="form-check-input"
                    />
                    <div>
                      <strong>Monatliches Abonnement</strong>
                      <div className="text-success fs-4 fw-bold">{priceMonthly}/mo</div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="d-grid gap-2 mb-4">
              <Link href={checkoutHref} className="btn btn-primary btn-lg">
                Jetzt kaufen
              </Link>
              {product.demo_url && (
                <a
                  href={product.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Live Demo ansehen
                </a>
              )}
            </div>

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Technologien</h6>
                <div className="d-flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span key={tech} className="badge bg-soft-primary text-primary px-3 py-2">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Product Type */}
            <div className="text-muted small">
              <strong>Typ:</strong>{' '}
              {product.product_type === 'digital' ? 'Digitales Produkt (Quellcode-Lieferung)' : 'Dienstleistung'}
            </div>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold mb-4">Funktionen & Features</h3>
            <div className="row g-3">
              {features.map((feature, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-start gap-2">
                    <span className="text-primary fs-5">&#10003;</span>
                    <span>{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="mt-5">
            <h3 className="fw-bold mb-4">Beschreibung</h3>
            <div
              className="text-300 lh-lg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
