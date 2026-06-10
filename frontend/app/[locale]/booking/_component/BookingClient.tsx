'use client';

import { useMemo, useState } from 'react';

import {
  useCreateBookingPublicMutation,
  useListResourcesPublicQuery,
  useListServicesPublicQuery,
} from '@/integrations/hooks';

type Props = {
  locale: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  resource: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  required: string;
  noResources: string;
  optional: string;
};

const COPY: Record<string, Copy> = {
  de: {
    eyebrow: 'Termin',
    title: 'Projektgespraech buchen',
    intro: 'Waehle einen passenden Slot fuer ein kurzes technisches Erstgespraech.',
    resource: 'Ressource',
    service: 'Leistung',
    date: 'Datum',
    time: 'Uhrzeit',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    message: 'Nachricht',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet...',
    success: 'Danke, deine Anfrage ist eingegangen.',
    error: 'Die Anfrage konnte nicht gesendet werden.',
    required: 'Bitte fuelle alle Pflichtfelder aus.',
    noResources: 'Aktuell sind keine Ressourcen aktiv.',
    optional: 'Optional',
  },
  en: {
    eyebrow: 'Booking',
    title: 'Book a project call',
    intro: 'Choose a suitable slot for a short technical discovery call.',
    resource: 'Resource',
    service: 'Service',
    date: 'Date',
    time: 'Time',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Send request',
    sending: 'Sending...',
    success: 'Thanks, your request has been received.',
    error: 'The request could not be sent.',
    required: 'Please complete all required fields.',
    noResources: 'No active resources are available right now.',
    optional: 'Optional',
  },
  tr: {
    eyebrow: 'Randevu',
    title: 'Proje gorusmesi planla',
    intro: 'Kisa bir teknik on gorusme icin uygun bir zaman sec.',
    resource: 'Kaynak',
    service: 'Hizmet',
    date: 'Tarih',
    time: 'Saat',
    name: 'Ad soyad',
    email: 'E-posta',
    phone: 'Telefon',
    message: 'Mesaj',
    submit: 'Talep gonder',
    sending: 'Gonderiliyor...',
    success: 'Tesekkurler, talebin alindi.',
    error: 'Talep gonderilemedi.',
    required: 'Lutfen zorunlu alanlari doldur.',
    noResources: 'Su anda aktif kaynak bulunmuyor.',
    optional: 'Istege bagli',
  },
};

function todayYmd() {
  return new Date().toISOString().slice(0, 10);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function BookingClient({ locale }: Props) {
  const copy = COPY[locale] ?? COPY.de;
  const [createBooking, bookingState] = useCreateBookingPublicMutation();
  const { data: resources = [], isLoading: resourcesLoading } = useListResourcesPublicQuery();
  const { data: servicesRes } = useListServicesPublicQuery({
    locale,
    default_locale: locale,
    limit: 100,
    order: 'display_order.asc',
  } as any);

  const services = servicesRes?.items ?? [];
  const firstResourceId = resources[0]?.id ?? '';
  const [resourceId, setResourceId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState(todayYmd());
  const [time, setTime] = useState('10:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  const selectedResourceId = resourceId || firstResourceId;
  const canSubmit = useMemo(
    () =>
      !!selectedResourceId &&
      !!date &&
      !!time &&
      name.trim().length >= 2 &&
      isEmail(email.trim()) &&
      phone.trim().length >= 7,
    [date, email, name, phone, selectedResourceId, time],
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setStatus({ kind: 'error', text: copy.required });
      return;
    }

    try {
      await createBooking({
        locale,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        resource_id: selectedResourceId,
        ...(serviceId ? { service_id: serviceId } : {}),
        appointment_date: date,
        appointment_time: time,
        ...(message.trim() ? { customer_message: message.trim() } : {}),
      }).unwrap();

      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setStatus({ kind: 'success', text: copy.success });
    } catch {
      setStatus({ kind: 'error', text: copy.error });
    }
  };

  return (
    <section className="section-booking pt-120 pb-150">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <p className="text-primary-1 text-uppercase fw-bold mb-2">{copy.eyebrow}</p>
            <h1 className="ds-3 mb-3 text-dark">{copy.title}</h1>
            <p className="text-300 fs-5 mb-5">{copy.intro}</p>

            <form className="row g-4" onSubmit={onSubmit}>
              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-resource">
                  {copy.resource}
                </label>
                <select
                  id="booking-resource"
                  className="form-select border-secondary-3 rounded-2 py-3"
                  value={selectedResourceId}
                  onChange={(event) => setResourceId(event.target.value)}
                  disabled={bookingState.isLoading || resourcesLoading || !resources.length}
                  required
                >
                  {!resources.length ? (
                    <option value="">{copy.noResources}</option>
                  ) : (
                    resources.map((resource) => (
                      <option value={resource.id} key={resource.id}>
                        {resource.label || resource.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-service">
                  {copy.service} <span className="text-300">({copy.optional})</span>
                </label>
                <select
                  id="booking-service"
                  className="form-select border-secondary-3 rounded-2 py-3"
                  value={serviceId}
                  onChange={(event) => setServiceId(event.target.value)}
                  disabled={bookingState.isLoading}
                >
                  <option value="">{copy.optional}</option>
                  {services.map((service) => (
                    <option value={service.id} key={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-date">
                  {copy.date}
                </label>
                <input
                  id="booking-date"
                  className="form-control border-secondary-3 rounded-2 py-3"
                  type="date"
                  min={todayYmd()}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  disabled={bookingState.isLoading}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-time">
                  {copy.time}
                </label>
                <input
                  id="booking-time"
                  className="form-control border-secondary-3 rounded-2 py-3"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  disabled={bookingState.isLoading}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-name">
                  {copy.name}
                </label>
                <input
                  id="booking-name"
                  className="form-control border-secondary-3 rounded-2 py-3"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={bookingState.isLoading}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-email">
                  {copy.email}
                </label>
                <input
                  id="booking-email"
                  className="form-control border-secondary-3 rounded-2 py-3"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={bookingState.isLoading}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-dark" htmlFor="booking-phone">
                  {copy.phone}
                </label>
                <input
                  id="booking-phone"
                  className="form-control border-secondary-3 rounded-2 py-3"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  disabled={bookingState.isLoading}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label text-dark" htmlFor="booking-message">
                  {copy.message} <span className="text-300">({copy.optional})</span>
                </label>
                <textarea
                  id="booking-message"
                  className="form-control border-secondary-3 rounded-2 py-3"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={bookingState.isLoading}
                />
              </div>

              <div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                <button
                  type="submit"
                  className="btn btn-gradient text-uppercase"
                  disabled={bookingState.isLoading || !resources.length}
                >
                  {bookingState.isLoading ? copy.sending : copy.submit}
                </button>
                <p
                  className={`mb-0 fs-6 ${status?.kind === 'success' ? 'text-primary-1' : 'text-300'}`}
                  aria-live="polite"
                >
                  {status?.text ?? ''}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
