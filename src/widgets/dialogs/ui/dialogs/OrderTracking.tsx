'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@shadcd/drawer';

import { OrderTrackingStages } from '@/entities/orders';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { DialogEnum, useDialogsStore } from '../..';

export default function OrderTrackingModal() {
  const isMobile = useIsMobile();

  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.ORDER_TRACKING]);
  const order = useDialogsStore((state) => state.orderTrackingData.order);

  return (
    <>
      <Dialog open={isOpened && !isMobile} onOpenChange={() => dialogsStore.useOrderTracking()}>
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
            <DialogDescription>
              Enter your email address below, we will send you a password reset link
            </DialogDescription>
          </DialogHeader>

          {order && <OrderTrackingStages order={order} />}
        </DialogContent>
      </Dialog>

      <Drawer open={isOpened && isMobile} onOpenChange={() => dialogsStore.useOrderTracking()}>
        <DrawerTrigger></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>{order && <OrderTrackingStages order={order} />}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
