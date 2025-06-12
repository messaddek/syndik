import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { trpc, getQueryClient } from '@/trpc/server';
import { SettingsContent } from './settings-content';

export default async function SettingsPage() {
  // Prefetch data on the server
  const queryClient = getQueryClient();
  // Prefetch all the data that the settings page needs

  void queryClient.prefetchQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );
  void queryClient.prefetchQuery(
    trpc.organizations.getCurrentOrganization.queryOptions()
  );
  void queryClient.prefetchQuery(
    trpc.organizations.getStatistics.queryOptions()
  );
  void queryClient.prefetchQuery(
    trpc.accounts.getUserPreferences.queryOptions()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsContent />
    </HydrationBoundary>
  );
}
