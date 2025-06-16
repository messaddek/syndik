import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Wrench,
  Plus,
  Camera,
  User,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CreatingWorkOrdersPage() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <div className='mb-6'>
        <Link
          href='/user-guide'
          className='text-muted-foreground hover:text-primary mb-4 inline-flex items-center text-sm'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to User Guide
        </Link>
        <h1 className='mb-2 text-3xl font-bold'>Creating Work Orders</h1>
        <p className='text-muted-foreground'>
          Learn how to create, assign, and manage maintenance work orders
          effectively in Syndik.
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-4'>
        <div className='space-y-6 lg:col-span-3'>
          {/* Table of Contents */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <FileText className='mr-2 h-5 w-5' />
                Table of Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#creating-work-orders'
                    className='text-primary hover:underline'
                  >
                    Creating Work Orders
                  </a>
                </li>
                <li>
                  <a
                    href='#work-order-types'
                    className='text-primary hover:underline'
                  >
                    Work Order Types and Categories
                  </a>
                </li>
                <li>
                  <a
                    href='#assigning-work-orders'
                    className='text-primary hover:underline'
                  >
                    Assigning Work Orders
                  </a>
                </li>
                <li>
                  <a
                    href='#priority-levels'
                    className='text-primary hover:underline'
                  >
                    Setting Priority Levels
                  </a>
                </li>
                <li>
                  <a
                    href='#documentation'
                    className='text-primary hover:underline'
                  >
                    Documentation and Photos
                  </a>
                </li>
                <li>
                  <a
                    href='#tracking-progress'
                    className='text-primary hover:underline'
                  >
                    Tracking Progress
                  </a>
                </li>
                <li>
                  <a
                    href='#completion-process'
                    className='text-primary hover:underline'
                  >
                    Completion Process
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Creating Work Orders */}
          <Card id='creating-work-orders'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Plus className='h-5 w-5' />
                Creating Work Orders
              </CardTitle>
              <CardDescription>
                Step-by-step guide to creating comprehensive work orders
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Navigate to Maintenance</p>
                    <p className='text-muted-foreground text-sm'>
                      Go to the Maintenance section and click &ldquo;Create Work
                      Order&rdquo; or use the quick action button.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Select Property and Unit</p>
                    <p className='text-muted-foreground text-sm'>
                      Choose the specific property and unit where the
                      maintenance work is needed.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Add Work Order Details</p>
                    <p className='text-muted-foreground text-sm'>
                      Provide a clear title, detailed description, and select
                      the appropriate category and priority level.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Attach Documentation</p>
                    <p className='text-muted-foreground text-sm'>
                      Upload photos, documents, or other relevant files to
                      support the work order.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    5
                  </Badge>
                  <div>
                    <p className='font-medium'>Assign and Schedule</p>
                    <p className='text-muted-foreground text-sm'>
                      Assign to a vendor or internal staff member and set target
                      completion dates.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Order Types */}
          <Card id='work-order-types'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Wrench className='mr-2 h-5 w-5' />
                Work Order Types and Categories
              </CardTitle>
              <CardDescription>
                Understanding different types of maintenance work orders
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Emergency Repairs</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Plumbing leaks or water damage</li>
                    <li>• Electrical hazards or outages</li>
                    <li>• Heating/cooling system failures</li>
                    <li>• Security or safety issues</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Routine Maintenance</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• HVAC filter replacements</li>
                    <li>• Regular inspections</li>
                    <li>• Landscaping and grounds care</li>
                    <li>• Preventive maintenance tasks</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Tenant Requests</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Minor repairs and fixes</li>
                    <li>• Appliance issues</li>
                    <li>• Cosmetic improvements</li>
                    <li>• Accessibility modifications</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Capital Improvements</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Unit renovations</li>
                    <li>• Building upgrades</li>
                    <li>• Equipment replacements</li>
                    <li>• Technology installations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assigning Work Orders */}
          <Card id='assigning-work-orders'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <User className='mr-2 h-5 w-5' />
                Assigning Work Orders
              </CardTitle>
              <CardDescription>
                Best practices for assigning work orders to the right personnel
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Assignment Options</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3 text-center'>
                      <User className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Internal Staff</p>
                      <p className='text-muted-foreground text-xs'>
                        Maintenance team members
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Wrench className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Vendors</p>
                      <p className='text-muted-foreground text-xs'>
                        External contractors
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <CheckCircle className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Auto-Assign</p>
                      <p className='text-muted-foreground text-xs'>
                        Based on availability and skills
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Assignment Criteria</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Match skills and certifications to work requirements
                    </li>
                    <li>• Consider current workload and availability</li>
                    <li>• Factor in location and travel time</li>
                    <li>
                      • Review vendor contracts and preferred provider
                      agreements
                    </li>
                    <li>• Consider cost estimates and budget constraints</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Notification Process</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Automatic email and SMS notifications to assigned
                      personnel
                    </li>
                    <li>• Mobile app push notifications for urgent items</li>
                    <li>• Calendar integration for scheduled appointments</li>
                    <li>
                      • Escalation alerts if not acknowledged within set
                      timeframe
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Levels */}
          <Card id='priority-levels'>
            <CardHeader>
              <CardTitle>Setting Priority Levels</CardTitle>
              <CardDescription>
                Establish clear priority guidelines for efficient work order
                management
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='border-l-4 border-red-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-red-700'>
                    Emergency (Response: Immediate)
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Life safety issues or security breaches</li>
                    <li>• Major water leaks or flooding</li>
                    <li>• Complete loss of heating/cooling</li>
                    <li>• Electrical hazards or power outages</li>
                  </ul>
                </div>
                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-orange-700'>
                    Urgent (Response: 24 hours)
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Partial heating/cooling issues</li>
                    <li>• Minor plumbing problems</li>
                    <li>• Appliance malfunctions affecting daily life</li>
                    <li>• Security system issues</li>
                  </ul>
                </div>
                <div className='border-l-4 border-yellow-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-yellow-700'>
                    Normal (Response: 3-5 days)
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Routine repairs and maintenance</li>
                    <li>• Cosmetic issues</li>
                    <li>• Non-essential system maintenance</li>
                    <li>• General upkeep tasks</li>
                  </ul>
                </div>
                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-green-700'>
                    Low (Response: 1-2 weeks)
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Preventive maintenance</li>
                    <li>• Minor aesthetic improvements</li>
                    <li>• Scheduled inspections</li>
                    <li>• Long-term planning items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card id='documentation'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Camera className='mr-2 h-5 w-5' />
                Documentation and Photos
              </CardTitle>
              <CardDescription>
                Proper documentation practices for work orders
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Photo Documentation</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Take before photos showing the issue or area requiring
                      work
                    </li>
                    <li>• Capture multiple angles and close-up details</li>
                    <li>• Include photos of any damage or wear patterns</li>
                    <li>• Document surrounding areas for context</li>
                    <li>• Take after photos upon completion</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Written Documentation</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Provide detailed problem descriptions</li>
                    <li>• Include relevant model numbers and specifications</li>
                    <li>• Note any tenant concerns or special instructions</li>
                    <li>• Document access requirements and restrictions</li>
                    <li>• Record any warranty information</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Supporting Documents</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Upload receipts and invoices</li>
                    <li>• Attach vendor estimates or proposals</li>
                    <li>• Include warranty documents</li>
                    <li>• Add inspection reports or certificates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Progress */}
          <Card id='tracking-progress'>
            <CardHeader>
              <CardTitle>Tracking Progress</CardTitle>
              <CardDescription>
                Monitor work order status and ensure timely completion
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Status Tracking</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-blue-700'>Open</p>
                      <p className='text-muted-foreground text-xs'>
                        Work order created, awaiting assignment
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-yellow-700'>
                        Assigned
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Assigned to vendor/staff, scheduled
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-orange-700'>
                        In Progress
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Work has begun on-site
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-green-700'>
                        Completed
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Work finished, awaiting approval
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Progress Updates</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Real-time status updates from assigned personnel</li>
                    <li>• Photo updates showing progress milestones</li>
                    <li>• Time tracking for labor hours and costs</li>
                    <li>• Parts and materials usage logging</li>
                    <li>• Delay notifications with explanations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completion Process */}
          <Card id='completion-process'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <CheckCircle className='mr-2 h-5 w-5' />
                Completion Process
              </CardTitle>
              <CardDescription>
                Final steps for closing work orders and quality assurance
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Final Documentation</p>
                    <p className='text-muted-foreground text-sm'>
                      Vendor/staff uploads completion photos, final reports, and
                      any relevant receipts or warranties.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Quality Inspection</p>
                    <p className='text-muted-foreground text-sm'>
                      Property manager or designated staff performs quality
                      check and inspection of completed work.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Tenant Notification</p>
                    <p className='text-muted-foreground text-sm'>
                      Notify residents of completed work and any follow-up
                      instructions or warranty information.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Close Work Order</p>
                    <p className='text-muted-foreground text-sm'>
                      Mark work order as completed, update maintenance logs, and
                      process any final payments.
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Quality Assurance:</strong> Always perform a final
                  walkthrough and obtain tenant satisfaction feedback before
                  officially closing work orders.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Related Articles</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Link
                href='/user-guide/maintenance/tracking-maintenance-requests'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>
                  Tracking Maintenance Requests
                </h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Monitor and manage maintenance requests
                </p>
              </Link>
              <Link
                href='/user-guide/maintenance/vendor-management'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Vendor Management</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Manage your network of maintenance vendors
                </p>
              </Link>
              <Link
                href='/user-guide/maintenance/preventive-maintenance-setup'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>
                  Preventive Maintenance Setup
                </h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Schedule preventive maintenance tasks
                </p>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link
                  href='/maintenance/work-orders/new'
                  className='flex items-center space-x-2'
                >
                  <Plus className='h-4 w-4' />
                  Create Work Order
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/maintenance'>
                  <Wrench className='mr-2 h-4 w-4' />
                  View Maintenance
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
