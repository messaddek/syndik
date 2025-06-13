'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
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
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'step-1', title: 'Navigate to Properties', level: 1 },
    { id: 'step-2', title: 'Fill in Property Details', level: 1 },
    { id: 'step-3', title: 'Configure Property Settings', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Setting Up User Accounts',
      href: '/user-guide/getting-started/setting-up-user-accounts',
      time: '3 min',
    },
    {
      title: 'Understanding Roles & Permissions',
      href: '/user-guide/getting-started/understanding-roles-permissions',
      time: '7 min',
    },
    {
      title: 'Initial Configuration Guide',
      href: '/user-guide/getting-started/initial-configuration-guide',
      time: '10 min',
    },
  ];

  return (
    <ArticleLayout
      articleSlug='creating-your-first-property'
      title='Creating Your First Property'
    >
      {/* Breadcrumb */}
      <nav className='mb-8'>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <Link
            href='/user-guide'
            className='transition-colors hover:text-gray-900'
          >
            User Guide
          </Link>
          <ChevronRight className='h-4 w-4' />
          <Link
            href='/user-guide'
            className='transition-colors hover:text-gray-900'
          >
            Getting Started
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900'>Creating Your First Property</span>
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
                    Creating Your First Property
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>Getting Started</Badge>
                    <Badge variant='outline'>Popular</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-lg text-gray-600'>
                Learn how to add your first property to Syndik and get started
                with property management. This guide will walk you through the
                complete process of creating a property and setting it up for
                success.
              </p>
            </div>

            {/* Content */}
            <div className='space-y-8 p-6'>
              {' '}
              {/* Overview */}
              <section id='overview'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Overview
                </h2>
                <p className='mb-4 text-gray-700'>
                  Creating your first property is an important step in setting
                  up your property management system. This guide will walk you
                  through the entire process, from navigation to configuration,
                  ensuring you have all the necessary information to get
                  started.
                </p>

                <Card className='border-blue-200 bg-blue-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <Lightbulb className='mt-0.5 h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-medium text-blue-800'>
                          What You&apos;ll Learn
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-blue-700'>
                          <li>
                            • How to navigate to the property creation form
                          </li>
                          <li>
                            • Required information for creating a property
                          </li>
                          <li>• Best practices for property setup</li>
                          <li>• How to configure initial property settings</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Step 1 */}
              <section id='step-1'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Step 1: Navigate to Properties
                </h2>
                <p className='mb-4 text-gray-700'>
                  Once you&apos;re logged into your Syndik dashboard, follow
                  these steps to create your first property:
                </p>

                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      1
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Access Buildings Menu
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Click on <strong>&quot;Buildings&quot;</strong> in the
                        main navigation menu
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      2
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Find Add Property Button
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Look for the{' '}
                        <strong>&quot;Add New Property&quot;</strong> button in
                        the top right corner
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      3
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Open Creation Form
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Click the button to open the property creation form
                      </p>
                    </div>
                  </div>
                </div>

                <Card className='mt-4 border-yellow-200 bg-yellow-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                      <div>
                        <p className='font-medium text-yellow-800'>Pro Tip</p>
                        <p className='text-sm text-yellow-700'>
                          Make sure you have all property documents ready before
                          starting, including property deeds, building permits,
                          and any existing tenant information.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Step 2 */}
              <section id='step-2'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Step 2: Fill in Property Details
                </h2>
                <p className='mb-4 text-gray-700'>
                  The property creation form requires the following information.
                  Make sure to fill in all required fields accurately:
                </p>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg text-green-700'>
                        Required Fields
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm'>Property Name</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm'>Street Address</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm'>City</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm'>State/Province</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm'>Postal Code</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm'>Property Type</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg text-blue-700'>
                        Optional Fields
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span className='text-sm'>Property Description</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span className='text-sm'>Year Built</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span className='text-sm'>Total Square Footage</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span className='text-sm'>Parking Spaces</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span className='text-sm'>Amenities</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span className='text-sm'>Property Manager</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Step 3 */}
              <section id='step-3'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Step 3: Configure Property Settings
                </h2>
                <p className='mb-4 text-gray-700'>
                  After entering the basic details, configure these important
                  settings to ensure smooth operations:
                </p>

                <div className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Rent Collection Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-600'>
                        Set up default rent collection preferences, payment
                        methods, and due dates that will apply to all units in
                        this property.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Communication Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-600'>
                        Choose how residents can contact management and receive
                        notifications (email, SMS, in-app notifications).
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Maintenance Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-600'>
                        Configure maintenance request workflows, assign default
                        maintenance staff, and set priority levels.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Next Steps */}
              <section id='next-steps'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Next Steps
                </h2>
                <p className='mb-4 text-gray-700'>
                  Congratulations! You&apos;ve created your first property.
                  Here&apos;s what to do next:
                </p>{' '}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Link href='/user-guide/property-management/unit-management-organization'>
                    <Card className='cursor-pointer transition-shadow hover:shadow-md'>
                      <CardContent className='p-4'>
                        <h4 className='mb-2 font-semibold'>Manage Units</h4>
                        <p className='text-sm text-gray-600'>
                          Learn how to add and organize units within your
                          property.
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href='/user-guide/resident-management/adding-new-residents'>
                    <Card className='cursor-pointer transition-shadow hover:shadow-md'>
                      <CardContent className='p-4'>
                        <h4 className='mb-2 font-semibold'>Add Residents</h4>
                        <p className='text-sm text-gray-600'>
                          Start adding residents to your property units.
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Table of Contents */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Table of Contents</CardTitle>
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
            <CardHeader>
              <CardTitle className='text-lg'>Related Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {relatedArticles.map((article, index) => (
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
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start'
                size='sm'
              >
                <Mail className='mr-2 h-4 w-4' />
                Contact Support
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                size='sm'
              >
                {' '}
                <Users className='mr-2 h-4 w-4' />
                Join Community{' '}
              </Button>{' '}
            </CardContent>
          </Card>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default CreatingYourFirstPropertyPage;
