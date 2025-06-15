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
  AlertTriangle,
  Clock,
  Mail,
  DollarSign,
  FileText,
  Phone,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function LatePaymentManagementPage() {
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
        <h1 className='mb-2 text-3xl font-bold'>Late Payment Management</h1>
        <p className='text-muted-foreground'>
          Effectively manage overdue payments and implement collection
          strategies to maintain cash flow.
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
                    href='#identifying-late-payments'
                    className='text-primary hover:underline'
                  >
                    Identifying Late Payments
                  </a>
                </li>
                <li>
                  <a
                    href='#automated-reminders'
                    className='text-primary hover:underline'
                  >
                    Setting Up Automated Reminders
                  </a>
                </li>
                <li>
                  <a href='#late-fees' className='text-primary hover:underline'>
                    Managing Late Fees
                  </a>
                </li>
                <li>
                  <a
                    href='#collection-workflow'
                    className='text-primary hover:underline'
                  >
                    Collection Workflow
                  </a>
                </li>
                <li>
                  <a
                    href='#payment-plans'
                    className='text-primary hover:underline'
                  >
                    Setting Up Payment Plans
                  </a>
                </li>
                <li>
                  <a
                    href='#escalation-procedures'
                    className='text-primary hover:underline'
                  >
                    Escalation Procedures
                  </a>
                </li>
                <li>
                  <a href='#reporting' className='text-primary hover:underline'>
                    Late Payment Reporting
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Identifying Late Payments */}
          <Card id='identifying-late-payments'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <AlertTriangle className='mr-2 h-5 w-5' />
                Identifying Late Payments
              </CardTitle>
              <CardDescription>
                Learn how to monitor and identify overdue payments in your
                portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Dashboard Overview</p>
                    <p className='text-muted-foreground text-sm'>
                      The main dashboard displays late payment alerts with red
                      indicators for overdue accounts.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Payment Status Filters</p>
                    <p className='text-muted-foreground text-sm'>
                      Use the payment status filter to view only overdue
                      payments, sorted by days past due.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Automated Notifications</p>
                    <p className='text-muted-foreground text-sm'>
                      Receive daily email summaries of all accounts that have
                      become overdue in the past 24 hours.
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Grace Period:</strong> Configure grace periods
                  (typically 3-5 days) before marking payments as officially
                  late to account for processing delays.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Automated Reminders */}
          <Card id='automated-reminders'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Mail className='mr-2 h-5 w-5' />
                Setting Up Automated Reminders
              </CardTitle>
              <CardDescription>
                Configure automatic reminder systems to reduce late payments
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Pre-Due Reminders</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• 5 days before due date</li>
                    <li>• 2 days before due date</li>
                    <li>• Day before due date</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Overdue Reminders</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• 3 days after due date</li>
                    <li>• 7 days after due date</li>
                    <li>• 14 days after due date</li>
                    <li>• 30 days after due date</li>
                  </ul>
                </div>
              </div>
              <div className='space-y-3'>
                <h4 className='font-medium'>Reminder Channels</h4>
                <div className='grid gap-3 md:grid-cols-3'>
                  <div className='rounded-lg border p-3 text-center'>
                    <Mail className='text-primary mx-auto mb-2 h-6 w-6' />
                    <p className='text-sm font-medium'>Email</p>
                    <p className='text-muted-foreground text-xs'>
                      Automated email reminders
                    </p>
                  </div>
                  <div className='rounded-lg border p-3 text-center'>
                    <Phone className='text-primary mx-auto mb-2 h-6 w-6' />
                    <p className='text-sm font-medium'>SMS</p>
                    <p className='text-muted-foreground text-xs'>
                      Text message alerts
                    </p>
                  </div>
                  <div className='rounded-lg border p-3 text-center'>
                    <AlertTriangle className='text-primary mx-auto mb-2 h-6 w-6' />
                    <p className='text-sm font-medium'>Portal</p>
                    <p className='text-muted-foreground text-xs'>
                      In-app notifications
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Late Fees */}
          <Card id='late-fees'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <DollarSign className='mr-2 h-5 w-5' />
                Managing Late Fees
              </CardTitle>
              <CardDescription>
                Configure and apply late fees according to your lease agreements
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Late Fee Configuration</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Flat Fee</p>
                      <p className='text-muted-foreground text-xs'>
                        Fixed amount (e.g., $50) regardless of rent amount
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Percentage Fee</p>
                      <p className='text-muted-foreground text-xs'>
                        Percentage of monthly rent (e.g., 5%)
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Daily Fee</p>
                      <p className='text-muted-foreground text-xs'>
                        Daily charges after grace period (e.g., $5/day)
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Tiered Fees</p>
                      <p className='text-muted-foreground text-xs'>
                        Increasing fees based on days overdue
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Automatic Application</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Set up automatic late fee application after grace period
                    </li>
                    <li>
                      • Configure maximum late fee amounts per lease terms
                    </li>
                    <li>• Enable manual override for special circumstances</li>
                    <li>
                      • Generate itemized invoices showing late fees separately
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collection Workflow */}
          <Card id='collection-workflow'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Clock className='mr-2 h-5 w-5' />
                Collection Workflow
              </CardTitle>
              <CardDescription>
                Structured approach to collecting overdue payments
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='border-l-4 border-yellow-500 pl-4'>
                  <h4 className='font-semibold text-yellow-700'>
                    Days 1-7: Gentle Reminders
                  </h4>
                  <ul className='text-muted-foreground mt-2 space-y-1 text-sm'>
                    <li>• Send friendly reminder emails</li>
                    <li>• Make courtesy phone calls</li>
                    <li>• Offer assistance with payment portal issues</li>
                  </ul>
                </div>
                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='font-semibold text-orange-700'>
                    Days 8-14: Formal Notice
                  </h4>
                  <ul className='text-muted-foreground mt-2 space-y-1 text-sm'>
                    <li>• Send formal late payment notice</li>
                    <li>• Apply late fees as per lease agreement</li>
                    <li>• Document all communication attempts</li>
                  </ul>
                </div>
                <div className='border-l-4 border-red-500 pl-4'>
                  <h4 className='font-semibold text-red-700'>
                    Days 15-30: Escalation
                  </h4>
                  <ul className='text-muted-foreground mt-2 space-y-1 text-sm'>
                    <li>• Send demand for payment letter</li>
                    <li>• Consider payment plan options</li>
                    <li>• Prepare for potential legal action</li>
                  </ul>
                </div>
                <div className='border-l-4 border-gray-500 pl-4'>
                  <h4 className='font-semibold text-gray-700'>
                    Days 30+: Legal Action
                  </h4>
                  <ul className='text-muted-foreground mt-2 space-y-1 text-sm'>
                    <li>• Consult with legal counsel</li>
                    <li>• Begin eviction proceedings if necessary</li>
                    <li>• Consider collection agency referral</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Plans */}
          <Card id='payment-plans'>
            <CardHeader>
              <CardTitle>Setting Up Payment Plans</CardTitle>
              <CardDescription>
                Create flexible payment arrangements for residents experiencing
                financial difficulties
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Assess Financial Situation</p>
                    <p className='text-muted-foreground text-sm'>
                      Review resident&apos;s payment history and current
                      circumstances to determine appropriate plan terms.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Create Payment Schedule</p>
                    <p className='text-muted-foreground text-sm'>
                      Set up a realistic payment schedule that works for both
                      parties, typically splitting overdue amount over 2-6
                      months.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Document Agreement</p>
                    <p className='text-muted-foreground text-sm'>
                      Create written payment plan agreement with clear terms,
                      consequences, and signatures from both parties.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Monitor Compliance</p>
                    <p className='text-muted-foreground text-sm'>
                      Track payment plan adherence and be prepared to take
                      action if terms are not met.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Escalation Procedures */}
          <Card id='escalation-procedures'>
            <CardHeader>
              <CardTitle>Escalation Procedures</CardTitle>
              <CardDescription>
                When and how to escalate collection efforts for maximum
                effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Internal Escalation</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Property manager to senior management review</li>
                    <li>• Legal department consultation for complex cases</li>
                    <li>• Corporate policy compliance verification</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>External Resources</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Collection agency partnerships for accounts 60+ days
                      overdue
                    </li>
                    <li>• Legal counsel for eviction proceedings</li>
                    <li>
                      • Credit reporting agencies for serious delinquencies
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Documentation Requirements
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Complete payment history and communication log</li>
                    <li>• Copies of all notices and correspondence</li>
                    <li>• Lease agreement terms and violation documentation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card id='reporting'>
            <CardHeader>
              <CardTitle>Late Payment Reporting</CardTitle>
              <CardDescription>
                Track and analyze late payment trends to improve collection
                strategies
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <h4 className='mb-2 font-medium'>Key Metrics</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Late payment rate by property/unit</li>
                    <li>• Average days to collection</li>
                    <li>• Collection success rate by method</li>
                    <li>• Late fee collection percentage</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Report Types</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Daily overdue accounts summary</li>
                    <li>• Monthly collection performance</li>
                    <li>• Trend analysis reports</li>
                    <li>• Resident payment history</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Best Practice:</strong> Review late payment reports
                  monthly to identify patterns and adjust collection strategies
                  accordingly.
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
                href='/user-guide/financial-management/setting-up-rent-collection'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>
                  Setting Up Rent Collection
                </h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Configure automated rent collection systems
                </p>
              </Link>
              <Link
                href='/user-guide/financial-management/processing-payments'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Processing Payments</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Handle incoming payments and reconciliation
                </p>
              </Link>
              <Link
                href='/user-guide/financial-management/generating-financial-reports'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>
                  Generating Financial Reports
                </h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Create comprehensive financial reports
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
                <Link href='/finances/overdue'>
                  <AlertTriangle className='mr-2 h-4 w-4' />
                  View Overdue
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/finances'>
                  <DollarSign className='mr-2 h-4 w-4' />
                  Manage Finances
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
