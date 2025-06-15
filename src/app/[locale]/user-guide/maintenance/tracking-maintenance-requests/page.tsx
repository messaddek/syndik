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
  Wrench,
  ChevronRight,
  Mail,
  Search,
  Filter,
  Calendar,
  User,
  MapPin,
  FileText,
  Camera,
  MessageSquare,
  Bell,
  TrendingUp,
} from 'lucide-react';

const TrackingMaintenanceRequestsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'request-dashboard', title: 'Request Dashboard', level: 1 },
    { id: 'request-details', title: 'Request Details & Status', level: 1 },
    { id: 'priority-management', title: 'Priority Management', level: 1 },
    { id: 'assignment-tracking', title: 'Assignment & Tracking', level: 1 },
    { id: 'communication', title: 'Communication Hub', level: 1 },
    { id: 'progress-updates', title: 'Progress Updates', level: 1 },
    { id: 'completion-workflow', title: 'Completion Workflow', level: 1 },
    { id: 'reporting-analytics', title: 'Reporting & Analytics', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Creating Work Orders',
      href: '/user-guide/maintenance/creating-work-orders',
      time: '4 min',
    },
    {
      title: 'Vendor Management',
      href: '/user-guide/maintenance/vendor-management',
      time: '7 min',
    },
    {
      title: 'Preventive Maintenance Setup',
      href: '/user-guide/maintenance/preventive-maintenance-setup',
      time: '9 min',
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
                Maintenance & Requests
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='text-gray-900'>
                Tracking Maintenance Requests
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
                    <div className='rounded-lg bg-red-500 p-2'>
                      <Wrench className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-900'>
                        Tracking Maintenance Requests
                      </h1>
                      <div className='mt-2 flex items-center space-x-4'>
                        <Badge variant='secondary'>
                          Maintenance & Requests
                        </Badge>
                        <Badge variant='outline'>Popular</Badge>
                        <div className='flex items-center space-x-1 text-sm text-gray-500'>
                          <Clock className='h-4 w-4' />
                          <span>5 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='text-lg text-gray-600'>
                    Master the art of tracking and managing maintenance requests
                    efficiently. Learn how to monitor progress, communicate with
                    residents and vendors, and ensure timely completion of all
                    maintenance tasks.
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
                      Effective maintenance request tracking is crucial for
                      maintaining property value, resident satisfaction, and
                      operational efficiency. This guide covers the complete
                      lifecycle of maintenance request management in Syndik.
                    </p>

                    <Card className='border-red-200 bg-red-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-0.5 h-5 w-5 text-red-600' />
                          <div>
                            <p className='font-medium text-red-800'>
                              Key Tracking Benefits
                            </p>
                            <ul className='mt-2 space-y-1 text-sm text-red-700'>
                              <li>• Real-time status updates and visibility</li>
                              <li>• Improved resident communication</li>
                              <li>
                                • Better vendor coordination and accountability
                              </li>
                              <li>• Data-driven maintenance insights</li>
                              <li>• Compliance and audit trail maintenance</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Request Dashboard */}
                  <section id='request-dashboard'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Request Dashboard
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      The maintenance dashboard provides a centralized view of
                      all maintenance activities across your properties.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-100 p-3'>
                            <Clock className='h-6 w-6 text-yellow-600' />
                          </div>
                          <h4 className='font-semibold text-yellow-700'>
                            Pending
                          </h4>
                          <p className='text-2xl font-bold text-yellow-600'>
                            12
                          </p>
                          <p className='text-sm text-gray-600'>
                            Awaiting assignment
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                            <Wrench className='h-6 w-6 text-blue-600' />
                          </div>
                          <h4 className='font-semibold text-blue-700'>
                            In Progress
                          </h4>
                          <p className='text-2xl font-bold text-blue-600'>8</p>
                          <p className='text-sm text-gray-600'>
                            Currently being worked on
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-red-100 p-3'>
                            <AlertCircle className='h-6 w-6 text-red-600' />
                          </div>
                          <h4 className='font-semibold text-red-700'>Urgent</h4>
                          <p className='text-2xl font-bold text-red-600'>3</p>
                          <p className='text-sm text-gray-600'>
                            High priority items
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className='p-4 text-center'>
                          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                            <CheckCircle className='h-6 w-6 text-green-600' />
                          </div>
                          <h4 className='font-semibold text-green-700'>
                            Completed
                          </h4>
                          <p className='text-2xl font-bold text-green-600'>
                            45
                          </p>
                          <p className='text-sm text-gray-600'>This month</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className='mt-4'>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <Search className='h-5 w-5' />
                          <span>Quick Filters</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                          <Button variant='outline' className='justify-start'>
                            <Filter className='mr-2 h-4 w-4' />
                            By Status
                          </Button>
                          <Button variant='outline' className='justify-start'>
                            <MapPin className='mr-2 h-4 w-4' />
                            By Property
                          </Button>
                          <Button variant='outline' className='justify-start'>
                            <Calendar className='mr-2 h-4 w-4' />
                            By Date Range
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Request Details */}
                  <section id='request-details'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Request Details & Status
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Each maintenance request contains comprehensive
                      information and follows a structured status workflow.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Request Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex justify-between border-b pb-2'>
                              <span className='text-sm font-medium'>
                                Request ID:
                              </span>
                              <span className='text-sm'>#MR-2025-001</span>
                            </div>
                            <div className='flex justify-between border-b pb-2'>
                              <span className='text-sm font-medium'>Unit:</span>
                              <span className='text-sm'>Apt 2B</span>
                            </div>
                            <div className='flex justify-between border-b pb-2'>
                              <span className='text-sm font-medium'>
                                Category:
                              </span>
                              <span className='text-sm'>Plumbing</span>
                            </div>
                            <div className='flex justify-between border-b pb-2'>
                              <span className='text-sm font-medium'>
                                Priority:
                              </span>
                              <Badge variant='destructive' className='text-xs'>
                                Urgent
                              </Badge>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm font-medium'>
                                Submitted:
                              </span>
                              <span className='text-sm'>June 10, 2025</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Status Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex items-center space-x-3'>
                              <div className='h-2 w-2 rounded-full bg-green-500'></div>
                              <div className='flex-1'>
                                <p className='text-sm font-medium'>
                                  Request Submitted
                                </p>
                                <p className='text-xs text-gray-500'>
                                  June 10, 10:30 AM
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center space-x-3'>
                              <div className='h-2 w-2 rounded-full bg-green-500'></div>
                              <div className='flex-1'>
                                <p className='text-sm font-medium'>
                                  Assigned to Vendor
                                </p>
                                <p className='text-xs text-gray-500'>
                                  June 10, 2:15 PM
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center space-x-3'>
                              <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                              <div className='flex-1'>
                                <p className='text-sm font-medium'>
                                  In Progress
                                </p>
                                <p className='text-xs text-gray-500'>
                                  June 11, 9:00 AM
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center space-x-3'>
                              <div className='h-2 w-2 rounded-full bg-gray-300'></div>
                              <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-500'>
                                  Awaiting Completion
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Priority Management */}
                  <section id='priority-management'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Priority Management
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Properly categorizing and prioritizing maintenance
                      requests ensures urgent issues receive immediate
                      attention.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <Card className='border-red-200'>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg text-red-700'>
                            <AlertCircle className='h-5 w-5' />
                            <span>Emergency</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-600'>
                            Immediate response required
                          </p>
                          <ul className='space-y-1 text-sm'>
                            <li>• No heat/AC in extreme weather</li>
                            <li>• Water leaks causing damage</li>
                            <li>• Electrical hazards</li>
                            <li>• Security system failures</li>
                          </ul>
                          <div className='mt-3 text-xs font-medium text-red-600'>
                            Response: 2-4 hours
                          </div>
                        </CardContent>
                      </Card>

                      <Card className='border-yellow-200'>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg text-yellow-700'>
                            <Clock className='h-5 w-5' />
                            <span>Urgent</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-600'>
                            Same-day or next-day attention
                          </p>
                          <ul className='space-y-1 text-sm'>
                            <li>• Appliance malfunctions</li>
                            <li>• Plumbing blockages</li>
                            <li>• HVAC issues</li>
                            <li>• Entry door problems</li>
                          </ul>
                          <div className='mt-3 text-xs font-medium text-yellow-600'>
                            Response: 24-48 hours
                          </div>
                        </CardContent>
                      </Card>

                      <Card className='border-green-200'>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg text-green-700'>
                            <CheckCircle className='h-5 w-5' />
                            <span>Standard</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-600'>
                            Routine maintenance items
                          </p>
                          <ul className='space-y-1 text-sm'>
                            <li>• Cosmetic repairs</li>
                            <li>• Light fixture replacements</li>
                            <li>• Minor wall patching</li>
                            <li>• Filter replacements</li>
                          </ul>
                          <div className='mt-3 text-xs font-medium text-green-600'>
                            Response: 3-7 days
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Assignment Tracking */}
                  <section id='assignment-tracking'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Assignment & Tracking
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Monitor work assignments and track progress across your
                      maintenance team and vendor network.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <User className='h-5 w-5' />
                          <span>Assignment Overview</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <div>
                            <h4 className='mb-3 font-semibold'>
                              Internal Staff
                            </h4>
                            <div className='space-y-2'>
                              <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                <div>
                                  <p className='text-sm font-medium'>
                                    Mike Johnson
                                  </p>
                                  <p className='text-xs text-gray-600'>
                                    Maintenance Technician
                                  </p>
                                </div>
                                <Badge variant='secondary' className='text-xs'>
                                  5 Active
                                </Badge>
                              </div>
                              <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                <div>
                                  <p className='text-sm font-medium'>
                                    Sarah Davis
                                  </p>
                                  <p className='text-xs text-gray-600'>
                                    Head of Maintenance
                                  </p>
                                </div>
                                <Badge variant='secondary' className='text-xs'>
                                  3 Active
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className='mb-3 font-semibold'>
                              External Vendors
                            </h4>
                            <div className='space-y-2'>
                              <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                <div>
                                  <p className='text-sm font-medium'>
                                    ABC Plumbing
                                  </p>
                                  <p className='text-xs text-gray-600'>
                                    Plumbing Specialist
                                  </p>
                                </div>
                                <Badge variant='outline' className='text-xs'>
                                  2 Active
                                </Badge>
                              </div>
                              <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                <div>
                                  <p className='text-sm font-medium'>
                                    Elite HVAC
                                  </p>
                                  <p className='text-xs text-gray-600'>
                                    HVAC Services
                                  </p>
                                </div>
                                <Badge variant='outline' className='text-xs'>
                                  1 Active
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Communication */}
                  <section id='communication'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Communication Hub
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Maintain clear communication with residents, staff, and
                      vendors throughout the maintenance process.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <MessageSquare className='h-5 w-5' />
                            <span>Resident Updates</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='rounded-lg bg-blue-50 p-3'>
                              <p className='text-sm font-medium text-blue-800'>
                                Automatic Notifications
                              </p>
                              <ul className='mt-2 space-y-1 text-xs text-blue-700'>
                                <li>• Request received confirmation</li>
                                <li>• Technician assignment update</li>
                                <li>• Work completion notification</li>
                              </ul>
                            </div>
                            <div className='rounded-lg bg-gray-50 p-3'>
                              <p className='text-sm font-medium'>
                                Manual Communication
                              </p>
                              <ul className='mt-2 space-y-1 text-xs text-gray-600'>
                                <li>• Progress updates</li>
                                <li>• Scheduling coordination</li>
                                <li>• Additional information requests</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Bell className='h-5 w-5' />
                            <span>Team Coordination</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='rounded-lg bg-green-50 p-3'>
                              <p className='text-sm font-medium text-green-800'>
                                Internal Alerts
                              </p>
                              <ul className='mt-2 space-y-1 text-xs text-green-700'>
                                <li>• New request assignments</li>
                                <li>• Overdue work orders</li>
                                <li>• Emergency request alerts</li>
                              </ul>
                            </div>
                            <div className='rounded-lg bg-gray-50 p-3'>
                              <p className='text-sm font-medium'>
                                Vendor Communication
                              </p>
                              <ul className='mt-2 space-y-1 text-xs text-gray-600'>
                                <li>• Work order dispatch</li>
                                <li>• Status update requests</li>
                                <li>• Completion confirmations</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Progress Updates */}
                  <section id='progress-updates'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Progress Updates
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Track work progress with photos, notes, and time logging
                      for complete transparency.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='text-lg'>Update Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-purple-100 p-3'>
                              <Camera className='h-6 w-6 text-purple-600' />
                            </div>
                            <h4 className='font-semibold'>Photo Updates</h4>
                            <p className='text-sm text-gray-600'>
                              Before, during, and after photos
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                              <FileText className='h-6 w-6 text-blue-600' />
                            </div>
                            <h4 className='font-semibold'>Work Notes</h4>
                            <p className='text-sm text-gray-600'>
                              Detailed progress descriptions
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                              <Clock className='h-6 w-6 text-green-600' />
                            </div>
                            <h4 className='font-semibold'>Time Tracking</h4>
                            <p className='text-sm text-gray-600'>
                              Labor hours and costs
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Completion Workflow */}
                  <section id='completion-workflow'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Completion Workflow
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Follow a structured completion process to ensure quality
                      and resident satisfaction.
                    </p>

                    <div className='space-y-4'>
                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white'>
                          1
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Work Completion
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Technician marks work as complete with final photos
                            and notes
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white'>
                          2
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Quality Review
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Supervisor reviews work quality and completeness
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white'>
                          3
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Resident Notification
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Resident receives completion notification and
                            satisfaction survey
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white'>
                          4
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Request Closure
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Final documentation and archival of the request
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Reporting Analytics */}
                  <section id='reporting-analytics'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Reporting & Analytics
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Use maintenance data to identify trends, improve
                      efficiency, and make informed decisions.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <TrendingUp className='h-5 w-5' />
                            <span>Performance Metrics</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex justify-between'>
                              <span className='text-sm'>
                                Average Response Time:
                              </span>
                              <span className='text-sm font-medium'>
                                2.3 hours
                              </span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm'>Completion Rate:</span>
                              <span className='text-sm font-medium'>97.2%</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm'>
                                Resident Satisfaction:
                              </span>
                              <span className='text-sm font-medium'>4.6/5</span>
                            </div>
                            <div className='flex justify-between'>
                              <span className='text-sm'>Cost per Request:</span>
                              <span className='text-sm font-medium'>$127</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Common Issues
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Plumbing Issues</span>
                              <div className='flex items-center space-x-2'>
                                <div className='h-2 w-16 rounded-full bg-blue-200'>
                                  <div className='h-2 w-10 rounded-full bg-blue-500'></div>
                                </div>
                                <span className='text-sm'>32%</span>
                              </div>
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>HVAC Problems</span>
                              <div className='flex items-center space-x-2'>
                                <div className='h-2 w-16 rounded-full bg-orange-200'>
                                  <div className='h-2 w-8 rounded-full bg-orange-500'></div>
                                </div>
                                <span className='text-sm'>25%</span>
                              </div>
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Electrical Issues</span>
                              <div className='flex items-center space-x-2'>
                                <div className='h-2 w-16 rounded-full bg-yellow-200'>
                                  <div className='h-2 w-6 rounded-full bg-yellow-500'></div>
                                </div>
                                <span className='text-sm'>18%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className='mt-4 border-blue-200 bg-blue-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <TrendingUp className='mt-0.5 h-5 w-5 text-blue-600' />
                          <div>
                            <p className='font-medium text-blue-800'>
                              Pro Tip: Data-Driven Maintenance
                            </p>
                            <p className='text-sm text-blue-700'>
                              Regular analysis of maintenance data can help
                              identify recurring issues, optimize vendor
                              performance, and predict future maintenance needs
                              for better budgeting and planning.
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default TrackingMaintenanceRequestsPage;
