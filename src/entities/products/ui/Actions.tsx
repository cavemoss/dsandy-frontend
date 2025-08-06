'use client';

import { Check, Heart, Share2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { useCartStore } from '@/features/cart';
import Counter from '@/shared/components/Counter';
import { Button } from '@/shared/shadcd/components/ui/button';

import { useProductsStore } from '..';

interface Params {
  quantity: number;
}

export function ProductActions({ quantity }: Params) {
  // models
  const [loading, setLoading] = useState(false);

  // methods
  const { setQuantity, getCartItem } = useProductsStore.getState();
  const { addToCart, isCurrentProductAdded } = useCartStore.getState();

  const handleAddToCart = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    setLoading(false);
    addToCart(getCartItem());
  };

  // tsx
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Counter value={quantity} setter={setQuantity} />
        <span className="text-muted-foreground">Quantity</span>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" size="lg" disabled={loading || isCurrentProductAdded()} onClick={handleAddToCart}>
          {loading ? (
            <>
              <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Adding...
            </>
          ) : isCurrentProductAdded() ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {true ? 'Add to Cart' : 'Out of Stock'}
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
