import { useProductsStore } from '@/entities/products';
import { createZustand } from '@/shared/lib/utils';

import { isSubdomain,subdomains } from '../lib';
import { InitState } from '../types';

export const useInitStore = createZustand<InitState>('init', (set, get) => ({
  initialized: false,

  // getters
  isDev: () => true,

  getSubdomain: () => {
    const pnt = location.hostname.split('.');
    const subdomain = (pnt.length == 2 && pnt[0]) || localStorage.getItem('subdomain');

    return isSubdomain(subdomain) ? subdomain : subdomains[0];
  },

  getInitLogic: () => ({
    ['test']: async () => {},
  }),

  // actions
  init: async () => {
    const subdomain = get().getSubdomain();
    const productsStore = useProductsStore.getState();

    await get().getInitLogic()[subdomain]();
    await productsStore.init();

    set({ initialized: true });
  },
}));
