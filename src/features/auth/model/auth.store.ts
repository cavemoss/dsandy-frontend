import * as api from '@/api/entities';
import { createZustand, deepClone } from '@/shared/lib/utils';

import { AuthState } from '../types/auth.types';

export const useAuthStore = createZustand<AuthState>('auth', (set, get) => ({
  isLoading: false,

  credentials: {
    email: '',
    password: '',
  },

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
      localStorage.setItem('jwtToken', result.accessToken);
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  resetData() {
    set((s) => {
      s.credentials = {
        email: '',
        password: '',
      };
      s.customerInfo = {
        firstName: '',
        lastName: '',
        phone: '',
      };
      return deepClone(s);
    });
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
