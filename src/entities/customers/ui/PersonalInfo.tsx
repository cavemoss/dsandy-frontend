import { Mail, Phone, User, X } from 'lucide-react';

import LabeledInput from '@/shared/components/LabeledInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import { Model } from '@/shared/lib/utils';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { TabsContent } from '@/shared/shadcd/components/ui/tabs';

import { useCustomersStore } from '../model';

export default function PersonalInfo() {
  const store = useCustomersStore();
  const model = new Model(store);

  const currentCustomer = useCustomersStore((state) => state.currentCustomerModel);

  if (!currentCustomer) return <></>;

  const isChanged = store.isChanged();

  const fistNameModel = model.input((s) => s.currentCustomerModel!.info, 'firstName');

  const lastNameModel = model.input((s) => s.currentCustomerModel!.info, 'lastName');

  const emailModel = model.input((s) => s.currentCustomerModel!, 'email');

  const phoneModel = model.input((s) => s.currentCustomerModel!.info, 'phone');

  return (
    <TabsContent value="profile">
      <Card>
        <CardHeader className="flex items-center min-h-[36px]">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardAction className="ml-auto flex gap-2">
            {isChanged && (
              <>
                <Button variant="ghost">
                  <X /> Cancel
                </Button>
                <Button variant="outline">Save Changes</Button>
              </>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <LabeledInput model={fistNameModel} label="First Name" icon={<User />} />
            <LabeledInput model={lastNameModel} label="Last Name" />
          </div>
          <LabeledInput model={emailModel} label="Email" icon={<Mail />} />
          <LabeledPhoneInput model={phoneModel} label="Phone" withIcon={<Phone />} />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
