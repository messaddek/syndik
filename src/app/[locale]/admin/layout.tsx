import { AdminLayout } from '@/modules/admin/components/admin-layout';

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
