'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

interface ArticleRatingProps {
  articleSlug: string;
  className?: string;
}

export const ArticleRating: React.FC<ArticleRatingProps> = ({
  articleSlug,
  className,
}) => {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const trpc = useTRPC();

  const rateArticleMutation = useMutation(
    trpc.articles.rateArticle.mutationOptions({
      onSuccess: () => {
        setIsSubmitted(true);
      },
    })
  );

  const handleSubmitRating = () => {
    if (!rating || !user) return;

    rateArticleMutation.mutate({
      articleSlug,
      rating,
      comment: comment.trim() || undefined,
      isHelpful: isHelpful ?? undefined,
    });
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  if (!user) {
    return (
      <Card className={className}>
        <CardContent className='pt-6 text-center'>
          <p className='text-muted-foreground'>
            Please sign in to rate this article
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className='pt-6 text-center'>
          <div className='space-y-3'>
            <div className='flex justify-center'>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={cn(
                    'h-6 w-6',
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <p className='font-medium text-green-600'>
              Thank you for rating this article!
            </p>
            {comment && (
              <p className='text-muted-foreground text-sm'>
                Your feedback helps us improve our documentation.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='text-lg'>Rate This Article</CardTitle>
        <p className='text-muted-foreground text-sm'>
          Help us improve by sharing your experience
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Star Rating */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>
            How would you rate this article?
          </label>
          <div className='flex items-center space-x-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type='button'
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className='p-1 transition-transform hover:scale-110'
              >
                <Star
                  className={cn(
                    'h-8 w-8 transition-colors',
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-200'
                  )}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className='text-muted-foreground text-sm'>
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          )}
        </div>

        {/* Helpful Feedback */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>
            Was this article helpful?
          </label>
          <div className='flex items-center space-x-4'>
            <Button
              variant={isHelpful === true ? 'default' : 'outline'}
              size='sm'
              onClick={() => setIsHelpful(true)}
              className='flex items-center space-x-2'
            >
              <ThumbsUp className='h-4 w-4' />
              <span>Yes</span>
            </Button>
            <Button
              variant={isHelpful === false ? 'default' : 'outline'}
              size='sm'
              onClick={() => setIsHelpful(false)}
              className='flex items-center space-x-2'
            >
              <ThumbsDown className='h-4 w-4' />
              <span>No</span>
            </Button>
          </div>
        </div>

        {/* Optional Comment */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>
            Additional feedback (optional)
          </label>
          <Textarea
            placeholder='Share any suggestions or feedback to help us improve...'
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            maxLength={500}
          />
          <p className='text-muted-foreground text-xs'>
            {comment.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button
            onClick={handleSubmitRating}
            disabled={!rating || rateArticleMutation.isPending}
            className='min-w-24'
          >
            {rateArticleMutation.isPending ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleRating;
