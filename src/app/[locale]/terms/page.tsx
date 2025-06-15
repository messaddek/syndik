'use client';

import { useState, useEffect, useMemo } from 'react';
import { LandingLayout } from '@/components/landing/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import {
  FileText,
  Users,
  Shield,
  CreditCard,
  Lock,
  Phone,
  AlertTriangle,
  CheckCircle,
  Globe,
  Clock,
} from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('terms');
  const [activeSection, setActiveSection] = useState<string>('');

  const sections = useMemo(
    () => [
      {
        id: 'acceptance',
        title: t('sections.acceptance.title'),
        icon: CheckCircle,
      },
      {
        id: 'description',
        title: t('sections.description.title'),
        icon: FileText,
      },
      {
        id: 'user-accounts',
        title: t('sections.userAccounts.title'),
        icon: Users,
      },
      {
        id: 'acceptable-use',
        title: t('sections.acceptableUse.title'),
        icon: Shield,
      },
      { id: 'payment', title: t('sections.payment.title'), icon: CreditCard },
      { id: 'privacy', title: t('sections.privacy.title'), icon: Lock },
      {
        id: 'intellectual-property',
        title: t('sections.intellectualProperty.title'),
        icon: Globe,
      },
      {
        id: 'limitation-liability',
        title: t('sections.limitationLiability.title'),
        icon: AlertTriangle,
      },
      {
        id: 'termination',
        title: t('sections.termination.title'),
        icon: Clock,
      },
      {
        id: 'modifications',
        title: t('sections.modifications.title'),
        icon: FileText,
      },
      {
        id: 'governing-law',
        title: t('sections.governingLaw.title'),
        icon: Globe,
      },
      { id: 'contact', title: t('sections.contact.title'), icon: Phone },
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
                <FileText className='h-4 w-4' />
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
                    {' '}
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
                {/* Section 1: Acceptance of Terms */}
                <Card
                  id='acceptance'
                  className='border-l-4 border-l-green-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-green-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <CheckCircle className='h-6 w-6 text-green-600' />
                      {t('sections.acceptance.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.acceptance.content')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 2: Description of Service */}
                <Card
                  id='description'
                  className='border-l-4 border-l-blue-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-blue-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <FileText className='h-6 w-6 text-blue-600' />
                      {t('sections.description.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.description.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      {(t.raw('sections.description.features') as string[]).map(
                        (feature, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-3 rounded-lg bg-blue-50 p-3'
                          >
                            <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                            <span className='text-sm text-gray-700'>
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 3: User Accounts */}
                <Card
                  id='user-accounts'
                  className='border-l-4 border-l-purple-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-purple-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Users className='h-6 w-6 text-purple-600' />
                      {t('sections.userAccounts.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.userAccounts.content')}
                    </p>
                    <div className='space-y-3'>
                      {(
                        t.raw(
                          'sections.userAccounts.responsibilities'
                        ) as string[]
                      ).map((responsibility, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-3 rounded-lg bg-purple-50 p-3'
                        >
                          <div className='mt-1 h-2 w-2 rounded-full bg-purple-500'></div>
                          <span className='text-sm text-gray-700'>
                            {responsibility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 4: Acceptable Use Policy */}
                <Card
                  id='acceptable-use'
                  className='border-l-4 border-l-red-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-red-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Shield className='h-6 w-6 text-red-600' />
                      {t('sections.acceptableUse.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.acceptableUse.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          {t('sections.acceptableUse.prohibitedTitle')}
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          {(
                            t.raw(
                              'sections.acceptableUse.prohibited'
                            ) as string[]
                          ).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                        <h4 className='mb-2 font-semibold text-red-800'>
                          {t('sections.acceptableUse.dataMisuseTitle')}
                        </h4>
                        <ul className='space-y-1 text-sm text-red-700'>
                          {(
                            t.raw(
                              'sections.acceptableUse.dataMisuse'
                            ) as string[]
                          ).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Section 5: Payment and Billing */}
                <Card
                  id='payment'
                  className='border-l-4 border-l-green-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-green-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <CreditCard className='h-6 w-6 text-green-600' />
                      {t('sections.payment.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.payment.content')}
                    </p>
                    <div className='space-y-3'>
                      {(t.raw('sections.payment.details') as string[]).map(
                        (detail, index) => (
                          <div
                            key={index}
                            className='flex items-start gap-3 rounded-lg bg-green-50 p-3'
                          >
                            <div className='mt-1 h-2 w-2 rounded-full bg-green-500'></div>
                            <span className='text-sm text-gray-700'>
                              {detail}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* Section 6: Privacy and Data Protection */}
                <Card
                  id='privacy'
                  className='border-l-4 border-l-blue-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-blue-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Lock className='h-6 w-6 text-blue-600' />
                      {t('sections.privacy.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.privacy.content')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 8: Limitation of Liability */}
                <Card
                  id='limitation-liability'
                  className='border-l-4 border-l-orange-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-orange-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <AlertTriangle className='h-6 w-6 text-orange-600' />
                      {t('sections.limitationLiability.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                      <p className='text-sm text-orange-800'>
                        <strong>
                          {t('sections.limitationLiability.importantNotice')}
                        </strong>
                        {t('sections.limitationLiability.content')}
                      </p>
                    </div>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.limitationLiability.additionalContent')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 9: Termination */}
                <Card
                  id='termination'
                  className='border-l-4 border-l-gray-500 rtl:border-r-4 rtl:border-l-0 rtl:border-r-gray-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Clock className='h-6 w-6 text-gray-600' />
                      {t('sections.termination.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='leading-relaxed text-gray-600'>
                      {t('sections.termination.content')}
                    </p>
                  </CardContent>
                </Card>
                {/* Section 12: Contact Information */}
                <Card
                  id='contact'
                  className='border-l-4 border-l-blue-500 bg-blue-50/50 rtl:border-r-4 rtl:border-l-0 rtl:border-r-blue-500'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-2xl text-gray-900'>
                      <Phone className='h-6 w-6 text-blue-600' />
                      {t('sections.contact.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      {t('sections.contact.content')}
                    </p>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div className='rounded-lg border border-blue-200 bg-white p-4'>
                        <h4 className='mb-2 font-semibold text-blue-800'>
                          {t('sections.contact.emailSupportTitle')}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t('sections.contact.email')}
                        </p>
                      </div>
                      <div className='rounded-lg border border-blue-200 bg-white p-4'>
                        <h4 className='mb-2 font-semibold text-blue-800'>
                          {t('sections.contact.phoneAddressTitle')}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {t('sections.contact.phone')}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {t('sections.contact.address')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Final Notice */}
                <Card className='border-2 border-blue-200 bg-blue-50'>
                  <CardContent className='p-6'>
                    <p className='text-center text-sm text-blue-800'>
                      <strong>{t('effectiveDate.title')}</strong>
                      {t('effectiveDate.content')}
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
}
