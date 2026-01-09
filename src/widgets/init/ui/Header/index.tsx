'use client';

import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Sheet, SheetContent, SheetTrigger } from '@shadcd/sheet';
import { Heart, Menu, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { useCustomersStore } from '@/entities/customers';
import { useCartStore, useFavoritesStore } from '@/features/cart';

import Customer from './Customer';
import Logo from './Logo';
import MenuBar from './MenuBar';
import ParamsSelect from './ParamsSelect';
import SearchBar from './SearchBar';

export function Header() {
  const cartStore = useCartStore();
  const customersStore = useCustomersStore();
  const favoritesStore = useFavoritesStore();

  const favoriteItemsCount = Object.keys(favoritesStore.items).length;
  const cartItemsCount = cartStore.getItemsCount();
  const customerInfo = customersStore.customer?.info;

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2">
        <p className=" text-center text-sm">Free shipping on orders over $50 | 30-day return policy</p>
      </div>

      <header className="border-b bg-background sticky top-0 z-50">
        {/* Main header */}
        <div className="container mx-auto py-4">
          <div className="flex w-full md:grid grid-cols-3 px-4 md:px-0">
            <Logo className="text-[1.6rem]" />
            <SearchBar />

            <div className="items-center ml-auto gap-2 hidden md:flex">
              <ParamsSelect />
              <Customer info={customerInfo} />

              <Link href="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {!!favoriteItemsCount && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {favoriteItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {!!cartItemsCount && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right"></SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t bg-muted/50 hidden md:block py-2">
          <MenuBar />
        </nav>
      </header>
    </>
  );
}
