import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { ArticleLayout } from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  Home,
  Key,
  ClipboardCheck,
  DollarSign,
  FileText,
} from 'lucide-react';

const MoveInMoveOutProcessPage = () => {
  const t = useTranslations('articles.moveInMoveOutProcess');

  const tableOfContents = [
    { id: 'overview', title: t('sections.overview.title'), level: 1 },
    {
      id: 'move-in-process',
      title: t('sections.moveInProcess.title'),
      level: 1,
    },
    {
      id: 'move-out-process',
      title: t('sections.moveOutProcess.title'),
      level: 1,
    },
    {
      id: 'inspection-checklists',
      title: t('sections.inspectionChecklists.title'),
      level: 1,
    },
    {
      id: 'security-deposits',
      title: t('sections.securityDeposits.title'),
      level: 1,
    },
    { id: 'documentation', title: t('sections.documentation.title'), level: 1 },
    {
      id: 'best-practices',
      title: t('sections.bestPractices.title'),
      level: 1,
    },
  ];

  const relatedArticles = t.raw('relatedArticles') as Array<{
    title: string;
    href: string;
    time: string;
  }>;

  return (
    <ArticleLayout articleSlug='move-in-move-out-process' title={t('title')}>
      {/* Breadcrumb */}
      <nav className='mb-8'>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <Link href='/user-guide' className='hover:text-gray-900'>
            {t('breadcrumb.userGuide')}
          </Link>
          <ChevronRight className='h-4 w-4 rtl:rotate-180' />
          <Link
            href='/user-guide#resident-management'
            className='hover:text-gray-900'
          >
            {t('breadcrumb.residentManagement')}
          </Link>
          <ChevronRight className='h-4 w-4 rtl:rotate-180' />
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
              <div className='rounded-lg bg-purple-500 p-2'>
                <Home className='h-6 w-6 text-white' />
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
                        {t('sections.overview.keyComponents.title')}
                      </h4>
                      <ul className='mt-2 space-y-1 text-sm text-blue-800'>
                        {(
                          t.raw(
                            'sections.overview.keyComponents.items'
                          ) as string[]
                        ).map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Move-in Process */}
          <section id='move-in-process' className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.moveInProcess.title')}
            </h2>
            <Card>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-3 text-lg font-medium text-gray-900'>
                      {t('sections.moveInProcess.preMoveIn.title')}
                    </h3>
                    <div className='rounded-lg bg-gray-50 p-4'>
                      <ol className='space-y-3 text-sm text-gray-700'>
                        {(
                          t.raw(
                            'sections.moveInProcess.preMoveIn.steps'
                          ) as string[]
                        ).map((step, index) => (
                          <li
                            key={index}
                            className='flex items-start space-x-2'
                          >
                            <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-4'>
                      <h3 className='flex items-center text-lg font-medium text-gray-900'>
                        <ClipboardCheck className='mr-2 h-5 w-5 text-green-500' />
                        {t('sections.moveInProcess.moveInDay.title')}
                      </h3>
                      <div className='space-y-2 text-sm text-gray-600'>
                        {(
                          t.raw(
                            'sections.moveInProcess.moveInDay.tasks'
                          ) as string[]
                        ).map((task, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <h3 className='flex items-center text-lg font-medium text-gray-900'>
                        <Key className='mr-2 h-5 w-5 text-blue-500' />
                        {t('sections.moveInProcess.informationHandover.title')}
                      </h3>
                      <div className='space-y-2 text-sm text-gray-600'>
                        {(
                          t.raw(
                            'sections.moveInProcess.informationHandover.items'
                          ) as string[]
                        ).map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Move-out Process */}
          <section id='move-out-process' className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.moveOutProcess.title')}
            </h2>
            <Card>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  <div className='rounded-lg bg-yellow-50 p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertTriangle className='mt-0.5 h-5 w-5 text-yellow-600' />
                      <div>
                        <h4 className='font-medium text-yellow-900'>
                          {t(
                            'sections.moveOutProcess.noticeRequirements.title'
                          )}
                        </h4>
                        <p className='text-sm text-yellow-800'>
                          {t(
                            'sections.moveOutProcess.noticeRequirements.content'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        {t('sections.moveOutProcess.preMoveOut.title')}
                      </h3>
                      <div className='space-y-3'>
                        {(
                          t.raw(
                            'sections.moveOutProcess.preMoveOut.steps'
                          ) as Array<{ title: string; description: string }>
                        ).map((step, index) => (
                          <div
                            key={index}
                            className='border-l-4 border-orange-500 pl-4 rtl:border-r-4 rtl:border-l-0 rtl:pr-4 rtl:pl-0'
                          >
                            <h4 className='font-medium text-gray-900'>
                              {step.title}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        {t('sections.moveOutProcess.finalInspection.title')}
                      </h3>
                      <div className='space-y-2 text-sm text-gray-600'>
                        {(
                          t.raw(
                            'sections.moveOutProcess.finalInspection.items'
                          ) as string[]
                        ).map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Inspection Checklists */}
          <section id='inspection-checklists' className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.inspectionChecklists.title')}
            </h2>
            <Card>
              <CardContent className='p-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900'>
                      {t('sections.inspectionChecklists.livingAreas.title')}
                    </h4>
                    <ul className='space-y-1 text-sm text-gray-600'>
                      {(
                        t.raw(
                          'sections.inspectionChecklists.livingAreas.items'
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900'>
                      {t('sections.inspectionChecklists.kitchenBath.title')}
                    </h4>
                    <ul className='space-y-1 text-sm text-gray-600'>
                      {(
                        t.raw(
                          'sections.inspectionChecklists.kitchenBath.items'
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900'>
                      {t('sections.inspectionChecklists.systemsSafety.title')}
                    </h4>
                    <ul className='space-y-1 text-sm text-gray-600'>
                      {(
                        t.raw(
                          'sections.inspectionChecklists.systemsSafety.items'
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='mt-6 rounded-lg bg-green-50 p-4'>
                  <h4 className='mb-2 font-medium text-green-900'>
                    {t(
                      'sections.inspectionChecklists.digitalDocumentation.title'
                    )}
                  </h4>
                  <p className='text-sm text-green-800'>
                    {t(
                      'sections.inspectionChecklists.digitalDocumentation.content'
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Security Deposits */}
          <section id='security-deposits' className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.securityDeposits.title')}
            </h2>
            <Card>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-4'>
                      <h3 className='flex items-center text-lg font-medium text-gray-900'>
                        <DollarSign className='mr-2 h-5 w-5 text-green-500' />
                        {t('sections.securityDeposits.depositManagement.title')}
                      </h3>
                      <div className='space-y-3'>
                        {(
                          t.raw(
                            'sections.securityDeposits.depositManagement.items'
                          ) as string[]
                        ).map((item, index) => (
                          <div key={index} className='rounded-lg border p-3'>
                            <p className='text-sm text-gray-600'>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        {t('sections.securityDeposits.refundProcess.title')}
                      </h3>
                      <div className='space-y-2 text-sm text-gray-600'>
                        {(
                          t.raw(
                            'sections.securityDeposits.refundProcess.steps'
                          ) as string[]
                        ).map((step, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='rounded-lg bg-red-50 p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertTriangle className='mt-0.5 h-5 w-5 text-red-600' />
                      <div>
                        <h4 className='font-medium text-red-900'>
                          {t('sections.securityDeposits.legalCompliance.title')}
                        </h4>
                        <p className='text-sm text-red-800'>
                          {t(
                            'sections.securityDeposits.legalCompliance.content'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Documentation */}
          <section id='documentation' className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
              {t('sections.documentation.title')}
            </h2>
            <Card>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-4'>
                      <h3 className='flex items-center text-lg font-medium text-gray-900'>
                        <FileText className='mr-2 h-5 w-5 text-blue-500' />
                        {t('sections.documentation.requiredDocuments.title')}
                      </h3>
                      <div className='space-y-2 text-sm text-gray-600'>
                        {(
                          t.raw(
                            'sections.documentation.requiredDocuments.items'
                          ) as string[]
                        ).map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        {t('sections.documentation.recordKeeping.title')}
                      </h3>
                      <div className='space-y-2 text-sm text-gray-600'>
                        {(
                          t.raw(
                            'sections.documentation.recordKeeping.items'
                          ) as string[]
                        ).map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2'
                          >
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900'>
                      {t('sections.bestPractices.processEfficiency.title')}
                    </h4>
                    <ul className='space-y-2 text-sm text-gray-600'>
                      {(
                        t.raw(
                          'sections.bestPractices.processEfficiency.items'
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index} className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900'>
                      {t('sections.bestPractices.tenantRelations.title')}
                    </h4>
                    <ul className='space-y-2 text-sm text-gray-600'>
                      {(
                        t.raw(
                          'sections.bestPractices.tenantRelations.items'
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index} className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='mt-6 rounded-lg bg-blue-50 p-4'>
                  <h4 className='mb-2 font-medium text-blue-900'>
                    {t('sections.bestPractices.successTips.title')}
                  </h4>
                  <ul className='space-y-1 text-sm text-blue-800'>
                    {(
                      t.raw(
                        'sections.bestPractices.successTips.items'
                      ) as string[]
                    ).map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
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
            currentCategory='resident-management'
          />
        </div>
      </div>
    </ArticleLayout>
  );
};

export default MoveInMoveOutProcessPage;
