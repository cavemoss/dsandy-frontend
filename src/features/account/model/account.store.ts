import * as api from '@/api/entities';
import { createZustand, deepClone } from '@/shared/lib/utils';
import { useInitStore } from '@/widgets/init';

import { CustomersState } from '../types';

export const useAccountStore = createZustand<CustomersState>('customers', (set, get) => ({
  currentCustomer: null,

  credentials: {
    email: '',
    password: '',
  },

  info: {
    firstName: '',
    lastName: '',
    phone: '',
  },

  // Getters

  isPasswordValid: () => {
    const REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { password } = get().credentials;
    return REGEX.test(password);
  },

  isEmailValid: () => {
    const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email } = get().credentials;
    return REGEX.test(email);
  },

  areCredentialsValid: () => {
    const state = get();
    return state.isEmailValid() && state.isPasswordValid();
  },

  // Actions

  init() {
    return get().loadCurrentCustomer();
  },

  async loadCurrentCustomer() {
    try {
      set({ currentCustomer: await api.customers.getByJwtToken() });
    } catch (error) {
      console.debug('Error loading customer data', { error });
    }
  },

  async login() {
    const s = get();

    try {
      const result = await api.auth.loginCustomer(s.credentials);
      localStorage.setItem('jwtToken', result.accessToken);

      get().loadCurrentCustomer();
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  async register() {
    const { info, credentials } = get();

    try {
      await api.customers.create({
        email: credentials.email,
        password: credentials.password,
        info,
        preferences: useInitStore.getState().viewerParams,
      });

      get().init();
    } catch (error) {
      console.debug('Unable to create account', { error });
    }
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
