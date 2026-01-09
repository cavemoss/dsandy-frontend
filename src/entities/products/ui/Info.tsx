import { Badge } from '@shadcd/badge';

import { Product, ProductSCU } from '@/api/entities';
import StarRating from '@/shared/components/StarRating';

import { useProductsStore } from '..';

interface Params {
  product: Product;
  scu: ProductSCU;
}

export function ProductInfo({ product, scu }: Params) {
  const productsStore = useProductsStore();

  const displayPrices = productsStore.getDisplayPrices();
  const isInStock = scu.availableStock > 0;
  const isDiscount = scu.priceInfo.dsDiscount != null;

  const priceInfo = (
    <>
      <span className="text-3xl font-bold text-primary">{displayPrices.discounted}</span>

      {isDiscount && <span className="text-xl text-muted-foreground line-through">{displayPrices.original}</span>}

      <div className="flex gap-1.5">
        {isDiscount && <Badge variant="destructive">{scu.priceInfo.dsDiscount} OFF</Badge>}

        {isInStock ? (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            In Stock
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Out Of Stock
          </Badge>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex md:hidden flex-wrap items-center gap-3">{priceInfo}</div>
      <h1 className="hidden md:block text-xl md:text-3xl font-bold">{product.name}</h1>

      {/* Feedback Info */}
      <div className="flex flex-row items-center gap-2">
        <StarRating rating={product.feedback.rating} withLabel />
        <span className="text-muted-foreground">({product.feedback.reviewsCount} reviews)</span>
        <span className="text-muted-foreground">{product.feedback.salesCount} sold</span>
      </div>

      <div className="hidden md:flex flex-wrap items-center gap-3">{priceInfo}</div>
    </div>
  );
}
