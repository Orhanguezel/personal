import AdminCustomPagesClient from '../custompage/admin-custom_pages-client';

export default function Page() {
  return <AdminCustomPagesClient section={{ moduleKey: 'corporate', title: 'Kurumsal Sayfalar', description: 'Hakkımızda ve diğer kurumsal içerikleri yönetin.', basePath: '/admin/corporate' }} />;
}
