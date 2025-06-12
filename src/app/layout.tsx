import type { Metadata } from 'next';

import './globals.css';
import { LayoutProvider } from '@/components/layout-provider';

export const metadata: Metadata = {
  title: 'Syndik - Residential Syndicate Management',
  description: 'Modern SaaS platform for managing residential syndicates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
