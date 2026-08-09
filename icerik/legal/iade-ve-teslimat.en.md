> DRAFT — attorney review is required before publication. This document does not constitute legal advice.

# Refund and Delivery Terms

*This is an English courtesy translation. The Turkish version is the legally binding text; these terms are governed by Turkish law.*

These are the delivery and refund terms for the services offered via gzlteknoloji.com by GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. (Gemlik/Bursa · Gemlik Tax Office — 4542302453 · info@gzlteknoloji.com · gzlteknoloji.com). Everything we offer is a **service with digital delivery**; we do **not** sell physical goods and nothing is shipped by courier.

## 1. Definition of Digital Service Delivery

Depending on its nature, your service is deemed "delivered" through one of the following:

1. **Transmission of access credentials:** sending the username/password and administration details of the panel, website, report or system to the e-mail address you provided with your order.
2. **Completion of installation:** installing the software/website on your own domain, server or account and activating it in working condition.
3. **Transmission of digital content:** delivering the analysis, report, design file or similar output to you electronically.

Delivery occurs at the moment the relevant e-mail is sent or the system is activated for your use.

## 2. Delivery Times

- The delivery time of each service package is announced **in days on the order page** and varies between packages (from 1–2 days for small jobs up to 45 days for comprehensive projects).
- The period starts upon confirmation of payment **and** your complete provision of the information, content and access credentials required for performance (domain name, server access, brand assets, texts, etc.).
- Delays attributable to you (content not provided, feedback not given, access not granted) are added to the delivery time.
- In the event of an unforeseen delay, you will be notified by e-mail and a new delivery date will be proposed.

## 3. Revision Entitlement

- The **number of revisions included** in each package is stated on the order page and varies by package tier.
- A revision covers correction and minor change requests that remain **within the scope of the order**. Requests for new features, new pages/modules or scope extensions are not revisions and are charged separately.
- Revision requests should be submitted in writing to info@gzlteknoloji.com within a reasonable period after delivery (recommended: 14 days).

## 4. Cancellation and Refund Terms

### 4.1 Right of withdrawal for consumers

- If you qualify as a consumer, you have a right of withdrawal within **14 days** from the date the contract is concluded (subject to the exceptions in the Turkish Regulation on Distance Contracts).
- **Exceptions — cases where the right of withdrawal cannot be exercised:**
  - services whose performance has begun **with your consent** given at the payment step (where work started following that consent);
  - services **performed instantly in the electronic environment** and digital content/intangible goods **delivered instantly** (reports, licences, access credentials, etc. made available upon purchase).
- In the event of a valid withdrawal, the amount you paid is refunded to your payment instrument, free of charge, within **14 days** of our receipt of your notice.

### 4.2 Orders whose performance has not yet begun

If you cancel an order before performance has begun, the full amount collected is refunded.

### 4.3 Equitable fee in the event of partial performance

Where a service whose performance has begun is terminated before completion:

- the **fee corresponding to the portion performed** up to that point is calculated **equitably**, based on the ratio of the work performed to the total work (completed work items, hours spent, and interim deliverables handed over);
- the remaining amount is refunded within 14 days; the fee for the performed portion is not refundable;
- upon request, a written breakdown of the calculation is provided to you.

### 4.4 Subscription-based services

- Monthly subscriptions (maintenance plans, social media management, panel subscriptions, etc.) renew at the end of each period; you may terminate the subscription by e-mail notice **before the next period begins**.
- The fee for a period that has already started is, as a rule, not refunded, since the service has been provided during that period; no fee is charged, or fees are refunded, for periods in which the service could not be provided at all.

### 4.5 Non-consumer (B2B) buyers

Legal-entity merchants and buyers acting for commercial or professional purposes do not qualify as consumers; the right of withdrawal does not apply to them. Cancellation and refunds are governed by the contract between the parties and the general provisions of the Turkish Commercial Code and the Turkish Code of Obligations.

## 5. Refund Method

- Refunds are made to the **same payment instrument** used for payment (credit/debit card — via the Iyzico infrastructure).
- The time it takes for the refund to appear on your card may vary depending on your bank.

## 6. Contact

For all cancellation, refund and revision requests: **info@gzlteknoloji.com** — {{TELEFON}}

---

## Sources / basis

- **Company identity source:** Official company records (`vps-guezel/sirket/turkiye/` — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → `{{TELEFON}}` placeholder remains.
- **Delivery times (1–45 days) and revisions (0–10):** `backend/src/db/seed/sql/032_service_packages_schema_seed.sql` → `service_packages.delivery_days` and `service_packages.revisions`; both the "stated on the order page" wording and the day range derive from this seed.
- **Subscription/setup distinction:** `backend/src/db/seed/sql/028_pricing_packages_seed.sql` → `pricing_plans.price_unit` (`setup_monthly`/`month`) and the monthly maintenance/social media plans.
- **Payment/refund channel:** Phase 2 Iyzico integration (task brief).
- **Legislation:** Law No. 6502 and the Regulation on Distance Contracts (withdrawal period, refund period, service exceptions, partial performance). The revision request window (14 days) is a **commercial suggestion**, not a statutory rule — see `docs/icerik/_tmp/EKSIK_legal.md`.
