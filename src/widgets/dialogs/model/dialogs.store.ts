import { createZustand, deepClone } from '@/shared/lib/utils';

import { DialogEnum, DialogsState } from '../types';

export const useDialogsStore = createZustand<DialogsState>('dialogs', (set, get) => ({
  [DialogEnum.LOGIN]: false,
  [DialogEnum.SIGNUP]: false,
  [DialogEnum.IMAGE_VIEWER]: false,

  images: [],

  imageIndex: 0,

  toggleDialog(dialog) {
    set((state) => {
      Object.values(DialogEnum).forEach((d) => d !== dialog && (state[d] &&= false));
      return (state[dialog] = !state[dialog]), deepClone(state);
    });
  },

  viewImages(images = [], imageIndex = 0) {
    set({ images, imageIndex });
    get().toggleDialog(DialogEnum.IMAGE_VIEWER);
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
