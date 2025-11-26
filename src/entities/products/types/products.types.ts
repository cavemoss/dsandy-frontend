import { ParamValue } from 'next/dist/server/request/params';

import { Product, ProductSCU } from '@/api/entities';
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
    };
  };
  error: boolean;
  // getters
  getProductsByIds: () => { [id: string]: Product };
  getCurrentSCUsByIds: () => { [id: string]: ProductSCU };
  getProductAndSCU: (productId: number, scuId: number) => { product: Product; scu: ProductSCU };
  getProductImages: () => string[];
  getDisplayPrices: () => DisplayPrice;
  getCartItem: (quantity: number) => CartItem;
  // actions
  init: () => Promise<void>;
  loadAllProducts: () => Promise<void>;
  setCurrentProduct: (idParam: ParamValue) => void;
  setSCU: (index: number) => void;
  setState: (callback: (state: ProductsState) => void) => void;
}
