import { ParamValue } from 'next/dist/server/request/params';

import { Product, ProductReviews, ProductSCU } from '@/api/entities';
import { CartItem } from '@/features/cart';
import { DisplayPrice } from '@/shared/lib/types';

export interface ProductsState {
  products: {
    all: Product[];
    current: {
      item: Product | null;
      scu: ProductSCU | null;
      imageIndex: number;
      quantity: number;
      reviews: ProductReviews | null;
    };
  };
  // getters
  getProductsByIds: () => { [id: string]: Product };
  getCurrentSCUsByIds: () => { [id: string]: ProductSCU };
  getProductAndSCU: (productId: number, scuId: number) => [Product, ProductSCU];
  getProductImages: () => string[];
  getDisplayPrices: () => DisplayPrice;
  getInStock: () => boolean;
  getCartItem: (quantity: number) => CartItem;
  getExactSCU: (productId: number, scuId: number) => ProductSCU;
  // actions
  init: () => Promise<void>;
  loadAllProducts: () => Promise<void>;
  loadProductReviews: (page?: number) => Promise<void>;
  setCurrentProduct: (idParam: ParamValue, scuId?: string | null) => void;
  setSCU: (index: number) => void;
  setState: (clb: (s: this) => void) => void;
}
