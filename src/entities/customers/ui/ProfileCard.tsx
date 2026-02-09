'use client';

import { Button } from '@shadcd/button';
import { Card, CardAction, CardContent, CardHeader } from '@shadcd/card';
import { Mail, Pencil, Phone, User } from 'lucide-react';

import { useIsMobile } from '@/shared/shadcd/hooks/use-mobile';
import { DialogEnum, useDialogsStore } from '@/widgets/dialogs';
import PersonalInfoDrawer from '@/widgets/dialogs/ui/drawers/PersonalInfo';

import { useCustomersStore } from '../model';

export default function CustomerProfileCard() {
  const isMobile = useIsMobile();
  const dialogs = useDialogsStore();

  const customer = useCustomersStore((state) => state.customer);

  if (!customer) return <Card className="lg:col-span-1"></Card>;

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardAction>
          <PersonalInfoDrawer>
            <Button
              variant="ghost"
              className="text-sm"
              onClick={() => dialogs.toggleDialog(DialogEnum.PERSONAL_INFO, isMobile)}
            >
              Edit info <Pencil />
            </Button>
          </PersonalInfoDrawer>
        </CardAction>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center space-y-3">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-primary" />
        </div>
        <div className="font-medium">
          {customer.info.firstName} {customer.info.lastName}
        </div>

        <div className="text-sm flex gap-2 items-center text-muted-foreground">
          <Mail size={16} /> {customer.email}
        </div>
        <div className="text-sm flex gap-2 items-center text-muted-foreground">
          <Phone size={16} /> {customer.info.phone}
        </div>
      </CardContent>
    </Card>
  );
}
