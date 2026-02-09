// =============================================================
// FILE: src/modules/dashboard/admin.controller.ts
// FINAL — Admin Dashboard Summary (counts per module)
// - Source of truth: FE summary cards
// - Returns: { items: [{ key, label, count }] }
// =============================================================

import type { RouteHandler } from 'fastify';
import { sql, type SQL } from 'drizzle-orm';
import { db } from '@/db/client';

import { siteSettings } from '@/modules/siteSettings/schema';
import { customPages } from '@/modules/customPages/schema';
import { services } from '@/modules/services/schema';
import { projects } from '@/modules/projects/schema';
import { pricingPlans } from '@/modules/pricing/schema';
import { brandLogos } from '@/modules/brand/schema';
import { resumeEntries } from '@/modules/resume/schema';
import { skillCounters, skillLogos } from '@/modules/skill/schema';
import { slider } from '@/modules/slider/schema';
import { menuItems } from '@/modules/menuItems/schema';
import { footerSections } from '@/modules/footerSections/schema';
import { newsletterSubscribers } from '@/modules/newsletter/schema';
import { contact_messages } from '@/modules/contact/schema';
import { reviews } from '@/modules/review/schema';
import { users } from '@/modules/auth/schema';
import { emailTemplates } from '@/modules/email-templates/schema';
import { notifications } from '@/modules/notifications/schema';
import { storageAssets } from '@/modules/storage/schema';
import { resourceWorkingHours } from '@/modules/availability/schema';
import { bookings } from '@/modules/bookings/schema';

/* ----------------------------- types ----------------------------- */

type DashboardSummaryItem = {
  key: string;
  label: string;
  count: number;
};

type DashboardSummary = {
  items: DashboardSummaryItem[];
};

/* ----------------------------- helpers ----------------------------- */

function toNum(v: unknown): number {
  if (typeof v === 'bigint') return Number(v);
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

async function countAll(table: any, where?: SQL): Promise<number> {
  let q = db.select({ c: sql<number>`COUNT(*)` }).from(table).$dynamic();
  if (where) q = q.where(where);
  const [row] = await q;
  return toNum(row?.c);
}

async function countDistinct(table: any, column: any, where?: SQL): Promise<number> {
  let q = db
    .select({ c: sql<number>`COUNT(DISTINCT ${column})` })
    .from(table)
    .$dynamic();
  if (where) q = q.where(where);
  const [row] = await q;
  return toNum(row?.c);
}

/* ----------------------------- handler ----------------------------- */

export const getDashboardSummaryAdmin: RouteHandler = async (req, reply) => {
  try {
    const skillsPromise = Promise.all([countAll(skillCounters), countAll(skillLogos)]).then(
      ([counters, logos]) => counters + logos,
    );

    const rows: Array<{ key: string; label: string; count: Promise<number> }> = [
      { key: 'site_settings', label: 'Site Settings', count: countDistinct(siteSettings, siteSettings.key) },
      { key: 'custom_pages', label: 'Custom Pages', count: countAll(customPages) },
      { key: 'services', label: 'Services', count: countAll(services) },
      { key: 'projects', label: 'Projects', count: countAll(projects) },
      { key: 'offers', label: 'Offers', count: Promise.resolve(0) },
      { key: 'pricing', label: 'Pricing', count: countAll(pricingPlans) },
      { key: 'brands', label: 'Brands', count: countAll(brandLogos) },
      { key: 'resume', label: 'Resume', count: countAll(resumeEntries) },
      { key: 'skills', label: 'Skills', count: skillsPromise },
      { key: 'sliders', label: 'Sliders', count: countAll(slider) },
      { key: 'menu_items', label: 'Menu Items', count: countAll(menuItems) },
      { key: 'footer_sections', label: 'Footer Sections', count: countAll(footerSections) },
      { key: 'popups', label: 'Popups', count: Promise.resolve(0) },
      { key: 'newsletter', label: 'Newsletter', count: countAll(newsletterSubscribers) },
      { key: 'contacts', label: 'Contacts', count: countAll(contact_messages) },
      { key: 'reviews', label: 'Reviews', count: countAll(reviews) },
      { key: 'users', label: 'Users', count: countAll(users) },
      { key: 'email_templates', label: 'Email Templates', count: countAll(emailTemplates) },
      { key: 'notifications', label: 'Notifications', count: countAll(notifications) },
      { key: 'storage', label: 'Storage', count: countAll(storageAssets) },
      { key: 'db', label: 'DB', count: Promise.resolve(0) },
      { key: 'availability', label: 'Availability', count: countAll(resourceWorkingHours) },
      { key: 'bookings', label: 'Bookings', count: countAll(bookings) },
    ];

    const items = await Promise.all(
      rows.map(async (row) => ({ key: row.key, label: row.label, count: await row.count })),
    );

    const payload: DashboardSummary = { items };
    return reply.send(payload);
  } catch (err) {
    req.log.error({ err }, 'dashboard_summary_failed');
    return reply.code(500).send({ error: { message: 'dashboard_summary_failed' } });
  }
};
