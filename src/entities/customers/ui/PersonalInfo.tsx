import { Mail, User, X } from 'lucide-react';

import LabeledInput from '@/shared/components/LabeledInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import { Model } from '@/shared/lib/utils';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { TabsContent } from '@/shared/shadcd/components/ui/tabs';
import { useNavStore } from '@/widgets/init';

import { useCustomersStore } from '../model';

export default function PersonalInfo() {
  const store = useCustomersStore();
  const navStore = useNavStore();

  const current = useCustomersStore((state) => state.customerModel);

  if (!current) return navStore.push('/'), (<></>);

  const isChanged = store.isChanged();

  // Models

  const m = new Model(store);

  const fistNameModel = m.Input((s) => s.customerModel!.info, 'firstName');

  const lastNameModel = m.Input((s) => s.customerModel!.info, 'lastName');

  const emailModel = m.Input((s) => s.customerModel!, 'email');

  const phoneModel = m.Input((s) => s.customerModel!.info, 'phone');

  return (
    <TabsContent value="profile" className="mb-0">
      <Card>
        <CardHeader className="flex items-center min-h-[36px]">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardAction className="ml-auto flex gap-2">
            {isChanged && (
              <>
                <Button variant="ghost" className="hover:bg-red-100 hover:text-red-600">
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
          <LabeledPhoneInput model={phoneModel} label="Phone" withIcon />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
