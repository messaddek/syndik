import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Globe,
  Clock,
  Phone,
} from 'lucide-react';

const sections = [
  { id: 'introduction', title: '1. Introduction', icon: FileText },
  { id: 'information-collect', title: '2. Information We Collect', icon: Eye },
  { id: 'how-we-use', title: '3. How We Use Your Information', icon: Users },
  {
    id: 'sharing-disclosure',
    title: '4. Information Sharing and Disclosure',
    icon: Globe,
  },
  { id: 'data-security', title: '5. Data Security', icon: Shield },
  { id: 'data-retention', title: '6. Data Retention', icon: Clock },
  { id: 'your-rights', title: '7. Your Rights and Choices', icon: Lock },
  { id: 'cookies', title: '8. Cookies and Tracking Technologies', icon: Eye },
  {
    id: 'international',
    title: '9. International Data Transfers',
    icon: Globe,
  },
  { id: 'children', title: "10. Children's Privacy", icon: Users },
  {
    id: 'changes',
    title: '11. Changes to This Privacy Policy',
    icon: FileText,
  },
  { id: 'contact', title: '12. Contact Us', icon: Phone },
];

export default function PrivacyPage() {
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
                <Shield className='h-4 w-4' />
                Privacy & Data Protection
              </Badge>
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Privacy Policy
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Last updated: January 1, 2025
            </p>{' '}
            <p className='mt-4 text-sm text-gray-500'>
              We&apos;re committed to protecting your privacy and being
              transparent about how we handle your data.
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
                {' '}
                {/* Section 1: Introduction */}
                <Card
                  id='introduction'
                  className='border-l-4 border-l-blue-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <FileText className='h-6 w-6 text-blue-600' />
                      1. Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      Syndik (&quot;we,&quot; &quot;our,&quot; or
                      &quot;us&quot;) is committed to protecting your privacy.
                      This Privacy Policy explains how we collect, use,
                      disclose, and safeguard your information when you use our
                      residential syndicate management platform.
                    </p>
                  </CardContent>
                </Card>
                {/* Section 2: Information We Collect */}
                <Card
                  id='information-collect'
                  className='border-l-4 border-l-green-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Eye className='h-6 w-6 text-green-600' />
                      2. Information We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                        Personal Information
                      </h3>
                      <p className='mb-3 leading-relaxed text-gray-600'>
                        We collect information you provide directly to us, such
                        as:
                      </p>
                      <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                          Name, email address, phone number
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                          Syndicate and property information
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                          Financial and payment information
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                          Communication preferences
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                          Account credentials and profile information
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                        Usage Information
                      </h3>
                      <p className='mb-3 leading-relaxed text-gray-600'>
                        We automatically collect certain information about your
                        use of our Service:
                      </p>
                      <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                          IP address and device information
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                          Browser type and operating system
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                          Pages visited and features used
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                          Time and date of access
                        </li>
                        <li className='flex items-center gap-2 text-gray-600'>
                          <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                          Referring website addresses
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>{' '}
                {/* Section 3: How We Use Your Information */}
                <Card
                  id='how-we-use'
                  className='border-l-4 border-l-purple-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Users className='h-6 w-6 text-purple-600' />
                      3. How We Use Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      We use the information we collect to:
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Provide, maintain, and improve our Service
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Process transactions and send related information
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Send administrative and support communications
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Respond to comments, questions, and customer service
                          requests
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Monitor and analyze usage patterns and trends
                        </span>
                      </div>
                      <div className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'>
                        <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                        <span className='text-sm text-gray-700'>
                          Personalize your experience
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Section 5: Data Security */}
                <Card
                  id='data-security'
                  className='border-l-4 border-l-red-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Shield className='h-6 w-6 text-red-600' />
                      5. Data Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      We implement appropriate technical and organizational
                      measures to protect your personal information:
                    </p>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          Technical Measures
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          <li>• Encryption of data in transit and at rest</li>
                          <li>
                            • Access controls and authentication mechanisms
                          </li>
                          <li>• Regular security assessments and updates</li>
                        </ul>
                      </div>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          Organizational Measures
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          <li>• Employee training on data protection</li>
                          <li>• Incident response procedures</li>
                          <li>• Regular compliance audits</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>{' '}
                {/* Section 7: Your Rights */}
                <Card
                  id='your-rights'
                  className='border-l-4 border-l-orange-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Lock className='h-6 w-6 text-orange-600' />
                      7. Your Rights and Choices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      Depending on your location, you may have certain rights
                      regarding your personal information:
                    </p>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <div className='flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                        <span className='text-sm text-gray-700'>
                          Access and receive a copy of your personal information
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                        <span className='text-sm text-gray-700'>
                          Correct inaccurate or incomplete information
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                        <span className='text-sm text-gray-700'>
                          Delete your personal information
                        </span>
                      </div>
                      <div className='flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3'>
                        <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                        <span className='text-sm text-gray-700'>
                          Object to or restrict certain processing activities
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Section 12: Contact Us */}
                <Card
                  id='contact'
                  className='border-l-4 border-l-blue-500 bg-blue-50/50'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Phone className='h-6 w-6 text-blue-600' />
                      12. Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 text-gray-600'>
                      If you have any questions about this Privacy Policy,
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
                          privacy@syndik.com
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
                {/* Acknowledgment */}
                <Card className='border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'>
                  <CardContent className='pt-6'>
                    <p className='text-center text-sm text-gray-600'>
                      <Shield className='mx-auto mb-2 h-5 w-5 text-blue-600' />
                      By using Syndik, you acknowledge that you have read and
                      understood this Privacy Policy.
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
