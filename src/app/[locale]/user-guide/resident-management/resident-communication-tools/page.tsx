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
  MessageSquare,
  Bell,
  Phone,
  Send,
  Inbox,
} from 'lucide-react';

const ResidentCommunicationToolsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'messaging-system', title: 'Messaging System', level: 1 },
    { id: 'announcements', title: 'Announcements', level: 1 },
    { id: 'notifications', title: 'Notifications', level: 1 },
    {
      id: 'communication-preferences',
      title: 'Communication Preferences',
      level: 1,
    },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Residents',
      href: '/user-guide/resident-management/adding-new-residents',
      time: '5 min',
    },
    {
      title: 'Sending Announcements',
      href: '/user-guide/communication/sending-announcements',
      time: '3 min',
    },
    {
      title: 'Individual Messaging',
      href: '/user-guide/communication/individual-messaging',
      time: '2 min',
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
                Resident Communication Tools
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
                    <MessageSquare className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold text-gray-900'>
                      Resident Communication Tools
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>6 min read</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>All users</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>
                  Build stronger relationships with residents through effective
                  communication tools and streamlined messaging systems.
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
                      Effective communication is key to successful property
                      management. Syndik provides comprehensive communication
                      tools to help you stay connected with residents while
                      maintaining professional boundaries.
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='text-primary mt-0.5 h-5 w-5' />
                        <div>
                          <h4 className='font-medium text-blue-900'>
                            Communication Channels
                          </h4>
                          <ul className='mt-2 space-y-1 text-sm text-blue-800'>
                            <li>• In-app messaging system</li>
                            <li>• Email notifications</li>
                            <li>• SMS alerts for urgent matters</li>
                            <li>• Portal announcements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Messaging System */}
              <section id='messaging-system' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Messaging System
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='flex items-center text-lg font-medium text-gray-900'>
                            <Send className='mr-2 h-5 w-5 text-purple-500' />
                            Sending Messages
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Direct messages to individual residents
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Group messages by building or unit type
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Broadcast messages to all residents</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Scheduled message delivery</span>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='flex items-center text-lg font-medium text-gray-900'>
                            <Inbox className='mr-2 h-5 w-5 text-purple-500' />
                            Managing Responses
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Centralized inbox for all messages</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Priority flagging for urgent requests</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Read receipts and delivery confirmation
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Auto-categorization by topic</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Announcements */}
              <section id='announcements' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Announcements
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Creating Announcements
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                1
                              </span>
                              <span>
                                Navigate to Communications → Announcements
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                2
                              </span>
                              <span>Choose your target audience</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                3
                              </span>
                              <span>
                                Write your message with clear subject line
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                4
                              </span>
                              <span>Set delivery preferences and timing</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white'>
                                5
                              </span>
                              <span>Review and publish</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div className='rounded-lg border bg-blue-50 p-4'>
                          <h4 className='mb-2 font-medium text-blue-900'>
                            General Updates
                          </h4>
                          <p className='text-sm text-blue-800'>
                            Property news, policy changes, community events
                          </p>
                        </div>
                        <div className='rounded-lg border bg-yellow-50 p-4'>
                          <h4 className='mb-2 font-medium text-yellow-900'>
                            Maintenance Notices
                          </h4>
                          <p className='text-sm text-yellow-800'>
                            Scheduled maintenance, utility interruptions
                          </p>
                        </div>
                        <div className='rounded-lg border bg-red-50 p-4'>
                          <h4 className='mb-2 font-medium text-red-900'>
                            Emergency Alerts
                          </h4>
                          <p className='text-sm text-red-800'>
                            Urgent safety information, emergency procedures
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Notifications */}
              <section id='notifications' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Notifications
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div className='space-y-4'>
                        <h3 className='flex items-center text-lg font-medium text-gray-900'>
                          <Bell className='mr-2 h-5 w-5 text-purple-500' />
                          Notification Types
                        </h3>
                        <div className='space-y-3'>
                          <div className='rounded-lg border p-3'>
                            <h4 className='font-medium text-gray-900'>
                              In-App Notifications
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Real-time alerts within the resident portal
                            </p>
                          </div>
                          <div className='rounded-lg border p-3'>
                            <h4 className='font-medium text-gray-900'>
                              Email Notifications
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Detailed information sent to resident email
                            </p>
                          </div>
                          <div className='rounded-lg border p-3'>
                            <h4 className='font-medium text-gray-900'>
                              SMS Alerts
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Urgent notifications sent via text message
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Automated Triggers
                        </h3>
                        <div className='space-y-2 text-sm text-gray-600'>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Rent payment reminders</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Lease renewal notifications</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Maintenance request updates</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Community event reminders</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Document expiration alerts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Communication Preferences */}
              <section id='communication-preferences' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Communication Preferences
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <p className='text-gray-700'>
                        Respect resident preferences while ensuring important
                        information reaches everyone:
                      </p>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Resident Controls
                          </h3>
                          <div className='space-y-3'>
                            <div className='border-l-4 border-blue-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Channel Preferences
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Residents can choose email, SMS, or in-app only
                              </p>
                            </div>
                            <div className='border-l-4 border-green-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Frequency Settings
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Options for immediate, daily digest, or weekly
                                summaries
                              </p>
                            </div>
                            <div className='border-l-4 border-purple-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Topic Filters
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Subscribe to specific categories of
                                communications
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Management Overrides
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Emergency alerts bypass all preferences
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Legal notices sent via all available channels
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Rent-related communications mandatory</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Safety updates require confirmation</span>
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
                          Message Content
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Use clear, professional language</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Include relevant dates and times</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>
                              Provide contact information for questions
                            </span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Keep messages concise but informative</span>
                          </li>
                        </ul>
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Timing & Frequency
                        </h4>
                        <ul className='space-y-2 text-sm text-gray-600'>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>
                              Send during business hours when possible
                            </span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Avoid excessive messaging</span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>
                              Give adequate notice for planned activities
                            </span>
                          </li>
                          <li className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Follow up on important announcements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='mt-6 rounded-lg bg-blue-50 p-4'>
                      <h4 className='mb-2 font-medium text-blue-900'>
                        Communication Tips
                      </h4>
                      <ul className='space-y-1 text-sm text-blue-800'>
                        <li>
                          • Use templates for common communications to maintain
                          consistency
                        </li>
                        <li>
                          • Personalize messages when addressing individual
                          concerns
                        </li>
                        <li>
                          • Track communication history for reference in future
                          interactions
                        </li>
                        <li>
                          • Respond promptly to resident inquiries to build
                          trust
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
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                      >
                        <Phone className='mr-2 h-4 w-4' />
                        Schedule Call
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

export default ResidentCommunicationToolsPage;
