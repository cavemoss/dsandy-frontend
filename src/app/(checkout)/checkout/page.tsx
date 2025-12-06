'use client';

import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';

import { useCartStore } from '@/features/cart';
import { CheckoutForm } from '@/features/checkout';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { formatPrice, useInitStore } from '@/widgets/init';

export default function PaymentPage() {
  const cartStore = useCartStore();
  const isInitialized = useInitStore((state) => state.initialized);

  const subtotal = cartStore.getSubtotal();
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const cartDisplayItems = cartStore.getCartDisplayItems();
  const someItemsAreHidden = cartDisplayItems.length > 3;

  if (!isInitialized) return <></>;

  return (
    <>
      <div className="ml-auto w-150">
        <CheckoutForm />
      </div>

      {/* Order Summary Sidebar */}
      <div className="space-y-6" style={{ marginRight: 'auto', width: '400px', position: 'sticky', top: 0 }}>
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
                  <p className="text-xs text-muted-foreground">
                    {item.propertyName}: {item.propertyValueName}
                  </p>
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
                <Badge variant="outline">FREE</Badge>
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
        {/* Security Badge */}
        <div className="flex items-center">
          {/* <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" alt="s" /> */}
          <p className="mx-auto text-muted-foreground text-sm leading-normal font-normal">
            Secure Checkout Powered by <u>Stripe</u>
          </p>
        </div>
      </div>
    </>
  );
}
