import { ProductJson } from '@/api/entities';

import { useProductsStore } from '..';

interface Params {
  all: ProductJson.VariantSize[];
  current: ProductJson.VariantSize;
  index: number;
}

export function ProductSizeSelect({ all: allSizes, current: currentSize, index: currentIndex }: Params) {
  const { setSize } = useProductsStore.getState();

  return (
    <div>
      <label className="block mb-3">
        Size: <span className="font-medium">{currentSize.label}</span>
      </label>
      <div className="flex gap-3">
        {allSizes.map((size, index) => {
          const isSelected = currentIndex === index;
          const isAvailable = true;

          return (
            <button
              key={index}
              onClick={() => setSize(index)}
              disabled={!isAvailable}
              className={`px-4 py-2 rounded-md border transition-all ${
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : isAvailable
                  ? 'border-muted hover:border-primary'
                  : 'border-muted opacity-50 cursor-not-allowed'
              }`}
            >
              {size.label}
              {!isAvailable && <span className="block text-xs text-muted-foreground">Out</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
