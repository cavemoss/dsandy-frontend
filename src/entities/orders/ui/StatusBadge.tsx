import { Badge } from '@shadcd/badge';
import { CircleCheck, Loader } from 'lucide-react';

import { OrderDTO, OrderStatus } from '@/api/entities';

interface Params {
  order: OrderDTO;
  inner?: boolean;
}

export function OrderStatusBadge({ order, inner }: Params) {
  switch (order.status) {
    case OrderStatus.CUSTOMER_PAYED:
    case OrderStatus.PLACED_AT_ALI:
      return (
        <Badge variant="secondary">
          <Loader className="-ml-0.5" /> Pending
        </Badge>
      );
    case OrderStatus.TO_BE_SHIPPED:
      return (
        <Badge variant={inner ? 'secondary' : 'default'}>
          <Loader className="-ml-0.5" /> In Delivery
        </Badge>
      );
    case OrderStatus.SHIPPED:
      return (
        <Badge variant={inner ? 'secondary' : 'default'}>
          <CircleCheck className="-ml-0.5" /> Delivered
        </Badge>
      );
    case OrderStatus.COMPLEAT:
      return (
        <Badge variant="secondary">
          <CircleCheck className="-ml-0.5" /> Compleat
        </Badge>
      );
  }
}
