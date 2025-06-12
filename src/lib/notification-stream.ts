import type { Notification as SelectNotification } from '@/lib/schema';

// Store active connections
const connections = new Map<string, ReadableStreamDefaultController>();

// Helper function to broadcast notifications to connected clients
export function broadcastNotification(
  userId: string,
  notification: SelectNotification
) {
  const controller = connections.get(userId);
  if (controller) {
    try {
      controller.enqueue(
        `data: ${JSON.stringify({
          type: 'new_notification',
          notification,
          timestamp: Date.now(),
        })}\n\n`
      );
    } catch (error) {
      console.error('Error broadcasting notification:', error);
      // Connection closed, remove it
      connections.delete(userId);
    }
  }
}

// Helper function to broadcast to all users in an organization
export function broadcastToOrganization(
  orgId: string,
  notification: SelectNotification
) {
  for (const [userId, controller] of connections.entries()) {
    // In a real app, you'd want to check if the user belongs to the org
    // For now, we'll broadcast to all connected users
    try {
      controller.enqueue(
        `data: ${JSON.stringify({
          type: 'new_notification',
          notification,
          timestamp: Date.now(),
        })}\n\n`
      );
    } catch (error) {
      console.error(`Error broadcasting to user ${userId}:`, error);
      connections.delete(userId);
    }
  }
}

// Helper function to notify about read status changes
export function broadcastReadStatus(userId: string, notificationId: string) {
  const controller = connections.get(userId);
  if (controller) {
    try {
      controller.enqueue(
        `data: ${JSON.stringify({
          type: 'notification_read',
          notificationId,
          timestamp: Date.now(),
        })}\n\n`
      );
    } catch (error) {
      console.error('Error broadcasting read status:', error);
      connections.delete(userId);
    }
  }
}

// Helper function to add a connection
export function addConnection(
  userId: string,
  controller: ReadableStreamDefaultController
) {
  connections.set(userId, controller);
}

// Helper function to remove a connection
export function removeConnection(userId: string) {
  connections.delete(userId);
}
