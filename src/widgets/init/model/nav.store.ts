import { create } from 'zustand';

import { NavState } from '../types';

export const useNavStore = create<NavState>(() => ({
  push: () => console.warn('Router not ready'),
  replace: () => console.warn('Router not ready'),
  back: () => console.warn('Router not ready'),
  prefetch: () => {},
}));
