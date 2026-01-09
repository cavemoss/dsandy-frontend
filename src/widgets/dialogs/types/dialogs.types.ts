export enum DialogEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
  IMAGE_VIEWER = 'imageViewer',
}

export interface DialogsState {
  [DialogEnum.LOGIN]: boolean;
  [DialogEnum.SIGNUP]: boolean;
  [DialogEnum.IMAGE_VIEWER]: boolean;
  images: string[];
  imageIndex: number;
  // actions
  toggleDialog: (dialog: DialogEnum) => void;
  viewImages: (images?: string[], index?: number) => void;
  setState: (clb: (s: this) => void) => void;
}
