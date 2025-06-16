import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  Clock,
  Users,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  Mail,
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

const LeaseAgreementManagementPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'creating-leases', title: 'Creating New Leases', level: 1 },
    { id: 'lease-templates', title: 'Lease Templates', level: 1 },
    { id: 'tracking-terms', title: 'Tracking Lease Terms', level: 1 },
    { id: 'renewals-terminations', title: 'Renewals & Terminations', level: 1 },
    { id: 'compliance-legal', title: 'Compliance & Legal', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Residents',
      href: '/user-guide/resident-management/adding-new-residents',
      time: '5 min',
    },
    {
      title: 'Resident Communication Tools',
      href: '/user-guide/resident-management/resident-communication-tools',
      time: '6 min',
    },
    {
      title: 'Move-in/Move-out Process',
      href: '/user-guide/resident-management/move-in-move-out-process',
      time: '10 min',
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
                href='/user-guide#resident-management'
                className='hover:text-gray-900'
              >
                Resident Management
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='font-medium text-gray-900'>
                Lease Agreement Management
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
                    <FileText className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold text-gray-900'>
                      Lease Agreement Management
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>8 min read</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>Property managers</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>
                  Master the complete lifecycle of lease agreements from
                  creation to renewal with Syndik&apos;s comprehensive lease
                  management tools.
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
                      Effective lease management is crucial for successful
                      property management. Syndik provides comprehensive tools
                      to create, track, and manage lease agreements throughout
                      their entire lifecycle.
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='text-primary mt-0.5 h-5 w-5' />
                        <div>
                          <h4 className='font-medium text-blue-900'>
                            Key Features
                          </h4>
                          <ul className='mt-2 space-y-1 text-sm text-blue-800'>
                            <li>• Digital lease creation and signing</li>
                            <li>• Automated renewal notifications</li>
                            <li>• Compliance with local regulations</li>
                            <li>• Centralized document storage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Creating Leases */}
              <section id='creating-leases' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Creating New Leases
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Lease Creation Process
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                1
                              </span>
                              <span>Navigate to Residents → Add New Lease</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                2
                              </span>
                              <span>Select property and unit</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                3
                              </span>
                              <span>
                                Choose lease template or create custom
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                4
                              </span>
                              <span>Fill in tenant and lease details</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                5
                              </span>
                              <span>Review and send for digital signature</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Lease Templates */}
              <section id='lease-templates' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Lease Templates
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Standard Templates
                        </h3>
                        <div className='space-y-3'>
                          <div className='rounded-lg border p-3'>
                            <h4 className='font-medium text-gray-900'>
                              Residential Lease
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Standard residential rental agreement
                            </p>
                          </div>
                          <div className='rounded-lg border p-3'>
                            <h4 className='font-medium text-gray-900'>
                              Month-to-Month
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Flexible short-term rental agreement
                            </p>
                          </div>
                          <div className='rounded-lg border p-3'>
                            <h4 className='font-medium text-gray-900'>
                              Student Housing
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Specialized for student accommodations
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Customization Options
                        </h3>
                        <div className='space-y-2 text-sm text-gray-600'>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Add custom clauses</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Modify standard terms</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Include property-specific rules</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Save as custom template</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Tracking Terms */}
              <section id='tracking-terms' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Tracking Lease Terms
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div className='rounded-lg border bg-green-50 p-4'>
                          <div className='mb-2 flex items-center space-x-2'>
                            <Calendar className='h-5 w-5 text-green-600' />
                            <h4 className='font-medium text-green-900'>
                              Start & End Dates
                            </h4>
                          </div>
                          <p className='text-sm text-green-800'>
                            Automatic tracking of lease periods with visual
                            calendar
                          </p>
                        </div>
                        <div className='rounded-lg border bg-blue-50 p-4'>
                          <div className='mb-2 flex items-center space-x-2'>
                            <DollarSign className='text-primary h-5 w-5' />
                            <h4 className='font-medium text-blue-900'>
                              Rent Terms
                            </h4>
                          </div>
                          <p className='text-sm text-blue-800'>
                            Track rent amounts, escalations, and payment
                            schedules
                          </p>
                        </div>
                        <div className='rounded-lg border bg-yellow-50 p-4'>
                          <div className='mb-2 flex items-center space-x-2'>
                            <AlertTriangle className='h-5 w-5 text-yellow-600' />
                            <h4 className='font-medium text-yellow-900'>
                              Key Dates
                            </h4>
                          </div>
                          <p className='text-sm text-yellow-800'>
                            Monitor renewal deadlines and notice periods
                          </p>
                        </div>
                      </div>
                      <div className='rounded-lg bg-gray-50 p-4'>
                        <h4 className='mb-2 font-medium text-gray-900'>
                          Automated Notifications
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>• 90 days before lease expiration</li>
                          <li>• 60 days before renewal decision needed</li>
                          <li>• 30 days before lease end date</li>
                          <li>• Rent increase notice periods</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Renewals & Terminations */}
              <section id='renewals-terminations' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Renewals & Terminations
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Lease Renewals
                        </h3>
                        <div className='space-y-3'>
                          <div className='border-l-4 border-green-500 pl-4'>
                            <h4 className='font-medium text-gray-900'>
                              Automatic Process
                            </h4>
                            <p className='text-sm text-gray-600'>
                              System generates renewal offers with updated terms
                            </p>
                          </div>
                          <div className='border-l-4 border-blue-500 pl-4'>
                            <h4 className='font-medium text-gray-900'>
                              Rent Adjustments
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Apply market-rate increases based on local data
                            </p>
                          </div>
                          <div className='border-l-4 border-purple-500 pl-4'>
                            <h4 className='font-medium text-gray-900'>
                              Digital Signing
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Streamlined e-signature process for renewals
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Terminations
                        </h3>
                        <div className='space-y-3'>
                          <div className='border-l-4 border-red-500 pl-4'>
                            <h4 className='font-medium text-gray-900'>
                              Notice Management
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Track required notice periods and documentation
                            </p>
                          </div>
                          <div className='border-l-4 border-orange-500 pl-4'>
                            <h4 className='font-medium text-gray-900'>
                              Move-out Process
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Coordinate inspections and security deposits
                            </p>
                          </div>
                          <div className='border-l-4 border-gray-500 pl-4'>
                            <h4 className='font-medium text-gray-900'>
                              Documentation
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Maintain records for legal compliance
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Compliance & Legal */}
              <section id='compliance-legal' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Compliance & Legal
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='mb-4 rounded-lg bg-red-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <AlertTriangle className='mt-0.5 h-5 w-5 text-red-600' />
                        <div>
                          <h4 className='font-medium text-red-900'>
                            Legal Disclaimer
                          </h4>
                          <p className='text-sm text-red-800'>
                            Always consult with local legal counsel to ensure
                            lease agreements comply with current laws and
                            regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Built-in Compliance
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Fair Housing Act compliance</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>State-specific lease requirements</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Local rent control ordinances</span>
                            </li>
                          </ul>
                        </div>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Documentation
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Digital signature audit trail</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Amendment history tracking</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Secure document storage</span>
                            </li>
                          </ul>
                        </div>
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
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Lease Creation
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Use standardized templates</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Include all required disclosures</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Review terms before sending</span>
                            </li>
                          </ul>
                        </div>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Ongoing Management
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Monitor expiration dates regularly</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Keep all amendments documented</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Maintain organized file system</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='rounded-lg bg-blue-50 p-4'>
                        <h4 className='mb-2 font-medium text-blue-900'>
                          Pro Tips
                        </h4>
                        <ul className='space-y-1 text-sm text-blue-800'>
                          <li>
                            • Start renewal conversations 120 days before
                            expiration
                          </li>
                          <li>
                            • Keep detailed records of all tenant communications
                          </li>
                          <li>
                            • Regularly update templates to reflect law changes
                          </li>
                          <li>
                            • Use addendums for property-specific requirements
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

export default LeaseAgreementManagementPage;
