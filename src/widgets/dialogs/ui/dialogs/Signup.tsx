'use client';

import { Dialog } from '@radix-ui/react-dialog';
import { Button } from '@shadcd/button';
import { Checkbox } from '@shadcd/checkbox';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Separator } from '@shadcd/separator';
import { Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCustomersStore } from '@/entities/customers';
import { useAuthStore } from '@/features/auth';
import LabeledInput from '@/shared/components/LabeledInput';
import LabeledPasswordInput from '@/shared/components/LabeledPasswordInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { InputModel } from '@/shared/lib/types';
import { Model } from '@/shared/lib/utils';
import { FieldDescription } from '@/shared/shadcd/components/ui/field';

import { DialogEnum, useDialogsStore } from '../..';

export default function SignupDialog() {
  const customersStore = useCustomersStore();
  const authStore = useAuthStore();
  const dialogsStore = useDialogsStore();

  // Refs

  const isOpened = useDialogsStore((state) => state[DialogEnum.SIGNUP]);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [errorTrigger, setErrorTrigger] = useState(false);

  // Models

  const m = new Model(authStore, errorTrigger);

  const genericErrorMessage = <>Please fill out the data</>;

  const firstNameModel = m
    .input((s) => s.customerInfo, 'firstName')
    .setError(!authStore.customerInfo.firstName && genericErrorMessage);

  const lastNameModel = m
    .input((s) => s.customerInfo, 'lastName')
    .setError(!authStore.customerInfo.lastName && genericErrorMessage);

  const phoneModel = m
    .input((s) => s.customerInfo, 'phone')
    .setError(![0, 14].includes(authStore.customerInfo.phone.length) && genericErrorMessage);

  const emailModel = m.input((s) => s.credentials, 'email').setError(!authStore.isEmailValid() && <>Invalid Email</>);

  const passwordModel = m
    .input((s) => s.credentials, 'password')
    .setError(
      !authStore.credentials.password ? (
        <>Please fill out the data</>
      ) : !authStore.isPasswordValid() ? (
        <>Password is too week</>
      ) : authStore.credentials.password !== confirmPwd ? (
        <>Passwords don not mach</>
      ) : (
        false
      )
    );

  const confirmPwdModel: InputModel = {
    value: confirmPwd,
    onChange: (e) => setConfirmPwd(e.target.value),
    error: errorTrigger && authStore.credentials.password !== confirmPwd && <>Passwords don not mach</>,
  };

  const isAllValid = m.isAllValid && !confirmPwdModel.error;

  // Methods

  const handleSubmit = () => {
    setErrorTrigger(true);
    if (isAllValid) customersStore.register();
  };

  // Hooks

  useEffect(() => {
    if (!isOpened) {
      setTimeout(customersStore.resetData, 1000);
    }
  }, [isOpened]);

  return (
    <Dialog open={isOpened} onOpenChange={() => dialogsStore.toggleDialog(DialogEnum.SIGNUP)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Your Account</DialogTitle>
          <DialogDescription>Fill in your details to get started</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <LabeledInput model={firstNameModel} icon={<User />} label={<>First Name</>} placeholder="Jane" />

            <LabeledInput model={lastNameModel} label={<>Last Name</>} placeholder="Doe" />
          </div>

          {/* Email */}
          <LabeledInput model={emailModel} icon={<Mail />} label={<>Email Address</>} placeholder="jane@gmail.com" />

          {/* Phone */}
          <LabeledPhoneInput model={phoneModel} label={<>Phone Number (Optional)</>} withIcon />

          {/* Password */}
          <LabeledPasswordInput model={passwordModel} label={<>Password</>} placeholder="Create a strong password" />

          {/* Confirm Password */}
          <LabeledPasswordInput
            model={confirmPwdModel}
            label={<>Confirm Password</>}
            placeholder="Confirm your password"
          />

          {/* Terms & Newsletter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox />
              <FieldDescription>
                I agree to the
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </FieldDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox />
              <FieldDescription>Subscribe to our newsletter for exclusive deals and updates</FieldDescription>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={errorTrigger && !isAllValid} onClick={handleSubmit}>
          {isLoading ? (
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
      </DialogContent>
    </Dialog>
  );
}
