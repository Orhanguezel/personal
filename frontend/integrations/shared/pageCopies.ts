// =============================================================
// FILE: src/integrations/shared/pageCopies.ts
// FINAL — Static page copy (site_settings) normalizers
// =============================================================

import { parseJsonObject, uiText } from './common';

// -----------------------------
// Services Page
// -----------------------------

export type ServicesPageCopy = {
  badge: string;
  title_html: string;
  intro_html: string;
  cta_label: string;
  loading: string;
  error: string;
  empty: string;
  highlight_label: string;
  details_label: string;
};

export function normalizeServicesPageCopy(val: unknown): ServicesPageCopy {
  const o = parseJsonObject(val);

  return {
    badge: uiText(o.badge) || 'Leistungen',
    title_html:
      uiText(o.title_html) ||
      'Digitale Ideen <span class="text-300">werden zu schnellen, klaren</span> Web-Erlebnissen',
    intro_html:
      uiText(o.intro_html) ||
      'Webdesign, Entwicklung und Automatisierung aus einer Hand: sauber geplant, performant umgesetzt und auf Anfragen ausgelegt.',
    cta_label: uiText(o.cta_label) || 'Angebot anfragen',
    loading: uiText(o.loading) || 'Wird geladen...',
    error: uiText(o.error) || 'Leistungen konnten nicht geladen werden.',
    empty: uiText(o.empty) || 'Keine Leistungen gefunden.',
    highlight_label: uiText(o.highlight_label) || 'Schwerpunkt',
    details_label: uiText(o.details_label) || 'Details',
  };
}

// -----------------------------
// Work Page
// -----------------------------

export type WorkPageCopy = {
  badge: string;
  title_html: string;
  intro_html: string;
  loading_title: string;
  label_client: string;
  label_completion_time: string;
  label_tools: string;
  updating: string;
  empty_title: string;
  empty_text: string;
};

export function normalizeWorkPageCopy(val: unknown): WorkPageCopy {
  const o = parseJsonObject(val);

  return {
    badge: uiText(o.badge) || 'Ausgewählte Projekte',
    title_html:
      uiText(o.title_html) ||
      'Ausgewählte <span class="text-300">Webprojekte mit klarer</span> Strategie und Umsetzung',
    intro_html:
      uiText(o.intro_html) ||
      'Ein Blick auf Websites, Plattformen und Automatisierungen, die für reale Geschäftsziele entwickelt wurden.',
    loading_title: uiText(o.loading_title) || 'Wird geladen...',
    label_client: uiText(o.label_client) || 'Kunde',
    label_completion_time: uiText(o.label_completion_time) || 'Projektzeit',
    label_tools: uiText(o.label_tools) || 'Technologien',
    updating: uiText(o.updating) || 'Wird aktualisiert...',
    empty_title: uiText(o.empty_title) || 'Keine Projekte gefunden',
    empty_text: uiText(o.empty_text) || 'Bitte Projekte im Adminbereich hinzufügen.',
  };
}

// -----------------------------
// Pricing Page
// -----------------------------

export type PricingPageCopy = {
  badge: string;
  title_html: string;
  intro_html: string;
  loading: string;
  error: string;
  empty: string;
  cta_default_label: string;
  faq_title: string;
  faq_empty: string;
  faq_error: string;
};

export function normalizePricingPageCopy(val: unknown): PricingPageCopy {
  const o = parseJsonObject(val);

  return {
    badge: uiText(o.badge) || 'Preise',
    title_html:
      uiText(o.title_html) || 'Flexible <span class="text-300">Pakete für unterschiedliche</span> Budgets',
    intro_html:
      uiText(o.intro_html) ||
      'Transparente Einstiegspakete fuer Websites, Relaunches und laufende Betreuung.',
    loading: uiText(o.loading) || 'Wird geladen...',
    error: uiText(o.error) || 'Preise oder FAQ konnten nicht geladen werden.',
    empty: uiText(o.empty) || 'Keine Preispakete gefunden.',
    cta_default_label: uiText(o.cta_default_label) || 'Anfragen',
    faq_title: uiText(o.faq_title) || 'Haeufige Fragen',
    faq_empty: uiText(o.faq_empty) || 'Keine FAQs gefunden.',
    faq_error: uiText(o.faq_error) || 'FAQs konnten nicht geladen werden.',
  };
}

// -----------------------------
// Blog Page
// -----------------------------

export type BlogPageCopy = {
  badge: string;
  title_html: string;
  intro_html: string;
  loading: string;
  error: string;
  read_time: string;
  default_category: string;
};

export function normalizeBlogPageCopy(val: unknown): BlogPageCopy {
  const o = parseJsonObject(val);

  return {
    badge: uiText(o.badge) || 'Aktueller Blog',
    title_html:
      uiText(o.title_html) ||
      'Einblicke in <span class="text-dark">Webdesign, SEO und</span> digitale Prozesse',
    intro_html:
      uiText(o.intro_html) ||
      'Praxisnahe Artikel zu Websites, Automatisierung, Performance und nachhaltiger Sichtbarkeit.',
    loading: uiText(o.loading) || 'Wird geladen...',
    error: uiText(o.error) || 'Beiträge konnten nicht geladen werden.',
    read_time: uiText(o.read_time) || '3 Min. Lesezeit',
    default_category: uiText(o.default_category) || 'Blog',
  };
}
