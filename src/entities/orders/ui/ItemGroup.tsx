import dayjs from 'dayjs';
import { ChevronsUpDown, CircleCheck } from 'lucide-react';
import Image from 'next/image';

import { OrderDTO, OrderStatus } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import { objectByKey } from '@/shared/lib/utils';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/shadcd/components/ui/collapsible';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/shadcd/components/ui/item';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';

interface Props {
  order: OrderDTO;
}

export default function OrderItemsGroup({ order }: Props) {
  const productsStore = useProductsStore();
  const productsById = productsStore.getProductsByIds();

  const getStatusBadge = () => {
    switch (order.status) {
      case OrderStatus.PLACED:
      case OrderStatus.PROCESSING:
        return (
          <Badge variant="secondary">
            <Spinner className="-ml-0.5" /> Processing
          </Badge>
        );
      case OrderStatus.IN_DELIVERY:
        return (
          <Badge>
            <Spinner className="-ml-0.5" /> In Delivery
          </Badge>
        );
      case OrderStatus.DELIVERED:
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
    <Collapsible className="flex w-full flex-col gap-3">
      <Item variant="outline" role="listitem" className="justify-between">
        <span className="font-semibold">Order #{order.id.toString().padStart(5, '0')}</span>
        <span className="ml-auto">{dayjs(order.createdAt).format('MMM D YYYY')}</span>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </Item>

      <CollapsibleContent className="flex flex-col gap-2">
        {order.orderItems.map((item, index) => {
          const product = productsById[item.dProductId];
          const scu = objectByKey(product.scus, 'propertyValueId')[item.skuAttr.split(':')[1]];

          return (
            <Item key={index} variant="outline" role="listitem" className="items-baseline">
              <ItemMedia>
                <Image
                  src={scu.image}
                  alt={scu.propertyValueName}
                  height={120}
                  width={120}
                  className="object-cover rounded-md"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">{product.name}</ItemTitle>
                <ItemDescription>
                  {scu.propertyName}: {scu.propertyValueName}
                </ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">{getStatusBadge()}</ItemContent>
            </Item>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
