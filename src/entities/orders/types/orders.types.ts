import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';

import { OrderContactInfoDTO, OrderDTO, OrderShippingInfoDTO } from '@/api/entities/orders';

export interface OrdersState {
  orders: {
    all: OrderDTO[];
    currentId: number | null;
    lastId: number | null;
  };
  contactInfo: OrderContactInfoDTO;
  shippingInfo: OrderShippingInfoDTO;
  // getters
  getLastOrderId: () => string;
  // actions
  init: () => Promise<void>;
  loadOrders: (actualizeAnon?: boolean) => Promise<void>;
  placeOrder: () => Promise<OrderDTO>;
  updateOrderInfo: () => Promise<void>;
  setAddress: (event: StripeAddressElementChangeEvent) => void;
  setState: (clb: (s: this) => void) => void;
}
