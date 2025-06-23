'use client';

import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Building2,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Upload,
  FileText,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

const AddingNewPropertiesPage = () => {
  const t = useTranslations('articles.addingNewProperties');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: t('sections.overview.title'), level: 1 },
    { id: 'preparation', title: t('sections.preparation.title'), level: 1 },
    { id: 'basic-info', title: t('sections.basicInfo.title'), level: 1 },
    {
      id: 'property-details',
      title: t('sections.propertyDetails.title'),
      level: 1,
    },
    { id: 'units-setup', title: t('sections.unitsSetup.title'), level: 1 },
    { id: 'documents', title: t('sections.documents.title'), level: 1 },
    { id: 'verification', title: t('sections.verification.title'), level: 1 },
  ];

  const relatedArticles = [
    {
      title: tNav('relatedArticles.unitManagement'),
      href: '/user-guide/property-management/unit-management-organization',
      time: '6 min',
    },
    {
      title: tNav('relatedArticles.propertyUpdates'),
      href: '/user-guide/property-management/property-information-updates',
      time: '3 min',
    },
    {
      title: tNav('relatedArticles.documentManagement'),
      href: '/user-guide/property-management/document-management-system',
      time: '8 min',
    },
  ];
  return (
    <ArticleLayout articleSlug='adding-new-properties' title={t('title')}>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='mx-auto max-w-4xl'>
            {/* Hero Section */}
            <div className='mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <Building2 className='h-8 w-8 text-blue-600' />
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
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center text-sm'>
                        <FileText className='mr-2 h-4 w-4 text-blue-500' />
                        {t('sections.overview.steps.basicInfo')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-600'>
                        {t('sections.overview.stepDescriptions.basicInfo')}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center text-sm'>
                        <MapPin className='mr-2 h-4 w-4 text-green-500' />
                        {t('sections.overview.steps.propertyDetails')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-600'>
                        {t(
                          'sections.overview.stepDescriptions.propertyDetails'
                        )}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center text-sm'>
                        <Upload className='mr-2 h-4 w-4 text-purple-500' />
                        {t('sections.overview.steps.documentation')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-600'>
                        {t('sections.overview.stepDescriptions.documentation')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Preparation */}
              <section id='preparation'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.preparation.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.preparation.description')}
                </p>
                <Card className='mb-6 border-orange-200 bg-orange-50'>
                  <CardHeader>
                    <CardTitle className='flex items-center text-orange-800'>
                      <AlertTriangle className='mr-2 h-5 w-5' />
                      {t('sections.preparation.requirements.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2 text-sm text-orange-700'>
                      <li className='flex items-start'>
                        <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
                        {t(
                          'sections.preparation.requirements.items.propertyDeed'
                        )}
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
                        {t(
                          'sections.preparation.requirements.items.legalDocuments'
                        )}
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
                        {t(
                          'sections.preparation.requirements.items.floorPlans'
                        )}
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
                        {t(
                          'sections.preparation.requirements.items.financialInfo'
                        )}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Basic Information */}
              <section id='basic-info'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.basicInfo.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.basicInfo.description')}
                </p>
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t('sections.basicInfo.form.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <label className='text-sm font-medium text-gray-700'>
                            {t('sections.basicInfo.form.fields.propertyName')}
                          </label>
                          <div className='rounded border bg-gray-50 p-3 text-sm text-gray-600'>
                            {t('sections.basicInfo.form.examples.propertyName')}
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <label className='text-sm font-medium text-gray-700'>
                            {t('sections.basicInfo.form.fields.propertyType')}
                          </label>
                          <div className='rounded border bg-gray-50 p-3 text-sm text-gray-600'>
                            {t('sections.basicInfo.form.examples.propertyType')}
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <label className='text-sm font-medium text-gray-700'>
                            {t('sections.basicInfo.form.fields.address')}
                          </label>
                          <div className='rounded border bg-gray-50 p-3 text-sm text-gray-600'>
                            {t('sections.basicInfo.form.examples.address')}
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <label className='text-sm font-medium text-gray-700'>
                            {t('sections.basicInfo.form.fields.totalUnits')}
                          </label>
                          <div className='rounded border bg-gray-50 p-3 text-sm text-gray-600'>
                            {t('sections.basicInfo.form.examples.totalUnits')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Property Details */}
              <section id='property-details'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.propertyDetails.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.propertyDetails.description')}
                </p>
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t('sections.propertyDetails.specifications.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h4 className='font-semibold text-gray-900'>
                            {t(
                              'sections.propertyDetails.specifications.physical.title'
                            )}
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.physical.items.totalArea'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.physical.items.buildingHeight'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.physical.items.floors'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.physical.items.parking'
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className='space-y-4'>
                          <h4 className='font-semibold text-gray-900'>
                            {t(
                              'sections.propertyDetails.specifications.amenities.title'
                            )}
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.amenities.items.elevator'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.amenities.items.gym'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.amenities.items.pool'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.propertyDetails.specifications.amenities.items.security'
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Units Setup */}
              <section id='units-setup'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.unitsSetup.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.unitsSetup.description')}
                </p>
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t('sections.unitsSetup.methods.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                          <h4 className='mb-2 font-semibold text-blue-900'>
                            {t('sections.unitsSetup.methods.individual.title')}
                          </h4>
                          <p className='mb-3 text-sm text-blue-700'>
                            {t(
                              'sections.unitsSetup.methods.individual.description'
                            )}
                          </p>
                          <ul className='space-y-1 text-sm text-blue-600'>
                            <li>
                              •
                              {t(
                                'sections.unitsSetup.methods.individual.pros.control'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.unitsSetup.methods.individual.pros.customization'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.unitsSetup.methods.individual.pros.accuracy'
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                          <h4 className='mb-2 font-semibold text-green-900'>
                            {t('sections.unitsSetup.methods.bulk.title')}
                          </h4>
                          <p className='mb-3 text-sm text-green-700'>
                            {t('sections.unitsSetup.methods.bulk.description')}
                          </p>
                          <ul className='space-y-1 text-sm text-green-600'>
                            <li>
                              •
                              {t('sections.unitsSetup.methods.bulk.pros.speed')}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.unitsSetup.methods.bulk.pros.consistency'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.unitsSetup.methods.bulk.pros.efficiency'
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Documents */}
              <section id='documents'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.documents.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.documents.description')}
                </p>
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t('sections.documents.required.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-3'>
                          <h4 className='font-semibold text-gray-900'>
                            {t('sections.documents.required.legal.title')}
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-start'>
                              <FileText className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                              {t(
                                'sections.documents.required.legal.items.deed'
                              )}
                            </li>
                            <li className='flex items-start'>
                              <FileText className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                              {t(
                                'sections.documents.required.legal.items.permits'
                              )}
                            </li>
                            <li className='flex items-start'>
                              <FileText className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-500' />
                              {t(
                                'sections.documents.required.legal.items.zoning'
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className='space-y-3'>
                          <h4 className='font-semibold text-gray-900'>
                            {t('sections.documents.required.technical.title')}
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-start'>
                              <FileText className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                              {t(
                                'sections.documents.required.technical.items.floorPlans'
                              )}
                            </li>
                            <li className='flex items-start'>
                              <FileText className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                              {t(
                                'sections.documents.required.technical.items.inspection'
                              )}
                            </li>
                            <li className='flex items-start'>
                              <FileText className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500' />
                              {t(
                                'sections.documents.required.technical.items.utilities'
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Verification */}
              <section id='verification'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.verification.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.verification.description')}
                </p>
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t('sections.verification.checklist.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
                          <div>
                            <h4 className='font-medium text-gray-900'>
                              {t(
                                'sections.verification.checklist.items.information.title'
                              )}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {t(
                                'sections.verification.checklist.items.information.description'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
                          <div>
                            <h4 className='font-medium text-gray-900'>
                              {t(
                                'sections.verification.checklist.items.documents.title'
                              )}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {t(
                                'sections.verification.checklist.items.documents.description'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
                          <div>
                            <h4 className='font-medium text-gray-900'>
                              {t(
                                'sections.verification.checklist.items.units.title'
                              )}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {t(
                                'sections.verification.checklist.items.units.description'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
                          <div>
                            <h4 className='font-medium text-gray-900'>
                              {t(
                                'sections.verification.checklist.items.compliance.title'
                              )}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {t(
                                'sections.verification.checklist.items.compliance.description'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                  <Link href='/user-guide/property-management/unit-management-organization'>
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

export default AddingNewPropertiesPage;
