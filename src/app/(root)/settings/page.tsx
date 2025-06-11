import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { trpc, getQueryClient } from '@/trpc/server';
import { SettingsContent } from './settings-content';

export default async function SettingsPage() {
  // Prefetch data on the server
  const queryClient = getQueryClient();
  // Prefetch all the data that the settings page needs
  await Promise.all([
    queryClient.prefetchQuery(trpc.accounts.getCurrentAccount.queryOptions()),
    queryClient.prefetchQuery(
      trpc.organizations.getCurrentOrganization.queryOptions()
    ),
    queryClient.prefetchQuery(trpc.organizations.getStatistics.queryOptions()),
    queryClient.prefetchQuery(trpc.accounts.getUserPreferences.queryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsContent />
    </HydrationBoundary>
  );
}
