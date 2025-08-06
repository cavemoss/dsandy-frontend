import { DisplayPrice } from '@/shared/lib/types';

export interface CartItem {
  productId: number;
  variantIdx: number;
  imgSrc: string;
  productTitle: string;
  variantTitle: string;
  inStock: boolean;
  priceUSD: number;
  displayPrice: DisplayPrice;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  // getters
  isCurrentProductAdded: () => boolean;
  getItemPrice: (item: CartItem) => number;
  getTotalItems: () => number | null;
  getAmountSaved: () => number;
  // action
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setItemQuantity: (index: number, amount: number) => void;
}
