export enum DialogEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export interface DialogsState {
  [DialogEnum.LOGIN]: boolean;
  [DialogEnum.SIGNUP]: boolean;
  // actions
  toggleDialog: (dialog: DialogEnum) => void;
}
