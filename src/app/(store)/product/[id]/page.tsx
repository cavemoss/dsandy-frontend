'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { ProductReviews } from '@/entities/feedback';
import {
  ProductActions,
  ProductDetailTabs,
  ProductImageGallery,
  ProductInfo,
  ProductSizeSelect,
  ProductTrustBudges,
  ProductVariantSelect,
  useProductsStore,
} from '@/entities/products';

export default function ProductPage() {
  const params = useParams();

  const { setCurrentProduct, getProductImages } = useProductsStore.getState();

  const product = useProductsStore((state) => state.products.current.item);
  const variant = useProductsStore((state) => state.products.current.variant);
  const size = useProductsStore((state) => state.products.current.size);

  useEffect(() => setCurrentProduct(params.id), []);

  if (!product || !variant) return <></>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery images={getProductImages()} />

          <div className="space-y-6">
            <ProductInfo product={product} />
            <ProductVariantSelect index={variant.index} all={product.variants} current={variant} />
            {size && <ProductSizeSelect index={size.index} all={product.variantsSize!} current={size} />}
            <ProductActions quantity={product.quantity} />
            <ProductTrustBudges />
          </div>
        </div>

        <ProductDetailTabs product={product} />
        <ProductReviews averageRating={product.feedbackInfo.rating} totalReviews={100} />
      </div>
    </div>
  );
}
