'use client';

import { useEffect } from 'react';

import { CheckoutForm, CheckoutSummary, useStripeStore } from '@/features/checkout';

export default function PaymentPage() {
  const stripeStore = useStripeStore();

  useEffect(() => {
    const handlePopState = () => {
      stripeStore.cancelPayment(true);
      removeEventListener('popstate', handlePopState);
    };

    addEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      <div className="ml-auto w-150">
        <CheckoutForm />
      </div>

      <CheckoutSummary />
    </>
  );
}
