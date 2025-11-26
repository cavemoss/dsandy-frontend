'use client';

import { Country } from 'country-state-city';
import Cookies from 'js-cookie';

import { SubdomainDTO } from '@/api/entities';
import * as api from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { useOrdersStore } from '@/entities/orders';
import { useProductsStore } from '@/entities/products';
import { useAdminStore } from '@/features/admin/model/admin.state';
import { useCartStore } from '@/features/cart';
import i18n from '@/localization/i18n';
import { createZustand, deepClone } from '@/shared/lib/utils';

import { getAnonViewerParams, InitState } from '..';
import { useNavStore } from './navigation.store';

export const useInitStore = createZustand<InitState>('init', (set, get) => ({
  initialized: false,

  subdomain: {} as SubdomainDTO,

  viewerParams: {
    country: 'US',
    currency: 'USD',
    language: 'en',
  },

  // Getters

  isAdminPanel: () => {
    const { hostname: h } = location;
    return h.startsWith('admin.') || (h === 'localhost' && !!Cookies.get('isAdminPanel'));
  },

  getAvailableCountries: () => {
    const countries = Country.getAllCountries().filter((c) => get().subdomain.config.countries.includes(c.isoCode));
    countries.sort((a, b) => a.name.localeCompare(b.name));

    return countries.map((ctr) => {
      const flag = ctr.isoCode
        .split('')
        .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 'A'.charCodeAt(0)))
        .join('');

      return { name: ctr.name, code: ctr.isoCode, flag };
    });
  },

  // Actions

  init: async () => {
    const self = get();
    const navStore = useNavStore.getState();

    if (self.initialized) return;

    if (self.isAdminPanel()) {
      await useAdminStore.getState().init();

      if (!useAdminStore.getState().tenant) {
        return navStore.push('/login');
      }

      return set({ initialized: true });
    }

    await self.loadSubdomainData();

    useCartStore.getState().init();
    await useCustomersStore.getState().init();
    await useOrdersStore.getState().init();
    await useProductsStore.getState().init();

    await self.setViewerParams();

    set({ initialized: true });
  },

  loadSubdomainData: async () => {
    try {
      set({ subdomain: await api.admin.loadSubdomainData() });
    } catch (error) {
      console.error('Error fetching subdomain data', { error });
    }
  },

  setViewerParams: async () => {
    const { currentCustomer } = useCustomersStore.getState();

    if (currentCustomer) {
      return set({ viewerParams: currentCustomer.preferences });
    }

    set({ viewerParams: await getAnonViewerParams() });
    const locale = get().viewerParams.language;

    i18n.changeLanguage(locale);
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
