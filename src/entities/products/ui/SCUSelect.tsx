'use client';

import { Heart, ShoppingCart, Tag } from 'lucide-react';
import { useState } from 'react';

import { ProductSCU } from '@/api/entities';
import { useCartStore, useFavoritesStore } from '@/features/cart';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { cn } from '@/shared/shadcd/lib/utils';

import { useProductsStore } from '..';

interface Params {
  productId: number;
  all: ProductSCU[];
  current: ProductSCU;
}

const MAX_VISIBLE_SCUS = 6;

export function ProductSCUSelect({ productId, all: allSCUs, current: currentSCU }: Params) {
  const productsStore = useProductsStore();
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();

  const [showAllSCUs, setShowAllSCUs] = useState(false);

  const hasMoreSCUs = allSCUs.length > MAX_VISIBLE_SCUS;
  const displayedSCUs = showAllSCUs ? allSCUs : allSCUs.slice(0, MAX_VISIBLE_SCUS);

  // Methods

  return (
    <div className="my-auto space-y-3">
      <label className="block">
        <span className="text-gray-600">{currentSCU.propertyName}:</span> {currentSCU.propertyValueName}
      </label>

      <div className="flex flex-wrap gap-2">
        {displayedSCUs.map((scu, idx) => {
          const isSelected = currentSCU.id === scu.id;
          const isInStock = scu.availableStock > 0;
          const isFavorite = !!favoritesStore.items[`${productId}:${scu.id}`];
          const isInCart = isInStock && cartStore.getItemIndex(productId, scu.id) >= 0;
          const isDiscount = scu.priceInfo.dsDiscount != null;

          return (
            <div
              key={idx}
              title={scu.propertyValueName}
              className="flex flex-col relative w-16"
              onClick={() => productsStore.setSCU(scu.id)}
            >
              <div
                className={cn(
                  'relative w-16 aspect-square rounded-lg border-2 overflow-hidden transition-all',
                  isSelected
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : isInStock
                    ? 'border-muted hover:border-primary'
                    : 'border-muted opacity-50'
                )}
              >
                <ImageWithFallback src={scu.image} alt="variant" className="w-full h-full object-cover brightness-95" />
                {!isInStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground rotate-45 font-medium">{'OUT'}</span>
                  </div>
                )}
              </div>

              <div
                className={cn(
                  (isDiscount || isFavorite || isInCart) && 'p-0.5',
                  'absolute m-0.5 rounded-md alight-items-end flex flex-col justify-between',
                  isInStock ? 'opacity-80 brightness-200 backdrop-blur-md bg-neutral-400' : 'opacity-60'
                )}
              >
                {isDiscount && <Tag size={15} className=" text-red-500" />}
                {isFavorite && <Heart size={15} className=" fill-red-500 text-red-500" />}
                {isInCart && <ShoppingCart size={15} className=" fill-red-500 text-red-500" />}
              </div>

              <p
                className="text-xs text-center mt-1.5 text-muted-foreground truncate w-16"
                title={scu.propertyValueName}
              >
                {scu.propertyValueName}
              </p>
            </div>
          );
        })}

        {/* View All / Show Less Button */}
        {hasMoreSCUs && (
          <div className="relative w-16">
            <button
              onClick={() => setShowAllSCUs(!showAllSCUs)}
              className="relative w-16 h-16 rounded-lg border-2 border-dashed border-muted hover:border-primary transition-all flex items-center justify-center bg-muted/100"
            >
              <div className="text-center">
                <span className="text-xs text-muted-foreground font-medium">
                  {showAllSCUs ? 'Less' : `+${allSCUs.length - MAX_VISIBLE_SCUS}`}
                </span>
              </div>
            </button>
            <p className="text-xs text-center mt-2 text-muted-foreground">{showAllSCUs ? 'Show Less' : 'View All'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
