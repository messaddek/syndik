import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingLayout } from '@/components/landing/landing-layout';
import {
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  Mail,
  FileText,
  FolderOpen,
  Shield,
} from 'lucide-react';

const DocumentManagementSystemPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'document-types', title: 'Document Types', level: 1 },
    { id: 'uploading-files', title: 'Uploading Files', level: 1 },
    { id: 'organizing-documents', title: 'Organizing Documents', level: 1 },
    { id: 'sharing-access', title: 'Sharing & Access Control', level: 1 },
    { id: 'version-control', title: 'Version Control', level: 1 },
    { id: 'security-compliance', title: 'Security & Compliance', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Adding New Properties',
      href: '/user-guide/property-management/adding-new-properties',
      time: '4 min',
    },
    {
      title: 'Property Information Updates',
      href: '/user-guide/property-management/property-information-updates',
      time: '3 min',
    },
    {
      title: 'Unit Management & Organization',
      href: '/user-guide/property-management/unit-management-organization',
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
              <Link href='/user-guide' className='hover:text-gray-900'>
                User Guide
              </Link>
              <ChevronRight className='h-4 w-4' />
              <Link
                href='/user-guide#property-management'
                className='hover:text-gray-900'
              >
                Property Management
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='font-medium text-gray-900'>
                Document Management System
              </span>
            </div>
          </nav>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              {/* Header */}
              <div className='mb-8'>
                <div className='mb-4 flex items-center space-x-3'>
                  <div className='rounded-lg bg-emerald-500 p-2'>
                    <FileText className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold text-gray-900'>
                      Document Management System
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>8 min read</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>All users</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>
                  Organize, store, and manage all your property documents
                  securely with Syndik&apos;s comprehensive document management
                  system.
                </p>
              </div>

              {/* Overview */}
              <section id='overview' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Overview
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <p className='mb-4 text-gray-700'>
                      The document management system in Syndik helps you
                      organize, store, and access all property-related documents
                      in one secure location. From lease agreements to
                      maintenance records, everything is at your fingertips.
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='text-primary mt-0.5 h-5 w-5' />
                        <div>
                          <h4 className='font-medium text-blue-900'>
                            Key Benefits
                          </h4>
                          <ul className='mt-2 space-y-1 text-sm text-blue-800'>
                            <li>• Centralized document storage</li>
                            <li>• Advanced search and filtering</li>
                            <li>• Version control and history</li>
                            <li>• Secure sharing and access control</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Document Types */}
              <section id='document-types' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Document Types
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Legal Documents
                        </h3>
                        <div className='space-y-2 text-sm text-gray-600'>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Lease agreements</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Property deeds</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Insurance policies</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Legal notices</span>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Operational Documents
                        </h3>
                        <div className='space-y-2 text-sm text-gray-600'>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Maintenance records</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Inspection reports</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Financial statements</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Property photos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Uploading Files */}
              <section id='uploading-files' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Uploading Files
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Upload Process
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                1
                              </span>
                              <span>Navigate to Documents section</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                2
                              </span>
                              <span>
                                Click &ldquo;Upload Documents&rdquo; button
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                3
                              </span>
                              <span>
                                Drag and drop files or browse to select
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                4
                              </span>
                              <span>Add tags and categorize documents</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                                5
                              </span>
                              <span>Set access permissions</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div className='rounded-lg bg-yellow-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertCircle className='mt-0.5 h-5 w-5 text-yellow-600' />
                          <div>
                            <h4 className='font-medium text-yellow-900'>
                              File Requirements
                            </h4>
                            <p className='mt-1 text-sm text-yellow-800'>
                              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG,
                              PNG. Maximum file size: 50MB per file.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Organizing Documents */}
              <section id='organizing-documents' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Organizing Documents
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div>
                        <h3 className='mb-3 flex items-center text-lg font-medium text-gray-900'>
                          <FolderOpen className='mr-2 h-5 w-5 text-emerald-500' />
                          Folder Structure
                        </h3>
                        <div className='space-y-2 text-sm text-gray-600'>
                          <div className='border-l-2 border-gray-200 pl-4'>
                            <p className='font-medium'>By Property</p>
                            <p className='text-xs text-gray-500'>
                              Group documents by property location
                            </p>
                          </div>
                          <div className='border-l-2 border-gray-200 pl-4'>
                            <p className='font-medium'>By Category</p>
                            <p className='text-xs text-gray-500'>
                              Organize by document type (legal, financial, etc.)
                            </p>
                          </div>
                          <div className='border-l-2 border-gray-200 pl-4'>
                            <p className='font-medium'>By Date</p>
                            <p className='text-xs text-gray-500'>
                              Sort chronologically for easy tracking
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Tagging System
                        </h3>
                        <div className='space-y-3'>
                          <div className='flex flex-wrap gap-2'>
                            <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-800'>
                              urgent
                            </span>
                            <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-800'>
                              lease
                            </span>
                            <span className='rounded bg-purple-100 px-2 py-1 text-xs text-purple-800'>
                              maintenance
                            </span>
                            <span className='rounded bg-orange-100 px-2 py-1 text-xs text-orange-800'>
                              financial
                            </span>
                          </div>
                          <p className='text-sm text-gray-600'>
                            Use tags to quickly filter and find documents across
                            all properties.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Sharing & Access Control */}
              <section id='sharing-access' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Sharing & Access Control
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='rounded-lg bg-green-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <Shield className='mt-0.5 h-5 w-5 text-green-600' />
                          <div>
                            <h4 className='font-medium text-green-900'>
                              Security First
                            </h4>
                            <p className='mt-1 text-sm text-green-800'>
                              All document sharing uses encrypted connections
                              and role-based access control to protect sensitive
                              information.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div className='rounded-lg border p-4'>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            View Only
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Users can view and download documents but cannot
                            edit or delete.
                          </p>
                        </div>
                        <div className='rounded-lg border p-4'>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            Edit Access
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Users can view, download, upload new versions, and
                            edit metadata.
                          </p>
                        </div>
                        <div className='rounded-lg border p-4'>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            Full Control
                          </h4>
                          <p className='text-sm text-gray-600'>
                            Complete access including ability to delete
                            documents and manage permissions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Version Control */}
              <section id='version-control' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Version Control
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-4'>
                      <p className='text-gray-700'>
                        Track changes and maintain document history with
                        automatic version control:
                      </p>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Automatic Features
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Version numbering (v1.0, v1.1, etc.)</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Upload timestamp tracking</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>User attribution for changes</span>
                            </li>
                          </ul>
                        </div>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Manual Controls
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Version notes and comments</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Rollback to previous versions</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Compare document versions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Security & Compliance */}
              <section id='security-compliance' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Security & Compliance
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='rounded-lg bg-blue-50 p-4'>
                        <h4 className='mb-2 font-medium text-blue-900'>
                          Industry-Standard Security
                        </h4>
                        <p className='text-sm text-blue-800'>
                          All documents are stored with enterprise-grade
                          security including encryption at rest and in transit,
                          regular security audits, and compliance with data
                          protection regulations.
                        </p>
                      </div>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Security Features
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>256-bit SSL encryption</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>Regular automated backups</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>Audit trail logging</span>
                            </li>
                          </ul>
                        </div>
                        <div className='space-y-3'>
                          <h4 className='font-medium text-gray-900'>
                            Compliance
                          </h4>
                          <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>GDPR compliant</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>SOC 2 certified</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Regular penetration testing</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
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
                          className='block text-sm text-gray-600 hover:text-gray-900'
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
                          className='block rounded-lg p-3 transition-colors hover:bg-gray-50'
                        >
                          <h4 className='text-sm font-medium text-gray-900'>
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

                {/* Need Help */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                      >
                        <Mail className='mr-2 h-4 w-4' />
                        Contact Support
                      </Button>
                      <p className='text-xs text-gray-500'>
                        Our team is here to help you make the most of Syndik.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default DocumentManagementSystemPage;
