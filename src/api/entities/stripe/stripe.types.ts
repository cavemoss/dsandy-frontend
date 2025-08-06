export interface CreatePaymentIntentBodyDto {
  amount: number;
  currency: string;
}

export interface CreatePaymentIntentResponseDto {
  clientSecret: string;
}
