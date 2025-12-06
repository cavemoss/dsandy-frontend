'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';
import { Input } from '@shadcd/input';
import { Separator } from '@shadcd/separator';
import { ShoppingBag, Tag } from 'lucide-react';

import { useCartStore } from '@/features/cart';
import { CartItem } from '@/features/cart/ui';
import BackChevron from '@/shared/components/BackChevron';
import { formatPrice, useNavStore } from '@/widgets/init';

export default function CartPage() {
  const cartStore = useCartStore();
  const navStore = useNavStore();

  const cartItems = cartStore.getCartDisplayItems();
  const subtotal = cartStore.getSubtotal();
  const shipping = cartStore.getShipping();
  const tax = 0;
  const total = cartStore.getTotal();

  const totalSavings = cartStore.getAmountSaved();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <BackChevron title="Shopping Cart" muted="items in your cart" />

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Button>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {totalSavings > 0 && (
                <div className="bg-green-50 border border-green-600/40 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      You&apos;re saving {formatPrice(totalSavings)} on this order!
                    </span>
                  </div>
                </div>
              )}

              {cartItems.map((item, index) => (
                <CartItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Order Summary */}
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
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-muted-foreground' : ''}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
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
                    <p className="text-xs text-muted-foreground">Add {formatPrice(50 - subtotal)} for free shipping</p>
                  )}
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => navStore.push('/checkout')}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navStore.back()}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
