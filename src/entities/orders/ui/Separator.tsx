import { Badge } from '@shadcd/badge';
import { Separator } from '@shadcd/separator';
import dayjs from 'dayjs';

import { OrderDTO } from '@/api/entities';

interface Params {
  order: OrderDTO;
}

export function OrderSeparator({ order }: Params) {
  return (
    <div className="flex items-center" id={order.id + ''}>
      <p className="text-base text-gray-600 whitespace-nowrap mx-4">Order #{order.id.toString().padStart(5, '0')}</p>
      <Badge variant="secondary" className="text-muted-foreground">
        {dayjs(order.createdAt).format('MMM D YYYY')}
      </Badge>
      <Separator className="shrink" />
    </div>
  );
}
