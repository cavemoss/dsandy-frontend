import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Trash2 } from 'lucide-react';

import Counter from '@/shared/components/Counter';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useCartStore } from '../model';
import { CartDisplayItem } from '../types';

interface Params {
  item: CartDisplayItem;
  index: number;
}

export function CartItem({ index, item }: Params) {
  const cartStore = useCartStore();

  const itemPrice = cartStore.getItemPriceFormatted(index);
  const isDiscount = item.discount != null;

  return (
    <Card>
      <CardContent>
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative self-baseline">
            <ImageWithFallback src={item.image} className="w-24 h-24 object-cover rounded-md brightness-90" />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium line-clamp-1">{item.productName}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.propertyName}: {item.propertyValueName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold">{item.displayPrice.discounted}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {isDiscount && item.displayPrice.original}
                  </span>
                  {isDiscount && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {item.discount} OFF
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => cartStore.removeFromCart(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <Counter value={item.quantity} setter={(amount) => cartStore.setItemQuantity(index, amount)} />
              <div className="text-lg">{itemPrice}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
