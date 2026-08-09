import Link from 'next/link';
import Image from 'next/image';
import type { ProductDto } from '@/integrations/shared/products.types';
import { sanitizeHtml } from '@/integrations/shared';
import { localizePath } from '@/i18n/routes';

const COPY = {
  tr: {
    home: 'Anasayfa', products: 'Ürünler', demo: 'Canlı demoyu aç', contact: 'Demo iste',
    features: 'Öne çıkan özellikler', description: 'Ürün hakkında', tags: 'Kullanım alanları',
  },
  de: {
    home: 'Startseite', products: 'Produkte', demo: 'Live-Demo öffnen', contact: 'Demo anfragen',
    features: 'Highlights', description: 'Über das Produkt', tags: 'Anwendungsbereiche',
  },
  en: {
    home: 'Home', products: 'Products', demo: 'Open live demo', contact: 'Request a demo',
    features: 'Key features', description: 'About the product', tags: 'Use cases',
  },
} as const;

export default function ProductDetailClient({ locale, product }: { locale: string; product: ProductDto }) {
  const baseLocale = locale.startsWith('tr') ? 'tr' : locale.startsWith('de') ? 'de' : 'en';
  const copy = COPY[baseLocale];
  const productsHref = `/${locale}${localizePath(locale, '/products')}`;
  const contactHref = `/${locale}${localizePath(locale, '/contact')}?subject=${encodeURIComponent(product.title || 'SaaS demo')}`;
  const gallery = product.gallery ?? [];
  const features = product.features?.length ? product.features : product.tags ?? [];

  return (
    <section className="pt-120 pb-150">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href={`/${locale}`}>{copy.home}</Link></li>
            <li className="breadcrumb-item"><Link href={productsHref}>{copy.products}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="row g-5 align-items-center mx-0">
          <div className="col-lg-7">
            {product.cover_image_url && (
              <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ minHeight: '420px' }}>
                <Image
                  src={product.cover_image_url}
                  alt={product.title || copy.products}
                  fill
                  className="object-fit-cover"
                  sizes="(max-width: 991px) 100vw, 58vw"
                  priority
                />
              </div>
            )}
          </div>

          <div className="col-lg-5">
            <span className="text-uppercase text-primary-1 fs-7 fw-semibold">{product.category}</span>
            <h1 className="ds-4 fw-bold text-dark mt-2 mb-3">{product.title}</h1>
            {product.subtitle && <p className="fs-5 text-300 mb-4">{product.subtitle}</p>}

            {product.tags && product.tags.length > 0 && (
              <div className="mb-4">
                <p className="fw-semibold text-dark mb-2">{copy.tags}</p>
                <div className="d-flex flex-wrap gap-2">
                  {product.tags.map((tag) => <span key={tag} className="badge bg-light text-dark border px-3 py-2">{tag}</span>)}
                </div>
              </div>
            )}

            <div className="d-flex flex-wrap gap-3">
              <Link href={contactHref} className="btn btn-primary btn-lg">{copy.contact}</Link>
              {product.demo_url && (
                <a href={product.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-lg">
                  {copy.demo} <i className="ri-external-link-line" />
                </a>
              )}
            </div>
          </div>
        </div>

        {features.length > 0 && (
          <div className="mt-8">
            <h2 className="h3 fw-bold text-dark mb-4">{copy.features}</h2>
            <div className="row g-3">
              {features.map((feature) => (
                <div key={feature} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100 p-4 d-flex flex-row align-items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-primary-1 fs-4" />
                    <span className="text-dark">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.description && (
          <div className="mt-8">
            <h2 className="h3 fw-bold text-dark mb-4">{copy.description}</h2>
            <div className="text-300 fs-5 lh-lg" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }} />
          </div>
        )}

        {gallery.length > 1 && (
          <div className="row g-3 mt-5">
            {gallery.slice(1, 5).map((image) => (
              <div key={image} className="col-6 col-lg-3">
                <div className="position-relative rounded-3 overflow-hidden" style={{ height: '180px' }}>
                  <Image src={image} alt={product.title || copy.products} fill className="object-fit-cover" sizes="25vw" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
