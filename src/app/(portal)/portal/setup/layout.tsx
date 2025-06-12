import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    redirect('/sign-in');
  }

  return (
    <TRPCErrorBoundary>
      <div className='bg-background min-h-screen'>
        <div className='container mx-auto py-12'>{children}</div>
      </div>
    </TRPCErrorBoundary>
  );
}
