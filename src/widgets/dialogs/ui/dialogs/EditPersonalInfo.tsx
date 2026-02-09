'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';

import CustomerPersonalInfoForm from '@/entities/customers/ui/PersonalInfoForm';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { DialogEnum, useDialogsStore } from '../..';

export default function EditPersonalInfoModal() {
  const isMobile = useIsMobile();

  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.PERSONAL_INFO]);

  return (
    <Dialog open={!isMobile && isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.PERSONAL_INFO)}>
      <DialogContent className="max-w-106">
        <DialogHeader>
          <DialogTitle>Edit personal info</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <CustomerPersonalInfoForm />
      </DialogContent>
    </Dialog>
  );
}
