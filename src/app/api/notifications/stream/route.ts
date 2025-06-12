import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { addConnection, removeConnection } from '@/lib/notification-stream';

export async function GET(request: NextRequest) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      // Store the connection
      addConnection(userId, controller);

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
          console.error('Error sending heartbeat:', error);
          clearInterval(heartbeat);
          removeConnection(userId);
        }
      }, 30000); // 30 seconds

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        removeConnection(userId);
        try {
          controller.close();
        } catch (error) {
          console.error('Error closing controller:', error);
          // Controller already closed
        }
      });
    },
    cancel() {
      removeConnection(userId);
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
