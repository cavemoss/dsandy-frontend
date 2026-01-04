'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  ProductActions,
  ProductDetailTabs,
  ProductImageGallery,
  ProductInfo,
  ProductReviews,
  ProductSCUSelect,
  ProductTrustBudges,
  useProductsStore,
} from '@/entities/products';

export default function ProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productsStore = useProductsStore();

  const product = useProductsStore((state) => state.products.current.item);
  const scu = useProductsStore((state) => state.products.current.scu);

  useEffect(() => {
    const scuId = searchParams.get('scu');
    productsStore.setCurrentProduct(params.id, scuId);
  }, []);

  if (!product || !scu) return <></>;

  const productImages = productsStore.getProductImages();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-18">
        <div className="grid grid-cols-2 gap-8">
          <ProductImageGallery images={productImages} />

          <div className="flex flex-col gap-2">
            <ProductInfo product={product} scu={scu} />
            <ProductSCUSelect productId={product.id} all={product.scus} current={scu} />
            <ProductActions />
            <ProductTrustBudges />
          </div>
        </div>

        <ProductDetailTabs product={product} />
        <ProductReviews />
      </div>
    </div>
  );
}
