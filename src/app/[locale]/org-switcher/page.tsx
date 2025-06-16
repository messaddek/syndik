'use client';

import { OrganizationList } from '@clerk/nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Users, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function OrgSwitcherPage() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-4xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 flex items-center justify-center'>
            <Building2 className='text-primary mr-3 h-12 w-12' />
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
              Select Organization
            </h1>
          </div>
          <p className='mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300'>
            Choose an organization to access its management dashboard or
            resident portal. Your role determines what features you can access.
          </p>
        </div>

        {/* Instructions Cards */}
        <div className='mb-8 grid gap-6 md:grid-cols-2'>
          <Card className='border-blue-200 bg-blue-50/50 dark:bg-blue-900/20'>
            <CardHeader>
              <CardTitle className='flex items-center text-blue-700 dark:text-blue-300'>
                <Users className='mr-2 h-5 w-5' />
                Property Managers & Admins
              </CardTitle>
              <CardDescription>
                Access the full management dashboard with all administrative
                features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-primary flex items-center text-sm dark:text-blue-400'>
                <ArrowRight className='mr-2 h-4 w-4' />
                Will be redirected to <strong>/dashboard</strong>
              </div>
            </CardContent>
          </Card>

          <Card className='border-green-200 bg-green-50/50 dark:bg-green-900/20'>
            <CardHeader>
              <CardTitle className='flex items-center text-green-700 dark:text-green-300'>
                <Building2 className='mr-2 h-5 w-5' />
                Residents & Members
              </CardTitle>
              <CardDescription>
                Access the resident portal with personalized information and
                services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center text-sm text-green-600 dark:text-green-400'>
                <ArrowRight className='mr-2 h-4 w-4' />
                Will be redirected to <strong>/portal</strong>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization List */}
        <Card className='mx-auto max-w-2xl'>
          <CardHeader>
            <CardTitle className='text-center'>Your Organizations</CardTitle>
            <CardDescription className='text-center'>
              Select an organization to continue
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center p-6'>
            {' '}
            <OrganizationList
              afterSelectOrganizationUrl={`/${locale}/org-redirect`}
              afterCreateOrganizationUrl={`/${locale}/org-redirect`}
              skipInvitationScreen={true}
              hidePersonal={true}
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  cardBox:
                    'shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900',
                  organizationSwitcherTrigger:
                    'w-full justify-start text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800',
                  organizationPreviewMainIdentifier:
                    'text-gray-900 dark:text-gray-100',
                  organizationPreviewSecondaryIdentifier:
                    'text-gray-600 dark:text-gray-400',
                  organizationListCreateOrganizationButton:
                    'text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800',
                },
                variables: {
                  colorPrimary: '#3b82f6',
                  colorTextOnPrimaryBackground: '#ffffff',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className='mt-8 text-center text-sm text-gray-500 dark:text-gray-400'>
          <p>
            Don&apos;t see your organization? Contact your property manager for
            an invitation.
          </p>
        </div>
      </div>
    </div>
  );
}
