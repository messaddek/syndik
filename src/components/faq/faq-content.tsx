'use client';

import { useState } from 'react';
import { Search, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CommandResponsiveDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { MessageCircle, Book, Shield, LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  tags: string[];
}

interface FAQCategory {
  category: string;
  icon: LucideIcon;
  items: FAQItem[];
}

export const FAQContent = () => {
  const [commandQuery, setCommandQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const faqCategories = useMemo<FAQCategory[]>(
    () => [
      {
        category: 'Getting Started',
        icon: Book,
        items: [
          {
            question: 'How do I create my first syndicate account?',
            answer:
              'Getting started is easy! Simply click "Get Started" on our homepage, fill out the registration form with your syndicate details, and verify your email. Our onboarding wizard will guide you through setting up your first building and inviting residents.',
            tags: ['account', 'setup', 'onboarding', 'registration'],
          },
          {
            question: 'What information do I need to set up my syndicate?',
            answer:
              "You'll need basic information about your syndicate including the name, address, number of units, and contact details. You can also upload documents like bylaws and regulations during setup, though this can be done later.",
            tags: ['setup', 'information', 'requirements', 'documents'],
          },
          {
            question: 'How long does it take to get started?',
            answer:
              'Most syndicates are up and running within 30 minutes. Our setup wizard guides you through the essential steps, and you can always add more details later as you become familiar with the platform.',
            tags: ['time', 'setup', 'quick start', 'wizard'],
          },
          {
            question: 'Can I import data from my existing system?',
            answer:
              'Yes! We support data imports from Excel spreadsheets and most common property management systems. Our support team can help you migrate your existing data during onboarding.',
            tags: ['import', 'data', 'migration', 'excel', 'existing system'],
          },
        ],
      },
      {
        category: 'Account & Billing',
        icon: Shield,
        items: [
          {
            question: 'How does billing work?',
            answer:
              'We bill monthly or annually based on your chosen plan. Billing is based on the number of units in your syndicate. You can upgrade or downgrade at any time, and changes take effect on your next billing cycle.',
            tags: ['billing', 'pricing', 'monthly', 'annual', 'units'],
          },
          {
            question: 'What payment methods do you accept?',
            answer:
              'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and for enterprise customers, we can arrange custom payment terms including invoicing.',
            tags: ['payment', 'credit cards', 'bank transfer', 'enterprise'],
          },
          {
            question: 'Can I cancel my subscription anytime?',
            answer:
              'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period. We also offer a 30-day money-back guarantee for new customers.',
            tags: ['cancel', 'subscription', 'refund', 'guarantee'],
          },
          {
            question: 'Do you offer refunds?',
            answer:
              "We offer a 30-day money-back guarantee for new customers. For cancellations after this period, we don't provide refunds, but your service will continue until the end of your billing cycle.",
            tags: ['refund', 'money-back', 'guarantee', 'cancellation'],
          },
        ],
      },
      {
        category: 'Features & Functionality',
        icon: MessageCircle,
        items: [
          {
            question: 'How do residents access the platform?',
            answer:
              'Residents receive an invitation email with login credentials. They can access their portal through our web app or mobile app, where they can view announcements, submit maintenance requests, and participate in community discussions.',
            tags: ['residents', 'access', 'invitation', 'mobile app', 'portal'],
          },
          {
            question: 'Can I customize the platform for my syndicate?',
            answer:
              'Yes! Professional and Enterprise plans include custom branding options. You can add your syndicate logo, customize colors, and even use a custom domain. Enterprise plans offer white-label solutions.',
            tags: [
              'customization',
              'branding',
              'logo',
              'domain',
              'white-label',
            ],
          },
          {
            question: 'How does the financial tracking work?',
            answer:
              'Our financial module tracks income from fees and assessments, expenses for maintenance and services, and generates comprehensive reports. You can set budgets, track against them, and generate financial statements for meetings.',
            tags: ['financial', 'tracking', 'budget', 'reports', 'statements'],
          },
          {
            question: 'Is there a mobile app?',
            answer:
              'Yes! We have mobile apps for both iOS and Android. Residents and managers can access all core features on mobile, including submitting requests, viewing announcements, and participating in meetings.',
            tags: ['mobile', 'app', 'ios', 'android', 'features'],
          },
        ],
      },
      {
        category: 'Security & Privacy',
        icon: Shield,
        items: [
          {
            question: 'How secure is my data?',
            answer:
              'We use enterprise-grade security including 256-bit SSL encryption, regular security audits, and comply with international data protection standards including GDPR. All data is backed up daily across multiple secure locations.',
            tags: ['security', 'encryption', 'ssl', 'gdpr', 'backup'],
          },
          {
            question: 'Who can access my syndicate data?',
            answer:
              'Only authorized users from your syndicate can access your data. We use role-based permissions, so you control what each user can see and do. Syndik employees never access your data unless you specifically request support.',
            tags: ['access', 'permissions', 'privacy', 'data', 'authorized'],
          },
          {
            question: 'Where is my data stored?',
            answer:
              'Your data is stored in secure, certified data centers with redundancy and backup systems. We can discuss specific geographic requirements for enterprise customers who have data residency needs.',
            tags: ['storage', 'data centers', 'redundancy', 'geographic'],
          },
          {
            question: 'Can I export my data?',
            answer:
              'Yes, you can export your data at any time in standard formats like CSV and PDF. This includes all your resident information, financial records, and documents. There are no restrictions or fees for data exports.',
            tags: ['export', 'data', 'csv', 'pdf', 'download'],
          },
        ],
      },
      {
        category: 'Support & Training',
        icon: MessageCircle,
        items: [
          {
            question: 'What support options are available?',
            answer:
              'We offer email support for all plans, with priority support for Professional and Enterprise customers. Enterprise plans include a dedicated support manager and phone support.',
            tags: ['support', 'email', 'priority', 'phone', 'dedicated'],
          },
          {
            question: 'Do you provide training?',
            answer:
              'Yes! We provide comprehensive onboarding training for all new customers. Professional and Enterprise plans include additional training sessions for staff and board members. We also have extensive documentation and video tutorials.',
            tags: ['training', 'onboarding', 'documentation', 'tutorials'],
          },
          {
            question: 'How quickly do you respond to support requests?',
            answer:
              'We typically respond to support requests within 24 hours for standard plans, and within 4 hours for Professional plans. Enterprise customers have dedicated support with guaranteed response times.',
            tags: ['response time', 'support', '24 hours', 'guaranteed'],
          },
          {
            question: 'Is there a knowledge base or documentation?',
            answer:
              "Yes, we have a comprehensive help center with step-by-step guides, video tutorials, and best practices. It's accessible 24/7 and searchable by topic or feature.",
            tags: ['knowledge base', 'documentation', 'guides', 'tutorials'],
          },
        ],
      },
    ],
    []
  );

  // Setup hotkey for command menu
  // useHotkeys(['mod+k', '/'], (event) => {
  //   event.preventDefault();
  //   setOpen(true);
  // });

  // Reset all search states
  const resetSearch = () => {
    setSearchQuery('');
    setCommandQuery('');
    setSelectedCategory(null);
  };

  // Handle command selection
  const handleCommandSelect = (question: string, category: string) => {
    setSearchQuery(question);
    setSelectedCategory(category);
    setOpen(false);
    setCommandQuery('');
  };

  // Search function that handles all types of matches
  const searchMatches = (item: FAQItem, query: string) => {
    const searchTerm = query.toLowerCase().trim();

    return (
      item.question.toLowerCase().includes(searchTerm) ||
      item.answer.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  // Get filtered FAQs for the main content
  const getFilteredFAQs = () => {
    return faqCategories
      .map(category => ({
        ...category,
        items: category.items.filter(item => {
          const matchesSearch =
            !searchQuery || searchMatches(item, searchQuery);
          const matchesCategory =
            !selectedCategory || category.category === selectedCategory;
          return matchesSearch && matchesCategory;
        }),
      }))
      .filter(category => category.items.length > 0);
  };
  const filteredFAQs = getFilteredFAQs();

  return (
    <div className='container mx-auto max-w-4xl py-8'>
      {/* Header with Contact Button */}
      <div className='relative mb-12 flex min-h-80 flex-col items-center justify-center space-y-6 py-8 text-center'>
        <h1 className='mb-4 text-4xl font-bold'>Frequently Asked Questions</h1>
        <p className='text-muted-foreground max-w-2xl px-1 text-lg sm:px-0'>
          Find answers to common questions about Syndik. Can&apos;t find what
          you&apos;re looking for? Contact our support team.
        </p>

        {/* Contact Support Button - Responsive positioning */}
        <Link href='/help'>
          <Button
            variant='outline'
            size='sm'
            className='mx-auto flex items-center gap-1.5 lg:absolute lg:top-0 lg:right-0'
          >
            <HelpCircle className='size-4' />
            Contact Support
          </Button>
        </Link>
      </div>
      {/* Command Menu Trigger */}
      <div className='relative mx-auto mb-8 flex w-full max-w-2xl items-center'>
        <button
          onClick={() => setOpen(true)}
          className='bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full items-center rounded-lg border px-4 py-2 text-sm'
        >
          <Search className='mr-2 size-4' />
          <span>{searchQuery || 'Search FAQs...'}</span>
          <kbd className='bg-muted pointer-events-none absolute top-2.5 right-4 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 select-none sm:flex'>
            <span className='text-xs'>⌘</span>K
          </kbd>
        </button>
        {searchQuery && (
          <Button
            size='icon'
            variant='ghost'
            onClick={resetSearch}
            className='text-muted-foreground hover:text-foreground absolute right-12 hover:bg-transparent'
            aria-label='Clear search'
          >
            <X className='size-4' />
          </Button>
        )}
      </div>
      {/* Command Menu Dialog */}
      <CommandResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title='Search FAQs'
        description='Search through frequently asked questions'
      >
        <CommandInput
          placeholder='Search FAQs...'
          value={commandQuery}
          onValueChange={setCommandQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {faqCategories.map(category => {
            const filteredItems = category.items.filter(item =>
              searchMatches(item, commandQuery)
            );

            if (filteredItems.length === 0) return null;

            return (
              <CommandGroup key={category.category} heading={category.category}>
                {filteredItems.map((item, index) => (
                  <CommandItem
                    key={`${category.category}-${index}`}
                    onSelect={() =>
                      handleCommandSelect(item.question, category.category)
                    }
                    className='flex flex-col items-start gap-2 px-2 py-3'
                  >
                    <div className='flex items-center justify-start'>
                      <Search className='text-muted-foreground mr-2 size-4 shrink-0' />
                      <span className='flex-1'>{item.question}</span>
                    </div>
                    {commandQuery && (
                      <div className='flex flex-wrap gap-1 pl-6'>
                        {item.tags
                          .filter(tag =>
                            tag
                              .toLowerCase()
                              .includes(commandQuery.toLowerCase())
                          )
                          .map((tag, tagIndex) => (
                            <Badge className='capitalize' key={tagIndex}>
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandResponsiveDialog>
      {/* Category Pills */}
      <div className='mb-8 flex flex-wrap justify-center gap-2 px-1 sm:px-0'>
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 sm:py-2',
            !selectedCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80'
          )}
        >
          All
        </button>
        {faqCategories.map(category => (
          <button
            key={category.category}
            onClick={() => setSelectedCategory(category.category)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 sm:py-2',
              selectedCategory === category.category
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            )}
          >
            {category.category}
          </button>
        ))}
      </div>
      {/* FAQ Accordion */}
      {filteredFAQs.map(category => (
        <div key={category.category} className='mb-8 px-3 sm:px-0'>
          <h2 className='mb-4 flex items-center gap-3 text-xl font-semibold'>
            <category.icon className='text-primary h-6 w-6' />
            {category.category}
          </h2>
          <Card>
            <CardContent className='p-6'>
              <Accordion type='single' collapsible className='w-full'>
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                  >
                    <AccordionTrigger className='text-left'>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className='text-muted-foreground flex flex-col gap-y-2 px-1 sm:px-0'>
                      <div className='text-gray-600'>{item.answer}</div>
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {item.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            onClick={() => {
                              setSearchQuery(tag);
                              setSelectedCategory(null);
                            }}
                            className='cursor-pointer capitalize'
                            variant='secondary'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      ))}
      {/* Empty State with Contact Form Link */}
      {filteredFAQs.length === 0 && (
        <div className='py-12 text-center'>
          <Search className='text-muted-foreground mx-auto mb-4 size-12' />
          <h3 className='mb-2 text-lg font-semibold'>No results found</h3>
          <p className='text-muted-foreground mb-6'>
            Try different keywords or browse categories
          </p>

          <Link href='/help'>
            <Button className='flex items-center gap-1.5'>
              <HelpCircle className='h-4 w-4' />
              Contact Support
            </Button>
          </Link>
        </div>
      )}
      {/* Contact Section */}
      <div className='mt-16 rounded-lg bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Still Have Questions?
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Our support team is here to help. Get in touch and we&apos;ll
            respond as soon as possible.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link href='/help'>
              <Button size='lg'>Contact Support</Button>
            </Link>
            <Link href='/demo'>
              <Button variant='outline' size='lg'>
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

