import { Heart, Menu,Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

import { useCartStore } from '@/features/cart';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/shadcd/components/ui/dropdown-menu';
import { Input } from '@/shared/shadcd/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/shadcd/components/ui/sheet';
import { useDialogsStore } from '@/widgets/dialogs';
import { DialogEnum } from '@/widgets/dialogs/types/dialogs.types';

export function Header() {
  const { getTotalItems } = useCartStore();
  const { toggleDialog } = useDialogsStore.getState();

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">DropShop</h1>
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
              {/* Account dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => toggleDialog(DialogEnum.LOGIN)}>Sign In</DropdownMenuItem>
                  <DropdownMenuItem>Create Account</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                  <DropdownMenuItem>Account Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
                  {getTotalItems() && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {getTotalItems()}
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
