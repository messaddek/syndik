import EnvironmentDebugger from '@/components/environment-debugger';

export default function DebugPage() {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-6 text-3xl font-bold'>🔧 Vercel Environment Test</h1>
      <EnvironmentDebugger />
    </div>
  );
}
