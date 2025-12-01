'use client';

import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Input } from '@shadcd/input';
import { Sheet, SheetContent, SheetTrigger } from '@shadcd/sheet';
import { Heart, Menu, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { useCustomersStore } from '@/entities/customers';
import { useCartStore } from '@/features/cart';

import Customer from './Customer';
import Logo from './Logo';
import ParamsSelect from './ParamsSelect';

export function Header() {
  const cartStore = useCartStore();
  const customersStore = useCustomersStore();

  const cartItemsCount = cartStore.getTotalItems();
  const customerInfo = customersStore.currentCustomer?.info;

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Free shipping on orders over $50 | 30-day return policy</p>
        </div>
      </div>

      <header className="border-b bg-background sticky top-0 z-50">
        {/* Main header */}
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-3">
            <div className="flex items-center">
              <Logo className="text-[1.6rem]" />
            </div>

            {/* Search bar - hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10 pr-4" />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <div className="ml-auto"></div>
              <ParamsSelect />
              <Customer info={customerInfo} />

              {/* Favorites */}
              <Link href="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    3
                  </Badge>
                </Button>
              </Link>

              {/* Cart */}
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

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input placeholder="Search products..." className="pl-10" />
                    </div>
                    <nav className="flex flex-col gap-2">
                      <Button variant="ghost" className="justify-start">
                        Home
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        Categories
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        New Arrivals
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        Best Sellers
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        Sale
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        Contact
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t bg-muted/50 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 py-3">
              <Button variant="ghost" className="hover:bg-background">
                Home
              </Button>
              <Button variant="ghost" className="hover:bg-background">
                Categories
              </Button>
              <Button variant="ghost" className="hover:bg-background">
                Contact
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
