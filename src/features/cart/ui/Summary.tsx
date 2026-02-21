'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';
import { Input } from '@shadcd/input';
import { Separator } from '@shadcd/separator';
import { Spinner } from '@shadcd/spinner';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/shadcd/lib/utils';
import { formatPrice, useInitStore, useNavStore } from '@/widgets/init';

import { useCartStore } from '../model';

export default function CartSummary() {
  const cartStore = useCartStore();
  const navStore = useNavStore();

  const policies = useInitStore((state) => state.subdomain.config.policies);
  const [redirecting, setRedirecting] = useState(false);

  const itemsCount = cartStore.getItemsCount();
  const subtotal = cartStore.getSubtotal();
  const shipping = cartStore.getShipping();
  const tax = 0;
  const total = cartStore.getTotal();

  const proceedToCheckout = () => {
    setRedirecting(true);
    setTimeout(() => navStore.replace('/checkout'), 300);
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal • {itemsCount} items</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={cn(shipping === 0 && 'text-muted-foreground')}>
              {shipping == 0 ? <>Free</> : formatPrice(shipping)}
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
            <p className="text-sm text-muted-foreground">
              Add {formatPrice(policies.freeShippingCap - subtotal)} for free shipping
            </p>
          )}
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" onClick={proceedToCheckout} disabled={redirecting}>
        {redirecting ? (
          <>
            <Spinner /> Redirecting to checkout...
          </>
        ) : (
          <>
            <Sparkles /> Proceed to Checkout
          </>
        )}
      </Button>
    </div>
  );
}
