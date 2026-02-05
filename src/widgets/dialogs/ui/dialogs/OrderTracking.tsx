'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';

import OrderTrackingStages from '@/entities/orders/ui/TrackingStages';

import { DialogEnum, useDialogsStore } from '../..';

export default function OrderTrackingModal() {
  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.ORDER_TRACKING]);

  return (
    <>
      <Dialog open={isOpened} onOpenChange={() => dialogsStore.viewOrderTracking()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
            <DialogDescription>
              Enter your email address below, we will send you a password reset link
            </DialogDescription>
          </DialogHeader>

          {dialogsStore.order && <OrderTrackingStages order={dialogsStore.order} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
