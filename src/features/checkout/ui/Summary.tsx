'use client';

import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';

import { useCartStore } from '@/features/cart';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { formatPrice } from '@/widgets/init';

export function CheckoutSummary() {
  const cartStore = useCartStore();

  const subtotal = cartStore.getSubtotal();
  const shipping = cartStore.getShipping();
  const tax = 0;
  const total = cartStore.getTotal();

  const cartDisplayItems = cartStore.getDisplayItems();
  const someItemsAreHidden = cartDisplayItems.length > 3;

  return (
    <div className="space-y-6 mr-auto w-100 sticky top-0">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartDisplayItems.slice(0, 3).map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-md brightness-95"
                />
                {item.quantity > 1 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {item.quantity}
                  </Badge>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-2">{item.productName}</p>
                {item.properties.map((prop, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">
                    {prop.name}: {prop.value}
                  </p>
                ))}
                <p className="text-sm line-clamp-2">{item.displayPrice.discounted}</p>
              </div>
            </div>
          ))}

          {someItemsAreHidden && (
            <Button variant="outline" className="w-full text-sm underline">
              Show all ({cartDisplayItems.length - 3} hidden)
            </Button>
          )}

          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <Badge variant="secondary">{formatPrice(subtotal)}</Badge>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              {shipping > 0 ? (
                <Badge variant="secondary">{formatPrice(shipping)}</Badge>
              ) : (
                <Badge variant="outline">FREE</Badge>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax</span>
              <Badge variant="secondary">{formatPrice(tax)}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between font-bold mt-6">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-sm leading-normal font-normal">
          Secure Checkout Powered by <u>Stripe</u>
        </p>
      </div>
    </div>
  );
}
