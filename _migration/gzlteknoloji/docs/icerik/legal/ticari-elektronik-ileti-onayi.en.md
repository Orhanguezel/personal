> DRAFT — attorney review is required before publication. This document does not constitute legal advice.

# Commercial Electronic Message Consent

*This is an English courtesy translation. The Turkish version is the legally binding text; these consents are governed by Turkish law — in particular Law No. 6563 on the Regulation of Electronic Commerce and the Regulation on Commercial Communication and Commercial Electronic Messages.*

This page contains the consent texts and your rights regarding commercial electronic messages to be sent by **GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.** (Gemlik/Bursa · Gemlik Tax Office — 4542302453 · info@gzlteknoloji.com · gzlteknoloji.com · Phone: {{TELEFON}}).

## 1. Newsletter Form Consent Text

Text to be used together with the checkbox next to the form:

> **Newsletter consent:** I **consent**, within the scope of Turkish Law No. 6563 and the related Regulation, to GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. sending me commercial electronic messages by **e-mail** about new services, campaigns, announcements and technical content. I understand that I may refuse this consent at any time, without giving any reason and free of charge.

Implementation notes (for the developer):

- The consent checkbox must **NOT be pre-ticked**; the user must actively tick it.
- Consent may not be made a precondition for providing the newsletter subscription service.
- The date, channel and IP address of the consent must be recorded for evidentiary purposes.

## 2. Lead / Quote Form Consent Text

There are **two distinct situations** on quote and contact forms:

**a) Response to a request (no consent required):** Responding to a quote/contact request you submitted yourself — limited to your request — does not require commercial electronic message consent. Information note under the form:

> Submitting this form only allows us to contact you for the purpose of responding to your request; no marketing messages will be sent.

**b) Marketing messages (separate and optional checkbox):**

> **Marketing consent (optional):** Independently of my request, I consent to GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. sending me commercial electronic messages by **e-mail and/or SMS/phone call** about its services, campaigns and announcements. I may withdraw this consent at any time, free of charge.

Implementation notes:

- The marketing consent checkbox may **not be made mandatory** for submitting the form and may not be pre-ticked.
- Messages may only be sent through the channels (e-mail / SMS / call) for which consent was obtained; separate per-channel checkboxes are preferred.

## 3. Registration with İYS (Message Management System)

- All commercial electronic message consents obtained are registered with the Turkish **Message Management System (İYS — İleti Yönetim Sistemi)** as required by the related Regulation; messages may not be sent on the basis of consents not registered with İYS.
- Recipients may also view and manage their consent and opt-out records via **iys.org.tr**.
- The time limit for registering a consent with İYS and the details of the registration obligation are subject to the provisions of the related Regulation; the integration should be planned in Phase 2 together with the Iyzico/e-mail infrastructure.

## 4. Right to Opt Out (Withdraw Consent) and Method

- You may withdraw your consent **at any time, without giving any reason and free of charge** (right of refusal).
- Opt-out methods:
  1. the **"unsubscribe"** link at the bottom of every commercial e-mail sent;
  2. sending an opt-out notice to **info@gzlteknoloji.com**;
  3. exercising the right of refusal via **İYS (iys.org.tr)**;
  4. where SMS messages are sent, replying via the short number/method indicated in the message.
- Once your opt-out notice reaches us, message sending is stopped within the period prescribed by the applicable legislation.
- Every commercial electronic message must contain the sender's identity (legal name), contact details and the opt-out method.

## 5. Relationship with Personal Data Protection

Personal data processed under these consents — such as name, e-mail and phone number — are processed in accordance with Turkish Law No. 6698 on the Protection of Personal Data (KVKK). See the Privacy/KVKK notice on the website for details. The commercial electronic message consent and the KVKK privacy notice are **separate texts**; they must not be merged into a single checkbox in form design.

---

## Sources / basis

- **Company identity source:** Official company records (`vps-guezel/sirket/turkiye/` — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → `{{TELEFON}}` placeholder remains.
- **Legislation:** Turkish Law No. 6563 on the Regulation of Electronic Commerce; Regulation on Commercial Communication and Commercial Electronic Messages (consent, İYS registration obligation, right of refusal, mandatory message content); Law No. 6698 (KVKK). Article numbers and the İYS registration deadline were deliberately omitted — see `docs/icerik/_tmp/EKSIK_legal.md`.
- **Form distinction (newsletter / lead):** the newsletter and quote/lead forms in the gzlteknoloji.com frontend (e.g. `frontend/src/components/containers/gzl/GzlLeadForm.tsx`) — hence two separate consent texts.
- **İYS integration timing:** Phase 2 online payment plan (task brief) — a recommendation, not a statutory requirement.
