'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Check, ShoppingCart, Trash2 } from 'lucide-react';

import { useCartStore } from '@/features/cart';
import StarRating from '@/shared/components/StarRating';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { formatPrice, useNavStore } from '@/widgets/init';

import { useProductsStore } from '../model';

interface Props {
  productId: number;
  scuId: number;
}

export default function ProductCard({ productId, scuId }: Props) {
  const productsStore = useProductsStore();
  const cartStore = useCartStore();
  const navStore = useNavStore();

  const isInCart = cartStore.getCartItemIndex(productId, scuId) >= 0;

  const product = productsStore.getProductsByIds()[productId];
  const scu = productsStore.getExactSCU(productId, scuId);

  return (
    <Card
      className="p-0 group overflow-hidden hover:shadow-lg transition-shadow"
      onClick={() => navStore.push(`/product/${productId}?scu=${scuId}`)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50">
          <div className="overflow-hidden">
            <ImageWithFallback
              src={scu.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-95"
            />
          </div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex products-center justify-center gap-2"></div>

          {/* Remove from Favorites */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          {/* Stock Status */}
          {!scu.availableStock && (
            <div className="absolute inset-0 bg-gray-900/60 flex products-center justify-center">
              <Badge variant="secondary" className="bg-white text-gray-900">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <StarRating rating={product.feedback.rating} withLabel />
              <span className="text-sm text-muted-foreground">({product.feedback.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold">{formatPrice(scu.priceInfo.dsOfferPrice)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatPrice(scu.priceInfo.dsPrice)}</span>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              20% OFF
            </Badge>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto h-8"
              disabled={isInCart}
              onClick={(e) => (e.stopPropagation(), cartStore.addToCart({ productId, scuId, quantity: 1 }))}
            >
              {isInCart ? (
                <>
                  <Check /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add
                </>
              )}
            </Button>
          </div>

          <div className="flex products-center justify-between">
            <span className="text-xs text-muted-foreground">Added 2019.12.12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
