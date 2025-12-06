import { OrderContactInfoDTO, OrderDTO, OrderShippingInfoDTO } from '@/api/entities/orders';

export interface OrdersState {
  orders: OrderDTO[];
  contactInfo: OrderContactInfoDTO;
  shippingInfo: OrderShippingInfoDTO;
  // actions
  init: () => Promise<void>;
  loadOrders: () => Promise<void>;
  placeOrder: () => Promise<OrderDTO | void>;
  updateOrderInfo: () => Promise<void>;
  setState: (clb: (s: this) => void) => void;
}
