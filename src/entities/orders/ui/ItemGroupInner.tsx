'use client';

import { Button } from '@shadcd/button';
import dayjs from 'dayjs';
import { ListCollapse } from 'lucide-react';

import { OrderDTO } from '@/api/entities';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { useDialogsStore } from '@/widgets/dialogs';
import { formatPrice } from '@/widgets/init';

import { OrderItem } from './Item';
import { OrderStatusBadge } from './StatusBadge';

interface Props {
  order: OrderDTO;
  isLast?: boolean;
}

export function OrderItemGroupInner({ order, isLast }: Props) {
  const dialogs = useDialogsStore();

  const total = formatPrice(order.paymentInfo.amount / 100, order.paymentInfo.currency);

  const createdAt = dayjs(order.createdAt);

  return (
    <div className="space-y-7">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center">
            <span className="text-lg font-semibold">Order #{order.id.toString().padStart(5, '0')}</span>
            {order.trackingData && (
              <Button
                variant="link"
                className="text-sm text-muted-foreground hidden md:flex h-6"
                onClick={() => dialogs.useOrderTracking(order)}
              >
                <ListCollapse /> Track Order
              </Button>
            )}
          </div>
          <div className="text-base">
            <span className="text-muted-foreground">Total: </span>
            {total}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-baseline">
          <OrderStatusBadge order={order} />

          {order.trackingData && (
            <Badge
              className="w-full md:hidden"
              variant="outline"
              onClick={() => dialogs.setState((s) => (s.orderTrackingData.order = order))}
            >
              Track Order
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-7">
        <div className="w-full grid grid-cols-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Placed on</span>
            {createdAt.format('MMM D YYYY')}
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Expected delivery</span>
            {order.trackingData ? createdAt.add(order.trackingData.deliveryDays, 'days').format('MMM D YYYY') : '....'}
          </div>
        </div>
        <div className="md:grid grid-cols-2 flex flex-col gap-y-4">
          {order.orderItems.map((item) => (
            <OrderItem key={item.dProductId} item={item} />
          ))}
        </div>
      </div>

      {!isLast && <Separator />}
    </div>
  );
}
