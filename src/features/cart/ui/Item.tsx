import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Trash2 } from 'lucide-react';

import Counter from '@/shared/components/Counter';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useCartStore } from '../model';

interface Params {
  index: number;
}

export function CartDisplayItem({ index }: Params) {
  const cartStore = useCartStore();

  const cartItem = cartStore.getCartDisplayItems()[index];
  const itemPrice = cartStore.getItemPrice(index);

  return (
    <Card>
      <CardContent>
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative self-baseline">
            <ImageWithFallback src={cartItem.image} className="w-24 h-24 object-cover rounded-md brightness-90" />
            {false && (
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
                <h3 className="font-medium">{cartItem.productName}</h3>
                <p className="text-sm text-muted-foreground">
                  {cartItem.propertyName}: {cartItem.propertyValueName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold">{cartItem.displayPrice.discounted}</span>
                  <span className="text-sm text-muted-foreground line-through">{cartItem.displayPrice.original}</span>
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
              <Counter value={cartItem.quantity} setter={(amount) => cartStore.setItemQuantity(index, amount)} />
              <div className="font-medium">{itemPrice}</div>
            </div>

            {false && <p className="text-sm text-destructive">This item is currently out of stock</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
