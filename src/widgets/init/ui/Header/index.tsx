'use client';

import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { useCustomersStore } from '@/entities/customers';
import { useCartStore, useFavoritesStore } from '@/features/cart';

import { formatPrice } from '../../lib';
import { useInitStore } from '../../model';
import Customer from './Customer';
import Logo from './Logo';
import MenuBar from './MenuBar';
import MobileMenu from './MobileMenu';
import ParamsSelect from './ParamsSelect';
import SearchBar from './SearchBar';

export function Header() {
  const cartStore = useCartStore();
  const customersStore = useCustomersStore();
  const favoritesStore = useFavoritesStore();

  const policies = useInitStore((state) => state.subdomain.config.policies);

  const favoriteItemsCount = Object.keys(favoritesStore.items).length;
  const cartItemsCount = cartStore.getItemsCount();
  const customerInfo = customersStore.customer?.info;

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2">
        <p className=" text-center text-sm">
          Free shipping on orders over {formatPrice(policies.freeShippingCap, undefined, 0)} | {policies.returnDays}-day
          return policy
        </p>
      </div>

      <div className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex md:grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_1fr_1fr] w-full gap-4 px-4 md:px-0">
            <Logo className="text-[1.6rem]" />

            <SearchBar />

            <div className="items-center ml-auto gap-2 flex">
              <ParamsSelect className="hidden md:flex" />

              <Customer info={customerInfo} />

              <Link href="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {favoriteItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {favoriteItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <MobileMenu />
            </div>
          </div>
        </div>

        <div className="border-t bg-muted/50 hidden md:block py-2">
          <MenuBar />
        </div>
      </div>
    </>
  );
}
