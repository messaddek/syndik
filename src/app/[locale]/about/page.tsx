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
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  const stats = [
    {
      name: t('stats.items.syndicates.name'),
      value: t('stats.items.syndicates.value'),
      description: t('stats.items.syndicates.description'),
    },
    {
      name: t('stats.items.properties.name'),
      value: t('stats.items.properties.value'),
      description: t('stats.items.properties.description'),
    },
    {
      name: t('stats.items.residents.name'),
      value: t('stats.items.residents.value'),
      description: t('stats.items.residents.description'),
    },
    {
      name: t('stats.items.experience.name'),
      value: t('stats.items.experience.value'),
      description: t('stats.items.experience.description'),
    },
  ];
  const values = [
    {
      name: t('values.items.transparency.name'),
      description: t('values.items.transparency.description'),
      icon: Globe,
    },
    {
      name: t('values.items.innovation.name'),
      description: t('values.items.innovation.description'),
      icon: Target,
    },
    {
      name: t('values.items.community.name'),
      description: t('values.items.community.description'),
      icon: Heart,
    },
    {
      name: t('values.items.excellence.name'),
      description: t('values.items.excellence.description'),
      icon: Award,
    },
  ];
  const features = [
    {
      name: t('features.items.financialManagement.name'),
      description: t('features.items.financialManagement.description'),
      icon: BarChart3,
    },
    {
      name: t('features.items.residentPortal.name'),
      description: t('features.items.residentPortal.description'),
      icon: Users,
    },
    {
      name: t('features.items.meetingManagement.name'),
      description: t('features.items.meetingManagement.description'),
      icon: Calendar,
    },
    {
      name: t('features.items.documentStorage.name'),
      description: t('features.items.documentStorage.description'),
      icon: FileText,
    },
    {
      name: t('features.items.communicationHub.name'),
      description: t('features.items.communicationHub.description'),
      icon: MessageCircle,
    },
    {
      name: t('features.items.securityPrivacy.name'),
      description: t('features.items.securityPrivacy.description'),
      icon: Shield,
    },
  ];
  const timeline = [
    {
      year: t('timeline.items.2019.year'),
      title: t('timeline.items.2019.title'),
      description: t('timeline.items.2019.description'),
    },
    {
      year: t('timeline.items.2020.year'),
      title: t('timeline.items.2020.title'),
      description: t('timeline.items.2020.description'),
    },
    {
      year: t('timeline.items.2021.year'),
      title: t('timeline.items.2021.title'),
      description: t('timeline.items.2021.description'),
    },
    {
      year: t('timeline.items.2022.year'),
      title: t('timeline.items.2022.title'),
      description: t('timeline.items.2022.description'),
    },
    {
      year: t('timeline.items.2023.year'),
      title: t('timeline.items.2023.title'),
      description: t('timeline.items.2023.description'),
    },
    {
      year: t('timeline.items.2024.year'),
      title: t('timeline.items.2024.title'),
      description: t('timeline.items.2024.description'),
    },
  ];
  const team = [
    {
      name: t('team.members.sarah.name'),
      role: t('team.members.sarah.role'),
      bio: t('team.members.sarah.bio'),
      image: '/api/placeholder/150/150',
    },
    {
      name: t('team.members.michael.name'),
      role: t('team.members.michael.role'),
      bio: t('team.members.michael.bio'),
      image: '/api/placeholder/150/150',
    },
    {
      name: t('team.members.emma.name'),
      role: t('team.members.emma.role'),
      bio: t('team.members.emma.bio'),
      image: '/api/placeholder/150/150',
    },
    {
      name: t('team.members.david.name'),
      role: t('team.members.david.role'),
      bio: t('team.members.david.bio'),
      image: '/api/placeholder/150/150',
    },
  ];

  return (
    <LandingLayout>
      {/* Hero Section */}
      <div className='bg-gradient-to-br from-blue-50 to-indigo-100 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <Badge className='mb-4' variant='secondary'>
              <Star className='mr-2 h-4 w-4' />
              {t('hero.badge')}
            </Badge>
            <h1 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl'>
              {t('hero.title')}
            </h1>
            <p className='mt-6 text-xl leading-8 text-gray-700'>
              {t('hero.description')}
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' asChild>
                <Link href='/sign-up'>
                  <Zap className='mr-2 h-4 w-4' />
                  {t('hero.buttons.startTrial')}
                </Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/demo'>
                  <Calendar className='mr-2 h-4 w-4' />
                  {t('hero.buttons.scheduleDemo')}
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
                {t('mission.title')}
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                {t('mission.description')}
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                {t('mission.details')}
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Building2 className='text-primary mx-auto mb-4 h-12 w-12' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {t('mission.cards.propertyFocus.title')}
                  </h3>
                  <p className='mt-2 text-sm text-gray-600'>
                    {t('mission.cards.propertyFocus.description')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 text-center'>
                  <Users className='text-primary mx-auto mb-4 h-12 w-12' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {t('mission.cards.communityFirst.title')}
                  </h3>
                  <p className='mt-2 text-sm text-gray-600'>
                    {t('mission.cards.communityFirst.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className='bg-primary py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              {t('stats.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-blue-100'>
              {t('stats.description')}
            </p>
          </div>
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
      </div>
      {/* Features Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {t('features.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('features.description')}
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
                    <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-lg'>
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
              {t('values.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('values.description')}
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2'>
            {values.map(value => (
              <Card key={value.name}>
                <CardContent className='p-8'>
                  <div className='flex items-center gap-4'>
                    <value.icon className='text-primary h-8 w-8' />
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
              {t('timeline.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('timeline.description')}
            </p>
          </div>
          <div className='mt-16 w-full px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-4xl space-y-8'>
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className='relative flex items-start gap-6'
                >
                  {/* Timeline line */}
                  {index !== timeline.length - 1 && (
                    <div className='absolute top-16 left-8 h-16 w-0.5 bg-blue-200 rtl:right-8 rtl:left-auto' />
                  )}

                  {/* Year badge */}
                  <div className='bg-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white'>
                    {item.year}
                  </div>

                  {/* Content */}
                  <Card className='flex-1'>
                    <CardContent className='p-6'>
                      <h3 className='mb-2 text-xl font-semibold text-gray-900 rtl:text-right dark:text-white'>
                        {item.title}
                      </h3>
                      <p className='text-gray-600 rtl:text-right dark:text-gray-300'>
                        {item.description}
                      </p>
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
              {t('team.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('team.description')}
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
                    <div className='from-primary/50 to-primary flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br'>
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
                      <p className='text-primary mb-3 font-medium'>
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
          {' '}
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {t('cta.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('cta.description')}
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' asChild>
                <Link href='/sign-up'>{t('cta.buttons.startTrial')}</Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/contact'>{t('cta.buttons.contactSales')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
