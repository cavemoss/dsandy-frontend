'use client';

import { Button } from '@shadcd/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@shadcd/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@shadcd/sidebar';

import { useInitStore } from '../../model';
import ParamsSelect from './ParamsSelect';

export default function BurgerMenu() {
  const navigation = useInitStore((state) => state.subdomain.navigation);

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <ParamsSelect />

          <SidebarProvider className="mt-7">
            <SidebarMenu>
              {Object.entries(navigation).map(([url, option], index) => {
                if (option.subOptions) {
                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton>
                        <span>{option.label}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {Object.entries(option.subOptions).map(([url2, option], index) => (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton asChild>
                              <Link href={`/page/${url}/${url2}`} onClick={() => setOpen(false)}>
                                {option.label}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  );
                } else if (option.config) {
                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton>
                        <Link href={'/page/' + url} onClick={() => setOpen(false)}>
                          {option.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
}
