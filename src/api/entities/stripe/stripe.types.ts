export interface CreatePaymentIntentBody {
  amount: number;
  currency: string;
  metadata: {
    orderId: number;
  };
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}
