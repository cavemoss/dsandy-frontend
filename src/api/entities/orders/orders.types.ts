export interface OrderShippingInfoDTO {
  address: string;
  address2?: string;
  country: string;
  city: string;
  province: string;
  zipCode: string;
  message?: string;
}

export interface OrderContactInfoDTO {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface OrderItemDTO {
  dProductId: number;
  skuAttr: `${number}:${number}`;
  quantity: number;
}

export interface OrderPaymentInfoDTO {
  currency: string;
  amount: number;
}

export interface OrderMetadata {
  profit: number;
  products: {
    [id: number]: {
      name: string;
      variants: {
        attr: string;
        quantity: number;
      }[];
    };
  };
}

export interface PlaceOrderBodyDTO {
  contactInfo: OrderContactInfoDTO;
  shippingInfo: OrderShippingInfoDTO;
  orderItems: OrderItemDTO[];
  paymentInfo: OrderPaymentInfoDTO;
  metadata: OrderMetadata;
}

export interface UpdateOrderInfoBodyDTO {
  orderId: number;
  contactInfo: OrderContactInfoDTO;
  shippingInfo: OrderShippingInfoDTO;
}

export enum OrderStatus {
  PLACED,
  PROCESSING,
  IN_DELIVERY,
  DELIVERED,
  COMPLEAT,
  REFUND_REQUESTED,
}

export interface DProductDTO {
  id: number;
  subdomainName: string;
  aliProductId: number;
  config: {
    priceMult: number;
  };
}

export interface DProductCategoryDTO {
  id: number;
  subdomainName: string;
  title: string;
  description: string | null;
  image: string | null;
}

export interface OrderDTO {
  id: number;
  subdomainName: string;
  customerId: number | null;
  status: OrderStatus;
  shippingInfo: OrderShippingInfoDTO;
  contactInfo: OrderContactInfoDTO;
  orderItems: OrderItemDTO[];
  metadata: OrderMetadata;
  dProducts: DProductDTO[];
  createdAt: string;
}
