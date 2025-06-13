import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
// import { api } from '@/lib/api';

interface UseArticleTrackingOptions {
  articleSlug: string;
  title: string;
  enabled?: boolean;
}

/**
 * Hook to automatically track article views and reading analytics
 */
export function useArticleTracking({
  articleSlug,
  title,
  enabled = true,
}: UseArticleTrackingOptions) {
  const startTimeRef = useRef<number | undefined>(undefined);
  const hasTrackedView = useRef(false);
  const readPercentageRef = useRef(0);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // TODO: Re-enable when TRPC client is properly set up
  const trackViewMutation = useMutation(
    trpc.articles.trackView.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.articles.getComments.queryOptions({
            articleSlug,
          })
        );
      },
    })
  );

  // Track initial view
  useEffect(() => {
    if (!enabled || hasTrackedView.current) return;

    const sessionId = getOrCreateSessionId();
    const referrer = document.referrer || undefined;

    // TODO: Track the view when TRPC is working
    trackViewMutation.mutate({
      articleSlug,
      sessionId,
      referrer,
    });

    // For now, just console log
    console.log('Article view tracked:', { articleSlug, sessionId, referrer });

    hasTrackedView.current = true;
    startTimeRef.current = Date.now();

    // Track page title for analytics
    document.title = `${title} - Syndik User Guide`;
  }, [articleSlug, title, enabled, trackViewMutation]);

  // Track reading progress
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      readPercentageRef.current = Math.max(
        readPercentageRef.current,
        scrollPercent
      );
    };
    const handleBeforeUnload = () => {
      if (startTimeRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

        // TODO: Send final analytics when TRPC is working
        // navigator.sendBeacon('/api/trpc/articles.trackView', JSON.stringify({
        //   articleSlug,
        //   duration,
        //   readPercentage: readPercentageRef.current,
        // }));

        console.log('Article reading completed:', {
          articleSlug,
          duration,
          readPercentage: readPercentageRef.current,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [articleSlug, enabled]);

  return {
    trackingEnabled: enabled,
    hasTracked: hasTrackedView.current,
  };
}

/**
 * Get or create a session ID for anonymous tracking
 */
function getOrCreateSessionId(): string {
  const key = 'syndik_session_id';
  let sessionId = sessionStorage.getItem(key);

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }

  return sessionId;
}
