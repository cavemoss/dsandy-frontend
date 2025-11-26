'use client';

import { useState } from 'react';

import { ProductSCU } from '@/api/entities';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useProductsStore } from '..';

interface Params {
  all: ProductSCU[];
  current: ProductSCU;
}

const MAX_VISIBLE_SCUS = 6;

export function ProductSCUSelect({ all: allSCUs, current: currentSCU }: Params) {
  const { setSCU } = useProductsStore.getState();

  const [showAllSCUs, setShowAllSCUs] = useState(false);

  const hasMoreSCUs = allSCUs.length > MAX_VISIBLE_SCUS;

  const displayedSCUs = showAllSCUs ? allSCUs : allSCUs.slice(0, MAX_VISIBLE_SCUS);

  // Methods

  return (
    <div className="space-y-6 mb-6">
      <div>
        <label className="block mb-3">
          {currentSCU.propertyName}: <span className="font-medium">{currentSCU.propertyValueName}</span>
        </label>

        <div className="flex flex-wrap gap-3">
          {displayedSCUs.map((scu, idx) => {
            const isSelected = currentSCU.id === scu.id;
            const isAvailable = scu.availableStock > 0;

            return (
              <div key={idx} title={scu.propertyValueName} className="relative w-16" onClick={() => setSCU(scu.id)}>
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
                    src={scu.image}
                    alt="variant"
                    className="w-full h-full object-cover brightness-95"
                  />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground rotate-45 font-medium">OUT</span>
                    </div>
                  )}
                </button>
                <p
                  className="text-xs text-center mt-1 text-muted-foreground truncate w-16"
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
    </div>
  );
}
