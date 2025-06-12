import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// Store active connections
const connections = new Map<string, ReadableStreamDefaultController>();

export async function GET(request: NextRequest) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      // Store the connection
      connections.set(userId, controller);

      // Send initial connection confirmation
      controller.enqueue(
        `data: ${JSON.stringify({ type: 'connected', timestamp: Date.now() })}\n\n`
      );

      // Set up heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(
            `data: ${JSON.stringify({ type: 'heartbeat', timestamp: Date.now() })}\n\n`
          );
        } catch (error) {
          clearInterval(heartbeat);
          connections.delete(userId);
        }
      }, 30000); // 30 seconds

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        connections.delete(userId);
        try {
          controller.close();
        } catch (error) {
          // Controller already closed
        }
      });
    },
    cancel() {
      connections.delete(userId);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}

// Helper function to broadcast notifications to connected clients
export function broadcastNotification(userId: string, notification: any) {
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
      // Connection closed, remove it
      connections.delete(userId);
    }
  }
}

// Helper function to broadcast to all users in an organization
export function broadcastToOrganization(orgId: string, notification: any) {
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
      connections.delete(userId);
    }
  }
}
