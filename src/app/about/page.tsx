import { LandingLayout } from '@/components/landing/landing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  Target,
  Award,
  Heart,
  Globe,
  Shield,
  Zap,
  Star,
  MessageCircle,
  BarChart3,
  Calendar,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    {
      name: 'Active Syndicates',
      value: '500+',
      description: 'Properties using our platform',
    },
    {
      name: 'Properties Managed',
      value: '10,000+',
      description: 'Residential units',
    },
    {
      name: 'Satisfied Residents',
      value: '50,000+',
      description: 'Happy community members',
    },
    {
      name: 'Years of Experience',
      value: '5+',
      description: 'In property management tech',
    },
  ];

  const values = [
    {
      name: 'Transparency',
      description:
        'We believe in clear, honest communication and transparent financial management that builds trust within communities.',
      icon: Globe,
    },
    {
      name: 'Innovation',
      description:
        'Continuously improving our platform with cutting-edge technology and user feedback to stay ahead of industry needs.',
      icon: Target,
    },
    {
      name: 'Community',
      description:
        'Building stronger residential communities through better management tools that foster collaboration and engagement.',
      icon: Heart,
    },
    {
      name: 'Excellence',
      description:
        'Committed to delivering the highest quality service and support to our users with 24/7 reliability.',
      icon: Award,
    },
  ];

  const features = [
    {
      name: 'Financial Management',
      description:
        'Complete financial tracking and reporting for syndicate operations.',
      icon: BarChart3,
    },
    {
      name: 'Resident Portal',
      description:
        'Easy-to-use portal for residents to stay connected and informed.',
      icon: Users,
    },
    {
      name: 'Meeting Management',
      description:
        'Streamlined tools for organizing and conducting syndicate meetings.',
      icon: Calendar,
    },
    {
      name: 'Document Storage',
      description:
        'Secure cloud storage for all your important syndicate documents.',
      icon: FileText,
    },
    {
      name: 'Communication Hub',
      description: 'Centralized platform for all syndicate communications.',
      icon: MessageCircle,
    },
    {
      name: 'Security & Privacy',
      description:
        'Enterprise-grade security with GDPR compliance and data protection.',
      icon: Shield,
    },
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Foundation',
      description:
        'Syndik was founded with a vision to modernize residential property management.',
    },
    {
      year: '2020',
      title: 'First Launch',
      description:
        'Released our initial platform serving 50+ syndicates across major cities.',
    },
    {
      year: '2021',
      title: 'Mobile App',
      description:
        'Launched mobile applications for iOS and Android platforms.',
    },
    {
      year: '2022',
      title: 'Scale & Growth',
      description:
        'Expanded to serve 200+ syndicates with enhanced financial modules.',
    },
    {
      year: '2023',
      title: 'AI Integration',
      description:
        'Introduced AI-powered insights and automated reporting features.',
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description:
        'Reached 500+ syndicates and launched in multiple international markets.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former property management executive with 15+ years of industry experience.',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Software architect specializing in enterprise SaaS solutions and scalable systems.',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Product',
      bio: 'UX expert focused on creating intuitive interfaces for property management.',
      image: '/api/placeholder/150/150',
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      bio: 'Full-stack developer with expertise in modern web technologies and cloud infrastructure.',
      image: '/api/placeholder/150/150',
    },
  ];

  return (
    <LandingLayout>
      {' '}
      {/* Hero Section */}
      <div className='bg-gradient-to-br from-blue-50 to-indigo-100 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <Badge className='mb-4' variant='secondary'>
              <Star className='mr-2 h-4 w-4' />
              Trusted by 500+ Syndicates
            </Badge>
            <h1 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl'>
              About Syndik
            </h1>
            <p className='mt-6 text-xl leading-8 text-gray-700'>
              We&apos;re dedicated to revolutionizing residential syndicate
              management through innovative technology, exceptional service, and
              a deep understanding of community needs.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' asChild>
                <Link href='/sign-up'>
                  <Zap className='mr-2 h-4 w-4' />
                  Start Free Trial
                </Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/demo'>
                  <Calendar className='mr-2 h-4 w-4' />
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mission Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center'>
            <div>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Our Mission
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                To empower residential syndicates with modern, intuitive tools
                that simplify property management, enhance transparency, and
                foster stronger community relationships.
              </p>{' '}
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                We understand the unique challenges facing residential
                syndicates today, from financial transparency to resident
                communication. That&apos;s why we&apos;ve built a comprehensive
                platform that addresses these needs with precision and care.
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Building2 className='mx-auto mb-4 h-12 w-12 text-blue-600' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Property Focus
                  </h3>
                  <p className='mt-2 text-sm text-gray-600'>
                    Specialized in residential syndicate management
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Users className='mx-auto mb-4 h-12 w-12 text-blue-600' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Community First
                  </h3>
                  <p className='mt-2 text-sm text-gray-600'>
                    Building stronger residential communities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className='bg-blue-600 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Trusted by Communities Worldwide
            </h2>
            <p className='mt-6 text-lg leading-8 text-blue-100'>
              Our platform has helped hundreds of syndicates manage their
              properties more efficiently.
            </p>
          </div>{' '}
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4'>
            {stats.map(stat => (
              <div key={stat.name} className='text-center'>
                <dd className='mb-2 text-4xl font-bold tracking-tight text-white'>
                  {stat.value}
                </dd>
                <dt className='text-base leading-7 font-semibold text-blue-100'>
                  {stat.name}
                </dt>
                <p className='mt-1 text-sm text-blue-200'>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>{' '}
      {/* Features Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Comprehensive Platform Features
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Everything you need to manage your residential syndicate
              efficiently and effectively.
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'>
            {features.map(feature => (
              <Card
                key={feature.name}
                className='transition-shadow hover:shadow-lg'
              >
                <CardContent className='p-6'>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600'>
                      <feature.icon className='h-6 w-6 text-white' />
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {feature.name}
                    </h3>
                  </div>
                  <p className='text-gray-600'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Values Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our Values
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              The principles that guide everything we do at Syndik.
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2'>
            {values.map(value => (
              <Card key={value.name}>
                <CardContent className='p-8'>
                  <div className='flex items-center gap-4'>
                    <value.icon className='h-8 w-8 text-blue-600' />
                    <h3 className='text-xl font-semibold text-gray-900'>
                      {value.name}
                    </h3>
                  </div>
                  <p className='mt-4 text-gray-600'>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Timeline Section */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-100 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our Journey
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              From a simple idea to a comprehensive platform serving thousands
              of residents.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-4xl'>
            <div className='space-y-8'>
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className='relative flex items-center gap-8'
                >
                  {/* Timeline line */}
                  {index !== timeline.length - 1 && (
                    <div className='absolute top-12 left-8 h-16 w-0.5 bg-blue-200' />
                  )}

                  {/* Year badge */}
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white'>
                    {item.year}
                  </div>

                  {/* Content */}
                  <Card className='flex-1'>
                    <CardContent className='p-6'>
                      <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                        {item.title}
                      </h3>
                      <p className='text-gray-600'>{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Team Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Meet Our Team
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              The passionate experts behind Syndik, dedicated to transforming
              property management.
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2'>
            {team.map(member => (
              <Card
                key={member.name}
                className='transition-shadow hover:shadow-lg'
              >
                <CardContent className='p-8'>
                  <div className='flex items-start gap-6'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600'>
                      <span className='text-xl font-bold text-white'>
                        {member.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900'>
                        {member.name}
                      </h3>
                      <p className='mb-3 font-medium text-blue-600'>
                        {member.role}
                      </p>
                      <p className='text-gray-600'>{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Ready to Get Started?
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Join our community of successful syndicate managers and experience
              the difference.
            </p>{' '}
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' asChild>
                <Link href='/sign-up'>Start Free Trial</Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/contact'>Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
