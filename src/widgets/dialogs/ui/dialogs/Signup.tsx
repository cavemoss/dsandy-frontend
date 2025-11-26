'use client';

import { Dialog } from '@radix-ui/react-dialog';
import { Button } from '@shadcd/button';
import { Checkbox } from '@shadcd/checkbox';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Label } from '@shadcd/label';
import { Separator } from '@shadcd/separator';
import { Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCustomersStore } from '@/entities/customers';
import { LabeledInput, LabeledPasswordInput, LabeledPhoneInput } from '@/shared/components/form';
import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { InputModel } from '@/shared/lib/types';

import { DialogEnum, useDialogsStore } from '../..';

export default function SignupDialog() {
  const customersStore = useCustomersStore();
  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.SIGNUP]);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [errorTriggered, setErrorTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setErrorTriggered(true);
    setIsLoading(true);
    await customersStore.register();
    setIsLoading(false);
  };

  const firstNameModel: InputModel = {
    id: 'firstName',
    type: 'text',
    value: customersStore.info.fistName,
    onChange: (e) => customersStore.setState(({ info }) => (info.fistName = e.target.value)),
    error: errorTriggered && !customersStore.info.fistName && 'Please fill out the data',
  };

  const lastNameModel: InputModel = {
    id: 'lastName',
    type: 'text',
    value: customersStore.info.lastName,
    onChange: (e) => customersStore.setState(({ info }) => (info.lastName = e.target.value)),
    error: errorTriggered && !customersStore.info.lastName && 'Please fill out the data',
  };

  const phoneModel: InputModel = {
    id: 'phone',
    type: 'tel',
    value: customersStore.info.phone,
    onChange: (e) => customersStore.setState(({ info }) => (info.phone = e.target.value)),
    error: errorTriggered && ![0, 14].includes(customersStore.info.phone.length) && 'Please fill out the data',
  };

  const emailModel: InputModel = {
    id: 'email',
    type: 'email',
    value: customersStore.credentials.email,
    onChange: (e) => customersStore.setState(({ credentials }) => (credentials.email = e.target.value)),
    error: errorTriggered && !customersStore.isEmailValid() && 'Invalid Email',
  };

  const passwordModel: InputModel = {
    id: 'password',
    type: 'password',
    value: customersStore.credentials.password,
    onChange: (e) => customersStore.setState(({ credentials }) => (credentials.password = e.target.value)),
    error:
      errorTriggered &&
      (!customersStore.credentials.password
        ? 'Please fill out the data'
        : !customersStore.isPasswordValid()
        ? 'Password is too week'
        : customersStore.credentials.password !== confirmPwd
        ? 'Passwords don not mach'
        : false),
  };

  const confirmPwdModel: InputModel = {
    id: 'confirmPassword',
    type: 'password',
    value: confirmPwd,
    onChange: (e) => setConfirmPwd(e.target.value),
    error: errorTriggered && customersStore.credentials.password !== confirmPwd && 'Passwords don not mach',
  };

  useEffect(() => {
    if (!isOpened) {
      setErrorTriggered(false);
      setTimeout(customersStore.resetData, 1000);
    }
  }, [isOpened]);

  return (
    <Dialog
      open={isOpened}
      onOpenChange={() => (setErrorTriggered(false), dialogsStore.toggleDialog(DialogEnum.SIGNUP))}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Your Account</DialogTitle>
          <DialogDescription>Fill in your details to get started</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <LabeledInput model={firstNameModel} label="First Name" placeholder="Jane">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </LabeledInput>
            <LabeledInput model={lastNameModel} label="Last Name" placeholder="Doe" />
          </div>

          {/* Email */}
          <LabeledInput model={emailModel} label="Email Address" placeholder="jane@example.com">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </LabeledInput>

          {/* Phone */}
          <LabeledPhoneInput model={phoneModel} label="Phone Number (Optional)" placeholder="(555) 123-4567" />

          {/* Password */}
          <LabeledPasswordInput model={passwordModel} label="Password" placeholder="Create a strong password" />

          {/* Confirm Password */}
          <LabeledPasswordInput model={confirmPwdModel} label="Confirm Password" placeholder="Confirm your password" />

          {/* Terms & Newsletter */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="agreeTerms" className="mt-1" />
              <Label htmlFor="agreeTerms" className="text-sm leading-5">
                I agree to the
                <Button variant="link" className="p-0 h-auto text-sm">
                  Terms of Service
                </Button>
                and
                <Button variant="link" className="p-0 h-auto text-sm">
                  Privacy Policy
                </Button>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="subscribeNewsletter" className="mt-1" />
              <Label htmlFor="subscribeNewsletter" className="text-sm leading-5">
                Subscribe to our newsletter for exclusive deals and updates
              </Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" onClick={handleSubmit}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </div>
          ) : (
            'Create Account'
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
