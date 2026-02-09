'use client';

import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@shadcd/drawer';

import { useDialogsStore } from '@/widgets/dialogs';

import OrderTrackingStages from './TrackingStages';

interface Props {
  children: React.ReactNode;
}

export function OrderInfoDrawer({ children }: Props) {
  const order = useDialogsStore((state) => state.orderTrackingData.order);

  if (!order) return children;

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Order Tracking</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <OrderTrackingStages order={order} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
