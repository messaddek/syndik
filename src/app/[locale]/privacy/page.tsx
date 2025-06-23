'use client';

import { useState, useEffect, useMemo } from 'react';
import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
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

const PrivacyPage = () => {
  const t = useTranslations('privacy');
  const [activeSection, setActiveSection] = useState<string>('');

  const sections = useMemo(
    () => [
      {
        id: 'introduction',
        title: t('sections.introduction.title'),
        icon: FileText,
      },
      {
        id: 'information-collect',
        title: t('sections.informationCollect.title'),
        icon: Eye,
      },
      {
        id: 'how-we-use',
        title: t('sections.howWeUse.title'),
        icon: Users,
      },
      {
        id: 'sharing-disclosure',
        title: t('sections.sharingDisclosure.title'),
        icon: Globe,
      },
      {
        id: 'data-security',
        title: t('sections.dataSecurity.title'),
        icon: Shield,
      },
      {
        id: 'data-retention',
        title: t('sections.dataRetention.title'),
        icon: Clock,
      },
      {
        id: 'your-rights',
        title: t('sections.yourRights.title'),
        icon: Lock,
      },
      {
        id: 'cookies',
        title: t('sections.cookies.title'),
        icon: Eye,
      },
      {
        id: 'international',
        title: t('sections.international.title'),
        icon: Globe,
      },
      {
        id: 'children',
        title: t('sections.children.title'),
        icon: Users,
      },
      {
        id: 'changes',
        title: t('sections.changes.title'),
        icon: FileText,
      },
      {
        id: 'contact',
        title: t('sections.contact.title'),
        icon: Phone,
      },
    ],
    [t]
  );

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Get all section elements
      const sectionElements = sections
        .map(section => {
          const element = document.getElementById(section.id);
          return {
            id: section.id,
            element,
            offsetTop: element?.offsetTop || 0,
          };
        })
        .filter(section => section.element);

      // Find the active section
      let active = '';
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (scrollPosition >= section.offsetTop - 50) {
          active = section.id;
          break;
        }
      }

      // Update URL hash and active section
      if (active && active !== activeSection) {
        setActiveSection(active);
        // Update URL hash without scrolling
        const newUrl = `${window.location.pathname}${window.location.search}#${active}`;
        window.history.replaceState(null, '', newUrl);
      }
    };

    // Set initial active section from URL hash
    const hash = window.location.hash.slice(1);
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
    } else if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  const handleNavClick = (
    sectionId: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 73; // Height of the header
      const offsetTop = element.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      // Update URL hash
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

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
                {t('subtitle')}
              </Badge>
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              {t('title')}
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {t('lastUpdated')}
            </p>
            <p className='mt-4 text-sm text-gray-500'>{t('readCarefully')}</p>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
            {/* Table of Contents - Sticky Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-[73px]'>
                <Card className='border-blue-200 bg-blue-50/50'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-lg text-blue-900'>
                      {t('tableOfContents')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className='space-y-2'>
                      {sections.map(section => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          onClick={e => handleNavClick(section.id, e)}
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 ${
                            activeSection === section.id
                              ? 'bg-blue-200 font-medium text-blue-900'
                              : 'text-blue-700'
                          }`}
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
                {/* Section 1: Introduction */}
                <Card
                  id='introduction'
                  className='border-l-4 border-l-blue-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-blue-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <FileText className='text-primary h-6 w-6' />
                      {t('sections.introduction.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.introduction.content')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 2: Information We Collect */}
                <Card
                  id='information-collect'
                  className='border-l-4 border-l-green-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-green-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Eye className='h-6 w-6 text-green-600' />
                      {t('sections.informationCollect.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                        {t('sections.informationCollect.personalInfoTitle')}
                      </h3>
                      <p className='mb-3 leading-relaxed text-gray-600'>
                        {t('sections.informationCollect.personalInfoContent')}
                      </p>
                      <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        {(
                          t.raw(
                            'sections.informationCollect.personalInfoItems'
                          ) as string[]
                        ).map((item, index) => (
                          <li
                            key={index}
                            className='flex items-center gap-2 text-gray-600'
                          >
                            <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-900'>
                        {t('sections.informationCollect.usageInfoTitle')}
                      </h3>
                      <p className='mb-3 leading-relaxed text-gray-600'>
                        {t('sections.informationCollect.usageInfoContent')}
                      </p>
                      <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        {(
                          t.raw(
                            'sections.informationCollect.usageInfoItems'
                          ) as string[]
                        ).map((item, index) => (
                          <li
                            key={index}
                            className='flex items-center gap-2 text-gray-600'
                          >
                            <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                {/* Section 3: How We Use Your Information */}
                <Card
                  id='how-we-use'
                  className='border-l-4 border-l-purple-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-purple-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Users className='h-6 w-6 text-purple-600' />
                      {t('sections.howWeUse.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.howWeUse.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      {(t.raw('sections.howWeUse.purposes') as string[]).map(
                        (purpose, index) => (
                          <div
                            key={index}
                            className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'
                          >
                            <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                            <span className='text-sm text-gray-700'>
                              {purpose}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 4: Information Sharing and Disclosure */}
                <Card
                  id='sharing-disclosure'
                  className='border-l-4 border-l-orange-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-orange-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Globe className='h-6 w-6 text-orange-600' />
                      {t('sections.sharingDisclosure.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.sharingDisclosure.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      {(
                        t.raw(
                          'sections.sharingDisclosure.circumstances'
                        ) as string[]
                      ).map((circumstance, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-3 rounded-lg bg-orange-50 p-3'
                        >
                          <div className='mt-1 h-2 w-2 rounded-full bg-orange-500'></div>
                          <span className='text-sm text-gray-700'>
                            {circumstance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 5: Data Security */}
                <Card
                  id='data-security'
                  className='border-l-4 border-l-red-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-red-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Shield className='h-6 w-6 text-red-600' />
                      {t('sections.dataSecurity.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.dataSecurity.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          {t('sections.dataSecurity.technicalTitle')}
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          {(
                            t.raw(
                              'sections.dataSecurity.technicalMeasures'
                            ) as string[]
                          ).map((measure, index) => (
                            <li key={index}>• {measure}</li>
                          ))}
                        </ul>
                      </div>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          {t('sections.dataSecurity.organizationalTitle')}
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          {(
                            t.raw(
                              'sections.dataSecurity.organizationalMeasures'
                            ) as string[]
                          ).map((measure, index) => (
                            <li key={index}>• {measure}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Section 6: Data Retention */}
                <Card
                  id='data-retention'
                  className='border-l-4 border-l-indigo-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-indigo-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Clock className='h-6 w-6 text-indigo-600' />
                      {t('sections.dataRetention.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.dataRetention.content')}
                    </p>
                    <div className='space-y-3'>
                      {(
                        t.raw(
                          'sections.dataRetention.retentionPeriods'
                        ) as string[]
                      ).map((period, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-3 rounded-lg bg-indigo-50 p-3'
                        >
                          <div className='mt-1 h-2 w-2 rounded-full bg-indigo-500'></div>
                          <span className='text-sm text-gray-700'>
                            {period}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 7: Your Rights */}
                <Card
                  id='your-rights'
                  className='border-l-4 border-l-orange-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-orange-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Lock className='h-6 w-6 text-orange-600' />
                      {t('sections.yourRights.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.yourRights.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      {(t.raw('sections.yourRights.rights') as string[]).map(
                        (right, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3'
                          >
                            <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                            <span className='text-sm text-gray-700'>
                              {right}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 8: Cookies and Tracking Technologies */}
                <Card
                  id='cookies'
                  className='border-l-4 border-l-cyan-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-cyan-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Eye className='h-6 w-6 text-cyan-600' />
                      {t('sections.cookies.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.cookies.content')}
                    </p>
                    <div className='space-y-3'>
                      {(t.raw('sections.cookies.cookieTypes') as string[]).map(
                        (type, index) => (
                          <div
                            key={index}
                            className='flex items-start gap-3 rounded-lg bg-cyan-50 p-3'
                          >
                            <div className='mt-1 h-2 w-2 rounded-full bg-cyan-500'></div>
                            <span className='text-sm text-gray-700'>
                              {type}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    <p className='mt-4 text-sm text-gray-600 italic'>
                      {t('sections.cookies.manageCookies')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 9: International Data Transfers */}
                <Card
                  id='international'
                  className='border-l-4 border-l-teal-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-teal-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Globe className='h-6 w-6 text-teal-600' />
                      {t('sections.international.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.international.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      {(
                        t.raw('sections.international.safeguards') as string[]
                      ).map((safeguard, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-3 rounded-lg bg-teal-50 p-3'
                        >
                          <div className='mt-1 h-2 w-2 rounded-full bg-teal-500'></div>
                          <span className='text-sm text-gray-700'>
                            {safeguard}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 10: Children's Privacy */}
                <Card
                  id='children'
                  className='border-l-4 border-l-pink-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-pink-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Users className='h-6 w-6 text-pink-600' />
                      {t('sections.children.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.children.content')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 11: Changes to This Privacy Policy */}
                <Card
                  id='changes'
                  className='border-l-4 border-l-amber-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-amber-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <FileText className='h-6 w-6 text-amber-600' />
                      {t('sections.changes.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.changes.content')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 12: Contact Us */}
                <Card
                  id='contact'
                  className='border-l-4 border-l-blue-500 bg-blue-50/50 rtl:border-r-4 rtl:border-l-0 rtl:border-r-blue-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Phone className='text-primary h-6 w-6' />
                      {t('sections.contact.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.contact.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <div className='rounded-lg border border-blue-200 bg-white p-4 text-center'>
                        <div className='text-primary mb-2'>
                          <Phone className='mx-auto h-6 w-6' />
                        </div>
                        <p className='font-semibold text-gray-900'>
                          {t('sections.contact.phoneTitle')}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {t('sections.contact.phone')}
                        </p>
                      </div>
                      <div className='rounded-lg border border-blue-200 bg-white p-4 text-center'>
                        <div className='text-primary mb-2'>
                          <Globe className='mx-auto h-6 w-6' />
                        </div>
                        <p className='font-semibold text-gray-900'>
                          {t('sections.contact.emailTitle')}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {t('sections.contact.email')}
                        </p>
                      </div>
                      <div className='rounded-lg border border-blue-200 bg-white p-4 text-center'>
                        <div className='text-primary mb-2'>
                          <FileText className='mx-auto h-6 w-6' />
                        </div>
                        <p className='font-semibold text-gray-900'>
                          {t('sections.contact.addressTitle')}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {t('sections.contact.address')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Acknowledgment */}
                <Card className='border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'>
                  <CardContent className='pt-6'>
                    <p className='text-center text-sm text-gray-600'>
                      <Shield className='text-primary mx-auto mb-2 h-5 w-5' />
                      {t('acknowledgment.content')}
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
};
export default PrivacyPage;
