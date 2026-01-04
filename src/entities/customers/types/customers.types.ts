import { CustomerDTO } from '@/api/entities/customers';

export interface CustomersState {
  customer: null | CustomerDTO;
  customerModel: null | CustomerDTO;
  // getters
  isChanged: () => boolean;
  // actions
  init: () => Promise<void>;
  loadCurrentCustomer: () => Promise<void>;
  savePreferences: () => Promise<void>;
  createCustomer: () => Promise<void>;
  onLoginSuccess: () => void;
  logOut: () => void;
  setState: (clb: (s: this) => void) => void;
}
