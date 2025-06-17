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
  MessageSquare,
  Mail,
} from 'lucide-react';

const IndividualMessagingPage = () => {
  const t = useTranslations('articles.individualMessaging');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: tCommon('overview'), level: 1 },
    {
      id: 'sending-messages',
      title: t('sections.sendingMessages.title'),
      level: 1,
    },
    { id: 'message-types', title: t('sections.messageTypes.title'), level: 1 },
    {
      id: 'managing-conversations',
      title: t('sections.managingConversations.title'),
      level: 1,
    },
    {
      id: 'message-settings',
      title: t('sections.messageSettings.title'),
      level: 1,
    },
    { id: 'best-practices', title: tCommon('bestPractices'), level: 1 },
  ];

  const relatedArticles = t.raw('sections.sidebar.relatedArticlesList');

  return (
    <ArticleLayout articleSlug='individual-messaging' title={t('title')}>
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
              <div className='rounded-lg bg-blue-500 p-2'>
                <MessageSquare className='h-6 w-6 text-white' />
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

          {/* Sending Messages */}
          <section id='sending-messages' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.sendingMessages.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.sendingMessages.description')}
            </p>{' '}
            <div className='space-y-6'>
              {t
                .raw('sections.sendingMessages.steps')
                .map(
                  (step: { title: string; content: string }, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>
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

          {/* Message Types */}
          <section id='message-types' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.messageTypes.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.messageTypes.description')}
            </p>{' '}
            <div className='grid gap-6 md:grid-cols-2'>
              {t
                .raw('sections.messageTypes.types')
                .map(
                  (
                    type: { title: string; description: string },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2'>
                          <Mail className='h-5 w-5 text-blue-500' />
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

          {/* Managing Conversations */}
          <section id='managing-conversations' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.managingConversations.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.managingConversations.description')}
            </p>{' '}
            <div className='space-y-4'>
              {t
                .raw('sections.managingConversations.features')
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

          {/* Message Settings */}
          <section id='message-settings' className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.messageSettings.title')}
            </h2>
            <p className='mb-6 text-gray-700'>
              {t('sections.messageSettings.description')}
            </p>{' '}
            <div className='space-y-4'>
              {t
                .raw('sections.messageSettings.settings')
                .map(
                  (
                    setting: { title: string; description: string },
                    index: number
                  ) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{setting.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-gray-700'>{setting.description}</p>
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

export default IndividualMessagingPage;
