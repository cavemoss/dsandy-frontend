import { CustomerInfoDTO } from '@/api/entities';

export interface AuthState {
  isLoading: boolean;
  credentials: {
    email: string;
    password: string;
  };
  customerInfo: CustomerInfoDTO;
  // Getters
  isEmailValid(): boolean;
  isPasswordValid(): boolean;
  // action
  loginTenant: () => Promise<void>;
  resetData: () => void;
  setState: (clb: (s: this) => void) => void;
}
