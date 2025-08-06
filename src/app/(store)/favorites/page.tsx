'use client';

import { ArrowLeft, Heart, ShoppingCart, Star,Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent } from '@/shared/shadcd/components/ui/card';
import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  dateAdded: string;
}

interface FavoritesPageProps {
  onNavigate: (page: string) => void;
}

export default function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 324,
      inStock: true,
      dateAdded: 'Jan 15, 2025',
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 34.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      rating: 4.3,
      reviewCount: 189,
      inStock: true,
      dateAdded: 'Jan 12, 2025',
    },
    {
      id: '3',
      name: 'Smart Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 456,
      inStock: false,
      dateAdded: 'Jan 10, 2025',
    },
    {
      id: '4',
      name: 'Laptop Stand',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      rating: 4.1,
      reviewCount: 76,
      inStock: true,
      dateAdded: 'Jan 8, 2025',
    },
    {
      id: '5',
      name: 'USB-C Hub',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      rating: 4.4,
      reviewCount: 234,
      inStock: true,
      dateAdded: 'Jan 5, 2025',
    },
  ]);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const removeFromFavorites = (id: string) => {
    setFavorites((items) => items.filter((item) => item.id !== id));
  };

  const addToCart = (item: FavoriteItem) => {
    // In a real app, this would add to cart state/context
    console.log('Added to cart:', item.name);
    // You could also remove from favorites after adding to cart
    // removeFromFavorites(item.id);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const totalSavings = favorites.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('product')} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Favorites</h1>
              <p className="text-muted-foreground">
                {favorites.length} saved items
                {totalSavings > 0 && (
                  <span className="text-green-600 ml-2">• Save {formatPrice(totalSavings)} total</span>
                )}
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <Button variant="outline" onClick={clearAllFavorites}>
              Clear All
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          /* Empty Favorites */
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start browsing and save items you love by clicking the heart icon
              </p>
              <Button onClick={() => onNavigate('product')}>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          /* Favorites Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>

                    {/* Remove from Favorites */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                      onClick={() => removeFromFavorites(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    {/* Discount Badge */}
                    {item.originalPrice && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>
                    )}

                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-white text-gray-900">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-medium line-clamp-2 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {item.rating} ({item.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Added {item.dateAdded}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="h-8"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {favorites.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" onClick={() => onNavigate('product')} className="px-8">
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
