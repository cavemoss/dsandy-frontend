import { OrderDTO } from '@/api/entities';

export enum DialogEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  PASSWORD_RESET = 'passwordReset',
  ALERT = 'alert',
  IMAGE_VIEWER = 'imageViewer',
  ORDER_TRACKING = 'orderTracking',
  PERSONAL_INFO = 'personalInfo',
  CANCEL_ORDER = 'cancelOrder',
}

export interface DialogsState {
  [DialogEnum.LOGIN]: boolean;
  [DialogEnum.SIGNUP]: boolean;
  [DialogEnum.PASSWORD_RESET]: boolean;
  [DialogEnum.ALERT]: boolean;
  [DialogEnum.IMAGE_VIEWER]: boolean;
  [DialogEnum.ORDER_TRACKING]: boolean;
  [DialogEnum.PERSONAL_INFO]: boolean;
  [DialogEnum.CANCEL_ORDER]: boolean;
  imageViewerData: {
    images: string[];
    index: number;
  };
  alertData: {
    type: 'info' | 'confirm' | 'destructive';
    title: string;
    description: string;
    isAsync: boolean;
  };
  orderTrackingData: {
    order: OrderDTO | null;
  };
  cancelOrderData: {
    orderId: number | null;
    reason: string;
  };
  // actions
  toggleDialog: (dialog: DialogEnum, noMobile?: boolean) => void;
  useImageViewer: (images?: string[], index?: number) => void;
  useAlert: (data?: Partial<this['alertData']>, onConfirm?: () => void) => void;
  useOrderTracking: (order?: OrderDTO) => void;
  useCancelOrder: (order?: OrderDTO) => void;

  confirmAction: (...args: unknown[]) => Promise<void> | void;

  setState: (clb: (s: this) => void) => void;
}
