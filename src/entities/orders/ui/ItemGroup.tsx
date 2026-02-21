'use client';

import { Card, CardContent, CardHeader } from '@shadcd/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shadcd/dropdown-menu';
import dayjs from 'dayjs';
import { ClipboardCheck, ClipboardClock, ClipboardX, EllipsisVertical } from 'lucide-react';

import { OrderDTO, OrderStatus } from '@/api/entities';
import { cn } from '@/shared/shadcd/lib/utils';
import { useDialogsStore } from '@/widgets/dialogs';
import { formatPrice } from '@/widgets/init';

import { useOrdersStore } from '../model';
import { OrderItem } from './Item';
import { OrderStatusBadge } from './StatusBadge';

interface Props {
  order: OrderDTO;
  inner?: boolean;
  isLast?: boolean;
}

export function OrderItemGroup({ order, inner, isLast }: Props) {
  const dialogs = useDialogsStore();
  const ordersStore = useOrdersStore();

  const total = formatPrice(order.paymentInfo.amount / 100, order.paymentInfo.currency);
  const createdAt = dayjs(order.createdAt);

  const handleCancelOrder = () => {
    dialogs.useAlert(
      {
        title: 'Do you want to cancel this order?',
        description: 'Please confirm that you wont to cancel this order, we will issue a full refund',
        isAsync: false,
      },
      () => {
        dialogs.useCancelOrder(order);
      },
    );
  };

  const handleConfirmOrder = () => {
    dialogs.useAlert(
      {
        title: 'Confirm Order Receipt',
        description: 'Please confirm that you have received the package',
      },
      () => {
        ordersStore.confirmOrder(order.id);
      },
    );
  };

  return (
    <Card className={cn('flex flex-col', inner && 'border-none shadow-none p-0')}>
      <CardHeader className={cn('flex justify-between', inner && 'px-1')}>
        <div>
          <div className="flex items-center">
            <span className="text-lg font-semibold">Order #{order.id.toString().padStart(5, '0')}</span>
          </div>
          <div className="text-base">
            <span className="text-muted-foreground">Total: </span> {total}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <OrderStatusBadge order={order} />
          {order.status < OrderStatus.COMPLETE && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {order.status === OrderStatus.SHIPPED && (
                  <DropdownMenuItem onClick={handleConfirmOrder}>
                    <ClipboardCheck /> Confirm Receipt
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem disabled={!order.trackingData} onClick={() => dialogs.useOrderTracking(order)}>
                  <ClipboardClock /> View Tracking
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handleCancelOrder}>
                  <ClipboardX /> Cancel Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn('space-y-7', inner && 'px-1', inner && !isLast && 'border-b pb-7')}>
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
      </CardContent>
    </Card>
  );
}
