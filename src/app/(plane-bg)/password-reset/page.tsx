'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/features/auth';
import LabeledPasswordInput from '@/shared/components/LabeledPasswordInput';
import { InputModel } from '@/shared/lib/types';
import { Model } from '@/shared/lib/utils';
import { Button } from '@shadcd/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcd/card';
import { Spinner } from '@shadcd/spinner';

export default function ResetPassword() {
  const searchParams = useSearchParams();

  const authStore = useAuthStore();

  const [errorTrigger, setErrorTrigger] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState('');
  const [loading, setLoading] = useState(false);

  // Models

  const m = new Model(authStore, errorTrigger, {
    onChange: authStore.clearErrors,
  });

  const passwordModel = m.newInput((s) => s.credentials, 'password', {
    error: !authStore.credentials.password ? (
      <>Please fill out the data</>
    ) : !authStore.isPasswordValid() ? (
      <>Password is too week</>
    ) : authStore.credentials.password !== confirmPwd ? (
      <>Passwords don&apos;t mach</>
    ) : (
      false
    ),
  });

  const confirmPwdModel: InputModel = {
    value: confirmPwd,
    onChange: (e) => setConfirmPwd(e.target.value),
    error: errorTrigger && authStore.credentials.password !== confirmPwd && <>Passwords don&apos;t mach</>,
  };

  const isDisabled = loading || (errorTrigger && !m.isAllValid);

  const handleConfirm = async () => {
    setErrorTrigger(true);

    if (!m.isAllValid) return;
    setLoading(true);

    const token = searchParams.get('token');

    if (!token) return;

    await authStore.resetPassword(token);
    setLoading(false);
  };

  return (
    <>
      <Card className="m-auto min-w-[425px]">
        <CardHeader>
          <CardTitle>Create a new password</CardTitle>
          <CardDescription>Come up with a new password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LabeledPasswordInput model={passwordModel} label={<>Password</>} placeholder="Create a strong password" />

          {/* Confirm Password */}
          <LabeledPasswordInput
            model={confirmPwdModel}
            label={<>Confirm Password</>}
            placeholder="Confirm your password"
          />

          <Button type="submit" className="w-full" disabled={isDisabled} onClick={handleConfirm}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner />
              </div>
            ) : (
              <>Confirm</>
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
