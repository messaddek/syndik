'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Loader2, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';

interface OrgRedirectClientProps {
  userId: string;
  orgId: string;
  target?: string;
}

export function OrgRedirectClient({
  userId: _userId,
  orgId: _orgId,
  target,
}: OrgRedirectClientProps) {
  const router = useRouter();
  const { user } = useUser();
  const [loadingMessage, setLoadingMessage] = useState(
    'Checking your account...'
  );
  const [progress, setProgress] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  const trpc = useTRPC();
  // Handle redirect logic
  const handleRedirect = useCallback(
    (userAccount: { role?: string }) => {
      if (hasRedirected) return;

      setHasRedirected(true);
      setProgress(100);
      setLoadingMessage('Redirecting you...');

      setTimeout(() => {
        // Handle specific target requests
        if (target === 'portal') {
          router.push('/portal');
          return;
        }

        // Default role-based routing
        switch (userAccount?.role) {
          case 'admin':
          case 'manager':
            router.push('/dashboard');
            break;
          case 'member':
            router.push('/portal');
            break;
          default:
            router.push('/dashboard');
        }
      }, 800); // Small delay for smooth UX
    },
    [hasRedirected, target, router]
  );

  // Get current account
  const {
    data: account,
    isLoading,
    error,
  } = useQuery(trpc.accounts.getCurrentAccount.queryOptions());

  // Create account mutation for new users
  const createAccount = useMutation(
    trpc.accounts.initAccount.mutationOptions({
      onSuccess: newAccount => {
        setProgress(80);
        setLoadingMessage('Account created! Redirecting...');
        handleRedirect(newAccount);
      },
      onError: error => {
        console.error('Error creating account:', error);
        setLoadingMessage(
          'Error creating account. Redirecting to dashboard...'
        );
        setTimeout(() => router.push('/dashboard'), 2000);
      },
    })
  );
  // Handle account loading
  useEffect(() => {
    if (hasRedirected) return;

    if (account && !isLoading) {
      setProgress(70);
      setLoadingMessage('Account found! Preparing your workspace...');
      handleRedirect(account);
    } else if (!isLoading && !account && user) {
      // No account found, create one
      setProgress(40);
      setLoadingMessage('Setting up your account...');

      createAccount.mutate({
        name:
          `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
          'Unknown User',
        email: user.emailAddresses[0]?.emailAddress || 'unknown@example.com',
        role: 'member', // Default to member role
      });
    }
  }, [account, isLoading, user, hasRedirected, handleRedirect, createAccount]);

  // Handle errors
  useEffect(() => {
    if (error && !hasRedirected) {
      setLoadingMessage('Something went wrong. Redirecting to dashboard...');
      setTimeout(() => {
        setHasRedirected(true);
        router.push('/dashboard');
      }, 2000);
    }
  }, [error, router, hasRedirected]);

  // Update loading messages based on progress
  useEffect(() => {
    if (hasRedirected) return;

    if (progress < 20) {
      setLoadingMessage('Checking your account...');
    } else if (progress < 40) {
      setLoadingMessage('Verifying permissions...');
    } else if (progress < 60) {
      setLoadingMessage('Loading your workspace...');
    } else if (progress < 80) {
      setLoadingMessage('Preparing your dashboard...');
    }
  }, [progress, hasRedirected]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Loading Card */}
        <div className='rounded-2xl bg-white p-8 text-center shadow-xl'>
          {/* Logo/Icon */}
          <div className='mb-6 flex justify-center'>
            {' '}
            <div className='relative'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
                <Image
                  src='/logo.svg'
                  alt='Syndik Logo'
                  width={32}
                  height={32}
                  className='h-8 w-8'
                />
              </div>
              <div className='absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500'>
                <Users className='h-3 w-3 text-white' />
              </div>
            </div>
          </div>

          {/* Loading Spinner */}
          <div className='mb-6 flex justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
          </div>

          {/* Loading Message */}
          <h2 className='mb-2 text-xl font-semibold text-gray-900'>
            Setting up your workspace
          </h2>
          <p className='mb-6 text-gray-600'>{loadingMessage}</p>

          {/* Progress Bar */}
          <div className='mb-6 h-2 w-full rounded-full bg-gray-200'>
            <div
              className='h-2 rounded-full bg-blue-600 transition-all duration-500 ease-out'
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className='mb-4 text-sm text-gray-500'>
            {Math.min(progress, 100)}% complete
          </div>

          {/* Feature Preview (while loading) */}
          {progress > 30 && !error && (
            <div className='space-y-3 text-left'>
              <div className='flex items-center text-sm text-gray-600'>
                <ArrowRight className='mr-2 h-4 w-4 text-green-500' />
                <span>Authentication verified</span>
              </div>
              {progress > 50 && (
                <div className='flex items-center text-sm text-gray-600'>
                  <ArrowRight className='mr-2 h-4 w-4 text-green-500' />
                  <span>Workspace ready</span>
                </div>
              )}
              {progress > 70 && (
                <div className='flex items-center text-sm text-gray-600'>
                  <ArrowRight className='mr-2 h-4 w-4 text-green-500' />
                  <span>Permissions loaded</span>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-3'>
              <div className='flex items-center text-sm text-red-600'>
                <AlertCircle className='mr-2 h-4 w-4' />
                <span>
                  {error.message ||
                    'An error occurred. Redirecting to dashboard...'}
                </span>
              </div>
            </div>
          )}

          {/* Creating Account State */}
          {createAccount.isPending && (
            <div className='mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3'>
              <div className='flex items-center text-sm text-blue-600'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                <span>Creating your account...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            Powered by Syndik • Residential Management Platform
          </p>
        </div>
      </div>
    </div>
  );
}
