import { OrderDTO } from '@/api/entities';

export enum DialogEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  PASSWORD_RESET = 'passwordReset',
  ALERT = 'alert',
  IMAGE_VIEWER = 'imageViewer',
  ORDER_TRACKING = 'orderTracking',
}

export interface DialogsState {
  [DialogEnum.LOGIN]: boolean;
  [DialogEnum.SIGNUP]: boolean;
  [DialogEnum.PASSWORD_RESET]: boolean;
  [DialogEnum.ALERT]: boolean;
  [DialogEnum.IMAGE_VIEWER]: boolean;
  [DialogEnum.ORDER_TRACKING]: boolean;
  images: string[];
  imageIndex: number;
  alertData: {
    type: 'info' | 'confirm';
    title: string;
    description: string;
  };
  order: OrderDTO | null;
  // actions
  toggleDialog: (dialog: DialogEnum) => void;
  viewImages: (images?: string[], index?: number) => void;
  triggerAlert: (data?: this['alertData']) => void;
  viewOrderTracking: (order?: OrderDTO) => void;
  setState: (clb: (s: this) => void) => void;
}
