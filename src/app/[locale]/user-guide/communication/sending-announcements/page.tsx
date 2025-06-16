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
  Megaphone,
  ChevronRight,
  Mail,
  Send,
  Target,
  Calendar,
  FileText,
  Bell,
  MessageSquare,
  Eye,
  BarChart3,
  ImageIcon,
} from 'lucide-react';

const SendingAnnouncementsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'creating-announcement', title: 'Creating Announcements', level: 1 },
    { id: 'targeting-audience', title: 'Targeting Your Audience', level: 1 },
    { id: 'content-formatting', title: 'Content & Formatting', level: 1 },
    { id: 'scheduling', title: 'Scheduling & Timing', level: 1 },
    { id: 'delivery-channels', title: 'Delivery Channels', level: 1 },
    { id: 'tracking-engagement', title: 'Tracking Engagement', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Individual Messaging',
      href: '/user-guide/communication/individual-messaging',
      time: '2 min',
    },
    {
      title: 'Notification Settings',
      href: '/user-guide/communication/notification-settings',
      time: '4 min',
    },
    {
      title: 'Email Templates',
      href: '/user-guide/communication/email-templates',
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
                Communication
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='text-gray-900'>Sending Announcements</span>
            </div>
          </nav>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              <div className='rounded-lg border bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b p-6'>
                  <div className='mb-4 flex items-center space-x-3'>
                    <div className='rounded-lg bg-indigo-500 p-2'>
                      <Megaphone className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-900'>
                        Sending Announcements
                      </h1>
                      <div className='mt-2 flex items-center space-x-4'>
                        <Badge variant='secondary'>Communication</Badge>
                        <Badge variant='outline'>Popular</Badge>
                        <div className='flex items-center space-x-1 text-sm text-gray-500'>
                          <Clock className='h-4 w-4' />
                          <span>3 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='text-lg text-gray-600'>
                    Master the art of effective resident communication through
                    targeted announcements. Learn how to create, schedule, and
                    track announcements that keep your community informed and
                    engaged.
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
                      Effective communication is the cornerstone of successful
                      property management. Announcements help you keep residents
                      informed about important updates, events, maintenance
                      schedules, and community news.
                    </p>

                    <Card className='border-indigo-200 bg-indigo-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <Megaphone className='mt-0.5 h-5 w-5 text-indigo-600' />
                          <div>
                            <p className='font-medium text-indigo-800'>
                              Communication Goals
                            </p>
                            <ul className='mt-2 space-y-1 text-sm text-indigo-700'>
                              <li>• Keep residents informed and engaged</li>
                              <li>
                                • Reduce support inquiries through proactive
                                updates
                              </li>
                              <li>• Build community relationships and trust</li>
                              <li>
                                • Ensure compliance with notice requirements
                              </li>
                              <li>• Promote community events and services</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Creating Announcement */}
                  <section id='creating-announcement'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Creating Announcements
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Follow these steps to create effective announcements that
                      reach and engage your residents:
                    </p>

                    <div className='space-y-4'>
                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-white'>
                          1
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Navigate to Communications
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Go to Communications → Announcements → Create New
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-white'>
                          2
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Choose Announcement Type
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Select from general, emergency, maintenance, or
                            event categories
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-white'>
                          3
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Define Target Audience
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Select specific properties, units, or resident
                            groups
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-white'>
                          4
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Compose Content
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Write clear, concise content with proper formatting
                          </p>
                        </div>
                      </div>
                    </div>

                    <Card className='mt-4'>
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          Announcement Categories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <div>
                            <h4 className='mb-2 font-semibold text-red-700'>
                              Emergency & Urgent
                            </h4>
                            <ul className='space-y-1 text-sm'>
                              <li>• Building evacuations</li>
                              <li>• Utility outages</li>
                              <li>• Security alerts</li>
                              <li>• Weather emergencies</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='mb-2 font-semibold text-blue-700'>
                              General Information
                            </h4>
                            <ul className='space-y-1 text-sm'>
                              <li>• Policy updates</li>
                              <li>• Community events</li>
                              <li>• Amenity schedules</li>
                              <li>• Holiday notices</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Targeting Audience */}
                  <section id='targeting-audience'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Targeting Your Audience
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Effective targeting ensures your message reaches the right
                      residents at the right time.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Target className='h-5 w-5' />
                            <span>By Property</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-2 text-sm'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>All properties</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Specific buildings</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Property clusters</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Floor levels</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Users className='h-5 w-5' />
                            <span>By Resident Type</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-2 text-sm'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>All residents</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>New residents</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Long-term residents</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Pet owners</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <MessageSquare className='h-5 w-5' />
                            <span>Custom Groups</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-2 text-sm'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Board members</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Committee members</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Maintenance contacts</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Custom lists</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Content Formatting */}
                  <section id='content-formatting'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Content & Formatting
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Create engaging, well-formatted announcements that capture
                      attention and deliver clear information.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <FileText className='h-5 w-5' />
                            <span>Content Elements</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div>
                              <h4 className='text-sm font-semibold'>
                                Subject Line
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Clear, action-oriented headline
                              </p>
                            </div>
                            <div>
                              <h4 className='text-sm font-semibold'>
                                Main Message
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Concise, informative content body
                              </p>
                            </div>
                            <div>
                              <h4 className='text-sm font-semibold'>
                                Call to Action
                              </h4>
                              <p className='text-sm text-gray-600'>
                                What residents should do next
                              </p>
                            </div>
                            <div>
                              <h4 className='text-sm font-semibold'>
                                Contact Info
                              </h4>
                              <p className='text-sm text-gray-600'>
                                How to get more information
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <ImageIcon className='h-5 w-5' />
                            <span>Rich Media</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                              <span className='text-sm font-medium'>
                                Images
                              </span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                              <span className='text-sm font-medium'>
                                Documents
                              </span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                              <span className='text-sm font-medium'>Links</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                              <span className='text-sm font-medium'>
                                Videos
                              </span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
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
                              Writing Best Practices
                            </p>
                            <ul className='mt-2 space-y-1 text-sm text-yellow-700'>
                              <li>• Keep messages concise and scannable</li>
                              <li>• Use clear, everyday language</li>
                              <li>• Include important dates and deadlines</li>
                              <li>• Proofread for spelling and grammar</li>
                              <li>• Consider mobile readability</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Scheduling */}
                  <section id='scheduling'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Scheduling & Timing
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Strategic timing ensures maximum reach and engagement for
                      your announcements.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <Calendar className='h-5 w-5' />
                          <span>Delivery Options</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                              <Send className='h-6 w-6 text-green-600' />
                            </div>
                            <h4 className='font-semibold'>Send Now</h4>
                            <p className='text-sm text-gray-600'>
                              Immediate delivery for urgent announcements
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                              <Calendar className='text-primary h-6 w-6' />
                            </div>
                            <h4 className='font-semibold'>Schedule</h4>
                            <p className='text-sm text-gray-600'>
                              Plan delivery for optimal timing
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-purple-100 p-3'>
                              <Eye className='h-6 w-6 text-purple-600' />
                            </div>
                            <h4 className='font-semibold'>Draft</h4>
                            <p className='text-sm text-gray-600'>
                              Save for review and later sending
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className='mt-4'>
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          Optimal Timing Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Best Times to Send
                            </h4>
                            <ul className='space-y-1 text-sm'>
                              <li>• Weekdays: 9 AM - 11 AM</li>
                              <li>• Weekdays: 2 PM - 4 PM</li>
                              <li>• Sunday evenings: 6 PM - 8 PM</li>
                              <li>• Avoid very early mornings</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='mb-2 font-semibold'>
                              Emergency Timing
                            </h4>
                            <ul className='space-y-1 text-sm'>
                              <li>• Send immediately for emergencies</li>
                              <li>• Follow up with details later</li>
                              <li>• Use multiple channels for urgency</li>
                              <li>• Consider time zone differences</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Delivery Channels */}
                  <section id='delivery-channels'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Delivery Channels
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Choose the right combination of channels to ensure your
                      message reaches all residents effectively.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                            <Mail className='text-primary h-6 w-6' />
                          </div>
                          <h4 className='font-semibold'>Email</h4>
                          <p className='text-sm text-gray-600'>
                            Primary channel for detailed information
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            98% delivery rate
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                            <MessageSquare className='h-6 w-6 text-green-600' />
                          </div>
                          <h4 className='font-semibold'>SMS</h4>
                          <p className='text-sm text-gray-600'>
                            Quick alerts and urgent notifications
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            95% open rate
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-purple-100 p-3'>
                            <Bell className='h-6 w-6 text-purple-600' />
                          </div>
                          <h4 className='font-semibold'>Push</h4>
                          <p className='text-sm text-gray-600'>
                            Mobile app notifications
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            85% open rate
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-orange-100 p-3'>
                            <FileText className='h-6 w-6 text-orange-600' />
                          </div>
                          <h4 className='font-semibold'>Portal</h4>
                          <p className='text-sm text-gray-600'>
                            Resident portal dashboard
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            Persistent visibility
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Tracking Engagement */}
                  <section id='tracking-engagement'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Tracking Engagement
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Monitor announcement performance to improve future
                      communications and ensure important messages are received.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <BarChart3 className='h-5 w-5' />
                            <span>Engagement Metrics</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex justify-between'>
                              <span className='text-sm'>Delivery Rate:</span>
                              <span className='text-sm font-medium'>98.5%</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm'>Open Rate:</span>
                              <span className='text-sm font-medium'>72.3%</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm'>Click Rate:</span>
                              <span className='text-sm font-medium'>15.8%</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm'>Response Rate:</span>
                              <span className='text-sm font-medium'>8.2%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Engagement Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='rounded-lg bg-blue-50 p-3'>
                              <h4 className='text-sm font-semibold text-blue-800'>
                                Follow-up Options
                              </h4>
                              <ul className='mt-1 space-y-1 text-xs text-blue-700'>
                                <li>• Send reminders to non-readers</li>
                                <li>• Try different channels</li>
                                <li>• Personal phone calls for urgent items</li>
                              </ul>
                            </div>
                            <div className='rounded-lg bg-green-50 p-3'>
                              <h4 className='text-sm font-semibold text-green-800'>
                                Feedback Collection
                              </h4>
                              <ul className='mt-1 space-y-1 text-xs text-green-700'>
                                <li>• Survey responses</li>
                                <li>• Comment threads</li>
                                <li>• Direct replies</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Best Practices */}
                  <section id='best-practices'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Best Practices
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Follow these proven strategies to maximize the
                      effectiveness of your resident communications.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg text-green-700'>
                            Do&apos;s
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Use clear, descriptive subject lines</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Include all relevant dates and times</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>
                                Provide contact information for questions
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Test announcements before sending</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <CheckCircle className='mt-0.5 h-4 w-4 text-green-500' />
                              <span>Follow up on important announcements</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg text-red-700'>
                            Don&apos;ts
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-start space-x-2'>
                              <AlertCircle className='mt-0.5 h-4 w-4 text-red-500' />
                              <span>
                                Send too many non-essential announcements
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <AlertCircle className='mt-0.5 h-4 w-4 text-red-500' />
                              <span>
                                Use jargon or overly technical language
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <AlertCircle className='mt-0.5 h-4 w-4 text-red-500' />
                              <span>Send without proofreading content</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <AlertCircle className='mt-0.5 h-4 w-4 text-red-500' />
                              <span>
                                Ignore delivery failures or low engagement
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <AlertCircle className='mt-0.5 h-4 w-4 text-red-500' />
                              <span>
                                Forget to include necessary attachments
                              </span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className='mt-4 border-green-200 bg-green-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-0.5 h-5 w-5 text-green-600' />
                          <div>
                            <p className='font-medium text-green-800'>
                              Pro Tip: Communication Strategy
                            </p>
                            <p className='text-sm text-green-700'>
                              Develop a communication calendar to plan regular
                              updates, seasonal announcements, and recurring
                              notices. This helps maintain consistent engagement
                              and ensures residents know when to expect
                              important information.
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

export default SendingAnnouncementsPage;
