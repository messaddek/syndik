import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
