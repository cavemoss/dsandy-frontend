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
import { Skeleton } from '@shadcd/skeleton';

export default function ProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productsStore = useProductsStore();

  const product = useProductsStore((state) => state.products.current.item);
  const scu = useProductsStore((state) => state.products.current.scu);

  const productImages = productsStore.getProductImages();

  const skeleton = (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto md:py-8">
        <div className="flex flex-col md:grid grid-cols-2 gap-3 md:gap-8">
          <Skeleton className="flex-1 aspect-square rounded-xl" />
          <div className="flex flex-1 flex-col gap-2 px-4 md:px-0">
            <div className="w-full space-y-2">
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-[50%] h-9" />
              <Skeleton className="w-[30%] h-4" />
              <Skeleton className="w-[60%] h-9 mt-6" />
            </div>
            <div className="w-full my-auto space-y-2">
              <Skeleton className="w-[20%] h-4" />
              <div className="flex gap-2">
                {new Array(5).fill(0).map((el, idx) => (
                  <div key={idx} className="space-y-1 flex flex-col w-20">
                    <Skeleton className="w-full aspect-square" />
                    <Skeleton className="w-full h-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="w-30 h-10" />
              <div className="flex w-full gap-2">
                <Skeleton className="flex-1 h-10" />
                <Skeleton className="w-14 h-10" />
                <Skeleton className="w-14 h-10" />
              </div>
              <Skeleton className="w-full h-10" />
              <div className="flex w-full justify-between">
                <Skeleton className="w-30 h-30" />
                <Skeleton className="w-30 h-30" />
                <Skeleton className="w-30 h-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const scuId = searchParams.get('scu');
    productsStore.setCurrentProduct(params.id, scuId);
  }, []);

  if (!product || product.id !== Number(params.id) || !scu) {
    return skeleton;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto md:py-8 md:space-y-18">
        <div className="flex flex-col md:grid grid-cols-2 gap-3 md:gap-8">
          <ProductImageGallery images={productImages} />
          <div className="flex flex-col gap-2 px-4 md:px-0">
            <ProductInfo product={product} scu={scu} />
            <ProductSCUSelect product={product} scu={scu} />
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
