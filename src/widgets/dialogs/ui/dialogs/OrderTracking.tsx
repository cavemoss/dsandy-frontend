'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcd/drawer';
import { Files } from 'lucide-react';

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
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
            <DialogDescription className="flex gap-1">
              <span className="text-black">Tracking Number: </span>
              <span className="text-muted-foreground flex max-w-fit items-center gap-1">
                {order?.trackingData?.trackingNumber ? (
                  <>
                    {order?.trackingData?.trackingNumber}
                    <Files size={15} className="cursor-pointer" />
                  </>
                ) : (
                  <>Unavailable</>
                )}
              </span>
            </DialogDescription>
          </DialogHeader>

          {order && <OrderTrackingStages order={order} />}
        </DialogContent>
      </Dialog>

      <Drawer preventScrollRestoration open={isOpened && isMobile} onOpenChange={() => dialogsStore.useOrderTracking()}>
        <DrawerTrigger></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Order Tracking</DrawerTitle>
            <DrawerDescription>
              <span className="text-black flex items-center flex-col">
                Tracking Number:
                <span className="text-muted-foreground flex items-center gap-1">
                  {order?.trackingData?.trackingNumber ? (
                    <>
                      {order?.trackingData?.trackingNumber}
                      <Files size={15} className="cursor-pointer" />
                    </>
                  ) : (
                    <>Unavailable</>
                  )}
                </span>
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>{order && <OrderTrackingStages order={order} />}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
