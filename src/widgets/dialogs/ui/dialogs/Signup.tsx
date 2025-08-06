'use client';

import { Dialog } from '@radix-ui/react-dialog';
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';

import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Checkbox } from '@/shared/shadcd/components/ui/checkbox';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/shadcd/components/ui/dialog';
import { Input } from '@/shared/shadcd/components/ui/input';
import { Label } from '@/shared/shadcd/components/ui/label';
import { Separator } from '@/shared/shadcd/components/ui/separator';

import { useDialogsStore } from '../..';
import { DialogEnum } from '../../types/dialogs.types';

export default function SignupDialog() {
  const open = useDialogsStore((state) => state[DialogEnum.SIGNUP]);
  const { toggleDialog } = useDialogsStore.getState();

  return (
    <Dialog open={open} onOpenChange={() => toggleDialog(DialogEnum.SIGNUP)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Your Account</DialogTitle>
          <DialogDescription>Fill in your details to get started</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="firstName" type="text" placeholder="John" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" placeholder="Doe" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="phone" type="tel" placeholder="(555) 123-4567" className="pl-10" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" placeholder="Create a strong password" className="pl-10 pr-10" />
              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                {true ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirmPassword" placeholder="Confirm your password" className="pl-10 pr-10" />
              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                {true ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Terms & Newsletter */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="agreeTerms" className="mt-1" />
              <Label htmlFor="agreeTerms" className="text-sm leading-5">
                I agree to the{' '}
                <Button variant="link" className="p-0 h-auto text-sm">
                  Terms of Service
                </Button>{' '}
                and{' '}
                <Button variant="link" className="p-0 h-auto text-sm">
                  Privacy Policy
                </Button>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="subscribeNewsletter" className="mt-1" />
              <Label htmlFor="subscribeNewsletter" className="text-sm leading-5">
                Subscribe to our newsletter for exclusive deals and updates
              </Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          {false ? (
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
            <GoogleSvg />
            Google
          </Button>
          <Button variant="outline">
            <FacebookSvg />
            Facebook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
