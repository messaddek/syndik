import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  Mail,
  CreditCard,
  DollarSign,
  Shield,
  Smartphone,
  Calendar,
} from 'lucide-react';
import ArticleLayout from '@/modules/articles/components/article-layout';

const ProcessingPaymentsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'payment-methods', title: 'Payment Methods', level: 1 },
    { id: 'manual-payments', title: 'Manual Payment Entry', level: 1 },
    { id: 'automated-processing', title: 'Automated Processing', level: 1 },
    { id: 'payment-reconciliation', title: 'Payment Reconciliation', level: 1 },
    { id: 'security-compliance', title: 'Security & Compliance', level: 1 },
    { id: 'troubleshooting', title: 'Troubleshooting', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Setting Up Rent Collection',
      href: '/user-guide/financial-management/setting-up-rent-collection',
      time: '7 min',
    },
    {
      title: 'Late Payment Management',
      href: '/user-guide/financial-management/late-payment-management',
      time: '5 min',
    },
    {
      title: 'Generating Financial Reports',
      href: '/user-guide/financial-management/generating-financial-reports',
      time: '6 min',
    },
  ];

  return (
    <ArticleLayout
      articleSlug='processing-payments'
      title='Processing Payments'
    >
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
                href='/user-guide#financial-management'
                className='hover:text-gray-900'
              >
                Financial Management
              </Link>
              <ChevronRight className='h-4 w-4' />
              <span className='font-medium text-gray-900'>
                Processing Payments
              </span>
            </div>
          </nav>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Main Content */}
            <div className='lg:col-span-3'>
              {/* Header */}
              <div className='mb-8'>
                <div className='mb-4 flex items-center space-x-3'>
                  <div className='rounded-lg bg-orange-500 p-2'>
                    <CreditCard className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold text-gray-900'>
                      Processing Payments
                    </h1>
                    <div className='mt-2 flex items-center space-x-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>4 min read</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>Financial staff</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-lg text-gray-600'>
                  Efficiently process rent and other payments with secure,
                  automated workflows that streamline financial operations.
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
                      Syndik&apos;s payment processing system handles multiple
                      payment types and methods while maintaining security and
                      compliance standards. From automated rent collection to
                      manual payment entry, all transactions are tracked and
                      reconciled automatically.
                    </p>
                    <div className='rounded-lg bg-blue-50 p-4'>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='mt-0.5 h-5 w-5 text-blue-600' />
                        <div>
                          <h4 className='font-medium text-blue-900'>
                            Payment Types Supported
                          </h4>
                          <ul className='mt-2 space-y-1 text-sm text-blue-800'>
                            <li>
                              • Rent payments (monthly, quarterly, annual)
                            </li>
                            <li>• Security deposits and fees</li>
                            <li>• Utility payments and reimbursements</li>
                            <li>• Late fees and penalties</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Payment Methods */}
              <section id='payment-methods' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Payment Methods
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                      <div className='space-y-4'>
                        <div className='text-center'>
                          <div className='mx-auto mb-3 h-12 w-12 rounded-full bg-blue-100 p-3'>
                            <CreditCard className='h-6 w-6 text-blue-600' />
                          </div>
                          <h3 className='font-medium text-gray-900'>
                            Credit/Debit Cards
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Visa, Mastercard, American Express, Discover
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            Instant processing
                          </div>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <div className='text-center'>
                          <div className='mx-auto mb-3 h-12 w-12 rounded-full bg-green-100 p-3'>
                            <DollarSign className='h-6 w-6 text-green-600' />
                          </div>
                          <h3 className='font-medium text-gray-900'>
                            ACH/Bank Transfer
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Direct bank account transfers
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            Lower fees
                          </div>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <div className='text-center'>
                          <div className='mx-auto mb-3 h-12 w-12 rounded-full bg-purple-100 p-3'>
                            <Smartphone className='h-6 w-6 text-purple-600' />
                          </div>
                          <h3 className='font-medium text-gray-900'>
                            Digital Wallets
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Apple Pay, Google Pay, PayPal
                          </p>
                          <div className='mt-2 text-xs font-medium text-green-600'>
                            Convenient & secure
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 rounded-lg bg-gray-50 p-4'>
                      <h4 className='mb-2 font-medium text-gray-900'>
                        Processing Times
                      </h4>
                      <div className='grid grid-cols-1 gap-3 text-sm md:grid-cols-3'>
                        <div>
                          <span className='font-medium'>Credit/Debit:</span>{' '}
                          Instant
                        </div>
                        <div>
                          <span className='font-medium'>ACH:</span> 1-3 business
                          days
                        </div>
                        <div>
                          <span className='font-medium'>Digital Wallets:</span>{' '}
                          Instant
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Manual Payment Entry */}
              <section id='manual-payments' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Manual Payment Entry
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div>
                        <h3 className='mb-3 text-lg font-medium text-gray-900'>
                          Recording Cash/Check Payments
                        </h3>
                        <div className='rounded-lg bg-gray-50 p-4'>
                          <ol className='space-y-3 text-sm text-gray-700'>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white'>
                                1
                              </span>
                              <span>
                                Navigate to Residents → Select tenant → Payments
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white'>
                                2
                              </span>
                              <span>
                                Click &ldquo;Record Payment&rdquo; button
                              </span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white'>
                                3
                              </span>
                              <span>Select payment type and method</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white'>
                                4
                              </span>
                              <span>Enter amount and reference number</span>
                            </li>
                            <li className='flex items-start space-x-2'>
                              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white'>
                                5
                              </span>
                              <span>Add notes and save payment</span>
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Payment Allocation
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>
                                Automatic allocation to oldest charges
                              </span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Manual allocation override available</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Partial payment handling</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Overpayment credit tracking</span>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Required Information
                          </h3>
                          <div className='space-y-3'>
                            <div className='border-l-4 border-blue-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Payment Details
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Amount, date, method, reference number
                              </p>
                            </div>
                            <div className='border-l-4 border-green-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Documentation
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Check images, receipt scans, notes
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Automated Processing */}
              <section id='automated-processing' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Automated Processing
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='rounded-lg bg-green-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <Calendar className='mt-0.5 h-5 w-5 text-green-600' />
                          <div>
                            <h4 className='font-medium text-green-900'>
                              Automatic Recurring Payments
                            </h4>
                            <p className='text-sm text-green-800'>
                              Set up auto-pay for tenants to ensure timely rent
                              collection and reduce administrative overhead.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Auto-pay Setup
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Tenant-initiated enrollment</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Flexible payment dates</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Payment method preferences</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Easy cancellation options</span>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Processing Features
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Retry logic for failed payments</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Automatic notifications</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Real-time status updates</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Exception handling alerts</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div className='rounded-lg border bg-blue-50 p-4'>
                          <h4 className='mb-2 font-medium text-blue-900'>
                            Success Rate
                          </h4>
                          <div className='text-2xl font-bold text-blue-800'>
                            98.5%
                          </div>
                          <p className='text-sm text-blue-700'>
                            Auto-pay completion rate
                          </p>
                        </div>
                        <div className='rounded-lg border bg-green-50 p-4'>
                          <h4 className='mb-2 font-medium text-green-900'>
                            Time Saved
                          </h4>
                          <div className='text-2xl font-bold text-green-800'>
                            75%
                          </div>
                          <p className='text-sm text-green-700'>
                            Reduction in manual entry
                          </p>
                        </div>
                        <div className='rounded-lg border bg-purple-50 p-4'>
                          <h4 className='mb-2 font-medium text-purple-900'>
                            Collection Rate
                          </h4>
                          <div className='text-2xl font-bold text-purple-800'>
                            99.2%
                          </div>
                          <p className='text-sm text-purple-700'>
                            On-time payment rate
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Payment Reconciliation */}
              <section id='payment-reconciliation' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Payment Reconciliation
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <p className='text-gray-700'>
                        Automatic reconciliation ensures all payments are
                        properly matched and accounted for in your financial
                        records.
                      </p>

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Automatic Matching
                          </h3>
                          <div className='space-y-3'>
                            <div className='border-l-4 border-green-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Bank Integration
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Direct connection to bank accounts for real-time
                                matching
                              </p>
                            </div>
                            <div className='border-l-4 border-blue-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Smart Recognition
                              </h4>
                              <p className='text-sm text-gray-600'>
                                AI-powered transaction matching by amount and
                                timing
                              </p>
                            </div>
                            <div className='border-l-4 border-purple-500 pl-4'>
                              <h4 className='font-medium text-gray-900'>
                                Exception Handling
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Flags discrepancies for manual review
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Reconciliation Reports
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Daily reconciliation summaries</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Unmatched transaction alerts</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Month-end reconciliation reports</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Audit trail documentation</span>
                            </div>
                          </div>
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
                      <div className='rounded-lg bg-red-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <Shield className='mt-0.5 h-5 w-5 text-red-600' />
                          <div>
                            <h4 className='font-medium text-red-900'>
                              Enterprise Security
                            </h4>
                            <p className='text-sm text-red-800'>
                              All payment processing meets or exceeds industry
                              security standards with end-to-end encryption and
                              fraud protection.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Security Standards
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>PCI DSS Level 1 compliance</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>256-bit SSL encryption</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>Tokenized payment data</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Shield className='h-4 w-4 text-blue-500' />
                              <span>Multi-factor authentication</span>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Fraud Protection
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Real-time fraud monitoring</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Velocity and pattern analysis</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Automatic risk scoring</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Chargeback protection</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Troubleshooting */}
              <section id='troubleshooting' className='mb-8'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Troubleshooting
                </h2>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Common Issues
                          </h3>
                          <div className='space-y-3'>
                            <div className='rounded-lg border p-3'>
                              <h4 className='mb-1 font-medium text-gray-900'>
                                Failed Payments
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Check bank details, insufficient funds, or
                                expired cards
                              </p>
                            </div>
                            <div className='rounded-lg border p-3'>
                              <h4 className='mb-1 font-medium text-gray-900'>
                                Duplicate Charges
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Review transaction logs and contact payment
                                processor
                              </p>
                            </div>
                            <div className='rounded-lg border p-3'>
                              <h4 className='mb-1 font-medium text-gray-900'>
                                Missing Payments
                              </h4>
                              <p className='text-sm text-gray-600'>
                                Verify bank deposits and reconciliation status
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            Resolution Steps
                          </h3>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Check payment status in dashboard</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Review transaction history</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Verify tenant payment information</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <CheckCircle className='h-4 w-4 text-green-500' />
                              <span>Contact support if needed</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='rounded-lg bg-yellow-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertTriangle className='mt-0.5 h-5 w-5 text-yellow-600' />
                          <div>
                            <h4 className='font-medium text-yellow-900'>
                              Best Practices for Issue Prevention
                            </h4>
                            <ul className='mt-2 space-y-1 text-sm text-yellow-800'>
                              <li>• Regular reconciliation checks</li>
                              <li>• Keep tenant payment information updated</li>
                              <li>• Monitor failed payment reports daily</li>
                              <li>
                                • Maintain clear communication with tenants
                              </li>
                            </ul>
                          </div>
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
    </ArticleLayout>
  );
};

export default ProcessingPaymentsPage;
