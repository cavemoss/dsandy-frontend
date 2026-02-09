'use client';

import { Button } from '@shadcd/button';
import { Check, Heart, Share2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { useCartStore, useFavoritesStore } from '@/features/cart';
import Counter from '@/shared/components/Counter';
import { Spinner } from '@shadcd/spinner';

import { useProductsStore } from '../model';

export function ProductActions() {
  const cartStore = useCartStore();
  const productsStore = useProductsStore();
  const favoritesStore = useFavoritesStore();

  // Refs

  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  const scu = useProductsStore((state) => state.products.current.scu!);
  const quantity = useProductsStore((state) => state.products.current.quantity);

  // Computed

  const cartItem = productsStore.getCartItem(quantity);

  const isCurrentProductInCart = cartStore.getItemIndex(cartItem.productId, cartItem.scuId) >= 0;

  const currentProductQuantity = cartStore.getItem(cartItem.productId, cartItem.scuId)?.quantity;

  const isFavorite = favoritesStore.items[`${cartItem.productId}:${cartItem.scuId}`];

  const isOutOfStock = scu.availableStock <= 0;

  const isAddToCartDisabled = addToCartLoading || isCurrentProductInCart || isOutOfStock;

  const isBuyNowDisabled = buyNowLoading || isOutOfStock;

  // Methods

  const addToCard = () => {
    cartStore.addToCart(cartItem);
    setAddToCartLoading(true);
    setTimeout(() => setAddToCartLoading(false), 300);
  };

  const buyNow = () => {
    setBuyNowLoading(true);
    setTimeout(() => cartStore.handleBuyNow(cartItem), 300);
  };

  const setCurrentProductQuantity = (amount: number) => {
    cartStore.setItemQuantity(cartItem.productId, cartItem.scuId, amount);
  };

  const setQuantity = (amount: number) => {
    productsStore.setState((state) => (state.products.current.quantity += amount));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        {isCurrentProductInCart ? (
          <Counter value={currentProductQuantity} setter={setCurrentProductQuantity} />
        ) : (
          <Counter value={quantity} setter={setQuantity} />
        )}
        <span className="text-muted-foreground">Quantity</span>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" size="lg" disabled={isAddToCartDisabled} onClick={() => addToCard()}>
          {addToCartLoading ? (
            <>
              <Spinner /> Adding...
            </>
          ) : isCurrentProductInCart ? (
            <>
              <Check className="h-5 w-5 mr-2" /> Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" onClick={() => favoritesStore.toggle(cartItem.productId, cartItem.scuId)}>
          <Heart className={`h-5 w-5 ${isFavorite && 'fill-red-500 text-red-500'}`} />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <Button variant="outline" className="w-full" size="lg" disabled={isBuyNowDisabled} onClick={buyNow}>
        {buyNowLoading ? (
          <>
            <Spinner /> Redirecting to checkout...
          </>
        ) : (
          <>Buy Now</>
        )}
      </Button>
    </div>
  );
}
