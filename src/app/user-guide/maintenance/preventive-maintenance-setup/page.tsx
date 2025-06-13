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
  Calendar,
  Settings,
  Clock,
  CheckCircle,
  FileText,
  Bell,
  Repeat,
} from 'lucide-react';
import Link from 'next/link';

export default function PreventiveMaintenanceSetupPage() {
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
        <h1 className='mb-2 text-3xl font-bold'>
          Preventive Maintenance Setup
        </h1>
        <p className='text-muted-foreground'>
          Configure scheduled maintenance tasks to prevent issues and extend
          equipment life in your properties.
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
                    href='#understanding-preventive'
                    className='text-primary hover:underline'
                  >
                    Understanding Preventive Maintenance
                  </a>
                </li>
                <li>
                  <a
                    href='#creating-schedules'
                    className='text-primary hover:underline'
                  >
                    Creating Maintenance Schedules
                  </a>
                </li>
                <li>
                  <a
                    href='#common-tasks'
                    className='text-primary hover:underline'
                  >
                    Common Preventive Tasks
                  </a>
                </li>
                <li>
                  <a
                    href='#scheduling-options'
                    className='text-primary hover:underline'
                  >
                    Scheduling Options and Frequency
                  </a>
                </li>
                <li>
                  <a
                    href='#automated-reminders'
                    className='text-primary hover:underline'
                  >
                    Automated Reminders and Notifications
                  </a>
                </li>
                <li>
                  <a
                    href='#tracking-compliance'
                    className='text-primary hover:underline'
                  >
                    Tracking Compliance
                  </a>
                </li>
                <li>
                  <a
                    href='#seasonal-maintenance'
                    className='text-primary hover:underline'
                  >
                    Seasonal Maintenance Planning
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Understanding Preventive */}
          <Card id='understanding-preventive'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Settings className='mr-2 h-5 w-5' />
                Understanding Preventive Maintenance
              </CardTitle>
              <CardDescription>
                Learn the benefits and importance of proactive maintenance
                strategies
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold text-green-700'>
                    Benefits
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Reduces emergency repair costs</li>
                    <li>• Extends equipment lifespan</li>
                    <li>• Improves resident satisfaction</li>
                    <li>• Maintains property value</li>
                    <li>• Ensures compliance with regulations</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold text-blue-700'>
                    Key Principles
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Regular inspection and service</li>
                    <li>• Scheduled component replacement</li>
                    <li>• Performance monitoring</li>
                    <li>• Documentation and record keeping</li>
                    <li>• Continuous improvement</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Cost Savings:</strong> Studies show that preventive
                  maintenance can reduce overall maintenance costs by 18-25%
                  compared to reactive maintenance approaches.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Creating Schedules */}
          <Card id='creating-schedules'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Calendar className='mr-2 h-5 w-5' />
                Creating Maintenance Schedules
              </CardTitle>
              <CardDescription>
                Step-by-step guide to setting up preventive maintenance
                schedules
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>
                      Navigate to Preventive Maintenance
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      Go to Maintenance &gt; Preventive Maintenance and click
                      &ldquo;Create New Schedule&rdquo;.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Define Task Details</p>
                    <p className='text-muted-foreground text-sm'>
                      Enter task name, description, category, and detailed
                      instructions for the maintenance activity.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Select Properties and Units</p>
                    <p className='text-muted-foreground text-sm'>
                      Choose which properties, buildings, or specific units the
                      schedule applies to.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Set Schedule Frequency</p>
                    <p className='text-muted-foreground text-sm'>
                      Configure how often the task should be performed (monthly,
                      quarterly, annually, etc.).
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    5
                  </Badge>
                  <div>
                    <p className='font-medium'>Assign Resources</p>
                    <p className='text-muted-foreground text-sm'>
                      Assign to specific staff members or vendors and set
                      estimated time requirements.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    6
                  </Badge>
                  <div>
                    <p className='font-medium'>Activate Schedule</p>
                    <p className='text-muted-foreground text-sm'>
                      Review all settings and activate the schedule to begin
                      automatic work order generation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Tasks */}
          <Card id='common-tasks'>
            <CardHeader>
              <CardTitle>Common Preventive Tasks</CardTitle>
              <CardDescription>
                Standard preventive maintenance tasks organized by system and
                frequency
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-blue-700'>
                    HVAC Systems
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Monthly:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Filter inspection and replacement</li>
                        <li>• Thermostat calibration check</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Quarterly:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Coil cleaning and inspection</li>
                        <li>• Belt tension and alignment</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Semi-Annual:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Refrigerant level check</li>
                        <li>• Ductwork inspection</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Annual:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Complete system tune-up</li>
                        <li>• Safety control testing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-green-700'>
                    Plumbing Systems
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Monthly:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Faucet and fixture inspection</li>
                        <li>• Water pressure monitoring</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Quarterly:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Drain cleaning and flow test</li>
                        <li>• Toilet and seal inspection</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Semi-Annual:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Water heater maintenance</li>
                        <li>• Shut-off valve testing</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Annual:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Pipe inspection for leaks</li>
                        <li>• Backflow preventer testing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-orange-700'>
                    Electrical Systems
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Monthly:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• GFCI outlet testing</li>
                        <li>• Emergency lighting check</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Quarterly:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Panel and breaker inspection</li>
                        <li>• Smoke detector testing</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Semi-Annual:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Electrical connections check</li>
                        <li>• Surge protector inspection</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Annual:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Complete electrical inspection</li>
                        <li>• Grounding system testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Options */}
          <Card id='scheduling-options'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Repeat className='mr-2 h-5 w-5' />
                Scheduling Options and Frequency
              </CardTitle>
              <CardDescription>
                Configure flexible scheduling options for different maintenance
                needs
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Frequency Options</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Daily (for critical systems)</li>
                    <li>• Weekly (high-usage equipment)</li>
                    <li>• Monthly (routine inspections)</li>
                    <li>• Quarterly (seasonal tasks)</li>
                    <li>• Semi-annually (major systems)</li>
                    <li>• Annually (comprehensive reviews)</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Advanced Scheduling</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Custom intervals (every X days/weeks)</li>
                    <li>• Usage-based triggers (hours of operation)</li>
                    <li>• Seasonal scheduling (spring/fall only)</li>
                    <li>• Weather-dependent tasks</li>
                    <li>• Occupancy-based scheduling</li>
                    <li>• Equipment age considerations</li>
                  </ul>
                </div>
              </div>
              <div className='space-y-3'>
                <h4 className='font-medium'>Scheduling Best Practices</h4>
                <ul className='text-muted-foreground space-y-1 text-sm'>
                  <li>
                    • Stagger schedules to balance workload throughout the month
                  </li>
                  <li>
                    • Consider seasonal factors (avoid outdoor work in winter)
                  </li>
                  <li>• Group related tasks for efficiency</li>
                  <li>• Build in flexibility for emergency interruptions</li>
                  <li>• Allow adequate time buffers between scheduled tasks</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Automated Reminders */}
          <Card id='automated-reminders'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Bell className='mr-2 h-5 w-5' />
                Automated Reminders and Notifications
              </CardTitle>
              <CardDescription>
                Set up automatic alerts to ensure maintenance tasks are never
                missed
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Notification Types</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3 text-center'>
                      <Bell className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Email Alerts</p>
                      <p className='text-muted-foreground text-xs'>
                        Detailed notifications with task instructions
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Clock className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>SMS Reminders</p>
                      <p className='text-muted-foreground text-xs'>
                        Quick text alerts for urgent tasks
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Calendar className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Calendar Events</p>
                      <p className='text-muted-foreground text-xs'>
                        Automatic calendar appointments
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Reminder Schedule</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• 7 days before due date (preparation notice)</li>
                    <li>• 3 days before due date (final reminder)</li>
                    <li>• Day of scheduled maintenance (execution reminder)</li>
                    <li>• 1 day after due date (overdue alert)</li>
                    <li>• Escalation notifications for extended delays</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Notification Recipients</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Assigned maintenance staff or vendors</li>
                    <li>• Property managers and supervisors</li>
                    <li>• Regional managers for critical tasks</li>
                    <li>• Procurement team for parts ordering</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Compliance */}
          <Card id='tracking-compliance'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <CheckCircle className='mr-2 h-5 w-5' />
                Tracking Compliance
              </CardTitle>
              <CardDescription>
                Monitor completion rates and maintain compliance records
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Compliance Metrics</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Completion Rate</p>
                      <p className='text-muted-foreground text-xs'>
                        Percentage of tasks completed on schedule
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Overdue Tasks</p>
                      <p className='text-muted-foreground text-xs'>
                        Number and age of overdue maintenance items
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Response Time</p>
                      <p className='text-muted-foreground text-xs'>
                        Average time from notification to completion
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Quality Score</p>
                      <p className='text-muted-foreground text-xs'>
                        Assessment of maintenance quality and thoroughness
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Documentation Requirements
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Photo documentation before and after maintenance</li>
                    <li>• Detailed completion reports with findings</li>
                    <li>• Parts replacement records and receipts</li>
                    <li>• Technician signatures and timestamps</li>
                    <li>
                      • Any issues discovered and follow-up actions needed
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Compliance Reporting</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Monthly compliance dashboard for management review
                    </li>
                    <li>• Quarterly performance reports by property</li>
                    <li>• Annual maintenance program effectiveness analysis</li>
                    <li>• Regulatory compliance reports for inspections</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Maintenance */}
          <Card id='seasonal-maintenance'>
            <CardHeader>
              <CardTitle>Seasonal Maintenance Planning</CardTitle>
              <CardDescription>
                Plan and execute seasonal maintenance tasks to prepare
                properties for weather changes
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-green-700'>
                    Spring Preparation
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• HVAC system startup and inspection</li>
                    <li>• Landscaping and irrigation system activation</li>
                    <li>• Exterior cleaning and pressure washing</li>
                    <li>• Pool opening and equipment checks</li>
                    <li>• Window and screen inspection</li>
                  </ul>
                </div>
                <div className='border-l-4 border-yellow-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-yellow-700'>
                    Summer Maintenance
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Peak HVAC system maintenance</li>
                    <li>• Parking lot and driveway maintenance</li>
                    <li>• Exterior painting and repairs</li>
                    <li>• Pest control intensification</li>
                    <li>• Roofing inspection and maintenance</li>
                  </ul>
                </div>
                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-orange-700'>
                    Fall Preparation
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Heating system startup and testing</li>
                    <li>• Gutter cleaning and inspection</li>
                    <li>• Weatherization and sealing</li>
                    <li>• Irrigation system winterization</li>
                    <li>• Outdoor furniture storage</li>
                  </ul>
                </div>
                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-blue-700'>
                    Winter Maintenance
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Snow removal equipment preparation</li>
                    <li>• Pipe freeze prevention measures</li>
                    <li>• Emergency heating system checks</li>
                    <li>• Salt and de-icer inventory</li>
                    <li>• Indoor air quality monitoring</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Planning Tip:</strong> Start seasonal preparation
                  30-45 days before the season change to ensure all tasks are
                  completed before weather conditions become challenging.
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
                href='/user-guide/maintenance/creating-work-orders'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Creating Work Orders</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Learn how to create effective work orders
                </p>
              </Link>
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
                <Link href='/maintenance/preventive/new'>
                  <Calendar className='mr-2 h-4 w-4' />
                  Create Schedule
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/maintenance/preventive'>
                  <Settings className='mr-2 h-4 w-4' />
                  View Schedules
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
