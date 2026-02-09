'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';

import OrderTrackingStages from '@/entities/orders/ui/TrackingStages';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { DialogEnum, useDialogsStore } from '../..';

export default function OrderTrackingModal() {
  const isMobile = useIsMobile();

  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.ORDER_TRACKING]);
  const order = useDialogsStore((state) => state.orderTrackingData.order);

  return (
    <Dialog open={!isMobile && isOpened} onOpenChange={() => dialogsStore.useOrderTracking()}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Order Tracking</DialogTitle>
          <DialogDescription>Enter your email address below, we will send you a password reset link</DialogDescription>
        </DialogHeader>

        {order && <OrderTrackingStages order={order} />}
      </DialogContent>
    </Dialog>
  );
}
