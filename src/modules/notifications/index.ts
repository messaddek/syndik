// Components
export { NotificationDropdown } from './ui/components/notification-dropdown';

// Views
export { NotificationSettings } from './ui/views/notification-settings';

// Hooks
export { useRealtimeNotifications } from './hooks/use-realtime-notifications';

// Providers
export {
  NotificationProvider,
  useNotifications,
} from './providers/notification-provider';

// Types (safe to export as they're just type definitions)
export type {
  Notification,
  CreateNotification,
  NotificationPreferences,
} from './schema';

// Note: NotificationService is not exported here to avoid server-only imports
// Import it directly from './services/notification-service' in server components
