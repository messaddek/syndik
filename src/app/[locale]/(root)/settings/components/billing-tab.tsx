'use client';

import {
  CreditCard,
  Calendar,
  Mail,
  Download,
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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const BillingTab = () => {
  // Mock billing info (would come from payment provider like Stripe)
  const billingInfo = {
    plan: 'Professional',
    nextBilling: '2024-07-10',
    amount: '89.99€',
    paymentMethod: '**** **** **** 4242',
    billingEmail: 'user@example.com', // Would come from user data
  };

  const handleChangePlan = () => {
    toast.error(
      'Plan changes not yet implemented - requires payment provider integration'
    );
  };

  const handleUpdatePaymentMethod = () => {
    toast.error(
      'Payment method updates not yet implemented - requires Stripe integration'
    );
  };

  const handleDownloadInvoice = () => {
    toast.error(
      'Invoice downloads not yet implemented - requires billing system integration'
    );
  };

  return (
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
          <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
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
            <div className='text-lg font-semibold'>{billingInfo.amount}</div>
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
          <Button variant='outline' onClick={handleChangePlan}>
            Change Plan
          </Button>
          <Button variant='outline' onClick={handleUpdatePaymentMethod}>
            Update Payment Method
          </Button>
          <Button
            variant='outline'
            className='flex items-center gap-2'
            onClick={handleDownloadInvoice}
          >
            <Download className='h-4 w-4' />
            Download Invoice
          </Button>
        </div>

        <div className='space-y-2'>
          <p className='text-muted-foreground text-sm'>
            All billing features are mocked and require integration with:
          </p>
          <ul className='text-muted-foreground ml-4 list-inside list-disc space-y-1 text-xs'>
            <li>Payment provider (Stripe, PayPal, etc.)</li>
            <li>Subscription management system</li>
            <li>Invoice generation service</li>
            <li>Plan management and pricing tiers</li>
          </ul>
        </div>

        <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
          <div className='flex items-start gap-3'>
            <CheckCircle className='mt-0.5 h-5 w-5 text-green-600' />
            <div>
              <h5 className='font-medium text-green-800'>Payment Status</h5>
              <p className='mt-1 text-sm text-green-700'>
                All payments are up to date. Your subscription will renew
                automatically.
              </p>
              <p className='mt-1 text-xs text-green-600'>
                Note: This is mock data for demonstration purposes
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
