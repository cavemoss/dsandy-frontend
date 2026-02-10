import { toast } from 'sonner';

import * as api from '@/api/entities/stripe';
import { useOrdersStore } from '@/entities/orders';
import { useCartStore } from '@/features/cart';
import { createZustand } from '@/shared/lib/utils';
import { useInitStore, useNavStore } from '@/widgets/init';

import { PAYMENT_TIMEOUT } from '../lib';
import { StripeStoreState } from '../types';

export const useStripeStore = createZustand<StripeStoreState>('stripe', (set, get) => ({
  isProcessing: false,

  clientSecret: null,

  options: {
    amount: 100,
    currency: 'usd',
  },

  // Getters

  getElementsOptions: () => ({
    mode: 'payment',
    paymentMethodCreation: 'manual',
    ...get().options,
  }),

  // Actions

  setOptions() {
    const options = {
      amount: Math.round(useCartStore.getState().getTotal() * 100),
      currency: useInitStore.getState().viewerParams.currency.toLowerCase(),
    };
    return (set({ options }), options);
  },

  async createPaymentIntent() {
    const self = get();
    const navStore = useNavStore.getState();
    const initStore = useInitStore.getState();
    const cartStore = useCartStore.getState();
    const ordersStore = useOrdersStore.getState();

    if (!cartStore.getItems().length) {
      return navStore.replace('/checkout');
    }

    if (ordersStore.orders.currentId || self.clientSecret) {
      return;
    }

    try {
      const options = self.setOptions();
      const order = await ordersStore.placeOrder();

      const { clientSecret } = await api.stripe.createPaymentIntent({
        metadata: {
          orderId: order.id,
          tenantId: initStore.subdomain.tenantId,
        },
        ...options,
      });

      setTimeout(() => {
        set({ clientSecret: null });
        navStore.push('/cart');
      }, PAYMENT_TIMEOUT);

      set({ clientSecret });
    } catch (error) {
      console.debug('Failed to initiate payment', { error });
      toast.error('Something went wrong');
    }
  },

  async confirmPayment(stripe, elements) {
    const self = get();
    const ordersStore = useOrdersStore.getState();
    const initStore = useInitStore.getState();

    set({ isProcessing: true });

    try {
      const { error: submitError, selectedPaymentMethod } = await elements.submit();

      if (submitError) {
        console.debug('Stripe elements submit error', { submitError });
        toast.error('There is an error with your information');
        return;
      }

      console.info({ selectedPaymentMethod });

      const options = self.setOptions();
      const order = await ordersStore.placeOrder();

      const { confirmationToken, error: confirmError } = await stripe.createConfirmationToken({ elements });

      if (confirmError) {
        console.debug('Error creating confirmation token', { confirmError });
        toast.error('Payment was unsuccessful');
        return;
      }

      console.info({ confirmationToken });

      const paymentIntent = await api.stripe.createConfirmIntent({
        confirmationTokenId: confirmationToken.id,
        returnUrl: location.origin,
        ...options,
        metadata: {
          orderId: order.id,
          tenantId: initStore.subdomain.tenantId,
        },
      });

      if (paymentIntent.status === 'requires_action') {
        const { error } = await stripe.handleNextAction({
          clientSecret: paymentIntent.clientSecret,
        });

        if (error) {
          console.debug('Handle next action error', { confirmError });
          toast.error('There was an error with your payment, please contact tech support');
          return;
        }
      } else if (paymentIntent.status !== 'succeeded') {
        console.debug('Unexpected payment intent status', { confirmError });
        toast.error('There was an error with your payment, please contact tech support');
        return;
      }

      await useOrdersStore.getState().loadOrders(false);

      toast.success('Success!');
      useNavStore.getState().push('/order-complete');
      localStorage.removeItem('cartItems');

      self.cancelPayment();
    } catch (error) {
      console.debug('Payment confirmation failed', { error });
      toast.error('Unknown error occurred');
    } finally {
      set({ isProcessing: false });
    }
  },

  cancelPayment(clearCart = true) {
    useOrdersStore.setState((s) => ((s.orders.currentId = null), s));
    useCartStore.setState({ item: null });
    set({ isProcessing: false, clientSecret: null });
    if (clearCart) useCartStore.setState({ items: [] });
  },
}));
