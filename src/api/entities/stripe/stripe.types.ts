export interface CreatePaymentIntentBody {
  amount: number;
  currency: string;
  metadata: {
    orderId: number;
    tenantId: number;
  };
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}
