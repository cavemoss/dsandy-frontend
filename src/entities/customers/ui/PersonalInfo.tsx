import { Mail, User, X } from 'lucide-react';
import { useState } from 'react';

import LabeledInput from '@/shared/components/LabeledInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import { Model } from '@/shared/lib/utils';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { TabsContent } from '@/shared/shadcd/components/ui/tabs';

import { useCustomersStore } from '../model';

export default function PersonalInfo() {
  const store = useCustomersStore();

  const current = useCustomersStore((state) => state.customerModel);

  const [phoneValid, setPhoneValid] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!current) return <></>;

  const isChanged = store.isChanged();

  // Models

  const m = new Model(store, errorTrigger);

  const fistNameModel = m.newInput((s) => s.customerModel!.info, 'firstName', {
    error: !current.info.firstName && <>Please fill out the data</>,
  });

  const lastNameModel = m.newInput((s) => s.customerModel!.info, 'lastName', {
    error: !current.info.lastName && <>Please fill out the data</>,
  });

  const emailModel = m.newInput((s) => s.customerModel!, 'email', {
    error: !current.email ? (
      <>Please fill out the data</>
    ) : (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(current.email) && <>Invalid email</>
    ),
  });

  const phoneModel = m.newInput((s) => s.customerModel!.info, 'phone', {
    error: !phoneValid && <>Invalid phone</>,
  });

  // Methods

  const handleSubmit = async () => {
    setErrorTrigger(true);

    if (!m.isAllValid) return;
    setLoading(true);

    await store.savePersonalInfo();
    setLoading(false);
  };

  const cancelChanges = () => {
    store.cancelChanges();
    setErrorTrigger(false);
  };

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
                <Button variant="ghost" className="hover:bg-red-100 hover:text-red-600" onClick={() => cancelChanges()}>
                  <X /> Cancel
                </Button>

                <Button variant="outline" type="submit" disabled={errorTrigger && !m.isAllValid} onClick={handleSubmit}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <>Save Changes</>
                  )}
                </Button>
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
          <LabeledPhoneInput
            model={phoneModel}
            onReset={() => store.setState((s) => (s.customerModel!.info.phone = ''))}
            setValid={setPhoneValid}
            label="Phone"
            withIcon
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
