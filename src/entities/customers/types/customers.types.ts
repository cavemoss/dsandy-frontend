import { LoginDTO } from '@/api/entities';
import { CustomerDTO, CustomerInfoDTO } from '@/api/entities/customers';

export interface CustomersState {
  currentCustomer: null | CustomerDTO;
  currentCustomerModel: null | CustomerDTO;
  credentials: LoginDTO;
  info: CustomerInfoDTO;
  // getters
  isPasswordValid: () => boolean;
  isEmailValid: () => boolean;
  isChanged: () => boolean;
  areCredentialsValid: () => boolean;
  // actions
  init: () => Promise<void>;
  loadCurrentCustomer: () => Promise<void>;
  register: () => Promise<void>;
  login: () => Promise<void>;
  resetData: () => void;
  setCustomerModel: (clb: (p: CustomerDTO) => void) => void;
  setState: (clb: (s: CustomersState) => void) => void;
}
