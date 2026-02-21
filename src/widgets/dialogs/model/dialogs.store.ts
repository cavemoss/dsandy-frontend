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
  [DialogEnum.CANCEL_ORDER]: false,

  imageViewerData: {
    images: [],
    index: 0,
  },

  alertData: {
    type: 'info',
    title: '',
    description: '',
    isAsync: false,
  },

  orderTrackingData: {
    order: null,
  },

  cancelOrderData: {
    orderId: null,
    reason: '',
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

  useAlert(alertData, onConfirm) {
    if (alertData) {
      set((s) => Object.assign(s, { alertData }));
    }
    if (onConfirm) {
      set({ confirmAction: onConfirm });
    }
    get().toggleDialog(DialogEnum.ALERT);
  },

  useOrderTracking(order) {
    if (order) set({ orderTrackingData: { order } });
    get().toggleDialog(DialogEnum.ORDER_TRACKING);
  },

  useCancelOrder(order) {
    if (order) set((s) => ((s.cancelOrderData.orderId = order.id), s));
    get().toggleDialog(DialogEnum.CANCEL_ORDER);
  },

  confirmAction: () => {},

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
