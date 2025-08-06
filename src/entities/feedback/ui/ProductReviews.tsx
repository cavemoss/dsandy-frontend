import { Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcd/components/ui/avatar';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { Progress } from '@/shared/shadcd/components/ui/progress';

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

interface ProductReviewsProps {
  averageRating: number;
  totalReviews: number;
}

export function ProductReviews({ averageRating, totalReviews }: ProductReviewsProps) {
  const reviews: Review[] = [
    {
      id: '1',
      author: 'Sarah M.',
      rating: 5,
      date: 'Jan 15, 2025',
      title: 'Excellent quality!',
      content: 'Exceeded my expectations. Fast shipping and great customer service.',
      verified: true,
    },
    {
      id: '2',
      author: 'Mike R.',
      rating: 4,
      date: 'Jan 10, 2025',
      title: 'Good value for money',
      content: 'Solid product, works as described. Would recommend.',
      verified: true,
    },
  ];

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const renderStars = (rating: number, size = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-12">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Rating Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                {renderStars(averageRating, 'lg')}
                <span className="text-muted-foreground">({totalReviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{rating}★</span>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="w-8 text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            <h3>Customer Reviews</h3>
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.author}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>

                    <h4 className="font-medium">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
