import { Badge } from '@shadcd/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';
import { Star } from 'lucide-react';
import Link from 'next/link';

import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  variantCount?: number;
}

export function ProductDisplayCard({
  title,
  price,
  originalPrice,
  rating,
  reviewCount,
  imageUrl,
  variantCount,
}: ProductCardProps) {
  return (
    <Link href="/product/1">
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-sm">
        <CardHeader className="p-0">
          <div className="aspect-square bg-muted rounded-t-xl relative overflow-hidden">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {variantCount && variantCount > 1 && (
              <Badge
                variant="secondary"
                className="absolute top-3 left-3 bg-white/90 text-foreground backdrop-blur-sm shadow-sm border-0 font-medium"
              >
                {variantCount} variants
              </Badge>
            )}
            {/* Discount percentage if there's original price */}
            {originalPrice && (
              <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground shadow-sm">
                {Math.round(
                  ((parseFloat(originalPrice.replace('$', '')) - parseFloat(price.replace('$', ''))) /
                    parseFloat(originalPrice.replace('$', ''))) *
                    100
                )}
                % off
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <CardTitle className="text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>

          <div className="flex items-center gap-1 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {rating}.0 ({reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">{price}</span>
              {originalPrice && <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>}
            </div>

            {/* Add a subtle "Quick View" indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-xs text-primary font-medium">Quick View →</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
