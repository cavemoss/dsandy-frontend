import { toast } from 'sonner';

import * as api from '@/api/entities';
import { useAuthStore } from '@/features/auth';
import { createZustand, deepClone, deepCompare } from '@/shared/lib/utils';
import { DialogEnum, useDialogsStore } from '@/widgets/dialogs';
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
    firstName: '',
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

  async savePreferences() {
    try {
      await api.customers.patch({
        preferences: useInitStore.getState().viewerParams,
      });
    } catch (error) {
      console.debug('Error loading customer data', { error });
    }
  },

  async login() {
    try {
      const result = await api.auth.loginCustomer(useAuthStore.getState().credentials);
      localStorage.setItem('jwtToken', result.accessToken);

      void get().loadCurrentCustomer();
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  async register() {
    const { customerInfo: info, credentials } = useAuthStore.getState();
    const { viewerParams: preferences } = useInitStore.getState();

    useAuthStore.setState({ isLoading: true });

    try {
      await api.customers.create({
        email: credentials.email,
        password: credentials.password,
        info,
        preferences,
      });

      toast.success('Account successfully created!');
      useDialogsStore.getState().toggleDialog(DialogEnum.SIGNUP);

      void get().login();
    } catch (error) {
      const msg = 'Unable to create account';
      console.debug(msg, { error });
      toast.error(msg);
    } finally {
      useAuthStore.setState({ isLoading: false });
    }
  },

  resetData() {
    set((s) => {
      s.credentials.password = '';
      s.credentials.email = '';
      s.info.firstName = '';
      s.info.lastName = '';
      s.info.phone = '';
      return deepClone(s);
    });
  },

  setCustomerModel: (clb) => set((s) => (clb(s.currentCustomerModel!), deepClone(s))),

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
