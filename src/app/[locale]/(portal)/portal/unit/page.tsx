import { ResidentAccessGuard, UnitView } from '@/modules/portal';

export default function UnitPage() {
  return (
    <ResidentAccessGuard>
      <UnitView />
    </ResidentAccessGuard>
  );
}
