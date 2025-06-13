'use client';

import { useState } from 'react';
import {
  Palette,
  Download,
  FileText,
  Trash2,
  Save,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'europe/paris',
    dateFormat: 'dd/mm/yyyy',
    currency: 'eur',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement preferences saving
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Preferences saved successfully');
    } catch {
      toast.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    toast.error(
      'Data export not yet implemented - requires data export service'
    );
  };

  const handleDownloadReports = () => {
    toast.error(
      'Report downloads not yet implemented - requires reporting system'
    );
  };

  const handleDeleteAccount = () => {
    toast.error(
      'Account deletion not yet implemented - requires proper data cleanup procedures'
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Palette className='h-5 w-5' />
          Application Preferences
        </CardTitle>
        <CardDescription>
          Customize your application experience and appearance.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Language</Label>
            <Select
              value={preferences.language}
              onValueChange={value =>
                setPreferences(prev => ({ ...prev, language: value }))
              }
            >
              <SelectTrigger className='w-48'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='en'>English</SelectItem>
                <SelectItem value='fr'>Français</SelectItem>
                <SelectItem value='es'>Español</SelectItem>
                <SelectItem value='de'>Deutsch</SelectItem>
              </SelectContent>
            </Select>
            <p className='text-muted-foreground text-xs'>
              Note: Internationalization not yet implemented
            </p>
          </div>

          <div className='space-y-2'>
            <Label>Timezone</Label>
            <Select
              value={preferences.timezone}
              onValueChange={value =>
                setPreferences(prev => ({ ...prev, timezone: value }))
              }
            >
              <SelectTrigger className='w-64'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='europe/paris'>Europe/Paris (CET)</SelectItem>
                <SelectItem value='europe/london'>
                  Europe/London (GMT)
                </SelectItem>
                <SelectItem value='america/new_york'>
                  America/New_York (EST)
                </SelectItem>
                <SelectItem value='america/los_angeles'>
                  America/Los_Angeles (PST)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Date Format</Label>
            <Select
              value={preferences.dateFormat}
              onValueChange={value =>
                setPreferences(prev => ({ ...prev, dateFormat: value }))
              }
            >
              <SelectTrigger className='w-48'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='dd/mm/yyyy'>DD/MM/YYYY</SelectItem>
                <SelectItem value='mm/dd/yyyy'>MM/DD/YYYY</SelectItem>
                <SelectItem value='yyyy-mm-dd'>YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Currency</Label>
            <Select
              value={preferences.currency}
              onValueChange={value =>
                setPreferences(prev => ({ ...prev, currency: value }))
              }
            >
              <SelectTrigger className='w-48'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='eur'>EUR (€)</SelectItem>
                <SelectItem value='usd'>USD ($)</SelectItem>
                <SelectItem value='gbp'>GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className='flex items-center gap-2'
          >
            {isSaving ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </Button>
          <p className='text-muted-foreground text-xs'>
            Note: Preferences are not persisted yet - requires backend
            implementation
          </p>
        </div>

        <Separator />

        <div className='space-y-4'>
          <h4 className='text-lg font-semibold'>Data Management</h4>

          <div className='flex gap-3'>
            <Button
              variant='outline'
              className='flex items-center gap-2'
              onClick={handleExportData}
            >
              <Download className='h-4 w-4' />
              Export Data
            </Button>
            <Button
              variant='outline'
              className='flex items-center gap-2'
              onClick={handleDownloadReports}
            >
              <FileText className='h-4 w-4' />
              Download Reports
            </Button>
          </div>

          <div className='space-y-2'>
            <p className='text-muted-foreground text-sm'>
              Data management features require implementation of:
            </p>
            <ul className='text-muted-foreground ml-4 list-inside list-disc space-y-1 text-xs'>
              <li>Data export service (GDPR compliance)</li>
              <li>Report generation system</li>
              <li>Data archival and backup systems</li>
              <li>User data deletion procedures</li>
            </ul>
          </div>

          <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <Trash2 className='mt-0.5 h-5 w-5 text-red-600' />
                <div>
                  <h5 className='font-medium text-red-800'>Danger Zone</h5>
                  <p className='mt-1 text-sm text-red-700'>
                    Permanently delete your account and all associated data.
                  </p>
                  <p className='mt-1 text-xs text-red-600'>
                    Note: Account deletion is not yet implemented and requires
                    proper data cleanup procedures, GDPR compliance, and safety
                    measures.
                  </p>
                </div>
              </div>
              <Button
                variant='destructive'
                size='sm'
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
