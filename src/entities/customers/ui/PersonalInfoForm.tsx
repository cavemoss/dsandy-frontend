import { Button } from '@shadcd/button';
import { DialogClose, DialogFooter } from '@shadcd/dialog';
import { Spinner } from '@shadcd/spinner';
import { Mail, Save, User, X } from 'lucide-react';
import { useState } from 'react';

import LabeledInput from '@/shared/components/LabeledInput';
import { LabeledPhoneInput } from '@/shared/components/LabeledPhoneInput';
import { Model } from '@/shared/lib/utils';
import { DialogEnum, useDialogsStore } from '@/widgets/dialogs';

import { useCustomersStore } from '../model';

export default function CustomerPersonalInfoForm() {
  const store = useCustomersStore();
  const dialogs = useDialogsStore();

  const [phoneValid, setPhoneValid] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  const customer = useCustomersStore((state) => state.customerModel);
  const isChanged = store.isChanged();

  if (!customer) return <></>;

  // Models

  const m = new Model(store, errorTrigger);

  const fistNameModel = m.newInput((s) => s.customerModel!.info, 'firstName', {
    error: !customer.info.firstName && <>Please fill out the data</>,
  });

  const lastNameModel = m.newInput((s) => s.customerModel!.info, 'lastName', {
    error: !customer.info.lastName && <>Please fill out the data</>,
  });

  const emailModel = m.newInput((s) => s.customerModel!, 'email', {
    error: !customer.email ? (
      <>Please fill out the data</>
    ) : (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customer.email) && <>Invalid email</>
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

    setTimeout(() => {
      dialogs.toggleDialog(DialogEnum.PERSONAL_INFO);
    }, 600);
  };

  const cancelChanges = () => {
    store.cancelChanges();
    setErrorTrigger(false);
  };

  return (
    <>
      <div className="flex flex-col md:grid grid-cols-2 gap-2.5 md:gap-4">
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

      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={cancelChanges} variant="outline" className="w-26">
            <X /> Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleSubmit}
          className="w-26"
          disabled={!isChanged || loading || (errorTrigger && !m.isAllValid)}
        >
          {loading ? (
            <>
              <Spinner /> Saving...
            </>
          ) : (
            <>
              <Save /> Save
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
