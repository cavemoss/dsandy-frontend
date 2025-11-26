import * as api from '@/api/entities';
import { createZustand, deepClone, objectByKey } from '@/shared/lib/utils';
import { formatPrice } from '@/widgets/init';

import { ProductsState } from '../types';

export const useProductsStore = createZustand<ProductsState>('products', (set, get) => ({
  products: {
    all: [],
    current: {
      item: null,
      scu: null,
      imageIndex: 0,
      quantity: 1,
    },
  },
  error: false,

  // Getters

  getProductsByIds: () => objectByKey(get().products.all, 'id'),

  getCurrentSCUsByIds: () => objectByKey(get().products.current.item!.scus, 'id'),

  getProductAndSCU: (productId, scuId) => {
    const { [productId]: product } = get().getProductsByIds();
    const { [scuId]: scu } = objectByKey(product.scus, 'id');

    return { product, scu };
  },

  getProductImages: () => {
    const { item: product } = get().products.current;
    return [...product!.images, ...product!.scus.map((scu) => scu.image)];
  },

  getDisplayPrices: () => {
    const price = get().products.current.scu!.priceInfo;
    console.log(price.dsOfferPrice, formatPrice(price.dsOfferPrice));
    return {
      original: formatPrice(price.dsPrice),
      discounted: formatPrice(price.dsOfferPrice),
    };
  },

  getInStock: () => get().products.current.scu!.availableStock,

  getCartItem: (quantity) => {
    const { item, scu } = get().products.current;
    return { productId: item!.id, scuId: scu!.id, quantity };
  },

  // Actions

  async init() {
    await get().loadAllProducts();
  },

  async loadAllProducts() {
    try {
      const products = await api.products.getDynamic();
      set((state) => ((state.products.all = products), state));
    } catch (error) {
      console.debug('Error fetching products', { error });
      set({ error: true });
    }
  },

  setCurrentProduct(idParam) {
    const productId: number = Array.isArray(idParam) ? NaN : Number(idParam);
    const product = get().products.all.find((p) => p.id === productId);

    if (!product) return;

    set((state) => {
      const { current } = state.products;

      current.item = product;
      current.scu = product.scus[0];

      return state;
    });
  },

  setSCU(scuId) {
    set((state) => {
      const ptr = state.products.current;

      ptr.scu = state.getCurrentSCUsByIds()[scuId];
      ptr.imageIndex = state.getProductImages().findIndex((img) => img === ptr.scu!.image);
      ptr.quantity = 1;

      return deepClone(state);
    });
  },

  setState: (callback) => set((state) => (callback(state), deepClone(state))),
}));
