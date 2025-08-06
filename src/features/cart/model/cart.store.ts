import { useProductsStore } from '@/entities/products';
import { createZustand, deepClone } from '@/shared/lib/utils';

import { compareCartItems } from '../lib';
import { CartState } from '../types';

export const useCartStore = createZustand<CartState>('cart', (set, get) => ({
  items: [],

  // getters
  getTotalItems: () => get().items.length || null,

  getItemPrice: (item) => item.priceUSD * item.quantity,

  getAmountSaved: () => 0,

  isCurrentProductAdded: () => {
    const preparedCartItem = useProductsStore.getState().getCartItem();
    const existingCartItem = get().items.find((el) => el.variantIdx == preparedCartItem.variantIdx);

    if (!existingCartItem) return false;
    return compareCartItems(preparedCartItem, existingCartItem);
  },

  // actions
  addToCart(item) {
    const index = get().items.findIndex((el) => el.variantIdx == item.variantIdx);

    if (index < 0) {
      set((state) => (state.items.push(item), deepClone(state)));
    } else {
      set((state) => (Object.assign(state.items[index], item), deepClone(state)));
    }
  },

  removeFromCart(index) {
    set((state) => (state.items.splice(index, 1), deepClone(state)));
  },

  setItemQuantity(index, amount) {
    set((state) => {
      const cartItem = state.items[index];

      cartItem.quantity = Math.max(1, cartItem.quantity + amount);

      return deepClone(state);
    });
  },
}));
