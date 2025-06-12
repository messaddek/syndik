'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useUser } from '@clerk/nextjs';

export function useRealtimeNotifications() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    // Create EventSource for real-time updates
    const eventSource = new EventSource(
      `/api/notifications/stream?userId=${user.id}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'new_notification':
            // Invalidate notification queries to refetch data
            queryClient.invalidateQueries(
              trpc.notifications.getMyNotifications.queryOptions({})
            );
            queryClient.invalidateQueries(
              trpc.notifications.getUnreadCount.queryOptions()
            );

            // Optionally show a toast notification
            if (typeof window !== 'undefined' && 'Notification' in window) {
              if (Notification.permission === 'granted') {
                new Notification(data.notification.title, {
                  body: data.notification.message,
                  icon: '/favicon.ico',
                  tag: data.notification.id,
                });
              }
            }
            break;

          case 'notification_read':
            // Invalidate queries when notification is marked as read
            queryClient.invalidateQueries(
              trpc.notifications.getMyNotifications.queryOptions({})
            );
            queryClient.invalidateQueries(
              trpc.notifications.getUnreadCount.queryOptions()
            );
            break;

          case 'bulk_read':
            // Handle bulk read operations
            queryClient.invalidateQueries(
              trpc.notifications.getMyNotifications.queryOptions({})
            );
            queryClient.invalidateQueries(
              trpc.notifications.getUnreadCount.queryOptions()
            );
            break;
        }
      } catch (_error) {
        // Handle SSE parsing errors silently or use proper error reporting
      }
    };
    eventSource.onerror = _error => {
      // Handle SSE connection errors and attempt reconnection
      // Attempt to reconnect after a delay
      setTimeout(() => {
        if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
          const newEventSource = new EventSource(
            `/api/notifications/stream?userId=${user.id}`
          );
          eventSourceRef.current = newEventSource;
        }
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [user?.id, queryClient, trpc]);

  // Request notification permission on first load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  return {
    // Expose the event source for manual control if needed
    eventSource: eventSourceRef.current,
  };
}
