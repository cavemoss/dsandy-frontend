import { createZustand, deepClone } from '@/shared/lib/utils';

import { DialogEnum, DialogsState } from '../types';

export const useDialogsStore = createZustand<DialogsState>('dialogs', (set, get) => ({
  [DialogEnum.LOGIN]: false,
  [DialogEnum.SIGNUP]: false,
  [DialogEnum.PASSWORD_RESET]: false,
  [DialogEnum.ALERT]: false,
  [DialogEnum.IMAGE_VIEWER]: false,
  [DialogEnum.ORDER_TRACKING]: false,
  [DialogEnum.PERSONAL_INFO]: false,

  imageViewerData: {
    images: [],
    index: 0,
  },

  alertData: {
    type: 'info',
    title: '',
    description: '',
  },

  orderTrackingData: {
    order: null,
  },

  toggleDialog(dialog, noMobile) {
    if (noMobile) return;

    set((state) => {
      Object.values(DialogEnum).forEach((d) => d !== dialog && (state[d] &&= false));
      return ((state[dialog] = !state[dialog]), deepClone(state));
    });
  },

  useImageViewer(images = [], index = 0) {
    set({ imageViewerData: { images, index } });
    get().toggleDialog(DialogEnum.IMAGE_VIEWER);
  },

  useAlert(alertData) {
    if (alertData) set({ alertData });
    get().toggleDialog(DialogEnum.ALERT);
  },

  useOrderTracking(order) {
    if (order) set({ orderTrackingData: { order } });
    get().toggleDialog(DialogEnum.ORDER_TRACKING);
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
