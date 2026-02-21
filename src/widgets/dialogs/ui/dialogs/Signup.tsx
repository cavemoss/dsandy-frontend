'use client';

import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcd/drawer';

import { AuthSignupForm } from '@/features/auth/ui/SignupForm';
import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';

import { DialogEnum, useDialogsStore } from '../..';

export default function SignupDialog() {
  const isMobile = useIsMobile();

  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.SIGNUP]);

  return (
    <>
      <Dialog open={!isMobile && isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.SIGNUP)}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Create Your Account</DialogTitle>
            <DialogDescription>Fill in your details to get started</DialogDescription>
          </DialogHeader>

          <AuthSignupForm />
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
            <AuthSignupForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
