import axios from '@/api/config/axios';
import { getAnonOrderIds } from '@/entities/orders';

import { OrderDTO, PlaceOrderBodyDTO, UpdateOrderInfoBodyDTO } from './orders.types';

export const ROUTE = '/orders';

export const loadCustomerOrders = () => axios.get<OrderDTO[]>(ROUTE).then((res) => res.data || []);

export const loadAnonOrders = () =>
  axios
    .get<OrderDTO[]>(ROUTE + '/anon', {
      params: { ids: getAnonOrderIds(true) },
    })
    .then((res) => res.data || []);

export const placeOrder = (dto: PlaceOrderBodyDTO) => axios.post<OrderDTO>(ROUTE, dto).then((res) => res.data);

export const confirmOrder = (orderId: number) => axios.post(ROUTE + `/confirm/${orderId}`);

export const updateOrderInfo = (dto: UpdateOrderInfoBodyDTO) => axios.patch(ROUTE, dto);
