'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';

export function TestimonialsSection() {
  const t = useTranslations('landing.testimonials');
  const testimonials = [
    {
      content: t('reviews.0.content'),
      author: {
        name: t('reviews.0.author.name'),
        role: t('reviews.0.author.role'),
        company: t('reviews.0.author.company'),
        avatar: 'MD',
      },
    },
    {
      content: t('reviews.1.content'),
      author: {
        name: t('reviews.1.author.name'),
        role: t('reviews.1.author.role'),
        company: t('reviews.1.author.company'),
        avatar: 'AH',
      },
    },
    {
      content: t('reviews.2.content'),
      author: {
        name: t('reviews.2.author.name'),
        role: t('reviews.2.author.role'),
        company: t('reviews.2.author.company'),
        avatar: 'SJ',
      },
    },
  ];

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {' '}
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-primary text-base leading-7 font-semibold'>
            {t('subtitle')}
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {t('title')}
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            {t('description')}
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
}
