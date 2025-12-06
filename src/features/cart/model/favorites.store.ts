import { createZustand } from '@/shared/lib/utils';

import { FavoritesState } from '../types';

export const useFavoritesStore = createZustand<FavoritesState>('favorites', (set, get) => ({
  items: {},

  // Actions

  init: () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) set({ items: JSON.parse(favorites) });
  },

  toggle: (productId, scuId) => {
    const { items } = get();
    const key: keyof typeof items = `${productId}:${scuId}`;

    items[key] ? delete items[key] : (items[key] = 1);

    set({ items });
  },
}));

useFavoritesStore.subscribe((state) => {
  localStorage.setItem('favorites', JSON.stringify(state.items));
});
