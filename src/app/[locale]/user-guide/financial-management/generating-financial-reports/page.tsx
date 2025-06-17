'use client';

import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Lightbulb,
  ChevronRight,
  FileText,
  Calendar,
  TrendingUp,
  Download,
  Filter,
  BarChart3,
} from 'lucide-react';

const GeneratingFinancialReportsPage = () => {
  const t = useTranslations('articles.generatingFinancialReports');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: tCommon('overview'), level: 1 },
    { id: 'report-types', title: t('sections.reportTypes.title'), level: 1 },
    {
      id: 'generating-reports',
      title: t('sections.generatingReports.title'),
      level: 1,
    },
    {
      id: 'customizing-reports',
      title: t('sections.customizingReports.title'),
      level: 1,
    },
    {
      id: 'scheduling-reports',
      title: t('sections.schedulingReports.title'),
      level: 1,
    },
    {
      id: 'exporting-sharing',
      title: t('sections.exportingSharing.title'),
      level: 1,
    },
    { id: 'best-practices', title: tCommon('bestPractices'), level: 1 },
  ];

  const relatedArticles = t.raw('sections.sidebar.relatedArticlesList');

  return (
    <ArticleLayout
      articleSlug='generating-financial-reports'
      title={t('title')}
    >
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          {/* Breadcrumb */}
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
                href='/user-guide'
                className='transition-colors hover:text-gray-900'
              >
                {t('sections.breadcrumb.financialManagement')}
              </Link>
              <ChevronRight className='h-4 w-4 rtl:rotate-180' />
              <span className='font-medium text-gray-900'>{t('title')}</span>
            </div>
          </nav>

          {/* Header */}
          <div className='mb-8'>
            <div className='mb-4 flex items-center space-x-3'>
              <div className='rounded-lg bg-green-500 p-2'>
                <BarChart3 className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>
                  {t('title')}
                </h1>
                <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                  <div className='flex items-center space-x-1'>
                    <Clock className='h-4 w-4' />
                    <span>{t('metadata.readTime')}</span>
                  </div>
                  <Badge variant='secondary'>{t('metadata.audience')}</Badge>
                </div>
              </div>
            </div>
            <p className='text-lg text-gray-600'>{t('description')}</p>
          </div>

          {/* Overview */}
          <section id='overview' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {tCommon('overview')}
            </h2>
            <p className='mb-4 text-gray-700'>
              {t('sections.overview.content')}
            </p>
          </section>

          {/* Report Types */}
          <section id='report-types' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.reportTypes.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.reportTypes.description')}
            </p>

            <div className='grid gap-6 md:grid-cols-2'>
              {t
                .raw('sections.reportTypes.types')
                .map(
                  (
                    type: { title: string; description: string; icon: string },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          {type.icon === 'trending-up' && (
                            <TrendingUp className='h-5 w-5 text-green-500' />
                          )}
                          {type.icon === 'calendar' && (
                            <Calendar className='h-5 w-5 text-green-500' />
                          )}
                          {type.icon === 'file-text' && (
                            <FileText className='h-5 w-5 text-green-500' />
                          )}
                          {type.icon === 'bar-chart' && (
                            <BarChart3 className='h-5 w-5 text-green-500' />
                          )}
                          <span>{type.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{type.description}</p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </section>

          {/* Generating Reports */}
          <section id='generating-reports' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.generatingReports.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.generatingReports.description')}
            </p>

            <div className='space-y-6'>
              {t
                .raw('sections.generatingReports.steps')
                .map(
                  (step: { title: string; content: string }, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white'>
                            {index + 1}
                          </div>
                          <span>{step.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{step.content}</p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </section>

          {/* Customizing Reports */}
          <section id='customizing-reports' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.customizingReports.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.customizingReports.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.customizingReports.options')
                .map(
                  (
                    option: { title: string; description: string },
                    index: number
                  ) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <Filter className='mt-1 h-5 w-5 text-green-500' />
                      <div>
                        <h3 className='font-semibold text-gray-900'>
                          {option.title}
                        </h3>
                        <p className='text-gray-700'>{option.description}</p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </section>

          {/* Scheduling Reports */}
          <section id='scheduling-reports' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.schedulingReports.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.schedulingReports.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.schedulingReports.features')
                .map(
                  (
                    feature: { title: string; description: string },
                    index: number
                  ) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <Calendar className='mt-1 h-5 w-5 text-green-500' />
                      <div>
                        <h3 className='font-semibold text-gray-900'>
                          {feature.title}
                        </h3>
                        <p className='text-gray-700'>{feature.description}</p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </section>

          {/* Exporting & Sharing */}
          <section id='exporting-sharing' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.exportingSharing.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.exportingSharing.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.exportingSharing.methods')
                .map(
                  (
                    method: { title: string; description: string },
                    index: number
                  ) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <Download className='mt-1 h-5 w-5 text-green-500' />
                      <div>
                        <h3 className='font-semibold text-gray-900'>
                          {method.title}
                        </h3>
                        <p className='text-gray-700'>{method.description}</p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </section>

          {/* Best Practices */}
          <section id='best-practices' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {tCommon('bestPractices')}
            </h2>
            <div className='rounded-lg border border-green-200 bg-green-50 p-6'>
              <div className='flex items-start space-x-3'>
                <Lightbulb className='mt-1 h-5 w-5 text-green-600' />
                <div>
                  <h3 className='font-semibold text-green-900'>
                    {tCommon('tips')}
                  </h3>
                  <ul className='mt-2 space-y-1 text-green-800'>
                    {t
                      .raw('sections.bestPractices.tips')
                      .map((tip: string, index: number) => (
                        <li key={index} className='flex items-start space-x-2'>
                          <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600' />
                          <span>{tip}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
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

export default GeneratingFinancialReportsPage;
