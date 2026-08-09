import AdminCustomPageDetailClient from '../../custompage/admin-custom_pages-detail-client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminCustomPageDetailClient id={id} moduleKey="legal" basePath="/admin/legal" />;
}
