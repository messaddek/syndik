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
  Users,
  Plus,
  Star,
  FileText,
  Phone,
  Shield,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function VendorManagementPage() {
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
        <h1 className='mb-2 text-3xl font-bold'>Vendor Management</h1>
        <p className='text-muted-foreground'>
          Build and manage your network of trusted maintenance vendors and
          contractors in Syndik.
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
                    href='#adding-vendors'
                    className='text-primary hover:underline'
                  >
                    Adding New Vendors
                  </a>
                </li>
                <li>
                  <a
                    href='#vendor-profiles'
                    className='text-primary hover:underline'
                  >
                    Vendor Profiles and Information
                  </a>
                </li>
                <li>
                  <a
                    href='#credentials-insurance'
                    className='text-primary hover:underline'
                  >
                    Managing Credentials and Insurance
                  </a>
                </li>
                <li>
                  <a
                    href='#vendor-categories'
                    className='text-primary hover:underline'
                  >
                    Vendor Categories and Specialties
                  </a>
                </li>
                <li>
                  <a
                    href='#performance-tracking'
                    className='text-primary hover:underline'
                  >
                    Performance Tracking and Ratings
                  </a>
                </li>
                <li>
                  <a
                    href='#preferred-vendors'
                    className='text-primary hover:underline'
                  >
                    Preferred Vendor Programs
                  </a>
                </li>
                <li>
                  <a
                    href='#communication'
                    className='text-primary hover:underline'
                  >
                    Vendor Communication
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Adding Vendors */}
          <Card id='adding-vendors'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Plus className='h-5 w-5' />
                Adding New Vendors
              </CardTitle>
              <CardDescription>
                Step-by-step process for onboarding new vendors to your network
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Navigate to Vendor Management</p>
                    <p className='text-muted-foreground text-sm'>
                      Go to the Maintenance section and select
                      &ldquo;Vendors&rdquo; from the menu, then click &ldquo;Add
                      New Vendor&rdquo;.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Basic Information</p>
                    <p className='text-muted-foreground text-sm'>
                      Enter company name, contact person, address, phone number,
                      email, and website information.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Service Categories</p>
                    <p className='text-muted-foreground text-sm'>
                      Select the types of services the vendor provides
                      (plumbing, electrical, HVAC, etc.).
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Upload Documentation</p>
                    <p className='text-muted-foreground text-sm'>
                      Add licenses, insurance certificates, certifications, and
                      any required compliance documents.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    5
                  </Badge>
                  <div>
                    <p className='font-medium'>Set Rates and Terms</p>
                    <p className='text-muted-foreground text-sm'>
                      Configure hourly rates, minimum charges, emergency rates,
                      and payment terms.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Profiles */}
          <Card id='vendor-profiles'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Users className='mr-2 h-5 w-5' />
                Vendor Profiles and Information
              </CardTitle>
              <CardDescription>
                Comprehensive vendor profile management for easy access to
                important information
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Contact Information</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Primary and emergency contact numbers</li>
                    <li>• Email addresses for different departments</li>
                    <li>• Physical business address</li>
                    <li>• Service area coverage map</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Business Details</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Company registration and tax ID</li>
                    <li>• Years in business and experience level</li>
                    <li>• Number of employees and capacity</li>
                    <li>• Operating hours and availability</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Service Capabilities</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Detailed service categories and specialties</li>
                    <li>• Equipment and tools available</li>
                    <li>• Emergency service availability</li>
                    <li>• Capacity for large projects</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Notes and History</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Internal notes and observations</li>
                    <li>• Work history and completed projects</li>
                    <li>• Performance reviews and feedback</li>
                    <li>• Special instructions or preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credentials and Insurance */}
          <Card id='credentials-insurance'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Shield className='mr-2 h-5 w-5' />
                Managing Credentials and Insurance
              </CardTitle>
              <CardDescription>
                Track and maintain vendor licensing, certifications, and
                insurance coverage
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Required Documentation</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Business License</p>
                      <p className='text-muted-foreground text-xs'>
                        Current business operating license
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Trade Licenses</p>
                      <p className='text-muted-foreground text-xs'>
                        Specialized trade certifications
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>General Liability</p>
                      <p className='text-muted-foreground text-xs'>
                        Minimum $1M coverage recommended
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>
                        Workers&apos; Compensation
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Required for vendors with employees
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Automated Tracking</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Set up expiration date alerts for licenses and insurance
                    </li>
                    <li>
                      • Automatic email reminders 30, 60, and 90 days before
                      expiration
                    </li>
                    <li>• Document upload requirements for renewals</li>
                    <li>• Compliance status dashboard for quick overview</li>
                    <li>
                      • Automatic vendor suspension for expired critical
                      documents
                    </li>
                  </ul>
                </div>
                <div className='bg-muted rounded-lg p-4'>
                  <p className='text-sm'>
                    <strong>Compliance Tip:</strong> Regularly review local
                    licensing requirements as they can change, and ensure all
                    vendors meet current standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Categories */}
          <Card id='vendor-categories'>
            <CardHeader>
              <CardTitle>Vendor Categories and Specialties</CardTitle>
              <CardDescription>
                Organize vendors by service types for efficient work order
                assignment
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Plumbing Services</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Repair and maintenance</li>
                    <li>• Emergency services</li>
                    <li>• Installation and replacement</li>
                    <li>• Drain cleaning</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Electrical Services</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Wiring and outlets</li>
                    <li>• Lighting installation</li>
                    <li>• Panel upgrades</li>
                    <li>• Emergency electrical</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>HVAC Services</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• System maintenance</li>
                    <li>• Repair and replacement</li>
                    <li>• Filter replacement</li>
                    <li>• Duct cleaning</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>General Maintenance</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Handyman services</li>
                    <li>• Appliance repair</li>
                    <li>• Painting and drywall</li>
                    <li>• Flooring</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Landscaping</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Lawn care</li>
                    <li>• Tree and shrub care</li>
                    <li>• Snow removal</li>
                    <li>• Irrigation systems</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Cleaning Services</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Move-out cleaning</li>
                    <li>• Deep cleaning</li>
                    <li>• Carpet cleaning</li>
                    <li>• Window cleaning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tracking */}
          <Card id='performance-tracking'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Star className='mr-2 h-5 w-5' />
                Performance Tracking and Ratings
              </CardTitle>
              <CardDescription>
                Monitor vendor performance and maintain quality standards
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Performance Metrics</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Response Time</p>
                      <p className='text-muted-foreground text-xs'>
                        Average time to respond to work orders
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Completion Rate</p>
                      <p className='text-muted-foreground text-xs'>
                        Percentage of work orders completed on time
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Quality Rating</p>
                      <p className='text-muted-foreground text-xs'>
                        Average quality score from inspections
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Cost Efficiency</p>
                      <p className='text-muted-foreground text-xs'>
                        Comparison of costs to market rates
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Rating System</h4>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex text-yellow-400'>
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                      </div>
                      <span className='text-sm'>
                        Excellent (4.5-5.0) - Top performer
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div className='flex text-yellow-400'>
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4' />
                      </div>
                      <span className='text-sm'>
                        Good (3.5-4.4) - Reliable service
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div className='flex text-yellow-400'>
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4 fill-current' />
                        <Star className='h-4 w-4' />
                        <Star className='h-4 w-4' />
                      </div>
                      <span className='text-sm'>
                        Average (2.5-3.4) - Needs improvement
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Feedback Collection</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Automatic surveys sent after work completion</li>
                    <li>• Property manager quality assessments</li>
                    <li>• Resident satisfaction feedback</li>
                    <li>• Internal team performance reviews</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferred Vendors */}
          <Card id='preferred-vendors'>
            <CardHeader>
              <CardTitle>Preferred Vendor Programs</CardTitle>
              <CardDescription>
                Establish preferred vendor relationships for consistent quality
                and pricing
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Preferred Vendor Benefits
                  </h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Priority Assignment</p>
                      <p className='text-muted-foreground text-xs'>
                        First consideration for new work orders
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Volume Discounts</p>
                      <p className='text-muted-foreground text-xs'>
                        Negotiated rates for bulk work
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Extended Terms</p>
                      <p className='text-muted-foreground text-xs'>
                        Longer payment terms and credit limits
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>
                        Exclusive Opportunities
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Access to large projects and expansions
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Qualification Criteria</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Minimum performance rating of 4.0 stars</li>
                    <li>• Consistent on-time completion rate above 90%</li>
                    <li>• Valid licenses and insurance with no lapses</li>
                    <li>• Competitive pricing within market range</li>
                    <li>• Positive long-term relationship history</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Contract Management</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Annual service agreements with preferred terms</li>
                    <li>• Pre-negotiated rates for common services</li>
                    <li>
                      • Performance guarantees and service level agreements
                    </li>
                    <li>• Regular quarterly business reviews</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication */}
          <Card id='communication'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Phone className='mr-2 h-5 w-5' />
                Vendor Communication
              </CardTitle>
              <CardDescription>
                Effective communication strategies for vendor relationships
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Communication Channels</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3 text-center'>
                      <Phone className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Phone & SMS</p>
                      <p className='text-muted-foreground text-xs'>
                        Emergency and urgent communications
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <FileText className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Email</p>
                      <p className='text-muted-foreground text-xs'>
                        Work orders and documentation
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Users className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Portal Access</p>
                      <p className='text-muted-foreground text-xs'>
                        Self-service vendor portal
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Regular Communications</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Monthly performance review meetings</li>
                    <li>• Quarterly business review sessions</li>
                    <li>• Annual vendor appreciation events</li>
                    <li>• Training sessions on new procedures or systems</li>
                    <li>• Regular updates on property portfolio changes</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Documentation Standards</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• All work order communications logged in system</li>
                    <li>• Photo documentation requirements</li>
                    <li>• Standardized reporting formats</li>
                    <li>• Digital signature requirements for completion</li>
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
                  href='/maintenance/vendors/new'
                  className='flex items-center gap-2'
                >
                  <Plus className='h-4 w-4' />
                  Add Vendor
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/maintenance/vendors'>
                  <Users className='mr-2 h-4 w-4' />
                  View Vendors
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
