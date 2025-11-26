import * as api from '@/api/entities';
import { createZustand, deepClone } from '@/shared/lib/utils';

import { AuthState } from '../types/auth.types';

export const useAuthStore = createZustand<AuthState>('auth', (set, get) => ({
  credentials: {
    email: '',
    password: '',
  },

  // Actions

  async handleLogin() {
    const self = get();

    try {
      const result = await api.auth.loginTenant(self.credentials);
      localStorage.setItem('jwtToken', result.accessToken);
    } catch (error) {
      console.debug('Unable to login', { error });
    }
  },

  setCredentials: (partial) => set((s) => (Object.assign(s.credentials, partial), deepClone(s))),
}));
