'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  Building2,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  Search,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react';

const UserGuidePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Essential setup and first steps',
      icon: BookOpen,
      color: 'bg-blue-500',
      articles: [
        {
          title: 'Creating Your First Property',
          time: '5 min',
          popular: true,
          slug: 'creating-your-first-property',
        },
        {
          title: 'Setting Up User Accounts',
          time: '3 min',
          popular: true,
          slug: 'setting-up-user-accounts',
        },
        {
          title: 'Understanding Roles & Permissions',
          time: '7 min',
          slug: 'understanding-roles-permissions',
        },
        {
          title: 'Initial Configuration Guide',
          time: '10 min',
          slug: 'initial-configuration-guide',
        },
      ],
    },
    {
      id: 'property-management',
      title: 'Property Management',
      description: 'Managing properties and units',
      icon: Building2,
      color: 'bg-emerald-500',
      articles: [
        {
          title: 'Adding New Properties',
          time: '4 min',
          popular: true,
          slug: 'adding-new-properties',
        },
        {
          title: 'Unit Management & Organization',
          time: '6 min',
          slug: 'unit-management-organization',
        },
        {
          title: 'Property Information Updates',
          time: '3 min',
          slug: 'property-information-updates',
        },
        {
          title: 'Document Management System',
          time: '8 min',
          slug: 'document-management-system',
        },
      ],
    },
    {
      id: 'resident-management',
      title: 'Resident Management',
      description: 'Managing tenants and residents',
      icon: Users,
      color: 'bg-purple-500',
      articles: [
        {
          title: 'Adding New Residents',
          time: '5 min',
          popular: true,
          slug: 'adding-new-residents',
        },
        {
          title: 'Lease Agreement Management',
          time: '8 min',
          slug: 'lease-agreement-management',
        },
        {
          title: 'Resident Communication Tools',
          time: '6 min',
          slug: 'resident-communication-tools',
        },
        {
          title: 'Move-in/Move-out Process',
          time: '10 min',
          slug: 'move-in-move-out-process',
        },
      ],
    },
    {
      id: 'financial-management',
      title: 'Financial Management',
      description: 'Rent, payments, and accounting',
      icon: CreditCard,
      color: 'bg-orange-500',
      articles: [
        {
          title: 'Setting Up Rent Collection',
          time: '7 min',
          popular: true,
          slug: 'setting-up-rent-collection',
        },
        {
          title: 'Processing Payments',
          time: '4 min',
          slug: 'processing-payments',
        },
        {
          title: 'Generating Financial Reports',
          time: '6 min',
          slug: 'generating-financial-reports',
        },
        {
          title: 'Late Payment Management',
          time: '5 min',
          slug: 'late-payment-management',
        },
      ],
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Requests',
      description: 'Work orders and maintenance tracking',
      icon: Settings,
      color: 'bg-red-500',
      articles: [
        {
          title: 'Creating Work Orders',
          time: '4 min',
          slug: 'creating-work-orders',
        },
        {
          title: 'Tracking Maintenance Requests',
          time: '5 min',
          popular: true,
          slug: 'tracking-maintenance-requests',
        },
        {
          title: 'Vendor Management',
          time: '7 min',
          slug: 'vendor-management',
        },
        {
          title: 'Preventive Maintenance Setup',
          time: '9 min',
          slug: 'preventive-maintenance-setup',
        },
      ],
    },
    {
      id: 'communication',
      title: 'Communication',
      description: 'Messaging and notifications',
      icon: MessageSquare,
      color: 'bg-indigo-500',
      articles: [
        {
          title: 'Sending Announcements',
          time: '3 min',
          popular: true,
          slug: 'sending-announcements',
        },
        {
          title: 'Individual Messaging',
          time: '2 min',
          slug: 'individual-messaging',
        },
        {
          title: 'Notification Settings',
          time: '4 min',
          slug: 'notification-settings',
        },
        { title: 'Email Templates', time: '6 min', slug: 'email-templates' },
      ],
    },
  ];

  const quickActions = [
    {
      title: 'Video Tutorials',
      icon: Video,
      description: 'Watch step-by-step guides',
    },
    {
      title: 'Download Mobile App',
      icon: Download,
      description: 'Get our mobile app',
    },
    {
      title: 'Contact Support',
      icon: Phone,
      description: 'Get help from our team',
    },
    {
      title: 'Community Forum',
      icon: MessageCircle,
      description: 'Connect with other users',
    },
  ];

  const popularArticles = [
    {
      title: 'How to Set Up Automatic Rent Collection',
      views: '2.1k',
      rating: 4.9,
    },
    {
      title: 'Managing Multiple Properties Efficiently',
      views: '1.8k',
      rating: 4.8,
    },
    {
      title: 'Best Practices for Tenant Communication',
      views: '1.5k',
      rating: 4.7,
    },
    { title: 'Setting Up Maintenance Workflows', views: '1.3k', rating: 4.8 },
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
            {' '}
            <div className='text-center'>
              <div>
                <h1 className='mb-4 text-4xl font-bold text-gray-900'>
                  User Guide & Documentation
                </h1>
                <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-600'>
                  Everything you need to master Syndik and streamline your
                  property management
                </p>

                <div className='relative mx-auto max-w-2xl'>
                  <Search className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    type='text'
                    placeholder='Search guides, tutorials, and documentation...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className='py-3 pr-4 pl-12 text-lg'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              {' '}
              {/* Quick Actions */}
              <div className='mb-12'>
                <h2 className='mb-6 text-2xl font-bold text-gray-900'>
                  Quick Actions
                </h2>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  {quickActions.map((action, index) => (
                    <Card
                      key={index}
                      className='group cursor-pointer transition-all duration-300 hover:shadow-lg'
                    >
                      <CardContent className='p-6 text-center'>
                        <action.icon className='text-primary mx-auto mb-3 h-8 w-8 transition-transform group-hover:scale-110' />
                        <h3 className='mb-2 font-semibold text-gray-900'>
                          {action.title}
                        </h3>
                        <p className='text-sm text-gray-600'>
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}{' '}
                </div>{' '}
              </div>
              {/* Guide Categories */}
              <div>
                <h2 className='mb-6 text-2xl font-bold text-gray-900'>
                  User Guides
                </h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {filteredGuides.map(guide => (
                    <Card
                      key={guide.id}
                      className='transition-all duration-300 hover:shadow-lg'
                    >
                      <CardHeader>
                        <div className='flex items-center space-x-3'>
                          <div className={`${guide.color} rounded-lg p-2`}>
                            <guide.icon className='h-6 w-6 text-white' />
                          </div>
                          <div>
                            <CardTitle className='text-lg'>
                              {guide.title}
                            </CardTitle>
                            <p className='text-sm text-gray-600'>
                              {guide.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {' '}
                        <div className='space-y-3'>
                          {' '}
                          {guide.articles.map((article, index) => (
                            <Link
                              key={index}
                              href={`/user-guide/${guide.id}/${article.slug}`}
                              className='group flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                            >
                              <div className='flex items-center space-x-3'>
                                <FileText className='h-4 w-4 text-gray-400' />
                                <div>
                                  <div className='flex items-center space-x-2'>
                                    <span className='text-sm font-medium text-gray-900'>
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
                                  <div className='flex items-center space-x-1 text-xs text-gray-500'>
                                    <Clock className='h-3 w-3' />
                                    <span>{article.time}</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className='h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600' />
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            {/* Sidebar */}{' '}
            <div className='lg:col-span-1'>
              <div className='space-y-6'>
                {/* Popular Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2 text-lg'>
                      <Star className='h-5 w-5 text-yellow-500' />
                      <span>Popular Articles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {popularArticles.map((article, index) => (
                        <div
                          key={index}
                          className='cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50'
                        >
                          <h4 className='mb-1 text-sm font-medium text-gray-900'>
                            {article.title}
                          </h4>
                          <div className='flex items-center justify-between text-xs text-gray-500'>
                            <span>{article.views} views</span>
                            <div className='flex items-center space-x-1'>
                              <Star className='h-3 w-3 fill-current text-yellow-400' />
                              <span>{article.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Need Help */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Need More Help?</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      size='sm'
                    >
                      <Phone className='mr-2 h-4 w-4' />
                      Schedule a Call
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      size='sm'
                    >
                      <Mail className='mr-2 h-4 w-4' />
                      Email Support
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      size='sm'
                    >
                      <MessageCircle className='mr-2 h-4 w-4' />
                      Live Chat
                    </Button>
                  </CardContent>
                </Card>

                {/* Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center space-x-2'>
                      <CheckCircle className='h-5 w-5 text-green-500' />
                      <span className='text-sm font-medium text-gray-900'>
                        All systems operational
                      </span>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      Last updated: 2 minutes ago{' '}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>{' '}
          {/* Additional Resources */}
          <div className='mt-16'>
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                  <div className='text-center'>
                    <Video className='text-primary mx-auto mb-3 h-8 w-8' />
                    <h3 className='mb-2 font-semibold text-gray-900'>
                      Video Library
                    </h3>
                    <p className='mb-4 text-sm text-gray-600'>
                      Watch comprehensive video tutorials covering all features
                    </p>
                    <Button variant='outline' size='sm'>
                      <ExternalLink className='mr-2 h-4 w-4' />
                      View Videos
                    </Button>
                  </div>
                  <div className='text-center'>
                    <Download className='text-primary mx-auto mb-3 h-8 w-8' />
                    <h3 className='mb-2 font-semibold text-gray-900'>
                      Downloads
                    </h3>
                    <p className='mb-4 text-sm text-gray-600'>
                      Get our mobile apps, templates, and quick reference guides
                    </p>
                    <Button variant='outline' size='sm'>
                      <Download className='mr-2 h-4 w-4' />
                      Download Center
                    </Button>
                  </div>
                  <div className='text-center'>
                    <MessageCircle className='text-primary mx-auto mb-3 h-8 w-8' />
                    <h3 className='mb-2 font-semibold text-gray-900'>
                      Community
                    </h3>
                    <p className='mb-4 text-sm text-gray-600'>
                      Connect with other property managers and share best
                      practices
                    </p>
                    <Button variant='outline' size='sm'>
                      <ExternalLink className='mr-2 h-4 w-4' />
                      Join Community
                    </Button>
                  </div>
                </div>{' '}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default UserGuidePage;
