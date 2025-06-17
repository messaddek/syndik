/* Enhanced User Guide Page with Analytics Integration */

'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingLayout } from '@/components/landing/landing-layout';
import { ArticleSearch } from '@/components/articles/article-search';
import { getArticlesByCategory } from '@/modules/articles/static-articles';
import { useTranslations, useLocale } from 'next-intl';
import {
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  BookOpen,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Mail,
  MessageCircle,
  TrendingUp,
  Building2,
  Settings,
} from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

const UserGuidePage = () => {
  const t = useTranslations('userGuide');
  const locale = useLocale();
  // Helper function to get the correct word for minutes based on locale
  const getMinuteText = (minutes: number) => {
    if (locale === 'ar') {
      if (minutes === 1) {
        return t('common.readTime'); // دقيقة (1 minute)
      } else {
        return t('common.readTimeMinutes'); // دقائق (multiple minutes)
      }
    } else {
      // For English and French, we use the same abbreviation "min"
      return t('common.readTime');
    }
  };
  const [popularArticles, setPopularArticles] = useState([
    // Fallback data while loading - using actual article data
    {
      slug: 'creating-your-first-property',
      title: t('articleTitles.creating-your-first-property'),
      views: '2.1k',
      rating: 4.9,
      category: 'getting-started',
      readTime: 5,
    },
    {
      slug: 'adding-new-residents',
      title: t('articleTitles.adding-new-residents'),
      views: '1.8k',
      rating: 4.8,
      category: 'resident-management',
      readTime: 5,
    },
    {
      slug: 'setting-up-rent-collection',
      title: t('articleTitles.setting-up-rent-collection'),
      views: '1.5k',
      rating: 4.7,
      category: 'financial-management',
      readTime: 7,
    },
    {
      slug: 'tracking-maintenance-requests',
      title: t('articleTitles.tracking-maintenance-requests'),
      views: '1.3k',
      rating: 4.8,
      category: 'maintenance',
      readTime: 5,
    },
  ]);

  const trpc = useTRPC();

  // Fetch real popular articles from analytics
  const { data: analyticsPopularArticles, isLoading } = useQuery(
    trpc.articles.getPopularArticles.queryOptions({
      limit: 4,
      timeframe: 'month',
    })
  );

  // Update popular articles when data loads
  useEffect(() => {
    if (analyticsPopularArticles && analyticsPopularArticles.length > 0) {
      setPopularArticles(analyticsPopularArticles);
    }
  }, [analyticsPopularArticles]);
  const guides = [
    {
      id: 'getting-started',
      title: t('categories.gettingStarted.title'),
      description: t('categories.gettingStarted.description'),
      icon: BookOpen,
      color: 'bg-blue-500',
      articles: getArticlesByCategory('getting-started').map(article => ({
        title: t(`articleTitles.${article.slug}`),
        time: `${article.readTime} ${getMinuteText(article.readTime)}`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'property-management',
      title: t('categories.propertyManagement.title'),
      description: t('categories.propertyManagement.description'),
      icon: Building2,
      color: 'bg-emerald-500',
      articles: getArticlesByCategory('property-management').map(article => ({
        title: t(`articleTitles.${article.slug}`),
        time: `${article.readTime} ${getMinuteText(article.readTime)}`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'resident-management',
      title: t('categories.residentManagement.title'),
      description: t('categories.residentManagement.description'),
      icon: Users,
      color: 'bg-purple-500',
      articles: getArticlesByCategory('resident-management').map(article => ({
        title: t(`articleTitles.${article.slug}`),
        time: `${article.readTime} ${getMinuteText(article.readTime)}`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'financial-management',
      title: t('categories.financialManagement.title'),
      description: t('categories.financialManagement.description'),
      icon: CreditCard,
      color: 'bg-orange-500',
      articles: getArticlesByCategory('financial-management').map(article => ({
        title: t(`articleTitles.${article.slug}`),
        time: `${article.readTime} ${getMinuteText(article.readTime)}`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'maintenance',
      title: t('categories.maintenance.title'),
      description: t('categories.maintenance.description'),
      icon: Settings,
      color: 'bg-red-500',
      articles: getArticlesByCategory('maintenance').map(article => ({
        title: t(`articleTitles.${article.slug}`),
        time: `${article.readTime} ${getMinuteText(article.readTime)}`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'communication',
      title: t('categories.communication.title'),
      description: t('categories.communication.description'),
      icon: MessageSquare,
      color: 'bg-indigo-500',
      articles: getArticlesByCategory('communication').map(article => ({
        title: t(`articleTitles.${article.slug}`),
        time: `${article.readTime} ${getMinuteText(article.readTime)}`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
  ];

  return (
    <LandingLayout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        {/* Header */}
        <div className='border-b bg-white'>
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h1 className='mb-4 text-4xl font-bold text-gray-900'>
                {t('title')}
              </h1>
              <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-600'>
                {t('subtitle')}
              </p>{' '}
              {/* Search */}
              <div className='mx-auto max-w-lg'>
                <ArticleSearch
                  onResults={count => {
                    // Optional: Can be used to show result count
                    console.log(`Found ${count} articles`);
                  }}
                  className='w-full'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='grid gap-8 lg:grid-cols-3'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              {/* Popular Articles Section with Analytics */}
              <div className='mb-12'>
                <div className='mb-6 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='h-5 w-5 text-orange-500' />
                    <h2 className='space-x-2 text-2xl font-bold text-gray-900'>
                      <span>{t('popularArticles.title')}</span>
                      {isLoading && (
                        <span className='text-sm text-gray-500'>
                          {t('popularArticles.loadingData')}
                        </span>
                      )}
                    </h2>
                  </div>
                  <Badge variant='secondary' className='text-xs'>
                    {t('popularArticles.updatedRealTime')}
                  </Badge>
                </div>
                <div className='grid gap-4 sm:grid-cols-2'>
                  {popularArticles.map((article, index) => (
                    <Card
                      key={article.slug}
                      className='group transition-all duration-200 hover:shadow-lg'
                    >
                      <CardContent className='p-4'>
                        <div className='mb-2 flex items-start justify-between'>
                          <Badge variant='outline' className='mb-2 text-xs'>
                            {t('common.numberMostPopular', {
                              number: index + 1,
                            })}
                          </Badge>
                          <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                            {article.rating}
                          </div>
                        </div>
                        <h3 className='group-hover:text-primary mb-2 font-semibold text-gray-900 transition-colors'>
                          <Link
                            href={`/user-guide/${article.category}/${article.slug}`}
                          >
                            {t(`articleTitles.${article.slug}`, {
                              fallback: article.title,
                            })}
                          </Link>
                        </h3>
                        <div className='flex items-center justify-between text-sm text-gray-500'>
                          <div className='flex items-center gap-3'>
                            <span className='flex items-center gap-1'>
                              👁️ {article.views}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              {article.readTime}
                              {getMinuteText(article.readTime)}
                            </span>
                          </div>
                          <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180' />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>{' '}
              {/* Guide Categories */}
              <div className='space-y-8'>
                {guides.map(guide => {
                  const IconComponent = guide.icon;
                  return (
                    <Card key={guide.id} className='overflow-hidden'>
                      <CardHeader className='bg-gradient-to-r from-gray-50 to-gray-100'>
                        <div className='flex items-center gap-4'>
                          <div className={`rounded-lg p-3 ${guide.color}`}>
                            <IconComponent className='h-6 w-6 text-white' />
                          </div>
                          <div>
                            <CardTitle className='text-xl'>
                              {guide.title}
                            </CardTitle>
                            <p className='text-gray-600'>{guide.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className='p-6'>
                        <div className='grid gap-3 sm:grid-cols-2'>
                          {guide.articles.map(article => (
                            <Link
                              key={article.slug}
                              href={`/user-guide/${guide.id}/${article.slug}`}
                              className='group flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50'
                            >
                              {' '}
                              <div className='flex min-w-0 items-center gap-3'>
                                <FileText className='h-4 w-4 shrink-0 text-gray-400' />{' '}
                                <span className='group-hover:text-primary truncate font-medium text-gray-900'>
                                  {article.title}
                                </span>
                                {article.popular && (
                                  <Badge
                                    variant='secondary'
                                    className='text-xs'
                                  >
                                    {t('common.popular')}
                                  </Badge>
                                )}
                              </div>
                              <div className='flex shrink-0 items-center gap-2 text-sm text-gray-500'>
                                <Clock className='h-3 w-3' />
                                <span className='whitespace-nowrap'>
                                  {article.time}
                                </span>
                                <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-green-500' />
                    {t('sidebar.quickStart')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Button asChild className='w-full'>
                    <Link href='/user-guide/getting-started/creating-your-first-property'>
                      {t('sidebar.createFirstProperty')}
                    </Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/user-guide/getting-started/setting-up-user-accounts'>
                      {t('sidebar.setupUserAccounts')}
                    </Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/user-guide/resident-management/adding-new-residents'>
                      {t('sidebar.addFirstResident')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MessageCircle className='h-5 w-5 text-blue-500' />
                    {t('sidebar.needHelp')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/help'>
                      <Mail className='mr-2 h-4 w-4' />
                      {t('sidebar.contactSupport')}
                    </Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/faq'>
                      <FileText className='mr-2 h-4 w-4' />
                      {t('sidebar.viewFaq')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default UserGuidePage;
