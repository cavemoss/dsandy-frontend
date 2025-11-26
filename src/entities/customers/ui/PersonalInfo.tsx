import { Mail, Phone, User, X } from 'lucide-react';

import LabeledInput from '@/shared/components/LabeledInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import { InputModel } from '@/shared/lib/types';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { TabsContent } from '@/shared/shadcd/components/ui/tabs';

import { useCustomersStore } from '../model';

export default function PersonalInfo() {
  const store = useCustomersStore();

  const currentCustomer = useCustomersStore((state) => state.currentCustomerModel);

  if (!currentCustomer) return <></>;

  const { setCustomerModel } = store;

  const isChanged = store.isChanged();

  const fistNameModel: InputModel = {
    id: 'fistName',
    type: 'text',
    value: currentCustomer.info.fistName,
    onChange: (e) => setCustomerModel((s) => (s.info.fistName = e.target.value)),
  };

  const lastNameModel: InputModel = {
    id: 'lastName',
    type: 'text',
    value: currentCustomer.info.lastName,
    onChange: (e) => setCustomerModel((s) => (s.info.lastName = e.target.value)),
  };

  const emailModel: InputModel = {
    id: 'email',
    type: 'text',
    value: currentCustomer.email,
    onChange: (e) => setCustomerModel((s) => (s.email = e.target.value)),
  };

  const phoneModel: InputModel = {
    id: 'phone',
    type: 'tel',
    value: currentCustomer.info.phone,
    onChange: (e) => setCustomerModel((s) => (s.info.phone = e.target.value)),
  };

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
          <LabeledPhoneInput model={phoneModel} label="Phone" icon={<Phone />} />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
