'use client';

import { Avatar, AvatarFallback } from '@shadcd/avatar';
import { Badge } from '@shadcd/badge';
import { Card, CardContent } from '@shadcd/card';
import { Progress } from '@shadcd/progress';
import { BadgeCheck, Star } from 'lucide-react';
import { useRef, useState } from 'react';

import { useProductsStore } from '@/entities/products';
import Pagination from '@/shared/components/Pagination';
import StarRating from '@/shared/components/StarRating';
import { Skeleton } from '@/shared/shadcd/components/ui/skeleton';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';
import { useDialogsStore } from '@/widgets/dialogs';

export function ProductReviews() {
  const dialogsStore = useDialogsStore();
  const productsStore = useProductsStore();

  const isMobile = useIsMobile();

  const reviews = useProductsStore((state) => state.products.current.reviews);
  const productFeedback = useProductsStore((state) => state.products.current.item?.feedback);

  const [loading, setLoading] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);

  const skeletonShown = loading || !reviews;

  async function onChangePagination(page: number) {
    if (page === reviews?.pages.current) return;

    setTimeout(scrollIntoView);

    setLoading(true);
    await productsStore.loadProductReviews(page);
    setLoading(false);
  }

  function scrollIntoView() {
    if (!targetRef.current) return;

    const offset = 150;

    const elementPosition = targetRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  const content = (
    <>
      {skeletonShown ? (
        <>
          <div className="flex gap-4 flex-col md:flex-row mb-10 md:mb-0">
            <div className="flex-1 space-y-4">
              {productFeedback ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">{productFeedback.rating.toFixed(1)}</span>
                  <StarRating rating={productFeedback.rating} size="lg" />
                  <span className="text-muted-foreground">({productFeedback.reviewsCount} reviews)</span>
                </div>
              ) : (
                <Skeleton className="h-10 w-80" />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {new Array(5).fill('').map((el, idx) => (
                <Skeleton key={idx} className="h-4 w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {new Array(5).fill('').map((el, idx) => (
              <div key={idx} className="border-b pb-6 flex gap-4 items-start last:border-b-0">
                <Skeleton className="rounded-full h-10 w-10" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-26" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-200" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Rating Summary */}
          <div className="flex gap-4 flex-col md:flex-row mb-10 md:mb-0">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">{reviews.overview.rating.toFixed(1)}</span>
                <StarRating rating={reviews.overview.rating} size="lg" />
                <span className="text-muted-foreground">({reviews.overview.count} reviews)</span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {Object.entries(reviews.overview.stats)
                .reverse()
                .map(([rating, percent], index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-18 flex gap-0.5 items-center">
                      {rating}
                      <Star size={14} />
                      <span className="text-muted-foreground">
                        ({(reviews.overview.count * (percent / 100)).toFixed(0)})
                      </span>
                    </div>
                    <Progress value={percent} className="flex-1 h-2" />
                  </div>
                ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {reviews.list.map((review, index) => (
              <div key={index} className="border-b pb-6 flex gap-4 items-start last:border-b-0">
                <Avatar className="rounded-full h-10 w-10">
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <Badge variant="outline" className="text-xs">
                      <BadgeCheck /> Verified
                    </Badge>
                  </div>

                  <div className="text-muted-foreground text-sm">{review.attr}</div>

                  <div>{review.text}</div>

                  {!!review.thumbnails && (
                    <div className="flex gap-2 mb-6">
                      {review.thumbnails.map((src, index) => (
                        <ImageWithFallback
                          onClick={() => dialogsStore.viewImages(review.images!, index)}
                          className="w-20 aspect-square rounded-xl brightness-95"
                          src={src}
                          key={index}
                        />
                      ))}
                    </div>
                  )}

                  <span className="text-sm text-muted-foreground">
                    {review.name} | {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Pagination page={reviews?.pages.current} total={reviews?.pages.total} onChange={onChangePagination} />
    </>
  );

  return (
    <>
      <Card ref={isMobile ? undefined : targetRef} className="hidden md:block">
        <CardContent className="py-0 space-y-6">{content}</CardContent>
      </Card>

      <div ref={isMobile ? targetRef : undefined} className="mx-4 mb-12 md:hidden">
        {content}
      </div>
    </>
  );
}
