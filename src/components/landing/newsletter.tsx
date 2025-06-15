'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const tFooter = useTranslations('footer');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setEmail('');
    // You can add actual newsletter API integration here
    alert(tFooter('newsletter.successMessage'));
  };

  return (
    <div className='mb-12 text-center'>
      <div className='mx-auto max-w-2xl'>
        <Mail className='mx-auto mb-4 h-12 w-12 text-blue-400' />
        <h2 className='mb-4 text-3xl font-bold text-white'>
          {tFooter('newsletter.title')}
        </h2>
        <p className='mb-8 text-lg text-blue-100'>
          {tFooter('newsletter.description')}
        </p>
        <form
          onSubmit={handleNewsletterSubmit}
          className='mx-auto flex max-w-md gap-3'
        >
          <Input
            type='email'
            placeholder={tFooter('newsletter.placeholder')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='flex-1 border-blue-300/30 bg-white/10 text-white backdrop-blur-sm placeholder:text-blue-100 focus:border-blue-300'
          />
          <Button
            type='submit'
            disabled={isSubscribing || !email.trim()}
            className='border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 disabled:opacity-50'
          >
            {isSubscribing ? (
              <>
                <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                {tFooter('newsletter.subscribing')}
              </>
            ) : (
              <>
                <Send className='mr-2 h-4 w-4' />
                {tFooter('newsletter.subscribe')}
              </>
            )}
          </Button>
        </form>
        <p className='mt-3 text-xs text-blue-200'>
          {tFooter('newsletter.disclaimer')}{' '}
          <Link href='/privacy' className='underline hover:text-white'>
            {tFooter('newsletter.privacyPolicy')}
          </Link>
        </p>
      </div>
    </div>
  );
}
