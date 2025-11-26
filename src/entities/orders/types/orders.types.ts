import { OrderDTO } from '@/api/entities/orders';

export interface OrdersState {
  orders: OrderDTO[];
  // actions
  init: () => Promise<void>;
  loadOrders: () => Promise<void>;
  placeOrder: () => Promise<OrderDTO | void>;
  updateOrderInfo: () => Promise<void>;
}
