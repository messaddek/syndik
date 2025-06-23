'use client';

import { Link } from '@/i18n/routing';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  FileText,
  DollarSign,
  BarChart3,
  Bell,
  Database,
  Lock,
  UserCheck,
  Award,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      {/* Background gradient */}
      <div
        className='pointer-events-none absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='relative z-10 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Manage Your Residential Syndicate
            <span className='text-primary'>Effortlessly</span>
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Streamline property management, track finances, organize meetings,
            and enhance resident communication with our comprehensive SaaS
            platform designed specifically for residential syndicates.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button size='lg' className='px-8' asChild>
              <Link href='/sign-up'>
                <div className='flex items-center gap-x-2'>
                  Get Started Free
                  <ArrowRight className='h-4 w-4' />
                </div>
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='px-8' asChild>
              <Link href='/demo'>Watch Demo</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Background gradient bottom */}
      <div
        className='pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};

export const StatsSection = () => {
  const stats = [
    {
      name: 'Residential Syndicates',
      value: '2,500+',
      description: 'Trust Syndik',
    },
    {
      name: 'Units Managed',
      value: '50,000+',
      description: 'Across our platform',
    },
    {
      name: 'Monthly Transactions',
      value: '$2.5M+',
      description: 'Processed securely',
    },
    {
      name: 'User Satisfaction',
      value: '98%',
      description: 'Rating from users',
    },
  ];

  return (
    <div className='bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Trusted by thousands of residential syndicates worldwide
          </h2>
          <p className='mt-4 text-lg leading-8 text-gray-600'>
            Join the growing community of property managers who rely on Syndik
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 text-center sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
          {stats.map(stat => (
            <div key={stat.name} className='flex flex-col-reverse'>
              <dt className='text-base leading-7 text-gray-600'>{stat.name}</dt>
              <dd className='text-2xl leading-9 font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {stat.value}
              </dd>
              <div className='text-sm text-gray-500'>{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      name: 'Building Management',
      description:
        'Efficiently manage multiple buildings, units, and common areas with detailed tracking and maintenance schedules.',
      icon: Building2,
    },
    {
      name: 'Resident Portal',
      description:
        'Provide residents with a dedicated portal to view announcements, submit requests, and communicate effectively.',
      icon: Users,
    },
    {
      name: 'Financial Tracking',
      description:
        'Monitor income, expenses, budgets, and generate comprehensive financial reports with ease.',
      icon: TrendingUp,
    },
    {
      name: 'Secure & Compliant',
      description:
        'Enterprise-grade security with role-based access control and compliance with data protection regulations.',
      icon: Shield,
    },
    {
      name: 'Meeting Management',
      description:
        'Schedule meetings, track attendance, manage agendas, and maintain detailed minutes and voting records.',
      icon: Clock,
    },
    {
      name: 'Automated Workflows',
      description:
        'Streamline routine tasks with automated notifications, reminders, and approval processes.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-primary text-base leading-7 font-semibold'>
            Everything you need
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Comprehensive Syndicate Management
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            All the tools you need to manage your residential syndicate
            efficiently, from financial tracking to resident communication.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map(feature => (
              <div key={feature.name} className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900'>
                  <feature.icon
                    className='text-primary h-5 w-5 flex-none'
                    aria-hidden='true'
                  />
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Sign Up & Setup',
      description:
        'Create your account and configure your syndicate profile with building details and resident information.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Invite Residents',
      description:
        'Send invitations to residents and board members to join your syndicate portal with role-based access.',
      icon: Users,
    },
    {
      step: '03',
      title: 'Manage & Track',
      description:
        'Start managing finances, scheduling meetings, and communicating with residents from one central hub.',
      icon: BarChart3,
    },
    {
      step: '04',
      title: 'Grow & Scale',
      description:
        'Expand your syndicate management with advanced features and integrations as your needs grow.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className='bg-gray-50 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-primary text-base leading-7 font-semibold'>
            How it works
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Get started in minutes
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Setting up your syndicate management system is quick and easy with
            our guided setup process.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4'>
            {steps.map((step, index) => (
              <div
                key={step.step}
                className='flex flex-col items-center text-center'
              >
                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
                  <step.icon className='text-primary h-8 w-8' />
                </div>
                <div className='bg-primary mb-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white'>
                  {step.step}
                </div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {step.title}
                </h3>
                <p className='mt-2 text-sm text-gray-600'>{step.description}</p>
                {index < steps.length - 1 && (
                  <div className='mt-8 hidden lg:block'>
                    <ArrowRight className='h-5 w-5 text-gray-400' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BenefitsSection = () => {
  const benefits = [
    {
      title: 'Save Time',
      description:
        'Reduce administrative overhead by up to 70% with automated workflows and streamlined processes.',
      icon: Clock,
      metric: '70% faster',
    },
    {
      title: 'Reduce Costs',
      description:
        'Lower operational costs through efficient resource management and reduced manual labor.',
      icon: DollarSign,
      metric: '$5K+ saved annually',
    },
    {
      title: 'Improve Communication',
      description:
        'Enhance resident satisfaction with transparent communication and instant notifications.',
      icon: Bell,
      metric: '95% satisfaction rate',
    },
    {
      title: 'Better Organization',
      description:
        'Keep all documents, meetings, and financial records organized and easily accessible.',
      icon: FileText,
      metric: '100% digital records',
    },
  ];

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-primary text-base leading-7 font-semibold'>
            Benefits
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Why syndicates choose Syndik
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Discover the tangible benefits that make Syndik the preferred choice
            for residential syndicate management.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8'>
          {benefits.map(benefit => (
            <Card key={benefit.title} className='border-none shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100'>
                    <benefit.icon className='text-primary h-6 w-6' />
                  </div>
                  <div>
                    <CardTitle className='text-lg'>{benefit.title}</CardTitle>
                    <Badge variant='secondary' className='mt-1'>
                      {benefit.metric}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base'>
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SecuritySection = () => {
  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description:
        'All data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
      icon: Lock,
    },
    {
      title: 'Role-Based Access',
      description:
        'Granular permission controls ensure users only access information relevant to their role.',
      icon: UserCheck,
    },
    {
      title: 'GDPR Compliant',
      description:
        'Full compliance with European data protection regulations and privacy standards.',
      icon: Shield,
    },
    {
      title: 'Regular Backups',
      description:
        'Automated daily backups with point-in-time recovery to ensure your data is always safe.',
      icon: Database,
    },
    {
      title: 'SOC 2 Certified',
      description:
        'Independently audited security controls meeting the highest industry standards.',
      icon: Award,
    },
    {
      title: '24/7 Monitoring',
      description:
        'Continuous security monitoring and threat detection to protect against cyber threats.',
      icon: Globe,
    },
  ];

  return (
    <div className='bg-gray-900 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base leading-7 font-semibold text-blue-400'>
            Security
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Enterprise-grade security you can trust
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            Your syndicate data is protected by the same security measures used
            by Fortune 500 companies.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {securityFeatures.map(feature => (
            <div key={feature.title} className='flex flex-col'>
              <div className='bg-primary mb-6 flex h-12 w-12 items-center justify-center rounded-lg'>
                <feature.icon className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white'>
                {feature.title}
              </h3>
              <p className='mt-2 text-base text-gray-300'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className='mt-16 text-center'>
          <div className='inline-flex items-center space-x-6 rounded-lg bg-gray-800 px-6 py-4'>
            <Shield className='h-8 w-8 text-blue-400' />
            <div className='text-left rtl:text-right'>
              <div className='text-sm font-medium text-white'>
                Security Certified
              </div>
              <div className='text-sm text-gray-400'>
                ISO 27001, SOC 2 Type II, GDPR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      content:
        'Syndik has transformed how we manage our residential complex. The automated workflows and resident portal have significantly improved our efficiency and resident satisfaction.',
      author: {
        name: 'Marie Dubois',
        role: 'Syndicate President',
        company: 'Les Jardins de Paris',
        avatar: 'MD',
      },
    },
    {
      content:
        'The financial tracking features are exceptional. We can now generate detailed reports in minutes instead of hours, and the transparency has improved trust among residents.',
      author: {
        name: 'Ahmed Hassan',
        role: 'Property Manager',
        company: 'Marina Bay Residences',
        avatar: 'AH',
      },
    },
    {
      content:
        'Customer support is outstanding. The team helped us migrate all our data seamlessly and provided training that made adoption smooth for all our board members.',
      author: {
        name: 'Sarah Johnson',
        role: 'Board Secretary',
        company: 'Riverside Commons',
        avatar: 'SJ',
      },
    },
  ];

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-primary text-base leading-7 font-semibold'>
            Testimonials
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Loved by syndicate managers worldwide
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            See what property managers and syndicate boards are saying about
            Syndik.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='border-none shadow-lg'>
              <CardHeader>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-5 w-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <blockquote className='text-base text-gray-600'>
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className='flex items-center space-x-3'>
                  <Avatar>
                    <AvatarFallback className='text-primary bg-blue-100 font-semibold'>
                      {testimonial.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-semibold text-gray-900'>
                      {testimonial.author.name}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {testimonial.author.role}, {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PricingPreviewSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small syndicates',
      features: [
        'Up to 25 units',
        'Basic financial tracking',
        'Resident portal',
        'Email support',
        '14-day free trial',
      ],
      popular: false,
      gradient: 'from-gray-50 to-gray-100',
      buttonGradient: 'from-gray-600 to-gray-700',
      hoverGradient: 'hover:from-gray-700 hover:to-gray-800',
      icon: Building2,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing syndicates',
      features: [
        'Up to 100 units',
        'Advanced reporting',
        'Meeting management',
        'Priority support',
        'Custom workflows',
        'Analytics dashboard',
      ],
      popular: true,
      gradient: 'from-blue-50 to-indigo-50',
      buttonGradient: 'from-blue-600 to-indigo-600',
      hoverGradient: 'hover:from-blue-700 hover:to-indigo-700',
      icon: TrendingUp,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large syndicate groups',
      features: [
        'Unlimited units',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Training included',
        'White-label options',
      ],
      popular: false,
      gradient: 'from-purple-50 to-pink-50',
      buttonGradient: 'from-purple-600 to-pink-600',
      hoverGradient: 'hover:from-purple-700 hover:to-pink-700',
      icon: Shield,
    },
  ];

  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 sm:py-32'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-200/30 to-pink-200/30 blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/10 to-blue-100/20 blur-3xl'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='mb-6 inline-flex items-center rounded-full border border-blue-200/50 bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur-sm'>
            <span className='mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500'></span>
            Trusted by 2,500+ property managers
          </div>
          <h2 className='mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
            Choose Your Perfect Plan
          </h2>
          <p className='mx-auto mb-6 max-w-2xl text-xl leading-8 text-gray-600'>
            Start with our 14-day free trial. No credit card required. Cancel
            anytime.
          </p>
          <div className='inline-flex items-center space-x-2 text-sm text-gray-500'>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>All plans include 24/7 support</span>
            <span className='mx-2'>•</span>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>99.9% uptime SLA</span>
            <span className='mx-2'>•</span>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span>GDPR compliant</span>
          </div>
        </div>

        <div className='mx-auto mt-20 grid max-w-lg grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-3'>
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`group relative overflow-hidden border-0 bg-gradient-to-br ${plan.gradient} backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'scale-105 transform shadow-2xl ring-2 shadow-blue-500/20 ring-blue-500'
                  : 'shadow-lg hover:shadow-xl'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              {plan.popular && (
                <>
                  <div className='absolute -top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500'></div>
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5'></div>
                </>
              )}

              <CardHeader className='relative pb-8 text-center'>
                {plan.popular && (
                  <div className='absolute -top-3 left-1/2 z-10 -translate-x-1/2'>
                    <Badge className='border-0 bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1 text-white shadow-lg'>
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}

                <div className='mt-6'>
                  <div className='mb-4 flex items-center justify-center'>
                    <div
                      className={`rounded-full bg-gradient-to-br p-3 ${plan.popular ? 'from-blue-100 to-indigo-100' : 'from-gray-100 to-gray-200'} shadow-sm`}
                    >
                      <plan.icon
                        className={`h-6 w-6 ${plan.popular ? 'text-primary' : 'text-gray-600'}`}
                      />
                    </div>
                  </div>
                  <CardTitle className='text-2xl font-bold text-gray-900'>
                    {plan.name}
                  </CardTitle>
                  <div className='mt-6 flex items-end justify-center'>
                    <span className='text-5xl font-bold tracking-tight text-gray-900'>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className='ml-1 text-lg font-medium text-gray-500'>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription className='mt-3 text-base text-gray-600'>
                    {plan.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='space-y-6'>
                <ul className='space-y-4'>
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className='group/item flex items-start space-x-3'
                      style={{
                        animationDelay: `${index * 150 + featureIndex * 50}ms`,
                        animation: 'fadeInLeft 0.4s ease-out forwards',
                      }}
                    >
                      <div className='mt-0.5 flex-shrink-0'>
                        <CheckCircle className='h-5 w-5 text-green-500 transition-transform group-hover/item:scale-110' />
                      </div>
                      <span className='text-sm leading-relaxed font-medium text-gray-700'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full transform bg-gradient-to-r ${plan.buttonGradient} ${plan.hoverGradient} text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-offset-2 ${
                    plan.popular ? 'focus:ring-blue-500' : 'focus:ring-gray-500'
                  } border-0 py-3`}
                  asChild
                >
                  <Link
                    href='/sign-up'
                    className='group flex items-center justify-center gap-x-2 font-semibold'
                  >
                    {plan.name === 'Enterprise'
                      ? 'Contact Sales'
                      : 'Start Free Trial'}
                    <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180' />
                  </Link>
                </Button>

                {plan.name !== 'Enterprise' && (
                  <p className='text-center text-xs text-gray-500'>
                    No credit card required
                  </p>
                )}
              </CardContent>

              {/* Hover effect overlay */}
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
            </Card>
          ))}
        </div>

        {/* Additional features highlight */}
        <div className='mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='rounded-lg border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm'>
            <Shield className='text-primary mx-auto mb-2 h-8 w-8' />
            <h4 className='mb-1 font-semibold text-gray-900'>
              Enterprise Security
            </h4>
            <p className='text-sm text-gray-600'>
              SOC 2 certified with end-to-end encryption
            </p>
          </div>
          <div className='rounded-lg border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm'>
            <Globe className='mx-auto mb-2 h-8 w-8 text-green-600' />
            <h4 className='mb-1 font-semibold text-gray-900'>
              Global Availability
            </h4>
            <p className='text-sm text-gray-600'>
              Available in 25+ countries worldwide
            </p>
          </div>
          <div className='rounded-lg border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm'>
            <Award className='mx-auto mb-2 h-8 w-8 text-purple-600' />
            <h4 className='mb-1 font-semibold text-gray-900'>Award Winning</h4>
            <p className='text-sm text-gray-600'>
              Best Property Management Software 2024
            </p>
          </div>
        </div>

        <div className='mt-20 text-center'>
          <div className='mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white/60 p-8 shadow-lg backdrop-blur-sm'>
            <div className='mb-4 flex items-center justify-center'>
              <div className='rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-3'>
                <Users className='text-primary h-6 w-6' />
              </div>
            </div>
            <h3 className='mb-2 text-lg font-semibold text-gray-900'>
              Need a custom solution?
            </h3>
            <p className='mb-6 text-gray-600'>
              We offer tailored plans for large enterprises with specific
              requirements, including custom integrations, dedicated support,
              and white-label options.
            </p>
            <Link
              href='/contact'
              className='group text-primary inline-flex items-center font-semibold transition-colors hover:text-blue-500'
            >
              Contact our sales team
              <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export const CTASection = () => {
  return (
    <div className='relative isolate overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'>
      {/* Background gradient */}
      <div
        className='pointer-events-none absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl'></div>
        <div
          className='absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-white/5 blur-3xl'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-3/4 left-3/4 h-48 w-48 animate-pulse rounded-full bg-white/10 blur-3xl'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className='relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='mb-8 inline-flex items-center space-x-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-400'></span>
            <span>Join 2,500+ syndicates already using Syndik</span>
          </div>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
            Transform Your Syndicate
            <span className='mt-2 block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
              Management Today
            </span>
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-xl leading-8 text-blue-100'>
            Stop juggling spreadsheets, emails, and paperwork. Start managing
            your residential syndicate like a pro with our all-in-one platform.
          </p>
          <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button
              size='lg'
              className='hover:shadow-3xl text-primary min-w-[200px] border-0 bg-white px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50'
              asChild
            >
              <Link href='/sign-up' className='group flex items-center'>
                Start Free Trial
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='min-w-[200px] border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20'
              asChild
            >
              <Link href='/demo' className='group flex items-center gap-x-2'>
                Watch Demo
                <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className='mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3'>
            <div className='space-y-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center justify-center gap-x-2'>
                <Clock className='h-6 w-6 text-yellow-300' />
                <div className='text-2xl font-bold text-white'>14 Days</div>
              </div>
              <div className='text-sm text-blue-100'>Free Trial</div>
            </div>
            <div className='space-y-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center justify-center gap-x-2'>
                <Shield className='h-6 w-6 text-green-300' />
                <div className='text-2xl font-bold text-white'>
                  No Setup Fee
                </div>
              </div>
              <div className='text-sm text-blue-100'>Get Started Instantly</div>
            </div>
            <div className='space-y-2 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center justify-center gap-x-2'>
                <Bell className='h-6 w-6 text-blue-300' />
                <div className='text-2xl font-bold text-white'>
                  24/7 Support
                </div>
              </div>
              <div className='text-sm text-blue-100'>
                We&apos;re Here to Help
              </div>
            </div>
          </div>

          {/* Risk-free guarantee */}
          <div className='mx-auto mt-12 max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm'>
            <div className='mb-3 flex items-center justify-center'>
              <CheckCircle className='mr-2 h-6 w-6 text-green-300' />
              <span className='text-lg font-semibold text-white'>
                Risk-Free Guarantee
              </span>
            </div>
            <p className='text-sm leading-relaxed text-blue-100'>
              No credit card required • Cancel anytime • Money-back guarantee •
              <Link
                href='/pricing'
                className='font-medium underline transition-colors hover:text-yellow-300'
              >
                View pricing details
              </Link>
            </p>
          </div>

          {/* Social proof */}
          <div className='mt-8 flex flex-col items-center justify-center space-y-4 text-blue-100 sm:flex-row sm:space-y-0 sm:space-x-8'>
            <div className='flex items-center space-x-2'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-4 w-4 fill-yellow-300 text-yellow-300'
                  />
                ))}
              </div>
              <span className='text-sm'>4.9/5 on G2</span>
            </div>
            <div className='hidden h-4 w-px bg-white/30 sm:block'></div>
            <div className='flex items-center space-x-2'>
              <Award className='h-4 w-4 text-yellow-300' />
              <span className='text-sm'>Best Property Management 2024</span>
            </div>
            <div className='hidden h-4 w-px bg-white/30 sm:block'></div>
            <div className='flex items-center space-x-2'>
              <Shield className='h-4 w-4 text-green-300' />
              <span className='text-sm'>SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient bottom */}
      <div
        className='pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};
