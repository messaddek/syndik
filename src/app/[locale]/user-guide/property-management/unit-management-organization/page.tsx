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
  Building,
  ChevronRight,
  Mail,
  Home,
  Layout,
  Hash,
  Tag,
  FileText,
  Settings,
} from 'lucide-react';

const UnitManagementOrganizationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'adding-units', title: 'Adding Units', level: 1 },
    { id: 'unit-numbering', title: 'Unit Numbering System', level: 1 },
    { id: 'unit-types', title: 'Unit Types & Categories', level: 1 },
    { id: 'floor-plans', title: 'Floor Plans & Layouts', level: 1 },
    { id: 'amenities', title: 'Unit Amenities', level: 1 },
    { id: 'status-management', title: 'Status Management', level: 1 },
    { id: 'bulk-operations', title: 'Bulk Operations', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Properties',
      href: '/user-guide/property-management/adding-new-properties',
      time: '4 min',
    },
    {
      title: 'Creating Your First Property',
      href: '/user-guide/getting-started/creating-your-first-property',
      time: '5 min',
    },
    {
      title: 'Adding New Residents',
      href: '/user-guide/resident-management/adding-new-residents',
      time: '5 min',
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
                Property Management
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='text-gray-900'>
                Unit Management & Organization
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
                    <div className='rounded-lg bg-emerald-500 p-2'>
                      <Layout className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-900'>
                        Unit Management & Organization
                      </h1>
                      <div className='mt-2 flex items-center space-x-4'>
                        <Badge variant='secondary'>Property Management</Badge>
                        <div className='flex items-center space-x-1 text-sm text-gray-500'>
                          <Clock className='h-4 w-4' />
                          <span>6 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='text-lg text-gray-600'>
                    Learn how to effectively organize and manage units within
                    your properties. This guide covers unit creation,
                    categorization, numbering systems, and organizational best
                    practices.
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
                      Proper unit organization is fundamental to efficient
                      property management. A well-structured unit system helps
                      you track occupancy, manage maintenance, and streamline
                      resident services.
                    </p>

                    <Card className='border-emerald-200 bg-emerald-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <CheckCircle className='mt-0.5 h-5 w-5 text-emerald-600' />
                          <div>
                            <p className='font-medium text-emerald-800'>
                              Key Benefits
                            </p>
                            <ul className='mt-2 space-y-1 text-sm text-emerald-700'>
                              <li>• Streamlined unit tracking and reporting</li>
                              <li>• Improved maintenance scheduling</li>
                              <li>• Enhanced resident communication</li>
                              <li>• Better financial analysis by unit type</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Adding Units */}
                  <section id='adding-units'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Adding Units
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Follow these steps to add individual units to your
                      properties:
                    </p>

                    <div className='space-y-4'>
                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                          1
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Navigate to Unit Management
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Go to Properties → Select Property → Units tab
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                          2
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Click &quot;Add New Unit&quot;
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Use the &quot;Add Unit&quot; button to open the
                            creation form
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-medium text-white'>
                          3
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Fill Unit Details
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Enter unit number, type, size, and other relevant
                            information
                          </p>
                        </div>
                      </div>
                    </div>

                    <Card className='mt-4'>
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          Required Unit Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <div>
                            <h4 className='mb-2 font-semibold text-green-700'>
                              Essential Fields
                            </h4>
                            <ul className='space-y-1 text-sm'>
                              <li>• Unit number/identifier</li>
                              <li>• Floor/level</li>
                              <li>• Unit type (studio, 1BR, etc.)</li>
                              <li>• Square footage</li>
                              <li>• Number of bedrooms</li>
                              <li>• Number of bathrooms</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='mb-2 font-semibold text-blue-700'>
                              Optional Fields
                            </h4>
                            <ul className='space-y-1 text-sm'>
                              <li>• Unit description</li>
                              <li>• Balcony/patio details</li>
                              <li>• Parking space assignment</li>
                              <li>• Storage unit inclusion</li>
                              <li>• Pet policy override</li>
                              <li>• Accessibility features</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Unit Numbering */}
                  <section id='unit-numbering'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Unit Numbering System
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Establish a consistent numbering system for easy
                      identification and organization.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Hash className='h-5 w-5' />
                            <span>Sequential Numbering</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-600'>
                            Simple consecutive numbering system
                          </p>
                          <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                              <span>Examples:</span>
                              <span className='font-mono'>
                                101, 102, 103...
                              </span>
                            </div>
                            <div className='flex justify-between'>
                              <span>Best for:</span>
                              <span>Small buildings</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center space-x-2 text-lg'>
                            <Building className='h-5 w-5' />
                            <span>Floor-Based Numbering</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='mb-3 text-sm text-gray-600'>
                            Floor number + unit position
                          </p>
                          <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                              <span>Examples:</span>
                              <span className='font-mono'>
                                201, 202, 301, 302...
                              </span>
                            </div>
                            <div className='flex justify-between'>
                              <span>Best for:</span>
                              <span>Multi-story buildings</span>
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
                              Numbering Best Practices
                            </p>
                            <ul className='mt-2 space-y-1 text-sm text-yellow-700'>
                              <li>
                                • Keep numbering consistent across properties
                              </li>
                              <li>
                                • Avoid confusing patterns (no 13th floor, etc.)
                              </li>
                              <li>• Leave room for future expansion</li>
                              <li>• Consider accessibility and wayfinding</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Unit Types */}
                  <section id='unit-types'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Unit Types & Categories
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Organize units by type and category for better management
                      and reporting.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Residential Types
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-center space-x-2'>
                              <Home className='h-4 w-4 text-gray-400' />
                              <span>Studio</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Home className='h-4 w-4 text-gray-400' />
                              <span>1 Bedroom</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Home className='h-4 w-4 text-gray-400' />
                              <span>2 Bedroom</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Home className='h-4 w-4 text-gray-400' />
                              <span>3+ Bedroom</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Home className='h-4 w-4 text-gray-400' />
                              <span>Penthouse</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Special Units
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-center space-x-2'>
                              <Tag className='h-4 w-4 text-gray-400' />
                              <span>Accessible Units</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Tag className='h-4 w-4 text-gray-400' />
                              <span>Furnished Units</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Tag className='h-4 w-4 text-gray-400' />
                              <span>Short-term Rentals</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Tag className='h-4 w-4 text-gray-400' />
                              <span>Corporate Units</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Tag className='h-4 w-4 text-gray-400' />
                              <span>Model Units</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Commercial Spaces
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex items-center space-x-2'>
                              <Building className='h-4 w-4 text-gray-400' />
                              <span>Retail Space</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Building className='h-4 w-4 text-gray-400' />
                              <span>Office Space</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Building className='h-4 w-4 text-gray-400' />
                              <span>Storage Units</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Building className='h-4 w-4 text-gray-400' />
                              <span>Parking Spaces</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Building className='h-4 w-4 text-gray-400' />
                              <span>Common Areas</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Floor Plans */}
                  <section id='floor-plans'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Floor Plans & Layouts
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Upload and manage floor plans for better unit
                      visualization and marketing.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className='flex items-center space-x-2 text-lg'>
                          <FileText className='h-5 w-5' />
                          <span>Floor Plan Management</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-4'>
                          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                              <h4 className='mb-2 font-semibold'>
                                Supported Formats
                              </h4>
                              <ul className='space-y-1 text-sm text-gray-600'>
                                <li>• PDF documents</li>
                                <li>• Image files (JPG, PNG)</li>
                                <li>• CAD drawings (DWG, DXF)</li>
                                <li>• Interactive floor plans</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className='mb-2 font-semibold'>
                                Usage Benefits
                              </h4>
                              <ul className='space-y-1 text-sm text-gray-600'>
                                <li>• Enhanced marketing materials</li>
                                <li>• Better maintenance planning</li>
                                <li>• Improved space utilization</li>
                                <li>• Virtual tour integration</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Amenities */}
                  <section id='amenities'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Unit Amenities
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Track and manage amenities available in each unit for
                      accurate marketing and pricing.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Standard Amenities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Air Conditioning</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Dishwasher</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>In-unit Laundry</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Hardwood Floors</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Premium Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Balcony/Patio</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Walk-in Closet</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>Fireplace</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm'>City View</span>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Status Management */}
                  <section id='status-management'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Status Management
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Keep track of unit availability and status for efficient
                      leasing and maintenance scheduling.
                    </p>

                    <Card>
                      <CardContent className='p-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 p-3'>
                              <CheckCircle className='h-6 w-6 text-green-600' />
                            </div>
                            <h4 className='font-semibold text-green-700'>
                              Available
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Ready for lease
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-blue-100 p-3'>
                              <Users className='text-primary h-6 w-6' />
                            </div>
                            <h4 className='font-semibold text-blue-700'>
                              Occupied
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Currently leased
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-100 p-3'>
                              <Settings className='h-6 w-6 text-yellow-600' />
                            </div>
                            <h4 className='font-semibold text-yellow-700'>
                              Maintenance
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Under repair
                            </p>
                          </div>
                          <div className='text-center'>
                            <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-gray-100 p-3'>
                              <AlertCircle className='h-6 w-6 text-gray-600' />
                            </div>
                            <h4 className='font-semibold text-gray-700'>
                              Offline
                            </h4>
                            <p className='text-sm text-gray-600'>
                              Not available
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Bulk Operations */}
                  <section id='bulk-operations'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                      Bulk Operations
                    </h2>
                    <p className='mb-4 text-gray-700'>
                      Efficiently manage multiple units simultaneously with bulk
                      operations.
                    </p>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Bulk Unit Creation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li>• Import from spreadsheet</li>
                            <li>• Template-based creation</li>
                            <li>• Pattern-based numbering</li>
                            <li>• Automatic floor assignment</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            Bulk Unit Updates
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li>• Status changes</li>
                            <li>• Rent adjustments</li>
                            <li>• Amenity updates</li>
                            <li>• Category reassignment</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className='mt-4 border-blue-200 bg-blue-50'>
                      <CardContent className='p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertCircle className='text-primary mt-0.5 h-5 w-5' />
                          <div>
                            <p className='font-medium text-blue-800'>
                              Pro Tip: Bulk Operations
                            </p>
                            <p className='text-sm text-blue-700'>
                              Use bulk operations to save time when setting up
                              large properties or making property-wide changes.
                              Always verify changes before applying to multiple
                              units.
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

export default UnitManagementOrganizationPage;
