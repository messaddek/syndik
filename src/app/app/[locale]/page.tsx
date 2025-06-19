import { auth } from '@clerk/nextjs/server';
import { redirect } from '@/i18n/routing';

export default async function AppIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  const { userId, orgId } = await auth();

  // If not authenticated, redirect to main site sign-in
  if (!userId) {
    redirect({ href: '/sign-in', locale: params.locale });
  }

  // If authenticated but no organization, go to org switcher
  if (!orgId) {
    redirect({ href: '/org-switcher', locale: params.locale });
  }

  // If authenticated and has organization, do role-based redirect
  redirect({ href: '/org-redirect', locale: params.locale });
}
