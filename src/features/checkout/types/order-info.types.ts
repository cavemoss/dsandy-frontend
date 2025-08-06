export enum CheckoutStepEnum {
  SHIPPING_INFO,
  PAYMENT_INFO,
  ORDER_REVIEW,
}

export enum PaymentOptionEnum {
  VISA,
  MASTER_CARD,
  PAY_PALL,
}

export interface ShippingInfo {
  recipient: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  address: {
    apartment: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
