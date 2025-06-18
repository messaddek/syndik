'use client';

import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Clock,
  CheckCircle,
  FileText,
  ChevronRight,
  Calendar,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

const LeaseAgreementManagementPage = () => {
  const t = useTranslations('articles.leaseAgreementManagement');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: t('sections.overview.title'), level: 1 },
    {
      id: 'creating-leases',
      title: t('sections.creatingLeases.title'),
      level: 1,
    },
    {
      id: 'lease-templates',
      title: t('sections.leaseTemplates.title'),
      level: 1,
    },
    {
      id: 'tracking-terms',
      title: t('sections.trackingTerms.title'),
      level: 1,
    },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Residents',
      href: '/user-guide/resident-management/adding-new-residents',
      time: '5 min',
    },
    {
      title: 'Resident Communication Tools',
      href: '/user-guide/resident-management/resident-communication-tools',
      time: '6 min',
    },
    {
      title: 'Move-in/Move-out Process',
      href: '/user-guide/resident-management/move-in-move-out-process',
      time: '10 min',
    },
  ];

  return (
    <ArticleLayout articleSlug='lease-agreement-management' title={t('title')}>
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
                  <FileText className='h-6 w-6 text-white' />
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
                        <FileText className='h-5 w-5 text-blue-500' />
                        <CardTitle className='text-lg'>
                          {t('sections.overview.features.title')}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-600'>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>{t('sections.overview.features.items.0')}</span>
                        </li>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>{t('sections.overview.features.items.1')}</span>
                        </li>
                        <li className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                          <span>{t('sections.overview.features.items.2')}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center space-x-2'>
                        <AlertTriangle className='h-5 w-5 text-orange-500' />
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
                </div>
              </section>

              <section id='creating-leases' className='mb-12'>
                <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                  {t('sections.creatingLeases.title')}
                </h2>
                <p className='mb-6 text-gray-700'>
                  {t('sections.creatingLeases.content')}
                </p>

                <Card>
                  <CardHeader>
                    <div className='flex items-center space-x-2'>
                      <DollarSign className='h-5 w-5 text-green-500' />
                      <CardTitle>
                        {t('sections.creatingLeases.steps.title')}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {[0, 1, 2, 3, 4].map(index => (
                        <div key={index} className='flex items-start space-x-3'>
                          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600'>
                            {index + 1}
                          </div>
                          <div className='flex-1'>
                            <p className='text-sm text-gray-700'>
                              {t(
                                `sections.creatingLeases.steps.items.${index}`
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id='lease-templates' className='mb-12'>
                <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                  {t('sections.leaseTemplates.title')}
                </h2>
                <p className='mb-6 text-gray-700'>
                  {t('sections.leaseTemplates.content')}
                </p>

                <div className='rounded-lg bg-blue-50 p-6'>
                  <h3 className='mb-4 text-lg font-medium text-gray-900'>
                    {t('sections.leaseTemplates.types.title')}
                  </h3>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.leaseTemplates.types.items.0')}
                      </span>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.leaseTemplates.types.items.1')}
                      </span>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.leaseTemplates.types.items.2')}
                      </span>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-blue-500' />
                      <span className='text-sm text-gray-700'>
                        {t('sections.leaseTemplates.types.items.3')}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section id='tracking-terms' className='mb-12'>
                <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                  {t('sections.trackingTerms.title')}
                </h2>
                <p className='mb-6 text-gray-700'>
                  {t('sections.trackingTerms.content')}
                </p>

                <div className='grid gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='h-5 w-5 text-purple-500' />
                        <CardTitle>
                          {t('sections.trackingTerms.dates.title')}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-600'>
                        <li>{t('sections.trackingTerms.dates.items.0')}</li>
                        <li>{t('sections.trackingTerms.dates.items.1')}</li>
                        <li>{t('sections.trackingTerms.dates.items.2')}</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className='flex items-center space-x-2'>
                        <DollarSign className='h-5 w-5 text-green-500' />
                        <CardTitle>
                          {t('sections.trackingTerms.financial.title')}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-600'>
                        <li>{t('sections.trackingTerms.financial.items.0')}</li>
                        <li>{t('sections.trackingTerms.financial.items.1')}</li>
                        <li>{t('sections.trackingTerms.financial.items.2')}</li>
                      </ul>
                    </CardContent>
                  </Card>
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

export default LeaseAgreementManagementPage;
