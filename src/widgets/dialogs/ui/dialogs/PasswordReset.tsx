'use client';
import { Button } from '@shadcd/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AuthErrorEnum } from '@/api/entities';
import { useAuthStore } from '@/features/auth';
import LabeledInput from '@/shared/components/LabeledInput';
import { Model } from '@/shared/lib/utils';
import { Spinner } from '@shadcd/spinner';

import { DialogEnum, useDialogsStore } from '../..';

export default function PasswordReset() {
  const dialogsStore = useDialogsStore();
  const authStore = useAuthStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.PASSWORD_RESET]);

  const [errorTrigger, setErrorTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const isDisabled = loading || (errorTrigger && !m.isAllValid);

  const handleSubmit = async () => {
    setErrorTrigger(true);

    if (!m.isAllValid) return;
    setLoading(true);

    await authStore.forgotPassword();
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpened) {
      setTimeout(() => {
        setErrorTrigger(false);
      }, 1000);
    }
  }, [isOpened]);

  return (
    <>
      <Dialog open={isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.LOGIN)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address below, we will send you a password reset link
            </DialogDescription>
          </DialogHeader>

          <LabeledInput model={emailModel} icon={<Mail />} label={<>Email Address</>} placeholder="jane@example.com" />

          <Button type="submit" className="w-full" disabled={isDisabled} onClick={handleSubmit}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner /> Sending...
              </div>
            ) : (
              <>Send link</>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
