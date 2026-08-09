import AdminCustomPagesClient from '../custompage/admin-custom_pages-client';

export default function Page() {
  return <AdminCustomPagesClient section={{ moduleKey: 'blog', title: 'Blog', description: 'Blog yazılarını ve yayın durumlarını yönetin.', basePath: '/admin/blog' }} />;
}
