'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { ShoppingBag, Tag } from 'lucide-react';

import { useCartStore } from '@/features/cart';
import { CartItem } from '@/features/cart/ui';
import CartSummary from '@/features/cart/ui/Summary';
import BackChevron from '@/shared/components/BackChevron';
import { formatPrice } from '@/widgets/init';

export default function CartPage() {
  const cartStore = useCartStore();

  const cartItems = cartStore.getDisplayItems();
  const itemsCount = cartStore.getItemsCount();
  const totalSavings = cartStore.getAmountSaved();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <BackChevron title="Shopping Cart" muted={`${itemsCount} items in your cart`} />

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
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
}
