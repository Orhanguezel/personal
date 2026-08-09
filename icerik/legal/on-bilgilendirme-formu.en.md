> DRAFT — attorney review is required before publication. This document does not constitute legal advice.

# Preliminary Information Form

*This is an English courtesy translation. The Turkish version is the legally binding text; this form and the related agreement are governed by Turkish law.*

This Preliminary Information Form has been prepared to inform the BUYER before the order is confirmed, pursuant to Turkish Law No. 6502 on the Protection of Consumers and the Regulation on Distance Contracts.

## 1. Identity and Contact Details of the Seller

| Field | Information |
|-------|-------------|
| Legal name | GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. |
| Registered seat | Gemlik/Bursa, Türkiye |
| Address | Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa |
| Tax office / Tax ID | Gemlik Tax Office — 4542302453 |
| MERSIS No | 0454230245300001 |
| Trade Registry No | 7069 (Gemlik) |
| Date of incorporation | 10.06.2026 |
| Phone | {{TELEFON}} |
| E-mail | info@gzlteknoloji.com |
| Website | gzlteknoloji.com |

The above e-mail address and phone number may be used for complaints and requests.

## 2. Essential Characteristics of the Service

2.1. The services offered — software development, website and e-commerce platform setup, data analysis and reporting, automation/panel setup, technical consulting and subscription-based management panels — constitute **performance of services and digital delivery**. **No physical goods are sold and no courier shipment takes place.**

2.2. The scope of the selected package, the work items it includes, the number of revisions and the delivery time are announced per package on the order page and are binding as displayed at the time of ordering.

## 3. Total Price Including Taxes

3.1. The total price of the service, inclusive of all taxes, is displayed in Turkish Lira (TL) on the order page and at the payment step. No additional charge (shipping, delivery costs, etc.) is requested from the BUYER beyond the displayed amount.

3.2. For subscription-based services, the setup fee and the monthly fee are shown separately and clearly; the monthly fee is collected at the beginning of each period.

## 4. Payment and Performance

4.1. **Payment:** by credit card / debit card through the Iyzico payment infrastructure. Your card details are not stored by the SELLER.

4.2. **Performance:** performance of the service commences upon confirmation of payment and your provision of the information, content and access credentials required for performance. The service is performed within **the delivery time stated on the order page**. Digital delivery is deemed completed upon transmission of access/administration credentials by e-mail, completion and activation of the installation in your own environment, or electronic transmission of the digital content.

## 5. Right of Withdrawal: Period, Conditions and Exceptions

5.1. A BUYER qualifying as a consumer has the right to withdraw from this distance service contract within **fourteen (14) days from the date the contract is concluded**, without giving any reason and without paying any penalty.

5.2. The withdrawal notice must be sent, before the expiry of this period, in writing or via a durable data carrier to **info@gzlteknoloji.com**. The following model form may be used (it is not mandatory):

> **Model Withdrawal Form**
> — To: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa, info@gzlteknoloji.com
> — I hereby declare that I exercise my right of withdrawal from the contract for the sale of the following service.
> — Order date / Order no.: …
> — Subject of the service: …
> — Name and address of the consumer: …
> — Date and (if notified on paper) signature: …

5.3. In the event of a valid withdrawal, the amount collected shall be refunded within 14 days of receipt of the notice by the SELLER, in a manner compatible with your payment instrument and free of charge.

5.4. **Exceptions to the right of withdrawal** — the right of withdrawal cannot be exercised in the following cases:

   a) **Services whose performance has begun with your consent:** where, at the payment step, you consent to the immediate commencement of performance and have been informed that you will lose your right of withdrawal once performance has begun, the right of withdrawal cannot be exercised after performance has commenced.
   b) **Services performed instantly in the electronic environment and intangible goods delivered instantly:** no right of withdrawal exists for digital content, reports, licences/access credentials and similar deliverables made available immediately upon purchase.

5.5. **Since legal-entity merchants and buyers acting for commercial or professional purposes do not qualify as consumers**, the right of withdrawal and other rights based on consumer legislation do not apply to such buyers.

## 6. Partial Refund for Services Whose Performance Has Begun

Where the withdrawal exceptions do not apply, or where the contract is terminated by the parties, the amount corresponding to the performed portion shall be calculated equitably on the basis of the ratio of the work performed to the total work, and the remaining amount shall be refunded. Details: "Refund and Delivery Terms" page.

## 7. Complaints and Dispute Resolution

7.1. You may first address complaints and requests to **info@gzlteknoloji.com**; applications are answered as soon as possible.

7.2. A BUYER qualifying as a consumer may, in the event of a dispute, apply to the **Consumer Arbitration Committee** of their place of residence or of the place where the consumer transaction was made, within the monetary limits determined annually by the Turkish Ministry of Trade, and to the **Consumer Court** for disputes exceeding those limits.

## 8. Validity and Confirmation

8.1. This form is presented for the BUYER's review before the order is confirmed; by confirming the order, the BUYER confirms having received the preliminary information contained in this form.

8.2. A copy of this form and of the distance sales agreement is sent to the BUYER via a durable data carrier (e-mail).

---

## Sources / basis

- **Company identity source:** Official company records (`vps-guezel/sirket/turkiye/` — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → `{{TELEFON}}` placeholder remains.
- **Delivery times:** `backend/src/db/seed/sql/032_service_packages_schema_seed.sql` → `service_packages.delivery_days` (1–45 days per package) and `revisions`; the "delivery time stated on the order page" wording derives from this field.
- **Setup vs. monthly fee:** `backend/src/db/seed/sql/028_pricing_packages_seed.sql` → `pricing_plans.price_unit`.
- **Payment:** Phase 2 Iyzico integration (task brief).
- **Legislation:** Law No. 6502 and the Regulation on Distance Contracts (preliminary information duty, 14-day withdrawal period, model withdrawal form, exceptions). Article numbers deliberately omitted — see `docs/icerik/_tmp/EKSIK_legal.md`.
