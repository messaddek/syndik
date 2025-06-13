import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Users,
  Shield,
  CreditCard,
  Lock,
  Phone,
  AlertTriangle,
  CheckCircle,
  Globe,
  Clock,
} from 'lucide-react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms', icon: CheckCircle },
  { id: 'description', title: '2. Description of Service', icon: FileText },
  { id: 'user-accounts', title: '3. User Accounts', icon: Users },
  { id: 'acceptable-use', title: '4. Acceptable Use Policy', icon: Shield },
  { id: 'payment', title: '5. Payment and Billing', icon: CreditCard },
  { id: 'privacy', title: '6. Privacy and Data Protection', icon: Lock },
  {
    id: 'intellectual-property',
    title: '7. Intellectual Property',
    icon: Globe,
  },
  {
    id: 'limitation-liability',
    title: '8. Limitation of Liability',
    icon: AlertTriangle,
  },
  { id: 'termination', title: '9. Termination', icon: Clock },
  { id: 'modifications', title: '10. Modifications', icon: FileText },
  { id: 'governing-law', title: '11. Governing Law', icon: Globe },
  { id: 'contact', title: '12. Contact Information', icon: Phone },
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
                <FileText className='h-4 w-4' />
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
                <Card className='border-blue-200 bg-blue-50/50'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-lg text-blue-900'>
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className='space-y-2'>
                      {sections.map(section => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className='flex items-center gap-2 rounded-md px-3 py-2 text-sm text-blue-700 transition-colors hover:bg-blue-100'
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
                <Card id='acceptance' className='border-l-4 border-l-green-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <CheckCircle className='h-6 w-6 text-green-600' />
                      1. Acceptance of Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      By accessing and using Syndik (&quot;we,&quot;
                      &quot;our,&quot; or &quot;us&quot;), you accept and agree
                      to be bound by the terms and provision of this agreement.
                      If you do not agree to abide by the above, please do not
                      use this service.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 2: Description of Service */}
                <Card id='description' className='border-l-4 border-l-blue-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <FileText className='h-6 w-6 text-blue-600' />
                      2. Description of Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      Syndik is a comprehensive SaaS platform designed for
                      residential syndicate management, providing:
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      <div className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                        <span className='text-sm text-gray-700'>
                          Property and building management
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                        <span className='text-sm text-gray-700'>
                          Financial tracking and reporting
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                        <span className='text-sm text-gray-700'>
                          Resident communication portal
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                        <span className='text-sm text-gray-700'>
                          Meeting and voting management
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 3: User Accounts */}
                <Card
                  id='user-accounts'
                  className='border-l-4 border-l-purple-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Users className='h-6 w-6 text-purple-600' />
                      3. User Accounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      To access certain features of our service, you must
                      register for an account. You agree to:
                    </p>
                    <div className='space-y-3'>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Provide accurate, current, and complete information
                          during registration
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Maintain and update your account information to keep
                          it accurate
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Keep your password secure and confidential
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Accept responsibility for all activities under your
                          account
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 4: Acceptable Use Policy */}
                <Card
                  id='acceptable-use'
                  className='border-l-4 border-l-red-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Shield className='h-6 w-6 text-red-600' />
                      4. Acceptable Use Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      You agree not to use the service for any unlawful purpose
                      or to engage in:
                    </p>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          Prohibited Activities
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          <li>• Harassment or abuse of other users</li>
                          <li>• Spam or unsolicited communications</li>
                          <li>• Uploading malicious software</li>
                          <li>• Violating intellectual property rights</li>
                        </ul>
                      </div>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          Data Misuse
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          <li>• Unauthorized data scraping</li>
                          <li>• Sharing credentials with third parties</li>
                          <li>• Attempting to breach security</li>
                          <li>• Reverse engineering the platform</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 5: Payment and Billing */}
                <Card id='payment' className='border-l-4 border-l-green-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <CreditCard className='h-6 w-6 text-green-600' />
                      5. Payment and Billing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                        <h4 className='mb-2 font-semibold text-green-800'>
                          Subscription Terms
                        </h4>
                        <ul className='space-y-1 text-sm text-green-700'>
                          <li>• Monthly or annual billing cycles</li>
                          <li>• Automatic renewal unless cancelled</li>
                          <li>• 14-day free trial for new accounts</li>
                          <li>• No setup or cancellation fees</li>
                        </ul>
                      </div>
                      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                        <h4 className='mb-2 font-semibold text-green-800'>
                          Refund Policy
                        </h4>
                        <ul className='space-y-1 text-sm text-green-700'>
                          <li>• 30-day money-back guarantee</li>
                          <li>• Prorated refunds for downgrades</li>
                          <li>• No refunds for partial months</li>
                          <li>• Processing time: 5-10 business days</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 6: Privacy and Data Protection */}
                <Card id='privacy' className='border-l-4 border-l-blue-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Lock className='h-6 w-6 text-blue-600' />
                      6. Privacy and Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      Your privacy is important to us. Our Privacy Policy, which
                      also governs your use of the service, can be found at{' '}
                      <a
                        href='/privacy'
                        className='text-blue-600 underline hover:text-blue-800'
                      >
                        /privacy
                      </a>
                      . By using our service, you consent to the collection and
                      use of your information as outlined in our Privacy Policy.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 8: Limitation of Liability */}
                <Card
                  id='limitation-liability'
                  className='border-l-4 border-l-orange-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <AlertTriangle className='h-6 w-6 text-orange-600' />
                      8. Limitation of Liability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                      <p className='text-sm text-orange-800'>
                        <strong>Important Notice:</strong> In no event shall
                        Syndik be liable for any indirect, incidental, special,
                        consequential, or punitive damages, including without
                        limitation, loss of profits, data, use, goodwill, or
                        other intangible losses, resulting from your use of the
                        service.
                      </p>
                    </div>
                    <p className='leading-relaxed text-gray-600'>
                      Our total liability to you for any claim arising from
                      these terms or your use of the service shall not exceed
                      the amount you paid us in the twelve months preceding the
                      claim.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 9: Termination */}
                <Card id='termination' className='border-l-4 border-l-gray-500'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Clock className='h-6 w-6 text-gray-600' />
                      9. Termination
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      Either party may terminate this agreement at any time:
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      <div className='flex items-start gap-3 rounded-lg bg-gray-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-gray-500'></div>
                        <span className='text-sm text-gray-700'>
                          You may cancel your subscription at any time
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-gray-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-gray-500'></div>
                        <span className='text-sm text-gray-700'>
                          We may terminate for violation of terms
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-gray-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-gray-500'></div>
                        <span className='text-sm text-gray-700'>
                          Data export available for 30 days post-termination
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-gray-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-gray-500'></div>
                        <span className='text-sm text-gray-700'>
                          Prorated refunds apply where applicable
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 12: Contact Information */}
                <Card
                  id='contact'
                  className='border-l-4 border-l-blue-500 bg-blue-50/50'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Phone className='h-6 w-6 text-blue-600' />
                      12. Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      If you have any questions about these Terms of Service,
                      please contact us:
                    </p>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div className='rounded-lg border border-blue-200 bg-white p-4'>
                        <h4 className='mb-2 font-semibold text-blue-800'>
                          Email Support
                        </h4>
                        <p className='text-sm text-gray-600'>
                          legal@syndik.com
                        </p>
                        <p className='text-sm text-gray-600'>
                          support@syndik.com
                        </p>
                      </div>
                      <div className='rounded-lg border border-blue-200 bg-white p-4'>
                        <h4 className='mb-2 font-semibold text-blue-800'>
                          Phone & Address
                        </h4>
                        <p className='text-sm text-gray-600'>+1-800-SYNDIK</p>
                        <p className='text-sm text-gray-600'>
                          [Company Address]
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Final Notice */}
                <Card className='border-2 border-blue-200 bg-blue-50'>
                  <CardContent className='p-6'>
                    <p className='text-center text-sm text-blue-800'>
                      <strong>Effective Date:</strong> These terms are effective
                      as of January 1, 2025. By continuing to use Syndik after
                      this date, you agree to be bound by these terms.
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
