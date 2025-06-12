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

// Services
export { NotificationService } from './services/notification-service';

// Types
export type {
  Notification,
  CreateNotification,
  NotificationPreferences,
} from './schema';
