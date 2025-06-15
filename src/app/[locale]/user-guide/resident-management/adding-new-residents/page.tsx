import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import {
  Clock,
  Users,
  CheckCircle,
  UserPlus,
  ChevronRight,
  Mail,
  Phone,
  FileText,
  CreditCard,
  Calendar,
  Key,
} from 'lucide-react';

const AddingNewResidentsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'preparation', title: 'Preparation & Documentation', level: 1 },
    { id: 'resident-profile', title: 'Creating Resident Profile', level: 1 },
    { id: 'lease-assignment', title: 'Lease Assignment', level: 1 },
    { id: 'payment-setup', title: 'Payment Setup', level: 1 },
    { id: 'access-credentials', title: 'Access Credentials', level: 1 },
    { id: 'move-in-checklist', title: 'Move-in Checklist', level: 1 },
    { id: 'communication-setup', title: 'Communication Setup', level: 1 },
  ];

  const relatedArticles = [
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
    {
      title: 'Setting Up Rent Collection',
      href: '/user-guide/financial-management/setting-up-rent-collection',
      time: '7 min',
    },
  ];
  return (
    <ArticleLayout
      articleSlug='adding-new-residents'
      title='Adding New Residents'
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
            Resident Management
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900'>Adding New Residents</span>
        </div>
      </nav>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='rounded-lg border bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <div className='rounded-lg bg-purple-500 p-2'>
                  <UserPlus className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    Adding New Residents
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>Resident Management</Badge>
                    <Badge variant='outline'>Popular</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-lg text-gray-600'>
                Complete guide to onboarding new residents, from initial setup
                to move-in completion. Learn the step-by-step process for adding
                residents to your property management system.
              </p>
            </div>

            {/* Content */}
            <div className='space-y-8 p-6'>
              {/* Overview */}
              <section id='overview'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Overview
                </h2>
                <p className='mb-4 text-gray-700'>
                  Adding new residents is a critical process that sets the
                  foundation for a successful landlord-tenant relationship. This
                  guide covers everything from initial documentation to
                  finalizing the move-in process.
                </p>

                <Card className='border-purple-200 bg-purple-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-purple-600' />
                      <div>
                        <p className='font-medium text-purple-800'>
                          Key Steps Overview
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-purple-700'>
                          <li>• Collect and verify resident information</li>
                          <li>• Create resident profile in the system</li>
                          <li>• Assign unit and lease terms</li>
                          <li>• Set up payment methods and schedules</li>
                          <li>• Provide access credentials and keys</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Preparation */}
              <section id='preparation'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Preparation & Documentation
                </h2>
                <p className='mb-4 text-gray-700'>
                  Before adding a resident to the system, ensure you have all
                  necessary documentation and information.
                </p>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2 text-lg'>
                        <FileText className='h-5 w-5' />
                        <span>Required Documents</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>Signed lease agreement</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>Government-issued ID</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>Proof of income</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>Security deposit payment</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>Emergency contact information</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span>Background check results</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Optional Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span>Pet documentation</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span>Vehicle registration</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span>Renter&apos;s insurance</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span>Move-in photos</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                          <span>Utility transfer forms</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Resident Profile */}
              <section id='resident-profile'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Creating Resident Profile
                </h2>
                <p className='mb-4 text-gray-700'>
                  Follow these steps to create a comprehensive resident profile
                  in Syndik:
                </p>

                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white'>
                      1
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Navigate to Residents
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Go to Residents → Add New Resident
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white'>
                      2
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Enter Personal Information
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Fill in name, contact details, and identification
                        information
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white'>
                      3
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Add Emergency Contacts
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Include at least one emergency contact with relationship
                        details
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white'>
                      4
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Upload Documents
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Attach ID copies, lease documents, and other required
                        files
                      </p>
                    </div>
                  </div>
                </div>

                <Card className='mt-4'>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Personal Information Fields
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <div>
                        <h4 className='mb-2 font-semibold text-red-700'>
                          Required Fields
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>• Full name</li>
                          <li>• Email address</li>
                          <li>• Phone number</li>
                          <li>• Date of birth</li>
                          <li>• Government ID number</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='mb-2 font-semibold text-blue-700'>
                          Contact Information
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>• Primary phone</li>
                          <li>• Secondary phone</li>
                          <li>• Work phone</li>
                          <li>• Previous address</li>
                          <li>• Work address</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='mb-2 font-semibold text-green-700'>
                          Additional Details
                        </h4>
                        <ul className='space-y-1 text-sm'>
                          <li>• Occupation</li>
                          <li>• Employer information</li>
                          <li>• Income details</li>
                          <li>• Vehicle information</li>
                          <li>• Pet information</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Lease Assignment */}
              <section id='lease-assignment'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Lease Assignment
                </h2>
                <p className='mb-4 text-gray-700'>
                  Assign the resident to a specific unit and configure lease
                  terms.
                </p>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2 text-lg'>
                      <Key className='h-5 w-5' />
                      <span>Lease Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div>
                        <h4 className='mb-3 font-semibold'>Unit Assignment</h4>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>Property:</span>
                            <span className='font-medium'>
                              Select from available
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Unit:</span>
                            <span className='font-medium'>
                              Choose specific unit
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Move-in Date:</span>
                            <span className='font-medium'>Set start date</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Lease Type:</span>
                            <span className='font-medium'>
                              Fixed/Month-to-month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className='mb-3 font-semibold'>Lease Terms</h4>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>Lease Duration:</span>
                            <span className='font-medium'>
                              6, 12, or 24 months
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Monthly Rent:</span>
                            <span className='font-medium'>Set amount</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Security Deposit:</span>
                            <span className='font-medium'>
                              Configure amount
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Pet Deposit:</span>
                            <span className='font-medium'>If applicable</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Payment Setup */}
              <section id='payment-setup'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Payment Setup
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure payment methods and collection preferences for the
                  new resident.
                </p>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2 text-lg'>
                        <CreditCard className='h-5 w-5' />
                        <span>Payment Methods</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                          <span className='text-sm font-medium'>
                            Bank Transfer (ACH)
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                          <span className='text-sm font-medium'>
                            Credit/Debit Card
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                          <span className='text-sm font-medium'>
                            Online Portal
                          </span>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                        <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                          <span className='text-sm font-medium'>
                            Check/Money Order
                          </span>
                          <div className='h-4 w-4 rounded border-2 border-gray-300'></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2 text-lg'>
                        <Calendar className='h-5 w-5' />
                        <span>Payment Schedule</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div>
                          <label className='text-sm font-medium'>
                            Due Date
                          </label>
                          <p className='text-sm text-gray-600'>
                            1st of each month (default)
                          </p>
                        </div>
                        <div>
                          <label className='text-sm font-medium'>
                            Late Fee Grace Period
                          </label>
                          <p className='text-sm text-gray-600'>
                            5 days after due date
                          </p>
                        </div>
                        <div>
                          <label className='text-sm font-medium'>
                            Auto-pay Setup
                          </label>
                          <p className='text-sm text-gray-600'>
                            Optional automatic payments
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Access Credentials */}
              <section id='access-credentials'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Access Credentials
                </h2>
                <p className='mb-4 text-gray-700'>
                  Set up system access and physical access for the new resident.
                </p>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Portal Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div>
                          <h4 className='text-sm font-semibold'>
                            Resident Portal Login
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Email invitation with temporary password
                          </p>
                        </div>
                        <div>
                          <h4 className='text-sm font-semibold'>
                            Mobile App Access
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Same credentials work for mobile app
                          </p>
                        </div>
                        <div>
                          <h4 className='text-sm font-semibold'>
                            Account Verification
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Email verification required on first login
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Physical Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div>
                          <h4 className='text-sm font-semibold'>Unit Keys</h4>
                          <p className='text-sm text-gray-600'>
                            Provide keys and track issuance
                          </p>
                        </div>
                        <div>
                          <h4 className='text-sm font-semibold'>
                            Building Access
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Fobs, codes, or key cards
                          </p>
                        </div>
                        <div>
                          <h4 className='text-sm font-semibold'>
                            Mailbox Keys
                          </h4>
                          <p className='text-sm text-gray-600'>
                            If applicable to property
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Move-in Checklist */}
              <section id='move-in-checklist'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Move-in Checklist
                </h2>
                <p className='mb-4 text-gray-700'>
                  Complete these final steps to finalize the resident onboarding
                  process.
                </p>

                <Card>
                  <CardContent className='p-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <h4 className='mb-3 font-semibold'>
                          Pre-Move-in Tasks
                        </h4>
                        <ul className='space-y-2 text-sm'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Unit inspection completed</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Welcome packet prepared</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Utility information provided</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Building rules explained</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='mb-3 font-semibold'>
                          Move-in Day Tasks
                        </h4>
                        <ul className='space-y-2 text-sm'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Keys handed over</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Move-in inspection form</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Emergency procedures reviewed</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Contact information confirmed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Communication Setup */}
              <section id='communication-setup'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Communication Setup
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure communication preferences and introduce the resident
                  to available channels.
                </p>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2 text-lg'>
                      <Mail className='h-5 w-5' />
                      <span>Communication Channels</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                          <Mail className='h-6 w-6 text-blue-600' />
                        </div>
                        <h4 className='font-semibold'>Email</h4>
                        <p className='text-sm text-gray-600'>
                          Official notices and announcements
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                          <Phone className='h-6 w-6 text-green-600' />
                        </div>
                        <h4 className='font-semibold'>Phone/SMS</h4>
                        <p className='text-sm text-gray-600'>
                          Urgent matters and reminders
                        </p>
                      </div>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-purple-100 p-3'>
                          <Users className='h-6 w-6 text-purple-600' />
                        </div>
                        <h4 className='font-semibold'>Portal Messaging</h4>
                        <p className='text-sm text-gray-600'>
                          Direct communication and requests
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='mt-4 border-green-200 bg-green-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-green-600' />
                      <div>
                        <p className='font-medium text-green-800'>
                          Congratulations!
                        </p>
                        <p className='text-sm text-green-700'>
                          You&apos;ve successfully added a new resident to your
                          property. The resident should now have access to their
                          portal and can begin using Syndik&apos;s resident
                          services.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                <Users className='mr-2 h-4 w-4' />
                Join Community
              </Button>
            </CardContent>
          </Card>{' '}
        </div>
      </div>
    </ArticleLayout>
  );
};

export default AddingNewResidentsPage;
