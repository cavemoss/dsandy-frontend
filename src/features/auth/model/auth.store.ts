import * as api from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { createZustand, deepClone } from '@/shared/lib/utils';

import { AuthState } from '../types/auth.types';

const initialState = {
  isLoading: false,

  credentials: {
    email: '',
    password: '',
  },

  errors: {} as AuthState['errors'],

  customerInfo: {
    firstName: '',
    lastName: '',
    phone: '',
  },
};

export const useAuthStore = createZustand<AuthState>('auth', (set, get) => ({
  isLoading: false,

  credentials: {
    email: '',
    password: '',
  },

  errors: {},

  customerInfo: {
    firstName: '',
    lastName: '',
    phone: '',
  },

  // Getter

  isEmailValid: () => {
    const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email } = get().credentials;
    return REGEX.test(email);
  },

  isPasswordValid: () => {
    const REGEX = /^[A-Za-z\d@$!%*?&]{6,}$/;
    const { password } = get().credentials;
    return REGEX.test(password);
  },

  // Actions

  async loginTenant() {
    const self = get();

    try {
      const result = await api.auth.loginTenant(self.credentials);

      if ('errors' in result) return set({ errors: result.errors });

      localStorage.setItem('jwtToken', result.accessToken);
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  async loginCustomer() {
    const self = get();
    const customersStore = useCustomersStore.getState();

    try {
      const result = await api.auth.loginCustomer(self.credentials);

      if ('errors' in result) return set({ errors: result.errors });

      localStorage.setItem('jwtToken', result.accessToken);

      await customersStore.loadCurrentCustomer();
      customersStore.onLoginSuccess();
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  clearErrors: () => set({ errors: {} }),

  resetState: () => set(initialState),

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
