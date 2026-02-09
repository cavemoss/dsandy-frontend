import { Badge } from '@shadcd/badge';

import { OrderItemDTO } from '@/api/entities';
import { useProductsStore } from '@/entities/products';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { getSCUAttr } from '../lib';

interface Params {
  item: OrderItemDTO;
}

export function OrderItem({ item }: Params) {
  const productsStore = useProductsStore();

  const product = productsStore.getProductsByIds()[item.dProductId];
  if (!product) return;

  const scu = product.scus.find((scu) => getSCUAttr(scu) == item.skuAttr);
  if (!scu) return;

  return (
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
  );
}
