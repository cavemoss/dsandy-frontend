'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcd/drawer';

import CustomerPersonalInfoForm from '@/entities/customers/ui/PersonalInfoForm';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

interface Props {
  children: React.ReactNode;
}

export default function PersonalInfoDrawer({ children }: Props) {
  const isMobile = useIsMobile();

  if (!isMobile) return children;

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit personal info</DrawerTitle>
          <DrawerDescription>Make changes to your profile here. Click save when you&apos;re done.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="space-y-3">
          <CustomerPersonalInfoForm isDrawer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
