'use client';

import { ArrowLeft, ShoppingBag, Tag } from 'lucide-react';
import { useState } from 'react';

import { CartDisplayItem, useCartStore } from '@/features/cart';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Input } from '@/shared/shadcd/components/ui/input';
import { Separator } from '@/shared/shadcd/components/ui/separator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: string;
  inStock: boolean;
}

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const cartItems = useCartStore((state) => state.items);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo('SAVE10');
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
  const promoDiscount = appliedPromo === 'SAVE10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const totalSavings = 10;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => onNavigate('product')} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Button onClick={() => onNavigate('product')}>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {totalSavings > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      {`You're saving ${formatPrice(totalSavings)} on this order!`}
                    </span>
                  </div>
                </div>
              )}

              {cartItems.map((item, index) => (
                <CartDisplayItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">{appliedPromo}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedPromo(null)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">{'Try "SAVE10" for 10% off your order'}</p>
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

                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo discount ({appliedPromo})</span>
                      <span>-{formatPrice(promoDiscount)}</span>
                    </div>
                  )}

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
                    <p className="text-xs text-muted-foreground">
                      Add {formatPrice(50.01 - subtotal)} for free shipping
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <Button variant="outline" className="w-full" onClick={() => onNavigate('product')}>
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
