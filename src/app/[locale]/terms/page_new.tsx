import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Users,
  Shield,
  CreditCard,
  AlertTriangle,
  Scale,
  Phone,
  Globe,
} from 'lucide-react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms', icon: FileText },
  { id: 'description', title: '2. Description of Service', icon: Users },
  { id: 'user-accounts', title: '3. User Accounts', icon: Shield },
  { id: 'payment', title: '4. Payment Terms', icon: CreditCard },
  { id: 'prohibited', title: '5. Prohibited Uses', icon: AlertTriangle },
  { id: 'limitation', title: '6. Limitation of Liability', icon: Scale },
  { id: 'termination', title: '7. Termination', icon: AlertTriangle },
  { id: 'contact', title: '8. Contact Information', icon: Phone },
];

export default function TermsPage() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <div className='mb-6 flex items-center justify-center'>
              <Badge
                variant='secondary'
                className='mb-4 flex items-center gap-2 px-4 py-2'
              >
                <Scale className='h-4 w-4' />
                Terms & Conditions
              </Badge>
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Terms of Service
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Last updated: January 1, 2025
            </p>
            <p className='mt-4 text-sm text-gray-500'>
              Please read these terms carefully before using our service.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Table of Contents - Sticky Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-8'>
                <Card className='border-green-200 bg-green-50/50'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-lg text-green-900'>
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className='space-y-2'>
                      {sections.map(section => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className='flex items-center gap-2 rounded-md px-3 py-2 text-sm text-green-700 transition-colors hover:bg-green-100'
                        >
                          <section.icon className='h-4 w-4' />
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className='lg:col-span-3'>
              <div className='space-y-8'>
                {/* Section 1: Acceptance of Terms */}
                <Card id='acceptance' className='border-l-4 border-l-blue-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <FileText className='h-6 w-6 text-blue-600' />
                      1. Acceptance of Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      By accessing and using Syndik (&quot;the Service&quot;),
                      you accept and agree to be bound by the terms and
                      provision of this agreement. If you do not agree to abide
                      by the above, please do not use this service.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 2: Description of Service */}
                <Card
                  id='description'
                  className='border-l-4 border-l-green-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Users className='h-6 w-6 text-green-600' />
                      2. Description of Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      Syndik is a Software as a Service (SaaS) platform designed
                      for residential syndicate management. The Service provides
                      tools for property management, financial tracking,
                      resident communication, meeting management, and related
                      administrative functions.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 3: User Accounts */}
                <Card
                  id='user-accounts'
                  className='border-l-4 border-l-purple-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Shield className='h-6 w-6 text-purple-600' />
                      3. User Accounts and Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                        <h4 className='mb-2 font-semibold text-purple-800'>
                          Account Security
                        </h4>
                        <ul className='space-y-1 text-sm text-purple-700'>
                          <li>
                            • Maintain confidentiality of login credentials
                          </li>
                          <li>• Use strong, unique passwords</li>
                          <li>• Notify us immediately of security breaches</li>
                        </ul>
                      </div>
                      <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                        <h4 className='mb-2 font-semibold text-purple-800'>
                          Usage Guidelines
                        </h4>
                        <ul className='space-y-1 text-sm text-purple-700'>
                          <li>• Provide accurate and current information</li>
                          <li>• Use the service lawfully and ethically</li>
                          <li>
                            • Respect other users&apos; privacy and rights
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 4: Payment Terms */}
                <Card id='payment' className='border-l-4 border-l-yellow-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <CreditCard className='h-6 w-6 text-yellow-600' />
                      4. Payment Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <p className='leading-relaxed text-gray-600'>
                        Subscription fees are billed in advance on a monthly or
                        annual basis. All payments are non-refundable except as
                        required by law.
                      </p>
                      <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                        <div className='rounded-lg bg-yellow-50 p-3 text-center'>
                          <div className='font-semibold text-yellow-800'>
                            Monthly Billing
                          </div>
                          <div className='text-sm text-yellow-600'>
                            Charged every month
                          </div>
                        </div>
                        <div className='rounded-lg bg-yellow-50 p-3 text-center'>
                          <div className='font-semibold text-yellow-800'>
                            Annual Billing
                          </div>
                          <div className='text-sm text-yellow-600'>
                            Save up to 20%
                          </div>
                        </div>
                        <div className='rounded-lg bg-yellow-50 p-3 text-center'>
                          <div className='font-semibold text-yellow-800'>
                            Auto-Renewal
                          </div>
                          <div className='text-sm text-yellow-600'>
                            Cancel anytime
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 5: Prohibited Uses */}
                <Card id='prohibited' className='border-l-4 border-l-red-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <AlertTriangle className='h-6 w-6 text-red-600' />
                      5. Prohibited Uses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      You may not use our Service for any unlawful or prohibited
                      activities, including:
                    </p>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <div className='flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-red-500'></div>
                        <span className='text-sm text-gray-700'>
                          Violating laws or regulations
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-red-500'></div>
                        <span className='text-sm text-gray-700'>
                          Harassing or threatening others
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-red-500'></div>
                        <span className='text-sm text-gray-700'>
                          Distributing malware or viruses
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-red-500'></div>
                        <span className='text-sm text-gray-700'>
                          Unauthorized access attempts
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 8: Contact Information */}
                <Card
                  id='contact'
                  className='border-l-4 border-l-blue-500 bg-blue-50/50'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Phone className='h-6 w-6 text-blue-600' />
                      8. Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 text-gray-600'>
                      If you have any questions about these Terms of Service,
                      please contact us:
                    </p>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <div className='rounded-lg border border-blue-200 bg-white p-4 text-center'>
                        <div className='mb-2 text-blue-600'>
                          <Phone className='mx-auto h-6 w-6' />
                        </div>
                        <p className='font-semibold text-gray-900'>Phone</p>
                        <p className='text-sm text-gray-600'>+1-800-SYNDIK</p>
                      </div>
                      <div className='rounded-lg border border-blue-200 bg-white p-4 text-center'>
                        <div className='mb-2 text-blue-600'>
                          <Globe className='mx-auto h-6 w-6' />
                        </div>
                        <p className='font-semibold text-gray-900'>Email</p>
                        <p className='text-sm text-gray-600'>
                          legal@syndik.com
                        </p>
                      </div>
                      <div className='rounded-lg border border-blue-200 bg-white p-4 text-center'>
                        <div className='mb-2 text-blue-600'>
                          <FileText className='mx-auto h-6 w-6' />
                        </div>
                        <p className='font-semibold text-gray-900'>Address</p>
                        <p className='text-sm text-gray-600'>
                          [Company Address]
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Effective Date Notice */}
                <Card className='border-green-200 bg-gradient-to-r from-green-50 to-blue-50'>
                  <CardContent className='pt-6'>
                    <p className='text-center text-sm text-gray-600'>
                      <Scale className='mx-auto mb-2 h-5 w-5 text-green-600' />
                      These terms are effective as of January 1, 2025, and will
                      remain in effect until modified.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
