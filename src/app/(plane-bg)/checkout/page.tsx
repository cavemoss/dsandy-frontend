'use client';

import { useEffect } from 'react';

import { CheckoutForm, CheckoutSummary, useStripeStore } from '@/features/checkout';

export default function PaymentPage() {
  const stripeStore = useStripeStore();

  useEffect(() => {
    const handlePopState = () => {
      stripeStore.cancelPayment(false);
      removeEventListener('popstate', handlePopState);
    };
    addEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="relative max-h-full w-full py-10 sm:p-12 overflow-y-scroll hide-scrollbar flex flex-col md:flex-row gap-6 md:gap-10">
      <CheckoutSummary className="block md:hidden" />
      <CheckoutForm />
      <CheckoutSummary className="hidden md:block" />
    </div>
  );
}
