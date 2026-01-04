import dayjs from 'dayjs';

import { OrderDTO } from '@/api/entities';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Separator } from '@/shared/shadcd/components/ui/separator';

interface Params {
  order: OrderDTO;
}

export default function OrderSeparator({ order }: Params) {
  return (
    <div className="flex items-center" id={order.id + ''}>
      <p className="text-base text-gray-600 whitespace-nowrap mx-4">Order #{order.id.toString().padStart(5, '0')}</p>
      <Badge variant="outline" className="text-gray-400">
        {dayjs(order.createdAt).format('MMM D YYYY')}
      </Badge>
      <Separator className="shrink-1" />
    </div>
  );
}
