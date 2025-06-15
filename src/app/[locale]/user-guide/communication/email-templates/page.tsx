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
  Mail,
  Edit,
  Copy,
  FileText,
  Eye,
  Send,
  Palette,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function EmailTemplatesPage() {
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
        <h1 className='mb-2 text-3xl font-bold'>Email Templates</h1>
        <p className='text-muted-foreground'>
          Create, customize, and manage professional email templates for
          consistent communication with residents and vendors.
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
                    href='#template-overview'
                    className='text-primary hover:underline'
                  >
                    Email Template System Overview
                  </a>
                </li>
                <li>
                  <a
                    href='#creating-templates'
                    className='text-primary hover:underline'
                  >
                    Creating New Templates
                  </a>
                </li>
                <li>
                  <a
                    href='#template-types'
                    className='text-primary hover:underline'
                  >
                    Template Types and Categories
                  </a>
                </li>
                <li>
                  <a
                    href='#customization'
                    className='text-primary hover:underline'
                  >
                    Design and Customization
                  </a>
                </li>
                <li>
                  <a
                    href='#variables-personalization'
                    className='text-primary hover:underline'
                  >
                    Variables and Personalization
                  </a>
                </li>
                <li>
                  <a
                    href='#testing-previewing'
                    className='text-primary hover:underline'
                  >
                    Testing and Previewing
                  </a>
                </li>
                <li>
                  <a
                    href='#template-management'
                    className='text-primary hover:underline'
                  >
                    Template Management
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Template Overview */}
          <Card id='template-overview'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Mail className='mr-2 h-5 w-5' />
                Email Template System Overview
              </CardTitle>
              <CardDescription>
                Understanding Syndik&apos;s comprehensive email template system
                for professional communications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Key Benefits</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Consistent brand messaging</li>
                    <li>• Time-saving automation</li>
                    <li>• Professional appearance</li>
                    <li>• Personalized content</li>
                    <li>• Reduced errors and typos</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Template Features</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Drag-and-drop editor</li>
                    <li>• Mobile-responsive design</li>
                    <li>• Variable substitution</li>
                    <li>• Brand asset integration</li>
                    <li>• A/B testing capabilities</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Professional Communication:</strong> Well-designed
                  email templates help establish trust and credibility with
                  residents while maintaining consistent brand standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Creating Templates */}
          <Card id='creating-templates'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Edit className='mr-2 h-5 w-5' />
                Creating New Templates
              </CardTitle>
              <CardDescription>
                Step-by-step guide to creating professional email templates from
                scratch
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Access Template Editor</p>
                    <p className='text-muted-foreground text-sm'>
                      Navigate to Communication &gt; Email Templates and click
                      &ldquo;Create New Template&rdquo;.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Choose Template Type</p>
                    <p className='text-muted-foreground text-sm'>
                      Select from pre-built categories or start with a blank
                      template for full customization.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Set Basic Information</p>
                    <p className='text-muted-foreground text-sm'>
                      Enter template name, description, category, and intended
                      audience for organization.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Design Email Layout</p>
                    <p className='text-muted-foreground text-sm'>
                      Use the drag-and-drop editor to create your email
                      structure with headers, content blocks, and footers.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    5
                  </Badge>
                  <div>
                    <p className='font-medium'>Add Content and Variables</p>
                    <p className='text-muted-foreground text-sm'>
                      Write your message content and insert dynamic variables
                      for personalization.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    6
                  </Badge>
                  <div>
                    <p className='font-medium'>Preview and Test</p>
                    <p className='text-muted-foreground text-sm'>
                      Preview the template with sample data and send test emails
                      to verify appearance and functionality.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    7
                  </Badge>
                  <div>
                    <p className='font-medium'>Save and Activate</p>
                    <p className='text-muted-foreground text-sm'>
                      Save your template and make it available for use in
                      automated workflows or manual sending.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Types */}
          <Card id='template-types'>
            <CardHeader>
              <CardTitle>Template Types and Categories</CardTitle>
              <CardDescription>
                Explore different template categories designed for various
                communication needs
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-blue-700'>
                    Administrative Templates
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Welcome emails for new residents</li>
                    <li>• Lease renewal notifications</li>
                    <li>• Move-in/move-out instructions</li>
                    <li>• Policy update announcements</li>
                    <li>• Rent increase notices</li>
                  </ul>
                </div>
                <div className='border-l-4 border-green-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-green-700'>
                    Maintenance Templates
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Work order confirmations</li>
                    <li>• Maintenance completion notices</li>
                    <li>• Scheduled maintenance alerts</li>
                    <li>• Emergency repair notifications</li>
                    <li>• Vendor assignment updates</li>
                  </ul>
                </div>
                <div className='border-l-4 border-orange-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-orange-700'>
                    Financial Templates
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Payment confirmation receipts</li>
                    <li>• Late payment reminders</li>
                    <li>• Balance due notifications</li>
                    <li>• Monthly statements</li>
                    <li>• Fee explanations</li>
                  </ul>
                </div>
                <div className='border-l-4 border-purple-500 pl-4'>
                  <h4 className='mb-2 font-semibold text-purple-700'>
                    Community Templates
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Event announcements</li>
                    <li>• Community newsletters</li>
                    <li>• Amenity updates</li>
                    <li>• Holiday greetings</li>
                    <li>• Resident appreciation messages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization */}
          <Card id='customization'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Palette className='mr-2 h-5 w-5' />
                Design and Customization
              </CardTitle>
              <CardDescription>
                Customize your email templates to match your brand and
                communication style
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Brand Customization</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Visual Elements</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Company logo and branding</li>
                        <li>• Custom color schemes</li>
                        <li>• Font selection and sizing</li>
                        <li>• Header and footer designs</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Layout Options</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Single or multi-column layouts</li>
                        <li>• Responsive design for mobile</li>
                        <li>• Button and link styling</li>
                        <li>• Image placement and sizing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Content Blocks</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3 text-center'>
                      <FileText className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Text Blocks</p>
                      <p className='text-muted-foreground text-xs'>
                        Rich text formatting options
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Eye className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Image Blocks</p>
                      <p className='text-muted-foreground text-xs'>
                        Photos and graphics integration
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Send className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Action Blocks</p>
                      <p className='text-muted-foreground text-xs'>
                        Buttons and call-to-action elements
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Styling Options</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Custom CSS styling for advanced users</li>
                    <li>• Pre-designed theme templates</li>
                    <li>• Conditional formatting based on content</li>
                    <li>• Dark mode and accessibility considerations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variables and Personalization */}
          <Card id='variables-personalization'>
            <CardHeader>
              <CardTitle>Variables and Personalization</CardTitle>
              <CardDescription>
                Use dynamic variables to personalize emails for each recipient
                automatically
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Common Variables</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>
                        Resident Information
                      </p>{' '}
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>
                          • &#123;&#123;first_name&#125;&#125; - Resident&apos;s
                          first name
                        </li>
                        <li>
                          • &#123;&#123;last_name&#125;&#125; - Resident&apos;s
                          last name
                        </li>
                        <li>
                          • &#123;&#123;full_name&#125;&#125; - Complete name
                        </li>
                        <li>• &#123;&#123;email&#125;&#125; - Email address</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Property Details</p>{' '}
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>
                          • &#123;&#123;unit_number&#125;&#125; - Unit or
                          apartment number
                        </li>
                        <li>
                          • &#123;&#123;property_name&#125;&#125; - Property
                          name
                        </li>
                        <li>
                          • &#123;&#123;property_address&#125;&#125; - Full
                          property address
                        </li>
                        <li>
                          • &#123;&#123;manager_name&#125;&#125; - Property
                          manager name
                        </li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>
                        Financial Information
                      </p>{' '}
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>
                          • &#123;&#123;rent_amount&#125;&#125; - Monthly rent
                          amount
                        </li>
                        <li>
                          • &#123;&#123;balance_due&#125;&#125; - Outstanding
                          balance
                        </li>
                        <li>
                          • &#123;&#123;payment_date&#125;&#125; - Last payment
                          date
                        </li>
                        <li>
                          • &#123;&#123;due_date&#125;&#125; - Next payment due
                          date
                        </li>
                      </ul>
                    </div>{' '}
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>System Information</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>
                          • &#123;&#123;current_date&#125;&#125; - Today&apos;s
                          date
                        </li>
                        <li>
                          • &#123;&#123;portal_link&#125;&#125; - Link to
                          resident portal
                        </li>
                        <li>
                          • &#123;&#123;support_email&#125;&#125; - Support
                          contact email
                        </li>
                        <li>
                          • &#123;&#123;work_order_number&#125;&#125; - Work
                          order ID
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Conditional Content</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Show/hide content based on resident status (current,
                      past due, new)
                    </li>
                    <li>• Different messaging for different property types</li>
                    <li>
                      • Conditional text based on lease terms or payment history
                    </li>
                    <li>• Language variations based on resident preferences</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Advanced Personalization</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Custom field integration from resident profiles</li>
                    <li>• Dynamic content based on interaction history</li>
                    <li>• Personalized recommendations and suggestions</li>
                    <li>• Birthday and anniversary recognition</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing and Previewing */}
          <Card id='testing-previewing'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Eye className='mr-2 h-5 w-5' />
                Testing and Previewing
              </CardTitle>
              <CardDescription>
                Ensure your email templates look perfect before sending to
                residents
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Preview Options</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Desktop Preview</p>
                      <p className='text-muted-foreground text-xs'>
                        How emails appear on desktop clients
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Mobile Preview</p>
                      <p className='text-muted-foreground text-xs'>
                        Mobile-responsive design verification
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Client Testing</p>
                      <p className='text-muted-foreground text-xs'>
                        Test across different email clients
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Test Email Features</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Send test emails to yourself or team members</li>
                    <li>• Variable substitution testing with sample data</li>
                    <li>• Link and button functionality verification</li>
                    <li>• Spam score checking and deliverability testing</li>
                    <li>• Load time and image rendering tests</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>A/B Testing</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Create multiple versions of the same template</li>
                    <li>
                      • Test different subject lines and content variations
                    </li>
                    <li>
                      • Measure open rates, click-through rates, and response
                      rates
                    </li>
                    <li>• Automatically select the best-performing version</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Quality Assurance Checklist
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Spelling and grammar verification</li>
                    <li>• Brand consistency and style guide compliance</li>
                    <li>• Variable substitution accuracy</li>
                    <li>• Mobile responsiveness confirmation</li>
                    <li>• Legal and compliance review (if required)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Management */}
          <Card id='template-management'>
            <CardHeader>
              <CardTitle>Template Management</CardTitle>
              <CardDescription>
                Organize, maintain, and optimize your email template library
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>
                    Organization and Categories
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>
                      • Create folders and categories for different template
                      types
                    </li>
                    <li>• Tag templates with keywords for easy searching</li>
                    <li>• Star frequently used templates for quick access</li>
                    <li>• Archive outdated templates without deleting</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Version Control</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Template Versioning</p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Track changes and revisions</li>
                        <li>• Restore previous versions</li>
                        <li>• Compare different versions</li>
                        <li>• Approval workflows</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>
                        Collaboration Features
                      </p>
                      <ul className='text-muted-foreground space-y-1 text-xs'>
                        <li>• Multiple editors and reviewers</li>
                        <li>• Comments and feedback system</li>
                        <li>• Role-based permissions</li>
                        <li>• Change notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Usage Analytics</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Track template usage frequency and performance</li>
                    <li>• Monitor open rates and engagement metrics</li>
                    <li>• Identify top-performing templates</li>
                    <li>• Analyze recipient feedback and responses</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Maintenance and Updates</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Regular review and update schedules</li>
                    <li>• Automated broken link detection</li>
                    <li>• Content freshness alerts</li>
                    <li>• Compliance and legal review reminders</li>
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
                href='/user-guide/communication/notification-settings'
                className='hover:bg-muted block rounded-lg border p-3 transition-colors'
              >
                <h4 className='text-sm font-medium'>Notification Settings</h4>
                <p className='text-muted-foreground mt-1 text-xs'>
                  Configure notification preferences
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
                <Link href='/communication/templates/new'>
                  <Edit className='mr-2 h-4 w-4' />
                  Create Template
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/communication/templates'>
                  <Copy className='mr-2 h-4 w-4' />
                  Manage Templates
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
