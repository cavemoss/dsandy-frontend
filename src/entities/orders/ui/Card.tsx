import { CircleCheck } from 'lucide-react';

import { OrderDTO, OrderItemDTO, OrderStatus } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import { objectByKey } from '@/shared/lib/utils';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

interface Params {
  order: OrderDTO;
  item: OrderItemDTO;
  inner?: true;
}

export default function OrderCard({ order, item, inner }: Params) {
  const productsStore = useProductsStore();

  const product = productsStore.getProductsByIds()[item.dProductId];
  const scu = objectByKey(product.scus, 'propertyValueId')[item.skuAttr.split(':')[1]];

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

  const node = (
    <>
      <ImageWithFallback className="h-30 brightness-95 rounded-sm aspect-square object-cover" src={scu.image} />

      <div>
        <span className="font-medium line-clamp-1">{product.name}</span>
        <p className="text-sm text-muted-foreground">
          {scu.propertyName}: {scu.propertyValueName}
        </p>
        <p className="text-sm mt-3">
          {item.quantity} item • ${(scu.priceInfo.dsOfferPrice * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="ml-auto">{getStatusBadge()}</div>
    </>
  );

  return inner ? (
    <div className="flex gap-3 border rounded-lg p-4">{node}</div>
  ) : (
    <Card id={order.id + ''}>
      <CardContent className="flex gap-3">{node}</CardContent>
    </Card>
  );
}
