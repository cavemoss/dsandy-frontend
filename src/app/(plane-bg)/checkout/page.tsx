import { CheckoutForm, CheckoutSummary } from '@/features/checkout';

export default function PaymentPage() {
  return (
    <>
      <div className="ml-auto w-150">
        <CheckoutForm />
      </div>

      <CheckoutSummary />
    </>
  );
}
