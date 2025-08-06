import * as api from '@/api/entities/stripe';
import { createZustand } from '@/shared/lib/utils';

import { StripeStoreState } from '../types';

export const useStripeStore = createZustand<StripeStoreState>('stripe', (set, get) => ({
  clientSecret: null,

  options: {
    amount: 4000,
    currency: 'usd',
  },

  // getters
  getElementsOptions: () => ({ mode: 'payment', ...get().options }),

  //actions
  setOptions(callback) {
    const options = get().options;

    callback(options);

    options.amount *= 100;

    set((state) => ((state.options = options), state));
  },

  async updateClientSecret() {
    const { options: dto } = get();

    try {
      const response = await api.stripe.createPaymentIntent(dto);
      set({ clientSecret: response.clientSecret });
    } catch (error) {
      console.debug('Failed to fetch client secret', { error });
    }
  },
}));
