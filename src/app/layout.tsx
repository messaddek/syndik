import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syndik - Residential Syndicate Management',
  description: 'Modern SaaS platform for managing residential syndicates',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
