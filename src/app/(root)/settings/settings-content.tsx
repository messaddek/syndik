'use client';

import { useState } from 'react';
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  FileText,
  Palette,
  Download,
  Trash2,
  Save,
  CheckCircle,
} from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Fake data
const currentUser = {
  id: '1',
  firstName: 'Mohammed',
  lastName: 'ESSADDEK',
  email: 'mohammed.essaddek@syndik.com',
  phone: '+33 6 12 34 56 78',
  role: 'Syndicate Manager',
  avatar: '',
  joinDate: '2023-01-15',
  lastLogin: '2024-06-10T10:30:00Z',
};

const syndicateInfo = {
  name: 'Les Jardins de la Paix',
  address: '123 Avenue des Champs, 75008 Paris, France',
  siret: '12345678901234',
  units: 45,
  residents: 127,
  yearBuilt: 1985,
  type: 'Residential Complex',
};

const billingInfo = {
  plan: 'Professional',
  nextBilling: '2024-07-10',
  amount: '89.99€',
  paymentMethod: '**** **** **** 4242',
  billingEmail: 'billing@syndik.com',
};

export function SettingsContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    maintenanceAlerts: true,
    financialUpdates: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
    analytics: true,
    marketing: false,
  });
  const handleSave = () => {
    // Simulate save action
    // TODO: Implement actual save functionality
  };

  return (
    <div className='container mx-auto max-w-6xl py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Settings</h1>
        <p className='mt-2 text-gray-600'>
          Manage your account, syndicate, and application preferences.
        </p>
      </div>

      <Tabs defaultValue='profile' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-6'>
          <TabsTrigger value='profile' className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            <span className='hidden sm:inline'>Profile</span>
          </TabsTrigger>
          <TabsTrigger value='syndicate' className='flex items-center gap-2'>
            <Building2 className='h-4 w-4' />
            <span className='hidden sm:inline'>Syndicate</span>
          </TabsTrigger>
          <TabsTrigger
            value='notifications'
            className='flex items-center gap-2'
          >
            <Bell className='h-4 w-4' />
            <span className='hidden sm:inline'>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value='security' className='flex items-center gap-2'>
            <Shield className='h-4 w-4' />
            <span className='hidden sm:inline'>Security</span>
          </TabsTrigger>
          <TabsTrigger value='billing' className='flex items-center gap-2'>
            <CreditCard className='h-4 w-4' />
            <span className='hidden sm:inline'>Billing</span>
          </TabsTrigger>
          <TabsTrigger value='preferences' className='flex items-center gap-2'>
            <Palette className='h-4 w-4' />
            <span className='hidden sm:inline'>Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value='profile' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center gap-6'>
                <Avatar className='h-20 w-20'>
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className='text-lg'>
                    {currentUser.firstName[0]}
                    {currentUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                  <Button variant='outline'>Change Photo</Button>
                  <Button variant='ghost' size='sm' className='text-red-600'>
                    Remove Photo
                  </Button>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id='firstName' defaultValue={currentUser.firstName} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id='lastName' defaultValue={currentUser.lastName} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    defaultValue={currentUser.email}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone</Label>
                  <Input id='phone' defaultValue={currentUser.phone} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='role'>Role</Label>
                  <Select defaultValue='manager'>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='manager'>Syndicate Manager</SelectItem>
                      <SelectItem value='admin'>Administrator</SelectItem>
                      <SelectItem value='assistant'>
                        Assistant Manager
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Member Since</Label>
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <Calendar className='h-4 w-4' />
                    {new Date(currentUser.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className='flex items-center gap-2'>
                <Save className='h-4 w-4' />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Syndicate Tab */}
        <TabsContent value='syndicate' className='space-y-6'>
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
                  <Input id='syndicateName' defaultValue={syndicateInfo.name} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='siret'>SIRET Number</Label>
                  <Input id='siret' defaultValue={syndicateInfo.siret} />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Textarea id='address' defaultValue={syndicateInfo.address} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='units'>Number of Units</Label>
                  <Input
                    id='units'
                    type='number'
                    defaultValue={syndicateInfo.units}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='yearBuilt'>Year Built</Label>
                  <Input
                    id='yearBuilt'
                    type='number'
                    defaultValue={syndicateInfo.yearBuilt}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Property Type</Label>
                  <Select defaultValue='residential'>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='residential'>
                        Residential Complex
                      </SelectItem>
                      <SelectItem value='commercial'>
                        Commercial Building
                      </SelectItem>
                      <SelectItem value='mixed'>Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                <div className='rounded-lg bg-blue-50 p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
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
                  <div className='text-2xl font-bold text-purple-600'>95%</div>
                  <div className='text-sm text-gray-600'>Occupancy</div>
                </div>
                <div className='rounded-lg bg-orange-50 p-4 text-center'>
                  <div className='text-2xl font-bold text-orange-600'>
                    4.8/5
                  </div>
                  <div className='text-sm text-gray-600'>Satisfaction</div>
                </div>
              </div>

              <Button onClick={handleSave} className='flex items-center gap-2'>
                <Save className='h-4 w-4' />
                Update Syndicate
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value='notifications' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Bell className='h-5 w-5' />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to receive notifications and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Email Notifications</Label>
                    <div className='text-sm text-gray-500'>
                      Receive important updates via email
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        emailNotifications: checked,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>SMS Notifications</Label>
                    <div className='text-sm text-gray-500'>
                      Get urgent alerts via text message
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        smsNotifications: checked,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Push Notifications</Label>
                    <div className='text-sm text-gray-500'>
                      Browser and mobile app notifications
                    </div>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        pushNotifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Weekly Reports</Label>
                    <div className='text-sm text-gray-500'>
                      Summary of syndicate activities
                    </div>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        weeklyReports: checked,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Maintenance Alerts</Label>
                    <div className='text-sm text-gray-500'>
                      New requests and status updates
                    </div>
                  </div>
                  <Switch
                    checked={notifications.maintenanceAlerts}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        maintenanceAlerts: checked,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Financial Updates</Label>
                    <div className='text-sm text-gray-500'>
                      Budget changes and payment reminders
                    </div>
                  </div>
                  <Switch
                    checked={notifications.financialUpdates}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        financialUpdates: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSave} className='flex items-center gap-2'>
                <Save className='h-4 w-4' />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value='security' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5' />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='currentPassword'>Current Password</Label>
                  <div className='relative'>
                    <Input
                      id='currentPassword'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter current password'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <Input
                    id='newPassword'
                    type='password'
                    placeholder='Enter new password'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='Confirm new password'
                  />
                </div>

                <Button variant='outline' className='flex items-center gap-2'>
                  <Lock className='h-4 w-4' />
                  Change Password
                </Button>
              </div>

              <Separator />

              <div className='space-y-4'>
                <h4 className='text-lg font-semibold'>Privacy Settings</h4>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Profile Visibility</Label>
                    <div className='text-sm text-gray-500'>
                      Make your profile visible to other residents
                    </div>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={checked =>
                      setPrivacy(prev => ({ ...prev, profileVisible: checked }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Data Sharing</Label>
                    <div className='text-sm text-gray-500'>
                      Share anonymized data for platform improvements
                    </div>
                  </div>
                  <Switch
                    checked={privacy.dataSharing}
                    onCheckedChange={checked =>
                      setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Analytics</Label>
                    <div className='text-sm text-gray-500'>
                      Help us improve by sharing usage analytics
                    </div>
                  </div>
                  <Switch
                    checked={privacy.analytics}
                    onCheckedChange={checked =>
                      setPrivacy(prev => ({ ...prev, analytics: checked }))
                    }
                  />
                </div>
              </div>

              <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                <div className='flex items-start gap-3'>
                  <Shield className='mt-0.5 h-5 w-5 text-yellow-600' />
                  <div>
                    <h5 className='font-medium text-yellow-800'>
                      Security Status
                    </h5>
                    <p className='mt-1 text-sm text-yellow-700'>
                      Your account is secure. Last login:{' '}
                      {new Date(currentUser.lastLogin).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value='billing' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CreditCard className='h-5 w-5' />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription plan and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between rounded-lg bg-blue-50 p-4'>
                <div>
                  <h4 className='font-semibold text-blue-900'>Current Plan</h4>
                  <p className='text-blue-700'>{billingInfo.plan}</p>
                </div>
                <Badge
                  variant='secondary'
                  className='bg-blue-100 text-blue-800'
                >
                  Active
                </Badge>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Next Billing Date</Label>
                  <div className='flex items-center gap-2 text-sm'>
                    <Calendar className='h-4 w-4 text-gray-500' />
                    {new Date(billingInfo.nextBilling).toLocaleDateString()}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Amount</Label>
                  <div className='text-lg font-semibold'>
                    {billingInfo.amount}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Payment Method</Label>
                  <div className='flex items-center gap-2 text-sm'>
                    <CreditCard className='h-4 w-4 text-gray-500' />
                    {billingInfo.paymentMethod}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Billing Email</Label>
                  <div className='flex items-center gap-2 text-sm'>
                    <Mail className='h-4 w-4 text-gray-500' />
                    {billingInfo.billingEmail}
                  </div>
                </div>
              </div>

              <div className='flex gap-3'>
                <Button variant='outline'>Change Plan</Button>
                <Button variant='outline'>Update Payment Method</Button>
                <Button variant='outline' className='flex items-center gap-2'>
                  <Download className='h-4 w-4' />
                  Download Invoice
                </Button>
              </div>

              <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                <div className='flex items-start gap-3'>
                  <CheckCircle className='mt-0.5 h-5 w-5 text-green-600' />
                  <div>
                    <h5 className='font-medium text-green-800'>
                      Payment Status
                    </h5>
                    <p className='mt-1 text-sm text-green-700'>
                      All payments are up to date. Your subscription will renew
                      automatically.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value='preferences' className='space-y-6'>
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
                  <Select defaultValue='en'>
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
                </div>

                <div className='space-y-2'>
                  <Label>Timezone</Label>
                  <Select defaultValue='europe/paris'>
                    <SelectTrigger className='w-64'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='europe/paris'>
                        Europe/Paris (CET)
                      </SelectItem>
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
                  <Select defaultValue='dd/mm/yyyy'>
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
                  <Select defaultValue='eur'>
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
              </div>

              <Separator />

              <div className='space-y-4'>
                <h4 className='text-lg font-semibold'>Data Management</h4>

                <div className='flex gap-3'>
                  <Button variant='outline' className='flex items-center gap-2'>
                    <Download className='h-4 w-4' />
                    Export Data
                  </Button>
                  <Button variant='outline' className='flex items-center gap-2'>
                    <FileText className='h-4 w-4' />
                    Download Reports
                  </Button>
                </div>

                <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3'>
                      <Trash2 className='mt-0.5 h-5 w-5 text-red-600' />
                      <div>
                        <h5 className='font-medium text-red-800'>
                          Danger Zone
                        </h5>
                        <p className='mt-1 text-sm text-red-700'>
                          Permanently delete your account and all associated
                          data.
                        </p>
                      </div>
                    </div>
                    <Button variant='destructive' size='sm'>
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className='flex items-center gap-2'>
                <Save className='h-4 w-4' />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
