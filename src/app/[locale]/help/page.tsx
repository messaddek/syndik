import { LandingLayout } from '@/components/landing/landing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Book,
  Video,
  FileText,
  Users,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function HelpPage() {
  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: 'Available 24/7',
      action: 'Start Chat',
      href: '#chat',
    },
    {
      title: 'Email Support',
      description: 'Send us detailed questions and get comprehensive answers',
      icon: Mail,
      availability: 'Response within 24 hours',
      action: 'Send Email',
      href: 'mailto:support@syndik.com',
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      icon: Phone,
      availability: 'Mon-Fri, 9AM-6PM',
      action: 'Call Us',
      href: 'tel:+1-800-SYNDIK',
    },
    {
      title: 'Schedule Demo',
      description: 'Book a personalized demo with our team',
      icon: Video,
      availability: 'Flexible scheduling',
      action: 'Book Demo',
      href: '/demo',
    },
  ];

  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation',
      icon: Book,
      items: ['User Guides', 'Admin Manual', 'API Reference', 'Best Practices'],
      href: '/docs',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: Video,
      items: [
        'Getting Started',
        'Managing Residents',
        'Financial Reports',
        'Meeting Setup',
      ],
      href: '/tutorials',
    },
    {
      title: 'Knowledge Base',
      description: 'Searchable collection of articles and solutions',
      icon: FileText,
      items: [
        'Troubleshooting',
        'Feature Guides',
        'Integration Help',
        'Migration Tips',
      ],
      href: '/knowledge-base',
    },
    {
      title: 'Community Forum',
      description: 'Connect with other Syndik users and share experiences',
      icon: Users,
      items: [
        'User Discussions',
        'Feature Requests',
        'Success Stories',
        'Tips & Tricks',
      ],
      href: '/community',
    },
  ];

  return (
    <LandingLayout>
      {/* Hero Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Help & Support
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              We&apos;re here to help you get the most out of Syndik. Find
              answers, get support, and learn how to optimize your syndicate
              management.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='py-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {supportOptions.map(option => (
              <Card
                key={option.title}
                className='transition-shadow hover:shadow-lg'
              >
                <CardContent className='p-6'>
                  <div className='mb-4 flex items-center gap-3'>
                    <option.icon className='h-6 w-6 text-blue-600' />
                    <h3 className='font-semibold text-gray-900'>
                      {option.title}
                    </h3>
                  </div>
                  <p className='mb-3 text-sm text-gray-600'>
                    {option.description}
                  </p>
                  <p className='mb-4 flex items-center gap-1 text-xs text-gray-500'>
                    <Clock className='h-3 w-3' />
                    {option.availability}
                  </p>
                  <Link href={option.href}>
                    <Button size='sm' className='w-full'>
                      {option.action}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl'>
            <div className='mb-12 text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Send Us a Message
              </h2>
              <p className='mt-4 text-lg text-gray-600'>
                Can&apos;t find what you&apos;re looking for? Send us a detailed
                message and we&apos;ll get back to you quickly.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input id='firstName' placeholder='Enter your first name' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input id='lastName' placeholder='Enter your last name' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email address'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='subject'>Subject</Label>
                  <Input
                    id='subject'
                    placeholder='What can we help you with?'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    placeholder='Please describe your question or issue in detail...'
                    rows={6}
                  />
                </div>
                <Button className='w-full'>
                  Send Message
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto mb-16 max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Self-Service Resources
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Find answers and learn new skills with our comprehensive resource
              library.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {resources.map(resource => (
              <Card
                key={resource.title}
                className='transition-shadow hover:shadow-lg'
              >
                <CardContent className='p-8'>
                  <div className='mb-4 flex items-center gap-3'>
                    <resource.icon className='h-6 w-6 text-blue-600' />
                    <h3 className='text-xl font-semibold text-gray-900'>
                      {resource.title}
                    </h3>
                  </div>
                  <p className='mb-6 text-gray-600'>{resource.description}</p>
                  <ul className='mb-6 space-y-2'>
                    {resource.items.map(item => (
                      <li
                        key={item}
                        className='flex items-center gap-2 text-sm text-gray-600'
                      >
                        <HelpCircle className='h-3 w-3 text-blue-600' />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={resource.href}>
                    <Button variant='outline' className='w-full'>
                      Explore {resource.title}
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className='border-l-4 border-red-400 bg-red-50 py-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <div className='flex-shrink-0'>
              <Phone className='h-8 w-8 text-red-600' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-red-800'>
                Emergency Support
              </h3>
              <p className='text-red-700'>
                For critical system issues affecting your syndicate operations,
                call our emergency hotline:
                <a
                  href='tel:+1-800-EMERGENCY'
                  className='ml-1 font-semibold hover:underline'
                >
                  +1-800-EMERGENCY
                </a>
              </p>
              <p className='mt-1 text-sm text-red-600'>
                Available 24/7 for Enterprise customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
