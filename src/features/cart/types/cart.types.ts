import { DisplayPrice } from '@/shared/lib/types';

export interface CartItem {
  productId: number;
  scuId: number;
  quantity: number;
}

export interface CartDisplayItem {
  productName: string;
  properties: {
    name: string;
    value: string;
  }[];
  displayPrice: DisplayPrice;
  discount: null | string;
  image: string;
  quantity: number;
  link: string;
}

export interface CartState {
  items: CartItem[];
  item: CartItem | null;
  // Getters
  getItems: () => CartItem[];
  getDisplayItems: () => CartDisplayItem[];

  getItemIndex: (productId: number, scuId: number) => number;
  getItem: (productId: number, scuId: number) => CartItem;

  getItemPriceFormatted: (index: number) => string;

  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getRealTotal: () => number;

  getItemsCount: () => number;
  getAmountSaved: () => number;
  // Actions
  init: () => void;
  addToCart: (item: CartItem) => void;
  handleBuyNow: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setItemQuantity: {
    (productId: number, scuId: number, amount: number): void;
    (index: number, amount: number): void;
  };
}
