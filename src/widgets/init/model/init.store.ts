'use client';

import { Country } from 'country-state-city';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { SubdomainDTO } from '@/api/entities';
import * as api from '@/api/entities';
import { useCustomersStore } from '@/entities/customers';
import { useOrdersStore } from '@/entities/orders';
import { useProductsStore } from '@/entities/products';
import { useAdminStore } from '@/features/admin/model/admin.state';
import { useCartStore, useFavoritesStore } from '@/features/cart';
import i18n from '@/localization/i18n';
import { createZustand, deepClone, objectByKey } from '@/shared/lib/utils';

import { fetchCountryData, getAnonViewerParams, InitState, ViewerParams } from '..';
import { useNavStore } from './navigation.store';

export const useInitStore = createZustand<InitState>('init', (set, get) => ({
  initialized: false,

  countryData: [],

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

  getCurrentCountry: () => {
    const self = get();

    const countries = objectByKey(self.getAvailableCountries(), 'code');
    const defaultCtr = self.subdomain.config.countries[0];

    return countries[self.viewerParams.country] ?? countries[defaultCtr];
  },

  getAvailableCurrencies: () => {
    const self = get();
    return self.countryData.find(({ code }) => self.viewerParams.country === code)!.currencies;
  },

  // Actions

  init: async () => {
    const self = get();

    if (self.initialized) return;

    const navStore = useNavStore.getState();

    set({ countryData: await fetchCountryData() });

    if (self.isAdminPanel()) {
      await useAdminStore.getState().init();

      if (!useAdminStore.getState().tenant) {
        return navStore.push('/login');
      }

      return set({ initialized: true });
    }

    await self.loadSubdomainData();
    self.loadLogoFont();

    useCartStore.getState().init();
    useFavoritesStore.getState().init();

    await useCustomersStore.getState().init();

    await self.setViewerParams();

    await useOrdersStore.getState().init();
    await useProductsStore.getState().init();

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

    let viewerParams: ViewerParams;

    const localStorageItem = localStorage.getItem('viewerParams');

    if (localStorageItem) {
      viewerParams = JSON.parse(localStorageItem);
    } else {
      viewerParams = await getAnonViewerParams();
    }

    set({ viewerParams });
    i18n.changeLanguage(viewerParams.language);
  },

  loadLogoFont() {
    const self = useInitStore.getState();
    const { fontBased } = self.subdomain.config.logo;

    if (fontBased?.font) {
      const link = document.createElement('link');
      const fontEncoded = encodeURIComponent(fontBased.font);

      link.href = `https://fonts.googleapis.com/css2?family=${fontEncoded}&display=swap`;
      link.rel = 'stylesheet';

      document.head.appendChild(link);
    }
  },

  async saveViewerParams() {
    const customersStore = useCustomersStore.getState();
    const self = get();

    if (customersStore.currentCustomer) {
      return customersStore.savePreferences();
    }

    localStorage.setItem('viewerParams', JSON.stringify(self.viewerParams));
    toast.success('Preferences saved');
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
