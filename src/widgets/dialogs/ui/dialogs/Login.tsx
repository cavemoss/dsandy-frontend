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
import { useEffect } from 'react';

import { AuthLoginForm, useAuthStore } from '@/features/auth';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { DialogEnum, useDialogsStore } from '../..';

export default function LoginDialog() {
  const isMobile = useIsMobile();

  const dialogsStore = useDialogsStore();
  const authStore = useAuthStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.LOGIN]);

  useEffect(() => {
    if (!isOpened) {
      setTimeout(() => {
        authStore.resetState();
      }, 1000);
    }
  }, [isOpened]);

  return (
    <>
      <Dialog open={!isMobile && isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.LOGIN)}>
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle>Sign In to Your Account</DialogTitle>
            <DialogDescription>Enter your credentials to access your account</DialogDescription>
          </DialogHeader>
          <AuthLoginForm />
        </DialogContent>
      </Dialog>

      <Drawer
        preventScrollRestoration
        open={isMobile && isOpened}
        onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.LOGIN)}
      >
        <DrawerTrigger></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="pb-0">
            <DrawerTitle>Sign In to Your Account</DrawerTitle>
            <DrawerDescription>Enter your credentials to access your account</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="space-y-3 pt-0">
            <AuthLoginForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
