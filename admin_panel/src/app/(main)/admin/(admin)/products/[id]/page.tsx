import AdminProductDetailClient from '../_components/admin-product-detail-client';

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminProductDetailClient id={id} />;
}
