'use client';

import { Button } from '@shadcd/button';
import { Card, CardContent } from '@shadcd/card';
import { Heart, ShoppingCart, Undo } from 'lucide-react';

import ProductCard from '@/entities/products/ui/Card';
import { useFavoritesStore } from '@/features/cart';
import BackChevron from '@/shared/components/BackChevron';
import { formatPrice } from '@/widgets/init';

export default function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);

  const keys = Object.keys(items);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center">
          <BackChevron
            title="My Favorites"
            muted="saved items"
            addon={<span className="text-green-600">• Save {formatPrice(122)} total</span>}
          />
          {keys.length > 0 && (
            <div className="ml-auto flex gap-2">
              <Button
                variant="ghost"
                className="hover:bg-red-100 hover:text-red-600"
                onClick={() => useFavoritesStore.setState({ items: {} })}
              >
                <Undo /> Clear All
              </Button>
              <Button variant="outline">
                <ShoppingCart />
                Add All
              </Button>
            </div>
          )}
        </div>

        {keys.length === 0 ? (
          /* Empty Favorites */
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start browsing and save items you love by clicking the heart icon
              </p>
              <Button>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          /* Favorites Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {keys.map((key, idx) => {
              const ptr = key.split(':');
              return <ProductCard key={idx} productId={+ptr[0]} scuId={+ptr[1]} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
