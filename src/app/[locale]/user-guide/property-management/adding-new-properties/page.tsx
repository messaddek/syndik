import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import { ArticleSidebar } from '@/components/articles/article-sidebar';
import {
  ArrowLeft,
  Building2,
  MapPin,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  Plus,
  Upload,
} from 'lucide-react';

const AddingNewPropertiesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'preparation', title: 'Before You Start', level: 1 },
    { id: 'basic-info', title: 'Adding Basic Information', level: 1 },
    { id: 'property-details', title: 'Property Details', level: 1 },
    { id: 'units-setup', title: 'Setting Up Units', level: 1 },
    { id: 'documents', title: 'Uploading Documents', level: 1 },
    { id: 'verification', title: 'Review & Verification', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Unit Management & Organization',
      href: '/user-guide/property-management/unit-management-organization',
      time: '6 min',
    },
    {
      title: 'Property Information Updates',
      href: '/user-guide/property-management/property-information-updates',
      time: '3 min',
    },
    {
      title: 'Document Management System',
      href: '/user-guide/property-management/document-management-system',
      time: '8 min',
    },
  ];
  return (
    <ArticleLayout
      articleSlug='adding-new-properties'
      title='Adding New Properties'
    >
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
            Property Management
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900'>Adding New Properties</span>
        </div>
      </nav>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='rounded-lg border bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <div className='rounded-lg bg-emerald-500 p-2'>
                  <Building2 className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    Adding New Properties
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>Property Management</Badge>
                    <Badge variant='outline'>Popular</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>4 min read</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-lg text-gray-600'>
                Learn how to add new properties to your Syndik portfolio with
                proper configuration, unit setup, and document management for
                efficient property operations.
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
                  Adding a new property to Syndik involves several key steps to
                  ensure all information is properly configured and your
                  property is ready for resident management, maintenance
                  operations, and financial tracking.
                </p>

                <Card className='border-blue-200 bg-blue-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertTriangle className='text-primary mt-0.5 h-5 w-5' />
                      <div>
                        <p className='font-medium text-blue-800'>
                          Important Note
                        </p>
                        <p className='mt-1 text-sm text-blue-700'>
                          Gather all property information and legal documents
                          before starting the setup process to ensure smooth
                          completion.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Preparation */}
              <section id='preparation'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Before You Start
                </h2>
                <p className='mb-4 text-gray-700'>
                  Prepare the following information and documents before adding
                  your property:
                </p>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2'>
                        <FileText className='h-5 w-5 text-blue-500' />
                        <span>Required Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-700'>
                        <li>• Property name and address</li>
                        <li>• Legal property description</li>
                        <li>• Property type and classification</li>
                        <li>• Number of units and layout</li>
                        <li>• Amenities and features</li>
                        <li>• Utility information</li>
                        <li>• Property manager contact details</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2'>
                        <Upload className='h-5 w-5 text-green-500' />
                        <span>Required Documents</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2 text-sm text-gray-700'>
                        <li>• Property deed or ownership documents</li>
                        <li>• Floor plans and layouts</li>
                        <li>• Property photos (exterior/interior)</li>
                        <li>• Insurance certificates</li>
                        <li>• Utility service agreements</li>
                        <li>• Property inspection reports</li>
                        <li>• Local permits and licenses</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Basic Info */}
              <section id='basic-info'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Adding Basic Information
                </h2>
                <p className='mb-4 text-gray-700'>
                  Start by entering the fundamental property information:
                </p>

                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      1
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Navigate to Properties
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Go to Properties → Property List → Add New Property
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      2
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Enter Property Name
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Choose a clear, descriptive name that helps identify the
                        property
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      3
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Add Complete Address
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Enter full street address, city, state, and ZIP code for
                        accurate mapping
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                      4
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Select Property Type
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Choose from apartment complex, single-family, townhome,
                        or commercial
                      </p>
                    </div>
                  </div>
                </div>

                <Card className='mt-6'>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2'>
                      <MapPin className='h-5 w-5 text-red-500' />
                      <span>Address Verification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-3 text-sm text-gray-700'>
                      Syndik will automatically verify and geocode your property
                      address for mapping and location services.
                    </p>
                    <div className='rounded-lg bg-gray-50 p-3'>
                      <p className='text-xs text-gray-600'>
                        <strong>Tip:</strong> If the address isn&apos;t found,
                        double-check the spelling and format. You can also use
                        GPS coordinates for rural properties.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Property Details */}
              <section id='property-details'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Property Details
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure detailed property information for comprehensive
                  management:
                </p>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Physical Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div>
                          <label className='text-sm font-medium text-gray-700'>
                            Year Built
                          </label>
                          <p className='text-sm text-gray-600'>
                            Construction or renovation year
                          </p>
                        </div>
                        <div>
                          <label className='text-sm font-medium text-gray-700'>
                            Total Square Footage
                          </label>
                          <p className='text-sm text-gray-600'>
                            Combined area of all units and common spaces
                          </p>
                        </div>
                        <div>
                          <label className='text-sm font-medium text-gray-700'>
                            Lot Size
                          </label>
                          <p className='text-sm text-gray-600'>
                            Total property land area
                          </p>
                        </div>
                        <div>
                          <label className='text-sm font-medium text-gray-700'>
                            Parking Spaces
                          </label>
                          <p className='text-sm text-gray-600'>
                            Total available parking spots
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Amenities & Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Swimming Pool</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Fitness Center</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Laundry Facilities</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Pet-Friendly</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Security System</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Elevator Access</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Units Setup */}
              <section id='units-setup'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Setting Up Units
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure individual units within your property:
                </p>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center space-x-2'>
                      <Plus className='h-5 w-5 text-blue-500' />
                      <span>Unit Configuration Options</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            Manual Entry
                          </h4>
                          <p className='mb-3 text-sm text-gray-600'>
                            Add units one by one with detailed information
                          </p>
                          <ul className='space-y-1 text-xs text-gray-500'>
                            <li>• Unit number/identifier</li>
                            <li>• Square footage</li>
                            <li>• Number of bedrooms/bathrooms</li>
                            <li>• Rent amount and deposit</li>
                            <li>• Unit-specific amenities</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            Bulk Import
                          </h4>
                          <p className='mb-3 text-sm text-gray-600'>
                            Upload multiple units using CSV template
                          </p>
                          <ul className='space-y-1 text-xs text-gray-500'>
                            <li>• Download CSV template</li>
                            <li>• Fill in unit information</li>
                            <li>• Upload completed file</li>
                            <li>• Review and confirm data</li>
                            <li>• Automatic validation checks</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='mt-4 border-amber-200 bg-amber-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <AlertTriangle className='mt-0.5 h-5 w-5 text-amber-600' />
                      <div>
                        <p className='font-medium text-amber-800'>
                          Unit Numbering Best Practices
                        </p>
                        <ul className='mt-2 space-y-1 text-sm text-amber-700'>
                          <li>
                            • Use consistent numbering format (e.g., 101, 102,
                            201, 202)
                          </li>
                          <li>
                            • Include building identifier for multi-building
                            properties
                          </li>
                          <li>
                            • Avoid special characters that might cause system
                            issues
                          </li>
                          <li>
                            • Consider future expansion in your numbering scheme
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Documents */}
              <section id='documents'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Uploading Documents
                </h2>
                <p className='mb-4 text-gray-700'>
                  Organize and upload important property documents for easy
                  access:
                </p>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-base'>
                        Legal Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Property deed</li>
                        <li>• Title documents</li>
                        <li>• Zoning permits</li>
                        <li>• Operating licenses</li>
                        <li>• HOA documents</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-base'>
                        Operational Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Floor plans</li>
                        <li>• Property photos</li>
                        <li>• Inspection reports</li>
                        <li>• Maintenance manuals</li>
                        <li>• Vendor contracts</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-base'>
                        Financial Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-1 text-sm text-gray-600'>
                        <li>• Insurance policies</li>
                        <li>• Tax assessments</li>
                        <li>• Utility agreements</li>
                        <li>• Loan documents</li>
                        <li>• Budget projections</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className='mt-4'>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Document Upload Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <h4 className='mb-2 font-medium text-green-700'>
                          Supported Formats:
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-700'>
                          <li>• PDF (recommended)</li>
                          <li>• Word documents (.docx)</li>
                          <li>• Images (.jpg, .png)</li>
                          <li>• Spreadsheets (.xlsx)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='mb-2 font-medium text-blue-700'>
                          File Size Limits:
                        </h4>
                        <ul className='space-y-1 text-sm text-gray-700'>
                          <li>• Maximum 25MB per file</li>
                          <li>• Use compression for large images</li>
                          <li>• Split large documents if needed</li>
                          <li>• Contact support for special cases</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Verification */}
              <section id='verification'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Review & Verification
                </h2>
                <p className='mb-4 text-gray-700'>
                  Before finalizing your property setup, review all information
                  for accuracy:
                </p>

                <Card className='border-green-200 bg-green-50'>
                  <CardContent className='p-4'>
                    <div className='flex items-start space-x-3'>
                      <CheckCircle className='mt-0.5 h-5 w-5 text-green-600' />
                      <div>
                        <p className='font-medium text-green-800'>
                          Pre-Launch Checklist
                        </p>
                        <div className='mt-3 space-y-2'>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm text-green-700'>
                              Property information is complete and accurate
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm text-green-700'>
                              All units are properly configured
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm text-green-700'>
                              Essential documents are uploaded
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm text-green-700'>
                              Property photos are added
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm text-green-700'>
                              Contact information is updated
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm text-green-700'>
                              Property manager is assigned
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className='mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4'>
                  <p className='text-sm text-blue-800'>
                    <strong>Next Steps:</strong> Once your property is added,
                    you can begin adding residents, setting up maintenance
                    schedules, and configuring financial tracking. Consider
                    scheduling a property walkthrough to verify all information.
                  </p>
                </div>
              </section>
              {/* Navigation */}
              <div className='flex items-center justify-between border-t pt-8'>
                <Button
                  variant='outline'
                  className='flex items-center space-x-2'
                  asChild
                >
                  <Link href='/user-guide'>
                    <ArrowLeft className='h-4 w-4' />
                    <span>Back to User Guide</span>
                  </Link>
                </Button>

                <Button className='flex items-center space-x-2' asChild>
                  <Link href='/user-guide/property-management/unit-management-organization'>
                    <span>Next: Unit Management & Organization</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className='lg:col-span-1'>
          <ArticleSidebar
            tableOfContents={tableOfContents}
            relatedArticles={relatedArticles}
            currentCategory='property-management'
            showQuickActions={true}
          />
        </div>
      </div>
    </ArticleLayout>
  );
};

export default AddingNewPropertiesPage;
