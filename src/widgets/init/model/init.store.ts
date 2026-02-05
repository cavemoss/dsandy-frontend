'use client';

import { Country } from 'country-state-city';
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

import { fetchCountryData, getAnonViewerParams, InitState, isoToFlag, ViewerParams } from '..';
import { useNavStore } from './nav.store';

export const useInitStore = createZustand<InitState>('init', (set, get) => ({
  initialized: false,

  subdomain: {} as SubdomainDTO,

  countryData: [],

  viewerParams: {
    country: 'US',
    currency: 'USD',
    language: 'en',
  },

  // Getters

  isAdminPanel: () => location.hostname.startsWith('admin.'),

  getPageConfig: (page, subPage) => {
    const ptr = get().subdomain.navigation[page];
    return subPage ? ptr?.subOptions?.[subPage] : ptr;
  },

  getAvailableCountries: () => {
    const countries = Country.getAllCountries()
      .filter((ctr) => {
        const { countries } = get().subdomain.config;
        if (!countries.length) return true;
        return countries.includes(ctr.isoCode);
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return countries.map((ctr) => ({
      name: ctr.name,
      code: ctr.isoCode,
      flag: isoToFlag(ctr.isoCode),
    }));
  },

  getCurrentCountry: () => {
    const self = get();

    const countries = objectByKey(self.getAvailableCountries(), 'code');
    const defaultCtr = self.subdomain.config.countries[0];

    return countries[self.viewerParams.country] ?? countries[defaultCtr];
  },

  getAvailableCurrencies: () => {
    const self = get();
    return self.countryData.find((ctr) => self.viewerParams.country === ctr.code)?.currencies ?? [];
  },

  // Actions

  init: async () => {
    const self = get();
    const navStore = useNavStore.getState();

    if (self.initialized) return;

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
    const { customer } = useCustomersStore.getState();

    if (customer) {
      return set({ viewerParams: customer.preferences });
    }

    let viewerParams: ViewerParams;

    const lsItem = localStorage.getItem('viewerParams');

    if (lsItem) {
      viewerParams = JSON.parse(lsItem);
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

    if (customersStore.customer) await customersStore.savePreferences();
    else localStorage.setItem('viewerParams', JSON.stringify(self.viewerParams));

    toast.success('Preferences saved');
    setTimeout(() => location.reload(), 500);
  },

  setState: (clb) => set((s) => (clb(s), deepClone(s))),
}));
