'use client';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Users,
  CheckCircle,
  AlertCircle,
  Building,
  ChevronRight,
  ArrowLeft,
  Home,
  Layout,
  Hash,
  Tag,
  FileText,
  Settings,
} from 'lucide-react';

const UnitManagementOrganizationPage = () => {
  const t = useTranslations('articles.unitManagementOrganization');
  const tCommon = useTranslations('articles.common');
  const tNav = useTranslations('articles.navigation');

  const tableOfContents = [
    { id: 'overview', title: t('sections.overview.title'), level: 1 },
    { id: 'adding-units', title: t('sections.addingUnits.title'), level: 1 },
    {
      id: 'unit-numbering',
      title: t('sections.unitNumbering.title'),
      level: 1,
    },
    { id: 'unit-types', title: t('sections.unitTypes.title'), level: 1 },
    { id: 'floor-plans', title: t('sections.floorPlans.title'), level: 1 },
    { id: 'amenities', title: t('sections.amenities.title'), level: 1 },
    {
      id: 'status-management',
      title: t('sections.statusManagement.title'),
      level: 1,
    },
    {
      id: 'bulk-operations',
      title: t('sections.bulkOperations.title'),
      level: 1,
    },
  ];

  const relatedArticles = [
    {
      title: tNav('relatedArticles.addingProperties'),
      href: '/user-guide/property-management/adding-new-properties',
      time: '4 min',
    },
    {
      title: tNav('relatedArticles.firstProperty'),
      href: '/user-guide/getting-started/creating-your-first-property',
      time: '5 min',
    },
    {
      title: tNav('relatedArticles.addingResidents'),
      href: '/user-guide/resident-management/adding-new-residents',
      time: '5 min',
    },
  ];

  return (
    <ArticleLayout
      articleSlug='unit-management-organization'
      title={t('title')}
    >
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='mx-auto max-w-4xl'>
            {/* Hero Section */}
            <div className='mb-8 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <Layout className='h-8 w-8 text-emerald-600' />
                <Badge
                  variant='secondary'
                  className='bg-emerald-100 text-emerald-800'
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
                <Card className='border-emerald-200 bg-emerald-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-emerald-600' />
                      <div>
                        <p className='font-medium text-emerald-800'>
                          {t('sections.overview.benefits.title')}
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-emerald-700'>
                          <li>
                            • {t('sections.overview.benefits.items.tracking')}
                          </li>
                          <li>
                            •
                            {t('sections.overview.benefits.items.maintenance')}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.overview.benefits.items.communication'
                            )}
                          </li>
                          <li>
                            • {t('sections.overview.benefits.items.analysis')}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Adding Units */}
              <section id='adding-units'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.addingUnits.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.addingUnits.description')}
                </p>
                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      1
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        {t('sections.addingUnits.steps.navigate.title')}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {t('sections.addingUnits.steps.navigate.description')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      2
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        {t('sections.addingUnits.steps.click.title')}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {t('sections.addingUnits.steps.click.description')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      3
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        {t('sections.addingUnits.steps.fill.title')}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {t('sections.addingUnits.steps.fill.description')}
                      </p>
                    </div>
                  </div>
                </div>

                <Card className='mt-4'>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      {t('sections.addingUnits.requiredInfo.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <h4 className='mb-2 font-semibold text-green-700'>
                          {t(
                            'sections.addingUnits.requiredInfo.essential.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.essential.items.unitNumber'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.essential.items.floor'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.essential.items.unitType'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.essential.items.squareFootage'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.essential.items.bedrooms'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.essential.items.bathrooms'
                            )}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='mb-2 font-semibold text-blue-700'>
                          {t(
                            'sections.addingUnits.requiredInfo.optional.title'
                          )}
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.optional.items.description'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.optional.items.balcony'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.optional.items.parking'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.optional.items.storage'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.optional.items.petPolicy'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.addingUnits.requiredInfo.optional.items.accessibility'
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Unit Numbering */}
              <section id='unit-numbering'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.unitNumbering.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.unitNumbering.description')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2 text-lg'>
                        <Hash className='h-5 w-5' />
                        <span>
                          {t('sections.unitNumbering.systems.sequential.title')}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='mb-3 text-sm text-gray-600'>
                        {t(
                          'sections.unitNumbering.systems.sequential.description'
                        )}
                      </p>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span>
                            {t(
                              'sections.unitNumbering.systems.sequential.examples.label'
                            )}
                            :
                          </span>
                          <span className='font-mono'>
                            {t(
                              'sections.unitNumbering.systems.sequential.examples.value'
                            )}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>
                            {t(
                              'sections.unitNumbering.systems.sequential.bestFor.label'
                            )}
                            :
                          </span>
                          <span>
                            {t(
                              'sections.unitNumbering.systems.sequential.bestFor.value'
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2 text-lg'>
                        <Building className='h-5 w-5' />
                        <span>
                          {t('sections.unitNumbering.systems.floorBased.title')}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='mb-3 text-sm text-gray-600'>
                        {t(
                          'sections.unitNumbering.systems.floorBased.description'
                        )}
                      </p>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span>
                            {t(
                              'sections.unitNumbering.systems.floorBased.examples.label'
                            )}
                            :
                          </span>
                          <span className='font-mono'>
                            {t(
                              'sections.unitNumbering.systems.floorBased.examples.value'
                            )}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>
                            {t(
                              'sections.unitNumbering.systems.floorBased.bestFor.label'
                            )}
                            :
                          </span>
                          <span>
                            {t(
                              'sections.unitNumbering.systems.floorBased.bestFor.value'
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className='mt-4 border-yellow-200 bg-yellow-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                      <div>
                        <p className='font-medium text-yellow-800'>
                          {t('sections.unitNumbering.bestPractices.title')}
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-yellow-700'>
                          <li>
                            •
                            {t(
                              'sections.unitNumbering.bestPractices.items.consistency'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.unitNumbering.bestPractices.items.avoidConfusion'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.unitNumbering.bestPractices.items.expansion'
                            )}
                          </li>
                          <li>
                            •
                            {t(
                              'sections.unitNumbering.bestPractices.items.accessibility'
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Unit Types */}
              <section id='unit-types'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.unitTypes.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.unitTypes.description')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.unitTypes.categories.residential.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center space-x-2'>
                          <Home className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.residential.items.studio'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Home className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.residential.items.oneBedroom'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Home className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.residential.items.twoBedroom'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Home className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.residential.items.threePlus'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Home className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.residential.items.penthouse'
                            )}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.unitTypes.categories.special.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center space-x-2'>
                          <Tag className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.special.items.accessible'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Tag className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.special.items.furnished'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Tag className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.special.items.shortTerm'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Tag className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.special.items.corporate'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Tag className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.special.items.model'
                            )}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.unitTypes.categories.commercial.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center space-x-2'>
                          <Building className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.commercial.items.retail'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Building className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.commercial.items.office'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Building className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.commercial.items.storage'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Building className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.commercial.items.parking'
                            )}
                          </span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <Building className='h-4 w-4 text-gray-400' />
                          <span>
                            {t(
                              'sections.unitTypes.categories.commercial.items.common'
                            )}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Floor Plans */}
              <section id='floor-plans'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.floorPlans.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.floorPlans.description')}
                </p>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2 text-lg'>
                      <FileText className='h-5 w-5' />
                      <span>{t('sections.floorPlans.management.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <h4 className='mb-2 font-semibold'>
                            {t('sections.floorPlans.management.formats.title')}
                          </h4>
                          <ul className='space-y-1 text-sm text-gray-600'>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.formats.items.pdf'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.formats.items.images'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.formats.items.cad'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.formats.items.interactive'
                              )}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='mb-2 font-semibold'>
                            {t('sections.floorPlans.management.benefits.title')}
                          </h4>
                          <ul className='space-y-1 text-sm text-gray-600'>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.benefits.items.marketing'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.benefits.items.maintenance'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.benefits.items.utilization'
                              )}
                            </li>
                            <li>
                              •
                              {t(
                                'sections.floorPlans.management.benefits.items.virtualTour'
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Amenities */}
              <section id='amenities'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.amenities.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.amenities.description')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.amenities.categories.standard.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.standard.items.airConditioning'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.standard.items.dishwasher'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.standard.items.laundry'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.standard.items.hardwood'
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
                        {t('sections.amenities.categories.premium.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.premium.items.balcony'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.premium.items.walkInCloset'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.premium.items.fireplace'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            {t(
                              'sections.amenities.categories.premium.items.cityView'
                            )}
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Status Management */}
              <section id='status-management'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.statusManagement.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.statusManagement.description')}
                </p>
                <Card>
                  <CardContent className='p-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                          <CheckCircle className='h-6 w-6 text-green-600' />
                        </div>
                        <h4 className='font-semibold text-green-700'>
                          {t(
                            'sections.statusManagement.statuses.available.title'
                          )}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t(
                            'sections.statusManagement.statuses.available.description'
                          )}
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                          <Users className='h-6 w-6 text-blue-600' />
                        </div>
                        <h4 className='font-semibold text-blue-700'>
                          {t(
                            'sections.statusManagement.statuses.occupied.title'
                          )}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t(
                            'sections.statusManagement.statuses.occupied.description'
                          )}
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-100 p-3'>
                          <Settings className='h-6 w-6 text-yellow-600' />
                        </div>
                        <h4 className='font-semibold text-yellow-700'>
                          {t(
                            'sections.statusManagement.statuses.maintenance.title'
                          )}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t(
                            'sections.statusManagement.statuses.maintenance.description'
                          )}
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-gray-100 p-3'>
                          <AlertCircle className='h-6 w-6 text-gray-600' />
                        </div>
                        <h4 className='font-semibold text-gray-700'>
                          {t(
                            'sections.statusManagement.statuses.offline.title'
                          )}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t(
                            'sections.statusManagement.statuses.offline.description'
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Bulk Operations */}
              <section id='bulk-operations'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  {t('sections.bulkOperations.title')}
                </h2>
                <p className='mb-4 text-gray-700'>
                  {t('sections.bulkOperations.description')}
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.bulkOperations.types.creation.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.creation.items.import'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.creation.items.template'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.creation.items.pattern'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.creation.items.automatic'
                          )}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        {t('sections.bulkOperations.types.updates.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.updates.items.status'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.updates.items.rent'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.updates.items.amenity'
                          )}
                        </li>
                        <li>
                          •
                          {t(
                            'sections.bulkOperations.types.updates.items.category'
                          )}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className='mt-4 border-blue-200 bg-blue-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-medium text-blue-800'>
                          {t('sections.bulkOperations.tip.title')}
                        </p>
                        <p className='text-sm text-blue-700'>
                          {t('sections.bulkOperations.tip.description')}
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
                  <Link href='/user-guide/property-management/property-information-updates'>
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

export default UnitManagementOrganizationPage;
