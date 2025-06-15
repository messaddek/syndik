import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  Mail,
  Home,
  Key,
  ClipboardCheck,
  DollarSign,
  FileText,
} from 'lucide-react';

const MoveInMoveOutProcessPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'move-in-process', title: 'Move-in Process', level: 1 },
    { id: 'move-out-process', title: 'Move-out Process', level: 1 },
    { id: 'inspection-checklists', title: 'Inspection Checklists', level: 1 },
    { id: 'security-deposits', title: 'Security Deposits', level: 1 },
    { id: 'documentation', title: 'Documentation', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Residents',
      href: '/user-guide/resident-management/adding-new-residents',
      time: '5 min',
    },
    {
      title: 'Lease Agreement Management',
      href: '/user-guide/resident-management/lease-agreement-management',
      time: '8 min',
    },
    {
      title: 'Unit Management & Organization',
      href: '/user-guide/property-management/unit-management-organization',
      time: '6 min',
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
                Move-in/Move-out Process
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
                      Move-in/Move-out Process
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>10 min read</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>Property managers</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>
                  Streamline move-ins and move-outs with comprehensive workflows
                  that ensure smooth transitions for both residents and
                  management.
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
                      The move-in and move-out process is crucial for
                      maintaining property condition, ensuring tenant
                      satisfaction, and protecting your investment. Syndik
                      provides structured workflows to manage these transitions
                      efficiently.
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='mt-0.5 h-5 w-5 text-blue-600' />
                        <div>
                          <h4 className='font-medium text-blue-900'>
                            Key Components
                          </h4>
                          <ul className='mt-2 space-y-1 text-sm text-blue-800'>
                            <li>• Detailed inspection checklists</li>
                            <li>• Photo documentation system</li>
                            <li>• Security deposit management</li>
                            <li>• Digital key handover tracking</li>
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
                  Move-in Process
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Pre-Move-in Preparation
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                1
                              </span>
                              <span>
                                Complete final unit inspection and cleaning
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                2
                              </span>
                              <span>
                                Prepare move-in checklist and documentation
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                3
                              </span>
                              <span>Program key cards and access codes</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                4
                              </span>
                              <span>
                                Schedule move-in appointment with tenant
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='flex items-center text-lg font-medium text-gray-900'>
                            <ClipboardCheck className='mr-2 h-5 w-5 text-green-500' />
                            Move-in Day Tasks
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Conduct walkthrough inspection</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Document any existing conditions</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Take timestamped photos</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Explain amenities and procedures</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Hand over keys and access devices</span>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='flex items-center text-lg font-medium text-gray-900'>
                            <Key className='mr-2 h-5 w-5 text-blue-500' />
                            Information Handover
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Emergency contact information</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Property rules and regulations</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Maintenance request procedures</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Payment portal access</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Community amenity guidelines</span>
                            </div>
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
                  Move-out Process
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='rounded-lg bg-yellow-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertTriangle className='mt-0.5 h-5 w-5 text-yellow-600' />
                          <div>
                            <h4 className='font-medium text-yellow-900'>
                              Notice Requirements
                            </h4>
                            <p className='text-sm text-yellow-800'>
                              Ensure proper notice periods are followed
                              according to lease terms and local regulations
                              (typically 30-60 days).
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Pre-Move-out Steps
                          </h3>
                          <div className='space-y-3'>
                            <div className='border-l-4 border-orange-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Notice Processing
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Log move-out notice and confirm dates
                              </p>
                            </div>
                            <div className='border-l-4 border-blue-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Pre-inspection
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Optional walkthrough to identify potential
                                issues
                              </p>
                            </div>
                            <div className='border-l-4 border-green-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Scheduling
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Coordinate final inspection appointment
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Final Inspection
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Compare to move-in condition</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Document any damages or issues</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Take comprehensive photos</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Collect all keys and access devices</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Note any forwarding address</span>
                            </div>
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
                  Inspection Checklists
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Living Areas
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>• Walls and paint condition</li>
                          <li>• Flooring and carpets</li>
                          <li>• Windows and blinds</li>
                          <li>• Light fixtures and switches</li>
                          <li>• Outlets and electrical</li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Kitchen & Bath
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>• Appliances functionality</li>
                          <li>• Plumbing fixtures</li>
                          <li>• Cabinets and countertops</li>
                          <li>• Tile and grout condition</li>
                          <li>• Ventilation fans</li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Systems & Safety
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-600'>
                          <li>• HVAC operation</li>
                          <li>• Smoke detector batteries</li>
                          <li>• Security system function</li>
                          <li>• Water pressure and temperature</li>
                          <li>• Door locks and hardware</li>
                        </ul>
                      </div>
                    </div>
                    <div className='mt-6 rounded-lg bg-green-50 p-4'>
                      <h4 className='mb-2 font-medium text-green-900'>
                        Digital Documentation
                      </h4>
                      <p className='text-sm text-green-800'>
                        All inspection items are automatically saved with
                        timestamps, photos, and inspector notes for complete
                        audit trails.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Security Deposits */}
              <section id='security-deposits' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Security Deposits
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='flex items-center text-lg font-medium text-gray-900'>
                            <DollarSign className='mr-2 h-5 w-5 text-green-500' />
                            Deposit Management
                          </h3>
                          <div className='space-y-3'>
                            <div className='rounded-lg border p-3'>
                              <h4 className='font-medium text-gray-900'>
                                Collection
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Track deposits collected at move-in
                              </p>
                            </div>
                            <div className='rounded-lg border p-3'>
                              <h4 className='font-medium text-gray-900'>
                                Interest Tracking
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Calculate required interest where applicable
                              </p>
                            </div>
                            <div className='rounded-lg border p-3'>
                              <h4 className='font-medium text-gray-900'>
                                Deduction Items
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Itemize damages and cleaning costs
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Refund Process
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Calculate final refund amount</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Generate itemized statement</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Process payment within legal timeframe
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Send documentation to tenant</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Update financial records</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='rounded-lg bg-red-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertTriangle className='mt-0.5 h-5 w-5 text-red-600' />
                          <div>
                            <h4 className='font-medium text-red-900'>
                              Legal Compliance
                            </h4>
                            <p className='text-sm text-red-800'>
                              Security deposit laws vary by state and locality.
                              Ensure compliance with holding requirements,
                              interest calculations, and return timeframes
                              (typically 14-60 days).
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
                  Documentation
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='flex items-center text-lg font-medium text-gray-900'>
                            <FileText className='mr-2 h-5 w-5 text-blue-500' />
                            Required Documents
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Move-in/out inspection reports</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Photo documentation with timestamps</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Key and access device inventory</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Security deposit calculations</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Tenant acknowledgment signatures</span>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Record Keeping
                          </h3>
                          <div className='space-y-3'>
                            <div className='border-l-4 border-blue-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Digital Storage
                              </h4>
                              <p className='text-sm text-gray-600'>
                                All documents stored securely in tenant file
                              </p>
                            </div>
                            <div className='border-l-4 border-green-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Backup Systems
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Automated backups and version control
                              </p>
                            </div>
                            <div className='border-l-4 border-purple-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Retention Policy
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Documents retained per legal requirements
                              </p>
                            </div>
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
                  Best Practices
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Process Efficiency
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Use standardized checklists</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Schedule appointments in advance</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Allow adequate time for inspections</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Complete documentation immediately</span>
                          </li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Tenant Relations
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Maintain professional demeanor</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Explain processes clearly</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Address concerns promptly</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Provide copies of all documents</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='mt-6 rounded-lg bg-blue-50 p-4'>
                      <h4 className='mb-2 font-medium text-blue-900'>
                        Success Tips
                      </h4>
                      <ul className='space-y-1 text-sm text-blue-800'>
                        <li>
                          • Create welcome packets for new residents with all
                          essential information
                        </li>
                        <li>
                          • Use video walkthroughs for remote tenants or as
                          backup documentation
                        </li>
                        <li>
                          • Maintain unit turnover schedule to minimize vacancy
                          time
                        </li>
                        <li>
                          • Keep spare keys and access devices properly labeled
                          and secure
                        </li>
                      </ul>
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

export default MoveInMoveOutProcessPage;
