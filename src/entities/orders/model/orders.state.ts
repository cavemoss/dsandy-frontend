import dayjs from 'dayjs';
import { toast } from 'sonner';

import * as api from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { useProductsStore } from '@/entities/products';
import { useCartStore } from '@/features/cart';
import { useStripeStore } from '@/features/checkout';
import { createZustand, deepClone } from '@/shared/lib/utils';
import { useDialogsStore } from '@/widgets/dialogs';

import { actualizeAnonOrders, addAnonOrder, getAnonOrderIds, getSCUAttr } from '../lib';
import { OrdersState } from '../types';

export const useOrdersStore = createZustand<OrdersState>('orders', (set, get) => ({
  orders: {
    all: [],
    currentId: null,
    lastId: null,
  },

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
    await get().loadOrders();
  },

  async loadOrders(actualizeAnon = true) {
    try {
      const result: api.OrderDTO[] = [];

      const anonOrderIds = getAnonOrderIds(true);
      const { customer } = useCustomersStore.getState();

      if (anonOrderIds) {
        await api.orders.loadAnonOrders().then((orders) => {
          if (actualizeAnon) actualizeAnonOrders(orders);
          result.push(...orders);
        });
      }

      if (customer) {
        await api.orders.loadCustomerOrders().then((orders) => {
          result.push(...orders);
        });
      }

      result.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      set((state) => ((state.orders.all = result), state));
    } catch (error) {
      console.debug('Failed to load orders', { error });
    }
  },

  async placeOrder() {
    const cartStore = useCartStore.getState();
    const productsStore = useProductsStore.getState();
    const customersStore = useCustomersStore.getState();

    const cartItems = cartStore.getItems();
    const { contactInfo, shippingInfo } = get();
    const { options: paymentInfo } = useStripeStore.getState();

    try {
      const order = await api.orders.placeOrder({
        contactInfo,
        shippingInfo,
        paymentInfo,

        orderItems: cartItems.map((item) => {
          const [product, scu] = productsStore.getProductAndSCU(item.productId, item.scuId);

          return {
            dProductId: product.id,
            skuAttr: getSCUAttr(scu),
            quantity: item.quantity,
          };
        }),

        metadata: {
          profit: paymentInfo.amount - cartStore.getRealTotalAmount(),

          products: cartItems.reduce(
            (result, item) => {
              const [product, scu] = productsStore.getProductAndSCU(item.productId, item.scuId);

              const ptr = (result[item.productId] ??= {
                name: product.title ?? product.aliName,
                variants: [],
              });

              ptr.variants.push({
                properties: [scu, ...scu.combinations].map((el) => `${el.propertyName}: ${el.propertyValueName}`),
                quantity: item.quantity,
              });

              return result;
            },
            {} as api.OrderMetadata['products'],
          ),
        },
      });

      if (!customersStore.customer) {
        addAnonOrder(order.id);
      }

      set((state) => {
        const { orders: o } = state;
        o.currentId = order.id;
        o.lastId = order.id;
        return state;
      });

      return order;
    } catch (cause) {
      throw new Error('Error occurred when placing an order', { cause });
    }
  },

  async updateOrderInfo() {
    const self = get();

    const orderId = self.orders.currentId;
    const { contactInfo, shippingInfo } = self;

    if (!orderId || !contactInfo.phone || !shippingInfo.address) {
      throw new Error('Insufficient order info');
    }

    try {
      await api.orders.updateOrderInfo({
        orderId,
        contactInfo,
        shippingInfo,
      });

      set((state) => ((state.orders.lastId = orderId), state));
    } catch (cause) {
      throw new Error('Order update info request failed', { cause });
    }
  },

  async confirmOrder(orderId: number) {
    const dialogs = useDialogsStore.getState();

    try {
      await api.orders.confirmOrder(orderId);

      dialogs.useAlert();
      toast.success('Order receipt confirmed!');

      void setTimeout(() => location.reload(), 300);
    } catch (error) {
      console.error('Failed to confirm order', { error });
      toast.error('Something went wrong');
    }
  },

  async cancelOrder(orderId, reason) {
    const dialogs = useDialogsStore.getState();

    try {
      await api.stripe.cancelOrder(orderId, reason);

      toast.success('Order receipt confirmed!');
      dialogs.useCancelOrder();

      void setTimeout(() => location.reload(), 300);
    } catch (error) {
      console.error('Failed to confirm order', { error });
      toast.error('Something went wrong');
    }
  },

  setAddress({ value }) {
    const { shippingInfo: si, contactInfo: ci } = get();

    ci.firstName = value.firstName!;
    ci.lastName = value.lastName!;
    ci.phone = value.phone!;

    const { address } = value;

    si.address = address.line1;
    si.country = address.country;
    if (address.line2) si.address2 = address.line2;
    si.province = address.state;
    si.city = address.city;
    si.zipCode = address.postal_code;
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
