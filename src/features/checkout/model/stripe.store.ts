import { toast } from 'sonner';

import * as api from '@/api/entities/stripe';
import { useOrdersStore } from '@/entities/orders';
import { useCartStore } from '@/features/cart';
import { createZustand } from '@/shared/lib/utils';
import { useInitStore, useNavStore } from '@/widgets/init';

import { StripeStoreState } from '../types';

export const useStripeStore = createZustand<StripeStoreState>('stripe', (set, get) => ({
  clientSecret: null,

  isProcessing: false,

  options: {
    amount: 100,
    currency: 'usd',
  },

  order: null,

  // Getters

  getElementsOptions: () => ({ mode: 'payment', ...get().options }),

  // Actions

  setOptions: (opt) => {
    set({
      options: {
        amount: opt.amount * 100,
        currency: opt.currency,
      },
    });
  },

  async createPaymentIntent() {
    const self = get();
    const initStore = useInitStore.getState();
    const cartStore = useCartStore.getState();

    if (self.order || self.clientSecret) return;

    self.setOptions({
      amount: cartStore.getTotal(),
      currency: initStore.viewerParams.currency.toLowerCase(),
    });

    try {
      const order = await useOrdersStore.getState().placeOrder();

      if (!order) return;

      set({ order });

      const { clientSecret } = await api.stripe.createPaymentIntent({
        metadata: {
          orderId: order.id,
          tenantId: initStore.subdomain.tenantId,
        },
        ...get().options,
      });

      set({ clientSecret });

      const _20_MIN = 1000 * 60 * 20;

      setTimeout(() => set({ clientSecret: null }), _20_MIN);
    } catch (error) {
      console.debug('Failed to fetch client secret', { error });
    }
  },

  async confirmPayment(stripe, elements) {
    const { clientSecret } = get();

    if (!clientSecret) return;

    set({ isProcessing: true });

    const { error: submitError, selectedPaymentMethod } = await elements.submit();

    if (submitError) {
      console.log('Stripe elements submit error', { submitError });
      toast.error('There an error with your information');

      return set({ isProcessing: false });
    }

    console.info({ selectedPaymentMethod });

    await useOrdersStore.getState().updateOrderInfo();

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: location.origin },
      redirect: 'if_required',
    });

    if (confirmError) {
      console.error('Error confirming payment', { confirmError });
      toast.error('There was an error with your payment');

      return set({ isProcessing: false });
    }

    console.info({ paymentIntent });

    toast.success('Success!');
    useNavStore.getState().push('/order-complete');
    localStorage.removeItem('cartItems');

    set({ isProcessing: false, clientSecret: null });
  },
}));
