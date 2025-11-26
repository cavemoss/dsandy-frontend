'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { ProductReviews } from '@/entities/feedback';
import {
  ProductActions,
  ProductDetailTabs,
  ProductImageGallery,
  ProductInfo,
  ProductSCUSelect,
  ProductTrustBudges,
  useProductsStore,
} from '@/entities/products';

export default function ProductPage() {
  const params = useParams();

  const productsStore = useProductsStore();

  const product = useProductsStore((state) => state.products.current.item);
  const scu = useProductsStore((state) => state.products.current.scu);

  useEffect(() => productsStore.setCurrentProduct(params.id), []);

  if (!product || !scu) return <></>;

  const productImages = productsStore.getProductImages();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery images={productImages} />

          <div className="space-y-6">
            <ProductInfo product={product} scu={scu} />
            <ProductSCUSelect all={product.scus} current={scu} />
            <ProductActions />
            <ProductTrustBudges />
          </div>
        </div>

        <ProductDetailTabs product={product} />
        <ProductReviews averageRating={product.feedback.rating} totalReviews={100} />
      </div>
    </div>
  );
}
