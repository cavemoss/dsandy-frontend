'use client';

import dayjs from 'dayjs';
import { CircleCheck, Loader } from 'lucide-react';

import { OrderDTO, OrderStatus } from '@/api/entities';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/shadcd/components/ui/card';
import { useDialogsStore } from '@/widgets/dialogs';
import { formatPrice } from '@/widgets/init';

import OrderCard from './Card';

interface Props {
  order: OrderDTO;
}

export default function OrderInfo({ order }: Props) {
  const dialogs = useDialogsStore();

  const total = formatPrice(order.paymentInfo.amount / 100, order.paymentInfo.currency);

  const getStatusBadge = () => {
    switch (order.status) {
      case OrderStatus.CUSTOMER_PAYED:
      case OrderStatus.PLACED_AT_ALI:
        return (
          <Badge variant="secondary">
            <Loader className="-ml-0.5" /> Processing
          </Badge>
        );
      case OrderStatus.TO_BE_SHIPPED:
        return (
          <Badge>
            <Loader className="-ml-0.5" /> In Delivery
          </Badge>
        );
      case OrderStatus.SHIPPED:
        return (
          <Badge>
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
  };

  return (
    <div className="space-y-5">
      <Card className="flex flex-col">
        <CardHeader className="flex justify-between">
          <div>
            <div className="text-lg font-semibold">Order #{order.id.toString().padStart(5, '0')}</div>
            <div className="text-sm">
              <span className="text-muted-foreground">Total: </span>
              {total}
            </div>
          </div>
          <div className="flex items-baseline">
            {order.trackingData && (
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={() => dialogs.viewOrderTracking(order)}
              >
                View details
              </Button>
            )}
            {getStatusBadge()}
          </div>
        </CardHeader>

        <CardContent className="space-y-7">
          <div className="w-full grid grid-cols-2 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Placed on</span>
              {dayjs(order.createdAt).format('MMM D YYYY')}
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Expected delivery</span>
              {order.trackingData
                ? dayjs(order.createdAt).add(order.trackingData.deliveryDays, 'days').format('MMM D YYYY')
                : '....'}
            </div>
          </div>
          <div className="md:grid grid-cols-2 flex flex-col gap-y-4">
            {order.orderItems.map((item) => (
              <OrderCard key={item.dProductId} order={order} item={item} inner />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
