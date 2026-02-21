import { Badge } from '@shadcd/badge';
import { CircleCheck, CircleX, Loader } from 'lucide-react';

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
          <Loader className="-ml-0.5" /> In Be Shipped
        </Badge>
      );
    case OrderStatus.SHIPPED:
      return (
        <Badge variant={inner ? 'secondary' : 'default'}>
          <CircleCheck className="-ml-0.5" /> Shipped
        </Badge>
      );
    case OrderStatus.COMPLETE:
      return (
        <Badge variant="secondary">
          <CircleCheck className="-ml-0.5" /> Complete
        </Badge>
      );
    case OrderStatus.CANCELED:
      return (
        <Badge variant="secondary">
          <CircleX className="-ml-0.5" /> Canceled
        </Badge>
      );
    case OrderStatus.REFUND_REQUESTED:
      return (
        <Badge>
          <Loader className="-ml-0.5" /> Refund Requested
        </Badge>
      );
  }
}
