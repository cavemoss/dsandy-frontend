import * as api from '@/api/entities';
import { createZustand, deepClone, deepCompare } from '@/shared/lib/utils';
import { useInitStore } from '@/widgets/init';

import { CustomersState } from '../types';

export const useCustomersStore = createZustand<CustomersState>('customers', (set, get) => ({
  currentCustomer: null,

  currentCustomerModel: null,

  credentials: {
    email: '',
    password: '',
  },

  info: {
    fistName: '',
    lastName: '',
    phone: '',
  },

  // Getters

  isChanged: () => {
    const s = get();
    return !deepCompare(s.currentCustomer || {}, s.currentCustomerModel || {});
  },

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
      const currentCustomer = await api.customers.getByJwtToken();

      if (currentCustomer) {
        set({
          currentCustomer,
          currentCustomerModel: deepClone(currentCustomer),
        });
      }
    } catch (error) {
      console.debug('Error loading customer data', { error });
    }
  },

  async login() {
    const s = get();

    try {
      const result = await api.auth.loginCustomer(s.credentials);
      localStorage.setItem('jwtToken', result.accessToken);

      s.loadCurrentCustomer();
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  async register() {
    const s = get();
    const { info, credentials } = s;

    try {
      await api.customers.create({
        email: credentials.email,
        password: credentials.password,
        info,
        preferences: useInitStore.getState().viewerParams,
      });

      s.init();
    } catch (error) {
      console.debug('Unable to create account', { error });
    }
  },

  resetData() {
    set((s) => {
      s.credentials.password = '';
      s.credentials.email = '';
      s.info.fistName = '';
      s.info.lastName = '';
      s.info.phone = '';
      return deepClone(s);
    });
  },

  setCustomerModel: (clb) => set((s) => (clb(s.currentCustomerModel!), deepClone(s))),

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
