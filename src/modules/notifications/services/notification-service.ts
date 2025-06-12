import { db } from '@/lib/db';
import { notifications } from '../schema';
import { CreateNotification } from '../schema';
import {
  broadcastNotification,
  broadcastToOrganization,
} from '@/app/api/notifications/stream/route';

export class NotificationService {
  /**
   * Create a notification for a specific user
   */
  static async createUserNotification(
    orgId: string,
    userId: string,
    notification: Omit<CreateNotification, 'userId'>
  ) {
    const [newNotification] = await db
      .insert(notifications)
      .values({
        orgId,
        userId,
        ...notification,
        expiresAt: notification.expiresAt || null,
      })
      .returning();

    // Broadcast to the specific user
    broadcastNotification(userId, newNotification);

    return newNotification;
  }

  /**
   * Create a notification for a specific resident
   */
  static async createResidentNotification(
    orgId: string,
    residentId: string,
    notification: Omit<CreateNotification, 'residentId'>
  ) {
    const [newNotification] = await db
      .insert(notifications)
      .values({
        orgId,
        residentId,
        userId: null, // Will be delivered to the user linked to this resident
        ...notification,
        expiresAt: notification.expiresAt || null,
      })
      .returning();

    // TODO: Get user ID linked to resident and broadcast
    // For now, broadcast to organization
    broadcastToOrganization(orgId, newNotification);

    return newNotification;
  }

  /**
   * Create an organization-wide notification
   */
  static async createOrganizationNotification(
    orgId: string,
    notification: Omit<CreateNotification, 'userId' | 'residentId'>
  ) {
    const [newNotification] = await db
      .insert(notifications)
      .values({
        orgId,
        userId: null, // Organization-wide
        residentId: null,
        ...notification,
        expiresAt: notification.expiresAt || null,
      })
      .returning();

    // Broadcast to all users in the organization
    broadcastToOrganization(orgId, newNotification);

    return newNotification;
  }

  /**
   * Create a welcome notification for new residents
   */
  static async createWelcomeNotification(
    orgId: string,
    residentId: string,
    residentName: string
  ) {
    return this.createResidentNotification(orgId, residentId, {
      type: 'welcome',
      title: 'Welcome to the Resident Portal!',
      message: `Hi ${residentName}! Welcome to your resident portal. Here you can view announcements, make payments, and stay connected with your community.`,
      category: 'general',
      priority: 'normal',
      metadata: {
        residentName,
        isWelcome: true,
      },
    });
  }

  /**
   * Create payment due notification
   */
  static async createPaymentDueNotification(
    orgId: string,
    residentId: string,
    amount: number,
    dueDate: Date
  ) {
    return this.createResidentNotification(orgId, residentId, {
      type: 'payment_due',
      title: 'Payment Due',
      message: `Your monthly payment of $${amount} is due on ${dueDate.toLocaleDateString()}. Please make your payment to avoid late fees.`,
      category: 'financial',
      priority: 'high',
      metadata: {
        amount,
        dueDate: dueDate.toISOString(),
      },
      actionUrl: '/portal/payments',
      expiresAt: dueDate,
    });
  }

  /**
   * Create maintenance notification
   */
  static async createMaintenanceNotification(
    orgId: string,
    title: string,
    message: string,
    scheduledDate?: Date
  ) {
    return this.createOrganizationNotification(orgId, {
      type: 'maintenance',
      title,
      message,
      category: 'maintenance',
      priority: 'normal',
      metadata: {
        scheduledDate: scheduledDate?.toISOString(),
      },
    });
  }

  /**
   * Create meeting notification
   */
  static async createMeetingNotification(
    orgId: string,
    title: string,
    message: string,
    meetingDate: Date,
    meetingId?: string
  ) {
    return this.createOrganizationNotification(orgId, {
      type: 'meeting',
      title,
      message,
      category: 'community',
      priority: 'normal',
      metadata: {
        meetingDate: meetingDate.toISOString(),
        meetingId,
      },
      actionUrl: meetingId
        ? `/portal/meetings/${meetingId}`
        : '/portal/meetings',
    });
  }

  /**
   * Create announcement notification
   */
  static async createAnnouncementNotification(
    orgId: string,
    announcementTitle: string,
    announcementContent: string,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal',
    announcementId?: string
  ) {
    return this.createOrganizationNotification(orgId, {
      type: 'announcement',
      title: `New Announcement: ${announcementTitle}`,
      message:
        announcementContent.length > 100
          ? `${announcementContent.substring(0, 100)}...`
          : announcementContent,
      category: 'community',
      priority,
      metadata: {
        announcementId,
        fullContent: announcementContent,
      },
      actionUrl: announcementId
        ? `/portal/announcements/${announcementId}`
        : '/portal/announcements',
    });
  }

  /**
   * Create system notification
   */
  static async createSystemNotification(
    orgId: string,
    title: string,
    message: string,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ) {
    return this.createOrganizationNotification(orgId, {
      type: 'system',
      title,
      message,
      category: 'system',
      priority,
    });
  }
}
