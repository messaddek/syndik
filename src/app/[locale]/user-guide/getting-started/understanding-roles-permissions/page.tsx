import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  ArrowLeft,
  Shield,
  Users,
  Eye,
  Edit,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  Mail,
} from 'lucide-react';

const UnderstandingRolesPermissionsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'role-hierarchy', title: 'Role Hierarchy', level: 1 },
    { id: 'permission-types', title: 'Permission Types', level: 1 },
    { id: 'custom-roles', title: 'Creating Custom Roles', level: 1 },
    { id: 'best-practices', title: 'Security Best Practices', level: 1 },
    { id: 'examples', title: 'Common Examples', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Setting Up User Accounts',
      href: '/user-guide/getting-started/setting-up-user-accounts',
      time: '3 min',
    },
    {
      title: 'Creating Your First Property',
      href: '/user-guide/getting-started/creating-your-first-property',
      time: '5 min',
    },
    {
      title: 'Initial Configuration Guide',
      href: '/user-guide/getting-started/initial-configuration-guide',
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
              <span className='text-gray-900'>
                Understanding Roles & Permissions
              </span>
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
                      <Shield className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-900'>
                        Understanding Roles & Permissions
                      </h1>
                      <div className='mt-2 flex items-center space-x-4'>
                        <Badge variant='secondary'>Getting Started</Badge>
                        <div className='flex items-center space-x-1 text-sm text-gray-500'>
                          <Clock className='h-4 w-4' />
                          <span>7 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='text-lg text-gray-600'>
                    Master Syndik&apos;s role-based access control system to
                    ensure proper security and efficient workflow management
                    across your property management team.
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
                      Syndik uses a comprehensive role-based access control
                      (RBAC) system that allows you to precisely control what
                      each user can see and do within the platform. This ensures
                      data security while maintaining operational efficiency.
                    </p>

                    <Card className='border-amber-200 bg-amber-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertTriangle className='mt-0.5 h-5 w-5 text-amber-600' />
                          <div>
                            <p className='font-medium text-amber-800'>
                              Security First
                            </p>
                            <p className='mt-1 text-sm text-amber-700'>
                              Always follow the principle of least privilege -
                              grant users only the minimum access they need to
                              perform their job functions.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Role Hierarchy */}
                  <section id='role-hierarchy'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Role Hierarchy
                    </h2>
                    <p className='mb-6 text-gray-700'>
                      Syndik follows a hierarchical permission structure where
                      higher-level roles inherit permissions from lower-level
                      roles:
                    </p>

                    <div className='space-y-4'>
                      {/* Super Admin */}
                      <Card className='border-red-200 bg-red-50'>
                        <CardHeader className='pb-3'>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Shield className='h-5 w-5 text-red-600' />
                            <span>Super Administrator</span>
                            <Badge variant='destructive' className='ml-2'>
                              Highest Level
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-700'>
                            Complete system control with access to all features
                            and settings.
                          </p>
                          <div className='grid grid-cols-1 gap-2 text-sm md:grid-cols-2'>
                            <div>• Organization management</div>
                            <div>• User administration</div>
                            <div>• System configuration</div>
                            <div>• Financial oversight</div>
                            <div>• Security settings</div>
                            <div>• Integration management</div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Admin */}
                      <Card className='border-orange-200 bg-orange-50'>
                        <CardHeader className='pb-3'>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Users className='h-5 w-5 text-orange-600' />
                            <span>Administrator</span>
                            <Badge variant='outline' className='ml-2'>
                              High Level
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-700'>
                            Full property management with limited system
                            administration.
                          </p>
                          <div className='grid grid-cols-1 gap-2 text-sm md:grid-cols-2'>
                            <div>• Property operations</div>
                            <div>• Staff management</div>
                            <div>• Financial reporting</div>
                            <div>• Resident management</div>
                            <div>• Maintenance oversight</div>
                            <div>• Basic user management</div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Property Manager */}
                      <Card className='border-blue-200 bg-blue-50'>
                        <CardHeader className='pb-3'>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Settings className='h-5 w-5 text-blue-600' />
                            <span>Property Manager</span>
                            <Badge variant='outline' className='ml-2'>
                              Mid Level
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-700'>
                            Day-to-day property operations and resident
                            services.
                          </p>
                          <div className='grid grid-cols-1 gap-2 text-sm md:grid-cols-2'>
                            <div>• Unit management</div>
                            <div>• Resident communications</div>
                            <div>• Maintenance requests</div>
                            <div>• Lease management</div>
                            <div>• Basic reporting</div>
                            <div>• Vendor coordination</div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Staff */}
                      <Card className='border-green-200 bg-green-50'>
                        <CardHeader className='pb-3'>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Eye className='h-5 w-5 text-green-600' />
                            <span>Staff/Specialist</span>
                            <Badge variant='outline' className='ml-2'>
                              Basic Level
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-700'>
                            Specialized access for specific job functions.
                          </p>
                          <div className='grid grid-cols-1 gap-2 text-sm md:grid-cols-2'>
                            <div>• Task-specific access</div>
                            <div>• Read-only information</div>
                            <div>• Limited data entry</div>
                            <div>• Basic communication</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Permission Types */}
                  <section id='permission-types'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Permission Types
                    </h2>
                    <p className='mb-6 text-gray-700'>
                      Syndik uses granular permissions that can be assigned
                      individually or as part of role packages:
                    </p>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2'>
                            <Eye className='h-5 w-5 text-blue-500' />
                            <span>View Permissions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-gray-700'>
                            <li>• View properties and units</li>
                            <li>• Access resident information</li>
                            <li>• Read financial reports</li>
                            <li>• View maintenance requests</li>
                            <li>• Access communication logs</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2'>
                            <Edit className='h-5 w-5 text-green-500' />
                            <span>Edit Permissions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-gray-700'>
                            <li>• Update property information</li>
                            <li>• Modify resident records</li>
                            <li>• Process payments</li>
                            <li>• Manage work orders</li>
                            <li>• Send communications</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2'>
                            <Settings className='h-5 w-5 text-purple-500' />
                            <span>Administrative Permissions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-gray-700'>
                            <li>• Create/delete records</li>
                            <li>• Manage user accounts</li>
                            <li>• Configure system settings</li>
                            <li>• Access sensitive data</li>
                            <li>• Export bulk data</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2'>
                            <Shield className='h-5 w-5 text-red-500' />
                            <span>Security Permissions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-gray-700'>
                            <li>• Audit log access</li>
                            <li>• Security settings</li>
                            <li>• Permission management</li>
                            <li>• Integration controls</li>
                            <li>• Data retention policies</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Custom Roles */}
                  <section id='custom-roles'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Creating Custom Roles
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      You can create custom roles tailored to your
                      organization&apos;s specific needs:
                    </p>

                    <div className='space-y-4'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Step-by-Step Process
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-4'>
                            <div className='flex items-start space-x-3'>
                              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                                1
                              </div>
                              <div>
                                <h4 className='font-medium text-gray-900'>
                                  Navigate to Role Management
                                </h4>
                                <p className='text-sm text-gray-600'>
                                  Settings → Users & Permissions → Role
                                  Management
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start space-x-3'>
                              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                                2
                              </div>
                              <div>
                                <h4 className='font-medium text-gray-900'>
                                  Create New Role
                                </h4>
                                <p className='text-sm text-gray-600'>
                                  Click &quot;Add Custom Role&quot; and enter
                                  role name and description
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start space-x-3'>
                              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                                3
                              </div>
                              <div>
                                <h4 className='font-medium text-gray-900'>
                                  Select Permissions
                                </h4>
                                <p className='text-sm text-gray-600'>
                                  Choose individual permissions or start from an
                                  existing role template
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start space-x-3'>
                              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                                4
                              </div>
                              <div>
                                <h4 className='font-medium text-gray-900'>
                                  Test and Deploy
                                </h4>
                                <p className='text-sm text-gray-600'>
                                  Test the role with a test user before
                                  assigning to production users
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Best Practices */}
                  <section id='best-practices'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Security Best Practices
                    </h2>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <Card className='border-green-200 bg-green-50'>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <CheckCircle className='h-5 w-5 text-green-600' />
                            <span>Do&apos;s</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-gray-700'>
                            <li>✓ Follow principle of least privilege</li>
                            <li>✓ Regularly review user permissions</li>
                            <li>✓ Use role templates for consistency</li>
                            <li>✓ Document custom role purposes</li>
                            <li>✓ Test roles before deployment</li>
                            <li>
                              ✓ Remove access immediately when staff leave
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className='border-red-200 bg-red-50'>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <AlertTriangle className='h-5 w-5 text-red-600' />
                            <span>Don&apos;ts</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-gray-700'>
                            <li>✗ Don&apos;t share admin credentials</li>
                            <li>✗ Don&apos;t give excessive permissions</li>
                            <li>
                              ✗ Don&apos;t create roles without documentation
                            </li>
                            <li>✗ Don&apos;t ignore permission audit alerts</li>
                            <li>✗ Don&apos;t use generic role names</li>
                            <li>✗ Don&apos;t bypass the approval process</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Examples */}
                  <section id='examples'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Common Examples
                    </h2>
                    <p className='mb-6 text-gray-700'>
                      Here are some common role configurations for different
                      scenarios:
                    </p>

                    <div className='space-y-4'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Leasing Agent
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                              <h4 className='mb-2 font-medium text-green-700'>
                                Allowed Actions:
                              </h4>
                              <ul className='space-y-1 text-sm text-gray-700'>
                                <li>• View available units</li>
                                <li>• Schedule tours</li>
                                <li>• Create prospect records</li>
                                <li>• Process applications</li>
                                <li>• Generate lease documents</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className='mb-2 font-medium text-red-700'>
                                Restricted Access:
                              </h4>
                              <ul className='space-y-1 text-sm text-gray-700'>
                                <li>• Financial reporting</li>
                                <li>• Maintenance management</li>
                                <li>• User administration</li>
                                <li>• Property settings</li>
                                <li>• Bulk data export</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Maintenance Supervisor
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                              <h4 className='mb-2 font-medium text-green-700'>
                                Allowed Actions:
                              </h4>
                              <ul className='space-y-1 text-sm text-gray-700'>
                                <li>• Manage work orders</li>
                                <li>• Assign maintenance staff</li>
                                <li>• Track inventory</li>
                                <li>• Communicate with residents</li>
                                <li>• Generate maintenance reports</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className='mb-2 font-medium text-red-700'>
                                Restricted Access:
                              </h4>
                              <ul className='space-y-1 text-sm text-gray-700'>
                                <li>• Lease management</li>
                                <li>• Financial data</li>
                                <li>• User permissions</li>
                                <li>• Property configuration</li>
                                <li>• Legal documents</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Navigation */}
                  <div className='flex items-center justify-between border-t pt-8'>
                    <Link href='/user-guide/getting-started/setting-up-user-accounts'>
                      <Button
                        variant='outline'
                        className='flex items-center space-x-2'
                      >
                        <ArrowLeft className='h-4 w-4' />
                        <span>Previous: Setting Up User Accounts</span>
                      </Button>
                    </Link>

                    <Link href='/user-guide/getting-started/initial-configuration-guide'>
                      <Button className='flex items-center space-x-2'>
                        <span>Next: Initial Configuration Guide</span>
                        <ChevronRight className='h-4 w-4' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
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
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default UnderstandingRolesPermissionsPage;
