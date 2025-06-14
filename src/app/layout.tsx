import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syndik - Residential Syndicate Management',
  description: 'Modern SaaS platform for managing residential syndicates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
