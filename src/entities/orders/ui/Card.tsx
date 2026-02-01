import { CircleCheck } from 'lucide-react';

import { OrderDTO, OrderItemDTO, OrderStatus } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { formatPrice } from '@/widgets/init';

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

  const price = formatPrice(scu.priceInfo.dsOfferPrice * item.quantity);

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
      <ImageWithFallback className="h-30 w-30 brightness-95 rounded-sm object-cover" src={scu.image} />

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
        <div className="text-sm mt-3">
          <span className="hover:underline text-muted-foreground cursor-pointer">Details</span> • {price}
        </div>
      </div>

      {!inner && <div className="ml-auto">{getStatusBadge()}</div>}
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
