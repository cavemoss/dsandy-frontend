import Stripe from '@stripe/stripe-js';

export interface CreatePaymentIntentBody {
  amount: number;
  currency: string;
  metadata: {
    orderId: number;
    tenantId: number;
  };
}

export interface CreateConfirmIntentBody extends CreatePaymentIntentBody {
  confirmationTokenId: string;
  returnUrl: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  status: Stripe.PaymentIntent.Status;
}
