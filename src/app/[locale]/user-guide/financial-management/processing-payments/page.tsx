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
  Lightbulb,
  ChevronRight,
  CreditCard,
  DollarSign,
  Shield,
  Smartphone,
} from 'lucide-react';

const ProcessingPaymentsPage = () => {
  const t = useTranslations('articles.processingPayments');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: tCommon('overview'), level: 1 },
    {
      id: 'payment-methods',
      title: t('sections.paymentMethods.title'),
      level: 1,
    },
    {
      id: 'manual-payments',
      title: t('sections.manualPayments.title'),
      level: 1,
    },
    {
      id: 'automated-processing',
      title: t('sections.automatedProcessing.title'),
      level: 1,
    },
    {
      id: 'payment-reconciliation',
      title: t('sections.paymentReconciliation.title'),
      level: 1,
    },
    {
      id: 'security-compliance',
      title: t('sections.securityCompliance.title'),
      level: 1,
    },
    { id: 'troubleshooting', title: tCommon('troubleshooting'), level: 1 },
  ];

  const relatedArticles = t.raw('sections.sidebar.relatedArticlesList');

  return (
    <ArticleLayout articleSlug='processing-payments' title={t('title')}>
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
              <div className='rounded-lg bg-orange-500 p-2'>
                <CreditCard className='h-6 w-6 text-white' />
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

          {/* Payment Methods */}
          <section id='payment-methods' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.paymentMethods.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.paymentMethods.description')}
            </p>

            <div className='grid gap-6 md:grid-cols-2'>
              {t
                .raw('sections.paymentMethods.methods')
                .map(
                  (
                    method: {
                      title: string;
                      description: string;
                      icon: string;
                    },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          {method.icon === 'credit-card' && (
                            <CreditCard className='h-5 w-5 text-orange-500' />
                          )}
                          {method.icon === 'dollar-sign' && (
                            <DollarSign className='h-5 w-5 text-orange-500' />
                          )}
                          {method.icon === 'smartphone' && (
                            <Smartphone className='h-5 w-5 text-orange-500' />
                          )}
                          <span>{method.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{method.description}</p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </section>

          {/* Manual Payments */}
          <section id='manual-payments' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.manualPayments.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.manualPayments.description')}
            </p>

            <div className='space-y-6'>
              {t
                .raw('sections.manualPayments.steps')
                .map(
                  (step: { title: string; content: string }, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white'>
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

          {/* Automated Processing */}
          <section id='automated-processing' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.automatedProcessing.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.automatedProcessing.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.automatedProcessing.features')
                .map(
                  (
                    feature: { title: string; description: string },
                    index: number
                  ) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
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

          {/* Payment Reconciliation */}
          <section id='payment-reconciliation' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.paymentReconciliation.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.paymentReconciliation.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.paymentReconciliation.steps')
                .map(
                  (
                    step: { title: string; description: string },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{step.description}</p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </section>

          {/* Security & Compliance */}
          <section id='security-compliance' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.securityCompliance.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.securityCompliance.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.securityCompliance.measures')
                .map(
                  (
                    measure: { title: string; description: string },
                    index: number
                  ) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <Shield className='mt-1 h-5 w-5 text-blue-500' />
                      <div>
                        <h3 className='font-semibold text-gray-900'>
                          {measure.title}
                        </h3>
                        <p className='text-gray-700'>{measure.description}</p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </section>

          {/* Troubleshooting */}
          <section id='troubleshooting' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {tCommon('troubleshooting')}
            </h2>
            <div className='space-y-4'>
              {t
                .raw('sections.troubleshooting.issues')
                .map(
                  (
                    issue: { problem: string; solution: string },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          {issue.problem}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{issue.solution}</p>
                      </CardContent>
                    </Card>
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

export default ProcessingPaymentsPage;
