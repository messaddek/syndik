import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Settings,
  ChevronRight,
  Mail,
  Shield,
  CreditCard,
  Bell,
  Palette,
  Database,
} from 'lucide-react';

const InitialConfigurationGuidePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'system-settings', title: 'System Settings', level: 1 },
    { id: 'organization-setup', title: 'Organization Setup', level: 1 },
    { id: 'user-preferences', title: 'User Preferences', level: 1 },
    { id: 'security-settings', title: 'Security Settings', level: 1 },
    { id: 'payment-integration', title: 'Payment Integration', level: 1 },
    { id: 'notification-setup', title: 'Notification Setup', level: 1 },
    { id: 'customization', title: 'Customization Options', level: 1 },
    { id: 'data-import', title: 'Data Import', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Setting Up User Accounts',
      href: '/user-guide/getting-started/setting-up-user-accounts',
      time: '3 min',
    },
    {
      title: 'Understanding Roles & Permissions',
      href: '/user-guide/getting-started/understanding-roles-permissions',
      time: '7 min',
    },
    {
      title: 'Creating Your First Property',
      href: '/user-guide/getting-started/creating-your-first-property',
      time: '5 min',
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
              <span className='text-gray-900'>Initial Configuration Guide</span>
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
                      <Settings className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-900'>
                        Initial Configuration Guide
                      </h1>
                      <div className='mt-2 flex items-center space-x-4'>
                        <Badge variant='secondary'>Getting Started</Badge>
                        <div className='flex items-center space-x-1 text-sm text-gray-500'>
                          <Clock className='h-4 w-4' />
                          <span>10 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='text-lg text-gray-600'>
                    Complete setup guide for configuring Syndik for your
                    property management needs. Follow this comprehensive
                    checklist to ensure optimal performance and security.
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
                      Proper initial configuration is crucial for maximizing
                      Syndik&apos;s effectiveness in managing your properties.
                      This guide will walk you through all essential settings
                      and configurations to get your system ready for daily
                      operations.
                    </p>

                    <Card className='border-blue-200 bg-blue-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertCircle className='text-primary mt-0.5 h-5 w-5' />
                          <div>
                            <p className='font-medium text-blue-800'>
                              Configuration Checklist
                            </p>
                            <p className='mt-1 text-sm text-blue-700'>
                              This guide includes a comprehensive checklist to
                              ensure no critical settings are missed during
                              setup.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* System Settings */}
                  <section id='system-settings'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      System Settings
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Configure core system settings that affect the overall
                      behavior of your Syndik instance.
                    </p>

                    <div className='space-y-4'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Time Zone & Regional Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Set your primary time zone</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Configure date and time formats</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Set currency and number formats</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Choose language preferences</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Data Backup & Storage
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Configure automatic backup schedule</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Set data retention policies</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Configure cloud storage integration</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Organization Setup */}
                  <section id='organization-setup'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Organization Setup
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Configure your organization&apos;s basic information and
                      contact details.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Company Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li>• Organization name and logo</li>
                            <li>• Business registration details</li>
                            <li>• Tax identification numbers</li>
                            <li>• Business type and licensing</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li>• Primary business address</li>
                            <li>• Phone and fax numbers</li>
                            <li>• Email addresses</li>
                            <li>• Website and social media</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* User Preferences */}
                  <section id='user-preferences'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      User Preferences
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Set up default user preferences and interface settings.
                    </p>

                    <Card>
                      <CardContent className='p-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Interface Settings
                            </h4>
                            <ul className='space-y-1 text-sm text-gray-600'>
                              <li>• Theme preferences</li>
                              <li>• Dashboard layout</li>
                              <li>• Navigation style</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Default Views
                            </h4>
                            <ul className='space-y-1 text-sm text-gray-600'>
                              <li>• Property listings</li>
                              <li>• Resident management</li>
                              <li>• Financial reports</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Accessibility
                            </h4>
                            <ul className='space-y-1 text-sm text-gray-600'>
                              <li>• Font size preferences</li>
                              <li>• Color contrast</li>
                              <li>• Keyboard shortcuts</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Security Settings */}
                  <section id='security-settings'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Security Settings
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Configure security policies and access controls to protect
                      your data.
                    </p>

                    <div className='space-y-4'>
                      <Card className='border-red-200 bg-red-50'>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg text-red-800'>
                            <Shield className='h-5 w-5' />
                            <span>Critical Security Settings</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm text-red-700'>
                            <li>• Enable two-factor authentication</li>
                            <li>• Set password complexity requirements</li>
                            <li>• Configure session timeout policies</li>
                            <li>• Set up audit logging</li>
                            <li>• Configure IP address restrictions</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Payment Integration */}
                  <section id='payment-integration'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Payment Integration
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Set up payment processing and financial integrations.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <CreditCard className='h-5 w-5' />
                          <span>Payment Gateways</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Online Payments
                            </h4>
                            <ul className='space-y-1 text-sm text-gray-600'>
                              <li>• Credit card processing</li>
                              <li>• ACH/bank transfers</li>
                              <li>• Digital wallets</li>
                              <li>• Payment scheduling</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Financial Reporting
                            </h4>
                            <ul className='space-y-1 text-sm text-gray-600'>
                              <li>• Chart of accounts setup</li>
                              <li>• Tax reporting configuration</li>
                              <li>• Financial statement formats</li>
                              <li>• Automated reconciliation</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Notification Setup */}
                  <section id='notification-setup'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Notification Setup
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Configure notification preferences and communication
                      channels.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <Bell className='h-5 w-5' />
                          <span>Notification Channels</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-3'>
                          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                            <div>
                              <h4 className='font-medium'>
                                Email Notifications
                              </h4>
                              <p className='text-sm text-gray-600'>
                                SMTP server configuration and templates
                              </p>
                            </div>
                            <CheckCircle className='h-5 w-5 text-green-500' />
                          </div>
                          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                            <div>
                              <h4 className='font-medium'>SMS Notifications</h4>
                              <p className='text-sm text-gray-600'>
                                Text messaging service integration
                              </p>
                            </div>
                            <CheckCircle className='h-5 w-5 text-green-500' />
                          </div>
                          <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                            <div>
                              <h4 className='font-medium'>
                                Push Notifications
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Mobile app and browser notifications
                              </p>
                            </div>
                            <CheckCircle className='h-5 w-5 text-green-500' />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Customization */}
                  <section id='customization'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Customization Options
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Personalize the interface and functionality to match your
                      workflow.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Palette className='h-5 w-5' />
                            <span>Visual Customization</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li>• Brand colors and logo</li>
                            <li>• Custom themes</li>
                            <li>• Dashboard widgets</li>
                            <li>• Report templates</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Workflow Customization
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li>• Custom fields</li>
                            <li>• Automated workflows</li>
                            <li>• Business rules</li>
                            <li>• Integration settings</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Data Import */}
                  <section id='data-import'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Data Import
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Import existing data from other systems to get started
                      quickly.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <Database className='h-5 w-5' />
                          <span>Import Options</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-4'>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Supported Data Types
                            </h4>
                            <div className='grid grid-cols-2 gap-2 text-sm'>
                              <div>• Property information</div>
                              <div>• Resident data</div>
                              <div>• Lease agreements</div>
                              <div>• Financial records</div>
                              <div>• Maintenance history</div>
                              <div>• Document archives</div>
                            </div>
                          </div>
                          <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-3'>
                            <p className='text-sm text-yellow-800'>
                              <strong>Note:</strong> Data import should be
                              performed carefully with proper backup procedures
                              in place.
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
                        className={`hover:text-primary block text-sm transition-colors ${
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
    </LandingLayout>
  );
};

export default InitialConfigurationGuidePage;
