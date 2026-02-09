// frontend/components/sections/Contact2.tsx
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useGetSiteSettingByKeyQuery, useCreateContactMutation } from '@/integrations/hooks';

import {
  cx,
  resolveLocaleForApi,
  normalizeContactInfoSettingValue,
  normalizeContactSectionSettingValue,
  type ContactInfo,
  type ContactSection,
  type ContactCreateInput,
} from '@/integrations/shared';

export default function Contact2() {
  const pathname = usePathname() || '/';
  const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

  // settings: contact_info + contact_section
  const { data: contactInfoSetting } = useGetSiteSettingByKeyQuery({
    key: 'contact_info',
    ...(localeForApi ? { locale: localeForApi } : {}),
  });

  const { data: contactSectionSetting } = useGetSiteSettingByKeyQuery({
    key: 'contact_section',
    ...(localeForApi ? { locale: localeForApi } : {}),
  });

  const contactInfo: ContactInfo = useMemo(
    () => normalizeContactInfoSettingValue(contactInfoSetting?.value),
    [contactInfoSetting?.value],
  );

  const section: ContactSection = useMemo(
    () => normalizeContactSectionSettingValue(contactSectionSetting?.value),
    [contactSectionSetting?.value],
  );

  // values (fallbacks)
  const phone = (contactInfo.phone || contactInfo.phones?.[0] || '').trim();
  const email = (contactInfo.email || '').trim();
  const skype = (contactInfo.skype || '').trim();
  const address = (contactInfo.address || '').trim();

  // RTK submit
  const [createContact, { isLoading }] = useCreateContactMutation();

  // form state
  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // honeypot (BE: website)
  const [website, setWebsite] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ContactCreateInput = {
      name: name.trim(),
      email: emailInput.trim(),
      phone: phoneInput.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ...(website.trim() ? { website: website.trim() } : {}),
    };

    // minimal sanity
    if (!payload.name || !payload.email || !payload.message) return;

    try {
      await createContact(payload).unwrap();

      setName('');
      setPhoneInput('');
      setEmailInput('');
      setSubject('');
      setMessage('');
      setWebsite('');
    } catch {
      // toast bağlamak istersen burada
    }
  };

  return (
    <>
      <section id="contact" className="section-contact-2 position-relative pb-60 overflow-hidden">
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-7 pb-5 pb-lg-0">
              <div className="position-relative">
                <div className="position-relative z-2">
                  <h3 className="text-primary-2 mb-3">{section.headline || 'Let’s connect'}</h3>

                  <form onSubmit={onSubmit}>
                    <div className="row g-3">
                      {/* honeypot hidden */}
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="d-none"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      <div className="col-md-6 ">
                        <input
                          type="text"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="name"
                          name="name"
                          placeholder={
                            section.form?.name_ph || section.form?.name_label || 'Your name'
                          }
                          aria-label="username"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="phone"
                          name="phone"
                          placeholder={
                            section.form?.phone_ph || section.form?.phone_label || 'Phone'
                          }
                          aria-label="phone"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="email"
                          name="email"
                          placeholder={
                            section.form?.email_ph || section.form?.email_label || 'Email'
                          }
                          aria-label="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="subject"
                          name="subject"
                          placeholder={
                            section.form?.subject_ph || section.form?.subject_label || 'Subject'
                          }
                          aria-label="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                      <div className="col-12">
                        <textarea
                          className="form-control bg-3 border border-1 rounded-3"
                          id="message"
                          name="message"
                          placeholder={
                            section.form?.message_ph || section.form?.message_label || 'Message'
                          }
                          aria-label="With textarea"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className={cx('btn btn-primary-2 rounded-2', isLoading && 'disabled')}
                          disabled={isLoading}
                        >
                          {section.form?.submit || 'Send Message'}
                          <i className="ri-arrow-right-up-line" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />
              </div>
            </div>

            <div className="col-lg-5 d-flex flex-column ps-lg-8">
              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-phone-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">
                    {section.cards?.phone_label || 'Phone Number'}
                  </span>
                  <h6 className="mb-0">{phone || '-'}</h6>
                </div>
                {phone ? (
                  <Link
                    href={`tel:${phone}`}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    aria-label="Phone"
                  />
                ) : null}
              </div>

              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-mail-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">{section.cards?.email_label || 'Email'}</span>
                  <h6 className="mb-0">{email || '-'}</h6>
                </div>
                {email ? (
                  <Link
                    href={`mailto:${email}`}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    aria-label="Email"
                  />
                ) : null}
              </div>

              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-skype-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">{section.cards?.skype_label || 'Skype'}</span>
                  <h6 className="mb-0">{skype || '-'}</h6>
                </div>
                {skype ? (
                  <Link
                    href={`skype:${encodeURIComponent(skype)}?chat`}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    aria-label="Skype"
                  />
                ) : null}
              </div>

              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-map-2-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">{section.cards?.address_label || 'Address'}</span>
                  <h6 className="mb-0">{address || '-'}</h6>
                </div>
                {address ? (
                  <Link
                    href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    aria-label="Address"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
