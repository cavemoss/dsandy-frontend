import * as api from '@/api/entities';
import { useFeedbackStore } from '@/entities/feedback';
import { createZustand, deepClone } from '@/shared/lib/utils';
import { useInitStore } from '@/widgets/init';

import { ProductsState } from '../types';

export const useProductsStore = createZustand<ProductsState>('products', (set, get) => ({
  products: {
    all: [],
    current: {
      item: null,
      variant: null,
      size: null,
    },
  },
  error: false,

  // getters
  getProductImages: () => {
    const { item: product } = get().products.current;
    return [...product!.gallery.map((g) => g.src), ...product!.variants.map((v) => v.imgSrc)];
  },

  getDisplayPrices: () => {
    const price = get().products.current.variant!.priceUSD;
    const format = (price: number) => '$' + price.toFixed(2);

    return { original: format(price * 1.2), discounted: format(price) };
  },

  getInStock: () => get().products.current.variant!.inStock,

  getCartItem: () => {
    const { item: product, variant } = get().products.current;

    return {
      productId: product!.id,
      variantIdx: variant!.index,
      priceUSD: variant!.priceUSD,
      imgSrc: variant!.imgSrcPreview,
      productTitle: product!.title,
      variantTitle: variant!.title,
      inStock: true,
      quantity: product!.quantity,
      displayPrice: get().getDisplayPrices(),
    };
  },

  // actions
  async init() {
    await get().loadAllProducts();
  },

  async loadAllProducts() {
    try {
      const subdomain = useInitStore.getState().getSubdomain();
      const products = await api.products.get(subdomain);

      set((state) => ((state.products.all = products), state));
    } catch (error) {
      console.debug('Error fetching products', { error });
      set({ error: true });
    }
  },

  setCurrentProduct(idParam) {
    const productId: number = Array.isArray(idParam) ? NaN : Number(idParam);
    const product = get().products.all.find((p) => p.id == productId);

    if (!product) return;

    set((state) => {
      const { current } = state.products;

      current.item = { ...product, quantity: 1 };
      current.variant = { ...product.variants[0], index: 0 };
      current.size = product.variantsSize && { ...product.variantsSize[0], index: 0 };

      return state;
    });

    void useFeedbackStore.getState().loadFeedback(productId);
  },

  setVariant(index) {
    const variant = get().products.current.item!.variants[index];

    set((state) => {
      state.products.current.variant = { ...variant, index };
      return deepClone(state);
    });
  },

  setSize(index) {
    const size = get().products.current.item!.variantsSize![index];

    set((state) => {
      state.products.current.size = { ...size, index };
      return deepClone(state);
    });
  },

  setQuantity(amount) {
    set((state) => {
      const { item: product } = state.products.current;

      product!.quantity = Math.max(1, product!.quantity + amount);

      return deepClone(state);
    });
  },
}));
