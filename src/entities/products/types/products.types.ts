import { ParamValue } from 'next/dist/server/request/params';

import { Product, ProductJson } from '@/api/entities';
import { CartItem } from '@/features/cart';
import { DisplayPrice } from '@/shared/lib/types';

export interface ProductsState {
  products: {
    all: Product[];
    current: {
      item: (Product & { quantity: number }) | null;
      variant: (ProductJson.Variant & { index: number }) | null;
      size: (ProductJson.VariantSize & { index: number }) | null;
    };
  };
  error: boolean;
  //getters
  getProductImages: () => string[];
  getDisplayPrices: () => DisplayPrice;
  getCartItem: () => CartItem;
  // actions
  init: () => Promise<void>;
  loadAllProducts: () => Promise<void>;
  setCurrentProduct: (idParam: ParamValue) => void;
  setVariant: (index: number) => void;
  setSize: (index: number) => void;
  setQuantity: (amount: number) => void;
}
