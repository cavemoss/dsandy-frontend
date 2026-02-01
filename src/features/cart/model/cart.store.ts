import { toast } from 'sonner';

import { useProductsStore } from '@/entities/products';
import { createZustand, deepClone } from '@/shared/lib/utils';
import { formatPrice, useNavStore } from '@/widgets/init';

import { CartDisplayItem, CartItem, CartState } from '../types';

export const useCartStore = createZustand<CartState>('cart', (set, get) => ({
  items: [],

  item: null,

  // Getters

  getItems() {
    const self = get();
    const productsStore = useProductsStore.getState();

    let result: CartItem[] = self.items;

    if (self.item) {
      result = [self.item];
    } else {
      result = result.filter((item) => {
        const scu = productsStore.getExactSCU(item.productId, item.scuId);
        return scu?.availableStock > 0;
      });
    }

    return result;
  },

  getDisplayItems: () => {
    const productsStore = useProductsStore.getState();

    const result: CartDisplayItem[] = [];
    const items = get().getItems();

    items.forEach((item) => {
      const [product, scu] = productsStore.getProductAndSCU(item.productId, item.scuId);

      const properties = [scu, ...scu.combinations].map((el) => ({
        name: el.propertyName,
        value: el.propertyValueName,
      }));

      result.push({
        productName: product.title || product.aliName,
        properties,
        displayPrice: {
          original: formatPrice(scu.priceInfo.dsPrice),
          discounted: formatPrice(scu.priceInfo.dsOfferPrice),
        },
        discount: scu.priceInfo.dsDiscount,
        image: scu.image || product.images[0],
        quantity: item.quantity,
      });
    });

    return result;
  },

  getItemIndex: (productId, scuId) => {
    const self = get();
    return self.getItems().findIndex((item) => item.productId === productId && item.scuId === scuId);
  },

  getItem: (productId, scuId) => {
    const self = get();
    const index = self.getItemIndex(productId, scuId);
    return self.getItems()[index];
  },

  getItemPriceFormatted: (index) => {
    const item = get().getItems()[index];
    const scu = useProductsStore.getState().getExactSCU(item.productId, item.scuId);
    return formatPrice(scu.priceInfo.dsOfferPrice * item.quantity);
  },

  getSubtotal: () => {
    const self = get();
    const productsStore = useProductsStore.getState();

    const result = self.getItems().reduce((sum, item) => {
      const scu = productsStore.getExactSCU(item.productId, item.scuId);
      return sum + scu.priceInfo.dsOfferPrice * item.quantity;
    }, 0);

    return +result.toFixed(2);
  },

  getShipping: () => {
    const self = get();
    return self.getSubtotal() > 50 ? 0 : 9.99;
  },

  getTotal: () => {
    const self = get();
    return +(self.getSubtotal() + self.getShipping()).toFixed(2);
  },

  getRealTotal: () => {
    const self = get();
    const productsStore = useProductsStore.getState();

    const result = self.getItems().reduce((sum, item) => {
      const scu = productsStore.getExactSCU(item.productId, item.scuId);
      return sum + parseFloat(scu.priceInfo.offerPrice) * item.quantity;
    }, 0);

    return +result.toFixed(2);
  },

  getItemsCount: () => get().getItems().length,

  getAmountSaved: () => {
    const self = get();
    const productsStore = useProductsStore.getState();

    let subtotal = 0;
    let subtotalOffer = 0;

    self.getItems().forEach((item) => {
      const scu = productsStore.getExactSCU(item.productId, item.scuId);
      subtotal += scu.priceInfo.dsPrice * item.quantity;
      subtotalOffer += scu.priceInfo.dsOfferPrice * item.quantity;
    });

    return +(subtotal - subtotalOffer).toFixed(2);
  },

  // Actions

  init() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) set({ items: JSON.parse(cartItems) });
  },

  addToCart(item) {
    set((state) => {
      state.items.push(item);
      toast.success('Item added to cart');
      return deepClone(state);
    });
  },

  handleBuyNow(item) {
    set({ item });
    useNavStore.getState().push('/checkout');
  },

  removeFromCart(index) {
    set((state) => (state.items.splice(index, 1), deepClone(state)));
  },

  setItemQuantity(arg1, arg2, arg3?) {
    set((state) => {
      let index: number;
      let amount: number;

      if (typeof arg3 === 'number') {
        index = state.getItemIndex(arg1, arg2);
        amount = arg3;
      } else {
        index = arg1;
        amount = arg2;
      }

      const ptr = state.items[index];
      const quantity = Math.max(1, ptr.quantity + amount);

      if (ptr.quantity == quantity) {
        return state;
      }

      ptr.quantity = quantity;
      toast.info('Item quantity changed');

      return deepClone(state);
    });
  },
}));

useCartStore.subscribe((state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.items));
});
