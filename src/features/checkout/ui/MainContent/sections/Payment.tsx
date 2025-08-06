'use client';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useEffect } from 'react';

import { useStripeStore } from '@/features/checkout';

export default function CheckoutPaymentSection() {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useStripeStore((state) => state.options.amount);
  const clientSecret = useStripeStore((state) => state.clientSecret);
  const { updateClientSecret } = useStripeStore.getState();

  useEffect(
    () => {
      updateClientSecret();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [amount]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const { error: submitError } = await elements.submit();

    if (submitError) return;
  };

  return <form onSubmit={handleSubmit}>{clientSecret && <PaymentElement />}</form>;
}
