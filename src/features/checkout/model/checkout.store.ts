import { createZustand, deepClone } from '@/shared/lib/utils';

import type { CheckoutState } from '../types';

export const useCheckoutStore = createZustand<CheckoutState>('checkout', (set) => ({
  contactInfo: {
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  },

  shippingInfo: {
    address: '',
    country: '',
    province: '',
    city: '',
    zipCode: '',
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
