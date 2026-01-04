export interface ProductSCU {
  id: number;
  aliScuId: string;
  propertyId: number;
  propertyName: string;
  propertyValueId: number;
  propertyValueName: string;
  availableStock: number;
  priceInfo: {
    currency: string;
    price: string;
    offerPrice: string;
    offerBulkPrice: string;
    dsPrice: number;
    dsOfferPrice: number;
    dsDiscount: string | null;
  };
  image: string;
}

export interface Product {
  id: number;
  aliProductId: number;
  subdomainName: string;
  name: string;
  logistics: {
    deliveryTime: number;
    shipTo: string;
  };
  feedback: {
    reviewsCount: number;
    salesCount: string;
    rating: number;
  };
  images: string[];
  specifications: [string, string][];
  descriptionHtml: string;
  scus: ProductSCU[];
}

export interface GetProductReviewsQuery {
  aliProductId: number;
  page: number;
  pageSize: number;
}

export interface ProductReviews {
  overview: {
    rating: number;
    count: number;
    stats: {
      [K in 1 | 2 | 3 | 4 | 5]: number;
    };
  };
  list: {
    name: string;
    date: string;
    rating: number;
    text: string;
    images?: string[];
  }[];
}
