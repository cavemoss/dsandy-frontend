import { createZustand, deepClone } from '@/shared/lib/utils';

import { DialogEnum, DialogsState } from '../types';

export const useDialogsStore = createZustand<DialogsState>('dialogs', (set) => ({
  [DialogEnum.LOGIN]: false,
  [DialogEnum.SIGNUP]: false,

  // actions
  toggleDialog(dialog) {
    set((state) => ((state[dialog] = !state[dialog]), deepClone(state)));
  },
}));
