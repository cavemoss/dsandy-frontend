import dayjs from 'dayjs';
import { ChevronsUpDown, CircleCheck } from 'lucide-react';

import { OrderDTO, OrderStatus } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/shadcd/components/ui/collapsible';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';

import OrderCard from './Card';

interface Props {
  order: OrderDTO;
}

export default function OrderItemsGroup({ order }: Props) {
  const productsStore = useProductsStore();
  const productsById = productsStore.getProductsByIds();

  const getStatusBadge = () => {
    switch (order.status) {
      case OrderStatus.CUSTOMER_PAYED:
      case OrderStatus.PLACED_AT_ALI:
        return (
          <>
            <Spinner className="-ml-0.5" /> Processing
          </>
        );
      case OrderStatus.TO_BE_SHIPPED:
        return (
          <>
            <Spinner className="-ml-0.5" /> In Delivery
          </>
        );
      case OrderStatus.SHIPPED:
        return (
          <>
            <CircleCheck className="-ml-0.5" /> Delivered
          </>
        );
      case OrderStatus.COMPLEAT:
        return (
          <>
            <CircleCheck className="-ml-0.5" /> Compleat
          </>
        );
    }
  };

  return (
    <Collapsible className="flex w-full flex-col gap-3">
      <div className="flex items-center text-sm gap-3 border rounded-lg p-4">
        <span className="font-semibold">Order #{order.id.toString().padStart(5, '0')}</span>{' '}
        <Badge variant="secondary">{getStatusBadge()}</Badge>
        <span className="ml-auto">{dayjs(order.createdAt).format('MMM D YYYY')}</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-col gap-2">
        {order.orderItems.map((item, index) => (
          <OrderCard order={order} item={item} key={index} inner />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
