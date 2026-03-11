'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductByIdPublicQuery } from '@/integrations/hooks';
import { useCreateCheckoutOrderMutation } from '@/integrations/hooks';
import { formatPrice } from '@/integrations/shared/products.types';

export default function CheckoutClient({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') || '';
  const paymentType = (searchParams.get('type') as 'onetime' | 'subscription') || 'onetime';

  const { data: product, isLoading: productLoading } = useGetProductByIdPublicQuery(
    { id: productId, locale },
    { skip: !productId },
  );

  const [createOrder, { isLoading: creating }] = useCreateCheckoutOrderMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!productId) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <h2>Kein Produkt ausgewaehlt</h2>
          <p>Bitte waehlen Sie zuerst ein Paket aus.</p>
        </div>
      </section>
    );
  }

  if (productLoading) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <h2>Produkt nicht gefunden</h2>
        </div>
      </section>
    );
  }

  const price = paymentType === 'subscription' ? product.price_monthly : product.price_onetime;
  const formattedPrice = formatPrice(price, product.currency);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Bitte fuellen Sie alle Pflichtfelder aus.');
      return;
    }

    try {
      const origin = window.location.origin;
      const result = await createOrder({
        product_id: productId,
        payment_type: paymentType,
        customer_name: name.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim() || undefined,
        customer_locale: locale,
        return_url: `${origin}/${locale}/checkout/success?order_id={ORDER_ID}`,
        cancel_url: `${origin}/${locale}/checkout/cancel`,
      }).unwrap();

      if (result.approve_url) {
        window.location.href = result.approve_url;
      } else {
        setError('PayPal-Weiterleitung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    } catch (err: any) {
      setError(err?.data?.error?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <section className="pt-120 pb-150">
      <div className="container">
        <div className="row g-5 justify-content-center">
          {/* Order Summary */}
          <div className="col-lg-5 order-lg-2">
            <div className="card border shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Bestelluebersicht</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">{product.title}</span>
                </div>
                {product.subtitle && (
                  <p className="text-muted small mb-3">{product.subtitle}</p>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Zahlungsart</span>
                  <span>{paymentType === 'subscription' ? 'Monatlich' : 'Einmalig'}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Gesamt</strong>
                  <strong className="text-primary fs-4">
                    {formattedPrice}
                    {paymentType === 'subscription' ? '/mo' : ''}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
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
                disabled={creating}
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
