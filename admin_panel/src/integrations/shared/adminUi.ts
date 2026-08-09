// =============================================================
// FILE: src/integrations/shared/adminUi.ts
// FINAL — Admin UI copy (site_settings.ui_admin) normalizer
// =============================================================

import { parseJsonObject, uiText } from '@/integrations/shared';
import type { AdminNavCopy } from '@/navigation/sidebar/sidebar-items';
import { ADMIN_UI_DEFAULTS } from '@/config/admin-ui-defaults';

export type AdminUiCommonCopy = {
  actions: {
    create: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    refresh: string;
    search: string;
    filter: string;
    close: string;
    back: string;
    confirm: string;
  };
  states: {
    loading: string;
    error: string;
    empty: string;
    updating: string;
    saving: string;
  };
};

export type AdminUiPageCopy = Record<string, string>;

export type AdminUiCopy = {
  app_name: string;
  nav: AdminNavCopy;
  common: AdminUiCommonCopy;
  pages: Record<string, AdminUiPageCopy>;
};

const emptyCommon: AdminUiCommonCopy = {
  actions: {
    create: '',
    edit: '',
    delete: '',
    save: '',
    cancel: '',
    refresh: '',
    search: '',
    filter: '',
    close: '',
    back: '',
    confirm: '',
  },
  states: {
    loading: '',
    error: '',
    empty: '',
    updating: '',
    saving: '',
  },
};

const emptyNav: AdminNavCopy = {
  labels: {
    general: '',
    content: '',
    marketing: '',
    communication: '',
    system: '',
  },
  items: {
    dashboard: '',
    site_settings: '',
    custom_pages: '',
    services: '',
    projects: '',
    pricing: '',
    brands: '',
    resume: '',
    skills: '',
    menu_items: '',
    footer_sections: '',
    faqs: '',
    social_posts: '',
    newsletter: '',
    contacts: '',
    reviews: '',
    support: '',
    chat: '',
    mail: '',
    users: '',
    email_templates: '',
    notifications: '',
    storage: '',
    db: '',
    audit: '',
    reports: '',
  },
};

/**
 * PANEL METINLERI — VARSAYILANLARIN UZERINE DB.
 *
 * Onceden eksik anahtar BOS DIZGE donuyordu; `ui_admin` ayarinin yalnizca bir
 * bolumu dolu olan deployment'larda (gzlteknoloji) sayfa basliklari ve sutun
 * adlari BOS goruntuleniyor, ekran okunamaz hale geliyordu.
 * Artik once src/config/admin-ui-defaults.ts okunuyor, DB degeri varsa onu
 * eziyor. Tek kanal DB olarak kaliyor; kod yalnizca bosluk birakmiyor.
 */
function withDefault(value: unknown, fallback: string | undefined): string {
  const text = uiText(value);
  return text || String(fallback ?? '');
}

