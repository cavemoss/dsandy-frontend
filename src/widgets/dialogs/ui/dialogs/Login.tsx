'use client';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import FacebookSvg from '@/shared/components/svg-icons/FaceBook';
import GoogleSvg from '@/shared/components/svg-icons/Google';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Checkbox } from '@/shared/shadcd/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcd/components/ui/dialog';
import { Input } from '@/shared/shadcd/components/ui/input';
import { Label } from '@/shared/shadcd/components/ui/label';
import { Separator } from '@/shared/shadcd/components/ui/separator';

import { useDialogsStore } from '../..';
import { DialogEnum } from '../../types/dialogs.types';

export default function LoginDialog() {
  const open = useDialogsStore((state) => state[DialogEnum.LOGIN]);
  const { toggleDialog } = useDialogsStore.getState();

  return (
    <Dialog open={open} onOpenChange={() => toggleDialog(DialogEnum.LOGIN)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In to Your Account</DialogTitle>
          <DialogDescription>Enter your credentials to access your account</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" placeholder="Enter your password" className="pl-10 pr-10" />
              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                {false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

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

        <Button type="submit" className="w-full">
          {false ? (
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

        <div className="text-center text-sm">
          <span className="text-muted-foreground">{"Don't have an account?"} </span>
          <Button
            onClick={() => (toggleDialog(DialogEnum.LOGIN), toggleDialog(DialogEnum.SIGNUP))}
            variant="link"
            className="p-0 h-auto"
          >
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
