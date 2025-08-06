import { createZustand, deepClone } from '@/shared/lib/utils';

import type { CheckoutState } from '../types';
import { CheckoutStepEnum } from '../types';

export const useCheckoutStore = createZustand<CheckoutState>('checkout', (set, get) => ({
  currentStep: CheckoutStepEnum.SHIPPING_INFO,

  shipping: {
    recipient: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
    },
    address: {
      apartment: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },

  // actions
  setStep: (step) => set({ currentStep: step }),

  setShippingInfo(callback) {
    const shippingInfo = get().shipping;

    callback(shippingInfo);

    set((state) => ((state.shipping = shippingInfo), deepClone(state)));
  },
}));
