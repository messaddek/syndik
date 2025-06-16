'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Mail, UserX, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ResidentAccessGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ResidentAccessGuard({
  children,
  fallback,
}: ResidentAccessGuardProps) {
  const trpc = useTRPC();
  const {
    data: accessInfo,
    isLoading,
    error,
  } = useQuery(trpc.portal.hasResidentAccess.queryOptions());

  // Show toast notification for auto-linking success
  useEffect(() => {
    if (accessInfo?.autoLinked && accessInfo?.residentName) {
      toast.success(`Welcome! Auto-linked to ${accessInfo.residentName}`);
    }
  }, [accessInfo?.autoLinked, accessInfo?.residentName]);

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
          <p className='text-muted-foreground'>
            Checking access and linking account...
          </p>
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
    }

    // Determine error message based on the specific error type
    let errorTitle = 'Portal Access Required';
    let errorDescription =
      'You need to be linked to a resident record to access the portal.';
    let showContactInfo = true;

    if (accessInfo?.error === 'NO_RESIDENT_MATCH' && accessInfo?.userEmail) {
      errorTitle = 'No Resident Record Found';
      errorDescription = `No resident record found for email: ${accessInfo.userEmail}`;
    } else if (accessInfo?.error === 'NO_EMAIL') {
      errorTitle = 'Email Address Required';
      errorDescription =
        'Your account needs a verified email address to access the portal.';
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
                      <p className='font-medium'>
                        Contact your property manager
                      </p>
                      <p className='text-muted-foreground'>
                        Ask them to send you a portal invitation to link your
                        account to your resident record.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-muted rounded-lg p-4'>
                  <div className='flex items-start space-x-3'>
                    <Mail className='mt-0.5 h-5 w-5 text-blue-500' />
                    <div className='text-sm'>
                      <p className='font-medium'>Already have an invitation?</p>
                      <p className='text-muted-foreground'>
                        Check your email and follow the invitation link to
                        complete the setup process.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {accessInfo?.message && (
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-muted-foreground text-sm'>
                  Details: {accessInfo.message}
                </p>
              </div>
            )}

            <div className='flex justify-center pt-2'>
              <Button variant='outline' asChild>
                <Link href='/dashboard'>Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
