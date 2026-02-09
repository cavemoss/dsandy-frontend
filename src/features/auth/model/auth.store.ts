import { toast } from 'sonner';

import * as api from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { createZustand, deepClone } from '@/shared/lib/utils';
import { useDialogsStore } from '@/widgets/dialogs';

import { AuthState } from '../types/auth.types';

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

  async forgotPassword() {
    const self = get();

    try {
      const { errors } = await api.auth.forgotPassword(self.credentials.email);

      if (errors) return set({ errors });

      useDialogsStore.getState().useAlert({
        type: 'info',
        title: 'Done!',
        description: "We've sent the password reset link tou your email",
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  },

  async resetPassword(token) {
    const { password } = get().credentials;

    try {
      await api.auth.resetPassword({ password, token });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  },

  clearErrors: () => set({ errors: {} }),

  resetState: () => {
    set({
      credentials: {
        email: '',
        password: '',
      },
      customerInfo: {
        firstName: '',
        lastName: '',
        phone: '',
      },
    });
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
