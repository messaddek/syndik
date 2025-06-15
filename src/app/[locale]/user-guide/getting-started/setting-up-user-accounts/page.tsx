import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import {
  ArrowLeft,
  Users,
  Shield,
  Settings,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
} from 'lucide-react';

const SettingUpUserAccountsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'creating-admin', title: 'Creating Admin Accounts', level: 1 },
    { id: 'inviting-users', title: 'Inviting Users', level: 1 },
    { id: 'setting-permissions', title: 'Setting User Permissions', level: 1 },
    { id: 'user-roles', title: 'Understanding User Roles', level: 2 },
    { id: 'managing-access', title: 'Managing Access Levels', level: 2 },
    { id: 'verification', title: 'Account Verification', level: 1 },
    { id: 'troubleshooting', title: 'Troubleshooting', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Creating Your First Property',
      href: '/user-guide/getting-started/creating-your-first-property',
      time: '5 min',
    },
    {
      title: 'Understanding Roles & Permissions',
      href: '/user-guide/getting-started/understanding-roles-permissions',
      time: '7 min',
    },
    {
      title: 'Initial Configuration Guide',
      href: '/user-guide/getting-started/initial-configuration-guide',
      time: '10 min',
    },
  ];
  return (
    <ArticleLayout
      articleSlug='setting-up-user-accounts'
      title='Setting Up User Accounts'
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
            Getting Started
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900'>Setting Up User Accounts</span>
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
                  <Users className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    Setting Up User Accounts
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>Getting Started</Badge>
                    <Badge variant='outline'>Popular</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>3 min read</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-lg text-gray-600'>
                Learn how to create and manage user accounts in Syndik, set up
                proper permissions, and invite team members to your property
                management platform.
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
                  Setting up user accounts properly is crucial for maintaining
                  security and ensuring smooth operations in your property
                  management system. This guide will walk you through creating
                  different types of accounts and managing user access.
                </p>

                <Card className='border-blue-200 bg-blue-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-medium text-blue-800'>
                          Before You Begin
                        </p>
                        <p className='mt-1 text-sm text-blue-700'>
                          Make sure you have administrative privileges and have
                          completed the initial property setup.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Creating Admin Accounts */}
              <section id='creating-admin'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Creating Admin Accounts
                </h2>
                <p className='mb-4 text-gray-700'>
                  Admin accounts have full access to all features and settings.
                  Follow these steps to create admin accounts:
                </p>

                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      1
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Navigate to User Management
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Go to Settings → Users & Permissions → User Management
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      2
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Click &quot;Add New User&quot;
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Select the &quot;Administrator&quot; role from the
                        dropdown menu
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      3
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Fill in User Details
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Enter name, email, phone number, and any additional
                        required information
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white'>
                      4
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Send Invitation
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Click &quot;Send Invitation&quot; to email the new admin
                        their login credentials
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* Inviting Users */}
              <section id='inviting-users'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Inviting Users
                </h2>
                <p className='mb-4 text-gray-700'>
                  You can invite multiple users at once and assign different
                  roles based on their responsibilities:
                </p>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Bulk User Invitation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <p className='text-sm text-gray-600'>
                        Use the &quot;Bulk Invite&quot; feature to add multiple
                        users efficiently:
                      </p>
                      <ul className='list-inside list-disc space-y-1 text-sm text-gray-700'>
                        <li>Upload a CSV file with user information</li>
                        <li>Copy and paste email addresses (one per line)</li>
                        <li>Manually enter multiple email addresses</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Setting Permissions */}
              <section id='setting-permissions'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Setting User Permissions
                </h2>

                <h3
                  id='user-roles'
                  className='mb-3 text-xl font-medium text-gray-900'
                >
                  Understanding User Roles
                </h3>
                <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center space-x-2 text-base'>
                        <Shield className='h-5 w-5 text-red-500' />
                        <span>Administrator</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Full system access</li>
                        <li>• User management</li>
                        <li>• Financial settings</li>
                        <li>• System configuration</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center space-x-2 text-base'>
                        <Users className='h-5 w-5 text-blue-500' />
                        <span>Property Manager</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Property operations</li>
                        <li>• Resident management</li>
                        <li>• Maintenance requests</li>
                        <li>• Basic reporting</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center space-x-2 text-base'>
                        <Settings className='h-5 w-5 text-green-500' />
                        <span>Maintenance Staff</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• View work orders</li>
                        <li>• Update request status</li>
                        <li>• Upload photos</li>
                        <li>• Time tracking</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center space-x-2 text-base'>
                        <Mail className='h-5 w-5 text-purple-500' />
                        <span>Leasing Agent</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Prospect management</li>
                        <li>• Tour scheduling</li>
                        <li>• Lease processing</li>
                        <li>• Unit availability</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h3
                  id='managing-access'
                  className='mb-3 text-xl font-medium text-gray-900'
                >
                  Managing Access Levels
                </h3>
                <p className='mb-4 text-gray-700'>
                  You can customize permissions for each role or create custom
                  permission sets:
                </p>
                <ul className='list-inside list-disc space-y-1 text-gray-700'>
                  <li>
                    Property-specific access (limit users to certain properties)
                  </li>
                  <li>
                    Feature-based permissions (financial data, reports, etc.)
                  </li>
                  <li>Time-based access (temporary permissions)</li>
                  <li>
                    Action-level controls (view only vs. edit permissions)
                  </li>
                </ul>
              </section>
              {/* Verification */}
              <section id='verification'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Account Verification
                </h2>
                <p className='mb-4 text-gray-700'>
                  All new users must verify their accounts before gaining
                  access:
                </p>

                <Card className='border-green-200 bg-green-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-green-600' />
                      <div>
                        <p className='font-medium text-green-800'>
                          Verification Process
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-green-700'>
                          <li>1. User receives invitation email</li>
                          <li>2. Clicks verification link</li>
                          <li>3. Sets up password and security questions</li>
                          <li>4. Completes profile information</li>
                          <li>5. Gains access to assigned features</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Troubleshooting */}
              <section id='troubleshooting'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Troubleshooting
                </h2>
                <div className='space-y-4'>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-base'>
                        User Didn&apos;t Receive Invitation Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Check spam/junk folder</li>
                        <li>• Verify email address is correct</li>
                        <li>• Resend invitation from user management panel</li>
                        <li>• Contact support if issue persists</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-base'>
                        User Can&apos;t Access Certain Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Verify user role and permissions</li>
                        <li>• Check property-specific access settings</li>
                        <li>• Ensure account is fully verified</li>
                        <li>• Review custom permission assignments</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>{' '}
              {/* Navigation */}
              <div className='flex items-center justify-between border-t pt-8'>
                <Button
                  variant='outline'
                  className='flex items-center space-x-2'
                  asChild
                >
                  <Link href='/user-guide'>
                    <ArrowLeft className='h-4 w-4' />
                    <span>Back to User Guide</span>
                  </Link>
                </Button>

                <Button className='flex items-center space-x-2' asChild>
                  <Link href='/user-guide/getting-started/understanding-roles-permissions'>
                    <span>Next: Understanding Roles & Permissions</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
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
            </Card>{' '}
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default SettingUpUserAccountsPage;
