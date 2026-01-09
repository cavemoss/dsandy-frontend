'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Check, ShoppingCart, Trash2 } from 'lucide-react';

import { useCartStore, useFavoritesStore } from '@/features/cart';
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
  const favStore = useFavoritesStore();
  const cartStore = useCartStore();
  const navStore = useNavStore();

  const isInCart = cartStore.getItemIndex(productId, scuId) >= 0;

  const product = productsStore.getProductsByIds()[productId];
  const scu = productsStore.getExactSCU(productId, scuId);

  if (!product || !scu) return <></>;

  const isInStock = scu.availableStock > 0;
  const isDiscount = scu.priceInfo.dsDiscount != null;

  return (
    <Card
      className="p-0 group overflow-hidden hover:shadow-lg transition-shadow"
      onClick={() => navStore.push(`/product/${productId}?scu=${scuId}`)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50">
          <div className="w-full aspect-square overflow-hidden">
            <ImageWithFallback
              src={scu.image}
              alt={product.name}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 brightness-95"
            />
          </div>

          {/* Stock Status */}
          {!scu.availableStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="secondary" className="bg-white text-gray-900">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Remove from Favorites */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => (e.stopPropagation(), favStore.toggle(productId, scuId))}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
            <span className="text-sm text-muted-foreground line-through">
              {isDiscount && formatPrice(scu.priceInfo.dsPrice)}
            </span>
            {isDiscount && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {scu.priceInfo.dsDiscount} OFF
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              className="ml-auto h-8"
              disabled={isInCart || !isInStock}
              onClick={(e) => (e.stopPropagation(), cartStore.addToCart({ productId, scuId, quantity: 1 }))}
            >
              {isInCart ? (
                <>
                  <Check /> Added
                </>
              ) : isInStock ? (
                <>
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add
                </>
              ) : (
                <>Out</>
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
