'use client';

import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Users,
  CheckCircle,
  UserPlus,
  ChevronRight,
  FileText,
} from 'lucide-react';

const AddingNewResidentsPage = () => {
  const t = useTranslations('articles.addingNewResidents');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: t('sections.overview.title'), level: 1 },
    { id: 'preparation', title: t('sections.preparation.title'), level: 1 },
    {
      id: 'resident-profile',
      title: t('sections.residentProfile.title'),
      level: 1,
    },
    {
      id: 'lease-assignment',
      title: t('sections.leaseAssignment.title'),
      level: 1,
    },
    { id: 'payment-setup', title: t('sections.paymentSetup.title'), level: 1 },
    {
      id: 'access-credentials',
      title: t('sections.accessCredentials.title'),
      level: 1,
    },
    {
      id: 'move-in-checklist',
      title: t('sections.moveInChecklist.title'),
      level: 1,
    },
    {
      id: 'communication-setup',
      title: t('sections.communicationSetup.title'),
      level: 1,
    },
  ];

  const relatedArticles = [
    {
      title: 'Lease Agreement Management',
      href: '/user-guide/resident-management/lease-agreement-management',
      time: '8 min',
    },
    {
      title: 'Unit Management & Organization',
      href: '/user-guide/property-management/unit-management-organization',
      time: '6 min',
    },
    {
      title: 'Setting Up Rent Collection',
      href: '/user-guide/financial-management/setting-up-rent-collection',
      time: '7 min',
    },
  ];

  return (
    <ArticleLayout articleSlug='adding-new-residents' title={t('title')}>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        <div className='lg:col-span-3'>
          <nav className='mb-8'>
            <div className='flex items-center space-x-2 text-sm text-gray-600'>
              <Link
                href='/user-guide'
                className='transition-colors hover:text-gray-900'
              >
                {tNav('userGuide')}
              </Link>
              <ChevronRight className='h-4 w-4 rtl:rotate-180' />
              <Link
                href='/user-guide/resident-management'
                className='transition-colors hover:text-gray-900'
              >
                {tNav('residentManagement')}
              </Link>
              <ChevronRight className='h-4 w-4 rtl:rotate-180' />
              <span className='text-gray-900'>{t('title')}</span>
            </div>
          </nav>

          <div className='rounded-lg border bg-white shadow-sm'>
            <div className='border-b p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <div className='rounded-lg bg-purple-500 p-2'>
                  <UserPlus className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    {t('title')}
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>
                      {tNav('residentManagement')}
                    </Badge>
                    <Badge variant='outline'>{tCommon('popular')}</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>{t('metadata.readTime')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-gray-700'>{t('metadata.description')}</p>
            </div>

            <div className='p-6'>
              <section id='overview' className='mb-12'>
                <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                  {t('sections.overview.title')}
                </h2>
                <p className='mb-6 text-gray-700'>
                  {t('sections.overview.content')}
                </p>

                <div className='grid gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center space-x-2'>
                        <Users className='h-5 w-5 text-blue-500' />
                        <CardTitle className='text-lg'>
                          {t('sections.overview.benefits.title')}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-600'>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>{t('sections.overview.benefits.items.0')}</span>
                        </li>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>{t('sections.overview.benefits.items.1')}</span>
                        </li>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>{t('sections.overview.benefits.items.2')}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center space-x-2'>
                        <FileText className='h-5 w-5 text-purple-500' />
                        <CardTitle className='text-lg'>
                          {t('sections.overview.requirements.title')}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-600'>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>
                            {t('sections.overview.requirements.items.0')}
                          </span>
                        </li>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>
                            {t('sections.overview.requirements.items.1')}
                          </span>
                        </li>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>
                            {t('sections.overview.requirements.items.2')}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id='preparation' className='mb-12'>
                <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                  {t('sections.preparation.title')}
                </h2>
                <p className='mb-6 text-gray-700'>
                  {t('sections.preparation.content')}
                </p>

                <div className='rounded-lg bg-blue-50 p-6'>
                  <h3 className='mb-4 text-lg font-medium text-gray-900'>
                    {t('sections.preparation.checklist.title')}
                  </h3>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.preparation.checklist.items.0')}
                      </span>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.preparation.checklist.items.1')}
                      </span>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.preparation.checklist.items.2')}
                      </span>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.preparation.checklist.items.3')}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className='lg:col-span-1'>
          <ArticleSidebar
            tableOfContents={tableOfContents}
            relatedArticles={relatedArticles}
          />
        </div>
      </div>
    </ArticleLayout>
  );
};

export default AddingNewResidentsPage;
