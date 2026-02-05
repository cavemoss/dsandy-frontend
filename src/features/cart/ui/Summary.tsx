'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';
import { Input } from '@shadcd/input';
import { Separator } from '@shadcd/separator';
import { useState } from 'react';

import { Spinner } from '@/shared/shadcd/components/ui/spinner';
import { formatPrice, useNavStore } from '@/widgets/init';

import { useCartStore } from '../model';

export default function CartSummary() {
  const cartStore = useCartStore();
  const navStore = useNavStore();

  const [redirecting, setRedirecting] = useState(false);

  const itemsCount = cartStore.getItemsCount();
  const subtotal = cartStore.getSubtotal();
  const shipping = cartStore.getShipping();
  const tax = 0;
  const total = cartStore.getTotal();

  const proceedToCheckout = () => {
    setRedirecting(true);
    setTimeout(() => navStore.push('/checkout'), 300);
  };

  return (
    <div className="space-y-6">
      {/* Promo Code */}
      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="text-lg">Promo Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Enter promo code" />
            <Button variant="outline">Apply</Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal ({itemsCount} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'text-muted-foreground' : ''}>
              {shipping === 0 ? <>FREE</> : formatPrice(shipping)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">Add {formatPrice(20 - subtotal)} for free shipping</p>
          )}
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <div className="space-y-3">
        <Button className="w-full" size="lg" onClick={proceedToCheckout}>
          {redirecting ? (
            <>
              <Spinner /> Redirecting to checkout...
            </>
          ) : (
            <>Proceed to Checkout</>
          )}
        </Button>
        <Button variant="outline" className="w-full" onClick={() => navStore.back()}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
