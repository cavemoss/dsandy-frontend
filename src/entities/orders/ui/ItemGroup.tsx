import { Button } from '@shadcd/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@shadcd/collapsible';
import dayjs from 'dayjs';
import { ChevronsUpDown, ListCollapse } from 'lucide-react';

import { OrderDTO } from '@/api/entities';
import { useDialogsStore } from '@/widgets/dialogs';

import { OrderItem } from './Item';
import { OrderStatusBadge } from './StatusBadge';

interface Props {
  order: OrderDTO;
  open: boolean;
}

export function OrderItemGroup({ order, open }: Props) {
  const dialogs = useDialogsStore();

  return (
    <Collapsible defaultOpen={open} className="flex w-full flex-col gap-3 border rounded-lg p-4">
      <div className="flex items-center text-sm gap-3">
        <span className="font-semibold">Order #{order.id.toString().padStart(5, '0')}</span>

        <OrderStatusBadge order={order} inner />

        {order.trackingData && (
          <Button
            variant="link"
            className="text-sm text-muted-foreground hidden md:flex"
            onClick={() => dialogs.useOrderTracking(order)}
          >
            <ListCollapse /> Track Order
          </Button>
        )}

        <span className="ml-auto">{dayjs(order.createdAt).format('MMM D YYYY')}</span>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="md:grid grid-cols-2 flex flex-col gap-4 mt-4">
        {order.orderItems.map((item, index) => (
          <OrderItem item={item} key={index} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
