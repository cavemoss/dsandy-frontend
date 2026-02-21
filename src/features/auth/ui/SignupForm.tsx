'use client';

import { Button } from '@shadcd/button';
import { Checkbox } from '@shadcd/checkbox';
import { FieldDescription } from '@shadcd/field';
import { Separator } from '@shadcd/separator';
import { Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AuthErrorEnum } from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { useAuthStore } from '@/features/auth';
import LabeledInput from '@/shared/components/LabeledInput';
import LabeledPasswordInput from '@/shared/components/LabeledPasswordInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { InputModel } from '@/shared/lib/types';
import { Model } from '@/shared/lib/utils';
import { DialogEnum, useDialogsStore } from '@/widgets/dialogs';

export function AuthSignupForm() {
  const customersStore = useCustomersStore();
  const authStore = useAuthStore();

  // Refs

  const isOpened = useDialogsStore((state) => state[DialogEnum.SIGNUP]);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneValid, setPhoneFilled] = useState(false);

  // Models

  const m = new Model(authStore, errorTrigger, { onChange: authStore.clearErrors });

  const firstNameModel = m.newInput((s) => s.customerInfo, 'firstName', {
    error: !authStore.customerInfo.firstName && <>Please fill out the data</>,
  });

  const lastNameModel = m.newInput((s) => s.customerInfo, 'lastName', {
    error: !authStore.customerInfo.firstName && <>Please fill out the data</>,
  });

  const phoneModel = m.newInput((s) => s.customerInfo, 'phone', {
    error: !phoneValid && <>Invalid phone</>,
  });

  const emailModel = m.newInput((s) => s.credentials, 'email', {
    error: !authStore.isEmailValid() ? (
      <>Invalid Email</>
    ) : (
      authStore.errors.email === AuthErrorEnum.DUPLICATE && <>This account already exists</>
    ),
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

  const isAllValid = m.isAllValid && !confirmPwdModel.error;

  // Methods

  const handleSubmit = () => {
    setErrorTrigger(true);

    if (!isAllValid) return;
    setLoading(true);

    customersStore.createCustomer();
    setLoading(false);
  };

  // Hooks

  useEffect(() => {
    if (!isOpened) {
      setTimeout(() => {
        authStore.resetState();
        setConfirmPwd('');
        setErrorTrigger(false);
      }, 1000);
    }
  }, [isOpened]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4 my-6">
        <div className="grid grid-cols-2 gap-3">
          <LabeledInput model={firstNameModel} icon={<User />} label={<>First Name</>} placeholder="Jane" />

          <LabeledInput model={lastNameModel} label={<>Last Name</>} placeholder="Doe" />
        </div>

        <LabeledInput model={emailModel} icon={<Mail />} label={<>Email Address</>} placeholder="jane@gmail.com" />

        <LabeledPhoneInput
          model={phoneModel}
          onReset={() => authStore.setState((s) => (s.customerInfo.phone = ''))}
          setValid={setPhoneFilled}
          label={<>Phone Number (Optional)</>}
          withIcon
        />

        <LabeledPasswordInput model={passwordModel} label={<>Password</>} placeholder="Create a strong password" />

        <LabeledPasswordInput
          model={confirmPwdModel}
          label={<>Confirm Password</>}
          placeholder="Confirm your password"
        />

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox />
            <FieldDescription>
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </FieldDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox />
            <FieldDescription>Subscribe to our newsletter for exclusive deals and updates</FieldDescription>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={errorTrigger && !isAllValid} onClick={handleSubmit}>
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating account...
          </div>
        ) : (
          <>Create Account</>
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline">
          <GoogleSvg /> Google
        </Button>
        <Button variant="outline">
          <FacebookSvg /> Facebook
        </Button>
      </div>
    </form>
  );
}
