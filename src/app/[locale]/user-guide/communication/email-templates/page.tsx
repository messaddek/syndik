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
  Mail,
  Edit,
  Copy,
  Eye,
  Palette,
} from 'lucide-react';

const EmailTemplatesPage = () => {
  const t = useTranslations('articles.emailTemplates');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: tCommon('overview'), level: 1 },
    {
      id: 'creating-templates',
      title: t('sections.creatingTemplates.title'),
      level: 1,
    },
    {
      id: 'customizing-templates',
      title: t('sections.customizingTemplates.title'),
      level: 1,
    },
    {
      id: 'managing-templates',
      title: t('sections.managingTemplates.title'),
      level: 1,
    },
    {
      id: 'template-variables',
      title: t('sections.templateVariables.title'),
      level: 1,
    },
    { id: 'best-practices', title: tCommon('bestPractices'), level: 1 },
  ];

  const relatedArticles = t.raw('sections.sidebar.relatedArticlesList');

  return (
    <ArticleLayout articleSlug='email-templates' title={t('title')}>
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
                {t('sections.breadcrumb.communication')}
              </Link>
              <ChevronRight className='h-4 w-4 rtl:rotate-180' />
              <span className='font-medium text-gray-900'>{t('title')}</span>
            </div>
          </nav>

          {/* Header */}
          <div className='mb-8'>
            <div className='mb-4 flex items-center space-x-3'>
              <div className='rounded-lg bg-purple-500 p-2'>
                <Mail className='h-6 w-6 text-white' />
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

          {/* Creating Templates */}
          <section id='creating-templates' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.creatingTemplates.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.creatingTemplates.description')}
            </p>

            <div className='space-y-6'>
              {t
                .raw('sections.creatingTemplates.steps')
                .map(
                  (step: { title: string; content: string }, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-sm font-semibold text-white'>
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

          {/* Customizing Templates */}
          <section id='customizing-templates' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.customizingTemplates.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.customizingTemplates.description')}
            </p>

            <div className='grid gap-6 md:grid-cols-2'>
              {t
                .raw('sections.customizingTemplates.features')
                .map(
                  (
                    feature: {
                      title: string;
                      description: string;
                      icon: string;
                    },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          {feature.icon === 'edit' && (
                            <Edit className='h-5 w-5 text-purple-500' />
                          )}
                          {feature.icon === 'palette' && (
                            <Palette className='h-5 w-5 text-purple-500' />
                          )}
                          {feature.icon === 'copy' && (
                            <Copy className='h-5 w-5 text-purple-500' />
                          )}
                          {feature.icon === 'eye' && (
                            <Eye className='h-5 w-5 text-purple-500' />
                          )}
                          <span>{feature.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </section>

          {/* Managing Templates */}
          <section id='managing-templates' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.managingTemplates.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.managingTemplates.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.managingTemplates.actions')
                .map(
                  (
                    action: { title: string; description: string },
                    index: number
                  ) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
                      <div>
                        <h3 className='font-semibold text-gray-900'>
                          {action.title}
                        </h3>
                        <p className='text-gray-700'>{action.description}</p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </section>

          {/* Template Variables */}
          <section id='template-variables' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.templateVariables.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.templateVariables.description')}
            </p>

            <div className='space-y-4'>
              {t
                .raw('sections.templateVariables.variables')
                .map(
                  (
                    variable: {
                      name: string;
                      description: string;
                      example: string;
                    },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          {variable.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='mb-2 text-gray-700'>
                          {variable.description}
                        </p>
                        <code className='rounded bg-gray-100 px-2 py-1 text-sm'>
                          {variable.example}
                        </code>
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

export default EmailTemplatesPage;
