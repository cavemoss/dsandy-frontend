'use client';

import { useState } from 'react';

import { ProductJson } from '@/api/entities';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useProductsStore } from '..';

interface Params {
  all: ProductJson.Variant[];
  current: ProductJson.Variant;
  index: number;
}

export function ProductVariantSelect({ all: variants, current: currentVariant, index: currentIndex }: Params) {
  const MAX_VISIBLE_VARIANTS = 6;

  const hasMoreVariants = variants.length > MAX_VISIBLE_VARIANTS;

  const [showAllVariants, setShowAllVariants] = useState(false);

  const displayedVariants = showAllVariants ? variants : variants.slice(0, MAX_VISIBLE_VARIANTS);

  const { setVariant } = useProductsStore.getState();

  return (
    <div className="space-y-6 mb-6">
      <div>
        <label className="block mb-3">
          Variant: <span className="font-medium">{currentVariant.title}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {displayedVariants.map((variant, index) => {
            const isSelected = currentIndex === index;
            const isAvailable = true;

            return (
              <div key={index} className="relative w-16" onClick={() => setVariant(index)}>
                <button
                  disabled={!isAvailable}
                  className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : isAvailable
                      ? 'border-muted hover:border-primary'
                      : 'border-muted opacity-50 cursor-not-allowed'
                  }`}
                >
                  <ImageWithFallback
                    src={variant.imgSrcPreview}
                    alt="variant"
                    className="w-full h-full object-cover brightness-95"
                  />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground rotate-45 font-medium">OUT</span>
                    </div>
                  )}
                </button>
                <p className="text-xs text-center mt-1 text-muted-foreground truncate w-16" title={variant.title}>
                  {variant.title}
                </p>
              </div>
            );
          })}

          {/* View All / Show Less Button */}
          {hasMoreVariants && (
            <div className="relative w-16">
              <button
                onClick={() => setShowAllVariants(!showAllVariants)}
                className="relative w-16 h-16 rounded-lg border-2 border-dashed border-muted hover:border-primary transition-all flex items-center justify-center bg-muted/100"
              >
                <div className="text-center">
                  <span className="text-xs text-muted-foreground font-medium">
                    {showAllVariants ? 'Less' : `+${variants.length - MAX_VISIBLE_VARIANTS}`}
                  </span>
                </div>
              </button>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                {showAllVariants ? 'Show Less' : 'View All'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
