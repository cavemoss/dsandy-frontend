'use client';
import { Button } from '@shadcd/button';
import { Checkbox } from '@shadcd/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Label } from '@shadcd/label';
import { Separator } from '@shadcd/separator';
import { Mail } from 'lucide-react';
import { useState } from 'react';

import { useCustomersStore } from '@/entities/customers';
import { useAuthStore } from '@/features/auth';
import LabeledInput from '@/shared/components/LabeledInput';
import LabeledPasswordInput from '@/shared/components/LabeledPasswordInput';
import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { Model } from '@/shared/lib/utils';
import { FieldDescription } from '@/shared/shadcd/components/ui/field';

import { useDialogsStore } from '../..';
import { DialogEnum } from '../../types/dialogs.types';

export default function LoginDialog() {
  const customersStore = useCustomersStore();
  const dialogsStore = useDialogsStore();
  const authStore = useAuthStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.LOGIN]);

  const [errorTrigger, setErrorTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const m = new Model(authStore, errorTrigger);

  const handleSubmit = async () => {
    setErrorTrigger(true);
    setIsLoading(true);
    await customersStore.login();
    setIsLoading(false);
  };

  const emailModel = m.input((s) => s.credentials, 'email');

  const passwordModel = m.input((s) => s.credentials, 'password');

  return (
    <Dialog open={isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.LOGIN)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In to Your Account</DialogTitle>
          <DialogDescription>Enter your credentials to access your account</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          <LabeledInput model={emailModel} icon={<Mail />} label={<>Email Address</>} placeholder="jane@example.com" />

          <LabeledPasswordInput model={passwordModel} label={<>Password</>} placeholder="Enter your password" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm">
              Forgot password?
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" onClick={handleSubmit}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">
            <GoogleSvg />
            Google
          </Button>
          <Button variant="outline">
            <FacebookSvg />
            Facebook
          </Button>
        </div>

        <div className="text-center">
          <FieldDescription>
            Don&apos;t have an account? <></>
            <a onClick={() => dialogsStore.toggleDialog(DialogEnum.SIGNUP)}>Sign up</a>
          </FieldDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
