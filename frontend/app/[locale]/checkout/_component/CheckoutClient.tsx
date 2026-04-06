'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useGetProductByIdPublicQuery,
  useGetServiceByIdPublicQuery,
  useGetProjectPublicQuery,
  useCreateCheckoutOrderMutation,
} from '@/integrations/hooks';
import { formatPrice } from '@/integrations/shared/products.types';

type SellableType = 'product' | 'service' | 'project';

function parseSellable(searchParams: URLSearchParams): { type: SellableType; id: string } {
  const productId = searchParams.get('product') || '';
  const serviceId = searchParams.get('service') || '';
  const projectId = searchParams.get('project') || '';
  if (projectId) return { type: 'project', id: projectId };
  if (serviceId) return { type: 'service', id: serviceId };
  if (productId) return { type: 'product', id: productId };
  return { type: 'product', id: '' };
}

export default function CheckoutClient({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const { type: sellableType, id: entityId } = parseSellable(searchParams);

  const rawType = (searchParams.get('type') as 'onetime' | 'subscription') || 'onetime';
  const paymentType = sellableType === 'product' ? rawType : 'onetime';

  const { data: product, isLoading: productLoading } = useGetProductByIdPublicQuery(
    { id: entityId, locale },
    { skip: sellableType !== 'product' || !entityId },
  );

  const { data: service, isLoading: serviceLoading } = useGetServiceByIdPublicQuery(
    { id: entityId, locale },
    { skip: sellableType !== 'service' || !entityId },
  );

  const { data: project, isLoading: projectLoading } = useGetProjectPublicQuery(entityId, {
    skip: sellableType !== 'project' || !entityId,
  });

  const [createOrder, { isLoading: creating }] = useCreateCheckoutOrderMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!entityId) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <h2>Kein Artikel ausgewaehlt</h2>
          <p>Bitte waehlen Sie ein Paket, eine Dienstleistung oder ein Projekt.</p>
        </div>
      </section>
    );
  }

  const loading =
    sellableType === 'product'
      ? productLoading
      : sellableType === 'service'
        ? serviceLoading
        : projectLoading;

  if (loading) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      </section>
    );
  }

  let lineTitle = '';
  let priceStr: string | null = null;
  let currency = 'EUR';
  let canCheckout = false;

  if (sellableType === 'product' && product) {
    lineTitle = product.title || 'Product';
    currency = product.currency || 'EUR';
    priceStr =
      paymentType === 'subscription' ? product.price_monthly : product.price_onetime;
    canCheckout = Boolean(priceStr && (paymentType === 'onetime' || product.paypal_plan_id));
  } else if (sellableType === 'service' && service) {
    lineTitle = service.name || 'Service';
    currency = service.currency || 'EUR';
    priceStr = service.price_onetime;
    canCheckout = Boolean(service.is_purchasable && priceStr);
  } else if (sellableType === 'project' && project) {
    lineTitle = project.title || 'Project';
    currency = project.currency || 'EUR';
    priceStr = project.price_onetime ?? null;
    const purch =
      project.is_purchasable === true ||
      (project as { is_purchasable?: number }).is_purchasable === 1;
    canCheckout = Boolean(purch && priceStr);
  }

  if (!product && sellableType === 'product') {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <h2>Produkt nicht gefunden</h2>
        </div>
      </section>
    );
  }

  if (!service && sellableType === 'service') {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <h2>Dienstleistung nicht gefunden</h2>
        </div>
      </section>
    );
  }

  if (!project && sellableType === 'project') {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <h2>Projekt nicht gefunden</h2>
        </div>
      </section>
    );
  }

  const formattedPrice = formatPrice(priceStr, currency);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!canCheckout) {
      setError('Dieser Artikel ist derzeit nicht kaufbar. Bitte pruefen Sie Preis und Verfuegbarkeit.');
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError('Bitte fuellen Sie alle Pflichtfelder aus.');
      return;
    }

    try {
      const origin = window.location.origin;
      const baseBody = {
        payment_type: paymentType,
        customer_name: name.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim() || undefined,
        customer_locale: locale,
        return_url: `${origin}/${locale}/checkout/success?order_id={ORDER_ID}`,
        cancel_url: `${origin}/${locale}/checkout/cancel`,
      };

      const result = await createOrder(
        sellableType === 'product'
          ? {
              ...baseBody,
              sellable_type: 'product' as const,
              product_id: entityId,
            }
          : sellableType === 'service'
            ? {
                ...baseBody,
                sellable_type: 'service' as const,
                service_id: entityId,
              }
            : {
                ...baseBody,
                sellable_type: 'project' as const,
                project_id: entityId,
              },
      ).unwrap();

      if (result.approve_url) {
        window.location.href = result.approve_url;
      } else {
        setError('PayPal-Weiterleitung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === 'object' &&
        'data' in err &&
        err.data &&
        typeof err.data === 'object' &&
        'error' in err.data &&
        err.data.error &&
        typeof err.data.error === 'object' &&
        'message' in err.data.error
          ? String((err.data.error as { message?: string }).message)
          : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
      setError(msg);
    }
  };

  const subtitle =
    sellableType === 'product' && product?.subtitle
      ? product.subtitle
      : sellableType === 'service' && service?.summary
        ? service.summary
        : sellableType === 'project' && project?.summary
          ? project.summary
          : null;

  return (
    <section className="pt-120 pb-150">
      <div className="container">
        <div className="row g-5 justify-content-center">
          <div className="col-lg-5 order-lg-2">
            <div className="card border shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Bestelluebersicht</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">{lineTitle}</span>
                </div>
                {subtitle && <p className="text-muted small mb-3">{subtitle}</p>}
                <div className="d-flex justify-content-between mb-2">
                  <span>Zahlungsart</span>
                  <span>
                    {paymentType === 'subscription' ? 'Monatlich' : 'Einmalig'}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Gesamt</strong>
                  <strong className="text-primary fs-4">
                    {formattedPrice}
                    {paymentType === 'subscription' ? '/mo' : ''}
                  </strong>
                </div>
                {!canCheckout && (
                  <p className="text-danger small mt-2 mb-0">
                    Nicht kaufbar: Preis fehlt oder Verkauf ist deaktiviert.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-4">Checkout</h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Max Mustermann"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-Mail *
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="max@beispiel.de"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="form-label">
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 123 456789"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={creating || !canCheckout}
              >
                {creating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Wird verarbeitet...
                  </>
                ) : (
                  <>Mit PayPal bezahlen</>
                )}
              </button>

              <p className="text-muted small text-center mt-3">
                Sie werden zu PayPal weitergeleitet, um die Zahlung abzuschliessen.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
