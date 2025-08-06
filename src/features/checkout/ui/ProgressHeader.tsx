import { CheckCircle, CreditCard, Truck } from 'lucide-react';
import { ReactNode } from 'react';

import { useCheckoutStore } from '../model';
import { CheckoutStepEnum } from '../types';

export function CheckoutProgressHeader() {
  const step = useCheckoutStore((state) => state.currentStep);

  const Step = (props: { icon: ReactNode; step: CheckoutStepEnum; title: string; muted: string }) => (
    <div className="flex flex-col items-center">
      <div
        className={
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ' +
          (step >= props.step
            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
            : 'bg-muted text-muted-foreground')
        }
      >
        {props.icon}
      </div>
      <div className="mt-3 text-center">
        <p className={'font-medium ' + (step >= props.step ? 'text-primary' : 'text-muted-foreground')}>
          {props.title}
        </p>
        <p className="text-xs text-muted-foreground hidden sm:block">{props.muted}</p>
      </div>
    </div>
  );

  return (
    <div className="mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2" />
          <div
            className="absolute top-6 left-0 h-0.5 bg-primary transform -translate-y-1/2 transition-all duration-500"
            style={{ width: step === 0 ? '0%' : step === 1 ? '50%' : '100%' }}
          />
          {/* Steps */}
          <div className="relative -mx-10 flex justify-between items-center">
            <Step
              icon={<Truck className="h-6 w-6" />}
              step={CheckoutStepEnum.SHIPPING_INFO}
              title="Shipping"
              muted="Delivery information"
            />
            <Step
              icon={<CreditCard className="h-6 w-6" />}
              step={CheckoutStepEnum.PAYMENT_INFO}
              title="Payment"
              muted="Payment method"
            />
            <Step
              icon={<CheckCircle className="h-6 w-6" />}
              step={CheckoutStepEnum.ORDER_REVIEW}
              title="Review"
              muted="Confirm & complete"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
