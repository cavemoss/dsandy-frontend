'use client';

import { type Icon, IconChartBar, IconListDetails, IconPackage, IconPalette, IconSettings } from '@tabler/icons-react';

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@shadcd/sidebar';

import { useAdminStore } from '../model';
import { AdminPanelView } from '../types';

export function NavMain() {
  const adminStore = useAdminStore();

  const menuOptions: {
    title: string;
    view: AdminPanelView;
    icon?: Icon;
  }[] = [
    { title: 'Overview', view: 'overview', icon: IconListDetails },
    { title: 'Products', view: 'products', icon: IconPackage },
    { title: 'Customization', view: 'customization', icon: IconPalette },
    { title: 'Analytics', view: 'analytics', icon: IconChartBar },
    { title: 'Settings', view: 'settings', icon: IconSettings },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {menuOptions.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={() => useAdminStore.setState({ view: item.view })}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
