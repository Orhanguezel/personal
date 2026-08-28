'use client';

// =============================================================
// FooterLegalIdentity — gorunur sirket kunyesi
// -------------------------------------------------------------
// NEDEN VAR (2026-08-28): resmi unvan yalnizca JSON-LD icinde yaziyordu.
// Meta isletme dogrulamasi ("Resmi isletme adinizin internet sitesinde yer
// almasi gerekir") ve TTK 39 / 5651 s.K. unvanin sayfada GORUNUR olmasini
// ister; yapisal veri sayilmaz.
//
// MARKA KURALI: burada hicbir firma adi yazmaz. Deger `site_settings.
// company_brand` icinden gelir; build aninda `config/brand.generated.json`
// icine de yazilir, boylece SSR ciktisinda da bulunur. Veri yoksa bilesen
// HICBIR SEY basmaz — yanlis markayi basmaktansa bos birakilir.
// =============================================================

import { useMemo } from 'react';

import { useStaticSiteSetting } from '@/utils/staticSiteSettings';
import { SITE_MEDIA_FALLBACKS, type LegalEntity } from '@/components/layout/siteAssets';
import { cx } from '@/integrations/shared';

type Copy = {
  taxOffice: string;
  taxNumber: string;
  mersis: string;
  tradeRegistry: string;
  registerCourt: string;
  vatId: string;
  director: string;
};

const COPY: Record<string, Copy> = {
  tr: {
    taxOffice: 'Vergi Dairesi',
    taxNumber: 'Vergi No',
    mersis: 'MERSİS',
    tradeRegistry: 'Ticaret Sicil No',
    registerCourt: 'Ticaret Sicili',
    vatId: 'Vergi Kimlik No',
    director: 'Şirket müdürü',
  },
  en: {
    taxOffice: 'Tax office',
    taxNumber: 'Tax no',
    mersis: 'MERSIS',
    tradeRegistry: 'Trade registry no',
    registerCourt: 'Commercial register',
    vatId: 'VAT ID',
    director: 'Company director',
  },
  de: {
    taxOffice: 'Finanzamt',
    taxNumber: 'Steuernummer',
    mersis: 'MERSIS',
    tradeRegistry: 'Handelsregisternummer',
    registerCourt: 'Registergericht',
    vatId: 'USt-IdNr.',
    director: 'Geschaeftsfuehrer',
  },
};

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/** DB'deki `company_brand` degerini kunye alanlarina cevirir. */
export function parseLegalEntity(raw: unknown): LegalEntity | null {
  const o = (typeof raw === 'string' ? safeParse(raw) : raw) as Record<string, any> | null;
  if (!o || typeof o !== 'object') return null;

  const legal = (o.legal && typeof o.legal === 'object' ? o.legal : {}) as Record<string, any>;

  const entity: LegalEntity = {
    name: str(o.name),
    shortName: str(o.short_name) || str(o.shortName),
    email: str(o.email),
    phone: str(o.phone),
    website: str(o.website),
    address: str(legal.adres) || str(legal.address),
    taxOffice: str(legal.vergi_dairesi) || str(legal.tax_office),
    taxNumber: str(legal.vergi_no) || str(legal.tax_number),
    mersis: str(legal.mersis),
    tradeRegistry: str(legal.ticaret_sicil) || str(legal.trade_registry),
    registerCourt: str(legal.register_court) || str(legal.handelsregister),
    vatId: str(legal.vat_id) || str(legal.ust_id),
    director: str(legal.mudur) || str(legal.director) || str(legal.sirket_muduru),
  };

  return Object.values(entity).some(Boolean) ? entity : null;
}

function safeParse(v: string): unknown {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

/**
 * Kunye yalnizca GERCEK sicil verisi varsa basilir. Sadece marka adi olan bir
 * kurulumda (ornegin sahis isletmesi verisi girilmemis) blok gorunmez; boylece
 * telif satirini tekrar etmez.
 */
function hasRegistryData(e: LegalEntity | null): e is LegalEntity {
  if (!e) return false;
  return Boolean(e.address || e.taxNumber || e.mersis || e.tradeRegistry || e.vatId || e.registerCourt);
}

export function FooterLegalIdentity({
  locale,
  className = '',
}: {
  locale: string;
  className?: string;
}) {
  const { value } = useStaticSiteSetting({ key: 'company_brand', locale });

  const entity = useMemo(
    () => parseLegalEntity(value) ?? SITE_MEDIA_FALLBACKS.legalEntity,
    [value],
  );

  const copy = COPY[locale] ?? COPY.en;

  if (!hasRegistryData(entity)) return null;

  const registryParts: string[] = [];
  if (entity.taxOffice && entity.taxNumber) {
    registryParts.push(`${copy.taxOffice}: ${entity.taxOffice} — ${entity.taxNumber}`);
  } else if (entity.taxNumber) {
    registryParts.push(`${copy.taxNumber}: ${entity.taxNumber}`);
  } else if (entity.taxOffice) {
    registryParts.push(`${copy.taxOffice}: ${entity.taxOffice}`);
  }
  if (entity.mersis) registryParts.push(`${copy.mersis}: ${entity.mersis}`);
  if (entity.tradeRegistry) registryParts.push(`${copy.tradeRegistry}: ${entity.tradeRegistry}`);
  if (entity.registerCourt) registryParts.push(`${copy.registerCourt}: ${entity.registerCourt}`);
  if (entity.vatId) registryParts.push(`${copy.vatId}: ${entity.vatId}`);
  if (entity.director) registryParts.push(`${copy.director}: ${entity.director}`);

  const contactParts: string[] = [];
  if (entity.email) contactParts.push(entity.email);
  if (entity.phone) contactParts.push(entity.phone);

  return (
    <address className={cx('footer-legal-identity fs-7 lh-lg mb-3 fst-normal', className)}>
      {entity.name ? <span className="d-block fw-bold">{entity.name}</span> : null}
      {entity.address ? <span className="d-block">{entity.address}</span> : null}
      {registryParts.length ? <span className="d-block">{registryParts.join(' · ')}</span> : null}
      {contactParts.length ? <span className="d-block">{contactParts.join(' · ')}</span> : null}
    </address>
  );
}

export default FooterLegalIdentity;
