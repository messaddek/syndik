import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Privacy Policy
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div className='py-24'>
        <div className='mx-auto max-w-4xl px-6 lg:px-8'>
          <Card>
            <CardContent className='prose prose-gray max-w-none p-8'>
              <div className='space-y-8'>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    1. Introduction
                  </h2>{' '}
                  <p className='leading-relaxed text-gray-600'>
                    Syndik (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                    is committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your
                    information when you use our residential syndicate
                    management platform.
                  </p>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    2. Information We Collect
                  </h2>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Personal Information
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      We collect information you provide directly to us, such
                      as:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>Name, email address, phone number</li>
                      <li>Syndicate and property information</li>
                      <li>Financial and payment information</li>
                      <li>Communication preferences</li>
                      <li>Account credentials and profile information</li>
                    </ul>

                    <h3 className='mt-6 text-lg font-semibold text-gray-900'>
                      Usage Information
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      We automatically collect certain information about your
                      use of our Service:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>IP address and device information</li>
                      <li>Browser type and operating system</li>
                      <li>Pages visited and features used</li>
                      <li>Time and date of access</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    3. How We Use Your Information
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      We use the information we collect to:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>Provide, maintain, and improve our Service</li>
                      <li>Process transactions and send related information</li>
                      <li>Send administrative and support communications</li>
                      <li>
                        Respond to comments, questions, and customer service
                        requests
                      </li>
                      <li>Monitor and analyze usage patterns and trends</li>
                      <li>Personalize your experience</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    4. Information Sharing and Disclosure
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties except as described below:
                    </p>

                    <h3 className='text-lg font-semibold text-gray-900'>
                      Service Providers
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      We may share information with trusted third-party service
                      providers who assist us in operating our platform, such as
                      hosting, payment processing, and customer support
                      services.
                    </p>

                    <h3 className='text-lg font-semibold text-gray-900'>
                      Legal Requirements
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      We may disclose information if required by law or in
                      response to valid legal requests, such as subpoenas or
                      court orders.
                    </p>

                    <h3 className='text-lg font-semibold text-gray-900'>
                      Business Transfers
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      In the event of a merger, acquisition, or sale of assets,
                      user information may be transferred as part of the
                      transaction.
                    </p>
                  </div>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    5. Data Security
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      We implement appropriate technical and organizational
                      measures to protect your personal information:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and updates</li>
                      <li>Access controls and authentication mechanisms</li>
                      <li>Employee training on data protection</li>
                      <li>Incident response procedures</li>
                    </ul>
                  </div>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    6. Data Retention
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    We retain your personal information for as long as necessary
                    to provide our services and comply with legal obligations.
                    When you delete your account, we will delete or anonymize
                    your personal information within a reasonable timeframe,
                    except where retention is required by law.
                  </p>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    7. Your Rights and Choices
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      Depending on your location, you may have certain rights
                      regarding your personal information:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>
                        Access and receive a copy of your personal information
                      </li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your personal information</li>
                      <li>
                        Object to or restrict certain processing activities
                      </li>
                      <li>Data portability</li>
                      <li>
                        Withdraw consent where processing is based on consent
                      </li>
                    </ul>
                  </div>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    8. Cookies and Tracking Technologies
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      We use cookies and similar tracking technologies to
                      enhance your experience:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>Essential cookies for platform functionality</li>
                      <li>Analytics cookies to understand usage patterns</li>
                      <li>Preference cookies to remember your settings</li>
                    </ul>
                    <p className='leading-relaxed text-gray-600'>
                      You can control cookie settings through your browser
                      preferences.
                    </p>
                  </div>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    9. International Data Transfers
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    Your information may be transferred to and processed in
                    countries other than your own. We ensure appropriate
                    safeguards are in place to protect your information in
                    accordance with this Privacy Policy and applicable laws.
                  </p>
                </section>{' '}
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    10. Children&apos;s Privacy
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    Our Service is not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If we become aware that we have collected
                    such information, we will take steps to delete it promptly.
                  </p>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    11. Changes to This Privacy Policy
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    {' '}
                    We may update this Privacy Policy from time to time. We will
                    notify you of any material changes by posting the new
                    Privacy Policy on this page and updating the &quot;Last
                    updated&quot; date. Your continued use of the Service after
                    such changes constitutes acceptance of the updated Privacy
                    Policy.
                  </p>
                </section>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    12. Contact Us
                  </h2>
                  <div className='space-y-2 text-gray-600'>
                    <p>
                      If you have any questions about this Privacy Policy,
                      please contact us:
                    </p>
                    <p>Email: privacy@syndik.com</p>
                    <p>Address: [Company Address]</p>
                    <p>Phone: +1-800-SYNDIK</p>
                  </div>
                </section>
                <section className='border-t pt-8'>
                  <p className='text-sm text-gray-500'>
                    By using Syndik, you acknowledge that you have read and
                    understood this Privacy Policy.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
}
