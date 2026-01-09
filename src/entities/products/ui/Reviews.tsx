import { Avatar, AvatarFallback, AvatarImage } from '@shadcd/avatar';
import { Badge } from '@shadcd/badge';
import { Card, CardContent, CardTitle } from '@shadcd/card';
import { Progress } from '@shadcd/progress';

import { useProductsStore } from '@/entities/products';
import StarRating from '@/shared/components/StarRating';
import { Skeleton } from '@/shared/shadcd/components/ui/skeleton';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { useDialogsStore } from '@/widgets/dialogs';

export function ProductReviews() {
  const dialogsStore = useDialogsStore();

  const reviews = useProductsStore((state) => state.products.current.reviews);
  const productFeedback = useProductsStore((state) => state.products.current.item?.feedback);

  return (
    <Card>
      <CardContent className="py-0 space-y-6">
        <CardTitle>Customer Reviews</CardTitle>

        {reviews ? (
          <>
            {/* Rating Summary */}
            <div className="flex gap-4">
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
                      <span className="w-8">{rating}★</span>
                      <Progress value={percent} className="flex-1 h-2" />
                      <span className="w-8 text-muted-foreground">
                        {(reviews.overview.count * (percent / 100)).toFixed(0)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.list.map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>

                      <p className="text-muted-foreground">{review.text}</p>
                      <div className="flex gap-2">
                        {review.thumbnails?.map((src, index) => (
                          <ImageWithFallback
                            onClick={() => dialogsStore.viewImages(review.images!, index)}
                            className="w-20 aspect-square rounded-xl"
                            src={src}
                            key={index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-4">
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
              <div className="flex-1 flex flex-col gap-2">
                {new Array(5).fill('').map((el, idx) => (
                  <Skeleton key={idx} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {new Array(5).fill('').map((el, idx) => (
                <div key={idx} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <Skeleton className="rounded-full h-12 w-12" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-26" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <Skeleton className="h-4 w-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
