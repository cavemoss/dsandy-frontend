import { toast } from 'sonner';

import * as api from '@/api/entities';
import { useAuthStore } from '@/features/auth';
import { createZustand, deepClone, deepCompare } from '@/shared/lib/utils';
import { DialogEnum, useDialogsStore } from '@/widgets/dialogs';
import { useInitStore, useNavStore } from '@/widgets/init';

import { CustomersState } from '../types';

export const useCustomersStore = createZustand<CustomersState>('customers', (set, get) => ({
  customer: null,

  customerModel: null,

  // Getters

  isChanged: () => {
    const self = get();
    return !deepCompare(self.customer!, self.customerModel!);
  },

  // Actions

  init() {
    return get().loadCurrentCustomer();
  },

  async loadCurrentCustomer() {
    try {
      const customer = await api.customers.getByJwtToken();

      if (customer) {
        set((s) => {
          s.customer = customer;
          s.customerModel = customer;
          return deepClone(s);
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
      console.debug('Error when saving preferences', { error });
    }
  },

  async savePersonalInfo() {
    const self = get();

    if (!self.customerModel) return;

    try {
      const { info, email } = self.customerModel;

      await api.customers.patch({ info, email });
      await self.loadCurrentCustomer();

      toast.success('Personal info updated successfully!');
    } catch (error) {
      console.debug('Error when saving personal info', { error });
    }
  },

  async createCustomer() {
    const authStore = useAuthStore.getState();

    const { customerInfo: info, credentials } = authStore;
    const { viewerParams: preferences } = useInitStore.getState();

    try {
      const result = await api.customers.create({
        email: credentials.email,
        password: credentials.password,
        info,
        preferences,
      });

      if ('errors' in result) {
        return useAuthStore.setState({ errors: result.errors });
      }

      toast.success('Account successfully created!');
      useDialogsStore.getState().toggleDialog(DialogEnum.SIGNUP);

      void authStore.loginCustomer();
    } catch (error) {
      const msg = 'Unable to create account';
      console.debug(msg, { error });
      toast.error(msg);
    }
  },

  cancelChanges() {
    set((state) => {
      state.customerModel = state.customer;
      return deepClone(state);
    });
  },

  onLoginSuccess: () => {
    const { info } = get().customer!;
    toast.success(`Welcome back, ${info.firstName} ${info.lastName}`);
    useNavStore.getState().push('/account');
  },

  logOut: () => {
    localStorage.removeItem('jwtToken');
    useNavStore.getState().push('/');
    set({ customer: null, customerModel: null });
    toast.info('Logged out');
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
