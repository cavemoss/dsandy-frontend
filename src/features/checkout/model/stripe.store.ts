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

  getElementsOptions: () => ({ mode: 'payment', ...get().options }),

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
    const { clientSecret } = self;

    if (!clientSecret) return;

    set({ isProcessing: true });

    try {
      const { error: submitError, selectedPaymentMethod } = await elements.submit();

      if (submitError) {
        console.debug('Stripe elements submit error', { submitError });
        toast.error('There is an error with your information');
        return;
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
        console.debug('Error confirming payment', { confirmError });
        toast.error('Payment was unsuccessful');
        return;
      }

      console.info({ paymentIntent });

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
