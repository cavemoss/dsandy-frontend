'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcd/card';
import { Skeleton } from '@shadcd/skeleton';
import { AddressElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeAddressElementOptions } from '@stripe/stripe-js';
import { Truck } from 'lucide-react';
import { useState } from 'react';

import { useOrdersStore } from '@/entities/orders';
import { useInitStore } from '@/widgets/init';

import { useStripeStore } from '../..';
import PaymentSection from './PaymentSection';

export function CheckoutForm() {
  const stripeStore = useStripeStore();
  const ordersState = useOrdersStore();
  const initStore = useInitStore();

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const stripeOptions = stripeStore.getElementsOptions();

  const [skeletonShown, setSkeletonShown] = useState(true);

  const addressOptions: StripeAddressElementOptions = {
    mode: 'shipping',
    allowedCountries: initStore.subdomain.config.countries,
    autocomplete: { mode: 'automatic' },
    fields: {
      phone: 'always',
    },
    validation: {
      phone: { required: 'always' },
    },
    display: {
      name: 'split',
    },
    defaultValues: {
      address: {
        country: initStore.viewerParams.country,
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck />
            Shipping Address
          </CardTitle>
          <CardDescription>Enter your delivery details.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddressElement
            options={addressOptions}
            onChange={ordersState.setAddress}
            onLoaderStart={() => setSkeletonShown(false)}
          />
          {skeletonShown && (
            <div className="space-y-2">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="min-h-screen -mt-6 py-12">
        <PaymentSection />
      </div>
    </Elements>
  );
}
