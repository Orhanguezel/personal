// =============================================================
// FILE: src/app/(main)/admin/(admin)/email-templates/[id]/page.tsx
// FINAL — Admin Email Template Detail/Edit Page
// =============================================================

import AdminEmailTemplatesDetailClient from './admin-email-templates-detail-client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminEmailTemplatesDetailClient id={(await params).id} />;
}
