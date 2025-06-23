'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

interface AccountInitFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    role: 'manager' | 'admin' | 'member';
  }) => void;
  isLoading: boolean;
  defaultName?: string;
  defaultEmail?: string;
  defaultRole?: 'manager' | 'admin' | 'member';
  allowedRoles?: ('manager' | 'admin' | 'member')[]; // New prop to restrict roles
  isPortalAccess?: boolean; // New prop to indicate if this is for portal access
}

export const AccountInitForm = ({
  onSubmit,
  isLoading,
  defaultName = '',
  defaultEmail = '',
  defaultRole = 'member',
  allowedRoles,
  isPortalAccess = false,
}: AccountInitFormProps) => {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [role, setRole] = useState<'manager' | 'admin' | 'member'>(defaultRole);

  // Determine available roles based on context
  const availableRoles = useMemo(
    () => allowedRoles || (isPortalAccess ? ['member'] : ['manager', 'admin']),
    [allowedRoles, isPortalAccess]
  );

  // Ensure the current role is valid for the context
  useEffect(() => {
    if (!availableRoles.includes(role)) {
      setRole(availableRoles[0] as 'manager' | 'admin' | 'member');
    }
  }, [availableRoles, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onSubmit({ name: name.trim(), email: email.trim(), role });
    }
  };

  const isFormValid = name.trim().length > 0 && email.trim().length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Syndik!</CardTitle>
        <CardDescription>
          {isPortalAccess
            ? "You're accessing the resident portal. Let's set up your member account to view your property information and communications."
            : "Let's set up your account to get started managing your residential syndicates."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              id='name'
              type='text'
              placeholder='Enter your full name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email address'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='role'>Role</Label>
            {availableRoles.length === 1 ? (
              // If only one role is available, show it as disabled input
              <div className='space-y-2'>
                <Input
                  id='role'
                  type='text'
                  value={
                    availableRoles[0] === 'member'
                      ? 'Member (Portal Access)'
                      : availableRoles[0] === 'manager'
                        ? 'Manager (Dashboard Access)'
                        : 'Administrator (Full Access)'
                  }
                  disabled
                  className='bg-gray-50 text-gray-600'
                />
                {isPortalAccess && (
                  <p className='text-sm text-gray-600'>
                    As a resident, you'll have access to view your property
                    information, communications, and account details through the
                    portal.
                  </p>
                )}
              </div>
            ) : (
              // If multiple roles available, show select dropdown
              <Select
                value={role}
                onValueChange={(value: 'manager' | 'admin' | 'member') =>
                  setRole(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select your role' />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.includes('member') && (
                    <SelectItem value='member'>
                      Member (Portal Access)
                    </SelectItem>
                  )}
                  {availableRoles.includes('manager') && (
                    <SelectItem value='manager'>
                      Manager (Dashboard Access)
                    </SelectItem>
                  )}
                  {availableRoles.includes('admin') && (
                    <SelectItem value='admin'>
                      Administrator (Full Access)
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>

          <Button
            type='submit'
            className='w-full'
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Initializing...' : 'Initialize Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
