'use client';

import { Button } from '@shadcd/button';
import { Check, Heart, Share2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { useCartStore } from '@/features/cart';
import Counter from '@/shared/components/Counter';

import { useProductsStore } from '../model';

export function ProductActions() {
  const cartStore = useCartStore();
  const productsStore = useProductsStore();

  // Refs

  const [isLoading, setIsLoading] = useState(false);

  const scu = useProductsStore((state) => state.products.current.scu!);
  const quantity = useProductsStore((state) => state.products.current.quantity);

  // Computed

  const cartItem = productsStore.getCartItem(quantity);

  const isCurrentProductInCart = cartStore.getCartItemIndex(cartItem.productId, cartItem.scuId) >= 0;

  const currentProductQuantity = cartStore.getCartItem(cartItem.productId, cartItem.scuId)?.quantity;

  // Methods

  const addToCard = () => {
    cartStore.addToCart(cartItem);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  const setCurrentProductQuantity = (amount: number) => {
    cartStore.setItemQuantity(cartItem.productId, cartItem.scuId, amount);
  };

  const setQuantity = (amount: number) => {
    productsStore.setState((state) => (state.products.current.quantity += amount));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {isCurrentProductInCart ? (
          <Counter value={currentProductQuantity} setter={setCurrentProductQuantity} />
        ) : (
          <Counter value={quantity} setter={setQuantity} />
        )}
        <span className="text-muted-foreground">Quantity</span>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" size="lg" disabled={isLoading || isCurrentProductInCart} onClick={() => addToCard()}>
          {isLoading ? (
            <>
              <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Adding...
            </>
          ) : isCurrentProductInCart ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {scu.availableStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </Button>
        <Button variant="outline" size="lg">
          <Heart className={`h-5 w-5 ${false ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <Button variant="outline" className="w-full" size="lg">
        Buy Now
      </Button>
    </div>
  );
}
