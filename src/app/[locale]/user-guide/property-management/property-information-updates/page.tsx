'use client';

import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Edit,
  RefreshCw,
  Database,
  Settings,
} from 'lucide-react';

const PropertyInformationUpdatesPage = () => {
  const t = useTranslations('articles.propertyInformationUpdates');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: t('sections.overview.title'), level: 1 },
    {
      id: 'basic-information',
      title: t('sections.basicInformation.title'),
      level: 1,
    },
    {
      id: 'contact-details',
      title: t('sections.contactDetails.title'),
      level: 1,
    },
    {
      id: 'financial-settings',
      title: t('sections.financialSettings.title'),
      level: 1,
    },
    {
      id: 'amenities-features',
      title: t('sections.amenitiesFeatures.title'),
      level: 1,
    },
    {
      id: 'policies-rules',
      title: t('sections.policiesRules.title'),
      level: 1,
    },
    { id: 'bulk-updates', title: t('sections.bulkUpdates.title'), level: 1 },
  ];

  const relatedArticles = [
    {
      title: tNav('relatedArticles.addingProperties'),
      href: '/user-guide/property-management/adding-new-properties',
      time: '5 min',
    },
    {
      title: tNav('relatedArticles.unitManagement'),
      href: '/user-guide/property-management/unit-management-organization',
      time: '6 min',
    },
    {
      title: tNav('relatedArticles.documentManagement'),
      href: '/user-guide/property-management/document-management-system',
      time: '8 min',
    },
  ];

  return (
    <ArticleLayout
      articleSlug='property-information-updates'
      title={t('title')}
    >
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='mx-auto max-w-4xl'>
            {/* Hero Section */}
            <div className='mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <Edit className='h-8 w-8 text-blue-600' />
                <Badge
                  variant='secondary'
                  className='bg-blue-100 text-blue-800'
                >
                  {tCommon('badges.essential')}
                </Badge>
              </div>
              <h1 className='mb-3 text-3xl font-bold text-gray-900'>
                {t('hero.title')}
              </h1>
              <p className='text-lg text-gray-700'>{t('hero.description')}</p>
            </div>

            {/* Content */}
            <div className='space-y-8 p-6'>
              {/* Overview */}
              <section id='overview'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.overview.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.overview.description')}
                </p>
                <Card className='border-blue-200 bg-blue-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-medium text-blue-800'>
                          {t('sections.overview.importance.title')}
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-blue-700'>
                          <li>
                            • {t('sections.overview.importance.items.accuracy')}
                          </li>
                          <li>
                            •
                            {t('sections.overview.importance.items.compliance')}
                          </li>
                          <li>
                            •
                            {t('sections.overview.importance.items.efficiency')}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.overview.importance.items.communication'
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Basic Information */}
              <section id='basic-information'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.basicInformation.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.basicInformation.description')}
                </p>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2'>
                      <Database className='h-5 w-5' />
                      <span>{t('sections.basicInformation.form.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-gray-900'>
                          {t('sections.basicInformation.form.essential.title')}
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                            {t(
                              'sections.basicInformation.form.essential.items.propertyName'
                            )}
                          </li>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                            {t(
                              'sections.basicInformation.form.essential.items.address'
                            )}
                          </li>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                            {t(
                              'sections.basicInformation.form.essential.items.propertyType'
                            )}
                          </li>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                            {t(
                              'sections.basicInformation.form.essential.items.buildYear'
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-gray-900'>
                          {t('sections.basicInformation.form.additional.title')}
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                            {t(
                              'sections.basicInformation.form.additional.items.description'
                            )}
                          </li>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                            {t(
                              'sections.basicInformation.form.additional.items.squareFootage'
                            )}
                          </li>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                            {t(
                              'sections.basicInformation.form.additional.items.lotSize'
                            )}
                          </li>
                          <li className='flex items-start'>
                            <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                            {t(
                              'sections.basicInformation.form.additional.items.floors'
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Contact Details */}
              <section id='contact-details'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.contactDetails.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.contactDetails.description')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.contactDetails.management.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.management.items.company'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.management.items.manager'
                          )}
                        </li>
                        <li>
                          •
                          {t('sections.contactDetails.management.items.phone')}
                        </li>
                        <li>
                          •
                          {t('sections.contactDetails.management.items.email')}
                        </li>
                        <li>
                          •
                          {t('sections.contactDetails.management.items.hours')}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.contactDetails.emergency.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.emergency.items.maintenanceHotline'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.emergency.items.afterHours'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.emergency.items.security'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.emergency.items.utilities'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.contactDetails.emergency.items.procedures'
                          )}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Financial Settings */}
              <section id='financial-settings'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.financialSettings.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.financialSettings.description')}
                </p>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2'>
                      <Settings className='h-5 w-5' />
                      <span>
                        {t('sections.financialSettings.configuration.title')}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-gray-900'>
                          {t(
                            'sections.financialSettings.configuration.rent.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.rent.items.baseRent'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.rent.items.increases'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.rent.items.schedule'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.rent.items.penalties'
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-gray-900'>
                          {t(
                            'sections.financialSettings.configuration.fees.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.fees.items.application'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.fees.items.security'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.fees.items.pet'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.fees.items.parking'
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-gray-900'>
                          {t(
                            'sections.financialSettings.configuration.utilities.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.utilities.items.included'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.utilities.items.separate'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.utilities.items.allocation'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.financialSettings.configuration.utilities.items.billing'
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Amenities & Features */}
              <section id='amenities-features'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.amenitiesFeatures.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.amenitiesFeatures.description')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.amenitiesFeatures.property.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.property.items.pool'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t('sections.amenitiesFeatures.property.items.gym')}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.property.items.parking'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.property.items.laundry'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.property.items.security'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.amenitiesFeatures.community.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.community.items.clubhouse'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.community.items.playground'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.community.items.businessCenter'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.community.items.rooftop'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenitiesFeatures.community.items.concierge'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Policies & Rules */}
              <section id='policies-rules'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.policiesRules.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.policiesRules.description')}
                </p>
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t('sections.policiesRules.categories.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <h4 className='mb-2 font-semibold text-gray-900'>
                            {t(
                              'sections.policiesRules.categories.residential.title'
                            )}
                          </h4>
                          <ul className='space-y-1 text-sm text-gray-600'>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.residential.items.petPolicy'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.residential.items.smoking'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.residential.items.noise'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.residential.items.guests'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.residential.items.subletting'
                              )}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='mb-2 font-semibold text-gray-900'>
                            {t(
                              'sections.policiesRules.categories.operational.title'
                            )}
                          </h4>
                          <ul className='space-y-1 text-sm text-gray-600'>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.operational.items.maintenance'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.operational.items.access'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.operational.items.parking'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.operational.items.common'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.policiesRules.categories.operational.items.emergency'
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Bulk Updates */}
              <section id='bulk-updates'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.bulkUpdates.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.bulkUpdates.description')}
                </p>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2'>
                      <RefreshCw className='h-5 w-5' />
                      <span>{t('sections.bulkUpdates.operations.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <h4 className='mb-2 font-semibold text-green-700'>
                          {t('sections.bulkUpdates.operations.financial.title')}
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.financial.items.rentAdjustments'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.financial.items.feeUpdates'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.financial.items.depositChanges'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.financial.items.utilityRates'
                            )}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='mb-2 font-semibold text-blue-700'>
                          {t(
                            'sections.bulkUpdates.operations.administrative.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.administrative.items.contactInfo'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.administrative.items.policies'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.administrative.items.amenities'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.bulkUpdates.operations.administrative.items.descriptions'
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='mt-4 border-yellow-200 bg-yellow-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                      <div>
                        <p className='font-medium text-yellow-800'>
                          {t('sections.bulkUpdates.warning.title')}
                        </p>
                        <p className='text-sm text-yellow-700'>
                          {t('sections.bulkUpdates.warning.description')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Navigation */}
              <div className='flex items-center justify-between border-t pt-8'>
                <Button
                  variant='outline'
                  className='flex items-center space-x-2'
                  asChild
                >
                  <Link href='/user-guide'>
                    <ArrowLeft className='h-4 w-4' />
                    <span>{tNav('backToGuide')}</span>
                  </Link>
                </Button>

                <Button className='flex items-center space-x-2' asChild>
                  <Link href='/user-guide/property-management/document-management-system'>
                    <span>{tNav('nextArticle')}</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
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
    </ArticleLayout>
  );
};

export default PropertyInformationUpdatesPage;
