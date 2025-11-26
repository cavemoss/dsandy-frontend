import * as api from '@/api/entities';
import { createZustand, deepClone } from '@/shared/lib/utils';

import { AdminState } from '../types/admin.types';

export const useAdminStore = createZustand<AdminState>('admin', (set) => ({
  view: 'tenant',

  tenant: null,

  subdomain: null,

  async init() {
    try {
      const tenant = await api.admin.getByJwtToken();

      if (tenant) {
        set({
          tenant,
          subdomain: deepClone(tenant.subdomains[0]),
        });
      }
    } catch (error) {
      console.debug('Error loading tenant data', { error });
    }
  },
}));
