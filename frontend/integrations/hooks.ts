// =============================================================
// FILE: src/integrations/hooks.ts
// Barrel exports for RTK Query hooks (Xilan)
// =============================================================

// =========================
// Public / Shared endpoints
// =========================

// Auth (Public)
export * from '@/integrations/endpoints/public/users/auth_public.endpoints';
export * from '@/integrations/endpoints/public/users/profiles.endpoints';
export * from '@/integrations/endpoints/public/users/user_roles.endpoints';

// Public
export * from '@/integrations/endpoints/public/slider_public.endpoints';
export * from '@/integrations/endpoints/public/reviews.public.endpoints';
export * from '@/integrations/endpoints/public/storage_public.endpoints';

// Content / Public-Admin shared
export * from '@/integrations/endpoints/public/custom_pages.endpoints';
export * from '@/integrations/endpoints/public/contacts.endpoints';
export * from '@/integrations/endpoints/public/services.public.endpoints';

// Admin/Settings/Infra (shared endpoints in root endpoints/)
export * from '@/integrations/endpoints/public/site_settings.endpoints';
export * from '@/integrations/endpoints/public/email.endpoints';
export * from '@/integrations/endpoints/public/faqs.endpoints';

export * from '@/integrations/endpoints/public/users/profiles.endpoints';
export * from '@/integrations/endpoints/public/users/user_roles.endpoints';
export * from '@/integrations/endpoints/public/health.endpoints';
export * from '@/integrations/endpoints/public/offers_public.endpoints';
export * from '@/integrations/endpoints/public/bookings_public.endpoints';
export * from '@/integrations/endpoints/public/newsletter_public.endpoints';
export * from '@/integrations/endpoints/public/popups.public.endpoints';
export * from '@/integrations/endpoints/public/storage_public.endpoints';
export * from '@/integrations/endpoints/public/email_templates_public.endpoints';
export * from '@/integrations/endpoints/public/menu_items.endpoints';
export * from '@/integrations/endpoints/public/projects.endpoints';
export * from '@/integrations/endpoints/public/pricing.endpoints';
export * from '@/integrations/endpoints/public/resume.endpoints';
export * from '@/integrations/endpoints/public/skill.endpoints';
export * from '@/integrations/endpoints/public/brands.endpoints';
export * from '@/integrations/endpoints/public/seo.endpoints';
export * from '@/integrations/endpoints/public/footer_sections.endpoints';

// =========================
// Admin endpoints
// =========================

// Core / Auth / Dashboard / DB
export * from '@/integrations/endpoints/admin/users/auth_admin.endpoints';
export * from '@/integrations/endpoints/admin/users/roles_admin.endpoints';

export * from '@/integrations/endpoints/admin/dashboard_admin.endpoints';
export * from '@/integrations/endpoints/admin/db_admin.endpoints';

// Content / CMS
export * from '@/integrations/endpoints/admin/custom_pages_admin.endpoints';
export * from '@/integrations/endpoints/admin/contacts_admin.endpoints';
export * from '@/integrations/endpoints/admin/reviews_admin.endpoints';
export * from '@/integrations/endpoints/admin/faqs_admin.endpoints';
export * from '@/integrations/endpoints/admin/sliders_admin.endpoints';
export * from '@/integrations/endpoints/admin/services_admin.endpoints';

// System / Infra / RBAC
export * from '@/integrations/endpoints/admin/site_settings_admin.endpoints';
export * from '@/integrations/endpoints/admin/storage_admin.endpoints';
export * from '@/integrations/endpoints/admin/users/roles_admin.endpoints';
export * from '@/integrations/endpoints/admin/email_templates_admin.endpoints';
export * from '@/integrations/endpoints/admin/newsletter_admin.endpoints';
export * from '@/integrations/endpoints/admin/notifications_admin.endpoints';
export * from '@/integrations/endpoints/admin/offers_admin.endpoints';
export * from '@/integrations/endpoints/admin/bookings_admin.endpoints';
export * from '@/integrations/endpoints/admin/popups_admin.endpoints';
export * from '@/integrations/endpoints/admin/menu_items_admin.endpoints';
export * from '@/integrations/endpoints/admin/projects_admin.endpoints';
export * from '@/integrations/endpoints/admin/pricing_admin.endpoints';
export * from '@/integrations/endpoints/admin/resume.admin.endpoints';
export * from '@/integrations/endpoints/admin/skill.admin.endpoints';
export * from '@/integrations/endpoints/admin/brands.admin.endpoints';
export * from '@/integrations/endpoints/admin/footer_sections_admin.endpoints';
