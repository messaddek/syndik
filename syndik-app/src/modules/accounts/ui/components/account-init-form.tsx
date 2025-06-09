'use client';

import { useState } from 'react';
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
    role: 'manager' | 'admin';
  }) => void;
  isLoading: boolean;
  defaultName?: string;
  defaultEmail?: string;
}

export function AccountInitForm({
  onSubmit,
  isLoading,
  defaultName = '',
  defaultEmail = '',
}: AccountInitFormProps) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [role, setRole] = useState<'manager' | 'admin'>('manager');

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
          Let&apos;s set up your account to get started managing your
          residential syndicates.
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
            <Select
              value={role}
              onValueChange={(value: 'manager' | 'admin') => setRole(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select your role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='manager'>Manager</SelectItem>
                <SelectItem value='admin'>Administrator</SelectItem>
              </SelectContent>
            </Select>
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
}
