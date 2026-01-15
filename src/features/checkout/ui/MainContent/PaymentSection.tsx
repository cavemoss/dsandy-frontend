'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcd/card';
import { Skeleton } from '@shadcd/skeleton';
import { Spinner } from '@shadcd/spinner';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CreditCard, Sparkles } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

import { useStripeStore } from '@/features/checkout';

export default function PaymentSection() {
  const stripe = useStripe();
  const elements = useElements();
  const stripeStore = useStripeStore();

  const clientSecret = useStripeStore((state) => state.clientSecret);
  const isProcessing = useStripeStore((state) => state.isProcessing);

  const [isElementMounted, setIsElementMounted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stripe && elements) stripeStore.confirmPayment(stripe, elements);
  };

  useEffect(() => void stripeStore.createPaymentIntent(), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard /> Payment Method
        </CardTitle>
        <CardDescription>Securely add your payment method.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {clientSecret && <PaymentElement onLoaderStart={() => setIsElementMounted(true)} />}

          {!isElementMounted && (
            <div className="space-y-2">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          )}

          <Button type="submit" disabled={isProcessing || !isElementMounted} className="w-full">
            {isProcessing ? (
              <>
                <Spinner /> Processing payment...
              </>
            ) : (
              <>
                <Sparkles /> Confirm and Pay
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
