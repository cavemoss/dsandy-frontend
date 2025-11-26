import { LoginDTO } from '@/api/entities';
import { CustomerDTO, CustomerInfoDTO } from '@/api/entities/customers';

export interface CustomersState {
  currentCustomer: null | CustomerDTO;
  credentials: LoginDTO;
  info: CustomerInfoDTO;
  // getters
  isPasswordValid: () => boolean;
  isEmailValid: () => boolean;
  areCredentialsValid: () => boolean;
  // actions
  init: () => Promise<void>;
  loadCurrentCustomer: () => Promise<void>;
  register: () => Promise<void>;
  login: () => Promise<void>;
  setState: (clb: (s: CustomersState) => void) => void;
}
