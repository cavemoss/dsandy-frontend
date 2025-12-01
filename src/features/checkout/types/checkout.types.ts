import { Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';

import { OrderContactInfoDTO, OrderDTO, OrderShippingInfoDTO } from '@/api/entities';
import { SelectOption } from '@/shared/lib/types';

export interface CheckoutState {
  contactInfo: OrderContactInfoDTO;
  shippingInfo: OrderShippingInfoDTO;
  // actions
  setState: (clb: (s: this) => void) => void;
}

export interface StripeStoreState {
  clientSecret: string | null;
  options: {
    amount: number;
    currency: string;
  };
  isProcessing: boolean;
  order: OrderDTO | null;
  // getters
  getElementsOptions: () => StripeElementsOptions;
  // actions
  setOptions: (opt: this['options']) => void;
  createPaymentIntent: () => Promise<void>;
  confirmPayment: (stripe: Stripe, elements: StripeElements) => Promise<void>;
}

export interface ShippingFormState {
  data: {
    country: string;
    province: string;
    city: string;
    address: string;
    zipCode: string;
    apartment: string;
  };
  postalCodes: {
    iso: string;
    regEx: string;
    mask: string;
  }[];
  // getters
  getCountries: () => SelectOption[];
  getProvinces: () => SelectOption[];
  getCities: () => SelectOption[];
  getPhoneMask: () => string;
  getPostalCode: () => this['postalCodes'][0] | null;
  // actions
  init: () => Promise<void>;
  loadPostalCodes: () => Promise<void>;
  unsetData: (keys: (keyof this['data'])[]) => void;
  setData: (clb: (s: this['data']) => void) => void;
}

export interface PostalCodeDTO {
  Note: string;
  Country: string;
  ISO: string;
  Format: string;
  Regex: string;
}
