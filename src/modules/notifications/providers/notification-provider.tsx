'use client';

import { createContext, useContext } from 'react';
import { useRealtimeNotifications } from '../hooks/use-realtime-notifications';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

interface NotificationContextType {
  unreadCount: number;
  hasUnread: boolean;
}

const NotificationContext = createContext<NotificationContextType>({
  unreadCount: 0,
  hasUnread: false,
});

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  // Initialize real-time notifications
  useRealtimeNotifications();

  const trpc = useTRPC();

  // Get unread count
  const { data: unreadCount } = useQuery(
    trpc.notifications.getUnreadCount.queryOptions()
  );

  const contextValue: NotificationContextType = {
    unreadCount: unreadCount?.total || 0,
    hasUnread: (unreadCount?.total || 0) > 0,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
}
