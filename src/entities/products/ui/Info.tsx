import { Product } from '@/api/entities';
import StarRating from '@/shared/components/StarRating';
import { Badge } from '@/shared/shadcd/components/ui/badge';

import { useProductsStore } from '..';

interface Params {
  product: Product;
}

export function ProductInfo({ product }: Params) {
  const { getDisplayPrices } = useProductsStore.getState();

  const placeholder =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ipsum soluta unde blanditiis, ut id mollitia aspernatur, at explicabo a nemo quos maiores, velit consequuntur praesentium cumque amet odit eos.';

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

      {/* Feedback Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <StarRating rating={product.feedbackInfo.rating} withLabel />
          <span className="text-muted-foreground">({product.feedbackInfo.displayReviews})</span>
          <span className="text-muted-foreground">{product.feedbackInfo.displaySold}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-primary">{getDisplayPrices().discounted}</span>
        <span className="text-xl text-muted-foreground line-through">{getDisplayPrices().original}</span>

        <div className="flex gap-1.5">
          <Badge variant="destructive">20% OFF</Badge>
          {product.inStock ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              In Stock
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Out Of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-6">{product.description || placeholder}</p>
    </>
  );
}
