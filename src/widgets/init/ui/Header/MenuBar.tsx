'use client';

import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@shadcd/navigation-menu';
import Link from 'next/link';
import * as React from 'react';

import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { useInitStore } from '../../model';

export default function MenuBar() {
  const isMobile = useIsMobile();

  const navigation = useInitStore((state) => state.subdomain.navigation);

  return (
    <NavigationMenu className="m-auto" viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        {Object.entries(navigation).map(([url, option], index) => {
          if ('subOptions' in option) {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className="bg-transparent">
                  {'config' in option ? <Link href={'/page/' + url}>{option.label}</Link> : option.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      {Object.entries(option.subOptions!).map(([url2, option], index) => (
                        <NavigationMenuLink key={index} asChild>
                          <Link href={`/page/${url}/${url2}`}>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-muted-foreground">{option.subLabel}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          } else if ('config' in option) {
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link href={'/page/' + url}>{option.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
