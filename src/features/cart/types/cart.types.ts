import { DisplayPrice } from '@/shared/lib/types';

export interface CartItem {
  productId: number;
  scuId: number;
  quantity: number;
}

export interface CartDisplayItem {
  productName: string;
  propertyName: string;
  propertyValueName: string;
  displayPrice: DisplayPrice;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  // Getters
  getCartItemIndex: (productId: number, scuId: number) => number;
  getCartItem: (productId: number, scuId: number) => CartItem;
  getCartDisplayItems: () => CartDisplayItem[];
  getItemPrice: (index: number) => string;
  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemsCount: () => number;
  getAmountSaved: () => number;
  // Actions
  init: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setItemQuantity: {
    (productId: number, scuId: number, amount: number): void;
    (index: number, amount: number): void;
  };
}
