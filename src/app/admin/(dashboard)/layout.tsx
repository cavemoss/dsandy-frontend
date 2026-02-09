'use client';

import { Separator } from '@radix-ui/react-select';

import { AppSidebar } from '@/features/admin';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@shadcd/breadcrumb';
import { SidebarProvider, SidebarTrigger } from '@shadcd/sidebar';
import { useInitStore } from '@/widgets/init';

export default function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isInitialized = useInitStore((state) => state.initialized);

  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <section className="p-6">{children}</section>
        </main>
      </SidebarProvider>
    </div>
  );
}
