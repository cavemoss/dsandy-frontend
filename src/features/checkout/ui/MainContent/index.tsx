'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useCheckoutStore, useStripeStore } from '../../model';
import { CheckoutStepEnum } from '../../types';
import CheckoutPaymentSection from './sections/Payment';
import CheckoutShippingForm from './sections/Shipping';

export function CheckoutMainContent() {
  const step = useCheckoutStore((state) => state.currentStep);
  const { getElementsOptions } = useStripeStore.getState();

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const stripeOptions = getElementsOptions();

  return (
    <div className="lg:col-span-2 space-y-6">
      {step === CheckoutStepEnum.SHIPPING_INFO && <CheckoutShippingForm />}

      {step === CheckoutStepEnum.PAYMENT_INFO && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutPaymentSection />
        </Elements>
      )}
    </div>
  );
}
