// frontend/components/sections/Contact1.tsx
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useGetSiteSettingByKeyQuery, useCreateContactMutation } from '@/integrations/hooks';

import {
  cx,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  normalizeContactInfoSettingValue,
  normalizeContactSectionSettingValue,
  type ContactInfo,
  type ContactSection,
  type ContactCreateInput,
} from '@/integrations/shared';

export default function Contact1() {
  const pathname = usePathname() || '/';
  const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname]);
  const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

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

  const phone = (contactInfo.phone || contactInfo.phones?.[0] || '').trim();
  const email = (contactInfo.email || '').trim();
  const skype = (contactInfo.skype || '').trim();
  const address = (contactInfo.address || '').trim();

  const [createContact, { isLoading }] = useCreateContactMutation();

  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
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

    // minimal sanity (BE zaten validate eder)
    if (!payload.name || !payload.email || !payload.message) return;

    try {
      await createContact(payload).unwrap();

      setName('');
      setEmailInput('');
      setPhoneInput('');
      setSubject('');
      setMessage('');
      setWebsite('');
    } catch {
      // toast bağlamak istersen burada
    }
  };

  return (
    <section
      id="contact"
      className="section-contact-1 bg-900 position-relative pt-150 pb-lg-250 pb-150 overflow-hidden"
    >
      <div className="container position-relative z-1">
        <h3 className="ds-3 mt-3 mb-3 text-primary-1">{section.headline || 'Get in touch'}</h3>

        <span className="fs-5 fw-medium text-200">
          {section.intro ||
            "I'm always excited to take on new projects and collaborate with innovative minds. If you have a project in mind or just want to chat, feel free to reach out!"}
        </span>

        <div className="row mt-8">
          <div className="col-lg-4 d-flex flex-column">
            {/* PHONE */}
            <div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
              <div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
                <i className="ri-phone-fill text-primary-1 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-5">
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

            {/* EMAIL */}
            <div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
              <div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
                <i className="ri-mail-fill text-primary-1 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-5">{section.cards?.email_label || 'Email'}</span>
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

            {/* SKYPE */}
            <div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
              <div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
                <i className="ri-skype-fill text-primary-1 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-5">{section.cards?.skype_label || 'Skype'}</span>
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

            {/* ADDRESS */}
            <div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
              <div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
                <i className="ri-map-2-fill text-primary-1 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-5">{section.cards?.address_label || 'Address'}</span>
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

          <div className="col-lg-7 offset-lg-1 ps-lg-0 pt-5 pt-lg-0">
            <div className="position-relative">
              <div className="position-relative z-2">
                <h3>{section.form?.title || 'Leave a message'}</h3>

                <form onSubmit={onSubmit}>
                  <div className="row mt-3">
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

                    <div className="col-md-6">
                      <label className="mb-1 mt-3 text-dark" htmlFor="name">
                        {section.form?.name_label || 'Your name'}{' '}
                        <span className="text-primary-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control border rounded-3"
                        id="name"
                        name="name"
                        placeholder={section.form?.name_ph || 'John Doe'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="mb-1 mt-3 text-dark" htmlFor="email">
                        {section.form?.email_label || 'Email address'}{' '}
                        <span className="text-primary-1">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control border rounded-3"
                        id="email"
                        name="email"
                        placeholder={section.form?.email_ph || 'contact.john@gmail.com'}
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="mb-1 mt-3 text-dark" htmlFor="phone">
                        {section.form?.phone_label || 'Your phone'}
                      </label>
                      <input
                        type="text"
                        className="form-control border rounded-3"
                        id="phone"
                        name="phone"
                        placeholder={section.form?.phone_ph || '+49 000 000 00 00'}
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="mb-1 mt-3 text-dark" htmlFor="subject">
                        {section.form?.subject_label || 'Subject'}
                      </label>
                      <input
                        type="text"
                        className="form-control border rounded-3"
                        id="subject"
                        name="subject"
                        placeholder={section.form?.subject_ph || 'I want to contact about…'}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="mb-1 mt-3 text-dark" htmlFor="message">
                        {section.form?.message_label || 'Message'}{' '}
                        <span className="text-primary-1">*</span>
                      </label>
                      <textarea
                        className="form-control border rounded-3 pb-10"
                        id="message"
                        name="message"
                        placeholder={section.form?.message_ph || 'Your message here…'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className={cx('btn btn-gradient mt-3', isLoading && 'disabled')}
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
        </div>
      </div>

      <div className="scroll-move-right position-absolute bottom-0 start-50 translate-middle-x bg-900 overflow-hidden">
        <div className="wow img-custom-anim-top">
          <h3 className="stroke fs-280 text-lowercase text-900 mb-0 lh-1">
            {section.marquee || 'guezelwebdesign'}
          </h3>
        </div>
      </div>
    </section>
  );
}
