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
      reviews: null,
    },
  },

  // Getters

  getProductsByIds: () => objectByKey(get().products.all, 'id'),

  getCurrentSCUsByIds: () => objectByKey(get().products.current.item!.scus, 'id'),

  getProductAndSCU: (productId, scuId) => {
    const { [productId]: product } = get().getProductsByIds();
    const { [scuId]: scu } = objectByKey(product.scus, 'id');

    return [product, scu];
  },

  getProductImages: () => {
    const product = get().products.current.item;
    return [...product!.images, ...product!.scus.map((scu) => scu.image)];
  },

  getDisplayPrices: () => {
    const price = get().products.current.scu!.priceInfo;
    return {
      original: formatPrice(price.dsPrice),
      discounted: formatPrice(price.dsOfferPrice),
    };
  },

  getInStock: () => get().products.current.scu!.availableStock > 0,

  getCartItem: (quantity) => {
    const { item, scu } = get().products.current;
    return { productId: item!.id, scuId: scu!.id, quantity };
  },

  getExactSCU: (productId, scuId) => {
    const product = get().getProductsByIds()[productId];
    return objectByKey(product.scus, 'id')[scuId];
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
    }
  },

  async loadProductReviews(page = 1) {
    const { aliProductId } = get().products.current.item!;

    try {
      const reviews = await api.products.getReviews({
        aliProductId,
        page,
        pageSize: 5,
      });
      set((state) => ((state.products.current.reviews = reviews), deepClone(state)));
    } catch (error) {
      console.debug('Error fetching product reviews', { error });
    }
  },

  setCurrentProduct(idParam, scuId) {
    const self = get();

    const productId: number = Array.isArray(idParam) ? NaN : Number(idParam);

    const product = self.getProductsByIds()[productId];
    const scu = objectByKey(product.scus, 'id')[scuId!] ?? product.scus[0];

    set((state) => {
      const { current } = state.products;

      current.reviews = null;
      current.item = product;
      current.scu = scu;
      current.imageIndex = state.getProductImages().findIndex((img) => img === scu.image);

      return state;
    });

    self.loadProductReviews();
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

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
