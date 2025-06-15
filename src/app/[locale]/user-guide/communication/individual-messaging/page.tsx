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
  MessageSquare,
  Send,
  FileText,
  Phone,
  Mail,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function IndividualMessagingPage() {
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
        <h1 className='mb-2 text-3xl font-bold'>Individual Messaging</h1>
        <p className='text-muted-foreground'>
          Communicate directly with residents, staff, and vendors through
          Syndik&apos;s messaging system.
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
                    href='#messaging-overview'
                    className='text-primary hover:underline'
                  >
                    Messaging System Overview
                  </a>
                </li>
                <li>
                  <a
                    href='#sending-messages'
                    className='text-primary hover:underline'
                  >
                    Sending Individual Messages
                  </a>
                </li>
                <li>
                  <a
                    href='#message-types'
                    className='text-primary hover:underline'
                  >
                    Message Types and Channels
                  </a>
                </li>
                <li>
                  <a
                    href='#attachments'
                    className='text-primary hover:underline'
                  >
                    Adding Attachments and Files
                  </a>
                </li>
                <li>
                  <a
                    href='#message-history'
                    className='text-primary hover:underline'
                  >
                    Viewing Message History
                  </a>
                </li>
                <li>
                  <a
                    href='#quick-responses'
                    className='text-primary hover:underline'
                  >
                    Quick Response Templates
                  </a>
                </li>
                <li>
                  <a
                    href='#conversation-management'
                    className='text-primary hover:underline'
                  >
                    Managing Conversations
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Messaging Overview */}
          <Card id='messaging-overview'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <MessageSquare className='mr-2 h-5 w-5' />
                Messaging System Overview
              </CardTitle>
              <CardDescription>
                Understanding Syndik&apos;s integrated communication platform
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Key Features</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Real-time messaging with instant delivery</li>
                    <li>• Multi-channel communication (email, SMS, in-app)</li>
                    <li>• File and photo attachments</li>
                    <li>• Message read receipts and delivery confirmation</li>
                    <li>• Conversation threading and history</li>
                  </ul>
                </div>
                <div className='rounded-lg border p-4'>
                  <h4 className='mb-2 font-semibold'>Communication Types</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Property manager to resident</li>
                    <li>• Resident support and inquiries</li>
                    <li>• Vendor coordination and updates</li>
                    <li>• Internal staff communication</li>
                    <li>• Emergency notifications</li>
                  </ul>
                </div>
              </div>
              <div className='bg-muted rounded-lg p-4'>
                <p className='text-sm'>
                  <strong>Centralized Communication:</strong> All messages are
                  logged and accessible through the resident portal, creating a
                  complete communication history.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sending Messages */}
          <Card id='sending-messages'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Send className='mr-2 h-5 w-5' />
                Sending Individual Messages
              </CardTitle>
              <CardDescription>
                Step-by-step guide to composing and sending individual messages
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    1
                  </Badge>
                  <div>
                    <p className='font-medium'>Access Messaging</p>
                    <p className='text-muted-foreground text-sm'>
                      Navigate to Communication &gt; Messages or click the
                      message icon in the main toolbar.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    2
                  </Badge>
                  <div>
                    <p className='font-medium'>Select Recipient</p>
                    <p className='text-muted-foreground text-sm'>
                      Choose the recipient from your contact list or search by
                      name, unit number, or property.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    3
                  </Badge>
                  <div>
                    <p className='font-medium'>Choose Communication Channel</p>
                    <p className='text-muted-foreground text-sm'>
                      Select whether to send via email, SMS, in-app
                      notification, or multiple channels.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    4
                  </Badge>
                  <div>
                    <p className='font-medium'>Compose Message</p>
                    <p className='text-muted-foreground text-sm'>
                      Write your message with a clear subject line and detailed
                      content as needed.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    5
                  </Badge>
                  <div>
                    <p className='font-medium'>Add Attachments</p>
                    <p className='text-muted-foreground text-sm'>
                      Attach relevant files, photos, or documents to support
                      your message (optional).
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <Badge variant='outline' className='mt-0.5'>
                    6
                  </Badge>
                  <div>
                    <p className='font-medium'>Send Message</p>
                    <p className='text-muted-foreground text-sm'>
                      Review your message and click &ldquo;Send&rdquo; to
                      deliver it to the recipient.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Types */}
          <Card id='message-types'>
            <CardHeader>
              <CardTitle>Message Types and Channels</CardTitle>
              <CardDescription>
                Understanding different message types and when to use each
                communication channel
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Communication Channels</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3 text-center'>
                      <Mail className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>Email</p>
                      <p className='text-muted-foreground text-xs'>
                        Detailed messages, formal notices
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <Phone className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>SMS</p>
                      <p className='text-muted-foreground text-xs'>
                        Quick updates, urgent alerts
                      </p>
                    </div>
                    <div className='rounded-lg border p-3 text-center'>
                      <MessageSquare className='text-primary mx-auto mb-2 h-6 w-6' />
                      <p className='text-sm font-medium'>In-App</p>
                      <p className='text-muted-foreground text-xs'>
                        Portal notifications, reminders
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Message Categories</h4>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='rounded-lg border p-4'>
                      <h5 className='mb-2 font-semibold'>
                        Administrative Messages
                      </h5>
                      <ul className='text-muted-foreground space-y-1 text-sm'>
                        <li>• Lease renewal notices</li>
                        <li>• Rent increase notifications</li>
                        <li>• Policy updates and changes</li>
                        <li>• Move-in/move-out coordination</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <h5 className='mb-2 font-semibold'>
                        Maintenance Communications
                      </h5>
                      <ul className='text-muted-foreground space-y-1 text-sm'>
                        <li>• Work order status updates</li>
                        <li>• Scheduled maintenance notices</li>
                        <li>• Emergency repair coordination</li>
                        <li>• Access request confirmations</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <h5 className='mb-2 font-semibold'>Financial Messages</h5>
                      <ul className='text-muted-foreground space-y-1 text-sm'>
                        <li>• Payment confirmations</li>
                        <li>• Late payment reminders</li>
                        <li>• Account balance updates</li>
                        <li>• Fee explanations</li>
                      </ul>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <h5 className='mb-2 font-semibold'>Community Updates</h5>
                      <ul className='text-muted-foreground space-y-1 text-sm'>
                        <li>• Event announcements</li>
                        <li>• Amenity updates</li>
                        <li>• Welcome messages</li>
                        <li>• Feedback requests</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card id='attachments'>
            <CardHeader>
              <CardTitle>Adding Attachments and Files</CardTitle>
              <CardDescription>
                How to include supporting documents, photos, and files in your
                messages
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Supported File Types</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Documents</p>
                      <p className='text-muted-foreground text-xs'>
                        PDF, DOC, DOCX, TXT, XLS, XLSX
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Images</p>
                      <p className='text-muted-foreground text-xs'>
                        JPG, JPEG, PNG, GIF, BMP
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Audio/Video</p>
                      <p className='text-muted-foreground text-xs'>
                        MP3, MP4, AVI, MOV (up to 50MB)
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Archives</p>
                      <p className='text-muted-foreground text-xs'>
                        ZIP, RAR (up to 100MB)
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>File Size Limits</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Individual files: Maximum 25MB</li>
                    <li>• Total attachments per message: Maximum 100MB</li>
                    <li>
                      • Images automatically compressed for faster delivery
                    </li>
                    <li>• Large files can be shared via secure cloud links</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Common Use Cases</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Photos of maintenance issues or completed work</li>
                    <li>• Lease documents and rental agreements</li>
                    <li>• Invoices and receipts for services</li>
                    <li>• Floor plans and property documentation</li>
                    <li>• Inspection reports and certificates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message History */}
          <Card id='message-history'>
            <CardHeader>
              <CardTitle>Viewing Message History</CardTitle>
              <CardDescription>
                Access and review your complete communication history with
                residents and vendors
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Conversation Threading</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Messages grouped by conversation topic</li>
                    <li>• Chronological message ordering with timestamps</li>
                    <li>• Read/unread status indicators</li>
                    <li>• Reply-to-message functionality for context</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Search and Filtering</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Search messages by keyword, sender, or date</li>
                    <li>
                      • Filter by message type (administrative, maintenance,
                      etc.)
                    </li>
                    <li>• Sort by date, sender, or importance level</li>
                    <li>
                      • Quick filters for unread messages or recent activity
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Export and Archive</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Export conversation history to PDF</li>
                    <li>• Archive old conversations for organization</li>
                    <li>• Backup important communications</li>
                    <li>• Legal compliance and record keeping</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Responses */}
          <Card id='quick-responses'>
            <CardHeader>
              <CardTitle>Quick Response Templates</CardTitle>
              <CardDescription>
                Save time with pre-written message templates for common
                communications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Creating Templates</h4>
                  <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        1
                      </Badge>
                      <div>
                        <p className='font-medium'>Template Categories</p>
                        <p className='text-muted-foreground text-sm'>
                          Organize templates by type: maintenance, billing,
                          general inquiries, etc.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        2
                      </Badge>
                      <div>
                        <p className='font-medium'>Variable Placeholders</p>
                        <p className='text-muted-foreground text-sm'>
                          Use placeholders like [Resident Name], [Unit Number],
                          [Property Name] for personalization.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <Badge variant='outline' className='mt-0.5'>
                        3
                      </Badge>
                      <div>
                        <p className='font-medium'>Template Approval</p>
                        <p className='text-muted-foreground text-sm'>
                          Set up approval workflows for templates that require
                          management review.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Pre-Built Templates</h4>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>
                        Maintenance Responses
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Work order confirmations, completion notices
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Payment Reminders</p>
                      <p className='text-muted-foreground text-xs'>
                        Rent due notices, late payment alerts
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Welcome Messages</p>
                      <p className='text-muted-foreground text-xs'>
                        New resident onboarding, move-in instructions
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium'>Policy Updates</p>
                      <p className='text-muted-foreground text-xs'>
                        Lease changes, community rules
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation Management */}
          <Card id='conversation-management'>
            <CardHeader>
              <CardTitle>Managing Conversations</CardTitle>
              <CardDescription>
                Organize and prioritize your messaging workflow for maximum
                efficiency
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='mb-2 font-medium'>Priority and Status</h4>
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-red-700'>
                        High Priority
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Emergency issues, urgent requests
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-yellow-700'>
                        Medium Priority
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Standard maintenance, routine inquiries
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-sm font-medium text-green-700'>
                        Low Priority
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        General information, non-urgent updates
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Conversation Actions</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Mark conversations as read/unread</li>
                    <li>• Star important conversations for quick access</li>
                    <li>
                      • Add internal notes that aren&apos;t visible to residents
                    </li>
                    <li>• Forward conversations to team members</li>
                    <li>• Set follow-up reminders for pending issues</li>
                  </ul>
                </div>
                <div>
                  <h4 className='mb-2 font-medium'>Team Collaboration</h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    <li>• Assign conversations to specific team members</li>
                    <li>• Add internal team members to conversations</li>
                    <li>• Share conversation history during shift changes</li>
                    <li>• Escalation workflows for complex issues</li>
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
                <Link href='/communication/messages/new'>
                  <Send className='mr-2 h-4 w-4' />
                  Send Message
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-start'
                asChild
              >
                <Link href='/communication/messages'>
                  <MessageSquare className='mr-2 h-4 w-4' />
                  View Messages
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
