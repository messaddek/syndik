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
import { useTranslations } from 'next-intl';

const HelpPage = () => {
  const t = useTranslations('help');
  const supportOptions = [
    {
      title: t('supportOptions.liveChat.title'),
      description: t('supportOptions.liveChat.description'),
      icon: MessageCircle,
      availability: t('supportOptions.liveChat.availability'),
      action: t('supportOptions.liveChat.action'),
      href: '#chat',
    },
    {
      title: t('supportOptions.emailSupport.title'),
      description: t('supportOptions.emailSupport.description'),
      icon: Mail,
      availability: t('supportOptions.emailSupport.availability'),
      action: t('supportOptions.emailSupport.action'),
      href: 'mailto:support@syndik.com',
    },
    {
      title: t('supportOptions.phoneSupport.title'),
      description: t('supportOptions.phoneSupport.description'),
      icon: Phone,
      availability: t('supportOptions.phoneSupport.availability'),
      action: t('supportOptions.phoneSupport.action'),
      href: 'tel:+1-800-SYNDIK',
    },
    {
      title: t('supportOptions.scheduleDemo.title'),
      description: t('supportOptions.scheduleDemo.description'),
      icon: Video,
      availability: t('supportOptions.scheduleDemo.availability'),
      action: t('supportOptions.scheduleDemo.action'),
      href: '/demo',
    },
  ];
  const resources = [
    {
      title: t('resources.documentation.title'),
      description: t('resources.documentation.description'),
      icon: Book,
      items: [
        t('resources.documentation.items.0'),
        t('resources.documentation.items.1'),
        t('resources.documentation.items.2'),
        t('resources.documentation.items.3'),
      ],
      href: '/docs',
    },
    {
      title: t('resources.videoTutorials.title'),
      description: t('resources.videoTutorials.description'),
      icon: Video,
      items: [
        t('resources.videoTutorials.items.0'),
        t('resources.videoTutorials.items.1'),
        t('resources.videoTutorials.items.2'),
        t('resources.videoTutorials.items.3'),
      ],
      href: '/tutorials',
    },
    {
      title: t('resources.knowledgeBase.title'),
      description: t('resources.knowledgeBase.description'),
      icon: FileText,
      items: [
        t('resources.knowledgeBase.items.0'),
        t('resources.knowledgeBase.items.1'),
        t('resources.knowledgeBase.items.2'),
        t('resources.knowledgeBase.items.3'),
      ],
      href: '/knowledge-base',
    },
    {
      title: t('resources.communityForum.title'),
      description: t('resources.communityForum.description'),
      icon: Users,
      items: [
        t('resources.communityForum.items.0'),
        t('resources.communityForum.items.1'),
        t('resources.communityForum.items.2'),
        t('resources.communityForum.items.3'),
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
              {t('title')}
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('subtitle')}
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
                    <option.icon className='text-primary h-6 w-6' />
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
                {t('contactForm.title')}
              </h2>
              <p className='mt-4 text-lg text-gray-600'>
                {t('contactForm.subtitle')}
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t('contactForm.cardTitle')}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>
                      {t('contactForm.fields.firstName.label')}
                    </Label>
                    <Input
                      id='firstName'
                      placeholder={t(
                        'contactForm.fields.firstName.placeholder'
                      )}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>
                      {t('contactForm.fields.lastName.label')}
                    </Label>
                    <Input
                      id='lastName'
                      placeholder={t('contactForm.fields.lastName.placeholder')}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>
                    {t('contactForm.fields.email.label')}
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder={t('contactForm.fields.email.placeholder')}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='subject'>
                    {t('contactForm.fields.subject.label')}
                  </Label>
                  <Input
                    id='subject'
                    placeholder={t('contactForm.fields.subject.placeholder')}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='message'>
                    {t('contactForm.fields.message.label')}
                  </Label>
                  <Textarea
                    id='message'
                    placeholder={t('contactForm.fields.message.placeholder')}
                    rows={6}
                  />
                </div>
                <Button className='w-full'>
                  {t('contactForm.submitButton')}
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
              {t('resources.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('resources.subtitle')}
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
                    <resource.icon className='text-primary h-6 w-6' />
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
                        <HelpCircle className='text-primary h-3 w-3' />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={resource.href}>
                    <Button variant='outline' className='w-full space-x-2'>
                      {resource.href === '/docs' &&
                        t('resources.documentation.action')}
                      {resource.href === '/tutorials' &&
                        t('resources.videoTutorials.action')}
                      {resource.href === '/knowledge-base' &&
                        t('resources.knowledgeBase.action')}
                      {resource.href === '/community' &&
                        t('resources.communityForum.action')}
                      <ArrowRight className='h-4 w-4 rtl:rotate-180' />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className='border-l-4 border-red-400 bg-red-50 py-16 rtl:border-r-4 rtl:border-l-0'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <div className='flex-shrink-0'>
              <Phone className='h-8 w-8 text-red-600' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-red-800'>
                {t('emergency.title')}
              </h3>
              <p className='text-red-700'>
                {t('emergency.description')}
                <a
                  href={`tel:${t('emergency.phone')}`}
                  className='ml-1 font-semibold hover:underline'
                >
                  {t('emergency.phone')}
                </a>
              </p>
              <p className='mt-1 text-sm text-red-600'>
                {t('emergency.availability')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};
export default HelpPage;
