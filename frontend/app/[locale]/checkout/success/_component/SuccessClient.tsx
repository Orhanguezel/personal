'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  useCaptureCheckoutOrderMutation,
  useActivateSubscriptionMutation,
  useGetOrderStatusQuery,
} from '@/integrations/hooks';
import { formatPrice } from '@/integrations/shared/products.types';

export default function SuccessClient({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const paypalOrderId = searchParams.get('token') || '';
  const subscriptionId = searchParams.get('subscription_id') || '';

  const [captureOrder] = useCaptureCheckoutOrderMutation();
  const [activateSubscription] = useActivateSubscriptionMutation();

  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState('');
  const [captured, setCaptured] = useState(false);

  const { data: order } = useGetOrderStatusQuery(orderId, {
    skip: !orderId || !captured,
  });

  useEffect(() => {
    if (!orderId) {
      setError('Keine Bestellinformationen gefunden.');
      setProcessing(false);
      return;
    }

    const finalize = async () => {
      try {
        if (subscriptionId) {
          await activateSubscription({
            subscription_id: subscriptionId,
            order_id: orderId,
          }).unwrap();
        } else if (paypalOrderId) {
          await captureOrder({
            paypal_order_id: paypalOrderId,
          }).unwrap();
        }
        setCaptured(true);
      } catch (err: any) {
        const msg = err?.data?.error?.message || '';
        if (msg.includes('already captured') || msg.includes('already')) {
          setCaptured(true);
        } else {
          setError(msg || 'Zahlung konnte nicht abgeschlossen werden.');
        }
      } finally {
        setProcessing(false);
      }
    };

    finalize();
  }, [orderId, paypalOrderId, subscriptionId, captureOrder, activateSubscription]);

  if (processing) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <h3>Zahlung wird verarbeitet...</h3>
          <p className="text-muted">Bitte warten Sie einen Moment.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-120 pb-150">
        <div className="container text-center">
          <div className="mb-4">
            <span className="text-danger" style={{ fontSize: '4rem' }}>&#10007;</span>
          </div>
          <h2 className="fw-bold mb-3">Zahlung fehlgeschlagen</h2>
          <p className="text-muted mb-4">{error}</p>
          <Link href={`/${locale}/products`} className="btn btn-primary">
            Zurueck zu den Paketen
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-120 pb-150">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 text-center">
            <div className="mb-4">
              <span className="text-success" style={{ fontSize: '4rem' }}>&#10003;</span>
            </div>
            <h2 className="fw-bold mb-3">Vielen Dank fuer Ihre Bestellung!</h2>
            <p className="text-muted fs-5 mb-4">
              Ihre Zahlung wurde erfolgreich abgeschlossen.
            </p>

            {order && (
              <div className="card border shadow-sm text-start mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Bestelldetails</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Bestellnummer</span>
                    <strong>{order.order_number}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Status</span>
                    <span className="badge bg-success">
                      {order.payment_status === 'paid' ? 'Bezahlt' : order.payment_status}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Zahlungsart</span>
                    <span>{order.payment_type === 'subscription' ? 'Monatlich' : 'Einmalig'}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Gesamt</strong>
                    <strong className="text-primary fs-5">
                      {formatPrice(String(order.total_amount), order.currency)}
                      {order.payment_type === 'subscription' ? '/mo' : ''}
                    </strong>
                  </div>

                  {order.delivery_url && (
                    <div className="mt-3 pt-3 border-top">
                      <a
                        href={order.delivery_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary w-100"
                      >
                        Download / Zugang
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <p className="text-muted small mb-4">
              Eine Bestaetigungsmail wird an Ihre E-Mail-Adresse gesendet.
            </p>

            <div className="d-flex gap-3 justify-content-center">
              <Link href={`/${locale}/products`} className="btn btn-primary">
                Weitere Pakete ansehen
              </Link>
              <Link href={`/${locale}`} className="btn btn-outline-secondary">
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
