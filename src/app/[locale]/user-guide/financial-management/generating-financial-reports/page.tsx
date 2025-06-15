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
  FileText,
  Calendar,
  TrendingUp,
  Download,
  Filter,
  BarChart3,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function GeneratingFinancialReportsPage() {
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
          Generating Financial Reports
        </h1>
        <p className='text-muted-foreground'>
          Learn how to create and export comprehensive financial reports for
          your properties.
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
                    href='#types-of-reports'
                    className='text-primary hover:underline'
                  >
                    Types of Financial Reports
                  </a>
                </li>
                <li>
                  <a
                    href='#generating-reports'
                    className='text-primary hover:underline'
                  >
                    Generating Reports
                  </a>
                </li>
                <li>
                  <a
                    href='#customizing-reports'
                    className='text-primary hover:underline'
                  >
                    Customizing Report Parameters
                  </a>
                </li>
                <li>
                  <a
                    href='#exporting-reports'
                    className='text-primary hover:underline'
                  >
                    Exporting and Sharing
                  </a>
                </li>
                <li>
                  <a
                    href='#scheduling-reports'
                    className='text-primary hover:underline'
                  >
                    Scheduling Automated Reports
                  </a>
                </li>
                <li>
                  <a
                    href='#troubleshooting'
                    className='text-primary hover:underline'
                  >
                    Troubleshooting
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Types of Reports */}
          <Card id='types-of-reports'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <BarChart3 className='mr-2 h-5 w-5' />
                Types of Financial Reports
              </CardTitle>
              <CardDescription>
                Understand the different financial reports available in Syndik
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Income Statement</h4>
                  <p className='text-muted-foreground text-sm'>
                    Comprehensive overview of rental income, fees, and other
                    revenue streams over a specified period.
                  </p>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Expense Report</h4>
                  <p className='text-muted-foreground text-sm'>
                    Detailed breakdown of all property-related expenses
                    including maintenance, utilities, and management fees.
                  </p>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Cash Flow Statement</h4>
                  <p className='text-muted-foreground text-sm'>
                    Track money flowing in and out of your properties with
                    period-over-period comparisons.
                  </p>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Rent Roll Report</h4>
                  <p className='text-muted-foreground text-sm'>
                    Summary of all units, current rent amounts, lease terms, and
                    occupancy status.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generating Reports */}
          <Card id='generating-reports'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <TrendingUp className='mr-2 h-5 w-5' />
                Generating Reports
              </CardTitle>
              <CardDescription>
                Step-by-step guide to creating financial reports
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Navigate to Reports</p>
                    <p className='text-muted-foreground text-sm'>
                      Go to the Finances section and click on
                      &ldquo;Reports&rdquo; in the navigation menu.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Select Report Type</p>
                    <p className='text-muted-foreground text-sm'>
                      Choose from Income Statement, Expense Report, Cash Flow,
                      or Rent Roll from the available options.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Set Date Range</p>
                    <p className='text-muted-foreground text-sm'>
                      Select the time period for your report using the date
                      picker (monthly, quarterly, or custom range).
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Choose Properties</p>
                    <p className='text-muted-foreground text-sm'>
                      Select specific properties or include all properties in
                      your portfolio.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    5
                  </Badge>
                  <div>
                    <p className='font-medium'>Generate Report</p>
                    <p className='text-muted-foreground text-sm'>
                      Click &ldquo;Generate Report&rdquo; to create your
                      financial report with the specified parameters.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customizing Reports */}
          <Card id='customizing-reports'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Filter className='mr-2 h-5 w-5' />
                Customizing Report Parameters
              </CardTitle>
              <CardDescription>
                Advanced options for tailoring your financial reports
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Filtering Options</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Filter by property type (residential, commercial,
                      mixed-use)
                    </li>
                    <li>• Include or exclude specific expense categories</li>
                    <li>• Filter by payment status (paid, pending, overdue)</li>
                    <li>• Group by property, unit, or resident</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Comparison Features</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Year-over-year comparisons</li>
                    <li>• Month-over-month analysis</li>
                    <li>• Budget vs. actual performance</li>
                    <li>• Property performance benchmarking</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Display Options</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Summary view vs. detailed breakdown</li>
                    <li>• Chart and graph visualizations</li>
                    <li>• Currency formatting preferences</li>
                    <li>• Custom report headers and branding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exporting Reports */}
          <Card id='exporting-reports'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Download className='mr-2 h-5 w-5' />
                Exporting and Sharing
              </CardTitle>
              <CardDescription>
                Save and share your financial reports in various formats
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <h4 className='mb-2 font-medium'>Export Formats</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• PDF for presentation and printing</li>
                    <li>• Excel/CSV for further analysis</li>
                    <li>• HTML for web sharing</li>
                    <li>• JSON for integration with other systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Sharing Options</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Email reports directly to stakeholders</li>
                    <li>• Generate shareable links with access controls</li>
                    <li>• Upload to cloud storage platforms</li>
                    <li>• Print reports with custom formatting</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Tip:</strong> Use PDF format for official documents
                  and Excel format when you need to perform additional
                  calculations or analysis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Reports */}
          <Card id='scheduling-reports'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Calendar className='mr-2 h-5 w-5' />
                Scheduling Automated Reports
              </CardTitle>
              <CardDescription>
                Set up recurring financial reports for regular delivery
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Create Report Template</p>
                    <p className='text-muted-foreground text-sm'>
                      Set up your report with the desired parameters and
                      filters.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Set Schedule</p>
                    <p className='text-muted-foreground text-sm'>
                      Choose frequency: daily, weekly, monthly, quarterly, or
                      custom intervals.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Configure Recipients</p>
                    <p className='text-muted-foreground text-sm'>
                      Add email addresses of stakeholders who should receive the
                      automated reports.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Activate Schedule</p>
                    <p className='text-muted-foreground text-sm'>
                      Save and activate your scheduled report to begin automatic
                      generation and delivery.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card id='troubleshooting'>
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
              <CardDescription>
                Common issues and solutions when generating financial reports
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Report shows incomplete data
                  </h4>
                  <p className='text-muted-foreground text-sm'>
                    Ensure all transactions are properly recorded and
                    categorized. Check that the date range includes all relevant
                    periods.
                  </p>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Export fails or takes too long
                  </h4>
                  <p className='text-muted-foreground text-sm'>
                    Try reducing the date range or number of properties
                    included. Large datasets may require breaking into smaller
                    reports.
                  </p>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Numbers don&apos;t match expectations
                  </h4>
                  <p className='text-muted-foreground text-sm'>
                    Verify that all income and expense categories are correctly
                    assigned. Review any pending or unprocessed transactions.
                  </p>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Scheduled reports not being sent
                  </h4>
                  <p className='text-muted-foreground text-sm'>
                    Check email addresses are correct and verify that automated
                    emails aren&apos;t being blocked by spam filters.
                  </p>
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
                href='/user-guide/financial-management/late-payment-management'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Late Payment Management</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Manage overdue payments and collections
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
                <Link href='/finances/reports'>
                  <FileText className='mr-2 h-4 w-4' />
                  Generate Report
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/finances'>
                  <TrendingUp className='mr-2 h-4 w-4' />
                  View Finances
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
