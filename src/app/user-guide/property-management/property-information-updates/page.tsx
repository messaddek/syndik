import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  Mail,
  Edit,
} from 'lucide-react';

const PropertyInformationUpdatesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    {
      id: 'updating-basic-info',
      title: 'Updating Basic Information',
      level: 1,
    },
    {
      id: 'property-amenities',
      title: 'Managing Property Amenities',
      level: 1,
    },
    {
      id: 'contact-information',
      title: 'Contact Information Updates',
      level: 1,
    },
    { id: 'photos-documents', title: 'Photos and Documents', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Properties',
      href: '/user-guide/property-management/adding-new-properties',
      time: '4 min',
    },
    {
      title: 'Unit Management & Organization',
      href: '/user-guide/property-management/unit-management-organization',
      time: '6 min',
    },
    {
      title: 'Document Management System',
      href: '/user-guide/property-management/document-management-system',
      time: '8 min',
    },
  ];

  return (
    <LandingLayout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <div className='flex items-center space-x-2 text-sm text-gray-600'>
              <Link href='/user-guide' className='hover:text-gray-900'>
                User Guide
              </Link>
              <ChevronRight className='h-4 w-4' />
              <Link
                href='/user-guide#property-management'
                className='hover:text-gray-900'
              >
                Property Management
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='font-medium text-gray-900'>
                Property Information Updates
              </span>
            </div>
          </nav>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              {/* Header */}
              <div className='mb-8'>
                <div className='mb-4 flex items-center space-x-3'>
                  <div className='rounded-lg bg-emerald-500 p-2'>
                    <Edit className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold text-gray-900'>
                      Property Information Updates
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>3 min read</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>All users</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>
                  Learn how to keep your property information current and
                  accurate with our comprehensive updating tools.
                </p>
              </div>

              {/* Overview */}
              <section id='overview' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Overview
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      Keeping property information up-to-date is essential for
                      effective property management. This guide walks you
                      through all the ways you can update and maintain your
                      property details in Syndik.
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='mt-0.5 h-5 w-5 text-blue-600' />
                        <div>
                          <h4 className='font-medium text-blue-900'>Pro Tip</h4>
                          <p className='text-sm text-blue-800'>
                            Regular property information updates help maintain
                            accurate records and improve tenant satisfaction.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Step 1 */}
              <section id='updating-basic-info' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Updating Basic Information
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Property Details
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                1
                              </span>
                              <span>
                                Navigate to Properties → Select your property
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                2
                              </span>
                              <span>
                                Click &ldquo;Edit Property&rdquo; in the
                                property overview
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                3
                              </span>
                              <span>
                                Update name, address, description as needed
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                4
                              </span>
                              <span>Save your changes</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Step 2 */}
              <section id='property-amenities' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Managing Property Amenities
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      Keep your amenity list current to accurately represent
                      your property&apos;s offerings:
                    </p>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='rounded-lg border border-gray-200 p-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          Common Amenities
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>• Swimming pool</li>
                          <li>• Fitness center</li>
                          <li>• Parking spaces</li>
                          <li>• Laundry facilities</li>
                        </ul>
                      </div>
                      <div className='rounded-lg border border-gray-200 p-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          Unit Features
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>• Air conditioning</li>
                          <li>• Dishwasher</li>
                          <li>• In-unit laundry</li>
                          <li>• Balcony/Patio</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Step 3 */}
              <section id='contact-information' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Contact Information Updates
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='mb-4 rounded-lg bg-yellow-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                        <div>
                          <h4 className='font-medium text-yellow-900'>
                            Important
                          </h4>
                          <p className='text-sm text-yellow-800'>
                            Always update contact information immediately when
                            changes occur to ensure tenants can reach you in
                            emergencies.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='flex items-center space-x-3 rounded-lg bg-gray-50 p-3'>
                        <CheckCircle className='h-5 w-5 text-green-500' />
                        <span className='text-sm text-gray-700'>
                          Office phone and emergency contact numbers
                        </span>
                      </div>
                      <div className='flex items-center space-x-3 rounded-lg bg-gray-50 p-3'>
                        <CheckCircle className='h-5 w-5 text-green-500' />
                        <span className='text-sm text-gray-700'>
                          Management company details and website
                        </span>
                      </div>
                      <div className='flex items-center space-x-3 rounded-lg bg-gray-50 p-3'>
                        <CheckCircle className='h-5 w-5 text-green-500' />
                        <span className='text-sm text-gray-700'>
                          Maintenance request submission process
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Step 4 */}
              <section id='photos-documents' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Photos and Documents
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      Keep visual content and important documents current:
                    </p>
                    <div className='space-y-4'>
                      <div className='border-l-4 border-emerald-500 pl-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          Photo Updates
                        </h4>
                        <p className='text-sm text-gray-600'>
                          Upload new photos after renovations, seasonal changes,
                          or amenity additions to keep listings attractive and
                          accurate.
                        </p>
                      </div>
                      <div className='border-l-4 border-blue-500 pl-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          Document Management
                        </h4>
                        <p className='text-sm text-gray-600'>
                          Update property rules, lease templates, and compliance
                          documents as regulations change or policies are
                          updated.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Best Practices */}
              <section id='best-practices' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Best Practices
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Regular Maintenance
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Review information quarterly</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Update photos annually</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Verify contact details monthly</span>
                          </li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Quality Control
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Proofread all text changes</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Test contact information</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Maintain consistent formatting</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
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
                          className='block text-sm text-gray-600 hover:text-gray-900'
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
                          className='block rounded-lg p-3 transition-colors hover:bg-gray-50'
                        >
                          <h4 className='text-sm font-medium text-gray-900'>
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

                {/* Need Help */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                      >
                        <Mail className='mr-2 h-4 w-4' />
                        Contact Support
                      </Button>
                      <p className='text-xs text-gray-500'>
                        Our team is here to help you make the most of Syndik.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default PropertyInformationUpdatesPage;
