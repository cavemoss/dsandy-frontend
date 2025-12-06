import * as api from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { useProductsStore } from '@/entities/products';
import { useCartStore } from '@/features/cart';
import { useStripeStore } from '@/features/checkout';
import { createZustand, deepClone, objectByKey } from '@/shared/lib/utils';

import { OrdersState } from '../types';

export const useOrdersStore = createZustand<OrdersState>('orders', (set, get) => ({
  orders: [],

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

  // Actions

  async init() {
    if (useCustomersStore.getState().currentCustomer) {
      await get().loadOrders();
    }
  },

  async loadOrders() {
    try {
      set({ orders: await api.orders.loadCustomersOrders() });
    } catch (error) {
      console.debug('Failed to load orders', { error });
    }
  },

  async updateOrderInfo() {
    const { order } = useStripeStore.getState();
    const { contactInfo, shippingInfo } = get();

    if (!order) return;

    try {
      await api.orders.updateOrderInfo({
        orderId: order.id,
        contactInfo,
        shippingInfo,
      });
    } catch (error) {
      console.error('Error when placing an order', { error });
    }
  },

  async placeOrder() {
    const cartStore = useCartStore.getState();
    const productsStore = useProductsStore.getState();

    const { contactInfo, shippingInfo } = get();
    const { options: paymentInfo } = useStripeStore.getState();

    try {
      return await api.orders.placeOrder({
        contactInfo,
        shippingInfo,
        paymentInfo,

        orderItems: cartStore.items.map((item) => {
          const { [item.productId]: product } = productsStore.getProductsByIds();
          const { [item.scuId]: scu } = objectByKey(product.scus, 'id');

          return {
            dProductId: product.id,
            skuAttr: `${scu.propertyId}:${scu.propertyValueId}`,
            quantity: item.quantity,
          };
        }),
      });
    } catch (error) {
      console.error('Error when placing an order', { error });
    }
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
