import { Suspense } from 'react';
import { ResidentProfile } from '@/modules/portal/ui/views/resident-profile';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';

const ProfilePage = () => {
  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <ResidentProfile />
      </Suspense>
    </TRPCErrorBoundary>
  );
};
export default ProfilePage;
