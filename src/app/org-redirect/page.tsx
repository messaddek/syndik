import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { OrgRedirectClient } from './org-redirect-client';

interface OrgRedirectPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrgRedirectPage({
  searchParams,
}: OrgRedirectPageProps) {
  const { userId, orgId } = await auth();
  const params = await searchParams;
  const target = params.target as string;

  // Handle immediate redirects for missing auth
  if (!userId) {
    redirect('/sign-in');
  }

  if (!orgId) {
    redirect('/org-switcher');
  }

  // Pass auth info to client component for role-based routing with loading
  return <OrgRedirectClient userId={userId} orgId={orgId} target={target} />;
}
