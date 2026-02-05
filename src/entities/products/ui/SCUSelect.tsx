'use client';

import { Heart, ShoppingCart, Tag } from 'lucide-react';
import { useState } from 'react';

import { Product, ProductSCU } from '@/api/entities';
import { useCartStore, useFavoritesStore } from '@/features/cart';
import Toggle from '@/shared/components/Toggle';
import { objectByKey } from '@/shared/lib/utils';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { cn } from '@/shared/shadcd/lib/utils';

import { useProductsStore } from '..';

interface Params {
  product: Product;
  scu: ProductSCU;
}

const MAX_VISIBLE_SCUS = 6;

export function ProductSCUSelect({ product, scu: currentSCU }: Params) {
  const productsStore = useProductsStore();
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();

  const [showAllSCUs, setShowAllSCUs] = useState(false);
  const [combinationString, setCombinationString] = useState(product.scus[0].combinationString);

  const scus = product.scus.reduce(
    (result, scu) => {
      const foundSCU = result.find((el) => el.propertyValueId == scu.propertyValueId);

      if (foundSCU) {
        const ptr = (foundSCU._ids ??= []);
        if (!ptr.includes(scu.id)) ptr.push(scu.id);
      } else {
        result.push(scu);
      }

      return result;
    },
    [] as (ProductSCU & { _ids?: number[] })[],
  );

  const noSCUImages = scus.some((scu) => !scu.image);

  const hasMoreSCUs = scus.length > MAX_VISIBLE_SCUS;

  const displayedSCUs = showAllSCUs ? scus : scus.slice(0, MAX_VISIBLE_SCUS);

  const scusByIds = objectByKey(product.scus, 'id');

  return (
    <div className="flex-1 flex flex-col justify-around gap-12 my-12 md:my-0 md:gap-3">
      <div className="space-y-3">
        <div>
          <span className="text-gray-600">{currentSCU.propertyName}: </span>
          {currentSCU.propertyValueName}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(65px,1fr))] md:flex flex-wrap gap-2">
          {noSCUImages ? (
            <Toggle
              options={scus.map((scu) => ({
                value: scu.id,
                label: scu.propertyValueName,
                onClick() {
                  if (scu._ids?.includes(currentSCU.id)) return;
                  const id = scu._ids?.find((id) => scusByIds[id].combinationString == combinationString);
                  productsStore.setSCU(id ?? scu.id);
                },
              }))}
              value={currentSCU.id}
              className="md:mb-3"
            />
          ) : (
            displayedSCUs.map((scu, idx) => {
              const ids = [scu.id, ...(scu._ids ?? [])];

              const isSelected = ids.includes(currentSCU.id);

              const isInStock = scu.availableStock > 0;

              const isFavorite = ids.some((scuId) => favoritesStore.items[`${product.id}:${scuId}`]);

              const isInCart = ids.some((scuId) => cartStore.getItemIndex(product.id, scuId) >= 0);

              const isDiscount = scu.priceInfo.dsDiscount != null;

              const setSCU = () => {
                if (scu._ids?.includes(currentSCU.id)) return;
                const id = scu._ids?.find((id) => scusByIds[id].combinationString == combinationString);
                productsStore.setSCU(id ?? scu.id);
              };

              return (
                <div key={idx} title={scu.propertyValueName} className="flex flex-col relative w-16" onClick={setSCU}>
                  <div
                    className={cn(
                      'relative w-16 aspect-square rounded-lg border-2 overflow-hidden transition-all',
                      isSelected
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : isInStock
                          ? 'border-muted hover:border-primary'
                          : 'border-muted opacity-50',
                    )}
                  >
                    <ImageWithFallback src={scu.image} className="w-full h-full object-cover brightness-95" />
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
                      isInStock ? 'opacity-80 brightness-200 backdrop-blur-md bg-neutral-400' : 'opacity-60',
                    )}
                  >
                    {isDiscount && <Tag size={15} className="text-red-500" />}
                    {isFavorite && <Heart size={15} className="fill-red-500 text-red-500" />}
                    {isInCart && <ShoppingCart size={15} className="fill-red-500 text-red-500" />}
                  </div>

                  <p
                    className="text-xs text-center mt-1.5 text-muted-foreground truncate w-16"
                    title={scu.propertyValueName}
                  >
                    {scu.propertyValueName}
                  </p>
                </div>
              );
            })
          )}

          {hasMoreSCUs && (
            <div className="relative w-16">
              <div
                onClick={() => setShowAllSCUs(!showAllSCUs)}
                className="relative w-full text-center aspect-square rounded-lg border-2 border-dashed border-muted hover:border-primary transition-all flex items-center justify-center bg-muted"
              >
                <span className="text-xs text-muted-foreground font-medium">
                  {showAllSCUs ? 'Less' : `+${scus.length - MAX_VISIBLE_SCUS}`}
                </span>
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                {showAllSCUs ? <>Show Less</> : <>View All</>}
              </p>
            </div>
          )}
        </div>
      </div>

      {new Array(product.scuLayers - 1).fill(0).map((_, index) => {
        const currentCombination = currentSCU.combinations[index];

        const options = product.scus
          .filter((scu) => scu.propertyValueId == currentSCU.propertyValueId)
          .map((scu) => ({ ...scu.combinations[index], scu }))
          .sort((a, b) => b.propertyValueName.localeCompare(a.propertyValueName));

        if (options.length <= 1) return;

        const toggleOptions = options.map((el) => ({
          label: el.propertyValueName,
          value: el.propertyValueId,
          onClick() {
            productsStore.setSCU(el.scu.id);
            setCombinationString(el.scu.combinationString);
          },
        }));

        return (
          <div key={index}>
            <div className="mb-3">
              <span className="text-gray-600">{currentCombination.propertyName}: </span>
              {currentCombination.propertyValueName}
            </div>
            <Toggle className="md:mb-3" options={toggleOptions} value={currentCombination.propertyValueId} />
          </div>
        );
      })}
    </div>
  );
}
