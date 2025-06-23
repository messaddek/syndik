'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Mail,
  UserX,
  Loader2,
  RefreshCw,
  // Bug,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ResidentAccessGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ResidentAccessGuard = ({
  children,
  fallback,
}: ResidentAccessGuardProps) => {
  const trpc = useTRPC();
  const t = useTranslations('portal.access');
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: accessInfo,
    isLoading,
    error,
    refetch,
  } = useQuery(trpc.portal.hasResidentAccess.queryOptions()); // Show toast notification for auto-linking success
  useEffect(() => {
    if (accessInfo?.autoLinked && accessInfo?.residentName) {
      toast.success(`${t('welcomeAutoLinked')} ${accessInfo.residentName}`);

      // If auto-linking just happened, refresh queries after a small delay
      // to ensure database consistency
      setTimeout(() => {
        console.log(
          '🔄 ResidentAccessGuard - Auto-link detected, invalidating related queries...'
        );
        queryClient.invalidateQueries({ queryKey: ['portal'] });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
      }, 200);
    }
  }, [accessInfo?.autoLinked, accessInfo?.residentName, t, queryClient]);

  // Listen for account changes and refresh resident access when account is initialized
  useEffect(() => {
    const handleAccountChange = () => {
      console.log(
        '🔄 ResidentAccessGuard - Account changed, refetching access...'
      );
      refetch();
    };

    // Listen for account query invalidations (when account is initialized)
    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      if (
        event.type === 'updated' &&
        event.query.queryKey.includes('accounts.getCurrentAccount')
      ) {
        handleAccountChange();
      }
    });

    return unsubscribe;
  }, [queryClient, refetch]);

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('🏠 ResidentAccessGuard - Loading:', isLoading);
    console.log('🏠 ResidentAccessGuard - Error:', error);
    console.log('🏠 ResidentAccessGuard - Access Info:', accessInfo);
  }

  if (isLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='space-y-4 text-center'>
          <Loader2 className='border-primary mx-auto h-8 w-8 animate-spin' />
          <p className='text-muted-foreground'>{t('checkingAccess')}</p>
        </div>
      </div>
    );
  }
  if (error || !accessInfo?.hasAccess) {
    console.log(
      '🚫 ResidentAccessGuard - Access denied. Error:',
      error,
      'AccessInfo:',
      accessInfo
    );

    if (fallback) {
      return <>{fallback}</>;
    } // Determine error message based on the specific error type
    let errorTitle = t('portalAccessRequired');
    let errorDescription = t('accessRequiredDescription');
    let showContactInfo = true;

    if (accessInfo?.error === 'NO_RESIDENT_MATCH' && accessInfo?.userEmail) {
      errorTitle = t('noResidentFound');
      errorDescription = `${t('noResidentFoundDescription')} ${accessInfo.userEmail}`;
    } else if (accessInfo?.error === 'NO_EMAIL') {
      errorTitle = t('emailRequired');
      errorDescription = t('emailRequiredDescription');
      showContactInfo = false;
    }

    return (
      <div className='flex min-h-[400px] items-center justify-center p-6'>
        <Card className='max-w-md'>
          <CardHeader className='text-center'>
            <div className='bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
              <UserX className='text-destructive h-6 w-6' />
            </div>
            <CardTitle>{errorTitle}</CardTitle>
            <CardDescription>{errorDescription}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {showContactInfo && (
              <>
                <div className='bg-muted rounded-lg p-4'>
                  <div className='flex items-start space-x-3'>
                    <AlertTriangle className='mt-0.5 h-5 w-5 text-amber-500' />
                    <div className='text-sm'>
                      <p className='font-medium'>{t('contactManager')}</p>
                      <p className='text-muted-foreground'>
                        {t('contactManagerDescription')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-muted rounded-lg p-4'>
                  <div className='flex items-start space-x-3'>
                    <Mail className='mt-0.5 h-5 w-5 text-blue-500' />
                    <div className='text-sm'>
                      <p className='font-medium'>{t('haveInvitation')}</p>
                      <p className='text-muted-foreground'>
                        {t('haveInvitationDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {accessInfo?.message && (
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-muted-foreground text-sm'>
                  {t('details')} {accessInfo.message}
                </p>
              </div>
            )}
            <div className='flex justify-center gap-2 pt-2'>
              <Button
                variant='outline'
                disabled={isRefreshing}
                onClick={async () => {
                  console.log(
                    '🔄 ResidentAccessGuard - Manual refresh triggered'
                  );
                  setIsRefreshing(true);
                  try {
                    await refetch();
                    toast.success(
                      t('refreshSuccess') || 'Access check refreshed'
                    );
                  } catch (error) {
                    console.error('Failed to refresh access:', error);
                    toast.error(
                      t('refreshError') || 'Failed to refresh access'
                    );
                  } finally {
                    setIsRefreshing(false);
                  }
                }}
              >
                {isRefreshing ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <RefreshCw className='mr-2 h-4 w-4' />
                )}
                {t('refresh')}
              </Button>
              {/* <Button
                variant='outline'
                size='sm'
                onClick={async () => {
                  console.log('🐛 ResidentAccessGuard - Debug info');
                  console.log('🐛 Current access info:', accessInfo);
                  console.log('🐛 Error details:', error); // Call the debug procedure for more detailed diagnostics
                  try {
                    toast.info('Running advanced diagnostics...');
                    const {data: diagnostics} = useQuery(trpc.portal.debugAutoLinking.queryOptions())
                    console.log(
                      '🔬 Advanced auto-linking diagnostics:',
                      diagnostics
                    );

                    if (diagnostics.error) {
                      toast.error(`Diagnostics error: ${diagnostics.error}`);
                    } else {
                      toast.success(
                        'Diagnostics complete - check console for details'
                      );

                      // Show a summary toast with key info
                      if (diagnostics.matchingResident) {
                        toast.info(
                          `Found matching resident: ${diagnostics.matchingResident.name} (${diagnostics.matchingResident.email})`
                        );
                      } else {
                        toast.warning('No matching resident found');
                      }

                      // Show user record status
                      if (
                        diagnostics.userInfo?.currentUserRecords?.length > 0
                      ) {
                        const userInCurrentOrg =
                          diagnostics.userInfo.currentUserRecords.find(
                            record =>
                              record.orgId === diagnostics.userInfo.orgId
                          );

                        if (userInCurrentOrg?.residentId) {
                          toast.success(
                            `User record has residentId (${userInCurrentOrg.residentId}) set`
                          );
                        } else if (userInCurrentOrg) {
                          toast.error(
                            'User record exists but residentId not set'
                          );
                        } else {
                          toast.warning(
                            'User record exists but not in current organization'
                          );
                        }
                      } else {
                        toast.error('No user record exists');
                      }
                    }
                  } catch (diagError) {
                    console.error('Failed to run diagnostics:', diagError);
                    toast.error('Failed to run diagnostics');
                  }
                }}
              >
                <Bug className='mr-2 h-4 w-4' />
                Debug
              </Button> */}
              <Button variant='outline' asChild>
                <Link href='/dashboard'>{t('backToDashboard')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
