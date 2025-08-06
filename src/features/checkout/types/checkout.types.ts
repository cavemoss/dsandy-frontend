import { StripeElementsOptions } from '@stripe/stripe-js';

import { CheckoutStepEnum, ShippingInfo } from './order-info.types';

export interface CheckoutState {
  currentStep: CheckoutStepEnum;
  shipping: ShippingInfo;
  // actions
  setStep: (step: CheckoutStepEnum) => void;
  setShippingInfo: (callback: (obj: ShippingInfo) => void) => void;
}

export interface StripeStoreState {
  clientSecret: string | null;
  options: {
    amount: number;
    currency: string;
  };
  // getters
  getElementsOptions: () => StripeElementsOptions;
  // actions
  setOptions: (callback: (options: StripeStoreState['options']) => void) => void;
  updateClientSecret: () => Promise<void>;
}
