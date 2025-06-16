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
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function OrgSwitcherPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('orgSwitcher');

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-4xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 flex items-center justify-center'>            <Image
              src='/logo.svg'
              alt={t('logoAlt')}
              width={48}
              height={48}
              className='mr-3'
            />
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
              {t('title')}
            </h1>
          </div>
          <p className='mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300'>
            {t('description')}
          </p>
        </div>
        {/* Instructions Cards */}
        <div className='mb-8 grid gap-6 md:grid-cols-2'>
          <Card className='border-blue-200 bg-blue-50/50 dark:bg-blue-900/20'>            <CardHeader>
              <CardTitle className='flex items-center text-blue-700 dark:text-blue-300'>
                <Users className='mr-2 h-5 w-5' />
                {t('cards.managers.title')}
              </CardTitle>
              <CardDescription>
                {t('cards.managers.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-primary flex items-center text-sm dark:text-blue-400'>
                <ArrowRight className='mr-2 h-4 w-4' />
                {t('cards.managers.redirect')} <strong>/dashboard</strong>
              </div>
            </CardContent>
          </Card>

          <Card className='border-green-200 bg-green-50/50 dark:bg-green-900/20'>            <CardHeader>
              <CardTitle className='flex items-center text-green-700 dark:text-green-300'>
                <Building2 className='mr-2 h-5 w-5' />
                {t('cards.residents.title')}
              </CardTitle>
              <CardDescription>
                {t('cards.residents.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center text-sm text-green-600 dark:text-green-400'>
                <ArrowRight className='mr-2 h-4 w-4' />
                {t('cards.residents.redirect')} <strong>/portal</strong>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Organization List */}
        <Card className='mx-auto max-w-2xl'>          <CardHeader>
            <CardTitle className='text-center'>{t('organizationList.title')}</CardTitle>
            <CardDescription className='text-center'>
              {t('organizationList.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center p-6'>
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
        {/* Footer */}        <div className='mt-8 text-center text-sm text-gray-500 dark:text-gray-400'>
          <p>
            {t('footer.text')}
          </p>
        </div>
      </div>
    </div>
  );
}
