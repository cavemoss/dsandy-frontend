'use client';

import { Button } from '@shadcd/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@shadcd/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcd/drawer';
import { useState } from 'react';

import { OrderCancelReason } from '@/api/entities';
import { useOrdersStore } from '@/entities/orders';
import Toggle from '@/shared/components/Toggle';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { DialogEnum, useDialogsStore } from '../..';

export default function CancelOrderModal() {
  const isMobile = useIsMobile();
  const dialogsStore = useDialogsStore();
  const orderState = useOrdersStore();

  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const isOpened = useDialogsStore((state) => state[DialogEnum.CANCEL_ORDER]);
  const data = useDialogsStore((state) => state.cancelOrderData);

  const reasonToggleOptions: {
    value: string;
    label: string;
    onClick: () => void;
  }[] = Object.entries({
    changed_mind: 'Changed my mind',
    found_better_price: 'Found a better price elsewhere',
    duplicate_order: 'Duplicate order',
    wrong_item: 'Ordered the wrong item',
    delivery_delay: 'Expected delivery is too slow',
    payment_issue: 'Payment issue',
    shipping_cost: 'Shipping cost too high',
    no_longer_needed: 'No longer needed',
    other: 'Other',
  } satisfies {
    [K in OrderCancelReason]: string;
  }).map(([value, label]) => ({ value, label, onClick: () => setReason(value) }));

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    await orderState.cancelOrder(data.orderId!, data.reason);
    setLoading(false);
  };

  return (
    <>
      <Dialog open={!isMobile && isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.CANCEL_ORDER)}>
        <DialogContent className="max-w-106" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>Can tell us why you decided to cancel your order?</DialogDescription>
          </DialogHeader>
          <Toggle options={reasonToggleOptions} value={reason} />
          <DialogFooter>
            <Button disabled={loading} variant="destructive" onClick={handleConfirm}>
              {loading ? <Spinner /> : <>Cancel Order</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer
        preventScrollRestoration
        open={isMobile && isOpened}
        onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.CANCEL_ORDER)}
      >
        <DrawerTrigger></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cancel Order</DrawerTitle>
            <DrawerDescription>Can tell us why you decided to cancel your order?</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="space-y-3"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
