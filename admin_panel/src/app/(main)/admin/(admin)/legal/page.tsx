import AdminCustomPagesClient from '../custompage/admin-custom_pages-client';

export default function Page() {
  return <AdminCustomPagesClient section={{ moduleKey: 'legal', title: 'Yasal Sayfalar', description: 'Politika, sözleşme ve yasal bilgilendirme metinlerini yönetin.', basePath: '/admin/legal' }} />;
}
