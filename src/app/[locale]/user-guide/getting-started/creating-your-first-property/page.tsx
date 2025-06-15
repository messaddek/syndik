'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  Mail,
  Home,
} from 'lucide-react';

const CreatingYourFirstPropertyPage = () => {
  const t = useTranslations('articles.creatingYourFirstProperty');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');
  const tableOfContents = [
    { id: 'overview', title: tCommon('overview'), level: 1 },
    { id: 'step-1', title: t('sections.step1.title'), level: 1 },
    { id: 'step-2', title: t('sections.step2.title'), level: 1 },
    { id: 'step-3', title: t('sections.step3.title'), level: 1 },
    { id: 'next-steps', title: tCommon('nextSteps'), level: 1 },
  ];
  const relatedArticles = t.raw('sections.sidebar.relatedArticlesList');
  return (
    <ArticleLayout
      articleSlug='creating-your-first-property'
      title={t('title')}
    >
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
            {tNav('gettingStarted')}
          </Link>
          <ChevronRight className='h-4 w-4 rtl:rotate-180' />
          <span className='text-gray-900'>{t('title')}</span>
        </div>
      </nav>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='rounded-lg border bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <div className='rounded-lg bg-blue-500 p-2'>
                  <Home className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    {t('title')}
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>{tNav('gettingStarted')}</Badge>
                    <Badge variant='outline'>{tCommon('popular')}</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>5 {tCommon('readTime')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-lg text-gray-600'>{t('description')}</p>
            </div>

            {/* Content */}
            <div className='space-y-8 p-6'>
              {/* Overview */}
              <section id='overview'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {tCommon('overview')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.overview.content')}
                </p>

                <Card className='border-blue-200 bg-blue-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <Lightbulb className='mt-0.5 h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-medium text-blue-800'>
                          {tCommon('whatYoullLearn')}
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-blue-700'>
                          {t
                            .raw('sections.overview.whatYoullLearn')
                            .map((item: string, index: number) => (
                              <li key={index}>• {item}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>{' '}
              {/* Step 1 */}
              <section id='step-1'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.step1.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.step1.content')}
                </p>

                <div className='space-y-4'>
                  {t
                    .raw('sections.step1.steps')
                    .map((step: string, index: number) => (
                      <div key={index} className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                          {index + 1}
                        </div>
                        <div>
                          <p className='text-sm text-gray-600'>{step}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <Card className='mt-4 border-yellow-200 bg-yellow-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                      <div>
                        <p className='font-medium text-yellow-800'>
                          {t('sections.step1.proTip.title')}
                        </p>
                        <p className='text-sm text-yellow-700'>
                          {t('sections.step1.proTip.content')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>{' '}
              {/* Step 2 */}
              <section id='step-2'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.step2.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.step2.content')}
                </p>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg text-green-700'>
                        {t('sections.step2.requiredFields.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        {t
                          .raw('sections.step2.requiredFields.fields')
                          .map((field: string, index: number) => (
                            <li
                              key={index}
                              className='flex items-center space-x-2'
                            >
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span className='text-sm'>{field}</span>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg text-blue-700'>
                        {t('sections.step2.optionalFields.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        {t
                          .raw('sections.step2.optionalFields.fields')
                          .map((field: string, index: number) => (
                            <li
                              key={index}
                              className='flex items-center space-x-2'
                            >
                              <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                              <span className='text-sm'>{field}</span>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>{' '}
              {/* Step 3 */}
              <section id='step-3'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.step3.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.step3.content')}
                </p>

                <div className='space-y-4'>
                  {t
                    .raw('sections.step3.settings')
                    .map(
                      (
                        setting: { title: string; description: string },
                        index: number
                      ) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className='text-lg'>
                              {setting.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className='text-sm text-gray-600'>
                              {setting.description}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    )}
                </div>
              </section>{' '}
              {/* Next Steps */}
              <section id='next-steps'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.nextSteps.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.nextSteps.content')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {t.raw('sections.nextSteps.actions').map(
                    (
                      action: {
                        title: string;
                        description: string;
                        href: string;
                      },
                      index: number
                    ) => (
                      <Link key={index} href={action.href}>
                        <Card className='cursor-pointer transition-shadow hover:shadow-md'>
                          <CardContent className='p-4'>
                            <h4 className='mb-2 font-semibold'>
                              {action.title}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {action.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Table of Contents */}
          <Card>
            {' '}
            <CardHeader>
              <CardTitle className='text-lg'>
                {t('sections.sidebar.tableOfContents')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className='space-y-2'>
                {tableOfContents.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm transition-colors hover:text-blue-600 ${
                      item.level === 2
                        ? 'pl-4 text-gray-600'
                        : 'font-medium text-gray-700'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
          {/* Related Articles */}
          <Card>
            {' '}
            <CardHeader>
              <CardTitle className='text-lg'>
                {t('sections.sidebar.relatedArticles')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {relatedArticles.map(
                  (
                    article: { title: string; href: string; time: string },
                    index: number
                  ) => (
                    <Link
                      key={index}
                      href={article.href}
                      className='block rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                    >
                      <h4 className='mb-1 text-sm font-medium text-gray-900'>
                        {article.title}
                      </h4>
                      <div className='flex items-center space-x-1 text-xs text-gray-500'>
                        <Clock className='h-3 w-3' />
                        <span>{article.time}</span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </CardContent>
          </Card>{' '}
          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>
                {t('sections.sidebar.needHelp')}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start'
                size='sm'
              >
                <Mail className='mr-2 h-4 w-4' />
                {t('sections.sidebar.contactSupport')}
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                size='sm'
              >
                <Users className='mr-2 h-4 w-4' />
                {t('sections.sidebar.joinCommunity')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default CreatingYourFirstPropertyPage;
