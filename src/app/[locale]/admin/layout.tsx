import { AdminLayout } from '@/modules/admin/components/admin-layout';

const AdminPortalLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminPortalLayout;
