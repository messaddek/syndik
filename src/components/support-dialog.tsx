'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  HelpCircle,
  BookOpen,
  Headphones,
  MessageSquare,
  FileText,
  Search,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupportDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

export const SupportDialog = ({ trigger, className }: SupportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const t = useTranslations('helpDesk');

  useEffect(() => {
    setMounted(true);
  }, []);
  const supportSections = [
    {
      title: t('helpCenter'),
      description: t('helpCenterDesc'),
      href: '/help',
      icon: HelpCircle,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      title: t('userGuide'),
      description: t('userGuideDesc'),
      href: '/user-guide',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600 border-green-200',
      hoverColor: 'hover:bg-green-100',
    },
    {
      title: t('helpdesk'),
      description: t('helpdeskDesc'),
      href: '/helpdesk',
      icon: Headphones,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      hoverColor: 'hover:bg-purple-100',
    },
  ];

  const quickActions = [
    {
      title: t('searchHelp'),
      description: t('searchHelpDesc'),
      href: '/help?search=true',
      icon: Search,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      title: t('contactSupport'),
      description: t('contactSupportDesc'),
      href: '/helpdesk?action=create',
      icon: MessageSquare,
      color: 'bg-red-50 text-red-600 border-red-200',
    },
    {
      title: t('documentation'),
      description: t('documentationDesc'),
      href: '/docs',
      icon: FileText,
      color: 'bg-gray-50 text-gray-600 border-gray-200',
    },
  ];

  const contactMethods = [
    {
      label: t('email'),
      value: 'support@syndik.ma',
      icon: Mail,
      href: 'mailto:support@syndik.ma',
    },
    {
      label: t('phone'),
      value: '+212 XXX-XXX-XXX',
      icon: Phone,
      href: 'tel:+212XXXXXXXXX',
    },
  ];
  const defaultTrigger = (
    <Button variant='ghost' size='sm' className={cn('gap-2', className)}>
      <HelpCircle className='h-4 w-4' />
      <span className='hidden sm:inline'>{t('support')}</span>
    </Button>
  );

  const DialogContent_Internal = () => (
    <div className='space-y-6'>
      {/* Main Support Sections */}
      <div>
        
        <h3 className='mb-4 text-lg font-semibold'>{t('getHelp')}</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {supportSections.map(section => (
            <Link
              key={section.href}
              href={section.href}
              onClick={() => setOpen(false)}
              className={cn(
                'group relative flex flex-col rounded-lg border p-4 transition-colors',
                section.color,
                section.hoverColor
              )}
            >
              <div className='mb-3 flex items-start justify-between'>
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg border',
                    section.color
                  )}
                >
                  <section.icon className='h-5 w-5' />
                </div>
                <ArrowRight className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
              </div>
              <h4 className='mb-1 text-sm font-medium'>{section.title}</h4>
              <p className='text-muted-foreground line-clamp-2 text-xs'>
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        
        <h3 className='text-muted-foreground mb-3 text-sm font-medium'>
          {t('quickActions')}
        </h3>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
          {quickActions.map(action => (
            <Link
              key={action.href}
              href={action.href}
              onClick={() => setOpen(false)}
              className={cn(
                'group hover:bg-muted/50 flex items-center rounded-lg border p-3 transition-colors',
                action.color
              )}
            >
              <div
                className={cn(
                  'mr-3 flex h-8 w-8 items-center justify-center rounded-md border',
                  action.color
                )}
              >
                <action.icon className='h-4 w-4' />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>{action.title}</p>
                <p className='text-muted-foreground truncate text-xs'>
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Methods */}
      <div className='border-t pt-4'>
        
        <h3 className='text-muted-foreground mb-3 text-sm font-medium'>
          {t('directContact')}
        </h3>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          {contactMethods.map(method => (
            <a
              key={method.href}
              href={method.href}
              className='hover:bg-muted/50 flex items-center rounded-lg border p-3 transition-colors'
            >
              <div className='bg-muted mr-3 flex h-8 w-8 items-center justify-center rounded-md'>
                <method.icon className='h-4 w-4' />
              </div>
              <div>
                <p className='text-sm font-medium'>{method.label}</p>
                <p className='text-muted-foreground text-xs'>{method.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant='ghost'
        size='sm'
        className={cn('gap-2', className)}
        disabled
      >
        <HelpCircle className='h-4 w-4' />
        <span className='hidden sm:inline'>{t('support')}</span>
      </Button>
    );
  }

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            
            <DialogTitle className='flex items-center gap-2'>
              <HelpCircle className='h-5 w-5' />
              {t('supportCenter')}
            </DialogTitle>
            <DialogDescription>{t('supportCenterDesc')}</DialogDescription>
          </DialogHeader>
          <DialogContent_Internal />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger || defaultTrigger}</DrawerTrigger>
      <DrawerContent className='max-h-[90vh]'>
        <DrawerHeader>
          
          <DrawerTitle className='flex items-center gap-2'>
            <HelpCircle className='h-5 w-5' />
            {t('supportCenter')}
          </DrawerTitle>
          <DrawerDescription>{t('supportCenterDesc')}</DrawerDescription>
        </DrawerHeader>
        <div className='overflow-y-auto px-4 pb-6'>
          <DialogContent_Internal />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

