import { CountryCode, CurrencyCode } from '@/shared/lib/types';

export interface ProductSCU {
  id: number;

  aliScuId: string;

  propertyId: number;

  propertyName: string;

  propertyValueId: number;

  propertyValueName: string;

  availableStock: number;

  priceInfo: {
    currency: CurrencyCode;
    price: string;
    offerPrice: string;
    offerBulkPrice: string;
    dsPrice: number;
    dsOfferPrice: number;
    dsDiscount: number;
  };

  image: string;
}

export interface Product {
  id: number;

  subdomainName: string;

  aliProductId: number;

  name: string;

  logistics: {
    deliveryTime: number;
    shipTo: CountryCode;
  };

  images: string[];

  feedback: {
    reviewsCount: number;
    salesCount: string;
    rating: number;
  };

  specifications: [string, string][];

  descriptionHtml: string;

  scus: ProductSCU[];
}
