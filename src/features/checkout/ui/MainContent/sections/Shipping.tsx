import { Truck } from 'lucide-react';

import { CheckoutStepEnum, useCheckoutStore } from '@/features/checkout';
import { LabeledInput, LabeledSelect } from '@/shared/components/form';
import { USStates } from '@/shared/lib/constants';
import { InputModel, SelectModel } from '@/shared/lib/types';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';

export default function CheckoutShippingForm() {
  const shippingInfo = useCheckoutStore((state) => state.shipping);
  const { setShippingInfo, setStep } = useCheckoutStore.getState();

  const USStatesOptions = USStates.map(({ code: value, label }) => ({ value, label }));

  // Recipient Models
  const emailModel: InputModel = {
    id: 'email',
    type: 'email',
    value: shippingInfo.recipient.email,
    onChange: (e) => setShippingInfo((info) => (info.recipient.email = e.target.value)),
  };

  const firstNameModel: InputModel = {
    id: 'firstName',
    type: 'text',
    value: shippingInfo.recipient.firstName,
    onChange: (e) => setShippingInfo((info) => (info.recipient.firstName = e.target.value)),
  };

  const lastNameModel: InputModel = {
    id: 'firstName',
    type: 'text',
    value: shippingInfo.recipient.lastName,
    onChange: (e) => setShippingInfo((info) => (info.recipient.lastName = e.target.value)),
  };

  const phoneModel: InputModel = {
    id: 'phone',
    type: 'tel',
    value: shippingInfo.recipient.phone,
    onChange: (e) => setShippingInfo((info) => (info.recipient.phone = e.target.value)),
  };

  // Address Models
  const stateModel: SelectModel = {
    value: shippingInfo.address.state,
    onValueChange: (value) => setShippingInfo((info) => (info.address.state = value)),
  };

  const cityModel: InputModel = {
    id: 'city',
    type: 'text',
    value: shippingInfo.address.city,
    onChange: (e) => setShippingInfo((info) => (info.address.city = e.target.value)),
  };

  const zipCodeModel: InputModel = {
    id: 'zipCode',
    type: 'text',
    value: shippingInfo.address.zipCode,
    onChange: (e) => setShippingInfo((info) => (info.address.zipCode = e.target.value)),
  };

  const addressModel: InputModel = {
    id: 'street',
    type: 'text',
    value: shippingInfo.address.street,
    onChange: (e) => setShippingInfo((info) => (info.address.street = e.target.value)),
  };

  const apartmentModel: InputModel = {
    id: 'apartment',
    type: 'text',
    value: shippingInfo.address.apartment,
    onChange: (e) => setShippingInfo((info) => (info.address.apartment = e.target.value)),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Shipping Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <LabeledInput model={emailModel} label="Email Address" placeholder="john@example.com" />

        <div className="grid grid-cols-2 gap-4">
          <LabeledInput model={firstNameModel} label="First Name" placeholder="Jane" />

          <LabeledInput model={lastNameModel} label="Last Name" placeholder="Doe" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <LabeledSelect model={stateModel} label="State" placeholder="Select state" options={USStatesOptions} />

          <LabeledInput model={cityModel} label="City" placeholder="New York" />

          <LabeledInput model={zipCodeModel} label="ZIP Code" placeholder="10001" />
        </div>

        <LabeledInput model={addressModel} label="Address" placeholder="123 Main Street" />

        <LabeledInput model={apartmentModel} label="Apartment, suite, etc. (optional)" placeholder="Apt 4B" />

        <LabeledInput model={phoneModel} label="Phone Number (optional)" placeholder="(555) 123-4567" />

        <Button onClick={() => setStep(CheckoutStepEnum.PAYMENT_INFO)} className="w-full">
          Continue to Payment
        </Button>
      </CardContent>
    </Card>
  );
}
