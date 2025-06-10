import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Terms of Service
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className='py-24'>
        <div className='mx-auto max-w-4xl px-6 lg:px-8'>
          <Card>
            <CardContent className='prose prose-gray max-w-none p-8'>
              <div className='space-y-8'>
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    1. Acceptance of Terms
                  </h2>{' '}
                  <p className='leading-relaxed text-gray-600'>
                    By accessing and using Syndik (&quot;the Service&quot;), you
                    accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above,
                    please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    2. Description of Service
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    Syndik is a Software as a Service (SaaS) platform designed
                    for residential syndicate management. The Service provides
                    tools for property management, financial tracking, resident
                    communication, meeting management, and related
                    administrative functions.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    3. User Accounts and Registration
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      To use certain features of the Service, you must register
                      for an account. When registering, you agree to:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>
                        Provide accurate, current, and complete information
                      </li>
                      <li>
                        Maintain and promptly update your account information
                      </li>
                      <li>
                        Maintain the security of your password and account
                      </li>
                      <li>
                        Accept responsibility for all activities under your
                        account
                      </li>
                      <li>
                        Notify us immediately of any unauthorized use of your
                        account
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    4. Acceptable Use Policy
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      You agree not to use the Service to:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe upon the rights of others</li>
                      <li>Upload or transmit malicious software or code</li>
                      <li>
                        Attempt to gain unauthorized access to the Service or
                        related systems
                      </li>
                      <li>
                        Use the Service for any unlawful or prohibited purpose
                      </li>
                      <li>Interfere with or disrupt the Service or servers</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    5. Data and Privacy
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      Your privacy is important to us. Our collection and use of
                      personal information is governed by our Privacy Policy,
                      which is incorporated into these Terms by reference.
                    </p>
                    <p className='leading-relaxed text-gray-600'>
                      You retain ownership of all data you input into the
                      Service. You grant us a limited license to use, store, and
                      process this data solely for the purpose of providing the
                      Service to you.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    6. Payment Terms
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      If you purchase a paid subscription:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>
                        You agree to pay all fees associated with your chosen
                        plan
                      </li>
                      <li>
                        Payments are due in advance on a monthly or annual basis
                      </li>
                      <li>
                        All fees are non-refundable except as expressly stated
                        in our refund policy
                      </li>
                      <li>We may change our fees with 30 days&apos; notice</li>
                      <li>
                        Failure to pay may result in suspension or termination
                        of your account
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    7. Intellectual Property
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    The Service and its original content, features, and
                    functionality are owned by Syndik and are protected by
                    international copyright, trademark, patent, trade secret,
                    and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    8. Service Availability
                  </h2>
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      We strive to maintain high service availability, but we
                      cannot guarantee that the Service will be available at all
                      times. The Service may be temporarily unavailable due to:
                    </p>
                    <ul className='list-disc space-y-2 pl-6 text-gray-600'>
                      <li>Scheduled maintenance</li>
                      <li>Emergency maintenance</li>
                      <li>Technical difficulties</li>
                      <li>Force majeure events</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    9. Termination
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    Either party may terminate this agreement at any time. Upon
                    termination, your right to use the Service will cease
                    immediately. We will provide you with the ability to export
                    your data for a reasonable period following termination.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    10. Limitation of Liability
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    In no event shall Syndik be liable for any indirect,
                    incidental, special, consequential, or punitive damages,
                    including without limitation, loss of profits, data, use,
                    goodwill, or other intangible losses, resulting from your
                    use of the Service.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    11. Disclaimer of Warranties
                  </h2>{' '}
                  <p className='leading-relaxed text-gray-600'>
                    The Service is provided on an &quot;AS IS&quot; and &quot;AS
                    AVAILABLE&quot; basis. We make no warranties, expressed or
                    implied, and hereby disclaim all warranties, including
                    without limitation, implied warranties of merchantability,
                    fitness for a particular purpose, or non-infringement.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    12. Governing Law
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    These Terms shall be interpreted and governed by the laws of
                    the jurisdiction in which Syndik is incorporated, without
                    regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    13. Changes to Terms
                  </h2>
                  <p className='leading-relaxed text-gray-600'>
                    We reserve the right to modify these Terms at any time. We
                    will notify users of any material changes via email or
                    through the Service. Your continued use of the Service after
                    such modifications constitutes acceptance of the updated
                    Terms.
                  </p>
                </section>

                <section>
                  <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                    14. Contact Information
                  </h2>
                  <div className='space-y-2 text-gray-600'>
                    <p>
                      If you have any questions about these Terms, please
                      contact us:
                    </p>
                    <p>Email: legal@syndik.com</p>
                    <p>Address: [Company Address]</p>
                    <p>Phone: +1-800-SYNDIK</p>
                  </div>
                </section>

                <section className='border-t pt-8'>
                  <p className='text-sm text-gray-500'>
                    By using Syndik, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms of Service.
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
