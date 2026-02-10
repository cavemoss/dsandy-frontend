import { toast } from 'sonner';

import { createZustand, deepClone } from '@/shared/lib/utils';
import { useDialogsStore } from '@/widgets/dialogs';

import { FavoritesState } from '../types';

export const useFavoritesStore = createZustand<FavoritesState>('favorites', (set, get) => ({
  items: {},

  // Actions

  init: () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) set({ items: JSON.parse(favorites) });
  },

  toggle: (productId, scuId) => {
    set((state) => {
      const { items } = state;
      const key: keyof typeof items = `${productId}:${scuId}`;

      if (items[key]) {
        delete items[key];
      } else {
        items[key] = 1;
        toast.success('Item added to wishlist!');
      }

      state.items = items;
      return deepClone(state);
    });
  },

  clearAll() {
    useDialogsStore.getState().useAlert({
      title: 'Are you sure?',
      description: 'This action will clear all of your saved items',
      type: 'confirm',
    });
  },
}));

useFavoritesStore.subscribe((state) => {
  localStorage.setItem('favorites', JSON.stringify(state.items));
});
