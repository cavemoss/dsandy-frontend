'use client';
import { Button } from '@shadcd/button';
import { Checkbox } from '@shadcd/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Separator } from '@shadcd/separator';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AuthErrorEnum } from '@/api/entities';
import { useAuthStore } from '@/features/auth';
import LabeledInput from '@/shared/components/LabeledInput';
import LabeledPasswordInput from '@/shared/components/LabeledPasswordInput';
import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { Model } from '@/shared/lib/utils';
import { FieldDescription } from '@/shared/shadcd/components/ui/field';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';

import { DialogEnum, useDialogsStore } from '../..';

export default function LoginDialog() {
  const dialogsStore = useDialogsStore();
  const authStore = useAuthStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.LOGIN]);

  const [errorTrigger, setErrorTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  // Models

  const m = new Model(authStore, errorTrigger, { onChange: authStore.clearErrors });

  const emailModel = m.newInput((s) => s.credentials, 'email', {
    error: !authStore.isEmailValid() ? (
      <>Invalid email</>
    ) : authStore.errors.email === AuthErrorEnum.NOT_FOUND ? (
      <>This account does&apos;nt exist</>
    ) : (
      false
    ),
  });

  const passwordModel = m.newInput((s) => s.credentials, 'password', {
    error:
      authStore.credentials.password.length < 2 ? (
        <>Please enter password</>
      ) : (
        authStore.errors.password === AuthErrorEnum.INVALID && <>Wrong password</>
      ),
  });

  // Computed

  const isDisabled = loading || (errorTrigger && !m.isAllValid);

  // Methods

  const handleSubmit = async () => {
    setErrorTrigger(true);

    if (!m.isAllValid) return;
    setLoading(true);

    await authStore.loginCustomer();
    setLoading(false);
  };

  // Hooks

  useEffect(() => {
    if (!isOpened) {
      setTimeout(() => {
        authStore.resetState();
        setErrorTrigger(false);
      }, 1000);
    }
  }, [isOpened]);

  useEffect(() => {
    if (!loading && m.isAllValid) {
      dialogsStore.toggleDialog(DialogEnum.LOGIN);
    }
  }, [loading]);

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
              <FieldDescription>Remember me</FieldDescription>
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => dialogsStore.toggleDialog(DialogEnum.PASSWORD_RESET)}
            >
              Forgot password?
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isDisabled} onClick={handleSubmit}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner /> Signing in...
            </div>
          ) : (
            <>Sign In</>
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
