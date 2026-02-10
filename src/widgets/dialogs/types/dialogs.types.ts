import { OrderDTO } from '@/api/entities';

export enum DialogEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  PASSWORD_RESET = 'passwordReset',
  ALERT = 'alert',
  IMAGE_VIEWER = 'imageViewer',
  ORDER_TRACKING = 'orderTracking',
  PERSONAL_INFO = 'personalInfo',
}

export interface DialogsState {
  [DialogEnum.LOGIN]: boolean;
  [DialogEnum.SIGNUP]: boolean;
  [DialogEnum.PASSWORD_RESET]: boolean;
  [DialogEnum.ALERT]: boolean;
  [DialogEnum.IMAGE_VIEWER]: boolean;
  [DialogEnum.ORDER_TRACKING]: boolean;
  [DialogEnum.PERSONAL_INFO]: boolean;
  imageViewerData: {
    images: string[];
    index: number;
  };
  alertData: {
    type: 'info' | 'confirm';
    title: string;
    description: string;
  };
  orderTrackingData: {
    order: OrderDTO | null;
  };
  // actions
  toggleDialog: (dialog: DialogEnum, noMobile?: boolean) => void;
  useImageViewer: (images?: string[], index?: number) => void;
  useAlert: (data?: Partial<this['alertData']>) => void;
  useOrderTracking: (order?: OrderDTO) => void;

  setState: (clb: (s: this) => void) => void;
}
