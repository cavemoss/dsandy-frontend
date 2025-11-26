import axios from '@/api/config/axios';

import { OrderDTO, PlaceOrderBodyDTO, UpdateOrderInfoBodyDTO } from './orders.types';

export const ROUTE = '/orders';

export const loadCustomersOrders = () => axios.get<OrderDTO[]>(ROUTE).then((res) => res.data || []);

export const placeOrder = (dto: PlaceOrderBodyDTO) => axios.post<OrderDTO>(ROUTE, dto).then((res) => res.data);

export const updateOrderInfo = (dto: UpdateOrderInfoBodyDTO) => axios.patch(ROUTE, dto);
