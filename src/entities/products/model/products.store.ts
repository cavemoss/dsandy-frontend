import * as api from '@/api/entities';
import { createZustand, deepClone, indexByKey } from '@/shared/lib/utils';
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

  getProductsByIds: () => indexByKey(get().products.all, 'id'),

  getCurrentSCUsByIds: () => indexByKey(get().products.current.item?.scus, 'id'),

  getProductAndSCU: (productId, scuId) => {
    const { [productId]: product } = get().getProductsByIds();
    const { [scuId]: scu } = indexByKey(product?.scus, 'id');

    return [product, scu];
  },

  getProductImages: () => {
    const product = get().products.current.item;

    const otherImages = product?.images ?? [];
    let scuImages = product?.scus.map((scu) => scu.image).filter((el) => el != null) ?? [];
    scuImages = scuImages.filter((image, index, ptr) => ptr.findIndex((img) => img == image) == index);

    return [...otherImages, ...scuImages];
  },

  getDisplayPrices: () => {
    const price = get().products.current.scu?.priceInfo;
    return {
      original: formatPrice(price?.dsPrice ?? 0),
      discounted: formatPrice(price?.dsOfferPrice ?? 0),
    };
  },

  getInStock: () => (get().products.current.scu?.availableStock ?? 0) > 0,

  getCartItem: (quantity) => {
    const { item, scu } = get().products.current;
    return { productId: item?.id ?? 0, scuId: scu?.id ?? 0, quantity };
  },

  getExactSCU: (productId, scuId) => {
    const product = get().getProductsByIds()[productId];
    return indexByKey(product?.scus, 'id')[scuId];
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

    if (!product) return;

    const scu = indexByKey(product.scus, 'id')[scuId!] ?? product.scus[0];

    set((state) => {
      const ptr = state.products.current;

      ptr.reviews = null;
      ptr.item = product;
      ptr.scu = scu;
      ptr.imageIndex = scuId ? state.getProductImages().findIndex((img) => img == scu.image) : 0;

      return state;
    });

    self.loadProductReviews();
  },

  setSCU(scuId) {
    set((state) => {
      const ptr = state.products.current;

      ptr.scu = state.getCurrentSCUsByIds()[scuId];
      ptr.quantity = 1;

      const imageIndex = state.getProductImages().findIndex((img) => img === ptr.scu?.image);
      if (imageIndex >= 0) ptr.imageIndex = imageIndex;

      return deepClone(state);
    });
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
