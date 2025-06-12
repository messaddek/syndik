import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { accounts } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

interface OrgRedirectPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrgRedirectPage({
  searchParams,
}: OrgRedirectPageProps) {
  const { userId, orgId } = await auth();
  const params = await searchParams;
  const target = params.target as string;

  if (!userId) {
    redirect('/sign-in');
  }

  if (!orgId) {
    redirect('/org-switcher');
  }

  try {
    // Get user's account to check their role
    const [account] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.userId, userId), eq(accounts.orgId, orgId)))
      .limit(1);

    if (!account) {
      // Account doesn't exist, create one or redirect to setup
      const user = await currentUser();
      if (user) {
        // Create basic account record
        const _newAccount = await db
          .insert(accounts)
          .values({
            userId,
            orgId,
            name:
              `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
              'Unknown User',
            email:
              user.emailAddresses[0]?.emailAddress || 'unknown@example.com',
            role: 'member', // Default to member, can be updated later
          })
          .returning();

        // For new accounts, check if they're specifically targeting portal
        if (target === 'portal') {
          redirect('/portal');
        } else {
          // Default routing for new members
          redirect('/portal');
        }
      } else {
        redirect('/sign-in');
      }
    }

    // Handle specific target requests
    if (target === 'portal') {
      // Always allow portal access (residents and managers can both access portal)
      redirect('/portal');
    }

    // Default role-based routing
    switch (account.role) {
      case 'admin':
      case 'manager':
        redirect('/dashboard');
      case 'member':
        redirect('/portal');
      default:
        redirect('/dashboard'); // Fallback to dashboard for unknown roles
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in org-redirect:', error);
    // Fallback routing
    redirect('/dashboard');
  }
}
