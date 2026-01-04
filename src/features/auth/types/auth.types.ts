import { AuthErrorResponseDTO, CustomerInfoDTO } from '@/api/entities';

export interface AuthState {
  isLoading: boolean;
  credentials: {
    email: string;
    password: string;
  };
  errors: AuthErrorResponseDTO['errors'];
  customerInfo: CustomerInfoDTO;
  // Getters
  isEmailValid(): boolean;
  isPasswordValid(): boolean;
  // action
  loginTenant: () => Promise<void>;
  loginCustomer: () => Promise<void>;
  clearErrors: () => void;
  resetState: () => void;
  setState: (clb: (s: this) => void) => void;
}
