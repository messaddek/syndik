import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleLayout from '@/modules/articles/components/article-layout';
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  Mail,
  Users,
  FileText,
} from 'lucide-react';

const SettingUpRentCollectionPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'payment-methods', title: 'Payment Methods Setup', level: 1 },
    { id: 'rent-schedules', title: 'Rent Schedules', level: 1 },
    { id: 'automatic-collection', title: 'Automatic Collection', level: 1 },
    { id: 'late-fees', title: 'Late Fees & Penalties', level: 1 },
    { id: 'notifications', title: 'Payment Notifications', level: 1 },
    { id: 'troubleshooting', title: 'Troubleshooting', level: 1 },
  ];

  const relatedArticles = [
    {
      title: 'Processing Payments',
      href: '/user-guide/financial-management/processing-payments',
      time: '4 min',
    },
    {
      title: 'Generating Financial Reports',
      href: '/user-guide/financial-management/generating-financial-reports',
      time: '6 min',
    },
    {
      title: 'Late Payment Management',
      href: '/user-guide/financial-management/late-payment-management',
      time: '5 min',
    },
  ];
  return (
    <ArticleLayout
      articleSlug='setting-up-rent-collection'
      title='Setting Up Rent Collection'
    >
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
            Financial Management
          </Link>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900'>Setting Up Rent Collection</span>
        </div>
      </nav>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='rounded-lg border bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b p-6'>
              <div className='mb-4 flex items-center space-x-3'>
                <div className='rounded-lg bg-orange-500 p-2'>
                  <DollarSign className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    Setting Up Rent Collection
                  </h1>
                  <div className='mt-2 flex items-center space-x-4'>
                    <Badge variant='secondary'>Financial Management</Badge>
                    <Badge variant='outline'>Popular</Badge>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>7 min read</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-lg text-gray-600'>
                Configure automated rent collection in Syndik to streamline
                payments, reduce late fees, and improve cash flow management for
                your properties.
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
                  Automated rent collection is one of the most valuable features
                  in Syndik, allowing you to reduce administrative work while
                  ensuring consistent, timely rent payments from residents.
                </p>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <Card className='border-green-200 bg-green-50'>
                    <CardContent className='p-4 text-center'>
                      <TrendingUp className='mx-auto mb-2 h-8 w-8 text-green-600' />
                      <h3 className='font-medium text-green-800'>
                        98% Collection Rate
                      </h3>
                      <p className='text-sm text-green-700'>
                        Average with automated setup
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='border-blue-200 bg-blue-50'>
                    <CardContent className='p-4 text-center'>
                      <Clock className='mx-auto mb-2 h-8 w-8 text-blue-600' />
                      <h3 className='font-medium text-blue-800'>
                        75% Time Saved
                      </h3>
                      <p className='text-sm text-blue-700'>
                        On payment processing
                      </p>
                    </CardContent>
                  </Card>

                  <Card className='border-purple-200 bg-purple-50'>
                    <CardContent className='p-4 text-center'>
                      <CheckCircle className='mx-auto mb-2 h-8 w-8 text-purple-600' />
                      <h3 className='font-medium text-purple-800'>
                        24/7 Availability
                      </h3>
                      <p className='text-sm text-purple-700'>
                        Residents can pay anytime
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Payment Methods */}
              <section id='payment-methods'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Payment Methods Setup
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure multiple payment options to accommodate different
                  resident preferences:
                </p>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2'>
                        <CreditCard className='h-5 w-5 text-blue-500' />
                        <span>Electronic Payments</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center space-x-2'>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                          <span className='text-sm'>
                            ACH/Bank Transfer (recommended)
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                          <span className='text-sm'>Credit/Debit Cards</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>
                            Digital Wallets (PayPal, Apple Pay)
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>
                            Cryptocurrency (Bitcoin, Ethereum)
                          </span>
                        </div>
                      </div>
                      <div className='mt-4 rounded-lg bg-blue-50 p-3'>
                        <p className='text-xs text-blue-700'>
                          <strong>Note:</strong> ACH transfers have the lowest
                          fees and are preferred for recurring payments.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2'>
                        <FileText className='h-5 w-5 text-green-500' />
                        <span>Traditional Methods</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Check by Mail</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Money Order</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Cash (in-person only)</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <input type='checkbox' className='rounded' />
                          <span className='text-sm'>Cashier&apos;s Check</span>
                        </div>
                      </div>
                      <div className='mt-4 rounded-lg bg-amber-50 p-3'>
                        <p className='text-xs text-amber-700'>
                          <strong>Warning:</strong> Traditional methods require
                          manual processing and increase administrative work.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className='mt-6'>
                  <CardHeader>
                    <CardTitle>Payment Processing Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='overflow-x-auto'>
                      <table className='w-full text-sm'>
                        <thead>
                          <tr className='border-b'>
                            <th className='py-2 text-left'>Payment Method</th>
                            <th className='py-2 text-left'>Processing Fee</th>
                            <th className='py-2 text-left'>Who Pays</th>
                            <th className='py-2 text-left'>Processing Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='border-b'>
                            <td className='py-2'>ACH/Bank Transfer</td>
                            <td className='py-2'>$2.95 flat</td>
                            <td className='py-2'>Configurable</td>
                            <td className='py-2'>1-2 business days</td>
                          </tr>
                          <tr className='border-b'>
                            <td className='py-2'>Debit Card</td>
                            <td className='py-2'>2.95% + $0.30</td>
                            <td className='py-2'>Configurable</td>
                            <td className='py-2'>Instant</td>
                          </tr>
                          <tr className='border-b'>
                            <td className='py-2'>Credit Card</td>
                            <td className='py-2'>3.5% + $0.30</td>
                            <td className='py-2'>Resident</td>
                            <td className='py-2'>Instant</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Rent Schedules */}
              <section id='rent-schedules'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Rent Schedules
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure when and how often rent is collected from residents:
                </p>

                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2'>
                        <Calendar className='h-5 w-5 text-purple-500' />
                        <span>Payment Frequency Options</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            Standard Options
                          </h4>
                          <div className='space-y-2'>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                name='frequency'
                                className='rounded-full'
                                defaultChecked
                              />
                              <span className='text-sm'>
                                Monthly (1st of month)
                              </span>
                            </label>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                name='frequency'
                                className='rounded-full'
                              />
                              <span className='text-sm'>
                                Bi-weekly (every 2 weeks)
                              </span>
                            </label>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                name='frequency'
                                className='rounded-full'
                              />
                              <span className='text-sm'>Weekly</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className='mb-2 font-medium text-gray-900'>
                            Custom Options
                          </h4>
                          <div className='space-y-2'>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                name='frequency'
                                className='rounded-full'
                              />
                              <span className='text-sm'>
                                Custom monthly date
                              </span>
                            </label>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                name='frequency'
                                className='rounded-full'
                              />
                              <span className='text-sm'>
                                Lease anniversary date
                              </span>
                            </label>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                name='frequency'
                                className='rounded-full'
                              />
                              <span className='text-sm'>
                                Split payments (2x per month)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Grace Period & Due Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div>
                          <label className='mb-1 block text-sm font-medium text-gray-700'>
                            Due Date
                          </label>
                          <select className='w-full rounded-md border p-2 text-sm'>
                            <option>1st of month</option>
                            <option>5th of month</option>
                            <option>15th of month</option>
                            <option>Custom date</option>
                          </select>
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium text-gray-700'>
                            Grace Period
                          </label>
                          <select className='w-full rounded-md border p-2 text-sm'>
                            <option>No grace period</option>
                            <option>3 days</option>
                            <option>5 days</option>
                            <option>10 days</option>
                          </select>
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium text-gray-700'>
                            Late Fee Date
                          </label>
                          <select className='w-full rounded-md border p-2 text-sm'>
                            <option>After grace period</option>
                            <option>Immediately after due date</option>
                            <option>Custom schedule</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Automatic Collection */}
              <section id='automatic-collection'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Automatic Collection
                </h2>
                <p className='mb-4 text-gray-700'>
                  Set up autopay to automatically collect rent from residents
                  who opt in:
                </p>

                <div className='space-y-6'>
                  <Card className='border-green-200 bg-green-50'>
                    <CardHeader>
                      <CardTitle className='flex items-center space-x-2'>
                        <CheckCircle className='h-5 w-5 text-green-600' />
                        <span>AutoPay Benefits</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <h4 className='mb-2 font-medium text-green-800'>
                            For Property Managers:
                          </h4>
                          <ul className='space-y-1 text-sm text-green-700'>
                            <li>• Guaranteed on-time payments</li>
                            <li>• Reduced administrative work</li>
                            <li>• Improved cash flow predictability</li>
                            <li>• Lower late payment rates</li>
                            <li>• Automatic reconciliation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='mb-2 font-medium text-green-800'>
                            For Residents:
                          </h4>
                          <ul className='space-y-1 text-sm text-green-700'>
                            <li>• Never miss a payment</li>
                            <li>• Potential AutoPay discounts</li>
                            <li>• Convenient and hassle-free</li>
                            <li>• Automatic payment confirmations</li>
                            <li>• Better rental payment history</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AutoPay Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                          <div>
                            <label className='mb-1 block text-sm font-medium text-gray-700'>
                              Collection Date
                            </label>
                            <select className='w-full rounded-md border p-2 text-sm'>
                              <option>Same as due date</option>
                              <option>3 days before due date</option>
                              <option>5 days before due date</option>
                              <option>Custom offset</option>
                            </select>
                          </div>
                          <div>
                            <label className='mb-1 block text-sm font-medium text-gray-700'>
                              Preferred Payment Method
                            </label>
                            <select className='w-full rounded-md border p-2 text-sm'>
                              <option>ACH (recommended)</option>
                              <option>Debit card</option>
                              <option>Let resident choose</option>
                            </select>
                          </div>
                        </div>

                        <div className='space-y-3'>
                          <div className='flex items-center space-x-2'>
                            <input
                              type='checkbox'
                              className='rounded'
                              defaultChecked
                            />
                            <span className='text-sm'>
                              Send payment confirmation emails
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input
                              type='checkbox'
                              className='rounded'
                              defaultChecked
                            />
                            <span className='text-sm'>
                              Send payment reminders 3 days before
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm'>
                              Offer AutoPay discount (specify amount)
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input
                              type='checkbox'
                              className='rounded'
                              defaultChecked
                            />
                            <span className='text-sm'>
                              Allow residents to pause AutoPay temporarily
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Late Fees */}
              <section id='late-fees'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Late Fees & Penalties
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure late fees and penalty structures to encourage timely
                  payments:
                </p>

                <Card>
                  <CardHeader>
                    <CardTitle>Late Fee Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <label className='mb-1 block text-sm font-medium text-gray-700'>
                            Late Fee Type
                          </label>
                          <select className='w-full rounded-md border p-2 text-sm'>
                            <option>Flat fee</option>
                            <option>Percentage of rent</option>
                            <option>Progressive (increases over time)</option>
                            <option>Per day after due date</option>
                          </select>
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium text-gray-700'>
                            Fee Amount
                          </label>
                          <input
                            type='text'
                            placeholder='$75.00'
                            className='w-full rounded-md border p-2 text-sm'
                          />
                        </div>
                      </div>

                      <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
                        <div className='flex items-start space-x-3'>
                          <AlertCircle className='mt-0.5 h-5 w-5 text-amber-600' />
                          <div>
                            <p className='font-medium text-amber-800'>
                              Legal Compliance
                            </p>
                            <p className='mt-1 text-sm text-amber-700'>
                              Late fees must comply with local and state
                              regulations. Some jurisdictions limit the maximum
                              late fee amount or require specific notice
                              periods.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-900'>
                          Additional Options
                        </h4>
                        <div className='space-y-2'>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm'>
                              Cap maximum late fees per month
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input
                              type='checkbox'
                              className='rounded'
                              defaultChecked
                            />
                            <span className='text-sm'>
                              Waive late fees for first-time occurrences
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input type='checkbox' className='rounded' />
                            <span className='text-sm'>
                              Allow payment plans for large late fees
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <input
                              type='checkbox'
                              className='rounded'
                              defaultChecked
                            />
                            <span className='text-sm'>
                              Send late fee notices automatically
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* Notifications */}
              <section id='notifications'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Payment Notifications
                </h2>
                <p className='mb-4 text-gray-700'>
                  Configure automated notifications to keep residents informed
                  about payments:
                </p>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Reminder Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            7 days before due date
                          </span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            3 days before due date
                          </span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>1 day before due date</span>
                          <input type='checkbox' className='rounded' />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Day of due date</span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Confirmations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Payment received</span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Payment processed</span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Payment failed</span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Receipt generation</span>
                          <input
                            type='checkbox'
                            className='rounded'
                            defaultChecked
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
              {/* Troubleshooting */}
              <section id='troubleshooting'>
                <h2 className='mb-4 text-2xl font-semibold text-gray-900'>
                  Troubleshooting
                </h2>
                <div className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Common Issues & Solutions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Payment Processing Delays
                          </h4>
                          <p className='mt-1 text-sm text-gray-600'>
                            ACH payments can take 1-3 business days. Set
                            collection dates accordingly and inform residents
                            about processing times.
                          </p>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Failed AutoPay Attempts
                          </h4>
                          <p className='mt-1 text-sm text-gray-600'>
                            Automatically retry failed payments after 2-3 days.
                            Send notifications to residents about payment
                            failures and request updated payment information.
                          </p>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Partial Payments
                          </h4>
                          <p className='mt-1 text-sm text-gray-600'>
                            Configure whether to accept partial payments and how
                            to handle remaining balances. Set up automatic
                            payment plans if needed.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>{' '}
              {/* Navigation */}
              <div className='flex items-center justify-between border-t pt-8'>
                <Button
                  variant='outline'
                  className='flex items-center space-x-2'
                  asChild
                >
                  <Link href='/user-guide'>
                    <ArrowLeft className='h-4 w-4' />
                    <span>Back to User Guide</span>
                  </Link>
                </Button>

                <Button className='flex items-center space-x-2' asChild>
                  <Link href='/user-guide/financial-management/processing-payments'>
                    <span>Next: Processing Payments</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
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
                      className={`block text-sm transition-colors hover:text-blue-600 ${
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
            </Card>{' '}
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default SettingUpRentCollectionPage;
