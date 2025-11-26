import { useProductsStore } from '@/entities/products';
import { createZustand, deepClone, objectByKey } from '@/shared/lib/utils';
import { formatPrice } from '@/widgets/init';

import { CartState } from '../types';

export const useCartStore = createZustand<CartState>('cart', (set, get) => ({
  items: [],

  // Getters

  getCartDisplayItems: () =>
    get().items.map((item) => {
      const { [item.productId]: product } = useProductsStore.getState().getProductsByIds();
      const { [item.scuId]: scu } = objectByKey(product.scus, 'id');

      return {
        productName: product.name,
        propertyName: scu.propertyName,
        propertyValueName: scu.propertyValueName,
        displayPrice: {
          original: formatPrice(scu.priceInfo.dsPrice),
          discounted: formatPrice(scu.priceInfo.dsOfferPrice),
        },
        image: scu.image,
        quantity: item.quantity,
      };
    }),

  getCartItemIndex: (productId, scuId) =>
    get().items.findIndex((item) => item.productId === productId && item.scuId === scuId),

  getCartItem: (productId, scuId) => {
    const index = get().getCartItemIndex(productId, scuId);
    return get().items[index];
  },

  getItemPrice: (index) => {
    const item = get().items[index];

    const { [item.productId]: product } = useProductsStore.getState().getProductsByIds();
    const { [item.scuId]: scu } = objectByKey(product.scus, 'id');

    return formatPrice(scu.priceInfo.dsOfferPrice * item.quantity);
  },

  getTotalPrice: () => Math.trunc(get().getSubtotal()),

  getSubtotal: () =>
    get().items.reduce((sum, item) => {
      const { [item.productId]: product } = useProductsStore.getState().getProductsByIds();
      const { [item.scuId]: scu } = objectByKey(product.scus, 'id');

      return sum + scu.priceInfo.dsOfferPrice * item.quantity;
    }, 0),

  getTotalItems: () => get().items.length,

  getAmountSaved: () => 0,

  // Actions

  init() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) set({ items: JSON.parse(cartItems) });
  },

  addToCart: (item) => set((state) => (state.items.push(item), deepClone(state))),

  removeFromCart: (index) => set((state) => (state.items.splice(index, 1), deepClone(state))),

  setItemQuantity(arg1, arg2, arg3?) {
    set((state) => {
      let index: number;
      let amount: number;

      if (typeof arg3 === 'number') {
        index = state.getCartItemIndex(arg1, arg2);
        amount = arg3;
      } else {
        index = arg1;
        amount = arg2;
      }

      const ptr = state.items[index];
      ptr.quantity = Math.max(1, ptr.quantity + amount);

      return deepClone(state);
    });
  },
}));

useCartStore.subscribe((state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.items));
});
