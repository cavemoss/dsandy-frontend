import { CircleCheck } from 'lucide-react';

import { OrderDTO, OrderItemDTO, OrderStatus } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { getSCUAttr } from '../lib';

interface Params {
  order: OrderDTO;
  item: OrderItemDTO;
  inner?: true;
}

export default function OrderCard({ order, item, inner }: Params) {
  const productsStore = useProductsStore();

  const product = productsStore.getProductsByIds()[item.dProductId];
  const scu = product.scus.find((scu) => getSCUAttr(scu) == item.skuAttr);

  if (!scu) return;

  const getStatusBadge = () => {
    switch (order.status) {
      case OrderStatus.CUSTOMER_PAYED:
      case OrderStatus.PLACED_AT_ALI:
        return (
          <Badge variant="secondary">
            <Spinner className="-ml-0.5" /> Processing
          </Badge>
        );
      case OrderStatus.TO_BE_SHIPPED:
        return (
          <Badge>
            <Spinner className="-ml-0.5" /> In Delivery
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

  const node = (
    <>
      <ImageWithFallback className="h-20 w-20 brightness-95 rounded-sm object-cover" src={scu.image} />

      <div>
        <span className="font-medium line-clamp-1">{product.title || product.aliName}</span>

        <p className="text-sm text-muted-foreground">
          {scu.propertyName}: {scu.propertyValueName}
        </p>
        {scu.combinations.map((el, idx) => (
          <p key={idx} className="text-sm text-muted-foreground">
            {el.propertyName}: {el.propertyValueName}
          </p>
        ))}
      </div>

      {!inner && <div className="ml-auto">{getStatusBadge()}</div>}
    </>
  );

  return inner ? (
    <div className="flex gap-3">
      <div className="relative">
        <ImageWithFallback
          src={scu.image}
          alt={product.aliName}
          className="w-16 h-16 object-cover rounded-md brightness-95"
        />
        {item.quantity > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {item.quantity}
          </Badge>
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm line-clamp-2">{product.title || product.aliName}</p>
        <p className="text-sm text-muted-foreground">
          {scu.propertyName}: {scu.propertyValueName}
        </p>
        {scu.combinations.map((el, idx) => (
          <p key={idx} className="text-sm text-muted-foreground">
            {el.propertyName}: {el.propertyValueName}
          </p>
        ))}
      </div>
    </div>
  ) : (
    <Card id={order.id + ''}>
      <CardContent className="flex gap-3">{node}</CardContent>
    </Card>
  );
}
