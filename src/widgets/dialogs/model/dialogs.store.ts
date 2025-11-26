import { createZustand, deepClone } from '@/shared/lib/utils';

import { DialogEnum, DialogsState } from '../types';

export const useDialogsStore = createZustand<DialogsState>('dialogs', (set) => ({
  [DialogEnum.LOGIN]: false,
  [DialogEnum.SIGNUP]: false,

  toggleDialog(dialog) {
    set((state) => {
      Object.values(DialogEnum).forEach((d) => d !== dialog && (state[d] &&= false));
      return (state[dialog] = !state[dialog]), deepClone(state);
    });
  },
}));