export function normalizeAdminUiCopy(raw: unknown): AdminUiCopy {
  const o = parseJsonObject(raw);
  const navRaw = parseJsonObject(o.nav);
  const labelsRaw = parseJsonObject(navRaw.labels);
  const itemsRaw = parseJsonObject(navRaw.items);

  const labels: AdminNavCopy['labels'] = {
    general: withDefault(labelsRaw.general, ADMIN_UI_DEFAULTS.nav.labels.general),
    content: withDefault(labelsRaw.content, ADMIN_UI_DEFAULTS.nav.labels.content),
    marketing: withDefault(labelsRaw.marketing, ADMIN_UI_DEFAULTS.nav.labels.marketing),
    communication: withDefault(labelsRaw.communication, ADMIN_UI_DEFAULTS.nav.labels.communication),
    system: withDefault(labelsRaw.system, ADMIN_UI_DEFAULTS.nav.labels.system),
  };

  const items: AdminNavCopy['items'] = {
    dashboard: withDefault(itemsRaw.dashboard, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).dashboard),
    site_settings: withDefault(itemsRaw.site_settings, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).site_settings),
    custom_pages: withDefault(itemsRaw.custom_pages, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).custom_pages),
    services: withDefault(itemsRaw.services, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).services),
    projects: withDefault(itemsRaw.projects, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).projects),
    pricing: withDefault(itemsRaw.pricing, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).pricing),
    brands: withDefault(itemsRaw.brands, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).brands),
    resume: withDefault(itemsRaw.resume, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).resume),
    skills: withDefault(itemsRaw.skills, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).skills),
    menu_items: withDefault(itemsRaw.menu_items, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).menu_items),
    footer_sections: withDefault(itemsRaw.footer_sections, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).footer_sections),
    faqs: withDefault(itemsRaw.faqs, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).faqs),
    social_posts: withDefault(itemsRaw.social_posts, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).social_posts),
    newsletter: withDefault(itemsRaw.newsletter, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).newsletter),
    contacts: withDefault(itemsRaw.contacts, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).contacts),
    reviews: withDefault(itemsRaw.reviews, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).reviews),
    support: withDefault(itemsRaw.support, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).support),
    chat: withDefault(itemsRaw.chat, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).chat),
    mail: withDefault(itemsRaw.mail, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).mail),
    users: withDefault(itemsRaw.users, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).users),
    email_templates: withDefault(itemsRaw.email_templates, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).email_templates),
    notifications: withDefault(itemsRaw.notifications, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).notifications),
    storage: withDefault(itemsRaw.storage, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).storage),
    db: withDefault(itemsRaw.db, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).db),
    audit: withDefault(itemsRaw.audit, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).audit),
    reports: withDefault(itemsRaw.reports, (ADMIN_UI_DEFAULTS.nav.items as Record<string, string>).reports),
  };

  const commonRaw = parseJsonObject(o.common);
  const actionsRaw = parseJsonObject(commonRaw.actions);
  const statesRaw = parseJsonObject(commonRaw.states);

  const common: AdminUiCommonCopy = {
    actions: {
      create: withDefault(actionsRaw.create, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).create),
      edit: withDefault(actionsRaw.edit, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).edit),
      delete: withDefault(actionsRaw.delete, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).delete),
      save: withDefault(actionsRaw.save, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).save),
      cancel: withDefault(actionsRaw.cancel, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).cancel),
      refresh: withDefault(actionsRaw.refresh, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).refresh),
      search: withDefault(actionsRaw.search, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).search),
      filter: withDefault(actionsRaw.filter, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).filter),
      close: withDefault(actionsRaw.close, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).close),
      back: withDefault(actionsRaw.back, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).back),
      confirm: withDefault(actionsRaw.confirm, (ADMIN_UI_DEFAULTS.common.actions as Record<string, string>).confirm),
    },
    states: {
      loading: withDefault(statesRaw.loading, (ADMIN_UI_DEFAULTS.common.states as Record<string, string>).loading),
      error: withDefault(statesRaw.error, (ADMIN_UI_DEFAULTS.common.states as Record<string, string>).error),
      empty: withDefault(statesRaw.empty, (ADMIN_UI_DEFAULTS.common.states as Record<string, string>).empty),
      updating: withDefault(statesRaw.updating, (ADMIN_UI_DEFAULTS.common.states as Record<string, string>).updating),
      saving: withDefault(statesRaw.saving, (ADMIN_UI_DEFAULTS.common.states as Record<string, string>).saving),
    },
  };

  const pagesRaw = parseJsonObject(o.pages);
  const defaultPages = ADMIN_UI_DEFAULTS.pages as Record<string, Record<string, string>>;
  const pages: Record<string, AdminUiPageCopy> = {};

  // Varsayilani olan her sayfa, DB'de hic tanimlanmamis olsa bile dolu gelir.
  for (const key of new Set([...Object.keys(defaultPages), ...Object.keys(pagesRaw)])) {
    const row = parseJsonObject(pagesRaw[key]);
    const defaults = defaultPages[key] ?? {};
    const out: AdminUiPageCopy = {};
    for (const rk of new Set([...Object.keys(defaults), ...Object.keys(row)])) {
      out[rk] = withDefault(row[rk], defaults[rk]);
    }
    pages[key] = out;
  }

  return {
    app_name: withDefault(o.app_name, ADMIN_UI_DEFAULTS.app_name),
    nav: {
      labels: { ...emptyNav.labels, ...labels },
      items: { ...emptyNav.items, ...items },
    },
    common: {
      actions: { ...emptyCommon.actions, ...common.actions },
      states: { ...emptyCommon.states, ...common.states },
    },
    pages,
  };
}
