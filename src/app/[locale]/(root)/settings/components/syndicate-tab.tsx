'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Building2, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export function SyndicateTab() {
  const trpc = useTRPC();

  // Fetch real data from tRPC
  const { data: account, isLoading: accountLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );

  const { data: organization, isLoading: organizationLoading } = useQuery(
    trpc.organizations.getCurrentOrganization.queryOptions()
  );

  const { data: statistics, isLoading: statisticsLoading } = useQuery(
    trpc.organizations.getStatistics.queryOptions()
  );

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    siret: '',
    address: '',
    units: 0,
    yearBuilt: 2020,
    type: 'residential',
  });

  // Update organization mutation (this would need to be implemented)
  const updateOrganizationMutation = useMutation({
    mutationFn: async (_data: typeof formData) => {
      // TODO: Implement organization update endpoint
      throw new Error('Organization update not yet implemented');
    },
    onSuccess: () => {
      toast.success('Syndicate updated successfully');
      // Invalidate relevant queries
    },
    onError: error => {
      toast.error('Failed to update syndicate: ' + error.message);
    },
  });

  // Initialize form data when organization loads
  useState(() => {
    if (organization || account) {
      setFormData({
        name: organization?.name || account?.organizationName || '',
        siret: '12345678901234', // TODO: Add SIRET field to schema
        address: 'Organization Address', // TODO: Add address field to schema
        units: statistics?.totalUnits || 0,
        yearBuilt: 2020, // TODO: Add year built field to schema
        type: 'residential', // TODO: Add property type field to schema
      });
    }
  });

  const handleSave = async () => {
    try {
      await updateOrganizationMutation.mutateAsync(formData);
    } catch (_error) {
      // Error is handled by the mutation
    }
  };

  // Loading state
  if (accountLoading || organizationLoading || statisticsLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  // Organization info with real data from account and tRPC
  const syndicateInfo = {
    name:
      formData.name ||
      organization?.name ||
      account?.organizationName ||
      'My Organization',
    address: formData.address,
    siret: formData.siret,
    units: formData.units || statistics?.totalUnits || 0,
    residents: statistics?.totalResidents || 0,
    occupancyRate: statistics?.occupancyRate || 0,
    yearBuilt: formData.yearBuilt,
    type: formData.type,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Building2 className='h-5 w-5' />
          Syndicate Information
        </CardTitle>
        <CardDescription>
          Manage your syndicate details and configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='syndicateName'>Syndicate Name</Label>
            <Input
              id='syndicateName'
              value={formData.name}
              onChange={e =>
                setFormData(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='siret'>SIRET Number</Label>
            <Input
              id='siret'
              value={formData.siret}
              onChange={e =>
                setFormData(prev => ({ ...prev, siret: e.target.value }))
              }
            />
            <p className='text-muted-foreground text-xs'>
              Note: SIRET field not yet implemented in backend
            </p>
          </div>
          <div className='space-y-2 md:col-span-2'>
            <Label htmlFor='address'>Address</Label>
            <Textarea
              id='address'
              value={formData.address}
              onChange={e =>
                setFormData(prev => ({ ...prev, address: e.target.value }))
              }
            />
            <p className='text-muted-foreground text-xs'>
              Note: Address field not yet implemented in backend
            </p>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='units'>Number of Units</Label>
            <Input
              id='units'
              type='number'
              value={formData.units}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  units: parseInt(e.target.value) || 0,
                }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='yearBuilt'>Year Built</Label>
            <Input
              id='yearBuilt'
              type='number'
              value={formData.yearBuilt}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  yearBuilt: parseInt(e.target.value) || 2020,
                }))
              }
            />
            <p className='text-muted-foreground text-xs'>
              Note: Year built field not yet implemented in backend
            </p>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='type'>Property Type</Label>
            <Select
              value={formData.type}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='residential'>Residential Complex</SelectItem>
                <SelectItem value='commercial'>Commercial Building</SelectItem>
                <SelectItem value='mixed'>Mixed Use</SelectItem>
              </SelectContent>
            </Select>
            <p className='text-muted-foreground text-xs'>
              Note: Property type field not yet implemented in backend
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          <div className='rounded-lg bg-blue-50 p-4 text-center'>
            <div className='text-primary text-2xl font-bold'>
              {syndicateInfo.units}
            </div>
            <div className='text-sm text-gray-600'>Total Units</div>
          </div>
          <div className='rounded-lg bg-green-50 p-4 text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {syndicateInfo.residents}
            </div>
            <div className='text-sm text-gray-600'>Residents</div>
          </div>
          <div className='rounded-lg bg-purple-50 p-4 text-center'>
            <div className='text-2xl font-bold text-purple-600'>
              {syndicateInfo.occupancyRate}%
            </div>
            <div className='text-sm text-gray-600'>Occupancy</div>
          </div>
          <div className='rounded-lg bg-orange-50 p-4 text-center'>
            <div className='text-2xl font-bold text-orange-600'>4.8/5</div>
            <div className='text-sm text-gray-600'>Satisfaction</div>
            <p className='text-muted-foreground mt-1 text-xs'>Mock data</p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={updateOrganizationMutation.isPending}
          className='flex items-center gap-2'
        >
          {updateOrganizationMutation.isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Save className='h-4 w-4' />
          )}
          {updateOrganizationMutation.isPending
            ? 'Updating...'
            : 'Update Syndicate'}
        </Button>
      </CardContent>
    </Card>
  );
}
