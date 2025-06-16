import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { LandingLayout } from '@/components/landing/landing-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  Edit,
} from 'lucide-react';

const PropertyInformationUpdatesPage = () => {
  const t = useTranslations('articles.propertyInformationUpdates');

  const tableOfContents = t.raw('tableOfContents') as Array<{
    id: string;
    title: string;
    level: number;
  }>;
  const relatedArticles = t.raw('relatedArticles') as Array<{
    title: string;
    href: string;
    time: string;
  }>;

  return (
    <LandingLayout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <div className='flex items-center space-x-2 text-sm text-gray-600'>
              <Link href='/user-guide' className='hover:text-gray-900'>
                {t('breadcrumb.userGuide')}
              </Link>
              <ChevronRight className='h-4 w-4' />
              <Link
                href='/user-guide#property-management'
                className='hover:text-gray-900'
              >
                {t('breadcrumb.propertyManagement')}
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='font-medium text-gray-900'>
                {t('breadcrumb.current')}
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
                      {t('title')}
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>{t('meta.readTime')}</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>{t('meta.audience')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>{t('description')}</p>
              </div>
              {/* Overview */}
              <section id='overview' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.overview.title')}
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      {t('sections.overview.content')}
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='text-primary mt-0.5 h-5 w-5' />
                        <div>
                          <h4 className='font-medium text-blue-900'>
                            {t('sections.overview.proTip.title')}
                          </h4>
                          <p className='text-sm text-blue-800'>
                            {t('sections.overview.proTip.content')}
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
                  {t('sections.updatingBasicInfo.title')}
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          {t('sections.updatingBasicInfo.subtitle')}
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            {(
                              t.raw(
                                'sections.updatingBasicInfo.steps'
                              ) as string[]
                            ).map((step, index) => (
                              <li
                                key={index}
                                className='flex items-start space-x-2'
                              >
                                <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                  {index + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
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
                  {t('sections.propertyAmenities.title')}
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      {t('sections.propertyAmenities.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='rounded-lg border border-gray-200 p-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          {t(
                            'sections.propertyAmenities.commonAmenities.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          {(
                            t.raw(
                              'sections.propertyAmenities.commonAmenities.list'
                            ) as string[]
                          ).map((amenity, index) => (
                            <li key={index}>• {amenity}</li>
                          ))}
                        </ul>
                      </div>
                      <div className='rounded-lg border border-gray-200 p-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          {t('sections.propertyAmenities.unitFeatures.title')}
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          {(
                            t.raw(
                              'sections.propertyAmenities.unitFeatures.list'
                            ) as string[]
                          ).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Step 3 */}
              <section id='contact-information' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.contactInformation.title')}
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='mb-4 rounded-lg bg-yellow-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                        <div>
                          <h4 className='font-medium text-yellow-900'>
                            {t('sections.contactInformation.important.title')}
                          </h4>
                          <p className='text-sm text-yellow-800'>
                            {t('sections.contactInformation.important.content')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-4'>
                      {(
                        t.raw('sections.contactInformation.items') as string[]
                      ).map((item, index) => (
                        <div
                          key={index}
                          className='flex items-center space-x-3 rounded-lg bg-gray-50 p-3'
                        >
                          <CheckCircle className='h-5 w-5 text-green-500' />
                          <span className='text-sm text-gray-700'>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Step 4 */}
              <section id='photos-documents' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.photosDocuments.title')}
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      {t('sections.photosDocuments.content')}
                    </p>
                    <div className='space-y-4'>
                      <div className='border-l-4 border-emerald-500 pl-4 rtl:border-r-4 rtl:border-l-0 rtl:pr-4 rtl:pl-0'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          {t('sections.photosDocuments.photoUpdates.title')}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t('sections.photosDocuments.photoUpdates.content')}
                        </p>
                      </div>
                      <div className='border-l-4 border-blue-500 pl-4 rtl:border-r-4 rtl:border-l-0 rtl:pr-4 rtl:pl-0'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          {t(
                            'sections.photosDocuments.documentManagement.title'
                          )}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t(
                            'sections.photosDocuments.documentManagement.content'
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Best Practices */}
              <section id='best-practices' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.bestPractices.title')}
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          {t('sections.bestPractices.regularMaintenance.title')}
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          {(
                            t.raw(
                              'sections.bestPractices.regularMaintenance.items'
                            ) as string[]
                          ).map((item, index) => (
                            <li
                              key={index}
                              className='flex items-center space-x-2'
                            >
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          {t('sections.bestPractices.qualityControl.title')}
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          {(
                            t.raw(
                              'sections.bestPractices.qualityControl.items'
                            ) as string[]
                          ).map((item, index) => (
                            <li
                              key={index}
                              className='flex items-center space-x-2'
                            >
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <ArticleSidebar
                tableOfContents={tableOfContents}
                relatedArticles={relatedArticles}
                currentCategory='property-management'
                showQuickActions={true}
              />
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default PropertyInformationUpdatesPage;
