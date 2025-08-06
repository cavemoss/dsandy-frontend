import { Trash2 } from 'lucide-react';

import Counter from '@/shared/components/Counter';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useCartStore } from '../model';
import { type CartItem } from '../types';

interface Params {
  item: CartItem;
  index: number;
}

export function CartDisplayItem({ item, index }: Params) {
  const { removeFromCart, setItemQuantity, getItemPrice } = useCartStore.getState();

  return (
    <Card>
      <CardContent>
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative">
            <ImageWithFallback src={item.imgSrc} className="w-24 h-24 object-cover rounded-md brightness-90" />
            {!item.inStock && (
              <div className="absolute inset-0 bg-gray-900/50 rounded-md flex items-center justify-center">
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{item.productTitle}</h3>
                <p className="text-sm text-muted-foreground">Variant: {item.variantTitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold">{item.displayPrice.discounted}</span>
                  <span className="text-sm text-muted-foreground line-through">{item.displayPrice.original}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <Counter value={item.quantity} setter={(amount) => setItemQuantity(index, amount)} />
              <div className="font-medium">{getItemPrice(item)}</div>
            </div>

            {!item.inStock && <p className="text-sm text-destructive">This item is currently out of stock</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
