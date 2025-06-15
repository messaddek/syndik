/* Enhanced User Guide Page with Analytics Integration */

'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LandingLayout } from '@/components/landing/landing-layout';
import { getArticlesByCategory } from '@/modules/articles/static-articles';
import {
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  Search,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [popularArticles, setPopularArticles] = useState([
    // Fallback data while loading - using actual article data
    {
      slug: 'creating-your-first-property',
      title: 'Creating Your First Property',
      views: '2.1k',
      rating: 4.9,
      category: 'getting-started',
      readTime: 5,
    },
    {
      slug: 'adding-new-residents',
      title: 'Adding New Residents',
      views: '1.8k',
      rating: 4.8,
      category: 'resident-management',
      readTime: 5,
    },
    {
      slug: 'setting-up-rent-collection',
      title: 'Setting Up Rent Collection',
      views: '1.5k',
      rating: 4.7,
      category: 'financial-management',
      readTime: 7,
    },
    {
      slug: 'tracking-maintenance-requests',
      title: 'Tracking Maintenance Requests',
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
      title: 'Getting Started',
      description: 'Essential setup and first steps',
      icon: BookOpen,
      color: 'bg-blue-500',
      articles: getArticlesByCategory('getting-started').map(article => ({
        title: article.title,
        time: `${article.readTime} min`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'property-management',
      title: 'Property Management',
      description: 'Managing properties and units',
      icon: Building2,
      color: 'bg-emerald-500',
      articles: getArticlesByCategory('property-management').map(article => ({
        title: article.title,
        time: `${article.readTime} min`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'resident-management',
      title: 'Resident Management',
      description: 'Managing tenants and leases',
      icon: Users,
      color: 'bg-purple-500',
      articles: getArticlesByCategory('resident-management').map(article => ({
        title: article.title,
        time: `${article.readTime} min`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'financial-management',
      title: 'Financial Management',
      description: 'Rent, payments, and accounting',
      icon: CreditCard,
      color: 'bg-orange-500',
      articles: getArticlesByCategory('financial-management').map(article => ({
        title: article.title,
        time: `${article.readTime} min`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Requests',
      description: 'Work orders and maintenance tracking',
      icon: Settings,
      color: 'bg-red-500',
      articles: getArticlesByCategory('maintenance').map(article => ({
        title: article.title,
        time: `${article.readTime} min`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
    {
      id: 'communication',
      title: 'Communication',
      description: 'Announcements and notifications',
      icon: MessageSquare,
      color: 'bg-indigo-500',
      articles: getArticlesByCategory('communication').map(article => ({
        title: article.title,
        time: `${article.readTime} min`,
        popular: article.popular,
        slug: article.slug,
      })),
    },
  ];

  const filteredGuides = guides.filter(
    guide =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.articles.some(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <LandingLayout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        {/* Header */}
        <div className='border-b bg-white'>
          <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h1 className='mb-4 text-4xl font-bold text-gray-900'>
                User Guide & Documentation
              </h1>
              <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-600'>
                Everything you need to master Syndik and streamline your
                property management
              </p>

              {/* Search */}
              <div className='relative mx-auto max-w-lg'>
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search articles...'
                  className='pl-10'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
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
                    <h2 className='text-2xl font-bold text-gray-900'>
                      Popular Articles
                      {isLoading && (
                        <span className='ml-2 text-sm text-gray-500'>
                          (Loading real-time data...)
                        </span>
                      )}
                    </h2>
                  </div>
                  <Badge variant='secondary' className='text-xs'>
                    Updated in real-time
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
                            #{index + 1} Most Popular
                          </Badge>
                          <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                            {article.rating}
                          </div>
                        </div>
                        <h3 className='mb-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600'>
                          <Link
                            href={`/user-guide/${article.category}/${article.slug}`}
                          >
                            {article.title}
                          </Link>
                        </h3>
                        <div className='flex items-center justify-between text-sm text-gray-500'>
                          <div className='flex items-center gap-3'>
                            <span className='flex items-center gap-1'>
                              👁️ {article.views}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              {article.readTime} min
                            </span>
                          </div>
                          <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Guide Categories */}
              <div className='space-y-8'>
                {filteredGuides.map(guide => {
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
                              <div className='flex items-center gap-3'>
                                <FileText className='h-4 w-4 text-gray-400' />
                                <span className='font-medium text-gray-900 group-hover:text-blue-600'>
                                  {article.title}
                                </span>
                                {article.popular && (
                                  <Badge
                                    variant='secondary'
                                    className='text-xs'
                                  >
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <div className='flex items-center gap-2 text-sm text-gray-500'>
                                <Clock className='h-3 w-3' />
                                {article.time}
                                <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
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
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Button asChild className='w-full'>
                    <Link href='/user-guide/getting-started/creating-your-first-property'>
                      Create Your First Property
                    </Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/user-guide/getting-started/setting-up-user-accounts'>
                      Set Up User Accounts
                    </Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/user-guide/resident-management/adding-new-residents'>
                      Add Your First Resident
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MessageCircle className='h-5 w-5 text-blue-500' />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/help'>
                      <Mail className='mr-2 h-4 w-4' />
                      Contact Support
                    </Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/faq'>
                      <FileText className='mr-2 h-4 w-4' />
                      View FAQ
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
