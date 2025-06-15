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
  Bell,
  Settings,
  Mail,
  Phone,
  Clock,
  FileText,
  Shield,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function NotificationSettingsPage() {
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
        <h1 className='mb-2 text-3xl font-bold'>Notification Settings</h1>
        <p className='text-muted-foreground'>
          Configure how you receive notifications and alerts from Syndik to stay
          informed about important events.
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
                    href='#notification-overview'
                    className='text-primary hover:underline'
                  >
                    Notification System Overview
                  </a>
                </li>
                <li>
                  <a
                    href='#global-settings'
                    className='text-primary hover:underline'
                  >
                    Global Notification Settings
                  </a>
                </li>
                <li>
                  <a
                    href='#channel-preferences'
                    className='text-primary hover:underline'
                  >
                    Channel Preferences
                  </a>
                </li>
                <li>
                  <a
                    href='#category-settings'
                    className='text-primary hover:underline'
                  >
                    Notification Categories
                  </a>
                </li>
                <li>
                  <a
                    href='#timing-frequency'
                    className='text-primary hover:underline'
                  >
                    Timing and Frequency
                  </a>
                </li>
                <li>
                  <a
                    href='#emergency-alerts'
                    className='text-primary hover:underline'
                  >
                    Emergency Alert Settings
                  </a>
                </li>
                <li>
                  <a
                    href='#team-notifications'
                    className='text-primary hover:underline'
                  >
                    Team Notification Management
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Notification Overview */}
          <Card id='notification-overview'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Bell className='mr-2 h-5 w-5' />
                Notification System Overview
              </CardTitle>
              <CardDescription>
                Understanding how Syndik&apos;s notification system keeps you
                informed
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Notification Types</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Real-time alerts for urgent matters</li>
                    <li>• Daily summary reports</li>
                    <li>• Weekly activity digests</li>
                    <li>• Monthly performance reports</li>
                    <li>• Custom event notifications</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Delivery Channels</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Email notifications</li>
                    <li>• SMS text messages</li>
                    <li>• In-app notifications</li>
                    <li>• Push notifications (mobile app)</li>
                    <li>• Browser notifications</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Smart Notifications:</strong> Syndik&apos;s
                  notification system learns from your preferences and
                  automatically adjusts delivery timing for optimal
                  effectiveness.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Global Settings */}
          <Card id='global-settings'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Settings className='mr-2 h-5 w-5' />
                Global Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system-wide notification preferences and default
                settings
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Master Controls</h4>
                  <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        1
                      </Badge>
                      <div>
                        <p className='font-medium'>
                          Enable/Disable All Notifications
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          Master switch to turn all notifications on or off
                          (emergency alerts always remain active).
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        2
                      </Badge>
                      <div>
                        <p className='font-medium'>Business Hours</p>
                        <p className='text-muted-foreground text-sm'>
                          Set your business hours to control when non-emergency
                          notifications are delivered.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        3
                      </Badge>
                      <div>
                        <p className='font-medium'>Quiet Hours</p>
                        <p className='text-muted-foreground text-sm'>
                          Define hours when only emergency notifications should
                          be delivered.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        4
                      </Badge>
                      <div>
                        <p className='font-medium'>Time Zone Settings</p>
                        <p className='text-muted-foreground text-sm'>
                          Configure your local time zone for accurate
                          notification timing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Default Preferences</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Primary notification channel selection</li>
                    <li>• Secondary backup channel configuration</li>
                    <li>• Default notification frequency settings</li>
                    <li>• Auto-escalation rules for unacknowledged alerts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Channel Preferences */}
          <Card id='channel-preferences'>
            <CardHeader>
              <CardTitle>Channel Preferences</CardTitle>
              <CardDescription>
                Customize how you receive notifications through different
                communication channels
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Email Notifications</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-2 flex items-center space-x-2'>
                        <Mail className='text-primary h-4 w-4' />
                        <p className='text-sm font-medium'>Email Settings</p>
                      </div>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Primary email address</li>
                        <li>• Backup email addresses</li>
                        <li>• HTML vs. plain text format</li>
                        <li>• Email frequency limits</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='mb-2 text-sm font-medium'>Best For</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Detailed reports and summaries</li>
                        <li>• Non-urgent updates</li>
                        <li>• Document attachments</li>
                        <li>• Formal notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='mb-2 font-medium'>SMS Notifications</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-2 flex items-center space-x-2'>
                        <Phone className='text-primary h-4 w-4' />
                        <p className='text-sm font-medium'>SMS Settings</p>
                      </div>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Primary phone number</li>
                        <li>• Carrier verification</li>
                        <li>• Message length preferences</li>
                        <li>• Cost considerations</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='mb-2 text-sm font-medium'>Best For</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Urgent alerts and emergencies</li>
                        <li>• Quick status updates</li>
                        <li>• Time-sensitive reminders</li>
                        <li>• Mobile accessibility</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='mb-2 font-medium'>In-App Notifications</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-2 flex items-center space-x-2'>
                        <Bell className='text-primary h-4 w-4' />
                        <p className='text-sm font-medium'>App Settings</p>
                      </div>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Desktop notifications</li>
                        <li>• Browser notifications</li>
                        <li>• Sound alerts</li>
                        <li>• Visual indicators</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='mb-2 text-sm font-medium'>Best For</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Real-time system updates</li>
                        <li>• Interactive notifications</li>
                        <li>• Quick acknowledgments</li>
                        <li>• Workflow integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Settings */}
          <Card id='category-settings'>
            <CardHeader>
              <CardTitle>Notification Categories</CardTitle>
              <CardDescription>
                Fine-tune notification preferences for different types of events
                and activities
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='border-l-4 border-red-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-red-700'>
                    Emergency Notifications
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Included Events:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Security breaches</li>
                        <li>• System failures</li>
                        <li>• Emergency maintenance</li>
                        <li>• Safety alerts</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Settings:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Always enabled (cannot be disabled)</li>
                        <li>• Multi-channel delivery</li>
                        <li>• Immediate delivery</li>
                        <li>• Escalation after 5 minutes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-orange-700'>
                    Maintenance Notifications
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Included Events:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Work order updates</li>
                        <li>• Vendor assignments</li>
                        <li>• Completion notifications</li>
                        <li>• Overdue tasks</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Settings:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Configurable frequency</li>
                        <li>• Channel selection available</li>
                        <li>• Business hours delivery</li>
                        <li>• Digest options available</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-blue-700'>
                    Financial Notifications
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Included Events:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Payment receipts</li>
                        <li>• Late payment alerts</li>
                        <li>• Budget notifications</li>
                        <li>• Financial reports</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Settings:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Email preferred</li>
                        <li>• Daily/weekly summaries</li>
                        <li>• Amount thresholds</li>
                        <li>• Approval workflows</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-green-700'>
                    Resident Communications
                  </h4>
                  <div className='grid gap-2 text-sm md:grid-cols-2'>
                    <div>
                      <p className='font-medium'>Included Events:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• New messages</li>
                        <li>• Service requests</li>
                        <li>• Lease activities</li>
                        <li>• Community updates</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium'>Settings:</p>
                      <ul className='text-muted-foreground space-y-1'>
                        <li>• Real-time or batched</li>
                        <li>• Priority level filtering</li>
                        <li>• Auto-response options</li>
                        <li>• Team assignment alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing and Frequency */}
          <Card id='timing-frequency'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Clock className='mr-2 h-5 w-5' />
                Timing and Frequency
              </CardTitle>
              <CardDescription>
                Control when and how often you receive different types of
                notifications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Delivery Timing Options</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Immediate</p>
                      <p className='text-muted-foreground text-xs'>
                        Delivered within seconds of event occurrence
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Batched</p>
                      <p className='text-muted-foreground text-xs'>
                        Grouped with similar notifications every 15-30 minutes
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Scheduled</p>
                      <p className='text-muted-foreground text-xs'>
                        Delivered at specific times of day
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Frequency Controls</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Maximum notifications per hour limit</li>
                    <li>• Duplicate notification suppression</li>
                    <li>• Digest mode for high-volume categories</li>
                    <li>• Weekend and holiday scheduling</li>
                    <li>• Vacation mode for temporary suspension</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Smart Scheduling</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• AI-powered optimal delivery time suggestions</li>
                    <li>• Historical engagement analysis</li>
                    <li>
                      • Timezone-aware scheduling for multi-location teams
                    </li>
                    <li>• Automatic adjustment based on response patterns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Alerts */}
          <Card id='emergency-alerts'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Shield className='mr-2 h-5 w-5' />
                Emergency Alert Settings
              </CardTitle>
              <CardDescription>
                Configure critical alert settings for emergency situations and
                urgent matters
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Emergency Contact Information
                  </h4>
                  <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        1
                      </Badge>
                      <div>
                        <p className='font-medium'>Primary Emergency Contact</p>
                        <p className='text-muted-foreground text-sm'>
                          Main phone number for emergency calls and urgent SMS
                          alerts.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        2
                      </Badge>
                      <div>
                        <p className='font-medium'>Secondary Contacts</p>
                        <p className='text-muted-foreground text-sm'>
                          Backup contacts for escalation if primary contact is
                          unavailable.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        3
                      </Badge>
                      <div>
                        <p className='font-medium'>After-Hours Contacts</p>
                        <p className='text-muted-foreground text-sm'>
                          Special contact information for emergencies outside
                          business hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Escalation Rules</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• 5 minutes: Resend to primary contact</li>
                    <li>• 10 minutes: Alert secondary contact</li>
                    <li>• 15 minutes: Escalate to management</li>
                    <li>• 30 minutes: Activate emergency response team</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Emergency Categories</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-red-700'>
                        Life Safety
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Fire, medical emergencies, security threats
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-orange-700'>
                        Property Emergency
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Major leaks, power outages, system failures
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-yellow-700'>
                        Security Alerts
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Break-ins, suspicious activity, access issues
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-blue-700'>
                        System Critical
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Data breaches, system outages, critical failures
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Notifications */}
          <Card id='team-notifications'>
            <CardHeader>
              <CardTitle>Team Notification Management</CardTitle>
              <CardDescription>
                Configure notification settings for your team members and
                departments
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Role-Based Notifications</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Property Managers</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• All resident communications</li>
                        <li>• Financial alerts above $500</li>
                        <li>• Emergency notifications</li>
                        <li>• Daily activity summaries</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Maintenance Staff</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Work order assignments</li>
                        <li>• Emergency maintenance alerts</li>
                        <li>• Vendor communications</li>
                        <li>• Parts delivery notifications</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Leasing Agents</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• New prospect inquiries</li>
                        <li>• Lease expiration alerts</li>
                        <li>• Move-in/move-out activities</li>
                        <li>• Unit availability changes</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Regional Managers</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Performance summaries</li>
                        <li>• High-priority emergencies</li>
                        <li>• Financial report alerts</li>
                        <li>• Compliance notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Team Distribution Lists</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Create custom distribution groups for different
                      notification types
                    </li>
                    <li>
                      • Set up rotation schedules for on-call responsibilities
                    </li>
                    <li>
                      • Configure backup assignment rules for unavailable team
                      members
                    </li>
                    <li>• Manage cross-departmental notification workflows</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Delegation and Coverage</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Temporary delegation during vacation or sick leave
                    </li>
                    <li>• Automatic failover to backup personnel</li>
                    <li>
                      • Manager override capabilities for critical situations
                    </li>
                    <li>• Team member availability status integration</li>
                  </ul>
                </div>
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
                href='/user-guide/communication/individual-messaging'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Individual Messaging</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Send direct messages to residents and staff
                </p>
              </Link>
              <Link
                href='/user-guide/communication/sending-announcements'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Sending Announcements</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Send mass communications to residents
                </p>
              </Link>
              <Link
                href='/user-guide/communication/email-templates'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Email Templates</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Create and manage email templates
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
                <Link href='/settings/notifications'>
                  <Settings className='mr-2 h-4 w-4' />
                  Manage Settings
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/communication'>
                  <Bell className='mr-2 h-4 w-4' />
                  View Notifications
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
