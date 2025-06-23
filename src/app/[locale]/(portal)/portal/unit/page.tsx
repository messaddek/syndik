import { ResidentAccessGuard, UnitView } from '@/modules/portal';

const UnitPage = () => {
  return (
    <ResidentAccessGuard>
      <UnitView />
    </ResidentAccessGuard>
  );
};
export default UnitPage;
