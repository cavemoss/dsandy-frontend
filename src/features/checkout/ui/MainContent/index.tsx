'use client';

import { AddressElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeAddressElementChangeEvent, StripeAddressElementOptions } from '@stripe/stripe-js';
import { Truck } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Skeleton } from '@/shared/shadcd/components/ui/skeleton';
import { useInitStore } from '@/widgets/init';

import { useCheckoutStore, useStripeStore } from '../../model';
import PaymentSection from './PaymentSection';

export function CheckoutForm() {
  const stripeStore = useStripeStore();
  const checkoutStore = useCheckoutStore();
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
  };

  const onChangeAddress = ({ value }: StripeAddressElementChangeEvent) => {
    checkoutStore.setState((state) => {
      const { shippingInfo: si, contactInfo: ci } = state;

      ci.firstName = value.firstName!;
      ci.lastName = value.lastName!;
      ci.phone = value.phone!;

      si.address = value.address.line1;
      si.country = value.address.country;
      if (value.address.line2) si.address2 = value.address.line2;
      si.province = value.address.state;
      si.city = value.address.city;
      si.zipCode = value.address.postal_code;
    });
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
            onChange={onChangeAddress}
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

      <PaymentSection />
    </Elements>
  );
}
